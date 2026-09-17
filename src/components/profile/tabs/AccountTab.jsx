import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function AccountTab() {
    const { user, isLoading, updateProfile } = useAuth();
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Split name for first/last name fields
    const [firstName, lastName] = (form.name || '').split(' ', 2);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleNameChange = (field, value) => {
        // Update name as "First Last"
        let newName = field === 'first' ? `${value} ${lastName || ''}`.trim() : `${firstName || ''} ${value}`.trim();
        setForm((prev) => ({ ...prev, name: newName }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            await updateProfile(form);
            toast.success('Profile updated');
        } catch (err) {
            setError(err.message || 'Failed to update profile');
            toast.error(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-8">Loading account info...</div>;
    }

    return (
        <div className="animate-fade-in-up bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-sm pb-20 lg:pb-8">
            <h2 className="text-xl font-bold text-text-heading mb-8 font-sans">Personal Information</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">First Name</label>
                        <input
                            type="text"
                            value={firstName || ''}
                            onChange={e => handleNameChange('first', e.target.value)}
                            className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3.5 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Last Name</label>
                        <input
                            type="text"
                            value={lastName || ''}
                            onChange={e => handleNameChange('last', e.target.value)}
                            className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3.5 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Email Address</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3.5 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                            placeholder="Email (optional)"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Phone Number</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                            className="w-full bg-bg-section border border-border-light rounded-xl px-4 py-3.5 text-sm font-medium text-text-heading focus:outline-none focus:border-accent-gold focus:bg-white transition-all placeholder:text-text-muted/50"
                            required
                        />
                    </div>
                </div>

                <div className="pt-6 flex justify-end border-t border-border-light mt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-10 py-3.5 bg-text-heading text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-accent-gold transition-all shadow-lg hover:shadow-xl transform active:scale-95"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
