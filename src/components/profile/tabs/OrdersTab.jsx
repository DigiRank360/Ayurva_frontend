import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OrdersTab({ orders }) {
    return (
        <div className="space-y-4 animate-fade-in-up pb-20 lg:pb-0">
            <div className="flex items-center justify-between sm:flex-row sm:justify-between sm:items-center gap-2 ">
                <h2 className="text-xl font-bold text-text-heading font-sans">Recent Orders</h2>
                <button className="text-xs font-bold text-accent-gold uppercase tracking-wider hover:text-text-heading transition-colors self-start sm:self-auto">View All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl border border-border-light p-4 flex flex-col shadow-sm hover:shadow-soft transition-all group h-full">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full">
                            {/* Image */}
                            <div className="w-full md:w-28 h-32 bg-bg-section rounded-xl overflow-hidden flex-shrink-0 relative mx-auto md:mx-0">
                                <img src={order.image} alt="Order Item" className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold text-base md:text-lg text-text-heading">#{order.id?.replace('#', '')}</h3>
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border",
                                            order.status === 'Delivered' ? "bg-green-50 text-green-700 border-green-200" :
                                            order.status === 'Pending' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                            "bg-white text-text-muted border-border-light"
                                        )}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-muted font-medium">{order.date}</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        <span className="text-xs bg-bg-section px-2 py-1 rounded font-semibold text-text-heading">{order.paymentMethod}</span>
                                        <span className={cn(
                                            "text-xs px-2 py-1 rounded font-semibold",
                                            order.paymentStatus === 'Paid' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                        )}>{order.paymentStatus}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-2">
                                    <span className="text-xs text-text-muted font-medium">{order.items} Items</span>
                                    <span className="font-sans font-bold text-base md:text-lg text-text-heading">{order.total}</span>
                                </div>
                                <Link
                                    to={`/order/${order.id?.replace('#', '')}`}
                                    className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-heading hover:text-accent-gold transition-colors self-start"
                                >
                                    View Details <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
