import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Search,
  User,
  Heart,
  ShoppingBag,
  LogIn,
  ChevronDown,
} from "lucide-react";
import CartDrawer from "@/components/shop/CartDrawer";
import LoginModal from "@/components/auth/LoginModal";
import OTPModal from "@/components/auth/OTPModal";
import UserMenu from "@/components/auth/UserMenu";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { cartItems, cartCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [phoneForOTP, setPhoneForOTP] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    setPhoneForOTP("");

    // Redirect to saved location if exists
    const redirectPath = sessionStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      sessionStorage.removeItem("redirectAfterLogin");
      window.location.href = redirectPath;
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop All Products", path: "/shop" },
    { name: "Combo Packages", path: "/combo-packages" },
    { name: "Refer & Earn", path: "/refer-and-earn" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b",
          isScrolled
            ? "bg-[#f7f4ee]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(8,29,30,0.12)] border-[#cfd8d1] py-1.5"
            : "bg-white/10 backdrop-blur-md border-white/20 py-1.5",
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button - Left */}
            <div className="xl:hidden flex items-center flex-none mr-2 sm:mr-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-text-heading hover:text-accent-gold transition-colors p-1 -ml-1"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Logo - Center/Left */}
            <div className="min-w-0 flex items-center justify-center xl:justify-start flex-1 xl:flex-none">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative aspect-[2112/744] w-[clamp(6.5rem,32vw,11rem)] max-w-full flex-shrink overflow-hidden bg-transparent transition-transform duration-300 group-hover:scale-[1.03] sm:w-48">
                  <img
                    src={logo}
                    alt="Ayurva PRO"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden xl:flex min-w-0 flex-1 items-center justify-center gap-1.5 2xl:gap-2">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name} className="group relative py-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-semibold tracking-[0.015em] text-[#173d3a] transition-all duration-200 hover:bg-[#eaf1eb] hover:text-[#0d766c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bea168] 2xl:px-3 2xl:text-xs"
                      aria-haspopup="true"
                    >
                      {link.name}
                      <ChevronDown
                        className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                        size={14}
                        aria-hidden="true"
                      />
                    </button>
                    <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-xl border border-[#dce5dc] bg-white p-2 opacity-0 shadow-[0_16px_38px_rgba(8,29,30,0.16)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#31534d] transition-colors hover:bg-[#f2f5f0] hover:text-[#0d766c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bea168]"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-semibold tracking-[0.015em] transition-all duration-200 hover:bg-[#eaf1eb] hover:text-[#0d766c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bea168] 2xl:px-3 2xl:text-xs",
                      location.pathname === link.path
                        ? "bg-[#eaf1eb] text-[#0d766c]"
                        : "text-[#173d3a]",
                    )}
                  >
                    {link.name}
                  </Link>
                ),
              )}
            </nav>

            {/* Icons - Right */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-3 xl:gap-5 flex-none ml-2 sm:ml-3">
              {/* Common Search Icon (Mobile & Desktop both) */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[#173d3a] hover:text-[#0d8a7c] transition-colors p-1.5 rounded-full bg-[#f9f7f2]/70 sm:bg-transparent shadow-sm sm:shadow-none border border-white/20 sm:border-none backdrop-blur-sm sm:backdrop-blur-none"
                aria-label="Toggle Search"
              >
                <Search size={20} />
              </button>

              <Link
                to="/wishlist"
                className="text-[#173d3a] hover:text-[#0d8a7c] transition-colors hidden sm:block p-1.5 rounded-full bg-[#f9f7f2]/70 shadow-sm border border-white/20 backdrop-blur-sm"
              >
                <Heart size={18} />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="text-[#173d3a] hover:text-[#0d8a7c] transition-colors relative p-1.5 rounded-full bg-[#f9f7f2]/70 shadow-sm border border-white/20 backdrop-blur-sm"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0d8a7c] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? "9+" : cartCount}
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

          {/* Search Bar Dropdown - Mobile & Desktop donno me bottom per slide down hoga */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isSearchOpen ? "max-h-24 mt-3 pb-2" : "max-h-0",
            )}
          >
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search Ayurvedic products, herbs, ingredients..."
                className="w-full px-4 py-3 pl-12 pr-10 rounded-xl border-2 border-[#0d8a7c]/40 focus:border-[#0d8a7c] outline-none text-sm bg-white shadow-lg text-[#173d3a]"
                autoFocus={isSearchOpen}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d8a7c]"
                size={20}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173d3a] p-1 rounded-full transition-colors"
                aria-label="Close Search"
              >
                <X size={18} />
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
          <div
            className={cn(
              "fixed inset-0 z-[60] xl:hidden bg-black/50 backdrop-blur-sm transition-opacity duration-300",
              isMobileMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Drawer */}
          <div
            className={cn(
              "fixed top-0 left-0 bottom-0 w-[85%] sm:w-[350px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-out transform xl:hidden",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex flex-col h-full bg-[#1A0F0F] text-white">
              {/* Header of Drawer */}
              <div className="p-4 sm:p-6 flex justify-between items-center gap-3 border-b border-white/10">
                <div className="flex aspect-[2112/744] w-44 sm:w-52 min-w-0 items-center rounded-md border border-[#e4b52f] bg-[#f5f3ea] px-2 py-1 shadow-md">
                  <img
                    src={logo}
                    alt="Ayurva PRO"
                    className="h-full w-full object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent-gold transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-8 px-6">
                <div className="space-y-5">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      <Link
                        to={link.path}
                        className={cn(
                          "block text-base font-sans font-bold tracking-wide transition-all duration-300 hover:translate-x-1",
                          location.pathname === link.path
                            ? "text-accent-gold"
                            : "text-white/80 hover:text-white",
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      {link.children && (
                        <div className="mt-3 space-y-3 border-l border-white/20 pl-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.path}
                              className="block text-sm font-medium text-white/70 transition-colors hover:text-accent-gold"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </nav>

              {/* Footer of Drawer - Account Links */}
              <div className="p-6 border-t border-white/10 bg-black/20">
                <div className="grid grid-cols-2 gap-4">
                  {isAuthenticated ? (
                    <Link
                      to="/profile"
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors gap-2 text-sm text-gray-300 hover:text-accent-gold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
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
                  <Link
                    to="/wishlist"
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors gap-2 text-sm text-gray-300 hover:text-accent-gold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body,
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
          setPhoneForOTP("");
        }}
        phone={phoneForOTP}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;