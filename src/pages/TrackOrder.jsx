import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, Check, Truck, Package, Home, Search, ExternalLink, MapPin } from 'lucide-react';
import { getOrderTracking } from '@/lib/api';
import Button from '@/components/ui/Button';

export default function TrackOrder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(id || '');
    const [tracking, setTracking] = useState(null);
    const [isLoading, setIsLoading] = useState(Boolean(id));
    const [error, setError] = useState('');

    useEffect(() => {
        setOrderId(id || '');
        if (!id) {
            setTracking(null);
            setIsLoading(false);
            setError('');
            return;
        }

        let isCurrent = true;
        setTracking(null);
        setIsLoading(true);
        setError('');
        getOrderTracking(id)
            .then((data) => { if (isCurrent) setTracking(data); })
            .catch((requestError) => {
                if (isCurrent) setError(requestError.response?.data?.message || 'We could not find tracking details for this order.');
            })
            .finally(() => { if (isCurrent) setIsLoading(false); });

        return () => { isCurrent = false; };
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const normalizedOrderId = orderId.trim();
        if (!normalizedOrderId) return;
        navigate(`/track-order/${encodeURIComponent(normalizedOrderId)}`);
    };

    const history = tracking?.trackingHistory || [];
    const latestUpdate = history[0];
    const statusIcon = tracking?.isDelivered ? Home : tracking?.orderStatus === 'Shipped' ? Truck : Package;
    const StatusIcon = statusIcon;

    return (
        <Layout>
            <div className="min-h-[70vh] bg-bg-main py-16 md:py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-heading mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Orders
                    </Link>

                    <div className="overflow-hidden rounded-xl border border-border-default bg-white shadow-lg">
                        <div className="bg-[#123f38] px-6 py-8 text-white sm:px-9">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5cb78]">Order support</p>
                            <h1 className="mt-2 text-3xl font-semibold">Track your order</h1>
                            <p className="mt-2 max-w-xl text-sm text-white/75">Enter the order ID from your confirmation to see its latest fulfillment updates.</p>
                            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <label className="sr-only" htmlFor="tracking-order-id">Order ID</label>
                                <input id="tracking-order-id" value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="Paste order ID" className="h-12 min-w-0 flex-1 rounded-lg border border-white/20 bg-white px-4 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#e5cb78]" required />
                                <Button type="submit" isLoading={isLoading} leftIcon={Search} className="h-12 shrink-0 bg-[#e5cb78] text-[#18312f] hover:bg-[#f0dc9b]">Track order</Button>
                            </form>
                        </div>

                        <div className="p-6 sm:p-9">
                            {error && <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                            {isLoading ? <div className="py-12 text-center text-sm text-gray-500">Loading live tracking information...</div> : tracking ? (
                                <>
                                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-6">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Order ID</p>
                                            <p className="mt-1 break-all font-semibold text-gray-900">{tracking.orderId}</p>
                                        </div>
                                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800"><StatusIcon size={16} />{tracking.orderStatus}</span>
                                    </div>

                                    {tracking.liveTracking && <div className="mt-5 grid gap-3 rounded-lg bg-emerald-50 p-4 text-sm sm:grid-cols-2">
                                        <p className="font-semibold text-emerald-900">{tracking.liveTracking.currentStatus || 'Live courier update'}</p>
                                        {tracking.liveTracking.currentLocation && <p className="flex items-center gap-1.5 text-emerald-800"><MapPin size={15} />{tracking.liveTracking.currentLocation}</p>}
                                        {tracking.liveTracking.expectedDelivery && <p className="text-emerald-800">Expected: {new Date(tracking.liveTracking.expectedDelivery).toLocaleDateString()}</p>}
                                    </div>}

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-lg border border-gray-200 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Courier</p><p className="mt-1 font-semibold text-gray-900">{tracking.courier || 'Not assigned'}</p></div>
                                        <div className="rounded-lg border border-gray-200 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tracking number</p><p className="mt-1 break-all font-semibold text-gray-900">{tracking.trackingNumber || 'Not available yet'}</p></div>
                                    </div>

                                    {tracking.liveTracking?.trackUrl && <a href={tracking.liveTracking.trackUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 underline underline-offset-4">Open courier tracking <ExternalLink size={15} /></a>}

                                    <div className="mt-8">
                                        <h2 className="text-lg font-semibold text-gray-900">Tracking history</h2>
                                        {history.length ? <ol className="mt-4 divide-y divide-gray-100">
                                            {history.map((update, index) => <li key={`${update._id || update.status}-${update.timestamp || index}`} className="flex gap-4 py-4">
                                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">{index === 0 ? <Check size={16} /> : <Package size={16} />}</span>
                                                <span className="min-w-0"><span className="block font-semibold text-gray-900">{update.status || 'Order update'}</span><span className="mt-1 block text-sm text-gray-600">{update.description || update.courierRemarks || update.location || 'Status updated'}</span><time className="mt-1 block text-xs text-gray-400">{update.timestamp ? new Date(update.timestamp).toLocaleString() : ''}</time></span>
                                            </li>)}
                                        </ol> : <p className="mt-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">No tracking events have been recorded yet. Check again after the order is processed.</p>}
                                    </div>
                                </>
                            ) : !error && <div className="py-8 text-center text-sm text-gray-500">Tracking details will appear here after you enter an order ID.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
