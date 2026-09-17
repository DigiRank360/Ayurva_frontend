import React from 'react';
import { Package, MapPin, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    // { id: 'address', label: 'Addresses', icon: MapPin },
    { id: 'account', label: 'Account', icon: User },
];

const ProfileTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 w-full max-w-4xl mx-auto">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 backdrop-blur-md",
                            isActive
                                ? "bg-accent-gold border-accent-gold text-white shadow-[0_0_20px_rgba(201,160,108,0.4)] transform scale-105"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40"
                        )}
                    >
                        <Icon size={16} className={cn("transition-transform", isActive && "scale-110")} />
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default ProfileTabs;
