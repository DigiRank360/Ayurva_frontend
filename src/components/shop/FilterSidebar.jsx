import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, Plus, Minus } from 'lucide-react';
import { createPortal } from 'react-dom';

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-border-light py-6 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full group"
            >
                <h3 className="font-sans font-bold text-text-heading uppercase tracking-widest text-sm text-left">
                    {title}
                </h3>
                <span className="text-text-muted group-hover:text-accent-gold transition-colors">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
            </button>
            <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
            )}>
                {children}
            </div>
        </div>
    );
};

export default function FilterSidebar({
    activeCategory,
    setActiveCategory,
    priceRange,
    setPriceRange,
    priceRanges = [],
    categories = [],
    sortBy,
    setSortBy,
    className
}) {
    return (
        <aside className={cn("w-full lg:w-64 flex-shrink-0 bg-white lg:bg-transparent", className)}>
            <div className="space-y-2">
                {/* Categories */}
                <FilterSection title="Categories">
                    <ul className="space-y-3">
                        <li>
                            <button
                                onClick={() => setActiveCategory('All')}
                                className={cn(
                                    "text-sm transition-all duration-200 flex items-center gap-3 w-full text-left group",
                                    activeCategory === 'All' ? "text-text-heading font-bold pl-2" : "text-text-muted hover:text-text-heading hover:pl-2"
                                )}
                            >
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all",
                                    activeCategory === 'All' ? "bg-accent-gold scale-100" : "bg-gray-300 scale-0 group-hover:scale-100"
                                )} />
                                All
                            </button>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat._id}>
                                <button
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={cn(
                                        "text-sm transition-all duration-200 flex items-center gap-3 w-full text-left group",
                                        activeCategory === cat.name ? "text-text-heading font-bold pl-2" : "text-text-muted hover:text-text-heading hover:pl-2"
                                    )}
                                >
                                    <div className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-all",
                                        activeCategory === cat.name ? "bg-accent-gold scale-100" : "bg-gray-300 scale-0 group-hover:scale-100"
                                    )} />
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </FilterSection>

                {/* Price Range */}
                {priceRanges.length > 0 && (
                    <FilterSection title="Price Range">
                        <div className="space-y-4">
                            {priceRanges.map((range) => (
                                <label key={range.id} className="flex items-center gap-3 text-sm text-text-muted cursor-pointer hover:text-text-heading transition-colors group select-none">
                                    <div className="relative flex items-center justify-center w-5 h-5">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            value={range.id}
                                            checked={priceRange === range.id}
                                            onChange={() => setPriceRange(priceRange === range.id ? '' : range.id)}
                                            className="peer appearance-none w-5 h-5 border border-border-default rounded-full bg-white checked:border-text-heading checked:border-4 transition-all duration-200 cursor-pointer"
                                        />
                                    </div>
                                    <span className={cn(
                                        "transition-colors",
                                        priceRange === range.id && "text-text-heading font-medium"
                                    )}>
                                        {range.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>
                )}

                {/* Sort By */}
                <FilterSection title="Sort By">
                    <div className="space-y-3">
                        {[
                            { value: 'newest', label: 'Newest First' },
                            { value: 'price-asc', label: 'Price: Low to High' },
                            { value: 'price-desc', label: 'Price: High to Low' },
                            { value: 'best-selling', label: 'Best Sellers' }
                        ].map((option) => (
                            <label key={option.value} className="flex items-center gap-3 text-sm text-text-muted cursor-pointer hover:text-text-heading transition-colors group select-none">
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    <input
                                        type="radio"
                                        name="sortBy"
                                        value={option.value}
                                        checked={sortBy === option.value}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="peer appearance-none w-5 h-5 border border-border-default rounded-full bg-white checked:border-text-heading checked:border-4 transition-all duration-200 cursor-pointer"
                                    />
                                </div>
                                <span className={cn(
                                    "transition-colors",
                                    sortBy === option.value && "text-text-heading font-medium"
                                )}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            </div>
        </aside>
    );
}

// Mobile Filter Drawer Component — No price range pills here (they show in the toolbar on mobile)
export function FilterDrawer({
    isOpen,
    onClose,
    activeCategory,
    setActiveCategory,
    priceRange,
    setPriceRange,
    priceRanges = [],
    categories = [],
    sortBy,
    setSortBy,
    clearFilters
}) {
    if (typeof document === 'undefined') return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={cn(
                "fixed inset-y-0 right-0 z-[70] w-[85vw] sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:hidden flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="px-6 py-5 border-b border-border-light flex justify-between items-center bg-white">
                    <h2 className="font-sans font-bold text-lg tracking-wide text-text-heading uppercase">Filters & Sort</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-muted hover:bg-black hover:text-white transition-all transform hover:rotate-90 active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-2">
                    <FilterSidebar
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        priceRanges={priceRanges}
                        categories={categories}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        className="w-full"
                    />
                </div>

                <div className="p-6 border-t border-border-light bg-gray-50/50 flex gap-4">
                    <button
                        onClick={clearFilters}
                        className="flex-1 py-3.5 border border-text-heading text-text-heading font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-accent-gold transition-colors shadow-lg hover:shadow-xl transform active:scale-[0.98]"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>,
        document.body
    );
}
