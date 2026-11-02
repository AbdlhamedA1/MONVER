import React from 'react';
import { BRAND_CONFIG } from '../config/brand';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl tracking-[0.25em] font-bold text-white">
                {BRAND_CONFIG.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-monver-accent" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-monver-accent font-medium">
              {BRAND_CONFIG.tagline}
            </p>
            <p className="text-white/50 text-sm max-w-sm font-light leading-relaxed">
              Quiet luxury essentials created with meticulous craftsmanship and timeless design.
              Engineered for comfort, confidence, and longevity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => handleScrollTo(e, '#hero')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo(e, '#about')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleScrollTo(e, '#collection')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  Our Collection
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  Contact & Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-medium">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  WhatsApp ({BRAND_CONFIG.contact.whatsappDisplay})
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  Instagram ({BRAND_CONFIG.contact.instagramHandle})
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.contact.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  TikTok ({BRAND_CONFIG.contact.tiktokHandle})
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  Facebook ({BRAND_CONFIG.contact.facebookName})
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 tracking-wider">
          <p>© {currentYear} {BRAND_CONFIG.name}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-light">
            Designed for Quiet Luxury.
          </p>
        </div>
      </div>
    </footer>
  );
};
