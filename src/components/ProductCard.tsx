import React, { useState } from 'react';
import { Check, Plus, Eye } from 'lucide-react';
import { Product, ProductSize, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const initialColor =
    product.availableColors.find((c) => c.image === product.image) ||
    product.availableColors[0];

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

  const handleSizeSelect = (size: ProductSize) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    addToCart(product, selectedSize, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <article className="group flex flex-col bg-[#0B0B0D] border border-white/10 hover:border-white/30 transition-all duration-300">
      {/* 
        Compact Studio Image Container 
        Reduced height: aspect-[1/1] (Square) for a balanced, modern fashion proportion
        STRICT: Absolutely zero text or badge overlays on top of the garment photo
      */}
      <div 
        className="relative aspect-square w-full bg-[#F7F7F9] overflow-hidden flex items-center justify-center p-5 cursor-pointer"
        onClick={() => onQuickView && onQuickView(product)}
      >
        <img
          src={displayedImage}
          alt={`${product.name} in ${selectedColor.name}`}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Quick View Overlay button on hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 hover:bg-black text-white text-[10px] uppercase tracking-wider backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3 h-3 text-monver-accent" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Streamlined, Compact Product Info */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        {/* Title & Pricing */}
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
            <span>{product.category}</span>
            <span className="text-white/60 font-mono">{product.gsm} GSM</span>
          </div>
          
          <h3 
            onClick={() => onQuickView && onQuickView(product)}
            className="font-serif text-sm sm:text-base font-normal text-white hover:text-monver-accent transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm font-semibold text-white tracking-wide">
              {product.price.toLocaleString()} {BRAND_CONFIG.currency}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-white/40 line-through">
                {product.originalPrice.toLocaleString()} {BRAND_CONFIG.currency}
              </span>
            )}
          </div>
        </div>

        {/* Compact Color & Size Selection */}
        <div className="space-y-2 pt-1 border-t border-white/5">
          {/* Colors inline */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/50">
              Color: <strong className="text-white/90 font-normal">{selectedColor.name}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              {product.availableColors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                    className={`w-4 h-4 rounded-full p-[1px] transition-all ${
                      isSelected
                        ? 'ring-1 ring-offset-1 ring-white ring-offset-[#0B0B0D] scale-110'
                        : 'opacity-70 hover:opacity-100'
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

          {/* Sizes compact row */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider text-white/50">
                Size {sizeError && <span className="text-rose-400 font-semibold normal-case">*(Select)</span>}:
              </span>
              {selectedSize && (
                <span className="text-[10px] font-bold text-monver-accent">{selectedSize}</span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-1">
              {product.availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeSelect(size)}
                    className={`py-1 text-[10px] tracking-wider uppercase font-medium border transition-all ${
                      isSelected
                        ? 'border-white bg-white text-black font-bold'
                        : sizeError
                        ? 'border-rose-400/50 text-white hover:border-white'
                        : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compact Add to Bag Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-2.5 px-3 text-[11px] uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
              isAdded
                ? 'bg-monver-accent text-black font-semibold'
                : 'bg-white text-black hover:bg-white/90 active:scale-[0.99]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{selectedSize ? 'Add to Bag' : 'Select Size'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
