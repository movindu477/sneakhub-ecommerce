import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import logo from '../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-white pt-24 pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24 transition-all duration-500">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-8">
                        <a href="/" className="hover:opacity-80 transition-opacity">
                            <img src={logo} alt="SneakHub Logo" className="h-10 w-auto object-contain rounded-[10px]" />
                        </a>
                        <p className="text-black/50 text-base leading-relaxed max-w-[280px] font-inter uppercase tracking-wide">
                            The ultimate destination for premium sneakers and street culture. Curated for the few, worn by many.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:bg-black hover:text-white hover:border-black transition-all group">
                                    <Icon size={18} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-black mb-8">SHOP</h4>
                        <ul className="space-y-4">
                            {['New Arrivals', 'Best Sellers', 'Release Calendar', 'Exclusives'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-black/40 text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors flex items-center gap-2 group">
                                        {link}
                                        <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-black mb-8">SUPPORT</h4>
                        <ul className="space-y-4">
                            {['Shipping Info', 'Returns & Exchanges', 'Privacy Policy', 'Terms of Use'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-black/40 text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-black mb-8">VISIT US</h4>
                        <div className="space-y-6">
                            <p className="text-black/40 text-sm font-bold uppercase tracking-[0.2em] leading-loose">
                                789 SNEAKER STREET<br />
                                DESIGN DISTRICT<br />
                                NEW YORK, NY 10013
                            </p>
                            <a href="mailto:info@sneakhub.com" className="text-black font-black text-sm uppercase tracking-widest hover:text-brand-accent transition-colors underline underline-offset-8 decoration-black/10">
                                INFO@SNEAKHUB.COM
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em]">
                        © 2024 SNEAKHUB. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8 text-[10px] font-bold text-black/20 uppercase tracking-[0.4em]">
                        <a href="#" className="hover:text-black transition-colors">PRIVACY</a>
                        <a href="#" className="hover:text-black transition-colors">TERMS</a>
                        <a href="#" className="hover:text-black transition-colors">COOKIES</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
