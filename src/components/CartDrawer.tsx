import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    totalItems,
    totalPrice,
    closeCart,
    updateQuantity,
    removeItem,
    checkoutViaWhatsApp,
  } = useCart();

  const [customerNote, setCustomerNote] = useState('');

  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 1000;
  const progressPercent = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    checkoutViaWhatsApp(customerNote);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0C0C0E] border-l border-white/10 text-white flex flex-col shadow-2xl animate-slide-left">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-monver-accent stroke-[1.8]" />
              <h2 className="font-display text-base tracking-[0.2em] uppercase font-semibold text-white">
                Shopping Bag
              </h2>
              <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full text-white/80 font-mono">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close Bag"
              className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          {items.length > 0 && (
            <div className="px-6 py-3.5 bg-white/[0.02] border-b border-white/5 text-xs">
              <div className="flex items-center gap-2 mb-1.5 text-[11px]">
                <Truck className="w-3.5 h-3.5 text-monver-accent" />
                {remainingForFreeShipping > 0 ? (
                  <span className="text-white/70">
                    Add <strong className="text-white">{remainingForFreeShipping.toLocaleString()} {BRAND_CONFIG.currency}</strong> for <span className="text-monver-accent font-medium">Free Delivery</span>
                  </span>
                ) : (
                  <span className="text-monver-accent font-medium">
                    You've unlocked Free Nationwide Delivery!
                  </span>
                )}
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-monver-accent transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center mb-5 text-white/30">
                  <ShoppingBag className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2 font-normal">
                  Your bag is empty
                </h3>
                <p className="text-xs text-white/50 max-w-xs mb-6 font-light">
                  Explore our curated collection of quiet luxury essentials.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 border border-white text-[11px] uppercase tracking-[0.2em] font-medium text-white hover:bg-white hover:text-black transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 border border-white/10 bg-white/[0.02] relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 bg-[#F7F7F9] flex-shrink-0 flex items-center justify-center p-1.5 border border-white/5">
                    <img
                      src={item.selectedColor.image || item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-xs sm:text-sm font-medium text-white leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="text-white/40 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-white/60">
                        <span>
                          Size: <strong className="text-white font-medium">{item.selectedSize}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-white/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-white/80">{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls and price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-white">
                          {item.subtotal.toLocaleString()} {BRAND_CONFIG.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Delivery Note Input & WhatsApp Checkout */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-black/60 space-y-4">
              {/* Optional Note for Courier */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1">
                  Delivery Address / Special Notes (Optional):
                </label>
                <input
                  type="text"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="e.g. Area, street name, or preferred time..."
                  className="w-full py-2 px-3 bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-monver-accent transition-colors"
                />
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">
                    {totalPrice.toLocaleString()} {BRAND_CONFIG.currency}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Shipping</span>
                  <span className="text-monver-accent">
                    {remainingForFreeShipping === 0 ? 'Complimentary (Free)' : 'Standard Courier'}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-semibold text-white pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base sm:text-lg text-white">
                    {totalPrice.toLocaleString()} {BRAND_CONFIG.currency}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl active:scale-[0.99]"
              >
                <span>Checkout via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-white/40 tracking-wider">
                Direct WhatsApp handoff • Instant courier confirmation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
