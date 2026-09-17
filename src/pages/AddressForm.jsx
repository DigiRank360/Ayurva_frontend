import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, MapPin, Save } from 'lucide-react';

export default function AddressForm() {
    const navigate = useNavigate();
    const [isDefault, setIsDefault] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to save address
        navigate('/profile');
    };

    return (
        <Layout>
            <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 py-12 md:py-20">
                <div className="w-full max-w-2xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-heading mb-6 transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Profile
                    </button>

                    <div className="bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden relative">
                        {/* Decorative Top Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-text-heading to-accent-gold" />

                        <div className="p-8 md:p-10">
                            <h1 className="font-sans font-bold text-2xl text-text-heading mb-8 flex items-center gap-3 border-b border-border-light pb-4">
                                <div className="w-10 h-10 rounded-full bg-bg-section flex items-center justify-center text-accent-gold">
                                    <MapPin size={20} />
                                </div>
                                Add New Address
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">First Name</label>
                                        <input type="text" className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all" placeholder="Enter first name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Last Name</label>
                                        <input type="text" className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all" placeholder="Enter last name" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Phone Number</label>
                                    <input type="tel" className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all" placeholder="+91 00000 00000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Pin Code</label>
                                    <input type="text" className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all" placeholder="e.g. 400001" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Address (House No, Building, Street)</label>
                                    <textarea rows={3} className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all resize-none" placeholder="Enter full address details..." />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">City</label>
                                        <input type="text" className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">State</label>
                                        <div className="relative">
                                            <select className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all appearance-none">
                                                <option>Select State</option>
                                                <option>Maharashtra</option>
                                                <option>Delhi</option>
                                                <option>Karnataka</option>
                                                <option>Gujarat</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-muted">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 bg-bg-section/30 p-4 rounded-lg border border-border-light">
                                    <input
                                        type="checkbox"
                                        id="default"
                                        checked={isDefault}
                                        onChange={(e) => setIsDefault(e.target.checked)}
                                        className="w-4 h-4 text-accent-gold border-gray-300 rounded focus:ring-accent-gold"
                                    />
                                    <label htmlFor="default" className="text-sm text-text-heading font-medium cursor-pointer select-none">Make this my default address</label>
                                </div>

                                <div className="pt-6">
                                    <button className="w-full bg-text-heading text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group transform active:scale-[0.98]">
                                        Save Address <Save size={16} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
