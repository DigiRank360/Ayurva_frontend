import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBanners } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';
import useAsync from '@/hooks/useAsync';
import ashwagandhaImg from '@/assets/banners/ashwagandha.png';
import turmericImg from '@/assets/banners/turmeric.png';
import tulsiImg from '@/assets/banners/tulsi.png';

const defaultSlides = [
    {
        _id: 'slide-1',
        imageUrl: ashwagandhaImg,
     
    },
    {
        _id: 'slide-2',
        imageUrl: turmericImg,
    },
    {
        _id: 'slide-3',
        imageUrl: tulsiImg,
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

                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,20,19,0.65)] via-[rgba(3,20,19,0.35)] to-[rgba(3,20,19,0.1)]" />

                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
                            <div className="max-w-[640px] text-white">
                                {banner.subtitle && (
                                    <span className="mb-3 inline-flex items-center rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-sm sm:mb-5 sm:text-[10px] sm:tracking-[0.24em]">
                                        {banner.subtitle}
                                    </span>
                                )}

                                {banner.title && (
                                    <h2 className="text-2xl font-bold leading-[1.05] text-white sm:text-[4rem] sm:leading-[0.98] md:text-[5.1rem] lg:text-[6rem]">
                                        {banner.title}
                                    </h2>
                                )}

                                <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
                                    <Link to={banner.link || '/shop'}
                                        className="inline-flex items-center justify-center rounded-full bg-[#0f4f4d] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_35px_rgba(15,79,77,0.28)] transition hover:bg-[#0b413f] sm:px-7 sm:py-3 sm:text-[10px] sm:tracking-[0.2em]"
                                    >
                                        Shop Now
                                    </Link>
                                    <button className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-sm transition hover:bg-white/20 sm:px-7 sm:py-3 sm:text-[10px] sm:tracking-[0.2em]">
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
                                    idx === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
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
