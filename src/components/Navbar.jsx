import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

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
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img src={logo} alt="AirStreet Logo" className="h-7 md:h-8 w-auto object-contain rounded-[15px] md:rounded-[20px]" />
                    </Link>
                </div>

                {/* Desktop Navigation Links (Restored Original + New) */}
                <div className="hidden md:flex items-center justify-center gap-10 text-[10px] font-black tracking-[0.25em] text-[#1A1A1A]">
                    <Link to="/" className="hover:text-brand-accent transition-colors uppercase">HOME</Link>
                    <Link to="/shop" className="hover:text-brand-accent transition-colors uppercase">SHOP</Link>
                    <Link to="/" className="hover:text-brand-accent transition-colors uppercase">COLLECTIONS</Link>
                    <Link to="/" className="hover:text-brand-accent transition-colors uppercase">ABOUT</Link>
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

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-brand-accent transition-all shadow-lg active:scale-95 group overflow-hidden">
                                <User size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-brand-accent transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-[#111111] text-white text-[10px] font-black uppercase tracking-[0.2em] px-10 py-3.5 rounded-full hover:bg-brand-accent transition-all transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-black/10">
                            Login
                        </Link>
                    )}
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
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] pointer-events-auto"
                        />
                        
                        {/* Right-side Sliding Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="md:hidden fixed top-0 right-0 h-screen w-[85%] max-w-[400px] bg-white z-[70] pointer-events-auto shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col p-10"
                        >
                            {/* Close Button Inside Panel */}
                            <div className="flex justify-end mb-12">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-brand-accent hover:text-white transition-all"
                                >
                                    <X size={26} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-8 text-left text-2xl font-black tracking-tight text-black">
                                <Link 
                                    to="/" 
                                    onClick={() => setIsOpen(false)} 
                                    className="hover:text-brand-accent transition-colors border-b border-black/5 pb-2 inline-block w-full"
                                >
                                    HOME
                                </Link>
                                <Link 
                                    to="/shop" 
                                    onClick={() => setIsOpen(false)} 
                                    className="hover:text-brand-accent transition-colors border-b border-black/5 pb-2 inline-block w-full"
                                >
                                    SHOP
                                </Link>
                                <Link 
                                    to="/" 
                                    onClick={() => setIsOpen(false)} 
                                    className="hover:text-brand-accent transition-colors border-b border-black/5 pb-2 inline-block w-full"
                                >
                                    COLLECTIONS
                                </Link>
                                <Link 
                                    to="/" 
                                    onClick={() => setIsOpen(false)} 
                                    className="hover:text-brand-accent transition-colors border-b border-black/5 pb-2 inline-block w-full"
                                >
                                    ABOUT
                                </Link>
                                
                                <div className="mt-auto space-y-6">
                                    <div className="flex items-center gap-8 text-black/40 py-4">
                                        <button className="hover:text-black transition-colors"><Search size={24} /></button>
                                        <button className="hover:text-black transition-colors"><ShoppingBag size={24} /></button>
                                        <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-black transition-colors"><User size={24} /></Link>
                                    </div>
                                    
                                    {user ? (
                                        <div className="space-y-4">
                                            <Link 
                                                to="/profile" 
                                                onClick={() => setIsOpen(false)} 
                                                className="block py-5 bg-black text-white text-center rounded-[20px] font-black uppercase tracking-widest text-sm hover:bg-brand-accent transition-all"
                                            >
                                                MY PROFILE
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsOpen(false);
                                                }}
                                                className="block w-full py-5 border-2 border-black text-black text-center rounded-[20px] font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all"
                                            >
                                                LOGOUT
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block py-5 bg-black text-white text-center rounded-[20px] font-black uppercase tracking-widest text-sm hover:bg-brand-accent transition-all"
                                        >
                                            JOIN THE CLUB
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
