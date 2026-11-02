import React from 'react';
import { MessageCircle, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

// Custom TikTok icon for precision
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.49V8.58a8.28 8.28 0 0 0 4.84 1.55v-3.44h-.93z"/>
  </svg>
);

export const Contact: React.FC = () => {
  const contactChannels = [
    {
      name: 'WhatsApp',
      badge: 'Fastest Reply',
      isLive: true,
      detail: BRAND_CONFIG.contact.whatsappDisplay,
      href: `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`,
      icon: MessageCircle,
      accentColor: '#25D366',
      actionLabel: 'Chat on WhatsApp',
      description: 'Instant sizing advice, custom queries & direct ordering.',
    },
    {
      name: 'Instagram',
      badge: 'Official Page',
      isLive: false,
      detail: BRAND_CONFIG.contact.instagramHandle,
      href: BRAND_CONFIG.contact.instagramUrl,
      icon: Instagram,
      accentColor: '#E1306C',
      actionLabel: 'Follow on Instagram',
      description: 'Exclusive collection drops, aesthetic fits & daily stories.',
    },
    {
      name: 'TikTok',
      badge: 'Video & Looks',
      isLive: false,
      detail: BRAND_CONFIG.contact.tiktokHandle,
      href: BRAND_CONFIG.contact.tiktokUrl,
      icon: TikTokIcon,
      accentColor: '#87CEEB',
      actionLabel: 'Watch on TikTok',
      description: 'Fabric previews, styling guides & behind the scenes.',
    },
    {
      name: 'Facebook',
      badge: 'Community',
      isLive: false,
      detail: BRAND_CONFIG.contact.facebookName,
      href: BRAND_CONFIG.contact.facebookUrl,
      icon: Facebook,
      accentColor: '#1877F2',
      actionLabel: 'Connect on Facebook',
      description: 'Brand news, releases & community announcements.',
    },
  ];

  return (
    <section id="contact" className="py-28 md:py-36 bg-black text-white relative border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-monver-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="text-[11px] uppercase tracking-[0.3em] text-monver-accent font-semibold block mb-3">
            Inquiries & Orders
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.15em] text-white uppercase mb-4">
            Let's Stay Connected
          </h2>
          <p className="text-white/60 text-base font-light tracking-wide max-w-lg mx-auto">
            Have a question or looking to order? Reach out directly through any of our official channels.
          </p>
        </div>

        {/* Contact Grid - 4 Perfectly Balanced Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141418] to-[#0A0A0C] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]"
              >
                {/* Subtle hover glow accent */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: channel.accentColor }}
                />

                <div>
                  {/* Top bar with icon, badge and arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl border border-white/15 bg-white/[0.03] flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>

                    <div className="flex items-center gap-2">
                      {channel.isLive ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                          {channel.badge}
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-white/[0.04] text-white/60 border border-white/10">
                          {channel.badge}
                        </span>
                      )}

                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/[0.06] transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Channel Name */}
                  <h3 className="font-display text-lg tracking-wider text-white uppercase font-semibold mb-1">
                    {channel.name}
                  </h3>

                  {/* Channel Detail (Handle / Phone) */}
                  <p className="text-white/60 text-xs font-mono tracking-wide mb-2.5">
                    {channel.detail}
                  </p>

                  {/* Description */}
                  <p className="text-white/45 text-xs font-light leading-relaxed mb-6">
                    {channel.description}
                  </p>
                </div>

                {/* Bottom CTA Action Bar */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-white/70 group-hover:text-monver-accent transition-colors">
                  <span>{channel.actionLabel}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className="mt-14 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0E0E12] via-[#131318] to-[#0E0E12] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-full bg-[#25D366]/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#25D366] font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              Direct Client Concierge
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white uppercase tracking-wider mb-2">
              Order Assistance & Sizing Advice
            </h3>
            <p className="text-sm text-white/60 font-light max-w-xl">
              Our team is readily available on WhatsApp to assist you with real-time sizing recommendations, fabric details, custom requests, and instant delivery updates.
            </p>
          </div>

          <a
            href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex-shrink-0 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-300 shadow-[0_4px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.45)] hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
