import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import section6 from '../assets/images/section6.jpg';
import section7 from '../assets/images/section7.jpg';

const reviews = [
    {
        id: 1,
        title: "Durable and stylish!",
        text: "I love how these shoes enhance my style while still being incredibly comfortable for all-day wear. The design details are endless, and the craftsmanship is top-notch. Definitely worth every penny!",
        name: "Jamie Foxx",
        role: "Happy Customer",
        rating: 5
    },
    {
        id: 2,
        title: "The Ultimate Comfort",
        text: "I've tried many brands, but AirStreet's collection is on another level. The cushioning feels like walking on clouds, and the aesthetic is just perfect for my street style.",
        name: "Michael Chen",
        role: "Sneaker Enthusiast",
        rating: 5
    }
];

import { motion, AnimatePresence } from 'framer-motion';

const Reviews = () => {
    const [current, setCurrent] = useState(0);

    const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
    const prevReview = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

    const activeReview = reviews[current];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6"
                >
                    <h2 className="text-3xl md:text-5xl font-black font-heading text-black leading-tight max-w-xl uppercase tracking-tighter">
                        Review of our<br />customers
                    </h2>
                    <a href="#" className="text-sm font-bold uppercase tracking-widest text-black hover:opacity-60 transition-opacity border-b-2 border-black pb-1">
                        See More
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Left Column: Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-4 flex flex-col pt-4"
                    >
                        <div className="text-[#2563EB] mb-6">
                            <Quote size={48} fill="currentColor" stroke="none" className="opacity-80" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h3 className="text-xl md:text-2xl font-black text-black mb-6 uppercase tracking-tight italic">
                                    {activeReview.title}
                                </h3>

                                <p className="text-black/60 text-base md:text-lg leading-relaxed mb-10 font-inter py-2">
                                    {activeReview.text}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                fill={i < activeReview.rating ? "#F59E0B" : "none"}
                                                stroke={i < activeReview.rating ? "#F59E0B" : "currentColor"}
                                            />
                                        ))}
                                    </div>
                                    <h4 className="text-lg font-black text-black">
                                        {activeReview.name}
                                    </h4>
                                    <p className="text-sm text-black/30 font-bold uppercase tracking-widest">
                                        {activeReview.role}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Middle Column: Tall Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5"
                    >
                        <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden shadow-2xl">
                            <img
                                src={section6}
                                alt="Style Preview"
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Small Image + Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-3 flex flex-col justify-between h-full gap-12"
                    >
                        <div className="relative aspect-square rounded-[30px] overflow-hidden shadow-xl hidden md:block">
                            <img
                                src={section7}
                                alt="Collection Detail"
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </div>

                        <div className="flex justify-start lg:justify-end gap-4 mt-auto">
                            <button
                                onClick={prevReview}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                onClick={nextReview}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-black transition-all cursor-pointer shadow-lg shadow-blue-200"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Reviews;
