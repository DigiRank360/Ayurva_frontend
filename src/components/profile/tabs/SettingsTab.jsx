import React from 'react';
import { Bell, CreditCard } from 'lucide-react';

export default function SettingsTab() {
    return (
        <div className="animate-fade-in-up space-y-6 pb-20 lg:pb-0">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-text-heading font-sans">Account Settings</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-light shadow-sm">
                <h3 className="flex items-center gap-3 font-bold text-text-heading mb-6 border-b border-border-light pb-4">
                    <Bell size={20} className="text-accent-gold" /> Notifications
                </h3>
                <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group py-2">
                        <span className="text-sm text-text-heading font-bold group-hover:text-accent-gold transition-colors">Order Status Updates</span>
                        <input type="checkbox" defaultChecked className="appearance-none w-5 h-5 border border-border-light rounded-md checked:bg-text-heading checked:border-text-heading transition-colors cursor-pointer relative" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group py-2">
                        <span className="text-sm text-text-heading font-bold group-hover:text-accent-gold transition-colors">New Collection Alerts</span>
                        <input type="checkbox" defaultChecked className="appearance-none w-5 h-5 border border-border-light rounded-md checked:bg-text-heading checked:border-text-heading transition-colors cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group py-2">
                        <span className="text-sm text-text-heading font-bold group-hover:text-accent-gold transition-colors">Email Newsletter</span>
                        <input type="checkbox" className="appearance-none w-5 h-5 border border-border-light rounded-md checked:bg-text-heading checked:border-text-heading transition-colors cursor-pointer" />
                    </label>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-light shadow-sm">
                <h3 className="flex items-center gap-3 font-bold text-text-heading mb-6 border-b border-border-light pb-4">
                    <CreditCard size={20} className="text-accent-gold" /> Saved Cards
                </h3>
                <div className="text-center py-10 text-text-muted text-sm bg-bg-section rounded-xl border-dashed border-2 border-border-light">
                    No saved cards found
                </div>
                <button className="mt-6 w-full py-3 text-xs font-bold uppercase tracking-widest text-text-heading border border-border-light rounded-xl hover:bg-text-heading hover:text-white transition-all">
                    + Add New Card
                </button>
            </div>
        </div>
    );
}
