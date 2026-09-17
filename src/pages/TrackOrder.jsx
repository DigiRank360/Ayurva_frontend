import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, Check, Truck, Package, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrackOrder() {
    const { id } = useParams();

    const steps = [
        { id: 1, title: 'Order Placed', date: 'Oct 24, 10:00 AM', icon: Package, completed: true },
        { id: 2, title: 'Processing', date: 'Oct 24, 2:00 PM', icon: Package, completed: true },
        { id: 3, title: 'Shipped', date: 'Oct 25, 11:00 AM', icon: Truck, completed: true },
        { id: 4, title: 'Out for Delivery', date: 'Expected today', icon: Truck, completed: false },
        { id: 5, title: 'Delivered', date: '', icon: Home, completed: false },
    ];

    return (
        <Layout>
            <div className="bg-bg-main min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-heading mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Orders
                    </Link>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-border-default">
                        <div className="text-center mb-10">
                            <h1 className="text-2xl font-sans font-bold text-text-heading mb-2">Tracking Order #{id || 'ORD-9283'}</h1>
                            <p className="text-accent-gold font-medium">Expected Delivery: Oct 27, 2024</p>
                        </div>

                        <div className="relative">
                            {/* Connector Line */}
                            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gray-100 md:hidden"></div> {/* Vertical for Mobile */}
                            <div className="absolute top-[27px] left-8 right-8 h-0.5 bg-gray-100 hidden md:block"></div> {/* Horizontal for Desktop */}

                            {/* Steps */}
                            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 relative">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex md:flex-col items-center md:items-center md:text-center gap-4 md:gap-4 relative z-10 w-full md:w-1/5">
                                        <div className={cn(
                                            "w-14 h-14 rounded-full flex items-center justify-center border-4 transition-colors bg-white z-10",
                                            step.completed ? "border-accent-gold text-accent-gold" : "border-gray-200 text-gray-300"
                                        )}>
                                            {step.completed ? <Check size={24} strokeWidth={3} /> : <step.icon size={24} />}
                                        </div>
                                        <div className="flex-1 md:flex-none">
                                            <h3 className={cn("font-bold text-sm", step.completed ? "text-text-heading" : "text-text-muted")}>{step.title}</h3>
                                            <p className="text-xs text-text-muted mt-1">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 bg-bg-section p-6 rounded-xl border border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold text-text-heading">Courier Partner: <span className="text-accent-gold">BlueDart</span></p>
                                <p className="text-xs text-text-muted mt-1">Tracking ID: BD123456789</p>
                            </div>
                            <button className="text-xs font-bold uppercase tracking-widest text-text-heading underline hover:text-accent-gold">
                                View on Courier Website
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
