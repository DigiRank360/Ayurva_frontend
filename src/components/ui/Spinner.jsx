import React from 'react';
import { cn } from '@/lib/utils';

const Spinner = ({
    size = 'md',
    color = 'gold',
    className
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-3',
        xl: 'w-12 h-12 border-4'
    };

    const colorClasses = {
        gold: 'border-accent-gold/30 border-t-accent-gold',
        white: 'border-white/30 border-t-white',
        dark: 'border-gray-300 border-t-gray-800',
        primary: 'border-brand-primary/30 border-t-brand-primary'
    };

    return (
        <div
            className={cn(
                "inline-block rounded-full animate-spin",
                sizeClasses[size],
                colorClasses[color],
                className
            )}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
