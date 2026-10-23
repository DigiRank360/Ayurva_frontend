import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Clock3, Info, Loader2, PackageOpen, Stethoscope, Truck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import useSeo from '@/hooks/useSeo';
import PageHero from '@/components/ui/PageHero';
import ProductCard from '@/components/products/ProductCard';
import { getAllActiveProducts } from '@/lib/api';
import { formatPrice, getImageUrl } from '@/lib/utils';

const comboPackages = [
    {
        id: 'sugar-wellness-combo',
        badge: '3-Month Combo',
        badgeTone: 'green',
        title: 'AyuvaPro Sugar Wellness Combo — 3-Month Pack',
        description: 'A curated package containing Ayuveda Fiber, Ayuveda Shots and Ayuveda Diabetic Oil. Review the pack quantities, approved usage directions and product-specific precautions before ordering.',
        contents: [
            { label: 'Ayuveda Fiber × 3 packs', quantity: '90 sachets', matches: ['ayuvedafiber', 'ayurvedafiber', 'fiber'] },
            { label: 'Ayuveda Shots × 3 packs', quantity: '90 herbal shots', matches: ['ayuvedashots', 'ayurvedashots', 'shots', 'shot'] },
            { label: 'Ayuveda Diabetic Oil × 3 packs', matches: ['ayuvedadiabeticoil', 'ayurvedadiabeticoil', 'diabeticoil'] },
        ],
        price: '₹10,000',
        mrp: '₹14,999',
        pricingNote: 'Launch offer supplied; GST inclusion and invoice/price breakdown need confirmation.',
        support: '12-month doctor support is proposed. Provider, service type, schedule, availability, limitations and booking process need confirmation.',
    },
    {
        id: 'sexual-wellness-combo',
        badge: '3-Month Combo',
        badgeTone: 'slate',
        title: 'AyuvaPro Sexual Wellness Combo — 3-Month Pack',
        description: 'A curated package containing Ayuveda Power Capsules, Ayuveda Shilajit Resin and Ayuveda Vigour Oil. Review each product’s label, directions and precautions before use.',
        contents: [
            { label: 'Ayuveda Power Capsules × 3 packs', quantity: '180 capsules', matches: ['ayuvedapowercapsules', 'ayurvedapowercapsules', 'powercapsules'] },
            { label: 'Ayuveda Shilajit Resin × 3 packs', quantity: '60 g total', matches: ['ayuvedashilajitresin', 'ayurvedashilajitresin', 'shilajit'] },
            { label: 'Ayuveda Vigour Oil × 3 packs', matches: ['ayuvedavigouroil', 'ayurvedavigouroil', 'vigouroil', 'vigoroil'] },
        ],
        price: '₹10,000',
        mrp: '₹14,999',
        pricingNote: 'Launch offer supplied; confirm GST and final price presentation before publishing.',
        support: 'Confirm product classification, ingredients, contraindications and permitted label claims. No outcome is guaranteed.',
    },
    {
        id: 'sugar-wellness-jumbo',
        badge: 'Details to Confirm',
        badgeTone: 'gold',
        title: 'AyuvaPro Sugar Wellness Jumbo Pack — 3-Month Supply',
        description: 'A multi-pack bundle of selected AyuvaPro products. Check the exact contents, product labels, directions and support terms before placing your order.',
        contents: [],
        price: 'DP ₹9,999',
        mrp: '₹14,999',
        pricingNote: 'Confirm what “DP” means and whether ₹9,999 is the consumer selling price.',
        support: 'Three-month doctor support is proposed; service details and provider need confirmation. Referral programme terms require written and legal approval.',
    },
];

const normalizeName = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

function findProduct(products, matchNames) {
    return products.find((product) => {
        const productName = normalizeName(product.name || '');
        return matchNames.some((name) => productName.includes(name));
    });
}

