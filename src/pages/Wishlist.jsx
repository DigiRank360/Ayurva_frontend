import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function Wishlist() {
    const { wishlist, isLoading } = useWishlist();
    const { isAuthenticated } = useAuth();
    const savedValue = wishlist.reduce((total, product) => total + Number(product.price || 0), 0);

    return (
        <Layout>
            <PageHero
                title="Your Wellness Wishlist"
                subtitle="A thoughtful collection of Ayurvedic essentials for the rituals you want to bring into your day."
                backgroundImage="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=2000&q=85"
                currentPage="Wishlist"
            />

            <main className="min-h-[60vh] bg-bg-main py-10 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {!isAuthenticated ? (
                        <section className="mx-auto max-w-2xl rounded-2xl border border-[#e2e8df] bg-white px-6 py-12 text-center shadow-[0_18px_48px_rgba(17,79,77,0.12)] sm:px-10 md:py-16">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8efe7] text-[#1d6654]">
                                <Heart size={25} />
                            </div>
                            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">Your personal collection</p>
                            <h2 className="mt-2 font-serif text-3xl text-text-heading">Save the rituals you love</h2>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
                                Sign in to keep your Ayurva Pro wellness essentials together and return to them whenever you are ready.
                            </p>
                            <Link to="/" state={{ showLogin: true, from: { pathname: '/wishlist' } }} className="mt-7 inline-block">
                                <Button variant="primary" size="lg" rightIcon={ArrowRight} className="bg-[#114f4d] text-white shadow-md hover:bg-[#0d3c3a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#114f4d]">
                                    Sign in to your account
                                </Button>
                            </Link>
                        </section>
                    ) : isLoading ? (
                        <section aria-live="polite" className="py-20 text-center">
                            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#dbe6dc] border-t-[#1d6654]" />
                            <p className="mt-4 text-sm font-medium text-text-muted">Gathering your saved wellness essentials...</p>
                        </section>
                    ) : wishlist.length === 0 ? (
                        <section className="mx-auto max-w-3xl rounded-2xl border border-[#e2e8df] bg-white px-6 py-12 text-center shadow-[0_18px_48px_rgba(17,79,77,0.12)] sm:px-10 md:py-16">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8efe7] text-[#1d6654]">
                                <Leaf size={25} />
                            </div>
                            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">A good place to begin</p>
                            <h2 className="mt-2 font-serif text-3xl text-text-heading">Your wellness shelf is waiting</h2>
                            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-text-muted">
                                Explore natural Ayurvedic care, find what fits your daily routine, then tap the heart to save it here.
                            </p>
                            <Link to="/shop" className="mt-7 inline-block">
                                <Button variant="primary" size="lg" rightIcon={ArrowRight} className="bg-[#114f4d] text-white shadow-md hover:bg-[#0d3c3a] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#114f4d]">
                                    Explore Ayurva Pro
                                </Button>
                            </Link>
                            <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-border-light pt-6 text-left sm:grid-cols-2">
                                <div className="flex items-start gap-3"><Leaf size={18} className="mt-0.5 shrink-0 text-[#1d6654]" /><p className="text-xs leading-5 text-text-muted"><span className="block font-bold text-text-heading">Rooted in nature</span>Thoughtfully selected wellness essentials.</p></div>
                                <div className="flex items-start gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#1d6654]" /><p className="text-xs leading-5 text-text-muted"><span className="block font-bold text-text-heading">Your list, your pace</span>Saved items stay with your account.</p></div>
                            </div>
                        </section>
                    ) : (
                        <>
                            <section className="mb-8 flex flex-col gap-5 border-b border-border-light pb-6 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1d6654]"><Sparkles size={15} />Curated for your wellbeing</p>
                                    <h2 className="mt-2 font-serif text-3xl text-text-heading">Saved for your daily rituals</h2>
                                    <p className="mt-2 text-sm text-text-muted">Your selected Ayurva Pro essentials, ready when you are.</p>
                                </div>
                                <div className="flex items-center gap-6 sm:pb-1">
                                    <div><p className="text-xs text-text-muted">Saved items</p><p className="mt-1 text-lg font-bold text-text-heading">{wishlist.length}</p></div>
                                    <div className="h-9 w-px bg-border-light" />
                                    <div><p className="text-xs text-text-muted">Current total</p><p className="mt-1 text-lg font-bold text-text-heading">{formatPrice(savedValue)}</p></div>
                                </div>
                            </section>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                                {wishlist.map((product) => (
                                    <ProductCard key={product._id || product.id} product={product} />
                                ))}
                            </div>
                            <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border-light pt-6 sm:flex-row sm:items-center">
                                <p className="text-sm text-text-muted">Wellness is built one thoughtful choice at a time.</p>
                                <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-text-heading transition-colors hover:text-accent-gold">Continue exploring <ArrowRight size={16} /></Link>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </Layout>
    );
}
