import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

import logo from '../assets/images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F2F2F2]/80 backdrop-blur-md border-b border-black/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-1 flex justify-start">
                    <a href="/" className="hover:opacity-80 transition-opacity">
                        <img src={logo} alt="SneakHub Logo" className="h-8 md:h-10 w-auto object-contain rounded-[20px]" />
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-center gap-12 text-sm font-semibold tracking-widest text-black/60">
                    <a href="#" className="hover:text-black transition-colors">SHOP</a>
                    <a href="#" className="hover:text-black transition-colors">COLLECTIONS</a>
                    <a href="#" className="hover:text-black transition-colors">ABOUT</a>
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex flex-1 items-center justify-end gap-6 text-black/80">
                    <button className="hover:scale-110 transition-transform"><Search strokeWidth={1.5} size={20} /></button>
                    <button className="hover:scale-110 transition-transform"><User strokeWidth={1.5} size={20} /></button>
                    <button className="hover:scale-110 transition-transform">
                        <ShoppingBag strokeWidth={1.5} size={20} />
                    </button>
                </div>


                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button className="text-black/80"><ShoppingBag strokeWidth={1.5} size={20} /></button>
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
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[#F2F2F2] border-b border-black/10 py-8 px-6 menu-open shadow-2xl">
                    <div className="flex flex-col gap-6 text-center text-lg font-bold tracking-[0.2em] text-black">
                        <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">SHOP</a>
                        <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">COLLECTIONS</a>
                        <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">ABOUT</a>
                        <div className="h-[1px] bg-black/5 my-2"></div>
                        <div className="flex justify-center gap-10 pt-4 text-black/60">
                            <Search size={24} />
                            <User size={24} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
