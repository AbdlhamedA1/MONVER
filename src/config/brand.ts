/**
 * MONVER - Central Brand Configuration
 * All contact information, social links, and brand messaging are centralized here.
 */

export interface BrandConfig {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  heroImage: string;
  logoImage: string;
  currency: string;
  contact: {
    whatsappNumber: string; // Egyptian phone format for wa.me link e.g. 201029617511
    whatsappDisplay: string;
    instagramUrl: string;
    instagramHandle: string;
    facebookUrl: string;
    facebookName: string;
    tiktokUrl: string;
    tiktokHandle: string;
    email: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  name: "MONVER",
  tagline: "TIMELESS BY DESIGN.",
  headline: "Timeless Style. Modern Identity.",
  subheadline: "Discover everyday essentials designed around quality, comfort, and effortless style.",
  
  // Official MONVER Brand Hero Image provided in images folder
  heroImage: `${import.meta.env.BASE_URL}images/hero img.jpeg`,
  logoImage: `${import.meta.env.BASE_URL}images/logo-transparent.png`,
  
  currency: "EGP",

  contact: {
    // Official WhatsApp ordering number
    whatsappNumber: "201029617511",
    whatsappDisplay: "+20 10 2961 7511",
    
    // Official Social Links
    instagramUrl: "https://www.instagram.com/monver_eg?obrf=eWcyNTNyNjRvY2E4&utm_source=qr",
    instagramHandle: "@monver_eg",
    
    facebookUrl: "https://www.facebook.com/share/1GvG3qM34e/?mibextid=wwXIfr",
    facebookName: "MONVER",
    
    tiktokUrl: "https://www.tiktok.com/@monver_eg",
    tiktokHandle: "@monver_eg",
    
    email: "contact@monver.com",
  },
};
