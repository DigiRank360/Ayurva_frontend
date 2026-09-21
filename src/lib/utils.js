import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Format currency
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Get image URL helper


export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';

    // If already a full URL (http/https), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Otherwise, construct URL with API base (remove /api from end)
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const BASE_URL = API_BASE.replace('/api', '');

    // Remove leading slash from path if exists
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    return `${BASE_URL}${cleanPath}`;
};


// Dummy Data for Testing
export const dummyProducts = [
    {
        _id: '1',
        name: 'Maharani Art Silk Saree',
        price: 2299,
        originalPrice: 4999,
        image: 'https://placehold.co/400x500',
        category: 'Sarees',
        rating: 4.8,
        reviews: 450,
        isNew: true,
        discount: 54,
    },
    {
        _id: '2',
        name: 'Bridal Semi-Stitched Lehenga',
        price: 1899,
        originalPrice: 3999,
        image: 'https://placehold.co/400x500',
        category: 'Lehengas',
        rating: 4.5,
        reviews: 120,
        isTrending: true,
        discount: 52,
    },
    {
        _id: '3',
        name: 'Traditional Kanjeevaram Weave',
        price: 1299,
        originalPrice: 2499,
        image: 'https://placehold.co/400x500',
        category: 'Sarees',
        rating: 4.6,
        reviews: 85,
        discount: 48,
    },
    {
        _id: '4',
        name: 'Georgette Anarkali Suit Set',
        price: 899,
        originalPrice: 1999,
        image: 'https://placehold.co/400x500',
        category: 'Suits',
        rating: 4.3,
        reviews: 210,
        discount: 55,
    },
    {
        _id: '5',
        name: 'Cotton Printed Daily Wear Kurti',
        price: 599,
        originalPrice: 1299,
        image: 'https://placehold.co/400x500',
        category: 'Kurtis',
        rating: 4.2,
        reviews: 340,
        discount: 53,
    },
    {
        _id: '6',
        name: 'Premium Silk Blend Saree',
        price: 1699,
        originalPrice: 3299,
        image: 'https://placehold.co/400x500',
        category: 'Sarees',
        rating: 4.7,
        reviews: 156,
        discount: 48,
    }
];
