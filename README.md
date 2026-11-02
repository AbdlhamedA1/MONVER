# MONVER – Premium Fashion Brand Landing Page

Official landing page and WhatsApp ordering experience for **MONVER**. Built with a quiet luxury, minimalist aesthetic inspired by high-end independent fashion houses.

---

## ✦ Key Features

- **Quiet Luxury & Old Money Aesthetic**: Pure black & white palette (`#000000`, `#FFFFFF`) with subtle sky blue (`#87CEEB`) accents, generous whitespace, and editorial typography (*Cinzel*, *Playfair Display*, *Plus Jakarta Sans*).
- **Single-Page Architecture**:
  1. **Hero**: Full viewport framing showcasing authentic MONVER apparel with smooth scroll CTA.
  2. **About MONVER**: Brand philosophy, quiet luxury pillars, and craftsmanship standards.
  3. **The Collection**: Editorial product catalog with category filters, size selector (`S`, `M`, `L`, `XL`, `XXL`), and interactive color swatches with dynamic image switching.
  4. **Contact Us**: Official channels linking directly to WhatsApp, Instagram, TikTok, Facebook, and Email.
- **Pure Product Presentation**: Zero promotional stickers, discount badges, or text overlays on product photography.
- **Functional Shopping Bag**:
  - Live bag counter badge on navbar.
  - Slide-in side drawer.
  - Quantity controls (`+` / `-`), item removal, and auto-calculated subtotals and totals in `EGP`.
  - Merges duplicate configurations (same product + size + color) while tracking distinct variants separately.
- **WhatsApp Ordering System**:
  - Generates a structured, professional order summary in English.
  - Launches official `wa.me/201029617511` with encoded message.
  - Automatically resets cart after order handoff.

---

## ✦ Centralized Configuration

All editable brand information and product data are decoupled from UI components:

- **Contact & Brand Settings**: [`src/config/brand.ts`](file:///e:/MON/src/config/brand.ts)
  - WhatsApp phone number & display format
  - Social media URLs (Instagram, TikTok, Facebook)
  - Contact email
  - Hero image path
- **Product Catalog**: [`src/data/products.ts`](file:///e:/MON/src/data/products.ts)
  - Add, edit, or remove products and colorways
  - Update pricing, available sizes, fabric specs, and descriptions

---

## ✦ Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
