import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductSize, ProductColor } from '../types';
import { BRAND_CONFIG } from '../config/brand';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  totalPrice: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: ProductSize, color: ProductColor, quantity?: number) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  checkoutViaWhatsApp: (customerNote?: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('monver_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('monver_cart', JSON.stringify(items));
    } catch {
      // storage error fallback
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, size: ProductSize, color: ProductColor, quantity = 1) => {
    const itemKey = `${product.id}_${size}_${color.name}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemKey);

      if (existingIndex > -1) {
        // If same product, same size, same color -> increment quantity
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          subtotal: newQty * existing.unitPrice,
        };
        return updated;
      } else {
        // Different size or color -> separate cart item
        const newItem: CartItem = {
          id: itemKey,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
          unitPrice: product.price,
          subtotal: quantity * product.price,
        };
        return [...prevItems, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            subtotal: newQuantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);

  /**
   * Generates the official WhatsApp ordering message and launches wa.me
   */
  const checkoutViaWhatsApp = (customerNote?: string): boolean => {
    if (items.length === 0) return false;

    const formattedLines: string[] = [];

    items.forEach((item, index) => {
      formattedLines.push(
        `${index + 1}. Product: ${item.product.name}\n` +
        `   Size: ${item.selectedSize}\n` +
        `   Color: ${item.selectedColor.name}\n` +
        `   Quantity: ${item.quantity}\n` +
        `   Unit Price: ${item.unitPrice.toLocaleString()} ${BRAND_CONFIG.currency}\n` +
        `   Subtotal: ${item.subtotal.toLocaleString()} ${BRAND_CONFIG.currency}`
      );
    });

    const orderDetails = formattedLines.join('\n\n');
    const formattedTotal = `${totalPrice.toLocaleString()} ${BRAND_CONFIG.currency}`;

    let message = 
`Hello ${BRAND_CONFIG.name}!

I'd like to place an order.

ORDER DETAILS:

${orderDetails}

-------------------------
TOTAL: ${formattedTotal}
-------------------------`;

    if (customerNote && customerNote.trim()) {
      message += `\n\nDELIVERY ADDRESS / NOTES:\n${customerNote.trim()}`;
    }

    message += `\n\nPlease confirm my order.\n\nThank you!`;

    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = BRAND_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Clear cart and reset counter after successful handoff
    clearCart();
    closeCart();
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        totalItems,
        totalPrice,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        checkoutViaWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
