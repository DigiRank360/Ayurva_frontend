import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Search, User, Heart, ShoppingBag, LogIn } from 'lucide-react';
import CartDrawer from '@/components/shop/CartDrawer';
import LoginModal from '@/components/auth/LoginModal';
import OTPModal from '@/components/auth/OTPModal';
import UserMenu from '@/components/auth/UserMenu';
import logo from '@/assets/logo.png';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const { cartItems, cartCount } = useCart();
    const { isAuthenticated, user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
    const [phoneForOTP, setPhoneForOTP] = useState('');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu and search on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsCartOpen(false);
    }, [location]);

    // Check if should show login modal (from protected route redirect)
    useEffect(() => {
        if (location.state?.showLogin && !isAuthenticated) {
            setIsLoginModalOpen(true);
        }
    }, [location, isAuthenticated]);

    // Handle OTP sent
    const handleOTPSent = (phone) => {
        setPhoneForOTP(phone);
        setIsLoginModalOpen(false);
        setIsOTPModalOpen(true);
    };

    // Handle successful login
    const handleLoginSuccess = (result) => {
        setIsOTPModalOpen(false);
        setPhoneForOTP('');

        // Redirect to saved location if exists
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
            sessionStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectPath;
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b",
                    isScrolled
                        ? "bg-[#f7f4ee]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(8,29,30,0.12)] border-[#cfd8d1] py-1.5"
                        : "bg-white/10 backdrop-blur-md border-white/20 py-1.5"
                )}
            >
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Mobile Menu Button + Search - Left */}
                        <div className="md:hidden flex items-center gap-3 flex-1">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-text-heading hover:text-accent-gold transition-colors"
                            >
                                <Menu size={24} />
                            </button>

                            {/* Mobile Search Icon */}
                            {/* <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-text-heading hover:text-accent-gold transition-colors"
                            >
                                <Search size={22} />
                            </button> */}
                        </div>

                        {/* Logo - Center/Left */}
                        <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="relative aspect-[2112/744] w-[clamp(8.5rem,39vw,11rem)] flex-shrink-0 overflow-hidden bg-transparent transition-transform duration-300 group-hover:scale-[1.03] sm:w-48">
                                    <img src={logo} alt="Ayurva PRO" className="absolute inset-0 h-full w-full object-contain" />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation - Center */}
                        <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={cn(
                                        "text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#0d8a7c] transition-colors relative group py-2",
                                        location.pathname + location.search === link.path ? "text-[#0d8a7c]" : "text-[#173d3a]"
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute bottom-0 left-0 w-full h-0.5 bg-[#0d8a7c] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                                        location.pathname + location.search === link.path && "scale-x-100"
                                    )}></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Icons - Right */}
                        <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-5 flex-1 md:flex-none">
                            {/* Desktop Search - Hidden on Mobile */}
                            <div className="hidden sm:block relative group">
                                <input
                                    type="text"
                                    placeholder="Search Ayurvedic wellness"
                                    className="w-0 group-hover:w-48 focus:w-48 transition-all duration-300 border-b border-transparent focus:border-[#0d8a7c] outline-none text-sm bg-transparent placeholder-transparent group-hover:placeholder-gray-400 focus:placeholder-gray-400 pl-7 text-[#173d3a]"
                                />
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#173d3a] cursor-pointer hover:text-[#0d8a7c] transition-colors" size={20} />
                            </div>

                            {/* Mobile Search Icon */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="md:hidden text-text-heading hover:text-accent-gold transition-colors"
                            >
                                <Search size={20} />
                            </button>

                            <Link to="/wishlist" className="text-[#173d3a] hover:text-[#0d8a7c] transition-colors hidden sm:block p-1.5 rounded-full bg-[#f9f7f2]/70 shadow-sm border border-white/20 backdrop-blur-sm">
                                <Heart size={18} />
                            </Link>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="text-[#173d3a] hover:text-[#0d8a7c] transition-colors relative p-1.5 rounded-full bg-[#f9f7f2]/70 shadow-sm border border-white/20 backdrop-blur-sm"
                            >
                                <ShoppingBag size={18} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#0d8a7c] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </button>

                            {/* User Auth - Login or UserMenu */}
                            {isAuthenticated ? (
                                <UserMenu />
                            ) : (
                                <button
                                    onClick={() => setIsLoginModalOpen(true)}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#f0b535] text-[#173d3a] font-semibold rounded-lg border border-[#e1b15f] shadow-[0_10px_22px_rgba(240,181,53,0.28)] hover:bg-[#ebad2f] transition-all duration-300"
                                    title="Login"
                                >
                                    <LogIn size={18} />
                                    <span className="text-sm">Login</span>
                                </button>
                            )}



                        </div>
                    </div>

                    {/* Mobile Search Bar - Slides down below header */}
                    <div
                        className={cn(
                            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                            isSearchOpen ? "max-h-20 mt-4" : "max-h-0"
                        )}
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Ayurvedic products, herbs, ingredients..."
                                className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border-2 border-accent-gold/30 focus:border-accent-gold outline-none text-sm bg-white shadow-sm"
                                autoFocus={isSearchOpen}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-gold" size={20} />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-heading"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>


                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            </header>

            {/* Mobile Menu Portal */}
            {createPortal(
                <>
                    {/* Mobile Menu Overlay */}
                    <div className={cn(
                        "fixed inset-0 z-[60] md:hidden bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    )} onClick={() => setIsMobileMenuOpen(false)} />

                    {/* Mobile Menu Drawer */}
                    <div className={cn(
                        "fixed top-0 left-0 bottom-0 w-[85%] sm:w-[350px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-out transform md:hidden",
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    )}>
                        <div className="flex flex-col h-full bg-[#1A0F0F] text-white">
                            {/* Header of Drawer */}
                            <div className="p-6 flex justify-between items-center border-b border-white/10">
                                <div className="flex aspect-[2112/744] w-52 items-center rounded-md border border-[#e4b52f] bg-[#f5f3ea] px-2 py-1 shadow-md">
                                    <img src={logo} alt="Ayurva PRO" className="h-full w-full object-contain" />
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-gold transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={cn(
                                            "block text-lg font-sans font-bold tracking-widest transition-all duration-300 transform translate-x-0 hover:translate-x-2",
                                            location.pathname + location.search === link.path ? "text-accent-gold" : "text-white/80 hover:text-white"
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* Footer of Drawer - Account Links */}
                            <div className="p-6 border-t border-white/10 bg-black/20">
                                <div className="grid grid-cols-2 gap-4">
                                    {isAuthenticated ? (
                                        <Link to="/profile" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors gap-2 text-sm text-gray-300 hover:text-accent-gold" onClick={() => setIsMobileMenuOpen(false)}>
                                            <User size={20} />
                                            <span>Account</span>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setIsLoginModalOpen(true);
                                            }}
                                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors gap-2 text-sm text-gray-300 hover:text-accent-gold"
                                        >
                                            <LogIn size={20} />
                                            <span>Login</span>
                                        </button>
                                    )}
                                    <Link to="/wishlist" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors gap-2 text-sm text-gray-300 hover:text-accent-gold" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Heart size={20} />
                                        <span>Wishlist</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>,
                document.body
            )}

            {/* Login and OTP Modals */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onOTPSent={handleOTPSent}
            />
            <OTPModal
                isOpen={isOTPModalOpen}
                onClose={() => {
                    setIsOTPModalOpen(false);
                    setPhoneForOTP('');
                }}
                phone={phoneForOTP}
                onSuccess={handleLoginSuccess}
            />
        </>
    );
};

export default Header;
