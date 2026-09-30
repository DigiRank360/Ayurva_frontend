import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBanners } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';
import useAsync from '@/hooks/useAsync';

const defaultSlides = [
    {
        _id: 'slide-1',
        title: 'Organic Honey For Healthy Living',
        subtitle: 'Premium organic honey',
        imageUrl: 'https://images.unsplash.com/photo-1589987607602-7d1f394f4a6d?auto=format&fit=crop&w=1800&q=80',
        link: '/shop',
    },
    {
        _id: 'slide-2',
        title: 'Pure Honey, Better Wellness',
        subtitle: 'Freshly harvested',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=80',
        link: '/shop',
    },
    {
        _id: 'slide-3',
        title: 'Golden Drops of Nature',
        subtitle: '100% natural goodness',
        imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa52ac7d9b90?auto=format&fit=crop&w=1800&q=80',
        link: '/shop',
    },
];

const BannerSlider = () => {
    const [current, setCurrent] = useState(0);
    const { execute: fetchBanners, data: banners, isLoading } = useAsync(getBanners);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    const slides = banners && banners.length ? banners : defaultSlides;

    useEffect(() => {
        if (!slides || slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides]);

    const nextSlide = () => slides && setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => slides && setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    if (isLoading) {
        return (
            <div className="aspect-[4/3] w-full animate-pulse sm:aspect-auto sm:h-[540px]" />
        );
    }

    return (
        <div className={cn(
            'relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:h-[540px]',
            slides[current]?.mobileImageUrl && 'aspect-[4/5]'
        )}>
            {slides.map((banner, index) => (
                <div
                    key={banner._id || index}
                    className={cn(
                        'absolute inset-0 h-full w-full transition-all duration-1200 ease-in-out',
                        index === current ? 'translate-x-0 opacity-100 z-10' : 'translate-x-10 opacity-0 -z-10 pointer-events-none'
                    )}
                >
                    <picture>
                        {banner.mobileImageUrl && (
                            <source
                                media="(max-width: 639px)"
                                srcSet={getImageUrl(banner.mobileImageUrl)}
                            />
                        )}
                        <img
                            src={getImageUrl(banner.imageUrl)}
                            alt={banner.title || `Banner ${index + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1589987607602-7d1f394f4a6d?auto=format&fit=crop&w=1800&q=80'; }}
                        />
                    </picture>

                    {/* <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,20,19,0.28)] via-[rgba(3,20,19,0.08)] to-[rgba(3,20,19,0.02)]" /> */}

                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
                            <div className="max-w-[640px] text-white">
                                {banner.subtitle && (
                                    <span className="mb-3 inline-flex items-center rounded-full border border-[#173d3a]/20 bg-[#f5f0e4]/70 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#173d3a] shadow-sm backdrop-blur-sm sm:mb-5 sm:text-[10px] sm:tracking-[0.24em]">
                                        {banner.subtitle}
                                    </span>
                                )}

                                {banner.title && (
                                    <h2 className="text-2xl font-bold leading-[1.05] text-[#173d3a] sm:text-[4rem] sm:leading-[0.98] md:text-[5.1rem] lg:text-[6rem]">
                                        {banner.title}
                                    </h2>
                                )}

                                <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
                                    <Link to={banner.link || '/shop'}
                                        className="inline-flex items-center justify-center rounded-full bg-[#0f4f4d] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_35px_rgba(15,79,77,0.28)] transition hover:bg-[#0b413f] sm:px-7 sm:py-3 sm:text-[10px] sm:tracking-[0.2em]"
                                    >
                                        Shop Now
                                    </Link>
                                    <button className="inline-flex items-center justify-center rounded-full border border-[#173d3a]/25 bg-[#f7f7f2]/70 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#173d3a] shadow-sm transition hover:bg-[#f0f0eb] sm:px-7 sm:py-3 sm:text-[10px] sm:tracking-[0.2em]">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 sm:flex"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 sm:flex"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={cn(
                                    'h-2 rounded-full transition-all duration-300',
                                    idx === current ? 'w-8 bg-[#173d3a]' : 'w-2 bg-[#173d3a]/35'
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BannerSlider;
