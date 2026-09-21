import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#0d4c4a] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden font-sans">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1d055] text-[12px] font-black text-[#18312f]">S</div>
                            <span className="text-xl font-black tracking-[0.12em] text-white">STORY</span>
                        </Link>
                        <p className="max-w-sm text-sm leading-7 text-[#dfeee9]">
                            Pure honey, natural wellness, and handcrafted goodness for everyday health.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/7 text-white/80 transition hover:bg-[#f1d055] hover:text-[#173d3a]">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f1d055]">Explore</h4>
                        <ul className="space-y-3 text-sm text-[#dfeee9]">
                            {['About Us', 'New Arrivals', 'Best Sellers', 'Our Story', 'Gift Boxes'].map((item) => (
                                <li key={item}><Link to="/shop" className="transition hover:text-white">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f1d055]">Help</h4>
                        <ul className="space-y-3 text-sm text-[#dfeee9]">
                            {['Contact Us', 'Shipping', 'Returns', 'Track Order', 'FAQ'].map((item) => (
                                <li key={item}><Link to="/contact" className="transition hover:text-white">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f1d055]">Reach</h4>
                        <ul className="space-y-4 text-sm text-[#dfeee9]">
                            <li className="flex items-start gap-3"><MapPin size={16} className="mt-1 text-[#f1d055]" /><span>22 Green Valley Road, Bengaluru, India</span></li>
                            <li className="flex items-center gap-3"><Phone size={16} className="text-[#f1d055]" /><span>+91 98765 43210</span></li>
                            <li className="flex items-center gap-3"><Mail size={16} className="text-[#f1d055]" /><span>hello@storyhoney.com</span></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-[#dfeee9] md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} Story Honey. All rights reserved.</p>
                    <div className="flex gap-5">
                        <Link to="#">Privacy</Link>
                        <Link to="#">Terms</Link>
                        <Link to="#">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
