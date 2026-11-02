import React from 'react';
import { Sparkles, Feather, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Feather,
      title: "Quiet Luxury",
      description: "Understated silhouettes made with heavyweight textiles that speak through texture, drape, and precision.",
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Quality",
      description: "Every seam and rib is engineered for longevity. Premium combed cotton designed to withstand years of everyday wear.",
    },
    {
      icon: Sparkles,
      title: "Pure Simplicity",
      description: "Free from loud graphics or fleeting fads. True modern elegance is found in the confidence of timeless design.",
    },
  ];

  return (
    <section id="about" className="py-28 md:py-36 bg-black text-white relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] uppercase tracking-[0.3em] text-monver-accent font-semibold block mb-4">
            Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight mb-8">
            More Than Fashion. <br className="hidden sm:inline" />
            <span className="italic font-light text-white/90">A Way of Life.</span>
          </h2>
          <div className="w-12 h-[1px] bg-white/30 mx-auto mb-8" />
          <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light tracking-wide text-balance">
            Born from an obsession with timeless aesthetics and quiet confidence, {BRAND_CONFIG.name} creates 
            wardrobe foundations for those who value quality over noise. We believe true luxury isn't about 
            loud logos — it is the quiet feeling of wearing an impeccably constructed garment.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 pt-12 border-t border-white/10">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-none border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-6 text-white group-hover:text-monver-accent group-hover:border-monver-accent transition-colors">
                  <Icon className="w-4 h-4 stroke-[1.7]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-white mb-3 tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Brand Quote Banner */}
        <div className="mt-20 p-8 md:p-12 border border-white/10 bg-gradient-to-r from-black via-white/[0.03] to-black text-center">
          <p className="font-serif italic text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            "Quality over quantity. Timeless style over fast trends. Simplicity as the ultimate sophistication."
          </p>
          <span className="block mt-4 text-[10px] uppercase tracking-[0.3em] text-monver-accent">
            — The MONVER Standard
          </span>
        </div>
      </div>
    </section>
  );
};
