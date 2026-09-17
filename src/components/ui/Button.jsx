import React from 'react';
import { cn } from '@/lib/utils';
import Spinner from './Spinner';

const Button = React.forwardRef(({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    loadingText,
    type = 'button',
    ...props
}, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand-primary hover:bg-brand-primary-dark text-white shadow-sm hover:shadow-md active:scale-[0.98]",
        secondary: "bg-accent-gold hover:bg-accent-gold/90 text-gray-900 shadow-sm hover:shadow-md active:scale-[0.98]",
        outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white active:scale-[0.98]",
        ghost: "text-brand-primary hover:bg-brand-primary/10 active:scale-[0.98]",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md active:scale-[0.98]"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-5 py-2.5 text-base rounded-lg",
        lg: "px-6 py-3 text-lg rounded-xl",
        xl: "px-8 py-4 text-xl rounded-xl"
    };

    const spinnerColor = variant === 'outline' || variant === 'ghost' ? 'gold' : 'white';

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading && (
                <Spinner size={size === 'sm' ? 'sm' : 'md'} color={spinnerColor} />
            )}

            {!isLoading && LeftIcon && (
                <LeftIcon className="w-5 h-5" />
            )}

            {isLoading ? loadingText || children : children}

            {!isLoading && RightIcon && (
                <RightIcon className="w-5 h-5" />
            )}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
