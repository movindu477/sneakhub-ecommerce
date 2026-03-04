import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedCategories from './components/FeaturedCategories'
import NewArrivals from './components/NewArrivals'
import Benefits from './components/Benefits'
import Reviews from './components/Reviews'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  const [showScroll, setShowScroll] = React.useState(false);

  React.useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false)
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] selection:bg-black selection:text-white relative">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCategories />
        <NewArrivals />
        <Benefits />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />

      {/* Scroll to Top Button - Bottom Left */}
      {showScroll && (
        <button
          onClick={scrollTop}
          className="fixed bottom-8 left-8 z-[100] w-14 h-14 bg-[#EF4444] text-black rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group border-none cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Arrow pointing up */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-y-1 transition-transform"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default App
