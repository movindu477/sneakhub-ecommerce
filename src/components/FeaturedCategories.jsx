import React from 'react';
import section1 from '../assets/images/section1.jpg';
import section2 from '../assets/images/section2.jpg';
import section3 from '../assets/images/section3.jpg';
import section4 from '../assets/images/section4.jpg';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        title: "Running",
        description: "Engage your speed with performance-driven running shoes.",
        image: section1,
    },
    {
        id: 2,
        title: "Basketball",
        description: "Dominate the court with elite traction and support.",
        image: section2,
    },
    {
        id: 3,
        title: "Streetwear",
        description: "Classic silhouttes reimagined for the modern street style.",
        image: section3,
    },
    {
        id: 4,
        title: "Training",
        description: "Stay grounded and powerful through every workout.",
        image: section4,
    }
];

const CategoryCard = ({ category, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group overflow-hidden bg-black aspect-[3/4] rounded-[20px]"
        >
            {/* Background Image */}
            <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-60"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8 text-white">
                {/* Content for Mobile (Always visible) or Desktop Hover */}
                <div className="md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg md:text-2xl font-bold font-heading uppercase tracking-widest mb-2 text-white">
                        {category.title}
                    </h3>
                    <p className="text-[10px] md:text-sm text-gray-300 mb-4 md:mb-6 font-inter leading-relaxed line-clamp-2 md:line-clamp-none">
                        {category.description}
                    </p>
                    <button className="flex items-center gap-2 text-[8px] md:text-xs font-black uppercase tracking-widest bg-brand-accent px-4 md:px-6 py-2.5 md:py-3 hover:bg-white hover:text-black transition-colors">
                        Explore Now
                        <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                    </button>
                </div>
            </div>

            {/* Default Title (Visible ONLY on desktop until hover) */}
            <div className="hidden md:block absolute bottom-6 left-8 group-hover:hidden transition-all duration-300">
                <h3 className="text-lg md:text-xl font-bold font-heading uppercase tracking-widest text-white drop-shadow-lg">
                    {category.title}
                </h3>
            </div>
        </motion.div>
    );
};

const FeaturedCategories = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                >
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-3">
                            Collections
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading uppercase tracking-tighter">
                            Featured Categories
                        </h2>
                    </div>
                    <a href="#" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors">
                        View All Collections
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
