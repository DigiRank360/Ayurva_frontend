import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import AddressList from '@/components/checkout/AddressList';
import PageHero from '@/components/ui/PageHero';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    createOrder,
    createPaymentOrder,
    verifyPaymentApi,
    updateOrderToPaid
} from '@/lib/api';
import { Shield, Truck, ArrowRight, Wallet, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getImageUrl } from '@/lib/utils';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry',
    'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli', 'Lakshadweep'
];

const emptyAddressForm = { name: '', phone: '', type: 'Home', street: '', city: '', state: '', pincode: '' };

export default function Checkout() {
    const { cartItems, subtotal, discountAmount, shipping, tax, total, cartCount, coupon, clearCart } = useCart();
    const { isAuthenticated, isLoading: authLoading, user } = useAuth();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Address state
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addressLoading, setAddressLoading] = useState(true);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null); // null = add mode, object = edit mode
    const [addressForm, setAddressForm] = useState(emptyAddressForm);
    const [addressSaving, setAddressSaving] = useState(false);

    // Payment state
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Login guard — redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            toast.error('Please login to continue checkout');
            sessionStorage.setItem('redirectAfterLogin', '/checkout');
            navigate('/', { state: { showLogin: true }, replace: true });
        }
    }, [authLoading, isAuthenticated, navigate]);

    // Redirect if cart is empty
    useEffect(() => {
        if (!authLoading && isAuthenticated && cartItems.length === 0) {
            toast.error('Your cart is empty');
            navigate('/shop', { replace: true });
        }
    }, [authLoading, isAuthenticated, cartItems.length, navigate]);

    // Fetch addresses from backend
    const fetchAddresses = useCallback(async () => {
        try {
            setAddressLoading(true);
            const data = await getUserAddresses();
            setAddresses(data || []);
            // Auto-select default or first address
            const defaultAddr = data?.find(a => a.isDefault) || data?.[0];
            if (defaultAddr) setSelectedAddressId(defaultAddr._id);
        } catch (err) {
            console.error('Failed to fetch addresses:', err);
        } finally {
            setAddressLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) fetchAddresses();
    }, [isAuthenticated, fetchAddresses]);

    // Address form handlers
    const openAddModal = () => {
        setEditingAddress(null);
        setAddressForm(emptyAddressForm);
        setShowAddressModal(true);
    };

    const openEditModal = (addr) => {
        setEditingAddress(addr);
        setAddressForm({
            name: addr.name || '',
            phone: addr.phone || '',
            type: addr.type || 'Home',
            street: addr.street || '',
            city: addr.city || '',
            state: addr.state || '',
            pincode: addr.pincode || ''
        });
        setShowAddressModal(true);
    };

    const handleAddressFormChange = (field, value) => {
        setAddressForm(prev => ({ ...prev, [field]: value }));
    };

    const handleAddressSave = async (e) => {
        e.preventDefault();
        const { name, phone, street, city, state, pincode } = addressForm;
        if (!name || !phone || !street || !city || !state || !pincode) {
            toast.error('Please fill all required fields');
            return;
        }
        if (!/^\d{6}$/.test(pincode)) {
            toast.error('Please enter a valid 6-digit pincode');
            return;
        }
        if (!/^\d{10}$/.test(phone.replace(/[+\s-]/g, '').replace(/^91/, ''))) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            setAddressSaving(true);
            let updatedAddresses;
            if (editingAddress) {
                updatedAddresses = await updateUserAddress(editingAddress._id, addressForm);
                toast.success('Address updated');
            } else {
                updatedAddresses = await addUserAddress(addressForm);
                toast.success('Address added');
            }
            setAddresses(updatedAddresses);
            // Select the newly added/updated one
            if (!editingAddress && updatedAddresses.length > 0) {
                setSelectedAddressId(updatedAddresses[updatedAddresses.length - 1]._id);
            }
            setShowAddressModal(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save address');
        } finally {
            setAddressSaving(false);
        }
    };

    const handleAddressDelete = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            const updatedAddresses = await deleteUserAddress(addressId);
            setAddresses(updatedAddresses);
            if (selectedAddressId === addressId) {
                setSelectedAddressId(updatedAddresses[0]?._id || null);
            }
            toast.success('Address deleted');
        } catch (err) {
            toast.error('Failed to delete address');
        }
    };

    // Navigation
    const handleNext = () => {
        if (currentStep === 1 && !selectedAddressId) {
            toast.error('Please select a delivery address');
            return;
        }
        if (currentStep < 3) setCurrentStep(curr => curr + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(curr => curr - 1);
    };

    // Get selected address object
    const selectedAddress = addresses.find(a => a._id === selectedAddressId);

    // Build order payload
    const buildOrderPayload = () => {
        const orderItems = cartItems.map(item => ({
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item.productId
        }));

        const shippingAddress = {
            name: selectedAddress.name,
            phone: selectedAddress.phone,
            address: selectedAddress.street,
            city: selectedAddress.city,
            state: selectedAddress.state,
            postalCode: selectedAddress.pincode,
            country: selectedAddress.country || 'India',
            type: selectedAddress.type || 'Home'
        };

        return {
            orderItems,
            shippingAddress,
            paymentMethod: paymentMethod === 'online' ? 'Razorpay' : 'COD',
            itemsPrice: subtotal,
            taxPrice: tax,
            shippingPrice: shipping,
            totalPrice: total
        };
    };

    // ===== PLACE ORDER =====
    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error('Please select a delivery address');
            setCurrentStep(1);
            return;
        }

        setIsProcessing(true);

        try {
            if (paymentMethod === 'online') {
                await handleRazorpayPayment();
            } else {
                await handleCODOrder();
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            toast.error(error.message || 'Failed to place order. Please try again.');
            setIsProcessing(false);
        }
    };

    // COD Order Flow
    const handleCODOrder = async () => {
        const orderData = buildOrderPayload();
        const createdOrder = await createOrder(orderData);
        clearCart();
        toast.success('Order placed successfully!');
        navigate('/order-confirmation', {
            state: {
                orderId: createdOrder._id,
                total: createdOrder.totalPrice,
                paymentMethod: 'COD'
            }
        });
    };

    // Razorpay Payment Flow
    const handleRazorpayPayment = async () => {
        // 1. Create Razorpay order on backend
        const razorpayOrder = await createPaymentOrder(Math.round(total));

        // 2. Open Razorpay checkout
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: 'Luga Vastra',
            description: `Order Payment - ${cartItems.length} item(s)`,
            order_id: razorpayOrder.id,
            handler: async function (response) {
                try {
                    // 3. Verify payment signature on backend
                    const verifyRes = await verifyPaymentApi({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });

                    if (verifyRes.status === 'success') {
                        // 4. Create order in backend
                        const orderData = buildOrderPayload();
                        const createdOrder = await createOrder(orderData);

                        // 5. Mark order as paid
                        await updateOrderToPaid(createdOrder._id, {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });

                        clearCart();
                        toast.success('Payment successful! Order placed.');
                        navigate('/order-confirmation', {
                            state: {
                                orderId: createdOrder._id,
                                total: createdOrder.totalPrice,
                                paymentMethod: 'Razorpay'
                            }
                        });
                    } else {
                        toast.error('Payment verification failed. Contact support.');
                        setIsProcessing(false);
                    }
                } catch (err) {
                    console.error('Post-payment error:', err);
                    toast.error('Something went wrong after payment. Contact support.');
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: user?.name || selectedAddress?.name || '',
                contact: user?.phone || selectedAddress?.phone || ''
            },
            theme: {
                color: '#bea168'
            },
            modal: {
                ondismiss: function () {
                    setIsProcessing(false);
                    toast('Payment cancelled', { icon: '⚠️' });
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
            console.error('Payment failed:', response.error);
            toast.error(`Payment failed: ${response.error.description}`);
            setIsProcessing(false);
        });
        rzp.open();
    };

    // Don't render if auth is loading or not authenticated
    if (authLoading || !isAuthenticated) {
        return null;
    }

    // Don't render if cart is empty
    if (cartItems.length === 0) {
        return null;
    }

    return (
        <Layout>
            <PageHero
                title="Checkout"
                backgroundImage="https://placehold.co/1920x600"
            >
                <CheckoutSteps currentStep={currentStep} />
            </PageHero>

            <div className="bg-gray-50 min-h-screen pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-20 relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT COLUMN: Main Content */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* STEP 1: Address Selection */}
                            {currentStep === 1 && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-xl font-bold text-text-heading mb-6 flex items-center gap-2">
                                        Select Delivery Address
                                    </h2>

                                    {addressLoading ? (
                                        <div className="flex items-center justify-center py-12">
                                            <Loader2 size={24} className="animate-spin text-accent-gold" />
                                            <span className="ml-3 text-sm text-text-muted">Loading addresses...</span>
                                        </div>
                                    ) : (
                                        <AddressList
                                            addresses={addresses.map(a => ({
                                                id: a._id,
                                                name: a.name,
                                                type: a.type,
                                                street: a.street,
                                                city: a.city,
                                                state: a.state,
                                                pincode: a.pincode,
                                                phone: a.phone
                                            }))}
                                            selectedId={selectedAddressId}
                                            onSelect={setSelectedAddressId}
                                            onAdd={openAddModal}
                                            onEdit={(addr) => {
                                                const fullAddr = addresses.find(a => a._id === addr.id);
                                                if (fullAddr) openEditModal(fullAddr);
                                            }}
                                            onDelete={handleAddressDelete}
                                        />
                                    )}

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={handleNext}
                                            disabled={!selectedAddressId}
                                            className="bg-text-heading text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Continue to Summary <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Order Summary */}
                            {currentStep === 2 && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-xl font-bold text-text-heading mb-6">Review Order ({cartItems.length} Items)</h2>

                                    {/* Delivering to */}
                                    {selectedAddress && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
                                            <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-2">Delivering to</p>
                                            <p className="font-bold text-sm text-text-heading">{selectedAddress.name}</p>
                                            <p className="text-xs text-text-muted mt-1">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                                            <p className="text-xs text-text-muted mt-1">{selectedAddress.phone}</p>
                                        </div>
                                    )}

                                    <div className="space-y-6 mb-8">
                                        {cartItems.map((item) => (
                                            <div key={item._id || `${item.productId}`} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain bg-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-bold text-sm text-text-heading">{item.name}</h3>
                                                        <p className="font-bold text-sm text-text-heading">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                    </div>
                                                    <p className="text-xs text-text-muted mb-2">Qty: {item.quantity}</p>
                                                    <p className="text-xs text-text-muted">Unit Price: ₹{item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between border-t border-gray-100 pt-6">
                                        <button
                                            onClick={handleBack}
                                            className="text-text-muted font-bold text-xs uppercase tracking-widest hover:text-text-heading"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="bg-text-heading text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            Proceed to Payment <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Payment */}
                            {currentStep === 3 && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-xl font-bold text-text-heading mb-6 flex items-center gap-2">
                                        <Wallet size={20} className="text-accent-gold" /> Payment Method
                                    </h2>

                                    <div className="space-y-4 mb-8">
                                        {/* COD Option */}
                                        <label className={`flex items-start gap-4 p-5 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-accent-gold bg-accent-gold/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                                className="mt-1 w-4 h-4 text-accent-gold border-gray-300 focus:ring-accent-gold"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-text-heading text-sm">Cash on Delivery</span>
                                                    <Truck size={16} className="text-gray-400" />
                                                </div>
                                                <p className="text-xs text-text-muted">Pay in cash when your order is delivered.</p>
                                            </div>
                                        </label>

                                        {/* Online Payment Option */}
                                        <label className={`flex items-start gap-4 p-5 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-accent-gold bg-accent-gold/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="online"
                                                checked={paymentMethod === 'online'}
                                                onChange={() => setPaymentMethod('online')}
                                                className="mt-1 w-4 h-4 text-accent-gold border-gray-300 focus:ring-accent-gold"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-text-heading text-sm">Online Payment (UPI/Card/Netbanking)</span>
                                                    <Shield size={16} className="text-gray-400" />
                                                </div>
                                                <p className="text-xs text-text-muted">Secure payment via UPI, Cards, Netbanking powered by Razorpay.</p>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="flex justify-between border-t border-gray-100 pt-6">
                                        <button
                                            onClick={handleBack}
                                            className="text-text-muted font-bold text-xs uppercase tracking-widest hover:text-text-heading"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={isProcessing}
                                            className="bg-black text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2 md:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isProcessing ? (
                                                <><Loader2 size={16} className="animate-spin" /> Processing...</>
                                            ) : (
                                                paymentMethod === 'online'
                                                    ? `Pay ₹${Math.round(total).toLocaleString()}`
                                                    : `Place Order (₹${Math.round(total).toLocaleString()})`
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* RIGHT COLUMN: Price Details (Sticky) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
                                <h3 className="font-bold text-text-heading mb-4 text-sm uppercase tracking-wider">Price Details</h3>

                                <div className="space-y-3 pb-4 border-b border-gray-100 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Subtotal ({cartItems.length} items)</span>
                                        <span className="font-medium text-text-heading">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    {(coupon && discountAmount > 0) && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span className="font-medium">-₹{discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Tax (18% GST)</span>
                                        <span className="font-medium text-text-heading">₹{tax.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Delivery Charges</span>
                                        <span className="text-green-600 font-bold text-xs uppercase">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 mb-2">
                                    <span className="font-bold text-lg text-text-heading">Total Amount</span>
                                    <span className="font-bold text-xl text-text-heading">₹{Math.round(total).toLocaleString()}</span>
                                </div>

                                {/* Security Badge */}
                                <div className="mt-6 bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                                    <Shield size={20} className="text-green-600" />
                                    <p className="text-[10px] text-text-muted font-medium leading-tight">
                                        Safe and Secure Payments. 100% Authentic products.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ADDRESS ADD/EDIT MODAL */}
            {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="font-bold text-lg text-text-heading">
                                {editingAddress ? 'Edit Address' : 'Add New Address'}
                            </h3>
                            <button onClick={() => setShowAddressModal(false)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleAddressSave} className="p-6 space-y-5">
                            {/* Type selection */}
                            <div className="flex gap-3">
                                {['Home', 'Work', 'Other'].map(t => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => handleAddressFormChange('type', t)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${addressForm.type === t ? 'bg-text-heading text-white border-text-heading' : 'border-gray-200 text-text-muted hover:border-gray-400'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Full Name *</label>
                                    <input
                                        type="text"
                                        value={addressForm.name}
                                        onChange={e => handleAddressFormChange('name', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Phone *</label>
                                    <input
                                        type="tel"
                                        value={addressForm.phone}
                                        onChange={e => handleAddressFormChange('phone', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                                        placeholder="10-digit number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Address (House No, Street) *</label>
                                <textarea
                                    rows={2}
                                    value={addressForm.street}
                                    onChange={e => handleAddressFormChange('street', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all resize-none"
                                    placeholder="Enter full address"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Pincode *</label>
                                <input
                                    type="text"
                                    value={addressForm.pincode}
                                    onChange={e => handleAddressFormChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                                    placeholder="6-digit pincode"
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">City *</label>
                                    <input
                                        type="text"
                                        value={addressForm.city}
                                        onChange={e => handleAddressFormChange('city', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                                        placeholder="City"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">State *</label>
                                    <select
                                        value={addressForm.state}
                                        onChange={e => handleAddressFormChange('state', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all appearance-none"
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={addressSaving}
                                className="w-full bg-text-heading text-white py-3.5 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {addressSaving ? (
                                    <><Loader2 size={16} className="animate-spin" /> Saving...</>
                                ) : (
                                    editingAddress ? 'Update Address' : 'Save Address'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
