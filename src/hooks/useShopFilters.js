import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useShopFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialCategory = searchParams.get('category') || 'All';
    const initialSort = searchParams.get('sort') || 'newest';
    const initialPrice = searchParams.get('price') || '';

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState(initialPrice); // Single string (e.g. 'under-5000')
    const [sortBy, setSortBy] = useState(initialSort);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [page, setPage] = useState(1);

    // Sync state with URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (activeCategory !== 'All') params.set('category', activeCategory);
        if (sortBy !== 'newest') params.set('sort', sortBy);
        if (priceRange) params.set('price', priceRange);
        setSearchParams(params, { replace: true });
        setPage(1); // Reset page on filter change
    }, [activeCategory, sortBy, priceRange, setSearchParams]);

    const clearFilters = () => {
        setActiveCategory('All');
        setPriceRange('');
        setSortBy('newest');
        setPage(1);
    };

    return {
        activeCategory,
        setActiveCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        clearFilters,
        page,
        setPage
    };
}
