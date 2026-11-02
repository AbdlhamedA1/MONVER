import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductCategory, Product } from '../types';

export const Collection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideProduct, setSizeGuideProduct] = useState<Product | null>(null);

  const categories: ProductCategory[] = ['All', 'Hoodies', 'Crewnecks'];

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="collection" className="py-24 md:py-32 bg-[#070709] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-monver-accent font-semibold block mb-2.5">
            Wardrobe Foundations
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.2em] text-white uppercase mb-3">
            The Collection
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light tracking-wide">
            Carefully selected pieces. Timeless style. Everyday confidence.
          </p>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                  isActive
                    ? 'border-b-2 border-monver-accent text-white font-semibold'
                    : 'text-white/40 hover:text-white border-b-2 border-transparent'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Compact, Balanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
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
    </section>
  );
};
