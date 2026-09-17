
import React from 'react';
import { Package, MapPin, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function ProfileSidebar({ activeTab, setActiveTab }) {
    const { logout } = useAuth();
    const menuItems = [
        { id: 'orders', label: 'My Orders', icon: Package },
        { id: 'address', label: 'Addresses', icon: MapPin },
        { id: 'account', label: 'Account Details', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-full lg:w-72 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-soft border border-border-light p-4 sticky top-28">
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group",
                                activeTab === item.id
                                    ? "bg-text-heading text-white shadow-md transform scale-[1.02]"
                                    : "text-text-muted hover:bg-bg-section hover:text-text-heading"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={cn("transition-colors", activeTab === item.id ? "text-accent-gold" : "text-text-muted group-hover:text-text-heading")} />
                                {item.label}
                            </div>
                            {activeTab === item.id && <ChevronRight size={16} className="text-accent-gold" />}
                        </button>
                    ))}

                    <div className="pt-4 mt-4 border-t border-border-light">
                        <button
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
                            onClick={logout}
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
}
