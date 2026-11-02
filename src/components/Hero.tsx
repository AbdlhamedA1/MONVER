import React from 'react';
import { ChevronDown } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const Hero: React.FC = () => {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('about') || document.getElementById('collection');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      onClick={handleScrollDown}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-black overflow-hidden cursor-pointer select-none group"
    >
      {/* 
        Official MONVER Hero Branding Image Only
        Full viewport presence, pristine proportions, crisp architectural typography, zero text clutter
      */}
      <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12 lg:p-20">
        <img
          src={BRAND_CONFIG.heroImage}
          alt="MONVER"
          className="w-full h-full max-w-6xl object-contain object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          loading="eager"
        />
      </div>

      {/* Minimal luxury scroll indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 group-hover:text-white transition-colors duration-300">
        <span className="text-[9px] uppercase tracking-[0.35em] font-light">Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce stroke-[1.5]" />
      </div>
    </section>
  );
};
