import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Gift, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/PageHero';
import ProductCard from '@/components/products/ProductCard';
import { getProducts } from '@/lib/api';

export default function GiftGuide() {
    const productsQuery = useQuery({
        queryKey: ['giftGuideProducts'],
        queryFn: () => getProducts({ page: 1, limit: 4, active: true, sort: 'best-selling' }),
    });
    const products = productsQuery.data?.products || [];

    return (
        <Layout>
            <PageHero title="Thoughtful Wellness Gifts" subtitle="Share a daily ritual rooted in nature and care." backgroundImage="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85" currentPage="Gift Guide" />
            <main className="bg-bg-main">
                <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:py-16">
                    <div>
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold"><Gift size={15} /> A little care, every day</p>
                        <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-text-heading md:text-4xl">Choose something that becomes part of their routine.</h2>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-text-muted">Explore customer favorites and natural wellness essentials. Product availability and delivery options are confirmed at checkout.</p>
                        <Link to="/shop" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-text-heading px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-gold hover:text-text-heading">Explore the collection <ArrowRight size={16} /></Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <img className="aspect-[4/5] w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=85" alt="Herbal tea and botanical ingredients" />
                        <img className="mt-8 aspect-[4/5] w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85" alt="A calm wellness ritual" />
                    </div>
                </section>

                <section className="border-y border-border-light bg-white px-4 py-12 sm:px-6 md:py-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold"><Leaf size={15} /> Customer favorites</p><h2 className="mt-2 font-serif text-3xl text-text-heading">Wellness worth sharing</h2></div>
                            <Link to="/shop?sort=best-selling" className="text-sm font-semibold text-text-heading underline underline-offset-4">Shop all favorites</Link>
                        </div>
                        {productsQuery.isLoading ? <p className="py-12 text-center text-sm text-text-muted">Loading the current collection...</p> : productsQuery.error ? <p role="alert" className="py-12 text-center text-sm text-red-700">Products are temporarily unavailable. Please visit the collection.</p> : products.length ? <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div> : <p className="py-12 text-center text-sm text-text-muted">No products are available right now.</p>}
                    </div>
                </section>
            </main>
        </Layout>
    );
}