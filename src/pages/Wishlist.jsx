import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export default function Wishlist() {
    const { wishlist, isLoading } = useWishlist();
    const { isAuthenticated } = useAuth();
    return (
        <Layout>
            {/* Premium Page Header with Background Image */}
            <PageHero
                title="My Wishlist"
                subtitle="Your curated selection of favorites. Don't let them slip away."
                backgroundImage="https://cdn.pixabay.com/photo/2021/02/03/10/37/saries-5977439_1280.jpg"
                currentPage="Wishlist"
            />

            <div className="bg-bg-main min-h-screen py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!isAuthenticated ? (
                        <div className="text-center max-w-md mx-auto py-12 px-4">
                            <h2 className="text-2xl font-bold font-sans text-text-heading mb-4">Please log in</h2>
                            <p className="text-text-muted mb-8 leading-relaxed">
                                You need to be logged in to view and manage your Wishlist.
                            </p>
                            <Link to="/login">
                                <Button variant="primary" size="lg" className="w-full">
                                    Login / Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : isLoading ? (
                        <div className="flex justify-center flex-col items-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
                            <p className="text-text-muted text-sm font-medium animate-pulse">Loading your wishlist...</p>
                        </div>
                    ) : wishlist.length === 0 ? (
                        <div className="text-center max-w-md mx-auto py-12 px-4">
                            <h2 className="text-2xl font-bold font-sans text-text-heading mb-4">Your wishlist is empty</h2>
                            <p className="text-text-muted mb-8 leading-relaxed">
                                You haven't added any items to your wishlist yet. Explore our shop and find something you love!
                            </p>
                            <Link to="/shop">
                                <Button variant="primary" size="lg" className="w-full">
                                    Explore Shop
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {wishlist.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
