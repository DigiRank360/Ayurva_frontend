import React, { useRef, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/products/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useAsync from '@/hooks/useAsync';
import { getNewArrivals } from '@/lib/api';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const { execute, data: newArrivals, isLoading, error } = useAsync(getNewArrivals);

    useEffect(() => {
        execute();
    }, [execute]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    };

    if (error) {
        return null; // Fail silently or handle error gracefully
    }

    return (
        <section className="py-12 bg-bg-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row justify-between items-end mb-10">
                    <SectionHeading
                        title="New Arrivals"
                        subtitle="Fresh from the loom. Discover our latest masterpieces."
                        className="mb-0 text-left"
                        centered={false}
                    />

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-black hover:text-white transition-all md:hidden"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-black hover:text-white transition-all md:hidden"
                        >
                            <ChevronRight size={20} />
                        </button>

                        <Link to="/shop">
                            <button className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-heading hover:text-accent-gold transition-colors border-b border-transparent hover:border-accent-gold pb-0.5">
                                View All Products <ArrowRight size={14} />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Horizontal Scroll for Mobile, Grid for Desktop */}
                <div
                    ref={scrollRef}
                    className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory"
                >
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <div key={`skeleton-${idx}`} className="min-w-[260px] md:min-w-0 snap-center space-y-4">
                                <Skeleton className="h-[300px] w-full rounded-xl" />
                                <div className="space-y-2 px-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                            </div>
                        ))
                    ) : newArrivals && newArrivals.length > 0 ? (
                        newArrivals.slice(0, 8).map((product) => (
                            <div key={product._id} className="min-w-[260px] md:min-w-0 snap-center">
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            No new arrivals available at the moment.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
