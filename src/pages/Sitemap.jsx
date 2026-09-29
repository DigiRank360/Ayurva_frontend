import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/PageHero';

const siteSections = [
    { title: 'Discover', links: [['Home', '/'], ['Shop all products', '/shop'], ['New arrivals', '/shop?sort=newest'], ['Best sellers', '/shop?sort=best-selling'], ['Gift guide', '/gifts'], ['About Ayurva Pro', '/about'], ['Our story', '/story']] },
    { title: 'Customer care', links: [['Contact us', '/contact'], ['Shipping information', '/shipping'], ['Returns and refunds', '/returns'], ['Track an order', '/track'], ['Frequently asked questions', '/faq']] },
    { title: 'Your account', links: [['Profile and orders', '/profile'], ['Wishlist', '/wishlist'], ['Checkout', '/checkout']] },
    { title: 'Policies', links: [['Privacy policy', '/privacy-policy'], ['Terms of service', '/terms']] },
];

export default function Sitemap() {
    return (
        <Layout>
            <PageHero title="Sitemap" subtitle="Find your way around the Ayurva Pro store." backgroundImage="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1800&q=85" currentPage="Sitemap" />
            <main className="bg-bg-main px-4 py-12 sm:px-6 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {siteSections.map((section) => <section key={section.title}>
                        <h2 className="border-b border-border-light pb-3 text-sm font-bold uppercase tracking-[0.16em] text-text-heading">{section.title}</h2>
                        <ul className="mt-4 space-y-3">{section.links.map(([label, path]) => <li key={path + label}><Link to={path} className="text-sm text-text-muted transition-colors hover:text-accent-gold">{label}</Link></li>)}</ul>
                    </section>)}
                </div>
            </main>
        </Layout>
    );
}