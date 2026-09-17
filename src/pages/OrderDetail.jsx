
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/PageHero';
import { ArrowLeft, Package, MapPin, Truck, Check, Home, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getOrderById } from '@/lib/api';

export default function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getOrderById(id)
            .then((data) => {
                setOrder(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Order not found');
                setLoading(false);
            });
    }, [id]);

    // Timeline logic (basic example, can be improved with real trackingUpdates)
    const buildTimeline = (order) => {
        if (!order) return [];
        if (order.isCancelled) {
            return [
                { id: 1, title: 'Order Placed', date: order.createdAt ? new Date(order.createdAt).toLocaleString() : '', icon: Package, completed: true },
                { id: 2, title: 'Cancelled', date: order.updatedAt ? new Date(order.updatedAt).toLocaleString() : '', icon: AlertCircle, completed: true, isError: true },
            ];
        }
        const steps = [
            { id: 1, title: 'Order Placed', date: order.createdAt ? new Date(order.createdAt).toLocaleString() : '', icon: Package, completed: true },
            { id: 2, title: 'Processing', date: '', icon: Package, completed: order.orderStatus !== 'Pending' },
            { id: 3, title: 'Shipped', date: '', icon: Truck, completed: order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered' },
            { id: 4, title: 'Delivered', date: '', icon: Home, completed: order.orderStatus === 'Delivered' },
        ];
        return steps;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error || !order) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Order not found'}</div>;

    const timeline = buildTimeline(order);
    const shipping = order.shippingAddress || {};
    const items = order.orderItems || [];
    const subtotal = order.itemsPrice || 0;
    const shippingPrice = order.shippingPrice || 0;
    const tax = order.taxPrice || 0;
    const total = order.totalPrice || 0;
    const paymentMethod = order.paymentMethod || '';
    const paymentStatus = order.paymentStatus || '';
    const orderStatus = order.orderStatus || order.status || '';
    const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    const courier = order.courierDetails || {};
    const dimensions = order.dimensions || {};

    return (
        <Layout>
            <PageHero
                title={`Order #${order._id}`}
                subtitle={`Placed on ${createdAt}`}
                backgroundImage="https://plus.unsplash.com/premium_photo-1664201889922-66bc3c778c1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                currentPage="Order Details"
            />

            <div className="bg-bg-main min-h-screen py-6 md:py-20">
                <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-heading transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Orders
                        </Link>

                        <div className="flex gap-3">
                            <span className={cn(
                                "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2",
                                orderStatus === 'Delivered' ? "bg-green-50 text-green-700 border border-green-200" :
                                    orderStatus === 'Cancelled' ? "bg-red-50 text-red-600 border border-red-200" :
                                        "bg-accent-gold/10 text-accent-gold border border-accent-gold/20"
                            )}>
                                {orderStatus === 'Processing' && <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />}
                                {orderStatus}
                            </span>
                            <button className="px-6 py-2 border border-text-heading text-text-heading font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-text-heading hover:text-white transition-all shadow-sm hover:shadow-md">
                                Invoice
                            </button>
                        </div>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="bg-white p-4 md:p-10 rounded-3xl shadow-soft border border-border-light mb-6 relative overflow-x-auto">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-yellow-400 to-accent-gold" />
                        <h2 className="font-bold text-lg text-text-heading mb-8">Order Status</h2>
                        <div className="relative">
                            {/* Connector Line */}
                            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-bg-section md:hidden"></div> {/* Vertical for Mobile */}
                            <div className="absolute top-[23px] left-8 right-8 h-0.5 bg-bg-section hidden md:block"></div> {/* Horizontal for Desktop */}

                            {/* Steps */}
                            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 relative">
                                {timeline.map((step, index) => (
                                    <div key={step.id} className="flex md:flex-col items-center md:items-center md:text-center gap-4 md:gap-4 relative z-10 w-full md:w-1/5">
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 bg-white",
                                            step.isError
                                                ? "border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                                                : step.completed
                                                    ? "border-accent-gold text-accent-gold shadow-[0_0_15px_rgba(201,160,108,0.3)]"
                                                    : "border-gray-100 text-gray-300"
                                        )}>
                                            {step.completed ? (step.isError ? <AlertCircle size={20} strokeWidth={2.5} /> : <Check size={20} strokeWidth={3} />) : <step.icon size={20} />}
                                        </div>
                                        <div className="flex-1 md:flex-none">
                                            <h3 className={cn("font-bold text-sm", step.completed ? "text-text-heading" : "text-gray-400")}>{step.title}</h3>
                                            <p className="text-xs text-text-muted mt-1 font-medium">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-3xl shadow-soft border border-border-light overflow-x-auto mb-6">
                        <div className="p-4 border-b border-border-light bg-bg-section/30">
                            <h2 className="font-bold text-lg text-text-heading flex items-center gap-2">
                                Items Ordered
                            </h2>
                        </div>
                        <div className="divide-y divide-border-light">
                            {items.map((item) => (
                                <div key={item._id} className="p-4 flex flex-col sm:flex-row gap-4 md:gap-8 group">
                                    <div className="w-24 h-32 bg-bg-section rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-border-light mx-auto sm:mx-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-accent-gold uppercase tracking-widest mb-1">{item.category || ''}</p>
                                            <span className="font-bold text-lg text-text-heading mb-1">{item.name}</span>
                                            <p className="text-sm text-text-muted font-medium">Qty: {item.qty}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-xl text-text-heading font-sans">₹{item.price?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Shipping & Courier Info */}
                        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-soft border border-border-light h-full space-y-8">
                            <div>
                                <h2 className="font-bold text-lg text-text-heading mb-6 flex items-center gap-2 border-b border-border-light pb-4">
                                    <MapPin size={20} className="text-accent-gold" /> Shipping Details
                                </h2>
                                <div className="text-sm text-text-muted space-y-3">
                                    <p className="font-bold text-text-heading text-lg">{shipping.name || order.user?.name || 'Customer'}</p>
                                    <p className="leading-relaxed text-text-body">
                                        {shipping.address || shipping.addressLine1 || ''}<br />
                                        {shipping.city}{shipping.state ? `, ${shipping.state}` : ''} {shipping.postalCode ? `- ${shipping.postalCode}` : ''}
                                    </p>
                                    {(shipping.phone || order.user?.phone) && (
                                        <div className="pt-2 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-bg-section flex items-center justify-center text-accent-gold font-bold text-xs">Ph</span>
                                            <span className="font-medium text-text-heading">{shipping.phone || order.user?.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-text-heading mb-4 flex items-center gap-2 border-b border-border-light pb-2">
                                    <Truck size={20} className="text-accent-gold" /> Courier & Package Info
                                </h2>
                                <div className="text-sm text-text-muted space-y-2">
                                    <div><span className="font-bold text-text-heading">Courier:</span> {courier.provider || 'N/A'}</div>
                                    <div><span className="font-bold text-text-heading">Weight:</span> {dimensions.weight ? `${dimensions.weight} kg` : 'N/A'}</div>
                                    <div><span className="font-bold text-text-heading">Dimensions:</span> {dimensions.length && dimensions.breadth && dimensions.height ? `${dimensions.length} x ${dimensions.breadth} x ${dimensions.height} cm` : 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-soft border border-border-light h-full mt-4 md:mt-0">
                            <h2 className="font-bold text-lg text-text-heading mb-6 flex items-center gap-2 border-b border-border-light pb-4">
                                <AlertCircle size={20} className="text-accent-gold" /> Payment Summary
                            </h2>
                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex justify-between text-text-muted">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-text-muted">
                                    <span>Shipping</span>
                                    <span>{shippingPrice === 0 ? <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wider">Free</span> : `₹${shippingPrice}`}</span>
                                </div>
                                <div className="flex justify-between text-text-muted">
                                    <span>Tax</span>
                                    <span>₹{tax}</span>
                                </div>
                                <div className="bg-bg-section h-px w-full my-2" />
                                <div className="flex justify-between font-bold text-xl text-text-heading">
                                    <span>Total Amount</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="pt-4 flex items-center justify-between">
                                    <span className="text-xs text-text-muted uppercase tracking-widest font-bold">Paid via</span>
                                    <span className="font-bold text-text-heading uppercase tracking-wider bg-bg-section px-3 py-1 rounded border border-border-light/50">{paymentMethod}</span>
                                </div>
                                <div className="pt-2 flex items-center justify-between">
                                    <span className="text-xs text-text-muted uppercase tracking-widest font-bold">Payment Status</span>
                                    <span className={cn("font-bold px-3 py-1 rounded text-xs", paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>{paymentStatus}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
