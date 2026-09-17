import React, { useEffect, useState, useCallback } from 'react';
import PageHero from '@/components/ui/PageHero';
import { SlidersHorizontal, X, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import FilterSidebar, { FilterDrawer } from '@/components/shop/FilterSidebar';
import useShopFilters from '@/hooks/useShopFilters';
import { cn } from '@/lib/utils';
import { getProducts, getCategories } from '@/lib/api';
import toast from 'react-hot-toast';

// Creates evenly distributed, rounded price buckets from min/max
const generateDynamicRanges = (min, max) => {
    if (min === undefined || max === undefined || max === 0) return [];
    if (min === max) {
        // Only one price point — create a single bucket
        const low = Math.floor(min / 500) * 500;
        return [{ id: `${low}-${low + 500}`, label: `₹${low.toLocaleString('en-IN')} - ₹${(low + 500).toLocaleString('en-IN')}`, min: low, max: low + 500 }];
    }

    const diff = max - min;
    let rawStep = diff / 4;

    const magnitudes = [100, 250, 500, 1000, 2500, 5000, 10000];
    let step = magnitudes[magnitudes.length - 1];
    for (const m of magnitudes) {
        if (rawStep <= m) {
            step = m;
            break;
        }
    }

    const start = Math.floor(min / step) * step;
    let end = Math.ceil(max / step) * step;
    if (end <= start) end = start + step;

    const ranges = [];
    for (let current = start; current < end; current += step) {
        const next = current + step;
        ranges.push({
            id: `${current}-${next}`,
            label: `₹${current.toLocaleString('en-IN')} - ₹${next.toLocaleString('en-IN')}`,
            min: current,
            max: next
        });
    }
    return ranges;
};

export default function Shop() {
    const {
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
    } = useShopFilters();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [dynamicPriceRanges, setDynamicPriceRanges] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch categories from backend on mount
    useEffect(() => {
        const fetchCats = async () => {
            try {
                const data = await getCategories();
                setCategories(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error('Failed to fetch categories:', e);
            }
        };
        fetchCats();
    }, []);

    const fetchProducts = useCallback(async (isLoadMore = false) => {
        setIsLoading(true);
        try {
            const params = { page, limit: 12, active: true };
            if (activeCategory !== 'All') params.category = activeCategory;
            if (sortBy) params.sort = sortBy;

            if (priceRange) {
                const [minP, maxP] = priceRange.split('-');
                if (minP && maxP) {
                    params.minPrice = Number(minP);
                    params.maxPrice = Number(maxP);
                }
            }

            const data = await getProducts(params);

            if (isLoadMore) {
                setProducts(prev => [...prev, ...data.products]);
            } else {
                setProducts(data.products);

                // Generate dynamic price ranges from backend aggregation
                if (data.minPriceAvailable !== undefined && data.maxPriceAvailable !== undefined && data.maxPriceAvailable > 0) {
                    setDynamicPriceRanges(generateDynamicRanges(data.minPriceAvailable, data.maxPriceAvailable));
                } else {
                    setDynamicPriceRanges([]);
                }
            }

            setTotalPages(data.pages);
            setTotalResults(data.total);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setIsLoading(false);
        }
    }, [activeCategory, sortBy, priceRange, page]);

    // Fetch when filters or page changes
    useEffect(() => {
        fetchProducts(page > 1);
    }, [fetchProducts, page]);

    // Scroll to top on initial mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLoadMore = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <Layout>
            {/* Premium Page Header with Background Image */}
            <PageHero
                title="The Collection"
                subtitle="Handcrafted luxury, designed for the modern connoisseur."
                backgroundImage="https://media.istockphoto.com/id/93355119/photo/indian-saris.jpg?s=612x612&w=0&k=20&c=afmfiTJg0VAmIY6P_TJ_JYsTfGhUdevv18WXQRUZ8NQ="
                currentPage="Shop"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 md:gap-12">

                {/* Desktop Sidebar */}
                <FilterSidebar
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    priceRanges={dynamicPriceRanges}
                    categories={categories}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    className="hidden lg:block sticky top-28 h-fit w-64"
                />

                {/* Mobile Filter Drawer */}
                <FilterDrawer
                    isOpen={isMobileFilterOpen}
                    onClose={() => setIsMobileFilterOpen(false)}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    priceRanges={dynamicPriceRanges}
                    categories={categories}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    clearFilters={clearFilters}
                />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-4 mb-6 md:mb-8 border-b border-border-default pb-4 md:pb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <p className="text-text-muted text-xs md:text-sm tracking-wide hidden md:block">
                                Showing <span className="text-text-heading font-bold">{products.length}</span> of <span className="text-text-heading font-bold">{totalResults}</span> results
                            </p>

                            <div className="flex flex-row items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-border-default rounded-lg text-xs font-bold uppercase tracking-widest text-text-heading hover:bg-black hover:text-white transition-all"
                                >
                                    <SlidersHorizontal size={14} /> Filters
                                </button>
                            </div>
                        </div>

                        {/* Price Indicators — Scrollable horizontal pills */}
                        {dynamicPriceRanges.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                {dynamicPriceRanges.map((range) => (
                                    <button
                                        key={range.id}
                                        onClick={() => setPriceRange(priceRange === range.id ? '' : range.id)}
                                        className={cn(
                                            "whitespace-nowrap px-5 py-1.5 rounded-full border text-xs font-bold transition-colors shadow-sm flex-shrink-0 cursor-pointer select-none",
                                            priceRange === range.id
                                                ? "border-accent-gold text-accent-gold bg-accent-gold/5"
                                                : "border-border-default text-text-muted hover:border-accent-gold hover:text-accent-gold bg-white"
                                        )}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Mobile Result Count */}
                        <p className="text-text-muted text-xs tracking-wide md:hidden w-full text-center pt-1">
                            Showing <span className="text-text-heading font-bold">{products.length}</span> of <span className="text-text-heading font-bold">{totalResults}</span> results
                        </p>
                    </div>

                    {/* Active Filters */}
                    {(activeCategory !== 'All' || (priceRange && priceRange.length > 0)) && (
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 animate-fade-in">
                            {activeCategory !== 'All' && (
                                <span className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-bg-section text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-heading shadow-sm">
                                    {activeCategory}
                                    <X size={12} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => setActiveCategory('All')} />
                                </span>
                            )}
                            {priceRange && (
                                <span className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-bg-section text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-heading shadow-sm">
                                    {dynamicPriceRanges.find(r => r.id === priceRange)?.label || priceRange}
                                    <X size={12} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => setPriceRange('')} />
                                </span>
                            )}
                            <button onClick={clearFilters} className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent-gold hover:text-text-heading transition-colors ml-1 md:ml-2 py-1">
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-8 md:gap-y-12 min-h-[400px]">
                        {isLoading && page === 1 ? (
                            <div className="col-span-full flex justify-center items-center">
                                <Loader2 className="animate-spin text-accent-gold" size={40} />
                            </div>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-12">
                                <p className="text-xl font-medium mb-2">No products found</p>
                                <p className="text-sm">Try adjusting your filters or search criteria.</p>
                                <button onClick={clearFilters} className="mt-4 px-6 py-2 border border-text-heading rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination - Load More */}
                    {page < totalPages && (
                        <div className="mt-16 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className="px-10 py-4 border border-text-heading text-text-heading font-bold uppercase tracking-[0.2em] text-xs hover:bg-text-heading hover:text-white transition-all duration-300 rounded-full flex items-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
