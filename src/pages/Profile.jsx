import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/PageHero';
import ProfileResponsiveTabs from '@/components/profile/ProfileResponsiveTabs';
import OrdersTab from '@/components/profile/tabs/OrdersTab';
import AddressesTab from '@/components/profile/tabs/AddressesTab';
import { getMyOrders, getUserAddresses } from '@/lib/api';
import AccountTab from '@/components/profile/tabs/AccountTab';
import { authService } from '@/services/authService';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('orders'); // orders, address, account

    // State for orders and addresses
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState(null);

    const [addresses, setAddresses] = useState([]);
    const [addressesLoading, setAddressesLoading] = useState(true);
    const [addressesError, setAddressesError] = useState(null);

    useEffect(() => {
        // Fetch orders
        setOrdersLoading(true);
        getMyOrders()
            .then((data) => {
                // Normalize order data for OrdersTab
                const mapped = (data.orders || data) // handle both {orders:[]} and []
                    .map((order) => ({
                        id: order._id || order.id,
                        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '',
                        status: order.orderStatus || order.status || 'Processing',
                        paymentStatus: order.paymentStatus || '',
                        paymentMethod: order.paymentMethod || '',
                        total: order.totalPrice ? `₹${order.totalPrice}` : '',
                        items: order.orderItems ? order.orderItems.length : 0,
                        image: order.orderItems && order.orderItems[0] && order.orderItems[0].image ? order.orderItems[0].image : 'https://placehold.co/400x500',
                    }));
                setOrders(mapped);
                setOrdersLoading(false);
            })
            .catch((err) => {
                setOrdersError('Failed to load orders');
                setOrdersLoading(false);
            });

        // Fetch addresses
        setAddressesLoading(true);
        getUserAddresses()
            .then((data) => {
                setAddresses(data.addresses || data);
                setAddressesLoading(false);
            })
            .catch((err) => {
                setAddressesError('Failed to load addresses');
                setAddressesLoading(false);
            });
    }, []);

    return (
        <Layout>

            <PageHero
                title="My Profile"
                subtitle="Manage your orders, and account settings all in one place."
                backgroundImage="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                currentPage="Profile"
            >
                <ProfileResponsiveTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </PageHero>

            <div className="bg-bg-main min-h-screen py-4 md:py-10">
                <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
                    {/* Active Content Area */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                        {activeTab === 'orders' && (
                            ordersLoading ? <div className="text-center py-8">Loading orders...</div>
                            : ordersError ? <div className="text-center text-red-500 py-8">{ordersError}</div>
                            : <OrdersTab orders={orders} />
                        )}
                        {activeTab === 'address' && (
                            addressesLoading ? <div className="text-center py-8">Loading addresses...</div>
                            : addressesError ? <div className="text-center text-red-500 py-8">{addressesError}</div>
                            : <AddressesTab addresses={addresses} onAddressesChange={setAddresses} />
                        )}
                        {activeTab === 'account' && <AccountTab />}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
