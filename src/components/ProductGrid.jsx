import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Star, ShoppingCart, Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductGrid = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(() => {
        const savedPage = sessionStorage.getItem('sneakhub_shop_page');
        return { currentPage: savedPage ? parseInt(savedPage) : 1, totalPages: 1 };
    });
    const [filters, setFilters] = useState(() => {
        const savedFilters = sessionStorage.getItem('sneakhub_shop_filters');
        return savedFilters ? JSON.parse(savedFilters) : {
            search: '',
            brand: '',
            category: '',
            sort: 'newest',
            minPrice: 0,
            maxPrice: 1000
        };
    });
    const [showFilters, setShowFilters] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: pagination.currentPage,
                limit: 12,
                search: filters.search,
                brand: filters.brand,
                category: filters.category,
                sort: filters.sort,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice
            });

            const response = await fetch(`http://localhost:5000/api/products?${queryParams}`);
            const data = await response.json();
            
            const formattedProducts = data.products.map(p => {
                if (p.ProductImageURL && !p.ProductImageURL.startsWith('http')) {
                    const filename = p.ProductImageURL.split('/').pop().split('\\').pop();
                    p.ProductImageURL = `http://localhost:5000/assets/images/${filename}`;
                }
                return p;
            });
            
            setProducts(formattedProducts);
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

    // Handle hash scrolling after products are loaded
    useEffect(() => {
        if (!loading && products.length > 0 && window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Highlight the card temporarily
                    element.classList.add('ring-4', 'ring-brand-accent');
                    setTimeout(() => element.classList.remove('ring-4', 'ring-brand-accent'), 1500);
                }
            };
            // Run scroll and completely strip the hash from URL to prevent infinite scrolling jumps on search/filter edits
            setTimeout(() => {
                scrollToElement();
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 150);
        }
    }, [loading, products]);

    // Sync pagination and filters to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('sneakhub_shop_page', pagination.currentPage.toString());
    }, [pagination.currentPage]);

    useEffect(() => {
        sessionStorage.setItem('sneakhub_shop_filters', JSON.stringify(filters));
    }, [filters]);

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

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
        const gridElement = document.getElementById('product-grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="product-grid" className="bg-white py-12 md:py-24 px-6 md:px-12 min-h-screen">
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
                                    onNavigate={() => navigate(`/product/${product.ProductID}`)}
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
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    className="p-4 rounded-full bg-[#F3F4F6] text-black disabled:opacity-20 hover:bg-black hover:text-white transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex items-center gap-2">
                                    {[...Array(pagination.totalPages)].map((_, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-12 h-12 rounded-full font-black text-sm transition-all ${pagination.currentPage === i + 1 ? 'bg-black text-white' : 'bg-[#F3F4F6] text-black hover:bg-black/5'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    className="p-4 rounded-full bg-[#F3F4F6] text-black disabled:opacity-20 hover:bg-black hover:text-white transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

const ProductCard = ({ product, index, onNavigate, onAddToCart, onWishlist }) => (
    <motion.div
        id={`product-${product.ProductID}`}
        onClick={onNavigate}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative bg-white rounded-[30px] p-6 flex flex-col cursor-pointer border-2 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[10px_10px_0px_0px_#EB0C46] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
    >
        {/* Header: Title and Wishlist */}
        <div className="flex justify-between items-start z-10">
            <div>
                <h3 className="text-[16px] md:text-[17px] font-bold text-black tracking-tight leading-tight mb-1 pr-4">
                    {product.ProductName}
                </h3>
                <p className="text-[10px] font-black text-black/40 uppercase tracking-widest">
                    1 COLOR
                </p>
            </div>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onWishlist();
                }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black/40 hover:text-brand-accent transition-all shadow-[0_2px_10px_rgba(0,0,0,0.05)] active:scale-90 flex-shrink-0"
            >
                <Heart size={14} />
            </button>
        </div>

        {/* Sneaker Image */}
        <div className="relative flex-1 flex items-center justify-center mt-8 mb-8 min-h-[160px]">
            <motion.img 
                layoutId={`img-${product.ProductID}`}
                src={product.ProductImageURL} 
                alt={product.ProductName} 
                className="w-full h-full object-cover sm:object-contain scale-110 transition-transform duration-700 ease-out group-hover:scale-125 group-hover:-translate-y-2 drop-shadow-xl mix-blend-multiply"
            />
        </div>

        {/* Footer: Price, Rating, and Add to Cart */}
        <div className="flex items-center justify-between mt-auto z-10">
            <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[15px] md:text-[17px] font-bold text-black tracking-tighter">${product.Price}</span>
                <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-black/40">
                    <Star size={12} className="text-orange-500 fill-orange-500" />
                    <span className="text-black/70 font-black">{(product.Rating || 4.3).toFixed(1)}</span>
                    <span className="font-medium tracking-tighter">({product.ReviewCount || 123})</span>
                </div>
            </div>

            <button 
                disabled={product.StockQuantity === 0}
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart();
                }}
                className={`px-3 md:px-4 py-2 rounded-full font-bold text-[10px] md:text-[11px] border border-black/10 transition-all active:scale-95 whitespace-nowrap ${product.StockQuantity > 0 ? 'bg-white text-black hover:border-black/30 shadow-sm' : 'bg-transparent text-black/20 cursor-not-allowed border-transparent'}`}
            >
                {product.StockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    </motion.div>
);

export default ProductGrid;
