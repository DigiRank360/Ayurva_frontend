import React, { useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/products/ProductCard';
import { getTrendingProducts } from '@/lib/api';
import useAsync from '@/hooks/useAsync';
const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const TrendingSection = () => {
    const { execute, data: trendingProducts, isLoading, error } = useAsync(getTrendingProducts);

    useEffect(() => {
        execute();
    }, [execute]);

    if (error) {
        return (
            <section className="py-10 bg-bg-section/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
                    Failed to load trending products. Please try again later.
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 bg-bg-section/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Trending Now"
                    centered
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <div key={`skeleton-${idx}`} className="space-y-4">
                                <Skeleton className="h-[250px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : trendingProducts && trendingProducts.length > 0 ? (
                        trendingProducts.map((product) => (
                            <ProductCard key={product._id} product={{ ...product, isTrending: true }} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            No trending products available at the moment.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;
