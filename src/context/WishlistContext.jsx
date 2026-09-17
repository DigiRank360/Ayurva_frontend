import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist, toggleWishlistApi } from '../lib/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    const fetchWishlist = async () => {
        if (!isAuthenticated) {
            setWishlist([]);
            return;
        }
        try {
            setIsLoading(true);
            const data = await getWishlist();
            // Backend returns { products: [populated products] }
            setWishlist(data.products || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const toggleWishlist = async (product) => {
        if (!isAuthenticated) {
            alert("Please log in to add items to your wishlist.");
            return;
        }

        const productId = product._id || product.id;
        if (!productId) return;

        const isWishlisted = isInWishlist(productId);

        // Optimistic UI Update (immediate feedback without waiting for server)
        if (isWishlisted) {
            setWishlist(prev => prev.filter(p => (p._id || p.id) !== productId));
        } else {
            setWishlist(prev => [...prev, product]);
        }

        try {
            // Actual Server Update
            const updatedWishlist = await toggleWishlistApi(productId);
            // Sync with actual database state to ensure absolute accuracy
            setWishlist(updatedWishlist.products || []);
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            // Revert changes completely on error and inform user
            fetchWishlist();
            alert(error.response?.data?.message || "Failed to update wishlist. Product might be invalid.");
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(p => (p._id || p.id) === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, isLoading, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
