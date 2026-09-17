
import React from 'react';
import { Package, MapPin, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function ProfileMobileTabs({ activeTab, setActiveTab }) {
    const { logout } = useAuth();
    const tabs = [
        { id: 'orders', label: 'My Orders', icon: Package },
        // { id: 'address', label: 'Addresses', icon: MapPin },
        { id: 'account', label: 'Account', icon: User },
    ];

    return (
        <div className="lg:hidden w-full text-center flex justify-center items-center  top-0 z-40">
            <div className="flex text-center items-center justify-center  gap-2 w-full max-w-4xl px-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 min-w-[120px] justify-center px-2 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border-2 snap-center whitespace-nowrap",
                                isActive
                                    ? "bg-accent-gold border-accent-gold text-white shadow-[0_0_10px_rgba(201,160,108,0.2)] scale-105"
                                    : "bg-white border-white text-text-heading hover:bg-bg-section hover:border-accent-gold"
                            )}
                        >
                            <Icon size={16} className={cn("transition-transform", isActive && "scale-110")}/>
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
              
            </div>
        </div>
    );
}
