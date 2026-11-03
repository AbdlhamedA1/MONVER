import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

interface CategoryBoxesProps {
  onSelectCategory: (category: 'hoodies' | 'crewnecks') => void;
}

export const CategoryBoxes: React.FC<CategoryBoxesProps> = ({ onSelectCategory }) => {
  const base = import.meta.env.BASE_URL;

  const categories = [
    {
      id: 'hoodies' as const,
      title: 'HOODIES',
      subtitle: '480 GSM Heavyweight Fleece',
      description: 'Double-layered seamless hood with relaxed architectural drop shoulders.',
      image: `${base}images/hude one.jpeg`,
      originalPrice: 750,
      price: 599,
      sizes: ['M', 'L', 'XL', 'XXL'],
      badge: 'Bestseller',
    },
    {
      id: 'crewnecks' as const,
      title: 'CREWNECKS',
      subtitle: '420 GSM French Terry',
     
      description: 'Precision ribbed collar with effortless drape and shape retention.',
      image: `${base}images/cronic one.jpg`,
      originalPrice: 700,
      price: 549,
      sizes: ['M', 'L', 'XL', 'XXL'],
      badge: 'Signature',
    },
  ];

  return (
    <section id="categories" className="py-20 md:py-28 bg-[#070709] text-white border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <span className="text-[10px] uppercase tracking-[0.3em] text-monver-accent font-semibold block mb-2.5">
            Wardrobe Foundations
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.2em] text-white uppercase mb-3">
            Select Collection
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light tracking-wide">
            Choose your silhouette. Crafted with heavy combed cotton and timeless tailoring.
          </p>
        </div>

        {/* 2 Category Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer bg-black flex flex-col justify-between shadow-2xl"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(cat.id);
                }
              }}
            >
              {/* Background Image with Zoom on Hover */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Multi-layered luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 group-hover:via-black/40 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Top Meta Bar */}
              <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 font-medium">
                  {cat.subtitle}
                </span>

                {cat.sublabel && (
                  <span className="text-[10px] uppercase tracking-[0.25em] text-monver-accent bg-black/60 backdrop-blur-md px-3 py-1.5 border border-monver-accent/30 font-medium">
                    {cat.sublabel}
                  </span>
                )}
              </div>

              {/* Bottom Content & CTA */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.15em] text-white uppercase group-hover:text-monver-accent transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm font-light mt-2 line-clamp-2 max-w-md">
                    {cat.description}
                  </p>
                </div>

                {/* Price and Sizes row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/15">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-lg sm:text-xl font-semibold text-white tracking-wide font-mono">
                      {cat.price.toLocaleString()} {BRAND_CONFIG.currency}
                    </span>
                    <span className="text-xs text-white/40 line-through font-mono">
                      {cat.originalPrice.toLocaleString()} {BRAND_CONFIG.currency}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 mr-1">Sizes:</span>
                    {cat.sizes.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono font-medium px-1.5 py-0.5 bg-white/10 border border-white/10 text-white/90"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <div className="w-full py-3.5 px-5 bg-white text-black group-hover:bg-monver-accent font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg">
                    <span>Explore {cat.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet luxury brand commitments */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white/[0.01] border border-white/5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white font-medium mb-1">
              Heavyweight Cotton
            </h4>
            <p className="text-xs text-white/50 font-light">Custom 420–480 GSM fleece & terry</p>
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white font-medium mb-1">
              WhatsApp Ordering
            </h4>
            <p className="text-xs text-white/50 font-light">Personal confirmation & instant support</p>
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white font-medium mb-1">
              Nationwide Delivery
            </h4>
            <p className="text-xs text-white/50 font-light">Doorstep delivery across Egypt</p>
          </div>
        </div>
      </div>
    </section>
  );
};
