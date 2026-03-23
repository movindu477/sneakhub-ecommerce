import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import shopImage from '../assets/images/shop1.avif';

const ShopHero = () => {
    return (
        <section className="relative w-full h-screen bg-[#4A7B8E] overflow-hidden flex items-center justify-center">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img
                    src={shopImage}
                    alt="Latest Collection"
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay for better text readability and teal tint to match reference */}
                <div className="absolute inset-0 bg-[#4A7B8E]/30 mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center justify-center h-full pt-20 md:pt-0">

                {/* Left Content / Top Content on Mobile */}
                <div className="flex flex-col justify-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/70 mb-4 md:mb-6">
                            EXCLUSIVE BRAND
                        </p>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-[0.05em] text-white uppercase max-w-xl">
                            EXCLUSIVE<br />
                            OFFERS<br />
                            FOR YOU
                        </h1>
                    </motion.div>
                </div>

                {/* Right Content / Bottom Content on Mobile */}
                <div className="flex flex-col justify-center lg:items-end w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-xs lg:text-left"
                    >
                        <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed mb-8 md:mb-12">
                            Clothing is more than just a way to cover the body—it's a form of self-expression, culture, and identity.
                        </p>

                        <button
                            onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative flex items-center gap-4 bg-white text-black pl-8 pr-2 py-2 rounded-full font-bold transition-all hover:pr-3 hover:bg-brand-accent hover:text-white"
                        >
                            <span className="text-xs md:text-sm tracking-tight uppercase">Shop Now</span>
                            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-transform group-hover:bg-white group-hover:text-brand-accent group-hover:rotate-45">
                                <ArrowRight size={18} strokeWidth={3} />
                            </div>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#4A7B8E]/80 to-transparent pointer-events-none" />
        </section>
    );
};

export default ShopHero;
