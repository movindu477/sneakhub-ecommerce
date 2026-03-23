import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, ChevronLeft, ChevronRight, Package, Eye, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

// Dummy sizes based on the design
const sizes = ["UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5", "UK 9", "UK 9.5", "UK 10", "UK 10.5", "UK 11", "UK 11.5"];
const colors = ["#EFEae3", "#F9F9F9", "#1A1A1A"];

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("UK 6.5");
    const [selectedColor, setSelectedColor] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) throw new Error('Product not found');
                const data = await response.json();
                
                // Ensure image URL is absolute
                if (data.ProductImageURL && !data.ProductImageURL.startsWith('http')) {
                    const filename = data.ProductImageURL.split('/').pop().split('\\').pop();
                    data.ProductImageURL = `http://localhost:5000/assets/images/${filename}`;
                }
                
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                navigate('/shop');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ productId: product.ProductID, quantity: 1 })
            });
            if (response.ok) {
                alert('Added to cart successfully!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleWishlist = async () => {
        const token = localStorage.getItem('token');
        if (!token) return alert('Please login first');
        try {
            const response = await fetch('http://localhost:5000/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ productId: product.ProductID })
            });
            if (response.ok) alert('Added to favorites!');
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="w-12 h-12 border-4 border-black/10 border-t-brand-accent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    // We simulate thumbnails by repeating the same image
    const thumbnails = [product.ProductImageURL, product.ProductImageURL, product.ProductImageURL, product.ProductImageURL];

    return (
        <div className="min-h-screen bg-white selection:bg-brand-accent selection:text-white pb-20">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 lg:pt-40 flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(`/shop#product-${product.ProductID}`)}
                    className="absolute top-24 lg:top-32 left-6 lg:left-12 flex items-center gap-2 text-sm font-bold text-black/50 hover:text-black hover:gap-3 transition-all duration-300 pointer-events-auto"
                >
                    <ArrowLeft size={16} />
                    Back to Shop
                </button>

                {/* Left Side: Images Gallery */}
                <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x">
                        {thumbnails.map((thumb, idx) => (
                            <button key={idx} className={`snap-center flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-[15px] overflow-hidden border-2 transition-all ${idx === 0 ? 'border-brand-accent' : 'border-black/5 hover:border-black/20'}`}>
                                <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover p-2 bg-[#F3F4F6]" />
                            </button>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 relative w-full aspect-square lg:aspect-auto lg:max-h-[70vh] lg:h-full bg-[#F3F4F6] rounded-[30px] overflow-hidden flex items-center justify-center p-4 md:p-8 border border-black/5 group">
                        <motion.img 
                            layoutId={`img-${product.ProductID}`}
                            src={product.ProductImageURL} 
                            alt={product.ProductName}
                            className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                        />
                        {/* Navigation Controls (Visual Only) */}
                        <div className="absolute right-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:text-brand-accent"><ChevronLeft size={20} /></button>
                            <button className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:text-brand-accent"><ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Product Info */}
                <div className="lg:w-1/2 flex flex-col">
                    {/* Header */}
                    <h1 className="text-4xl md:text-5xl font-black text-black tracking-tighter font-outfit mb-3 leading-none">
                        {product.ProductName}
                    </h1>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center text-[#F59E0B]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.Rating) ? "currentColor" : "none"} stroke="currentColor" />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-black/50 border-l border-black/10 pl-3">
                            {product.ReviewCount} Customer Review{product.ReviewCount !== 1 && 's'}
                        </span>
                    </div>

                    {/* Price and Stock Banner */}
                    <div className="flex items-end gap-4 mb-4">
                        <span className="text-4xl font-black tracking-tighter text-black font-outfit">
                            ${product.DiscountPrice ? product.DiscountPrice : product.Price}
                        </span>
                        {product.DiscountPrice && (
                            <span className="text-xl font-bold text-black/30 line-through mb-1">
                                ${product.Price}
                            </span>
                        )}
                        {product.DiscountPrice && (
                            <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full mb-2">
                                Save {Math.round((1 - product.DiscountPrice / product.Price) * 100)}%
                            </span>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-black/60 mb-10">
                        <span className="flex items-center gap-1.5"><Eye size={16} className="text-brand-accent" /> {Math.floor(Math.random() * 50) + 10} viewing right now</span>
                        <span className="text-black/20">|</span>
                        <span className="flex items-center gap-1.5"><Package size={16} /> Only <strong className="text-black">{product.StockQuantity} Item(s)</strong> left in stock</span>
                    </div>

                    {/* Color Selector */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-black mb-3">Color</h3>
                        <div className="flex gap-3">
                            {colors.map((color, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setSelectedColor(idx)}
                                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === idx ? 'border-brand-accent' : 'border-transparent'} p-0.5 transition-all`}
                                >
                                    <div className="w-full h-full rounded-full shadow-inner border border-black/10" style={{ backgroundColor: color }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-bold text-black">Select Size</h3>
                            <button className="text-sm font-bold text-black/50 underline hover:text-black">Size guide</button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 px-2 border rounded-xl text-sm font-bold transition-all ${
                                        selectedSize === size 
                                        ? 'border-black bg-black text-white shadow-xl' 
                                        : 'border-black/10 bg-white text-black/70 hover:border-black/40 hover:text-black'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 mb-12">
                        <button 
                            disabled={product.StockQuantity === 0}
                            onClick={handleAddToCart}
                            className={`w-full py-5 rounded-[15px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                                product.StockQuantity > 0 
                                ? 'bg-black text-white hover:bg-brand-accent shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] active:scale-95' 
                                : 'bg-black/5 text-black/30 cursor-not-allowed'
                            }`}
                        >
                            {product.StockQuantity > 0 ? 'Add to Cart' : 'Currently Out of Stock'}
                        </button>
                        <button 
                            onClick={handleWishlist}
                            className="w-full py-5 rounded-[15px] border-2 border-black/5 text-black font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:border-black hover:bg-black/5 transition-all active:scale-95"
                        >
                            Favorite <Heart size={18} />
                        </button>
                    </div>

                    {/* About Content */}
                    <div className="border-t border-black/10 pt-8">
                        <h3 className="text-lg font-bold text-black mb-4 font-outfit">About the product</h3>
                        <p className="text-black/60 leading-relaxed font-medium mb-6">
                            {product.Description} Designed for breathability and soft cushioning, this sneaker provides the support you need to hit your stride with confidence whether on the court or on the street.
                        </p>
                        <ul className="list-disc list-inside text-sm text-black/60 space-y-2 font-medium">
                            <li>Color: Origin Bone / Phantom / Red</li>
                            <li>Style: NY7576-021</li>
                            <li>Origin: Authentic Imported Import</li>
                            <li>Brand: {product.Brand}</li>
                            <li>Category: {product.Category}</li>
                        </ul>
                    </div>

                </div>
            </main>
            
            <div className="mt-24">
                <Footer />
            </div>
        </div>
    );
};

export default ProductDetail;
