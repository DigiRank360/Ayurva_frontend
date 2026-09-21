import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import { formatPrice, getImageUrl, cn } from '@/lib/utils';
import { getProductById, getReviews, createReview, getRelatedProducts } from '@/lib/api';
import useAsync from '@/hooks/useAsync';
import { Star, Truck, Shield, RefreshCw, Send, Heart, Share2, ShoppingCart, Zap, Check } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import ImageMagnifier from '@/components/ui/ImageMagnifier';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import Button from '@/components/ui/Button';
import useLoading from '@/hooks/useLoading';

export default function ProductDetails() {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const { execute, data: product, isLoading: isFetching, error } = useAsync(getProductById);

    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    const fetchReviews = async () => {
        try {
            setReviewsLoading(true);
            const data = await getReviews(id);
            setReviews(data);
        } catch (error) {
            console.error('Failed to fetch reviews', error);
        } finally {
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        execute(id);
        fetchReviews();
        // Fetch related products
        (async () => {
            try {
                setRelatedLoading(true);
                const data = await getRelatedProducts(id);
                setRelatedProducts(data);
            } catch (err) {
                console.error('Failed to fetch related products', err);
            } finally {
                setRelatedLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        if (product) {
            // Set main image
            if (product.images?.length > 0 || product.image) {
                setMainImage(product.images?.[0] || product.image);
            }
            // Auto-select size if only one available
            if (product.availableSizes?.length === 1) {
                setSelectedSize(product.availableSizes[0]);
            } else if (product.availableSizes?.length > 0 && !selectedSize) {
                setSelectedSize(''); // Reset if multiple or none selected yet
            }
            // Auto-select color if only one available
            if (product.availableColors?.length === 1) {
                setSelectedColor(product.availableColors[0]);
            } else if (product.availableColors?.length > 0 && !selectedColor) {
                setSelectedColor(''); // Reset if multiple or none selected yet
            }
        }
    }, [product]);

    const { addToCart, isInCart, setIsCartOpen } = useCart();
    const productInCart = product ? isInCart(product._id) : false;
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const { isLoading: isAddingToCart, startLoading: startAddingToCart, stopLoading: stopAddingToCart } = useLoading();
    const { isLoading: isBuying, startLoading: startBuying, stopLoading: stopBuying } = useLoading();

    // Wishlist Logic
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = product ? isInWishlist(product._id || product.id) : false;

    // Review Form State
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [submitReviewLoading, setSubmitReviewLoading] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

    const handleAddToCart = async () => {
        if (productInCart) {
            setIsCartOpen(true);
            return;
        }
        if (product.availableSizes?.length > 0 && !selectedSize) {
            alert('Please select a size');
            return;
        }
        if (product.availableColors?.length > 0 && !selectedColor) {
            alert('Please select a color');
            return;
        }
        startAddingToCart();
        await addToCart(product._id, 1);
        stopAddingToCart();
    };

    const handleBuyNow = async () => {
        if (product.availableSizes?.length > 0 && !selectedSize) {
            alert('Please select a size');
            return;
        }
        if (product.availableColors?.length > 0 && !selectedColor) {
            alert('Please select a color');
            return;
        }
        startBuying();
        await addToCart(product._id, 1);
        // Navigate to checkout
        stopBuying();
    };

    const handleWishlist = () => {
        if (!isAuthenticated) {
            alert("Please log in to add items to your wishlist.");
            return;
        }
        toggleWishlist(product);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out this amazing product: ${product.name}`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!newReview.comment) return;

        try {
            setSubmitReviewLoading(true);
            await createReview(id, {
                rating: newReview.rating,
                comment: newReview.comment
            });
            setShowReviewForm(false);
            setNewReview({ rating: 5, comment: '' });
            fetchReviews();
            execute(id); // Refresh product rating/count
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitReviewLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                {isFetching ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="w-10 h-10 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
                    </div>
                ) : error || !product ? (
                    <div className="flex justify-center items-center h-96 text-red-500">
                        Failed to load product details.
                    </div>
                ) : (
                    <>
                        {/* Breadcrumbs */}
                        <nav className="flex items-center text-xs text-text-muted my-3 uppercase tracking-widest animate-in fade-in slide-in-from-left-4 duration-700">
                            <a href="/" className="hover:text-text-heading transition-colors">Home</a>
                            <span className="mx-2">/</span>
                            <a href="/shop" className="hover:text-text-heading transition-colors">Shop</a>
                            <span className="mx-2">/</span>
                            <span className="text-text-heading font-bold line-clamp-1">{product.name}</span>
                        </nav>

                        {/* Main Product Section - Adjusted Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 lg:gap-12 mb-12 md:mb-20 animate-in fade-in duration-700">

                            {/* Left Column: Images (Reduced Width: col-span-5) */}
                            <div className="lg:col-span-5 space-y-4">
                                <div className="aspect-[5/6] rounded-xl overflow-hidden shadow-lg relative group bg-white border border-gray-100">
                                    <ImageMagnifier
                                        src={getImageUrl(mainImage || product?.images?.[0] || product?.image)}
                                        alt={product.name}
                                        zoomLevel={1.5}
                                        magnifierWidth={150}
                                        magnifierHeight={150}
                                    />
                                    <div className="absolute top-4 left-4 pointer-events-none">
                                        {product.isTrending && <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-heading rounded-sm shadow-sm">Trending</span>}
                                    </div>
                                </div>
                                {((product?.images?.length > 0 && product.images) || (product?.image ? [product.image] : [])).length > 1 && (
                                    <div className="grid grid-cols-4 gap-3">
                                        {(product?.images || [product.image]).slice(0, 4).map((img, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setMainImage(img)}
                                                className={`aspect-square rounded-lg overflow-hidden bg-bg-section cursor-pointer transition-all border ${mainImage === img || (!mainImage && i === 0) ? 'border-accent-gold opacity-100 ring-2 ring-accent-gold/20' : 'border-gray-100 opacity-70 hover:opacity-100 hover:border-accent-gold'}`}
                                            >
                                                <img src={getImageUrl(img)} alt={`thumbnail-${i}`} className="w-full h-full object-contain bg-white" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Product Info (Increased Width: col-span-7) */}
                            <div className="lg:col-span-7 space-y-4 md:space-y-6 lg:space-y-8 lg:pl-8 pb-24 md:pb-0">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-1 md:mb-2">{product.categoryName}</p>
                                            <h1 className="text-xl md:text-2xl lg:text-3xl font-sans font-bold text-text-heading mb-2 md:mb-3 leading-tight">{product.name}</h1>
                                            {product.sku && <p className="text-xs text-text-muted">SKU: {product.sku}</p>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex text-accent-gold">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < Math.floor(product.rating || 4.5) ? "currentColor" : "none"} />
                                            ))}
                                        </div>
                                        <a href="#reviews" className="text-text-muted text-xs font-medium hover:text-accent-gold transition-colors underline decoration-dotted">
                                            Read {reviews.length} Reviews
                                        </a>
                                    </div>

                                    <div className="flex items-end gap-2 md:gap-3 border-b border-border-light pb-4 md:pb-6 mt-4">
                                        <span className="text-2xl md:text-3xl font-bold text-text-heading font-sans">{formatPrice(product.price)}</span>
                                        {product.mrp && product.mrp > product.price && (
                                            <span className="text-base md:text-lg text-text-disabled line-through mb-0.5 md:mb-1">{formatPrice(product.mrp)}</span>
                                        )}
                                        {product.discount > 0 && (
                                            <span className="bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest mb-2 rounded-sm">
                                                {product.discount}% OFF
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Size Selection */}
                                {product.availableSizes && product.availableSizes.length > 0 && (
                                    <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
                                        <span className="block text-[10px] md:text-xs font-bold text-text-heading uppercase tracking-widest">Select Size</span>
                                        <div className="flex flex-wrap gap-2 md:gap-3">
                                            {product.availableSizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`min-w-[2rem] px-3 py-1.5 rounded-md flex items-center justify-center transition-all text-sm font-medium border ${selectedSize === size
                                                        ? 'bg-text-heading text-white border-text-heading shadow-md'
                                                        : 'bg-white border-gray-200 text-text-heading hover:border-accent-gold hover:text-accent-gold'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color Selection */}
                                {product.availableColors && product.availableColors.length > 0 && (
                                    <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
                                        <span className="block text-[10px] md:text-xs font-bold text-text-heading uppercase tracking-widest">Select Color</span>
                                        <div className="flex flex-wrap gap-2 md:gap-3">
                                            {product.availableColors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`min-w-[2rem] px-3 py-1.5 rounded-md flex items-center justify-center transition-all text-sm font-medium border ${selectedColor === color
                                                        ? 'bg-text-heading text-white border-text-heading shadow-md'
                                                        : 'bg-white border-gray-200 text-text-heading hover:border-accent-gold hover:text-accent-gold'
                                                        }`}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions (Sticky on Mobile) */}
                                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-4 drop-shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex flex-row gap-3 md:static md:bg-transparent md:border-none md:p-0 md:drop-shadow-none md:gap-4 md:pt-0">
                                    <Button
                                        onClick={handleAddToCart}
                                        isLoading={isAddingToCart}
                                        loadingText="Adding..."
                                        rightIcon={productInCart ? Check : ShoppingCart}
                                        variant="primary"
                                        size="md"
                                        className={cn(
                                            "flex-1 text-sm md:text-base font-medium py-3.5 md:py-4 rounded-xl shadow-sm",
                                            productInCart
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-text-heading text-white hover:bg-accent-gold"
                                        )}
                                    >
                                        {productInCart ? 'Go to Cart' : 'Add to Cart'}
                                    </Button>
                                    <Button
                                        onClick={handleBuyNow}
                                        isLoading={isBuying}
                                        loadingText="Processing..."
                                        rightIcon={Zap}
                                        variant="outline"
                                        size="md"
                                        className="flex-1 border-2 border-text-heading bg-white text-text-heading hover:bg-text-heading hover:text-white text-sm md:text-base font-medium py-3.5 md:py-4 rounded-xl"
                                    >
                                        Buy Now
                                    </Button>
                                </div>

                                {/* Wishlist & Share */}
                                <div className="flex gap-2 md:gap-3">
                                    <button
                                        onClick={handleWishlist}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg border-2 transition-all ${isWishlisted ? 'bg-red-50 border-red-500 text-red-500' : 'border-gray-200 text-text-muted hover:border-accent-gold hover:text-accent-gold'
                                            }`}
                                    >
                                        <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                                        <span className="text-xs md:text-sm font-medium">Wishlist</span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg border-2 border-gray-200 text-text-muted hover:border-accent-gold hover:text-accent-gold transition-all"
                                    >
                                        <Share2 size={16} />
                                        <span className="text-xs md:text-sm font-medium">Share</span>
                                    </button>
                                </div>

                                {/* Trust Badges (Moved Up) */}
                                <div className="grid grid-cols-3 gap-3 md:gap-4 pt-2 text-center border-b border-border-light pb-6">
                                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                        <Truck className="text-accent-gold" size={18} />
                                        <span className="text-xs font-medium text-text-muted">Free Shipping</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                        <Shield className="text-accent-gold" size={18} />
                                        <span className="text-xs font-medium text-text-muted">Secure Payment</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                        <RefreshCw className="text-accent-gold" size={18} />
                                        <span className="text-xs font-medium text-text-muted">Easy Returns</span>
                                    </div>
                                </div>

                                {/* Description (Moved Down) */}
                                {product.description && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-text-heading mb-3">About The Product</h3>
                                        <p className="text-text-body text-sm leading-relaxed mb-6 whitespace-pre-line">
                                            {product.description}
                                        </p>
                                    </div>
                                )}

                                {(product.subtitle || product.shortDescription || product.packSize || product.featuredTag) && (
                                    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 md:p-5">
                                        {product.featuredTag && (
                                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 mb-3">
                                                {product.featuredTag}
                                            </span>
                                        )}
                                        {product.subtitle && (
                                            <h3 className="text-base md:text-lg font-bold text-text-heading mb-2">{product.subtitle}</h3>
                                        )}
                                        {product.shortDescription && (
                                            <p className="text-sm text-text-body leading-relaxed mb-3">{product.shortDescription}</p>
                                        )}
                                        {product.packSize && (
                                            <div className="inline-flex rounded-full border border-amber-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-heading">
                                                {product.packSize}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(product.keyPoints?.length || product.benefits?.length || product.ingredients?.length) && (
                                    <div className="grid gap-5 md:grid-cols-3">
                                        {product.keyPoints?.length > 0 && (
                                            <div className="rounded-2xl border border-border-light bg-bg-section p-4">
                                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-heading mb-3">Key Points</h4>
                                                <ul className="space-y-2 text-sm text-text-body">
                                                    {product.keyPoints.map((point, index) => (
                                                        <li key={`${point}-${index}`} className="flex items-start gap-2">
                                                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-gold" />
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {product.benefits?.length > 0 && (
                                            <div className="rounded-2xl border border-border-light bg-bg-section p-4">
                                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-heading mb-3">Benefits</h4>
                                                <ul className="space-y-2 text-sm text-text-body">
                                                    {product.benefits.map((benefit, index) => (
                                                        <li key={`${benefit}-${index}`} className="flex items-start gap-2">
                                                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                                            <span>{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {product.ingredients?.length > 0 && (
                                            <div className="rounded-2xl border border-border-light bg-bg-section p-4">
                                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-heading mb-3">Ingredients</h4>
                                                <ul className="space-y-2 text-sm text-text-body">
                                                    {product.ingredients.map((ingredient, index) => (
                                                        <li key={`${ingredient}-${index}`} className="flex items-start gap-2">
                                                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
                                                            <span>{ingredient}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Accordion / Dynamic Sections */}
                                {product.additionalSections && product.additionalSections.length > 0 && (
                                    <Accordion items={product.additionalSections} />
                                )}
                            </div>
                        </div>

                        {/* Ratings & Reviews Section */}
                        <div id="reviews" className="border-t border-border-light pt-16 mb-20 scroll-mt-24">
                            <div className="flex flex-col md:flex-row gap-12">

                                {/* Rating Summary */}
                                <div className="md:w-1/3 space-y-4 md:space-y-6">
                                    <h2 className="text-xl md:text-2xl font-sans font-semibold text-text-heading">Ratings & Reviews</h2>

                                    <div className="flex items-end gap-4">
                                        <span className="text-4xl md:text-5xl font-bold text-text-heading">{product.rating ? product.rating.toFixed(1) : "0.0"}</span>
                                        <div className="mb-1">
                                            <div className="flex text-accent-gold mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={18} fill={i < Math.round(product.rating || 0) ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                            <p className="text-sm text-text-muted">{product.reviewCount || 0} Verified Reviews</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map((star) => {
                                            const count = reviews.filter(r => Math.round(r.rating) === star).length;
                                            const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
                                            return (
                                                <div key={star} className="flex items-center gap-3 text-sm">
                                                    <span className="font-medium w-3">{star}</span>
                                                    <Star size={12} className="text-text-muted" />
                                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-accent-gold rounded-full"
                                                            style={{ width: `${pct}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-text-muted w-8 text-right">{pct}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                        className="w-full border-2 border-text-heading text-text-heading py-3.5 rounded-xl font-medium text-sm hover:bg-text-heading hover:text-white transition-all"
                                    >
                                        {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                                    </button>
                                </div>

                                {/* Reviews List & Form */}
                                <div className="md:w-2/3">

                                    {/* Write Review Form */}
                                    {showReviewForm && (
                                        <div className="bg-bg-section p-6 rounded-xl mb-8 animate-in slide-in-from-top-4">
                                            {isAuthenticated ? (
                                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                                    <h3 className="font-bold text-lg mb-4">Write your review</h3>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-heading mb-2">Rating</label>
                                                        <div className="flex gap-2">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <button
                                                                    key={star}
                                                                    type="button"
                                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                                    className={`p-1 transition-transform hover:scale-110 ${newReview.rating >= star ? 'text-accent-gold' : 'text-gray-300'}`}
                                                                >
                                                                    <Star size={24} fill="currentColor" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-heading mb-2">Review</label>
                                                        <textarea
                                                            className="w-full p-3 rounded-lg border border-border-light focus:outline-none focus:border-accent-gold text-sm h-32 resize-none"
                                                            placeholder="Share your thoughts..."
                                                            value={newReview.comment}
                                                            onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <button
                                                        disabled={submitReviewLoading}
                                                        className="bg-text-heading text-white px-8 py-3 rounded-lg font-medium text-sm hover:bg-accent-gold transition-colors flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        {submitReviewLoading ? 'Submitting...' : 'Submit Review'} <Send size={16} />
                                                    </button>
                                                </form>
                                            ) : (
                                                <div className="text-center py-6">
                                                    <p className="text-text-muted mb-4 font-medium">You must be logged in to write a review.</p>
                                                    <a href="/login" className="inline-flex items-center justify-center px-6 py-2 border-2 border-text-heading text-text-heading hover:bg-text-heading hover:text-white rounded-lg transition-colors text-sm font-medium">
                                                        Go to Login
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Reviews List */}
                                    <div className="space-y-6">
                                        {reviewsLoading ? (
                                            <div className="text-center py-8 text-text-muted">Loading reviews...</div>
                                        ) : reviews.length === 0 ? (
                                            <div className="text-center py-8 text-text-muted">No reviews yet. Be the first to review!</div>
                                        ) : (
                                            reviews.map((review) => (
                                                <div key={review._id || review.id} className="border-b border-border-light last:border-0 pb-6 last:pb-0">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-medium text-text-heading uppercase">
                                                                {review.name ? review.name.charAt(0) : (review.user?.name ? review.user.name.charAt(0) : 'U')}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-sm text-text-heading">{review.name || review.user?.name || "User"}</h4>
                                                                <div className="flex text-accent-gold text-xs">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs text-text-muted">
                                                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "Just now"}
                                                        </span>
                                                    </div>
                                                    <p className="text-text-body text-sm leading-relaxed mb-4 pl-14">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <div className="mt-12">
                                <SectionHeading title="You May Also Like" centered />
                                {relatedLoading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="w-8 h-8 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {relatedProducts.map((p) => (
                                            <ProductCard key={p._id} product={p} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}


                    </>
                )}
            </div>
        </Layout >
    );
}
