import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Facebook, 
    Instagram, 
    Youtube, 
    MapPin, 
    Phone, 
    Mail, 
} from 'lucide-react';

// Default Logo import (aap custom path pass kar sakte hain ya prop se override kar sakte hain)
import defaultLogo from '@/assets/logo.png';

const Footer = ({ 
    logoSrc = defaultLogo, 
    brandName = "", 
    socialLinks 
}) => {
    // Default Social Links Array (Aap easily apne URLs ya Icons change kar sakte hain)
    const defaultSocials = [
        { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61594252682451' },
        { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ayuvapro/?hl=en' },
        // { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
        { name: 'Youtube', icon: Youtube, href: '#' }
    ];

    const socials = socialLinks || defaultSocials;

    return (
        <footer className="bg-[#0b3c3a] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden font-sans">
            {/* Background Subtle Grid Effect */}
            <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                style={{ 
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', 
                    backgroundSize: '28px 28px' 
                }} 
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="inline-flex items-center gap-3 group">
                            {logoSrc ? (
                                <span className="inline-flex items-center rounded-md border border-[#f1d055]/50 bg-[#f5f3ea] px-3 py-2 shadow-md transition-transform duration-300 group-hover:scale-[1.03]">
                                    <img
                                        src={logoSrc}
                                        alt={`${brandName || 'Ayurva Pro'} Logo`}
                                        className="h-11 w-auto max-w-[13rem] object-contain sm:h-12"
                                    />
                                </span>
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1d055] text-sm font-black text-[#18312f] shadow-md">
                                    {brandName.charAt(0)}
                                </div>
                            )}
                            <span className="text-2xl font-black tracking-widest text-white">
                                {brandName}
                            </span>
                        </Link>

                        <p className="max-w-sm text-sm leading-relaxed text-[#dfeee9]/80 font-normal">
                            Pure honey, natural wellness, and handcrafted goodness harvested directly for your everyday health and vitality.
                        </p>

                        {/* Social Icons Section */}
                        <div className="flex items-center gap-3 pt-2">
                            {socials.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a 
                                        key={social.name || index} 
                                        href={social.href || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 transition-all duration-300 hover:bg-[#f1d055] hover:text-[#0b3c3a] hover:border-[#f1d055] hover:scale-110"
                                    >
                                        <IconComponent size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links: Explore */}
                    <div className="lg:col-span-2">
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#f1d055]">
                            Explore
                        </h4>
                        <ul className="space-y-3.5 text-sm text-[#dfeee9]/80">
                            {[
                                { name: 'About Us', path: '/about' },
                                { name: 'New Arrivals', path: '/shop?sort=newest' },
                                { name: 'Best Sellers', path: '/shop?sort=best-selling' },
                                { name: 'Our Story', path: '/story' },
                                { name: 'Gift Boxes', path: '/gifts' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="transition-colors hover:text-white hover:underline underline-offset-4">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links: Customer Care */}
                    <div className="lg:col-span-2">
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#f1d055]">
                            Help
                        </h4>
                        <ul className="space-y-3.5 text-sm text-[#dfeee9]/80">
                            {[
                                { name: 'Contact Us', path: '/contact' },
                                { name: 'Shipping Policy', path: '/shipping' },
                                { name: 'Returns & Refunds', path: '/returns' },
                                { name: 'Track Order', path: '/track' },
                                { name: 'FAQs', path: '/faq' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="transition-colors hover:text-white hover:underline underline-offset-4">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> 

                    {/* Contact Details Column */}
                    <div className="lg:col-span-4">
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#f1d055]">
                            Get In Touch
                        </h4>
                        <ul className="space-y-4 text-sm text-[#dfeee9]/80">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 text-[#f1d055] shrink-0" />
                                <span>At. VEDPACHMARHI AYURVEDIC PRIVATE LIMITED , Patansaongi, NH 47 , Nagpur- 441113, Maharashtra</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#f1d055] shrink-0" />
                                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#f1d055] shrink-0" />
                                <a href="mailto:vedmanohar1@gmail.com" className="hover:text-white transition-colors">
                                    vedmanohar1@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar Section */}
                <div className="pt-8 flex flex-col gap-4 text-xs tracking-widest text-[#dfeee9]/70 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} {brandName} Honey. All rights reserved.</p>
                    <div className="flex flex-wrap gap-6 text-[#dfeee9]/80 uppercase">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;