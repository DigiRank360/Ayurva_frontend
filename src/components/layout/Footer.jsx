import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#120B0D] text-white pt-24 pb-10 border-t border-white/5 relative overflow-hidden font-sans">
            {/* Background Pattern - Subtle */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            {/* <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

                    {/* Brand Column - Wider */}
                    <div className="lg:col-span-2 space-y-8">
                        <Link to="/" className="inline-block group">
                            {/* Logo with hover effect */}
                            <img
                                src={logo}
                                alt="Luga Vastra"
                                className="h-20 w-auto  transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light tracking-wide">
                            "Parampara, Jo Mehsoos Ho." Luga Vastra represents the pinnacle of Indian luxury, crafted for those who value heritage and style.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {[{
                                icon: Facebook,
                                url: "#"

                            }, {
                                icon: Instagram,
                                url: "https://www.instagram.com/lugavastra/"
                            },
                            //  {
                            //     icon:Twitter,
                            //     url:"#"
                            // },
                            {
                                icon: Youtube,
                                url: "https://www.youtube.com/@lugavastra"
                            }].map((item, i) => (
                                <a key={i} href={item.url} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-gold hover:text-white transition-all duration-300 text-gray-400 border border-transparent hover:border-accent-gold group">
                                    <item.icon size={18} className="transform group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Row - Mobile Grid */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-8">
                        {/* Links Column 1 */}
                        <div>
                            <h4 className="text-sm font-bold text-accent-gold uppercase tracking-[0.2em] mb-8">Explore</h4>
                            <ul className="space-y-4">
                                {['About Us', 'New Arrivals', 'Best Sellers', 'Sarees', 'Lehengas'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'About Us' ? '/about' : '/shop'} className="text-gray-400 hover:text-white text-sm transition-all flex items-center gap-2 group">
                                            <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-accent-gold">
                                                <ArrowRight size={12} />
                                            </span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Links Column 2 */}
                        <div>
                            <h4 className="text-sm font-bold text-accent-gold uppercase tracking-[0.2em] mb-8">Help</h4>
                            <ul className="space-y-4">
                                {['Contact Us', 'Shipping & Delivery', 'Returns Policy', 'Track Your Order', 'FAQs'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Contact Us' ? '/contact' : '#'} className="text-gray-400 hover:text-white text-sm transition-all flex items-center gap-2 group">
                                            <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-accent-gold">
                                                <ArrowRight size={12} />
                                            </span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-bold text-accent-gold uppercase tracking-[0.2em] mb-8">Reach Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-gray-400 text-sm group">
                                <MapPin className="text-accent-gold shrink-0 mt-0.5 group-hover:animate-bounce" size={18} />
                                <span className="font-light">125, Rohit Nagar,<br />Bhopal,<br />Madhya Pradesh - 462001</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400 text-sm group">
                                <Phone className="text-accent-gold shrink-0 group-hover:shake" size={18} />
                                <span className="font-light hover:text-white transition-colors cursor-pointer">+91 7400980354</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400 text-sm group">
                                <Mail className="text-accent-gold shrink-0 group-hover:scale-110 transition-transform" size={18} />
                                <span className="font-light hover:text-white transition-colors cursor-pointer">lugavastra@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs tracking-wider font-light">
                        &copy; {new Date().getFullYear()} <span className="text-gray-300 font-medium">Luga Vastra</span>. All classic rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link to="#" className="text-xs text-gray-500 hover:text-accent-gold transition-colors uppercase tracking-wider">Privacy</Link>
                        <Link to="#" className="text-xs text-gray-500 hover:text-accent-gold transition-colors uppercase tracking-wider">Terms</Link>
                        <Link to="#" className="text-xs text-gray-500 hover:text-accent-gold transition-colors uppercase tracking-wider">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
