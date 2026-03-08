import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight, Youtube } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0A0A0A] pt-32 pb-12 overflow-hidden relative">
            {/* Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none -z-0">
                <h2 className="text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap">
                    AIRSTREET
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">

                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-4 flex flex-col gap-10"
                    >
                        <a href="/" className="inline-block hover:opacity-80 transition-opacity">
                            <img src={logo} alt="AirStreet Logo" className="h-10 w-auto object-contain rounded-[20px]" />
                        </a>
                        <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-[320px] font-inter uppercase tracking-widest font-medium">
                            The ultimate destination for premium sneakers and street culture. Curated for the few, worn by many.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-500 group"
                                >
                                    <Icon size={20} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Shop Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-10">Shop</h4>
                        <ul className="space-y-5">
                            {['New Arrivals', 'Best Sellers', 'Release Calendar', 'Exclusives'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-brand-accent transition-all duration-300 flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-brand-accent transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-10">Support</h4>
                        <ul className="space-y-5">
                            {['Shipping Info', 'Returns & Exchanges', 'Privacy Policy', 'Terms of Use'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-brand-accent transition-all duration-300 flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-brand-accent transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-10">Visit Us</h4>
                        <div className="space-y-8">
                            <p className="text-white/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] leading-loose">
                                789 SNEAKER STREET<br />
                                DESIGN DISTRICT<br />
                                NEW YORK, NY 10013
                            </p>
                            <a href="mailto:info@airstreet.com" className="group flex items-center gap-4 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:text-brand-accent transition-colors">
                                <span className="pb-1 border-b border-white/10 group-hover:border-brand-accent transition-colors">INFO@AIRSTREET.COM</span>
                                <ArrowUpRight size={16} className="text-brand-accent" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">
                        © {currentYear} AIRSTREET. DESIGNED FOR THE HYPE.
                    </p>
                    <div className="flex items-center gap-12 text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
                        <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
                        <a href="#" className="hover:text-white transition-colors">TERMS</a>
                        <a href="#" className="hover:text-black transition-colors px-4 py-2 bg-white/5 rounded-full hover:bg-white text-white/40 hover:text-black">COOKIES</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
