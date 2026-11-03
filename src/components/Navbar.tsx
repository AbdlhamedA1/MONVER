import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';

interface NavbarProps {
  currentRoute?: 'home' | 'hoodies' | 'crewnecks';
  onNavigate?: (route: 'home' | 'hoodies' | 'crewnecks') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute = 'home', onNavigate }) => {
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: 'home' as const, type: 'route' as const },
    { label: 'Hoodies', route: 'hoodies' as const, type: 'route' as const },
    { label: 'Crewnecks', route: 'crewnecks' as const, type: 'route' as const },
    { label: 'Contact', href: '#contact', type: 'anchor' as const },
  ];

  const handleNavClick = (
    e: React.MouseEvent,
    item: { label: string; route?: 'home' | 'hoodies' | 'crewnecks'; href?: string; type: 'route' | 'anchor' }
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.type === 'route' && item.route && onNavigate) {
      onNavigate(item.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.type === 'anchor') {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('home');
        setTimeout(() => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo Image */}
          <button
            onClick={(e) => handleNavClick(e, { label: 'Home', route: 'home', type: 'route' })}
            className="group flex items-center text-left py-1"
            aria-label={`${BRAND_CONFIG.name} Home`}
          >
            <img
              src={BRAND_CONFIG.logoImage}
              alt={BRAND_CONFIG.name}
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const isActive = item.type === 'route' && currentRoute === item.route;
              return (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-monver-accent after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-white after:w-full font-semibold'
                      : 'text-white/70 hover:text-white after:w-0 hover:after:w-full'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Shopping Bag & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              aria-label="Shopping Bag"
              className="relative p-2.5 text-white/90 hover:text-white transition-colors group rounded-full hover:bg-white/5 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6] group-hover:text-monver-accent transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black font-semibold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-scale-in shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2.5 text-white/90 hover:text-white rounded-full hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl md:hidden flex flex-col pt-28 px-8 border-b border-white/10 animate-fade-in">
          <div className="flex flex-col space-y-8 mt-6">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={(e) => handleNavClick(e, item)}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="text-left font-display text-2xl tracking-[0.2em] text-white/80 hover:text-monver-accent py-2 border-b border-white/5 transition-all"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-8">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full py-4 border border-white/20 text-xs uppercase tracking-[0.25em] font-medium flex items-center justify-center gap-3 text-white hover:bg-white hover:text-black transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Bag ({totalItems})</span>
              </button>
            </div>
          </div>

          <div className="mt-auto pb-10 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/40">
              {BRAND_CONFIG.tagline}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
