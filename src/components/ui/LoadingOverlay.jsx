import React from 'react';
import { cn } from '@/lib/utils';
import Spinner from './Spinner';

const LoadingOverlay = ({
    isLoading,
    message = 'Loading...',
    fullScreen = false,
    className
}) => {
    if (!isLoading) return null;

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-4 bg-black/50 backdrop-blur-sm z-50",
                fullScreen ? "fixed inset-0" : "absolute inset-0",
                className
            )}
        >
            <Spinner size="xl" color="white" />
            {message && (
                <p className="text-white text-lg font-medium tracking-wide">
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoadingOverlay;
