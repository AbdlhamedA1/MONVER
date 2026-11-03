import React, { useState } from 'react';
import { X, Check, Plus, Ruler, Sparkles } from 'lucide-react';
import { Product, ProductSize, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenSizeGuide,
}) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const initialColor = product.availableColors.find((c) => c.image === product.image) || product.availableColors[0];
  const [selectedColor, setSelectedColor] = useState<ProductColor>(initialColor);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [displayedImage, setDisplayedImage] = useState<string>(product.image);
  const [isAdded, setIsAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.image) {
      setDisplayedImage(color.image);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#0D0D10] border border-white/15 text-white overflow-hidden shadow-2xl animate-scale-in max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/70 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Studio Image */}
        <div className="w-full md:w-1/2 bg-[#F9F9FB] flex items-center justify-center p-8 relative">
          <img
            src={displayedImage}
            alt={product.name}
            className="w-full max-h-[380px] md:max-h-[500px] object-contain transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/90">
            {product.gsm} GSM Organic Cotton
          </div>
        </div>

        {/* Right: Product Details & Options */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-monver-accent font-semibold">
                {product.category}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                {product.fit}
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-normal text-white mb-3">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-xl font-semibold text-white tracking-wide">
                {product.price.toLocaleString()} {BRAND_CONFIG.currency}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-white/40 line-through">
                  {product.originalPrice.toLocaleString()} {BRAND_CONFIG.currency}
                </span>
              )}
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-light mb-6">
              {product.description}
            </p>

            {/* Key Features Bullet List */}
            <div className="space-y-2 mb-6 p-4 bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">
                <Sparkles className="w-3 h-3 text-monver-accent" />
                <span>Craftsmanship Details</span>
              </div>
              {product.features.map((feat, idx) => (
                <div key={idx} className="text-xs text-white/80 font-light flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-monver-accent/60" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Color Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/60 tracking-wider uppercase text-[10px]">Color:</span>
                <span className="text-white font-medium text-[11px]">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.availableColors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(color)}
                      className={`w-7 h-7 rounded-full p-[2px] transition-all ${
                        isSelected ? 'ring-2 ring-offset-2 ring-white ring-offset-[#0D0D10] scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/60 tracking-wider uppercase text-[10px]">
                  Size {sizeError && <span className="text-rose-400 font-semibold normal-case">(Please select a size)</span>}:
                </span>
                <button
                  type="button"
                  onClick={() => onOpenSizeGuide(product)}
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-monver-accent hover:underline"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.availableSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`py-2.5 text-xs tracking-wider uppercase font-medium border transition-all ${
                        isSelected
                          ? 'border-white bg-white text-black font-semibold'
                          : sizeError
                          ? 'border-rose-400/50 text-white hover:border-white'
                          : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Add to Bag CTA */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isAdded
                  ? 'bg-monver-accent text-black font-semibold'
                  : 'bg-white text-black hover:bg-white/90 hover:shadow-xl active:scale-[0.99]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{selectedSize ? 'Add to Bag' : 'Select Size & Add'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
