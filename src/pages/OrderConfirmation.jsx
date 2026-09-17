import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { CheckCircle, Package, ArrowRight, Home, ShoppingBag, Truck, Calendar, MapPin } from 'lucide-react';

export default function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, total, paymentMethod } = location.state || {};

    useEffect(() => {
        if (!orderId) {
            // navigate('/'); 
        }
    }, [orderId, navigate]);

    if (!orderId) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50 pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-2xl font-bold text-text-heading mb-4 font-sans">No Order Found</h1>
                    <p className="text-text-muted mb-8 text-sm">It seems you have reached this page by mistake.</p>
                    <Link to="/" className="bg-text-heading text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-colors">
                        Return Home
                    </Link>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">

                    <div className="bg-white rounded-xl shadow-lg border-t-4 border-accent-gold p-8 md:p-12 text-center relative overflow-hidden">

                        {/* Success Icon Animation */}
                        <div className="mb-6 relative inline-flex items-center justify-center">
                            <div className="w-20 h-20 bg-accent-gold/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                                <CheckCircle className="w-10 h-10 text-accent-gold" strokeWidth={2} />
                            </div>
                            <div className="absolute inset-0 bg-accent-gold/20 rounded-full animate-ping opacity-25"></div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-sans font-bold text-text-heading mb-3 tracking-tight">
                            Thank You!
                        </h1>
                        <p className="text-lg font-medium text-text-heading mb-2">
                            Your order has been received.
                        </p>
                        <p className="text-text-muted text-sm mb-10 max-w-md mx-auto leading-relaxed">
                            We are getting started on your order right away. You will receive an order confirmation email shortly.
                        </p>

                        {/* Order Details Card */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-10 text-left border border-gray-100">
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div className="text-text-muted flex items-center gap-2">
                                    <Package size={14} /> Order Number
                                </div>
                                <div className="text-right font-bold text-text-heading">#{orderId?.slice(-8)?.toUpperCase()}</div>

                                <div className="text-text-muted flex items-center gap-2">
                                    <Calendar size={14} /> Date
                                </div>
                                <div className="text-right font-bold text-text-heading">{new Date().toLocaleDateString()}</div>

                                <div className="text-text-muted flex items-center gap-2">
                                    <Truck size={14} /> Payment
                                </div>
                                <div className="text-right font-bold text-text-heading">
                                    {paymentMethod === 'Razorpay' ? 'Online Payment (Paid)' : 'Cash on Delivery'}
                                </div>

                                <div className="col-span-2 border-t border-dashed border-gray-200 my-2"></div>

                                <div className="text-text-heading font-bold text-base flex items-center gap-2">
                                    Total Amount
                                </div>
                                <div className="text-right font-bold text-xl text-accent-gold">₹{Math.round(total).toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/profile"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-md border border-gray-200 text-text-heading font-bold uppercase tracking-widest text-xs hover:border-accent-gold hover:text-accent-gold transition-colors flex items-center justify-center gap-2"
                            >
                                <Package size={16} /> Track Order
                            </Link>
                            <Link
                                to="/"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-text-heading text-white font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={16} /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-text-muted text-xs">
                            Having trouble? <Link to="/contact" className="text-text-heading underline hover:text-accent-gold transition-colors">Contact Support</Link>
                        </p>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
