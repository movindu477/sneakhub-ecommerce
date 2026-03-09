import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

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
                    <Link to="/" className="hover:text-brand-accent transition-colors uppercase">SHOP</Link>
                    <Link to="/" className="hover:text-brand-accent transition-colors uppercase">NEW RELEASES</Link>
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
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[#F2F2F2] border-t border-black/5 h-[calc(100vh-80px)] pointer-events-auto menu-open px-6 py-12">
                    <div className="flex flex-col gap-8 text-center text-lg font-black tracking-[0.2em] text-black">
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">SHOP</Link>
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">NEW RELEASES</Link>
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">COLLECTIONS</Link>
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">ABOUT</Link>
                        <div className="h-[2px] w-12 bg-black/10 mx-auto my-4"></div>
                        <div className="flex justify-center gap-10">
                            <Search size={28} />
                            <Link to="/login" onClick={() => setIsOpen(false)}><User size={28} /></Link>
                        </div>
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">PROFILE</Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="mt-8 bg-black text-white py-5 rounded-none font-bold tracking-[0.3em] uppercase block w-full"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="mt-8 bg-black text-white py-5 rounded-none font-bold tracking-[0.3em] uppercase block"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
