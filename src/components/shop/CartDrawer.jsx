import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag, Loader2, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
    const {
        cartItems,
        isCartLoading,
        updateQuantity,
        removeFromCart,
        subtotal,
        shipping,
        tax,
        total,
        applyCoupon,
        coupon,
        removeCoupon,
        discountAmount,
        cartCount
    } = useCart();

    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [applyingCoupon, setApplyingCoupon] = useState(false);
    const [removingId, setRemovingId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null); // Track which item is being updated

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setApplyingCoupon(true);
        const result = await applyCoupon(couponCode);
        setCouponMessage(result.message);
        if (result.success) setCouponCode('');
        setApplyingCoupon(false);
        setTimeout(() => setCouponMessage(''), 3000);
    };

    const handleRemove = async (itemId) => {
        if (removingId || updatingId) return; // Prevent if busy
        setRemovingId(itemId);
        await removeFromCart(itemId);
        setRemovingId(null);
    };

    const handleUpdateQty = async (itemId, newQty) => {
        if (updatingId || removingId) return; // Prevent concurrent updates
        if (newQty < 1) {
            // Qty going below 1 → remove item
            handleRemove(itemId);
            return;
        }
        setUpdatingId(itemId);
        await updateQuantity(itemId, newQty);
        setUpdatingId(null);
    };

    if (!isOpen) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-[88%] sm:w-[420px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-out transform flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
                    <h2 className="flex items-center gap-2 font-sans font-bold text-lg text-text-heading">
                        <ShoppingBag size={20} className="text-accent-gold" />
                        Shopping Bag
                        <span className="text-text-muted font-normal text-sm">({cartCount})</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-text-muted hover:bg-black hover:text-white transition-all duration-200"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Free Shipping */}
                {cartItems.length > 0 && (
                    <div className="px-5 py-2 bg-green-50 border-b border-green-100 text-center">
                        <span className="text-xs text-green-700 font-bold">🎉 Free shipping on all orders!</span>
                    </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-8">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                                <ShoppingBag size={32} className="text-gray-300" />
                            </div>
                            <div>
                                <p className="text-text-heading font-bold mb-1">Your bag is empty</p>
                                <p className="text-text-muted text-sm">Add items to get started</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-text-heading text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className={cn(
                                        "flex gap-4 p-5 transition-all duration-300",
                                        removingId === item._id && "opacity-30 scale-95"
                                    )}
                                >
                                    {/* Product Image */}
                                    <div className="w-[80px] h-[96px] flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain bg-white"
                                            onError={(e) => { e.target.src = 'https://placehold.co/80x96?text=No+Image'; }}
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col justify-between min-w-0">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-sm text-text-heading leading-snug line-clamp-2 flex-1">{item.name}</h3>
                                                <button
                                                    onClick={() => handleRemove(item._id)}
                                                    disabled={removingId === item._id || !!updatingId}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all flex-shrink-0 disabled:opacity-30"
                                                >
                                                    {removingId === item._id ? (
                                                        <Loader2 size={12} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={13} />
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-xs text-text-muted mt-0.5">₹{item.price.toLocaleString()} each</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <p className="font-bold text-base text-text-heading">₹{(item.price * item.quantity).toLocaleString()}</p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-gray-200 rounded-full h-8 bg-white shadow-sm">
                                                <button
                                                    onClick={() => handleUpdateQty(item._id, item.quantity - 1)}
                                                    disabled={!!updatingId || !!removingId}
                                                    className={cn(
                                                        "w-8 h-full flex items-center justify-center transition-colors rounded-l-full disabled:opacity-30",
                                                        item.quantity <= 1
                                                            ? "text-red-400 hover:text-red-600 hover:bg-red-50"
                                                            : "text-text-muted hover:text-text-heading"
                                                    )}
                                                    title={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
                                                >
                                                    {item.quantity <= 1 ? <Trash2 size={12} /> : <Minus size={13} />}
                                                </button>
                                                <span className={cn(
                                                    "text-xs font-bold w-6 text-center select-none",
                                                    updatingId === item._id && "text-accent-gold"
                                                )}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
                                                    disabled={!!updatingId || !!removingId}
                                                    className="w-8 h-full flex items-center justify-center text-text-muted hover:text-text-heading transition-colors rounded-r-full disabled:opacity-30"
                                                >
                                                    <Plus size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 bg-white">

                        {/* Coupon */}
                        <div className="px-5 pt-4 pb-3">
                            {!coupon ? (
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Promo Code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-accent-gold focus:bg-white uppercase placeholder:capitalize placeholder:text-gray-400 transition-colors"
                                        />
                                    </div>
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={applyingCoupon || !couponCode.trim()}
                                        className="px-5 py-2.5 bg-text-heading text-white text-xs font-bold rounded-xl hover:bg-accent-gold transition-colors disabled:opacity-40 flex items-center gap-1.5"
                                    >
                                        {applyingCoupon ? <Loader2 size={12} className="animate-spin" /> : 'Apply'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center bg-green-50 border border-green-200 px-3 py-2.5 rounded-xl">
                                    <span className="text-xs text-green-700 font-bold flex items-center gap-1.5">
                                        <Tag size={12} />
                                        {coupon.code} — {coupon.discountType === 'percentage' ? `${coupon.discountValue}% off` : `₹${coupon.discountValue} off`}
                                    </span>
                                    <button onClick={removeCoupon} className="text-green-600 hover:text-red-500 transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                            {couponMessage && (
                                <p className={cn(
                                    "text-[11px] mt-1.5 font-medium",
                                    couponMessage.includes('save') || couponMessage.includes('applied') ? 'text-green-600' : 'text-red-500'
                                )}>
                                    {couponMessage}
                                </p>
                            )}
                        </div>

                        {/* Price Breakdown */}
                        <div className="px-5 pb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-muted">Subtotal</span>
                                <span className="font-bold text-text-heading">₹{subtotal.toLocaleString()}</span>
                            </div>
                            {coupon && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span className="font-bold">-₹{discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-text-muted">Tax (18% GST)</span>
                                <span className="font-bold text-text-heading">₹{tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-muted">Shipping</span>
                                <span className="text-green-600 font-bold text-xs uppercase tracking-wider">Free</span>
                            </div>
                        </div>

                        {/* Total + Checkout */}
                        <div className="px-5 pb-5 pt-3 border-t border-dashed border-gray-200">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold block mb-0.5">Total Amount</span>
                                    <span className="text-2xl font-bold text-text-heading">₹{Math.round(total).toLocaleString()}</span>
                                </div>
                            </div>
                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="flex items-center justify-center w-full py-4 bg-text-heading text-white rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-accent-gold transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
                            >
                                Checkout <ArrowRight size={14} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>,
        document.body
    );
};

export default CartDrawer;
