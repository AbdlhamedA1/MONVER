import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { SizeGuideModal } from './SizeGuideModal';
import { Product } from '../types';
import { BRAND_CONFIG } from '../config/brand';

interface CategoryViewProps {
  category: 'Hoodies' | 'Crewnecks';
  onBack: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onBack }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideProduct, setSizeGuideProduct] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => p.category === category);

  const isHoodie = category === 'Hoodies';
  const price = isHoodie ? 599 : 549;
  const originalPrice = isHoodie ? 750 : 700;
  const gsm = isHoodie ? 480 : 420;
  const fabric = isHoodie
    ? '100% Combed Heavy Cotton Fleece (480 GSM)'
    : '100% Premium Terry Cotton (420 GSM)';
  const fit = isHoodie
    ? 'Relaxed Architectural Boxy Fit'
    : 'Modern Classic Tailored Fit';

  return (
    <div className="pt-24 md:pt-28 pb-20 bg-[#070709] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb & Back button */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-monver-accent" />
            <span>Back to Home</span>
          </button>

          <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            <span>MONVER</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white font-medium">{category}</span>
            {!isHoodie && <span className="ml-2 text-monver-accent">(Cronic)</span>}
          </div>
        </div>

        {/* Category Header Banner */}
        <div className="p-8 md:p-12 mb-12 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-monver-accent font-semibold px-2.5 py-1 bg-white/5 border border-white/10">
                {gsm} GSM Premium Cotton
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                {fit}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.15em] text-white uppercase mb-4">
              MONVER {category}
            </h1>

            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mb-6">
              {fabric}. Designed with meticulous attention to silhouette, weight, and everyday luxury.
            </p>

            {/* Pricing & Size Summary */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-white font-mono tracking-tight">
                  {price.toLocaleString()} {BRAND_CONFIG.currency}
                </span>
                <span className="text-sm text-white/40 line-through font-mono">
                  {originalPrice.toLocaleString()} {BRAND_CONFIG.currency}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-monver-accent ml-2 font-medium">
                  Save {(originalPrice - price).toLocaleString()} {BRAND_CONFIG.currency}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-white/50">Sizes Available:</span>
                {['M', 'L', 'XL', 'XXL'].map((sz) => (
                  <span
                    key={sz}
                    className="text-[11px] font-mono font-semibold px-2 py-0.5 bg-white text-black"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Brand Commitments */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-5 bg-white/[0.01] border border-white/5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white font-medium mb-1">
              Heavyweight Cotton
            </h4>
            <p className="text-xs text-white/50 font-light">Custom {gsm} GSM fleece & terry</p>
          </div>
          <div className="p-5 bg-white/[0.01] border border-white/5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white font-medium mb-1">
              WhatsApp Ordering
            </h4>
            <p className="text-xs text-white/50 font-light">Instant concierge confirmation</p>
          </div>
          <div className="p-5 bg-white/[0.01] border border-white/5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white font-medium mb-1">
              Nationwide Delivery
            </h4>
            <p className="text-xs text-white/50 font-light">Doorstep delivery across Egypt</p>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={(p) => setSizeGuideProduct(p)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={Boolean(sizeGuideProduct)}
        onClose={() => setSizeGuideProduct(null)}
        product={sizeGuideProduct || undefined}
      />
    </div>
  );
};
