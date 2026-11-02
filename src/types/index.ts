export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string; // Specific variant photo
}

export type ProductCategory = 'All' | 'Hoodies' | 'Crewnecks';

export interface SizeMeasurement {
  size: ProductSize;
  chest: number; // in cm
  length: number; // in cm
  shoulder: number; // in cm
}

export interface Product {
  id: string;
  name: string;
  category: 'Hoodies' | 'Crewnecks';
  image: string;
  originalPrice?: number;
  price: number;
  gsm: number;
  availableSizes: ProductSize[];
  availableColors: ProductColor[];
  description: string;
  fabric: string;
  fit: string;
  features: string[];
  measurements: SizeMeasurement[];
}

export interface CartItem {
  id: string; // composite key: `${productId}_${size}_${colorName}`
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
