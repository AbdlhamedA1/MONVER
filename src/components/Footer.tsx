import React from 'react';
import { BRAND_CONFIG } from '../config/brand';

interface FooterProps {
  onNavigate?: (route: 'home' | 'hoodies' | 'crewnecks') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (e: React.MouseEvent, route?: 'home' | 'hoodies' | 'crewnecks', anchor?: string) => {
    e.preventDefault();
    if (route && onNavigate) {
      onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (anchor) {
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('home');
        setTimeout(() => {
          document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <button
              onClick={(e) => handleNav(e, 'home')}
              className="group flex items-center text-left py-1"
              aria-label={`${BRAND_CONFIG.name} Home`}
            >
              <img
                src={BRAND_CONFIG.logoImage}
                alt={BRAND_CONFIG.name}
                className="h-7 sm:h-8 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </button>
            <p className="text-xs uppercase tracking-[0.3em] text-monver-accent font-medium">
              {BRAND_CONFIG.tagline}
            </p>
            <p className="text-white/50 text-sm max-w-sm font-light leading-relaxed">
              Quiet luxury essentials created with meticulous craftsmanship and timeless design.
              Engineered for comfort, confidence, and longevity.
            </p>
          </div>

          {/* Quick Links (No About Us, includes Categories) */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={(e) => handleNav(e, 'home')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'hoodies')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider text-left"
                >
                  Hoodies (599 EGP)
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, 'crewnecks')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider text-left"
                >
                  Crewnecks (549 EGP)
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav(e, undefined, '#contact')}
                  className="text-white/60 hover:text-white transition-colors tracking-wider text-left"
                >
                  Contact & Orders
                </button>
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
