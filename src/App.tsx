import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Collection } from './components/Collection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white selection:bg-monver-accent selection:text-black">
        {/* Navigation Bar */}
        <Navbar />

        {/* 1. Hero Section */}
        <main>
          <Hero />

          {/* 2. About Us Section */}
          <About />

          {/* 3. Our Collection Section */}
          <Collection />

          {/* 4. Contact Us Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-over Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default App;