function ComboImage({ combo, products }) {
    const images = products
        .filter(Boolean)
        .map((product) => ({
            name: product.name,
            src: getImageUrl(product.images?.[0] || product.image),
        }))
        .filter((image) => image.src)
        .slice(0, 3);

    if (!images.length) {
        return (
            <div className="relative h-40 overflow-hidden rounded-lg bg-[#e4eadf]">
                <img
                    src="https://images.unsplash.com/photo-1645537898980-dfb737f3b9cb?auto=format&fit=crop&w=900&q=80"
                    alt="Dried botanical flowers and leaves"
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-white">
                    <PackageOpen size={16} aria-hidden="true" />
                    <p className="text-xs font-semibold">Package details pending</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`grid h-40 gap-1 overflow-hidden rounded-lg bg-[#f3f0ea] ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {images.map((image) => (
                <img
                    key={`${combo.id}-${image.name}`}
                    src={image.src}
                    alt={image.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            ))}
        </div>
    );
}

function ComboCard({ combo, products, isLoading }) {
    const includedProducts = combo.contents.map((item) => ({
        ...item,
        product: findProduct(products, item.matches),
    }));
    const matchedProducts = includedProducts.map(({ product }) => product).filter(Boolean);
    const badgeStyle = {
        green: 'bg-[#063f31] text-white',
        slate: 'bg-[#293444] text-white',
        gold: 'bg-[#ad7b1f] text-white',
    }[combo.badgeTone];

    return (
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e7e1d5] bg-white shadow-[0_12px_35px_rgba(23,61,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,61,58,0.13)]">
            <span className={`absolute left-5 top-5 z-10 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] shadow-sm ${badgeStyle}`}>
                {combo.badge}
            </span>

            <div className="bg-[#f1eee7] p-4 sm:p-5">
                <ComboImage combo={combo} products={matchedProducts} />
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-xl font-bold leading-7 text-[#173d3a] sm:text-[1.35rem]">{combo.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#66716d]">{combo.description}</p>

                <div id={`${combo.id}-contents`} className="mt-5 rounded-xl border border-[#e1e9e2] bg-[#f5f8f5] p-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#416257]">
                        {combo.contents.length ? 'Included products · quantities as supplied' : 'Package contents'}
                    </h3>
                    {combo.contents.length ? (
                        <ul className="mt-3 space-y-3">
                            {includedProducts.map(({ label, quantity, product }) => (
                                <li key={label} className="flex items-start gap-2.5 text-sm leading-5 text-[#4e5c57]">
                                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#5b826e]" aria-hidden="true" />
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-medium">{label}</span>
                                        {quantity && <span className="text-xs text-[#748079]">{quantity}</span>}
                                        {!isLoading && product && (
                                            <Link to={`/product/${product._id}`} className="ml-2 inline-block text-xs font-semibold text-[#315a4c] underline underline-offset-2">
                                                Product details
                                            </Link>
                                        )}
                                        {!isLoading && !product && (
                                            <span className="block text-xs text-[#8a7060]">Not found in the active product catalogue</span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-2 text-sm leading-6 text-[#68716f]">Exact products, quantities and package contents need confirmation before publishing.</p>
                    )}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#eeeae4] pt-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8a7060]">Supplied price · verify before publishing</p>
                        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="text-2xl font-bold text-[#173d3a]">{combo.price}</span>
                            <span className="text-sm text-[#909892] line-through">{combo.mrp}</span>
                        </div>
                    </div>
                    <span className="rounded-full bg-[#f4efe1] px-3 py-1 text-[10px] font-bold text-[#80672e]">Draft price</span>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#727b76]">{combo.pricingNote}</p>

                <div className="mt-4 rounded-lg border border-[#eadfc9] bg-[#fcfaf5] p-3.5">
                    <div className="flex items-start gap-2.5">
                        {combo.id === 'sugar-wellness-combo' ? (
                            <Stethoscope size={16} className="mt-0.5 shrink-0 text-[#9a722d]" aria-hidden="true" />
                        ) : (
                            <Info size={16} className="mt-0.5 shrink-0 text-[#9a722d]" aria-hidden="true" />
                        )}
                        <p className="text-xs leading-5 text-[#665c48]">{combo.support}</p>
                    </div>
                    {combo.id === 'sugar-wellness-combo' && (
                        <div className="mt-3 flex items-center gap-2 border-t border-[#eee4d1] pt-3 text-xs text-[#665c48]">
                            <Truck size={15} className="shrink-0 text-[#9a722d]" aria-hidden="true" />
                            <span>Shipping costs and delivery estimates are shown at checkout.</span>
                        </div>
                    )}
                    {combo.id === 'sexual-wellness-combo' && (
                        <div className="mt-3 flex items-center gap-2 border-t border-[#eee4d1] pt-3 text-xs text-[#665c48]">
                            <Clock3 size={15} className="shrink-0 text-[#9a722d]" aria-hidden="true" />
                            <span>Review each item’s label and precautions before use.</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2">
                    <a
                        href={`#${combo.id}-contents`}
                        className="inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-lg border border-[#8da497] bg-white px-4 py-3 text-center text-sm font-bold leading-5 text-[#315448] transition hover:border-[#315a4c] hover:bg-[#f1f5f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315a4c] focus-visible:ring-offset-2"
                        aria-label={`View included products for ${combo.title}`}
                    >
                        View Contents
                    </a>
                    <Link
                        to="/shop"
                        className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-[#073f32] px-4 py-3 text-center text-sm font-bold leading-5 text-white shadow-sm transition hover:bg-[#0a5140] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073f32] focus-visible:ring-offset-2"
                    >
                        Shop Products <ArrowRight className="shrink-0" size={16} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function ComboPackages() {
    useSeo({
        title: 'AyuvaPro Wellness Combo Packages | Product Details & Pricing',
        description: 'Compare AyuvaPro curated combo packages. Check included products, quantities, usage directions, pricing and support terms before ordering.',
        path: '/combo-packages',
    });
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let isCurrent = true;

        const loadProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const activeProducts = await getAllActiveProducts();
                if (isCurrent) setProducts(activeProducts);
            } catch (loadError) {
                console.error('Failed to load combo package products:', loadError);
                if (isCurrent) setError(loadError);
            } finally {
                if (isCurrent) setIsLoading(false);
            }
        };

        loadProducts();
        return () => {
            isCurrent = false;
        };
    }, [reloadKey]);

    return (
        <Layout>
            <PageHero
                title="Curated Wellness Combos"
                subtitle="Explore selected AyuvaPro product combinations in convenient packages. Compare the listed contents and review quantities, product information and package terms before choosing."
                backgroundImage="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85"
                currentPage="Combo Packages"
            >
                <div className="flex flex-col justify-center gap-3 px-4 sm:flex-row">
                    <a
                        href="#combo-offers"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#946000] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a97108] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        Explore Packages <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <Link
                        to="/shop"
                        className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        Shop All Products
                    </Link>
                </div>
            </PageHero>

            <main className="min-h-screen bg-[#f5f3ed] px-4 pb-16 pt-8 sm:px-6 md:pt-10">
                <div className="mx-auto max-w-7xl">
                    {error && (
                        <div role="alert" className="mb-7 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                                <div>
                                    <p>We couldn’t load product images and catalogue details. Please retry.</p>
                                    <button
                                        type="button"
                                        onClick={() => setReloadKey((key) => key + 1)}
                                        className="mt-3 font-bold underline underline-offset-2"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <div className="mb-6 flex items-center gap-2 text-xs text-[#68716f]">
                            <Loader2 className="animate-spin" size={15} /> Loading product catalogue…
                        </div>
                    )}

                    <div id="combo-offers" className="grid scroll-mt-28 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {comboPackages.map((combo) => (
                            <ComboCard key={combo.id} combo={combo} products={products} isLoading={isLoading} />
                        ))}
                    </div>

                    <section className="mt-12 rounded-2xl border border-[#dfd5c0] bg-white p-5 shadow-sm sm:mt-14 sm:p-8" aria-labelledby="other-packages-heading">
                        <div className="flex items-start gap-3">
                            <Info className="mt-1 shrink-0 text-[#99732e]" size={20} aria-hidden="true" />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b5a0a]">Package details need confirmation</p>
                                <h2 id="other-packages-heading" className="mt-2 text-xl font-bold text-[#173d3a] sm:text-2xl">Two-Product and Two-Combo Packages</h2>
                                <p className="mt-3 max-w-4xl text-sm leading-7 text-[#646c69]">
                                    The supplied note mentions “2 normal package ₹2,999 / 2 combo package ₹10,000 with referral bonus 12 month.” Package names, product/unit counts, whether the prices apply per package or for two packages, and the referral-bonus terms are unclear. We’ll publish these offers after those details are confirmed.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="available-products" className="mt-14 scroll-mt-28 border-t border-[#ded9d0] pt-9 sm:mt-16 sm:pt-11" aria-labelledby="catalogue-heading">
                        <div className="mb-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b5a0a]">Live store catalogue</p>
                            <h2 id="catalogue-heading" className="mt-2 text-2xl font-bold text-[#123d32] sm:text-3xl">All Available Products</h2>
                            <p className="mt-2 text-sm leading-6 text-[#646c69]">Active product listings and current product prices are fetched from the store catalogue.</p>
                        </div>

                        {isLoading ? (
                            <div className="flex min-h-40 items-center justify-center gap-3 text-[#68716f]">
                                <Loader2 className="animate-spin" size={20} /> Loading products…
                            </div>
                        ) : error ? (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
                                Product catalogue unavailable. Use the Retry button above to try again.
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                                {products.map((product) => <ProductCard key={product._id} product={product} />)}
                            </div>
                        ) : (
                            <p className="rounded-xl bg-white p-6 text-center text-sm text-[#68716f]">There are no active products in the catalogue right now.</p>
                        )}
                    </section>
                </div>
            </main>
        </Layout>
    );
}
