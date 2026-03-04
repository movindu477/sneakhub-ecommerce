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
  return (
    <div className="min-h-screen bg-[#F2F2F2] selection:bg-black selection:text-white">
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
    </div>
  )
}

export default App
