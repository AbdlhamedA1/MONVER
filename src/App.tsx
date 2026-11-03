import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBoxes } from './components/CategoryBoxes';
import { CategoryView } from './components/CategoryView';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

export type AppRoute = 'home' | 'hoodies' | 'crewnecks';

export const App: React.FC = () => {
  const getRouteFromHash = (): AppRoute => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('hoodie')) {
      return 'hoodies';
    }
    if (hash.includes('crewneck') || hash.includes('crocin') || hash.includes('cronic') || hash.includes('cronin')) {
      return 'crewnecks';
    }
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: AppRoute) => {
    setCurrentRoute(route);
    if (route === 'home') {
      if (window.location.hash && !window.location.hash.startsWith('#contact')) {
        window.history.pushState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = `/${route}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white selection:bg-monver-accent selection:text-black flex flex-col">
        {/* Navigation Bar */}
        <Navbar currentRoute={currentRoute} onNavigate={navigate} />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          {currentRoute === 'home' && (
            <>
              {/* 1. Hero Section */}
              <Hero />

              {/* 2. Category Boxes (Hoodies & Crewnecks / Crocin) */}
              <CategoryBoxes onSelectCategory={(cat) => navigate(cat)} />

              {/* 3. Contact Us Section */}
              <Contact />
            </>
          )}

          {currentRoute === 'hoodies' && (
            <>
              {/* Dedicated Hoodies Category Page */}
              <CategoryView category="Hoodies" onBack={() => navigate('home')} />

              {/* Contact Us Section */}
              <Contact />
            </>
          )}

          {currentRoute === 'crewnecks' && (
            <>
              {/* Dedicated Crewnecks (Crocin) Category Page */}
              <CategoryView category="Crewnecks" onBack={() => navigate('home')} />

              {/* Contact Us Section */}
              <Contact />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={navigate} />

        {/* Slide-over Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default App;
