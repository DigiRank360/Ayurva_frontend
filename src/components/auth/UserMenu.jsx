import React, { useState, useRef, useEffect } from 'react';
import { User, Package, Heart, MapPin, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const menuItems = [
        { icon: User, label: 'My Profile', path: '/profile' },
        // { icon: Package, label: 'My Orders', path: '/profile?tab=orders' },
        // { icon: Heart, label: 'Wishlist', path: '/profile?tab=wishlist' },
        // { icon: MapPin, label: 'Addresses', path: '/profile?tab=addresses' },
    ];

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 py-2 rounded-lg hover:bg-bg-section transition-colors"
            >
                <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-text-heading" />
                </div>
                <div className="hidden lg:flex flex-col items-start">
                    <span className="text-xs text-text-muted">Hello,</span>
                    <span className="text-sm font-medium text-text-heading whitespace-nowrap">
                        {user?.name || user?.phone?.slice(-4)}
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    className="hidden sm:block text-text-muted transition-transform"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-[fadeIn_0.2s_ease-out]">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-text-heading truncate">{user?.name}</p>
                        <p className="text-xs text-text-muted">{user?.phone}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-bg-section transition-colors"
                            >
                                <item.icon size={18} className="text-text-muted" />
                                <span className="text-sm text-text-heading">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left"
                        >
                            <LogOut size={18} className="text-red-500" />
                            <span className="text-sm text-red-500 font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
if (!document.querySelector('style[data-user-menu]')) {
    style.setAttribute('data-user-menu', 'true');
    document.head.appendChild(style);
}

export default UserMenu;
