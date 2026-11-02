import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';

export const Navbar: React.FC = () => {
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

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Collection', href: '#collection' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-4 shadow-xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex items-center gap-2"
          >
            <span className="font-display text-2xl md:text-3xl tracking-[0.25em] text-white font-bold group-hover:text-monver-accent transition-colors">
              {BRAND_CONFIG.name}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-monver-accent opacity-80" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-monver-accent hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
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
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="font-display text-2xl tracking-[0.2em] text-white/80 hover:text-monver-accent py-2 border-b border-white/5 transition-all"
              >
                {link.label}
              </a>
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
