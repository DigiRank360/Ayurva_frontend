import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import NewArrivals from '@/components/home/NewArrivals';
import TrendingSection from '@/components/home/TrendingSection';
import Newsletter from '@/components/home/Newsletter';
import CircularCategories from '@/components/home/CircularCategories';
import CustomerReviews from '@/components/home/CustomerReviews';

export default function Home() {
    return (
        <Layout>
            {/* Hero Section (BannerSlider inside) */}
            <Hero />
             {/* Circular Categories */}
            <CircularCategories />
            {/* Trending Section */}
            <TrendingSection />
            {/* New Arrivals Section */}
            <NewArrivals />
            {/* Category Showcase */}
            <CategoryGrid />
            {/* Features Bar */}
            <FeaturesSection />
           
            {/* Customer Reviews */}
            <CustomerReviews />
            {/* Newsletter / CTA */}
            <Newsletter />
        </Layout>
    );
}
