
import React, { useState } from 'react';
import { MapPin, Plus, X } from 'lucide-react';
import { addUserAddress, updateUserAddress, deleteUserAddress } from '@/lib/api';
import toast from 'react-hot-toast';

const emptyAddressForm = {
    name: '',
    phone: '',
    type: 'Home',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: 'India',
};

export default function AddressesTab({ addresses = [], onAddressesChange }) {
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressForm, setAddressForm] = useState(emptyAddressForm);
    const [saving, setSaving] = useState(false);

    const openAddModal = () => {
        setEditingAddress(null);
        setAddressForm(emptyAddressForm);
        setShowModal(true);
    };

    const openEditModal = (addr) => {
        setEditingAddress(addr);
        setAddressForm({
            name: addr.name || '',
            phone: addr.phone || '',
            type: addr.type || 'Home',
            address: addr.address || addr.addressLine1 || '',
            pincode: addr.pincode || addr.postalCode || '',
            city: addr.city || '',
            state: addr.state || '',
            country: addr.country || 'India',
        });
        setShowModal(true);
    };

    const handleChange = (field, value) => {
        setAddressForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const { name, phone, address, city, state, pincode } = addressForm;
        if (!name || !phone || !address || !city || !state || !pincode) {
            toast.error('Please fill all required fields');
            return;
        }
        setSaving(true);
        try {
            let payload = {
                ...addressForm,
                addressLine1: addressForm.address,
                postalCode: addressForm.pincode,
            };
            let updated;
            if (editingAddress) {
                updated = await updateUserAddress(editingAddress._id, payload);
                toast.success('Address updated');
            } else {
                updated = await addUserAddress(payload);
                toast.success('Address added');
            }
            onAddressesChange(updated.addresses || updated);
            setShowModal(false);
        } catch (err) {
            toast.error('Failed to save address');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this address?')) return;
        try {
            const updated = await deleteUserAddress(id);
            onAddressesChange(updated.addresses || updated);
            toast.success('Address deleted');
        } catch {
            toast.error('Failed to delete address');
        }
    };

    return (
        <div className="animate-fade-in-up pb-20 lg:pb-0">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-text-heading font-sans">My Addresses</h2>
                <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-accent-gold text-white rounded-xl font-bold hover:bg-accent-gold/90 transition-all">
                    <Plus size={18} /> Add Address
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.length === 0 && (
                    <div className="col-span-2 text-center text-text-muted py-10">No addresses found.</div>
                )}
                {addresses.map((address, idx) => (
                    <div key={address._id || idx} className="bg-white p-6 rounded-2xl border border-accent-gold shadow-sm relative overflow-hidden group">
                        {address.isDefault && (
                            <div className="absolute top-0 right-0 px-3 py-1 bg-accent-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">Default</div>
                        )}
                        <h3 className="font-bold text-text-heading mb-3 flex items-center gap-2">
                            <MapPin size={18} className="text-accent-gold" /> {address.label || 'Address'}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed mb-4 font-medium">
                            {address.name}<br />
                            {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}<br />
                            {address.city}, {address.state} {address.postalCode}<br />
                            {address.country}<br />
                            {address.phone}
                        </p>
                        <div className="flex gap-3 pt-2 border-t border-border-light">
                            <button onClick={() => openEditModal(address)} className="text-xs font-bold uppercase tracking-wider text-text-heading hover:text-accent-gold transition-colors flex-1 text-center py-2">Edit</button>
                            <span className="text-border-light">|</span>
                            <button onClick={() => handleDelete(address._id)} className="text-xs font-bold uppercase tracking-wider text-text-muted hover:text-text-heading transition-colors flex-1 text-center py-2">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <form onSubmit={handleSave} className="bg-white rounded-2xl p-0 w-full max-w-lg shadow-xl relative">
                        <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-heading"><X size={22} /></button>
                        <div className="p-6 md:p-8">
                            <h3 className="text-xl font-bold mb-6 font-sans">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                            <div className="flex gap-2 mb-6">
                                {['Home', 'Work', 'Other'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest border transition-all ${addressForm.type === type ? 'bg-text-heading text-white' : 'bg-bg-section text-text-heading border-border-light'}`}
                                        onClick={() => handleChange('type', type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Full Name *</label>
                                    <input
                                        className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                                        placeholder="Enter full name"
                                        value={addressForm.name}
                                        onChange={e => handleChange('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Phone *</label>
                                    <input
                                        className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                                        placeholder="10-digit number"
                                        value={addressForm.phone}
                                        onChange={e => handleChange('phone', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Address (House No, Street) *</label>
                                <input
                                    className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                                    placeholder="Enter full address"
                                    value={addressForm.address}
                                    onChange={e => handleChange('address', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Pincode *</label>
                                    <input
                                        className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                                        placeholder="6-digit pincode"
                                        value={addressForm.pincode}
                                        onChange={e => handleChange('pincode', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">City *</label>
                                        <input
                                            className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                                            placeholder="City"
                                            value={addressForm.city}
                                            onChange={e => handleChange('city', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">State *</label>
                                        <input
                                            className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                                            placeholder="Select State"
                                            value={addressForm.state}
                                            onChange={e => handleChange('state', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Country</label>
                                <input
                                    className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                                    placeholder="Country"
                                    value={addressForm.country}
                                    onChange={e => handleChange('country', e.target.value)}
                                />
                            </div>
                            <button type="submit" disabled={saving} className="w-full py-3 bg-text-heading text-white font-bold rounded-xl hover:bg-accent-gold transition-all shadow-lg hover:shadow-xl transform active:scale-95">
                                {saving ? 'Saving...' : (editingAddress ? 'Update Address' : 'Save Address')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
