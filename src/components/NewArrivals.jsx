import React from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

// Import images
import nike1 from '../assets/images/nike1.avif';
import nike2 from '../assets/images/nike2.avif';
import nike3 from '../assets/images/nike3.avif';
import nike4 from '../assets/images/nike4.avif';
import nike5 from '../assets/images/nike5.avif';
import nike6 from '../assets/images/nike6.avif';
import nike7 from '../assets/images/nike7.avif';
import nike8 from '../assets/images/nike8.avif';

const products = [
    {
        id: 1,
        name: "A' One \"Warning Label\"",
        description: "A'ja Wilson Basketball Shoes",
        price: "$107",
        image: nike1,
        category: "New Collection"
    },
    {
        id: 2,
        name: "Air Jordan 4 Retro \"Imperial Purple\"",
        description: "Men Shoes",
        price: "$220",
        image: nike2,
        category: "New Collection"
    },
    {
        id: 3,
        name: "Nike Air Max Plus",
        description: "Men's Shoes",
        price: "$107",
        image: nike3,
        category: "New Collection"
    },
    {
        id: 4,
        name: "Nike Air Max 270 Premium",
        description: "Women's Shoes",
        price: "$180",
        image: nike4,
        category: "New Collection"
    },
    {
        id: 5,
        name: "Nike Zoom Fly 6",
        description: "Women's Road Racing Shoes",
        price: "$180",
        image: nike5,
        category: "New Collection"
    },
    {
        id: 6,
        name: "Nike Air Diamond Turf 2",
        description: "Men's Shoes",
        price: "$170",
        image: nike6,
        category: "New Collection"
    },
    {
        id: 7,
        name: "Kobe IX Low EM",
        description: "Big Kid's Basketball Shoes",
        price: "$122",
        image: nike7,
        category: "New Collection"
    },
    {
        id: 8,
        name: "Luka 5 \"Matador\"",
        description: "Basketball Shoes",
        price: "$145",
        image: nike8,
        category: "New Collection"
    }
];

const ProductCard = ({ product, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-[24px] p-6 flex flex-col group transition-all duration-500 hover:-translate-y-2 border border-black/5 shadow-[8px_8px_0px_rgba(0,0,0,0.18)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.25)]"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-1">
                        {product.category}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-black leading-tight max-w-[150px]">
                        {product.name}
                    </h3>
                </div>
                <div className="flex gap-1.5 pt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-black/5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500/30"></div>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center py-6 px-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 rounded-[20px]"
                />
            </div>

            <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-xl md:text-2xl font-black text-black italic tracking-tighter">
                    {product.price}
                </span>

                <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-brand-accent transition-all group/btn shadow-lg">
                    <span>Add to Bag</span>
                    <div className="bg-white/10 p-1 rounded-full group-hover/btn:bg-white/20">
                        <Plus size={14} />
                    </div>
                </button>
            </div>
        </motion.div>
    );
};

const NewArrivals = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left"
                >
                    <div className="max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                            New Collection
                        </p>
                        <h2 className="text-[2.2rem] sm:text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter leading-[0.95] text-black">
                            Discover our <br />
                            <span className="text-black/10">latest Collection</span>
                        </h2>
                    </div>

                    <div className="flex justify-center md:justify-end gap-4">
                        <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                            <ShoppingBag size={18} />
                        </button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
