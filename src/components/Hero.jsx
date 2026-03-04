import React, { useState, useEffect } from 'react';
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';

const Hero = () => {
    const images = [hero1, hero2, hero3];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative min-h-screen flex items-center bg-[#F2F2F2] overflow-hidden pt-20 md:pt-0">
            {/* Background Large Text ("AIR") - Static */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center -z-0 select-none pointer-events-none opacity-5">
                <h1 className="text-[25vw] font-extrabold leading-none tracking-[-0.05em] text-black rotate-[-5deg] whitespace-nowrap uppercase font-heading">
                    AIR
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-12 py-12 md:py-20">

                {/* Image Slideshow (Orders first on mobile) */}
                <div className="order-1 md:order-2 flex-1 w-full max-w-[320px] md:max-w-[420px] self-center">
                    <div className="relative group">
                        {/* Box decoration behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-white/40 blur-3xl -z-1" />

                        <div className="overflow-hidden bg-[#E8E8E8] shadow-[0_45px_100px_-25px_rgba(0,0,0,0.25)] rounded-[20px] h-[380px] md:h-[540px] relative group-hover:scale-[1.01] transition-transform duration-700">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Exclusive Sneaker ${index + 1}`}
                                        className="w-full h-full object-cover transform scale-100 transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Text Content (Orders second on mobile) */}
                <div className="order-2 md:order-1 flex-1 text-center md:text-left mt-4 md:mt-0">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-black/40 mb-4 md:mb-6 font-inter underline decoration-brand-accent decoration-2 underline-offset-8">
                        PREMIUM FOOTWEAR
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] mb-6 md:mb-8 font-heading uppercase text-brand-primary">
                        WELCOME TO<br />
                        <span className="text-brand-accent">AIRSTREET</span>
                    </h1>

                    <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-lg mx-auto md:mx-0 mb-8 md:mb-12 font-inter px-4 md:px-0">
                        Discover the latest sneakers, trending styles, and exclusive drops from top brands at AIRSTREET the ultimate destination for sneaker lovers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start px-6 md:px-0">
                        <button className="px-8 md:px-10 py-4 md:py-5 bg-black text-white font-bold tracking-[0.2em] rounded-none hover:bg-brand-accent transition-all transform hover:-translate-y-1 active:scale-95 shadow-[0_15px_30px_rgba(0,0,0,0.1)] uppercase text-[13px] md:text-base">
                            BUY NOW
                        </button>
                        <button className="px-8 md:px-10 py-4 md:py-5 bg-transparent border-[1.5px] border-black/10 text-black font-bold tracking-[0.2em] rounded-none hover:border-black transition-all transform hover:-translate-y-1 active:scale-95 uppercase text-[13px] md:text-base">
                            VIEW LOOKBOOK
                        </button>
                    </div>

                </div>
            </div>

            {/* Pagination indicators / dots */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-6 md:w-8 h-2 md:h-2.5 bg-brand-accent shadow-lg' : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-black/20 hover:bg-black/40'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
