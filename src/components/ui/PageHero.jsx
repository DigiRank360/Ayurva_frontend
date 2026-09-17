import React from 'react';
import { Link } from 'react-router-dom';

const PageHero = ({ title, subtitle, backgroundImage, currentPage, children }) => {
    return (
        <div className="relative py-12 md:py-24 bg-black isolate overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-[-1]">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1 className="text-3xl md:text-6xl font-sans font-bold text-white mb-2 md:mb-4 tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-gray-200 text-sm md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-6 md:mb-8 px-4">
                        {subtitle}
                    </p>
                )}

                {/* Additional Content (e.g., Checkout Steps) */}
                {children && <div className="mb-8 relative z-20">{children}</div>}

                {/* Breadcrumbs */}
                <div className="flex items-center justify-center gap-3 text-xs md:text-sm tracking-widest uppercase text-gray-400">
                    <Link to="/" className="hover:text-white transition-colors border-b border-transparent hover:border-white">Home</Link>
                    <span className="text-accent-gold">•</span>
                    <span className="text-white font-medium">{currentPage || title}</span>
                </div>
            </div>
        </div>
    );
};

export default PageHero;
