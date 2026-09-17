import React from 'react';
import { cn } from '@/lib/utils';

const SectionHeading = ({ title, subtitle, centered = false, className }) => {
    return (
        <div className={cn("mb-10 lg:mb-14", centered && "text-center", className)}>
            <h2 className="text-2xl md:text-3xl font-bold text-text-heading mb-3 tracking-tight font-sans uppercase animate-fade-in-up">
                {title}
            </h2>
            {subtitle && (
                <p className="text-text-muted text-lg max-w-2xl mx-auto font-light animate-fade-in-up delay-100">
                    {subtitle}
                </p>
            )}
            <div className={cn("mt-4 h-1 w-20 bg-accent-gold", centered && "mx-auto")}></div>
        </div>
    );
};

export default SectionHeading;
