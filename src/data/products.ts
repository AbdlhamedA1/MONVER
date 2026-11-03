import { Product } from '../types';

const base = import.meta.env.BASE_URL;

const STANDARD_MEASUREMENTS = [
  { size: 'M' as const, chest: 59, length: 71, shoulder: 54 },
  { size: 'L' as const, chest: 62, length: 74, shoulder: 56 },
  { size: 'XL' as const, chest: 65, length: 76, shoulder: 58 },
  { size: 'XXL' as const, chest: 68, length: 78, shoulder: 60 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'monver-hoodie-grey',
    name: 'MONVER Heavyweight Boxy Hoodie',
    category: 'Hoodies',
    image: `${base}images/hude one.jpg`,
    originalPrice: 750,
    price: 599,
    gsm: 480,
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Heather Grey', hex: '#A6A6A6', image: `${base}images/hude one.jpg` },
      { name: 'Pitch Black', hex: '#0A0A0A', image: `${base}images/img4.jpg` },
    ],
    description: 'Constructed from 480 GSM organic ultra-soft combed fleece. Tailored with a double-layered structured hood and clean drop shoulders.',
    fabric: '100% Combed Heavy Cotton (480 GSM)',
    fit: 'Relaxed Architectural Boxy Fit',
    features: [
      'Pre-shrunk 480 GSM combed cotton',
      'Double-layered seamless hood',
      'Micro-embroidered tonal MONVER insignia',
      'Reinforced drop shoulder seams'
    ],
    measurements: STANDARD_MEASUREMENTS,
  },
  {
    id: 'monver-hoodie-black',
    name: 'MONVER Heavyweight Boxy Hoodie',
    category: 'Hoodies',
    image: `${base}images/img4.jpg`,
    originalPrice: 750,
    price: 599,
    gsm: 480,
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Pitch Black', hex: '#0A0A0A', image: `${base}images/img4.jpg` },
      { name: 'Heather Grey', hex: '#A6A6A6', image: `${base}images/hude one.jpg` },
    ],
    description: 'Understated quiet luxury silhouette in custom jet black finish. Tailored with a double-layered structured hood and drop shoulders.',
    fabric: '100% Combed Heavy Cotton (480 GSM)',
    fit: 'Relaxed Architectural Boxy Fit',
    features: [
      'Pre-shrunk 480 GSM combed cotton',
      '480 GSM brushed interior fleece',
      'High-density tonal chest embroidery',
      'Elastic ribbed waistband & cuffs'
    ],
    measurements: STANDARD_MEASUREMENTS,
  },
  {
    id: 'monver-crewneck-grey',
    name: 'MONVER Signature French Terry Crewneck',
    category: 'Crewnecks',
    image: `${base}images/cronic one.jpg`,
    originalPrice: 700,
    price: 549,
    gsm: 420,
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Heather Grey', hex: '#A6A6A6', image: `${base}images/cronic one.jpg` },
      { name: 'Pitch Black', hex: '#0A0A0A', image: `${base}images/cronic two.jpg` },
      { name: 'Deep Burgundy', hex: '#441620', image: `${base}images/img5.jpg` },
    ],
    description: 'Precision ribbed collar and cuffs with an effortless drape. A modern classic wardrobe essential engineered for lasting comfort.',
    fabric: '100% Premium Terry Cotton (420 GSM)',
    fit: 'Modern Classic Tailored Fit',
    features: [
      '420 GSM diagonal loop French Terry',
      'Reinforced crewneck collar shape retention',
      'Clean minimalist hem finish',
      'Breathable all-day comfort'
    ],
    measurements: STANDARD_MEASUREMENTS,
  },
  {
    id: 'monver-crewneck-black',
    name: 'MONVER Signature French Terry Crewneck',
    category: 'Crewnecks',
    image: `${base}images/cronic two.jpg`,
    originalPrice: 700,
    price: 549,
    gsm: 420,
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Pitch Black', hex: '#0A0A0A', image: `${base}images/cronic two.jpg` },
      { name: 'Heather Grey', hex: '#A6A6A6', image: `${base}images/cronic one.jpg` },
      { name: 'Deep Burgundy', hex: '#441620', image: `${base}images/img5.jpg` },
    ],
    description: 'Timeless jet black tone with subtle high-density tonal embroidery. Designed to layer effortlessly under tailored outerwear.',
    fabric: '100% Premium Terry Cotton (420 GSM)',
    fit: 'Modern Classic Tailored Fit',
    features: [
      'Signature French Terry texture',
      '420 GSM medium-heavyweight fabric',
      'Double needle stitch detailing',
      'Fade and pill resistant finish'
    ],
    measurements: STANDARD_MEASUREMENTS,
  },
  {
    id: 'monver-crewneck-burgundy',
    name: 'MONVER Signature French Terry Crewneck',
    category: 'Crewnecks',
    image: `${base}images/img5.jpg`,
    originalPrice: 700,
    price: 549,
    gsm: 420,
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Deep Burgundy', hex: '#441620', image: `${base}images/img5.jpg` },
      { name: 'Pitch Black', hex: '#0A0A0A', image: `${base}images/cronic two.jpg` },
      { name: 'Heather Grey', hex: '#A6A6A6', image: `${base}images/cronic one.jpg` },
    ],
    description: 'Rich deep burgundy hue that embodies understated sophistication. Clean construction with reinforced seam work.',
    fabric: '100% Premium Terry Cotton (420 GSM)',
    fit: 'Modern Classic Tailored Fit',
    features: [
      'Subtle jewel tone deep burgundy dye',
      '420 GSM premium terry cotton',
      'Soft enzyme wash for gentle hand-feel',
      'Clean minimalist silhouette'
    ],
    measurements: STANDARD_MEASUREMENTS,
  }
];
