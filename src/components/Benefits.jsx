import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
    {
        id: 1,
        title: "Free Shipping",
        description: "On all orders over $150. Fast and reliable delivery to your doorstep.",
        icon: Truck
    },
    {
        id: 2,
        title: "Easy Returns",
        description: "Not the right fit? Return within 30 days for a hassle-free exchange or refund.",
        icon: RotateCcw
    },
    {
        id: 3,
        title: "Secure Payments",
        description: "Your data is protected. We use industry-leading encryption for all transactions.",
        icon: ShieldCheck
    },
    {
        id: 4,
        title: "Authentic Sneakers",
        description: "Guaranteed 100% original products sourced directly from authorized brands.",
        icon: Award
    }
];

const Benefits = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4"
                    >
                        Our Commitment
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-black font-heading text-black uppercase tracking-tighter"
                    >
                        Why Choose Us
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#F8F8F8] p-8 rounded-[30px] group hover:bg-black transition-all duration-500 flex flex-col items-center text-center h-full"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-black mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                <benefit.icon size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-black mb-4 group-hover:text-white transition-colors">
                                {benefit.title}
                            </h3>

                            <p className="text-black/50 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 flex justify-center"
                >
                    <button className="flex items-center gap-6 bg-[#1A1A1A] text-white pl-8 pr-2 py-2 rounded-full group transition-all duration-300 hover:bg-brand-accent shadow-xl transform hover:scale-105">
                        <span className="text-sm font-bold uppercase tracking-widest">Shop All Now</span>
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={20} />
                        </div>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Benefits;
