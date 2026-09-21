import React from 'react';
import { ArrowRight, ShoppingBag, Star, Leaf, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import BannerSlider from '@/components/home/BannerSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import TrendingSection from '@/components/home/TrendingSection';
import NewArrivals from '@/components/home/NewArrivals';

const heroCards = [
  { name: 'Wildflower', image: 'https://images.unsplash.com/photo-1589987607602-7d1f394f4a6d?auto=format&fit=crop&w=900&q=80' },
  { name: 'Cinnamon', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' },
  { name: 'Forest', image: 'https://images.unsplash.com/photo-1464226184884-fa52ac7d9b90?auto=format&fit=crop&w=900&q=80' },
  { name: 'Lemon', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80' },
];

const bestSellers = [
  { name: 'Mango Blossom', price: '₹490', stars: 4.8, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80' },
  { name: 'Raw Organic', price: '₹550', stars: 4.9, image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80' },
  { name: 'Citrus Burst', price: '₹620', stars: 4.7, image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80' },
  { name: 'Sunrise Amber', price: '₹710', stars: 4.9, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80' },
];

const collectionTiles = [
  { title: 'From Hive to Home', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80' },
  { title: 'Golden Drops of Wellness', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80' },
  { title: 'Raw Honey, Real Benefits', image: 'https://images.unsplash.com/photo-1423483641154-241b0b1b2c59?auto=format&fit=crop&w=900&q=80' },
];

const arrivals = [
  { title: 'Herbal Blend', price: '₹490', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80' },
  { title: 'Wildflower', price: '₹520', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80' },
  { title: 'Cinnamon', price: '₹560', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80' },
  { title: 'Lemon', price: '₹610', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80' },
];

const blogCards = [
  { title: 'The Story of Pure Honey', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80' },
  { title: 'Honey for Daily Wellness', image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=900&q=80' },
  { title: 'Raw Honey, Better Taste', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80' },
  { title: 'Daily Rituals with Honey', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80' },
];

export default function Home() {
  return (
    <Layout>
      <div className="bg-[#f3f0ea] text-[#173d3a]">
        <BannerSlider />
        <CategoryGrid />
        <TrendingSection />
        <NewArrivals />
        <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#f7f1e5] p-6 shadow-[0_18px_35px_rgba(17,79,77,0.04)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#e1f1d9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d534f]">
                  <Sparkles size={12} /> Ayurvedic wellness
                </div>
                <h2 className="text-3xl font-bold leading-tight text-[#173d3a] sm:text-5xl">Ancient wisdom for modern wellness.</h2>
                <p className="max-w-xl leading-7 text-[#4e6a68]">Discover thoughtfully made Ayurvedic products designed to support everyday health, balance, and natural living.</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[18px] bg-white p-4 shadow-sm"><Leaf className="mb-3 text-[#0f6760]" size={18} /><p className="text-xl font-bold">Natural</p><p className="text-[10px] uppercase tracking-[0.2em] text-[#687f7d]">Ingredients</p></div>
                  <div className="rounded-[18px] bg-white p-4 shadow-sm"><ShieldCheck className="mb-3 text-[#0f6760]" size={18} /><p className="text-xl font-bold">Trusted</p><p className="text-[10px] uppercase tracking-[0.2em] text-[#687f7d]">Quality</p></div>
                  <div className="rounded-[18px] bg-white p-4 shadow-sm"><Truck className="mb-3 text-[#0f6760]" size={18} /><p className="text-xl font-bold">Fast</p><p className="text-[10px] uppercase tracking-[0.2em] text-[#687f7d]">Delivery</p></div>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80" alt="Natural Ayurvedic ingredients" className="h-[360px] w-full rounded-[28px] object-cover" />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );

  /* Legacy static layout retained below for reference. */
  return (
    <Layout>
      <div className="bg-[#f3f0ea] text-[#173d3a]">
        <section className="bg-[#e8e2a8] pt-6 pb-8">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[30px] bg-[#ece7b9] shadow-[0_20px_50px_rgba(17,79,77,0.08)]">
              <div className="grid items-center gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:px-12 lg:py-10">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#173d3a]/15 bg-white/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#173d3a]">
                    <Leaf size={12} /> Premium Organic Honey
                  </div>

                  <h1 className="text-[2.6rem] font-bold leading-[0.95] tracking-[-0.06em] text-[#173d3a] sm:text-[3.4rem] lg:text-[4rem]">
                    Organic Honey For
                    <span className="block text-[#0f6760]">Healthy Living</span>
                  </h1>

                  <p className="max-w-md text-sm leading-7 text-[#47615f]">
                    Pure, raw, and naturally sourced from trusted beekeepers for better immunity, better taste, and a healthier routine.
                  </p>

                  <div className="flex items-center gap-3">
                    <button className="rounded-full bg-[#114f4d] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#114f4d]/20">
                      Shop Now
                    </button>
                    <button className="rounded-full border border-[#173d3a]/20 bg-white/40 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#173d3a]">
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="relative flex min-h-[330px] items-center justify-center">
                  <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_center,_rgba(248,196,86,0.5),_rgba(255,255,255,0)_60%)] blur-2xl" />
                  <div className="relative z-10">
                    <div className="absolute -left-8 top-10 h-20 w-20 rounded-full bg-[#f3c765]/40 blur-2xl" />
                    <div className="absolute -right-4 bottom-6 h-24 w-24 rounded-full bg-[#73b9ac]/30 blur-2xl" />
                    <img
                      src="https://images.unsplash.com/photo-1589987607602-7d1f394f4a6d?auto=format&fit=crop&w=1200&q=80"
                      alt="Organic honey jar"
                      className="mx-auto h-[300px] w-auto object-contain drop-shadow-[0_30px_30px_rgba(94,68,16,0.2)]"
                    />
                  </div>
                  <div className="absolute right-6 top-6 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#f0b535] text-white shadow-[0_12px_25px_rgba(240,181,53,0.55)]">
                    <span className="text-[1.5rem] font-black leading-none">20%</span>
                    <span className="mt-1 text-[9px] uppercase tracking-[0.2em]">Off</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
              {heroCards.map((item) => (
                <div key={item.name} className="rounded-[18px] border border-[#dacfa5] bg-white/30 p-2 shadow-sm">
                  <div className="rounded-[14px] bg-gradient-to-br from-[#d7b46a] to-[#f5dca1] p-2">
                    <img src={item.image} alt={item.name} className="h-24 w-full rounded-[10px] object-cover" />
                  </div>
                  <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173d3a]">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6c837e]">Best Selling Products</p>
              <h2 className="mt-2 text-3xl font-bold text-[#173d3a]">Top Picks</h2>
            </div>
            <button className="hidden rounded-full border border-[#173d3a]/20 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#173d3a] md:inline-flex">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {bestSellers.map((product) => (
              <div key={product.name} className="group overflow-hidden rounded-[22px] border border-[#e7dbc2] bg-[#fffefb] p-4 shadow-[0_12px_26px_rgba(17,79,77,0.05)] transition hover:-translate-y-1">
                <div className="overflow-hidden rounded-[18px] bg-[#f7f1e6]">
                  <img src={product.image} alt={product.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b807c]">Best Seller</p>
                    <h3 className="mt-2 text-xl font-semibold text-[#173d3a]">{product.name}</h3>
                  </div>
                  <button className="rounded-full bg-[#114f4d] p-2 text-white shadow-md">
                    <ShoppingBag size={16} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#f0b535]">
                    <Star size={13} fill="currentColor" />
                    <span className="text-sm font-semibold text-[#173d3a]">{product.stars}</span>
                  </div>
                  <span className="text-xl font-bold text-[#0f6760]">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f2efe6] py-10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f6760] text-3xl font-black text-white">50%</div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#49615f]">Winter Sale</p>
                  <h3 className="mt-1 text-2xl font-bold text-[#173d3a]">Save on delicious essentials</h3>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#173d3a]">
                Shop Collection <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6c837e]">Fresh arrivals</p>
              <h2 className="mt-2 text-3xl font-bold text-[#173d3a]">New Arrivals</h2>
            </div>
            <button className="hidden rounded-full border border-[#173d3a]/20 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#173d3a] md:inline-flex">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {arrivals.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[22px] border border-[#e7dcc2] bg-white shadow-[0_12px_26px_rgba(17,79,77,0.04)]">
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#173d3a]">{item.title}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-[#5d7a78]">Natural goodness</span>
                    <button className="rounded-full bg-[#114f4d] p-2 text-white">
                      <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {collectionTiles.map((tile, index) => (
              <div key={tile.title} className="group relative overflow-hidden rounded-[30px] bg-[#0f1d1c] shadow-[0_18px_36px_rgba(17,79,77,0.08)]">
                <img src={tile.image} alt={tile.title} className="h-[270px] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,20,20,0.82)] via-[rgba(8,20,20,0.15)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-bold text-white">{tile.title}</h3>
                  <button className="mt-4 inline-flex items-center rounded-full bg-[#0f6760] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#f7f1e5] p-6 shadow-[0_18px_35px_rgba(17,79,77,0.04)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#e1f1d9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d534f]">
                  <Sparkles size={12} /> Nature in every drop
                </div>
                <h2 className="text-3xl font-bold leading-tight text-[#173d3a] sm:text-5xl">
                  Crafted for a cleaner, healthier lifestyle.
                </h2>
                <p className="max-w-xl text-[#4e6a68] leading-7">
                  Our organic honey is unfiltered, gently harvested, and carefully packed to preserve the natural aroma, nutrients, and taste people love.
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[18px] bg-white p-4 shadow-sm">
                    <Leaf className="mb-3 text-[#0f6760]" size={18} />
                    <p className="text-xl font-bold text-[#173d3a]">100%</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#687f7d]">Organic</p>
                  </div>
                  <div className="rounded-[18px] bg-white p-4 shadow-sm">
                    <ShieldCheck className="mb-3 text-[#0f6760]" size={18} />
                    <p className="text-xl font-bold text-[#173d3a]">No</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#687f7d]">Additives</p>
                  </div>
                  <div className="rounded-[18px] bg-white p-4 shadow-sm">
                    <Truck className="mb-3 text-[#0f6760]" size={18} />
                    <p className="text-xl font-bold text-[#173d3a]">2-4</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#687f7d]">Days</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-7 top-8 h-24 w-24 rounded-full bg-[#f0c468]/35 blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80"
                  alt="Harvested honey"
                  className="h-[360px] w-full rounded-[28px] object-cover shadow-[0_20px_45px_rgba(17,79,77,0.08)]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6c837e]">Wellness journal</p>
              <h2 className="mt-2 text-3xl font-bold text-[#173d3a]">Latest Blog</h2>
            </div>
            <button className="hidden rounded-full border border-[#173d3a]/20 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#173d3a] md:inline-flex">
              Read More <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {blogCards.map((blog) => (
              <article key={blog.title} className="overflow-hidden rounded-[22px] border border-[#eadfc5] bg-white shadow-[0_12px_24px_rgba(17,79,77,0.04)]">
                <img src={blog.image} alt={blog.title} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b817f]">Health tips</p>
                  <h3 className="mt-3 text-lg font-semibold leading-7 text-[#173d3a]">{blog.title}</h3>
                  <button className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f6760]">
                    Explore <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
