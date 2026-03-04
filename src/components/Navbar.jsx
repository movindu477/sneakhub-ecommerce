import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 md:top-6 px-4 md:px-8 pointer-events-none">
            {/* Pill Container for Desktop / Standard Bar for Mobile */}
            <div className={`
                max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500
                ${isOpen
                    ? 'bg-[#F2F2F2] w-full h-16 px-6 rounded-none shadow-none mt-0'
                    : 'w-[95%] md:w-full h-14 md:h-16 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_20px_100px_-20px_rgba(0,0,0,0.1)] rounded-[20px] md:rounded-full px-6 md:px-12 mt-4 md:mt-0'}
            `}>

                {/* Logo Section */}
                <div className="flex-1 flex items-center">
                    <a href="/" className="hover:opacity-80 transition-opacity">
                        <img src={logo} alt="AirStreet Logo" className="h-7 md:h-8 w-auto object-contain rounded-[15px] md:rounded-[20px]" />
                    </a>
                </div>

                {/* Desktop Navigation Links (Restored Original + New) */}
                <div className="hidden md:flex items-center justify-center gap-10 text-[10px] font-black tracking-[0.25em] text-[#1A1A1A]">
                    <a href="#" className="hover:text-brand-accent transition-colors uppercase">SHOP</a>
                    <a href="#" className="hover:text-brand-accent transition-colors uppercase">NEW RELEASES</a>
                    <a href="#" className="hover:text-brand-accent transition-colors uppercase">COLLECTIONS</a>
                    <a href="#" className="hover:text-brand-accent transition-colors uppercase">ABOUT</a>
                </div>

                {/* Desktop Action Area */}
                <div className="hidden md:flex flex-1 items-center justify-end gap-6">
                    <div className="flex items-center gap-6 mr-4 text-black/60">
                        <button className="hover:text-black transition-colors"><Search size={18} strokeWidth={2.5} /></button>
                        <button className="hover:text-black transition-colors relative">
                            <ShoppingBag size={18} strokeWidth={2.5} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-accent rounded-full border-2 border-white"></span>
                        </button>
                    </div>

                    <button className="bg-[#111111] text-white text-[10px] font-black uppercase tracking-[0.2em] px-10 py-3.5 rounded-full hover:bg-brand-accent transition-all transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-black/10">
                        Register Now
                    </button>
                </div>

                {/* Mobile Icons & Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button className="text-black/80"><ShoppingBag size={20} strokeWidth={2} /></button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-black/80 hover:text-black transition-colors"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[#F2F2F2] border-t border-black/5 h-[calc(100vh-80px)] pointer-events-auto menu-open px-6 py-12">
                    <div className="flex flex-col gap-8 text-center text-lg font-black tracking-[0.2em] text-black">
                        <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">SHOP</a>
                        <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">NEW RELEASES</a>
                        <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">COLLECTIONS</a>
                        <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">ABOUT</a>
                        <div className="h-[2px] w-12 bg-black/10 mx-auto my-4"></div>
                        <div className="flex justify-center gap-10">
                            <Search size={28} />
                            <User size={28} />
                        </div>
                        <button className="mt-8 bg-black text-white py-5 rounded-none font-bold tracking-[0.3em] uppercase">
                            Register Now
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
