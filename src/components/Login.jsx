import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome, AlertCircle, CheckCircle2 } from 'lucide-react';
import loginImg from '../assets/images/login.jpg';
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState({ type: null, message: '' });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) return 'Email is required';
        if (!emailRegex.test(formData.email)) return 'Invalid email format';
        if (!formData.password) return 'Password is required';
        return null;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setStatus({ type: 'error', message: validationError });
            return;
        }

        setIsLoading(true);
        setStatus({ type: null, message: '' });

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // 8. Handle Success: Store token & redirect
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                setStatus({ type: 'success', message: 'Log in successful! Redirecting...' });
                setTimeout(() => navigate('/'), 1500);
            } else {
                // Handle different error statuses from backend
                if (response.status === 403) {
                    setStatus({ type: 'suspended', message: data.message });
                } else {
                    setStatus({ type: 'error', message: data.message || 'Invalid email or password.' });
                }
            }
        } catch (err) {
            console.error('Login Error:', err);
            setStatus({ type: 'error', message: 'Cannot connect to backend server. Ensure it is running on port 5000.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-[#F2F2F2] flex items-center justify-center p-0 md:p-8 overflow-hidden font-inter select-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full md:h-auto md:max-w-6xl md:aspect-[16/9] bg-white md:rounded-[32px] overflow-hidden shadow-[0_50px_1000px_-20px_rgba(0,0,0,0.1)] flex flex-col md:flex-row relative"
            >
                {/* Image Area - Stretched down on Mobile */}
                <div className="h-[35vh] md:h-full md:w-[45%] lg:w-[50%] relative overflow-hidden flex-shrink-0">
                    <img
                        src={loginImg}
                        alt="Adventure"
                        className="absolute inset-0 w-full h-full object-cover transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-tr"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full text-white p-4 md:p-12">
                        <Link to="/" className="inline-block relative group">
                            <img src={logo} alt="SneakHub" className="h-8 md:h-16 w-auto rounded-[12px] md:rounded-[24px] object-contain shadow-2xl transition-transform group-hover:scale-105" />
                        </Link>

                        <div className="hidden md:block mb-4 lg:mb-8">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl lg:text-5xl font-black font-heading uppercase tracking-tight leading-[0.9] mb-4"
                            >
                                YOUR NEXT<br />ADVENTURE<br />AWAITS!
                            </motion.h2>
                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/70 text-xs lg:text-sm max-w-sm font-inter"
                            >
                                Log in to unlock exclusive deals and pick up where you left off.
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Form Area */}
                <div className="flex-1 flex flex-col relative bg-white overflow-hidden">
                    {/* Desktop Back Button */}
                    <Link
                        to="/"
                        className="hidden md:flex absolute top-8 left-8 lg:top-12 lg:left-12 items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#111111]/40 hover:text-black transition-colors group"
                    >
                        <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to site
                    </Link>

                    {/* Mobile Back Button */}
                    <Link
                        to="/"
                        className="md:hidden absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-full text-[9px] font-black uppercase tracking-widest text-black/40 active:bg-black active:text-white transition-all shadow-sm"
                    >
                        <ArrowRight size={12} className="rotate-180" />
                        Back
                    </Link>

                    <div className="flex-1 flex flex-col justify-center px-6 pt-4 pb-6 md:px-12 md:py-8 lg:px-20 overflow-hidden">
                        <div className="w-full max-w-sm mx-auto">
                            <div className="mb-4 md:mb-8 text-center md:text-left">
                                <motion.h1
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-xl md:text-3xl lg:text-4xl font-black font-heading text-black uppercase tracking-tighter mb-0.5"
                                >
                                    Welcome Back!
                                </motion.h1>
                                <motion.p
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-black/40 text-[9px] md:text-xs font-bold uppercase tracking-widest"
                                >
                                    Please enter your details to sign in.
                                </motion.p>
                            </div>

                            <AnimatePresence mode="wait">
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className={`p-2.5 rounded-xl mb-3 flex items-start gap-2 ${status.type === 'error' || status.type === 'suspended' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                            }`}
                                    >
                                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                        <div className="text-[10px] font-bold leading-tight">{status.message}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
                                <div className="space-y-0.5 md:space-y-1">
                                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black/40">Email</label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            placeholder="hello@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full h-9 md:h-11 bg-black/5 rounded-xl px-4 text-xs font-bold border-2 border-transparent focus:border-black focus:bg-white outline-none transition-all"
                                        />
                                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={14} />
                                    </div>
                                </div>

                                <div className="space-y-0.5 md:space-y-1">
                                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black/40">Password</label>
                                    <div className="relative group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full h-9 md:h-11 bg-black/5 rounded-xl px-4 text-xs font-bold border-2 border-transparent focus:border-black focus:bg-white outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-0.5">
                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                            className="peer hidden"
                                        />
                                        <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded border-2 border-black/10 peer-checked:bg-black peer-checked:border-black flex items-center justify-center text-white transition-all">
                                            <div className="scale-0 peer-checked:scale-100 transition-transform text-[8px]">✓</div>
                                        </div>
                                        <span className="text-[8px] md:text-[9px] font-bold text-black/40 uppercase tracking-wider">Stay signed in</span>
                                    </label>
                                    <a href="#" className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black hover:text-brand-accent transition-colors">Forgot Pwd?</a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 md:h-13 bg-black text-white rounded-xl font-black uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-brand-accent transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 disabled:opacity-50"
                                >
                                    {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Sign In <ArrowRight size={14} /></>}
                                </button>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="flex-1 h-9 md:h-11 bg-transparent border-2 border-black/5 text-black rounded-xl font-black uppercase tracking-widest text-[8px] hover:border-black transition-all flex items-center justify-center gap-2"
                                    >
                                        <Chrome size={12} /> Google
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 h-9 md:h-11 bg-transparent border-2 border-black/5 text-black rounded-xl font-black uppercase tracking-widest text-[8px] hover:border-black transition-all flex items-center justify-center gap-2"
                                    >
                                        <Github size={12} /> Github
                                    </button>
                                </div>
                            </form>

                            <p className="mt-5 md:mt-6 text-center text-[9px] md:text-sm font-bold text-black/40 uppercase tracking-widest">
                                New here?{' '}
                                <Link to="/register" className="text-black font-black hover:text-brand-accent transition-colors underline-offset-4 decoration-2">Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
