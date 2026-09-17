import React from 'react';
import { Heart, ShoppingBag, Eye, Star, ShoppingCart, Check } from 'lucide-react';
import { cn, formatPrice, getImageUrl } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import useLoading from '../../hooks/useLoading';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, className }) => {
    const { _id, name, price, rating, isNew, discount } = product;
    const mrp = product.mrp || product.originalPrice;
    const categoryName = product.categoryName || product.category;
    const imageUrl = getImageUrl(product?.images?.[0] || product?.image);
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart, isInCart, setIsCartOpen } = useCart();

    const isWishlisted = isInWishlist(_id);
    const alreadyInCart = isInCart(_id);

    const handleCartAction = async (e) => {
        e?.preventDefault();
        e?.stopPropagation();

        if (alreadyInCart) {
            // Already in cart → open cart drawer
            setIsCartOpen(true);
            return;
        }

        startLoading();
        await addToCart(_id, 1);
        stopLoading();
    };

    const discountPercent = discount || (mrp ? Math.round(((mrp - price) / mrp) * 100) : 0);

    return (
        <div className={cn("group relative w-full", className)}>
            {/* Image Container with Hover Effects */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-50 mb-3 shadow-sm transition-all duration-500 hover:shadow-md">

                <Link to={`/product/${_id}`} className="block w-full h-full">
                    <img
                        src={imageUrl}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover bg-white transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
                    {isNew && (
                        <span className="bg-white/95 backdrop-blur-sm text-text-heading text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                            New
                        </span>
                    )}
                    {discountPercent > 0 && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                            -{discountPercent}%
                        </span>
                    )}
                </div>

                {/* Floating Action Buttons (Right Side) */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col gap-2 z-20 
                    md:translate-x-10 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-md transition-all transform hover:scale-110 active:scale-95 ${isWishlisted ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-white text-text-heading hover:bg-accent-gold hover:text-white'}`}
                        aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <Heart size={16} className={`md:w-[18px] md:h-[18px] ${isWishlisted ? 'fill-current text-red-500' : ''}`} strokeWidth={2} />
                    </button>
                    <Link to={`/product/${_id}`} className="hidden md:block">
                        <button
                            className="w-10 h-10 flex items-center justify-center bg-white text-text-heading rounded-full shadow-md hover:bg-accent-gold hover:text-white transition-all transform hover:scale-110 active:scale-95 transition-delay-[50ms]"
                            aria-label="Quick View"
                        >
                            <Eye size={18} strokeWidth={2} />
                        </button>
                    </Link>
                </div>

                {/* Desktop: Slide Up Cart Button */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20 hidden md:block">
                    <Button
                        onClick={handleCartAction}
                        isLoading={isLoading}
                        loadingText="Adding..."
                        rightIcon={alreadyInCart ? Check : ShoppingCart}
                        variant="primary"
                        size="md"
                        className={cn(
                            "w-full font-bold text-xs uppercase tracking-widest shadow-lg",
                            alreadyInCart
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-white text-text-heading hover:bg-text-heading hover:text-white"
                        )}
                    >
                        {alreadyInCart ? 'Go to Cart' : 'Add to Cart'}
                    </Button>
                </div>

                {/* Mobile: Small Cart Button */}
                <div className="md:hidden absolute bottom-2 right-2 z-20">
                    <button
                        onClick={handleCartAction}
                        disabled={isLoading}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full shadow-md active:scale-95 disabled:opacity-50",
                            alreadyInCart
                                ? "bg-green-600 text-white"
                                : "bg-white text-text-heading"
                        )}
                        aria-label={alreadyInCart ? "Go to Cart" : "Add to Cart"}
                    >
                        {isLoading ? (
                            <div className="w-3 h-3 border-2 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
                        ) : alreadyInCart ? (
                            <Check size={14} />
                        ) : (
                            <ShoppingBag size={14} />
                        )}
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="px-1">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-medium">{categoryName}</p>
                    {rating && (
                        <div className="flex items-center gap-1">
                            <Star size={10} className="fill-accent-gold text-accent-gold" />
                            <span className="text-[10px] text-text-heading font-medium">{rating}</span>
                        </div>
                    )}
                </div>

                <Link to={`/product/${_id}`} className="block group-hover:text-accent-gold transition-colors duration-200">
                    <h3 className="text-sm md:text-base font-bold text-text-heading leading-tight mb-1.5 line-clamp-1 font-sans">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-center gap-2.5">
                    <span className="text-sm md:text-base font-bold text-text-heading">{formatPrice(price)}</span>
                    {mrp && mrp > price && (
                        <span className="text-xs text-text-disabled line-through decoration-1">{formatPrice(mrp)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
