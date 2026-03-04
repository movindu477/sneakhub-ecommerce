import React, { useState } from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import section5 from '../assets/images/section5.jpg';

const benefits = [
    {
        id: 1,
        title: "Comfort That Lasts All Day",
        description: "Our shoes are crafted with advanced cushioning and breathable materials, keeping your feet supported and comfortable from morning to night."
    },
    {
        id: 2,
        title: "Premium Quality, Built to Last",
        description: "We use only the finest materials and traditional craftsmanship to ensure every pair of SneakHub sneakers stands the test of time."
    },
    {
        id: 3,
        title: "Perfect Fit for Every Lifestyle",
        description: "From performance athletics to street style, our diverse range ensures you find the perfect match for your unique journey."
    },
    {
        id: 4,
        title: "Affordable Style, Daily Deals",
        description: "Get the latest trends without breaking the bank. We offer competitive pricing and exclusive daily drops for our community."
    },
    {
        id: 5,
        title: "Trusted by Thousands",
        description: "Join over 50,000 satisfied customers who rely on SneakHub for their daily rotation and limited edition grails."
    }
];

const Benefits = () => {
    const [activeId, setActiveId] = useState(1);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Framed Image */}
                    <div className="w-full lg:w-[45%]">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] group">
                            <img
                                src={section5}
                                alt="Sneaker Showcase"
                                className="w-full h-full object-cover transition-transform duration-1000"
                            />
                            {/* Modern Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="w-full lg:w-[55%]">
                        <h2 className="text-4xl md:text-6xl font-black font-heading text-black mb-12 tracking-tight">
                            Why Choose Us
                        </h2>

                        <div className="space-y-3 mb-12">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit.id}
                                    className={`rounded-[20px] transition-all duration-500 overflow-hidden ${activeId === benefit.id
                                        ? 'bg-[#F4F4F4] py-6 px-8'
                                        : 'bg-[#F4F4F4]/50 py-4 px-8 cursor-pointer hover:bg-[#F4F4F4]'
                                        }`}
                                    onClick={() => setActiveId(benefit.id)}
                                >
                                    <h3 className={`font-bold transition-all duration-300 ${activeId === benefit.id ? 'text-lg md:text-xl text-black mb-3' : 'text-base md:text-lg text-black/60'
                                        }`}>
                                        {benefit.title}
                                    </h3>

                                    <div className={`transition-all duration-500 ease-in-out ${activeId === benefit.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <p className="text-black/50 text-sm md:text-base leading-relaxed max-w-lg">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modern Button from UI */}
                        <button className="flex items-center gap-6 bg-[#1A1A1A] text-white pl-8 pr-2 py-2 rounded-full group transition-all duration-300 hover:bg-black shadow-xl">
                            <span className="text-sm font-bold uppercase tracking-widest">Shop Now</span>
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={20} />
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Benefits;
