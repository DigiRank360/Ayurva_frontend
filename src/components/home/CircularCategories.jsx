import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '@/lib/api';
import useAsync from '@/hooks/useAsync';
import { getImageUrl } from '@/lib/utils';

export default function CircularCategories() {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const { execute: fetchCategories, data: categories, isLoading } = useAsync(getCategories);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || !categories || categories.length === 0) return;

        let animationFrameId;
        const scrollSpeed = 0.45; // Reduced speed for better visibility

        const loop = () => {
            if (!isPaused) {
                if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth) - 10) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += scrollSpeed;
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, categories]);

   

    if (isLoading) {
        return (
            <section className="relative w-full py-8 md:py-12 bg-bg-main border-b border-border-light overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-5 md:gap-10 overflow-x-hidden pb-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-3 shrink-0 animate-pulse">
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gray-200" />
                                <div className="h-3 w-16 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!categories || categories.length === 0) return null;

    return (
        <section className="relative w-full py-8 md:py-12 bg-bg-main border-b border-border-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Left Fade Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-bg-main via-bg-main/60 to-transparent pointer-events-none" />

                {/* Right Fade Shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-bg-main via-bg-main/60 to-transparent pointer-events-none" />

                {/* Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 md:gap-10 overflow-x-auto scrollbar-hide pb-4 px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Render standard list */}
                    {categories.map((cat) => (
                        <Link to={`/shop?category=${cat.name}`} key={cat._id} className="flex flex-col items-center gap-3 shrink-0 group/item cursor-pointer">

                            {/* The "Royal Ring" Container */}
                            <div className="relative">
                                {/* Gold Halo (Outer Ring) - Mobile: w-20 (80px), Desktop: w-32 (128px) */}
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-[1px] md:border-[1.5px] border-accent-gold/40 p-[3px] md:p-[5px] group-hover/item:border-accent-gold group-hover/item:scale-105 transition-all duration-500 ease-out">

                                    {/* White Separator (Inner Ring) */}
                                    <div className="w-full h-full rounded-full border-[2px] md:border-[4px] border-white shadow-md overflow-hidden relative">

                                        {/* Image */}
                                        <img
                                            src={getImageUrl(cat.imageUrl)}
                                            alt={cat.name}
                                            className="w-full h-full object-contain bg-white group-hover/item:scale-110 group-hover/item:rotate-1 transition-transform duration-700 ease-in-out"
                                            onError={(e) => { e.target.src = 'https://placehold.co/128x128?text=Error'; }}
                                        />

                                        {/* Inner Glass Sheen */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Label */}
                            <span className="text-[10px] md:text-sm font-bold text-text-heading uppercase tracking-[0.15em] relative text-center">
                                {cat.name}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent-gold group-hover/item:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
                    ))}

                    {/* Duplicate items for smoother infinite scroll feel */}
                    {categories.map((cat) => (
                        <Link to={`/shop?category=${cat.name}`} key={`dup-${cat._id}`} className="flex flex-col items-center gap-3 shrink-0 group/item cursor-pointer">
                            <div className="relative">
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-[1px] md:border-[1.5px] border-accent-gold/40 p-[3px] md:p-[5px] group-hover/item:border-accent-gold group-hover/item:scale-105 transition-all duration-500 ease-out">
                                    <div className="w-full h-full rounded-full border-[2px] md:border-[4px] border-white shadow-md overflow-hidden relative">
                                        <img
                                            src={getImageUrl(cat.imageUrl)}
                                            alt={cat.name}
                                            className="w-full h-full object-contain bg-white group-hover/item:scale-110 transition-transform duration-700 ease-in-out"
                                            onError={(e) => { e.target.src = 'https://placehold.co/128x128?text=Error'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] md:text-sm font-bold text-text-heading uppercase tracking-[0.15em] relative text-center">
                                {cat.name}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent-gold group-hover/item:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
