import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ShopHero from './ShopHero';
import ProductGrid from './ProductGrid';

const Shop = () => {
    return (
        <div className="min-h-screen bg-white selection:bg-brand-accent selection:text-white">
            <Navbar />
            <main>
                <ShopHero />
                <ProductGrid />
            </main>
            <Footer />
        </div>
    );
};

export default Shop;
