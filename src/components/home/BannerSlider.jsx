import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBanners, BASE_URL } from '@/lib/api';
import useAsync from '@/hooks/useAsync';

const BannerSlider = () => {
    const [current, setCurrent] = useState(0);
    const { execute: fetchBanners, data: banners, isLoading } = useAsync(getBanners);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    useEffect(() => {
        if (!banners || banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners]);

    const nextSlide = () => banners && setCurrent((prev) => (prev + 1) % banners.length);
    const prevSlide = () => banners && setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

    // Resolve Image URL
    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    if (isLoading) {
        return (
            <div className="w-full aspect-[21/9] sm:aspect-[5/1] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400 font-medium">Loading Banners...</div>
            </div>
        );
    }

    if (!banners || banners.length === 0) return null;

    return (
        <div className={cn(
            "relative w-full aspect-[20/9] sm:aspect-[3/1] overflow-hidden group shadow-md sm:shadow-lg bg-gray-100 rounded-xl sm:rounded-2xl"
        )}>
            {banners.map((banner, index) => (
                <div
                    key={banner._id || index}
                    className={cn(
                        "absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform",
                        index === current ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-8 -z-10 pointer-events-none"
                    )}
                >
                    {/* Full Background Image */}
                    <img
                        src={getImageUrl(banner.imageUrl)}
                        alt={banner.title || `Banner ${index + 1}`}
                        className="absolute inset-0 w-full h-full md:object-cover"
                        onError={(e) => { e.target.src = 'https://placehold.co/1920x380?text=Image+Not+Found'; }}
                    />

                    {/* Content Section */}
                    <div className={cn(
                        "relative z-20 w-full h-full flex flex-col justify-center px-6 sm:px-12 md:px-20",
                        (banner.title || banner.subtitle) ? "bg-black/20" : "bg-transparent"
                    )}>
                        {/* If Link exists but NO Title, make common slide area a link */}
                        {!banner.title && banner.link ? (
                            <Link to={banner.link} className="absolute inset-0 z-30"></Link>
                        ) : null}

                        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            {banner.subtitle && (
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded border border-white/30 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
                                    {banner.subtitle}
                                </span>
                            )}

                            {banner.title && (
                                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6 leading-tight drop-shadow-xl">
                                    {banner.title}
                                </h2>
                            )}

                            {banner.title && banner.link && (
                                <Link to={banner.link}>
                                    <button className="bg-white text-dark px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-accent-gold hover:text-white transition-all duration-300 shadow-xl transform hover:-translate-y-1">
                                        Shop Now
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-white/20 hover:bg-white text-white hover:text-text-heading rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-white/20 hover:bg-white text-white hover:text-text-heading rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {banners.length > 1 && (
                <div className="absolute bottom-3 left-5 xs:bottom-4 xs:left-6 sm:bottom-4 sm:left-10 z-20 flex gap-1.5 sm:gap-2">
                    {banners.map((_, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "h-1 sm:h-1.5 rounded-full transition-all duration-300",
                                idx === current ? "bg-white w-4 sm:w-8" : "bg-white/40 w-1.5 sm:w-2"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BannerSlider;
