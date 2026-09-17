import React from 'react';
import { Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        icon: <Truck size={24} />,
        title: "Free Shipping",
        text: "Orders above ₹1,499"
    },
    {
        icon: <ShieldCheck size={24} />,
        title: "Secure Payment",
        text: "100% Protected"
    },
    {
        icon: <Clock size={24} />,
        title: "Fast Delivery",
        text: "2-5 Days India-wide"
    },
    {
        icon: <CreditCard size={24} />,
        title: "Easy Returns",
        text: "7-Day No Questions"
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-10 border-b border-border-light/50 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-border-light/50">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:pl-8 first:pl-0 group">
                            <div className="text-text-heading group-hover:text-accent-gold transition-colors duration-300 p-2 bg-white rounded-full shadow-sm border border-border-light group-hover:border-accent-gold/30">
                                {feature.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-text-heading text-xs uppercase tracking-widest">{feature.title}</h4>
                                <p className="text-text-muted text-[10px] md:text-xs mt-0.5">{feature.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
