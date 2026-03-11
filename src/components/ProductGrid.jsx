import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Star, ShoppingCart, Search, Filter, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [filters, setFilters] = useState({
        search: '',
        brand: '',
        category: '',
        sort: 'newest',
        minPrice: 0,
        maxPrice: 1000
    });
    const [showFilters, setShowFilters] = useState(false);
    const [previewProduct, setPreviewProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: pagination.currentPage,
                limit: 8,
                search: filters.search,
                brand: filters.brand,
                category: filters.category,
                sort: filters.sort,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice
            });

            const response = await fetch(`http://localhost:5000/api/products?${queryParams}`);
            const data = await response.json();
            
            setProducts(data.products);
            setPagination(prev => ({
                ...prev,
                totalPages: data.pagination.totalPages
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [pagination.currentPage, filters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const addToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ productId, quantity: 1 })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Added to cart successfully!');
            } else {
                alert(data.message || 'Error adding to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const toggleWishlist = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to manage wishlist');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ productId })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Added to wishlist!');
            } else {
                alert(data.message || 'Error updating wishlist');
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    return (
        <section className="bg-white py-12 md:py-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header with Search and Filter Toggle */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">SHOP COLLECTIONS</p>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase font-outfit">THE CATALOGUE</h2>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-brand-accent transition-colors" size={18} />
                            <input 
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search sneakers..."
                                className="pl-12 pr-6 py-4 bg-[#F3F4F6] rounded-full text-sm font-bold border-none focus:ring-2 focus:ring-brand-accent/20 w-full md:w-64 transition-all"
                            />
                        </div>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-4 rounded-full transition-all ${showFilters ? 'bg-black text-white' : 'bg-[#F3F4F6] text-black hover:bg-black/5'}`}
                        >
                            <Filter size={20} />
                        </button>
                    </div>
                </header>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-12 overflow-hidden border-b border-black/5"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Brand</label>
                                    <select name="brand" value={filters.brand} onChange={handleFilterChange} className="w-full p-4 bg-[#F3F4F6] rounded-2xl text-sm font-bold border-none">
                                        <option value="">All Brands</option>
                                        <option value="Nike">Nike</option>
                                        <option value="Jordan">Jordan</option>
                                        <option value="Adidas">Adidas</option>
                                        <option value="SneakHub">SneakHub</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Category</label>
                                    <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-4 bg-[#F3F4F6] rounded-2xl text-sm font-bold border-none">
                                        <option value="">All Categories</option>
                                        <option value="Running">Running</option>
                                        <option value="Basketball">Basketball</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Sort By</label>
                                    <select name="sort" value={filters.sort} onChange={handleFilterChange} className="w-full p-4 bg-[#F3F4F6] rounded-2xl text-sm font-bold border-none">
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="best_selling">Best Selling</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Max Price: ${filters.maxPrice}</label>
                                    <input 
                                        type="range" 
                                        name="maxPrice" 
                                        min="0" 
                                        max="1000" 
                                        step="10"
                                        value={filters.maxPrice} 
                                        onChange={handleFilterChange}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black mt-4"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Product Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-12 h-12 border-4 border-black/10 border-t-brand-accent rounded-full animate-spin"></div>
                        <p className="text-xs font-black tracking-widest uppercase opacity-20">Syncing with database...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {products.length > 0 ? products.map((product, index) => (
                                <ProductCard 
                                    key={product.ProductID} 
                                    product={product} 
                                    index={index} 
                                    onPreview={() => setPreviewProduct(product)}
                                    onAddToCart={() => addToCart(product.ProductID)}
                                    onWishlist={() => toggleWishlist(product.ProductID)}
                                />
                            )) : (
                                <div className="col-span-full py-24 text-center">
                                    <p className="text-xl font-bold text-black/40">No sneakers found matching your criteria.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-20 flex items-center justify-center gap-4">
                                <button 
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                                    className="p-4 rounded-full bg-[#F3F4F6] text-black disabled:opacity-20 hover:bg-black hover:text-white transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex items-center gap-2">
                                    {[...Array(pagination.totalPages)].map((_, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                                            className={`w-12 h-12 rounded-full font-black text-sm transition-all ${pagination.currentPage === i + 1 ? 'bg-black text-white' : 'bg-[#F3F4F6] text-black hover:bg-black/5'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                                    className="p-4 rounded-full bg-[#F3F4F6] text-black disabled:opacity-20 hover:bg-black hover:text-white transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Quick Preview Modal */}
            <AnimatePresence>
                {previewProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPreviewProduct(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[40px] w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            <button 
                                onClick={() => setPreviewProduct(null)}
                                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/5 text-black hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center shadow-sm"
                            >
                                <X size={24} />
                            </button>

                            <div className="md:w-1/2 bg-[#F3F4F6] p-12 flex items-center justify-center">
                                <motion.img 
                                    layoutId={`img-${previewProduct.ProductID}`}
                                    src={previewProduct.ProductImageURL} 
                                    alt={previewProduct.ProductName} 
                                    className="w-full h-auto drop-shadow-2xl"
                                />
                            </div>

                            <div className="md:w-1/2 p-12 flex flex-col justify-center gap-6">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">{previewProduct.Brand}</p>
                                    <h2 className="text-4xl font-black tracking-tighter text-black uppercase font-outfit leading-none">{previewProduct.ProductName}</h2>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < Math.floor(previewProduct.Rating) ? "currentColor" : "none"} stroke="currentColor" />
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-black/20">({previewProduct.ReviewCount} REVIEWS)</span>
                                    </div>
                                </div>

                                <p className="text-3xl font-black text-black tracking-tighter font-outfit">${previewProduct.Price}</p>
                                
                                <p className="text-sm text-black/60 leading-relaxed font-medium">
                                    {previewProduct.Description}
                                </p>

                                <div className="space-y-4 pt-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/40">STOCK STATUS: <span className={previewProduct.StockQuantity > 10 ? 'text-green-500' : 'text-orange-500'}>
                                        {previewProduct.StockQuantity > 0 ? `${previewProduct.StockQuantity} IN STOCK` : 'OUT OF STOCK'}
                                    </span></p>
                                    <button 
                                        disabled={previewProduct.StockQuantity === 0}
                                        onClick={() => {
                                            addToCart(previewProduct.ProductID);
                                            setPreviewProduct(null);
                                        }}
                                        className="w-full h-16 bg-black text-white rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-accent transition-all active:scale-95 shadow-xl shadow-black/10"
                                    >
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

const ProductCard = ({ product, index, onPreview, onAddToCart, onWishlist }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group relative bg-white rounded-[40px] p-5 flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50"
    >
        {/* Image Container with 20px radius on actual image area */}
        <div className="relative aspect-square mb-6 bg-[#F3F4F6] rounded-[30px] overflow-hidden">
            {/* Action Buttons Top */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onWishlist();
                    }}
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black/30 hover:text-brand-accent transition-all shadow-sm active:scale-90"
                >
                    <Heart size={18} />
                </button>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onPreview();
                    }}
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black/30 hover:text-black transition-all shadow-sm active:scale-90 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                    <Eye size={18} />
                </button>
            </div>
            
            <motion.img 
                layoutId={`img-${product.ProductID}`}
                src={product.ProductImageURL} 
                alt={product.ProductName} 
                className="w-full h-full object-cover p-4 rounded-[20px] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Overlay Hint */}
            <div onClick={onPreview} className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity flex items-center justify-center">
                <span className="bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-black shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform">Quick View</span>
            </div>
        </div>

        {/* Content Area */}
        <div className="px-2 pb-2 flex-col space-y-4">
            {/* Color Swatches (Static placeholder or logic based on variant) */}
            <div className="flex gap-2 mb-2">
                {['#000000', '#FFFFFF', '#DC2626'].map((color, i) => (
                    <div 
                        key={i} 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)] cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            {/* Name & Price Row */}
            <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                    <h3 className="text-xl font-bold text-black tracking-tight leading-none mb-1 font-outfit line-clamp-1">
                        {product.ProductName}
                    </h3>
                    <p className="text-[13px] text-black/40 font-medium leading-tight line-clamp-1">
                        {product.Description}
                    </p>
                </div>
                <p className="text-xl font-black text-black tracking-tighter leading-none font-outfit whitespace-nowrap">
                    ${product.Price}
                </p>
            </div>

            {/* Add to Cart Button - Refined Modern Pill */}
            <div className="pt-2">
                <button 
                    disabled={product.StockQuantity === 0}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart();
                    }}
                    className={`flex items-center justify-center gap-3 w-full h-11 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all duration-500 shadow-sm active:scale-95 group/btn ${product.StockQuantity > 0 ? 'bg-[#1A1A1A] text-white hover:bg-brand-accent hover:shadow-[0_15px_30px_-5px_rgba(239,68,68,0.3)]' : 'bg-gray-100 text-black/20 cursor-not-allowed'}`}
                >
                    <ShoppingCart size={15} className="transition-transform group-hover/btn:-translate-y-0.5" />
                    <span>{product.StockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
            </div>
        </div>
    </motion.div>
);

export default ProductGrid;
