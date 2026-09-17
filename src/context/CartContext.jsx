import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import {
    getCartApi,
    addToCartApi,
    updateCartItemApi,
    removeFromCartApi,
    clearCartApi,
    validateCoupon
} from '@/lib/api';
import toast from 'react-hot-toast';
import { getImageUrl } from '@/lib/utils';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Get guest session ID from localStorage (returns null if not set)
const getGuestSessionId = () => {
    return localStorage.getItem('guestSessionId') || null;
};

// Create a new guest session ID (only when guest needs to add items)
const ensureGuestSessionId = () => {
    let sid = localStorage.getItem('guestSessionId');
    if (!sid) {
        sid = 'guest_' + crypto.randomUUID();
        localStorage.setItem('guestSessionId', sid);
    }
    return sid;
};

export const CartProvider = ({ children }) => {
    const { user, isLoading: authLoading } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [cartTotals, setCartTotals] = useState({
        itemCount: 0, subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0
    });
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [coupon, setCoupon] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const prevUserRef = useRef(undefined);
    const authResolvedRef = useRef(false);
    const busyRef = useRef(false); // Prevent concurrent API calls
    const guestSessionIdRef = useRef(getGuestSessionId()); // Store guest sessionId for merge

    // --- Normalize backend response → local state ---
    const processCartResponse = useCallback((data) => {
        if (!data || !data.items || !Array.isArray(data.items)) {
            setCartItems([]);
            setCartTotals({ itemCount: 0, subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0 });
            return;
        }

        // Filter out items with null/missing products (deleted products)
        const validItems = data.items.filter(item => item.product && item.product._id);

        const items = validItems.map(item => ({
            _id: item._id,
            productId: item.product._id,
            name: item.product.name || 'Product',
            image: item.product.images?.[0]
                ? getImageUrl(item.product.images[0])
                : 'https://placehold.co/80x96?text=No+Image',
            price: item.price || item.product.price || 0,
            quantity: item.quantity,
            lineTotal: item.lineTotal || (item.price * item.quantity)
        }));

        setCartItems(items);

        const backendSubtotal = data.subtotal || 0;
        const disc = coupon ? coupon.calculatedDiscount : 0;
        const calcTax = coupon
            ? Math.round((backendSubtotal - disc) * 0.18)
            : (data.tax || 0);
        const calcTotal = coupon
            ? backendSubtotal - disc + calcTax
            : (data.total || 0);

        setCartTotals({
            itemCount: data.itemCount || 0,
            subtotal: backendSubtotal,
            discount: disc,
            shipping: data.shipping || 0,
            tax: calcTax,
            total: calcTotal
        });
    }, [coupon]);

    // --- Fetch cart from backend ---
    // Sends sessionId only if it exists (for guest or for merge after login)
    // Backend auto-merges if user is logged in + sessionId present
    const fetchCart = useCallback(async () => {
        try {
            const sessionId = guestSessionIdRef.current;
            const data = await getCartApi(sessionId);
            processCartResponse(data);

            // After successful fetch for logged-in user, clear old guest session
            if (user && sessionId) {
                localStorage.removeItem('guestSessionId');
                guestSessionIdRef.current = null;
            }
        } catch (error) {
            console.error('Cart fetch failed:', error);
        }
    }, [user, processCartResponse]);

    // --- Wait for auth to resolve, THEN fetch cart ---
    useEffect(() => {
        if (authLoading) return;
        if (authResolvedRef.current) return;
        authResolvedRef.current = true;
        fetchCart();
    }, [authLoading, fetchCart]);

    // --- Detect LOGIN/LOGOUT transitions ---
    useEffect(() => {
        if (authLoading) return;
        const prevUser = prevUserRef.current;
        prevUserRef.current = user;
        if (prevUser === undefined) return;

        // LOGIN: just fetchCart — backend auto-merges guest cart via sessionId
        if (!prevUser && user) {
            fetchCart();
        }

        // LOGOUT: generate new guest sessionId and fetch fresh guest cart
        if (prevUser && !user) {
            localStorage.removeItem('guestSessionId');
            const newSessionId = 'guest_' + crypto.randomUUID();
            localStorage.setItem('guestSessionId', newSessionId);
            guestSessionIdRef.current = newSessionId;
            fetchCart();
        }
    }, [user, authLoading, fetchCart]);

    // --- ADD TO CART ---
    const addToCart = async (productId, quantity = 1) => {
        if (busyRef.current) return;
        busyRef.current = true;
        setIsCartLoading(true);
        try {
            // For guest: ensure sessionId exists. For logged-in: don't send sessionId
            const sessionId = user ? null : ensureGuestSessionId();
            if (!user) guestSessionIdRef.current = sessionId;
            const data = await addToCartApi(productId, quantity, sessionId);
            processCartResponse(data);
            toast.success('Added to bag!');
            setIsCartOpen(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setIsCartLoading(false);
            busyRef.current = false;
        }
    };

    // --- UPDATE QUANTITY (no optimistic update to prevent ghost clearing) ---
    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1 || busyRef.current) return;
        busyRef.current = true;

        // Save old items for rollback
        const prevItems = [...cartItems];

        // Optimistic: update just the single item's quantity
        setCartItems(prev => prev.map(item =>
            item._id === itemId
                ? { ...item, quantity: newQuantity, lineTotal: item.price * newQuantity }
                : item
        ));

        try {
            // Only pass sessionId if user is NOT logged in
            const sessionId = user ? null : guestSessionIdRef.current;
            const data = await updateCartItemApi(itemId, newQuantity, sessionId);
            processCartResponse(data);
        } catch (error) {
            // Rollback to previous state (NOT fetchCart which might return empty)
            setCartItems(prevItems);
            toast.error('Failed to update quantity');
        } finally {
            busyRef.current = false;
        }
    };

    // --- REMOVE FROM CART ---
    const removeFromCart = async (itemId) => {
        if (busyRef.current) return;
        busyRef.current = true;

        const prevItems = [...cartItems];

        // Optimistic: remove just this one item
        setCartItems(prev => prev.filter(item => item._id !== itemId));

        try {
            // Only pass sessionId if user is NOT logged in
            const sessionId = user ? null : guestSessionIdRef.current;
            const data = await removeFromCartApi(itemId, sessionId);
            processCartResponse(data);
            toast.success('Removed from bag');
        } catch (error) {
            setCartItems(prevItems);
            toast.error('Failed to remove item');
        } finally {
            busyRef.current = false;
        }
    };

    // --- CLEAR CART ---
    const clearCart = async () => {
        const prevItems = [...cartItems];
        setCartItems([]);
        setCartTotals({ itemCount: 0, subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0 });
        setCoupon(null);
        try {
            // Only pass sessionId if user is NOT logged in
            const sessionId = user ? null : guestSessionIdRef.current;
            await clearCartApi(sessionId);
        } catch (error) {
            setCartItems(prevItems);
        }
    };

    // --- COUPON ---
    const applyCoupon = async (code) => {
        try {
            const data = await validateCoupon(code, cartTotals.subtotal);
            const newCoupon = {
                code: data.offer.code,
                title: data.offer.title,
                discountType: data.offer.discountType,
                discountValue: data.offer.discountValue,
                calculatedDiscount: data.discount
            };
            setCoupon(newCoupon);
            const newTax = Math.round((cartTotals.subtotal - data.discount) * 0.18);
            setCartTotals(prev => ({
                ...prev,
                discount: data.discount,
                tax: newTax,
                total: cartTotals.subtotal - data.discount + newTax
            }));
            return { success: true, message: `Coupon ${data.offer.code} applied! You save ₹${data.discount}` };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Invalid coupon code' };
        }
    };

    const removeCoupon = () => {
        setCoupon(null);
        const newTax = Math.round(cartTotals.subtotal * 0.18);
        setCartTotals(prev => ({
            ...prev,
            discount: 0,
            tax: newTax,
            total: cartTotals.subtotal + newTax
        }));
    };

    // --- HELPERS ---
    const isInCart = useCallback((productId) => {
        return cartItems.some(item => item.productId === productId);
    }, [cartItems]);

    const getCartItem = useCallback((productId) => {
        return cartItems.find(item => item.productId === productId) || null;
    }, [cartItems]);

    const value = {
        cartItems,
        isCartLoading,
        subtotal: cartTotals.subtotal,
        discountAmount: cartTotals.discount,
        shipping: cartTotals.shipping,
        tax: cartTotals.tax,
        total: cartTotals.total,
        cartCount: cartTotals.itemCount,
        coupon,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        fetchCart,
        isInCart,
        getCartItem
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
