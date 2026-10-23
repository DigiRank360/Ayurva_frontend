import React from 'react';
import { FileText, Truck, CreditCard, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import useSeo from '@/hooks/useSeo';
import wellnessImage from '@/assets/about-hero.png';
import BannerSlider from '@/components/home/BannerSlider';
import CircularCategories from '@/components/home/CircularCategories';
import CategoryGrid from '@/components/home/CategoryGrid';
import TrendingSection from '@/components/home/TrendingSection';
import NewArrivals from '@/components/home/NewArrivals';
import CustomerReviews from '@/components/home/CustomerReviews';
import Newsletter from '@/components/home/Newsletter';
import ReferralTeaser from '@/components/home/ReferralTeaser';
import HomeFAQ from '@/components/home/HomeFAQ';

export default function Home() {
  useSeo({
    title: 'AyuvaPro | Ayurvedic Wellness Products & Combos',
    description: 'Explore AyuvaPro wellness products and curated combos. Review ingredients, pack details, usage information and purchase terms before ordering.',
    path: '/',
  });

  return (
    <Layout>
      <div className="bg-[#f3f0ea] text-[#173d3a]">
        <BannerSlider />
        <CircularCategories />
        <TrendingSection />
        <NewArrivals />
        <section className="bg-[#f4f0e9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#946714]">A clearer way to shop</span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#123d32] sm:text-4xl md:text-5xl">
                Why AyuvaPro: A More Informed Wellness Choice
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6964] sm:text-base">
                Explore product information, review order details and find support links before making your choice.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
                <article className="rounded-2xl border border-[#e9e4db] bg-white p-6 shadow-[0_8px_24px_rgba(23,61,58,0.05)] sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf6f1] text-[#123d32]">
                    <FileText size={23} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#26333e]">Clear Product Information</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d6964]">
                    Review available product descriptions, ingredients, pack details, directions and product-specific precautions.
                  </p>
                </article>

                <article className="rounded-2xl border border-[#e9e4db] bg-white p-6 shadow-[0_8px_24px_rgba(23,61,58,0.05)] sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf6f1] text-[#123d32]">
                    <Truck size={23} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#26333e]">Convenient Shopping</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d6964]">
                    Browse products online and check delivery options and estimates for your address during checkout.
                  </p>
                </article>

                <article className="rounded-2xl border border-[#e9e4db] bg-white p-6 shadow-[0_8px_24px_rgba(23,61,58,0.05)] sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf6f1] text-[#123d32]">
                    <CreditCard size={23} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#26333e]">Order Terms in View</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d6964]">
                    Check the displayed product price and applicable delivery charges or taxes at checkout before placing an order.
                  </p>
                </article>

                <article className="rounded-2xl border border-[#e9e4db] bg-white p-6 shadow-[0_8px_24px_rgba(23,61,58,0.05)] sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf6f1] text-[#123d32]">
                    <Headset size={23} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#26333e]">Accessible Support</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d6964]">
                    Need help with product details, orders or policies?{' '}
                    <Link to="/contact" className="font-semibold text-[#315a4c] underline decoration-[#b8c8be] underline-offset-2 hover:text-[#0d766c]">
                      Visit Contact &amp; Support
                    </Link>
                    .
                  </p>
                </article>
              </div>

              <figure className="group relative min-h-[320px] overflow-hidden rounded-2xl shadow-[0_14px_35px_rgba(23,61,58,0.14)] sm:min-h-[380px] lg:min-h-full">
                <img
                  src={wellnessImage}
                  alt="Ayurvedic mortar and pestle with natural herbal ingredients"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b3028]/75 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7ca87]">AyuvaPro</span>
                  <p className="mt-2 max-w-xs text-2xl font-bold leading-tight">Explore wellness with product details in view.</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <ReferralTeaser />
        <CustomerReviews />
        <HomeFAQ />
        <Newsletter />
        <CategoryGrid />
      </div>
    </Layout>
  );
}
