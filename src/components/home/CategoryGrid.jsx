import React, { useEffect, useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Link } from 'react-router-dom';
import { cn, getImageUrl } from '@/lib/utils';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useAsync from '@/hooks/useAsync';
import { getCategories } from '@/lib/api';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`}></div>
);

const CategoryGrid = () => {
    const { execute, data: categories, isLoading, error } = useAsync(getCategories);
    const scrollRef = useRef(null);

    useEffect(() => {
        execute();
    }, [execute]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350;
            if (direction === 'left') {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    };

    if (error) {
        return null;
    }

    return (
        <section className="py-12 md:py-16 bg-bg-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
                    <SectionHeading
                        title="Shop by Category"
                        subtitle="Explore our handcrafted collections designed for your every need."
                        className="mb-0 text-left"
                        centered={false}
                    />

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-heading hover:text-accent-gold transition-colors group border-b border-transparent hover:border-accent-gold pb-0.5 ml-4">
                            View All Collections <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={16} />
                        </Link>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory smooth-scroll"
                >
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <div key={`skeleton-${idx}`} className="min-w-[260px] md:min-w-[300px] lg:min-w-[320px] snap-center">
                                <Skeleton className="w-full aspect-[4/5]" />
                            </div>
                        ))
                    ) : categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <div key={category._id} className="min-w-[260px] md:min-w-[300px] lg:min-w-[320px] snap-center">
                                <Link
                                    to={`/shop?category=${encodeURIComponent(category.name)}`}
                                    className="group relative overflow-hidden rounded-xl cursor-pointer block shadow-sm hover:shadow-2xl transition-all duration-500 w-full aspect-[4/5] bg-white flex flex-col justify-end"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                                        <img
                                            src={getImageUrl(category.imageUrl)}
                                            alt={category.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                                        />
                                        {/* Gradient overlay for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                    </div>

                                    {/* Content Overlay positioned at bottom */}
                                    <div className="relative z-10 p-5 md:p-6 w-full flex flex-col items-center text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-xl md:text-2xl font-sans font-bold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                                            {category.name}
                                        </h3>
                                        <div className="overflow-hidden">
                                            <p className="text-white/90 text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center gap-2">
                                                Explore <ArrowUpRight size={14} />
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            No categories available.
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-heading border-b border-text-heading pb-1">
                        View All Collections <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
