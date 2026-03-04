import React from 'react';
import { Send } from 'lucide-react';

import { motion } from 'framer-motion';

const Newsletter = () => {
    return (
        <section className="py-24 bg-[#0A0A0A] overflow-hidden relative">
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full -ml-48 -mb-48"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 bg-white/5 backdrop-blur-sm border border-white/5 p-12 lg:p-20 rounded-[40px]"
                >
                    <div className="max-w-xl text-center lg:text-left">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xs font-bold uppercase tracking-[0.4em] text-brand-accent mb-4"
                        >
                            Stay Updated
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-4xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none mb-6"
                        >
                            Join the <span className="text-white/20">Elite Club</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-white/50 text-base md:text-lg font-inter leading-relaxed uppercase tracking-wider"
                        >
                            Get early access to limited drops, exclusive events, and the latest sneaker news.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="w-full max-w-md"
                    >
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL"
                                className="w-full bg-[#1A1A1A] border border-white/10 rounded-full px-8 py-5 text-white placeholder:text-white/20 text-sm font-bold tracking-widest outline-none focus:border-brand-accent transition-all pr-32"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all transform active:scale-95 flex items-center gap-2 group/btn">
                                <span>Join</span>
                                <Send size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </button>
                        </form>
                        <p className="text-center lg:text-left text-[10px] text-white/20 uppercase tracking-[0.2em] mt-6 leading-relaxed">
                            By subscribing you agree to our <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
