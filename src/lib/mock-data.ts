// =============================================
// MOCK DATA — INDIAN GATE TEXTILES
// Replace with real API calls when backend is ready
// =============================================

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  sku: string;
  description: string;
  details: string[];
  isNew: boolean;
  isFeatured: boolean;
  isSale: boolean;
  rating: number;
  reviewCount: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
  description: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar: string;
};

export type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  paymentMethod: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
};

// =============================================
// PRODUCTS
// =============================================
export const MOCK_PRODUCTS: Product[] = [
  // ----------- MEN -----------
  {
    id: "1",
    slug: "igt-oversized-tee",
    name: "IGT Oversized Tee",
    brand: "Indian Gate Textiles",
    price: 4500,
    comparePrice: 5500,
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85", // Midnight Black Man Tee
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85", // Slate Grey Man Tee
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=85", // Off White Man Tee
    ],
    category: "t-shirts",
    tags: ["oversized", "premium", "men"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Black", "Slate Grey", "Off White"],
    stock: 45,
    sku: "IGT-M-OT01",
    description: "Signature oversized tee crafted from 280gsm premium heavyweight cotton.",
    details: ["280gsm 100% combed cotton", "Dropped shoulder", "Ribbed neck collar"],
    isNew: true, isFeatured: true, isSale: true, rating: 4.8, reviewCount: 142,
  },
  {
    id: "2",
    slug: "igt-mens-linen-shirt",
    name: "IGT Linen Resort Shirt",
    brand: "Indian Gate Textiles",
    price: 6800,
    comparePrice: undefined,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=85", // Stone Beige Man Shirt
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=85", // Off White Man Shirt
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85", // Slate Grey Man Shirt
    ],
    category: "shirts",
    tags: ["linen", "summer", "men"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone Beige", "Off White", "Slate Grey"],
    stock: 19,
    sku: "IGT-M-LS01",
    description: "100% European linen woven for the Sri Lankan climate. Relaxed fit.",
    details: ["100% European linen", "Mother-of-pearl buttons", "Relaxed fit"],
    isNew: true, isFeatured: true, isSale: false, rating: 4.7, reviewCount: 53,
  },
  {
    id: "3",
    slug: "igt-cargo-trousers",
    name: "IGT Cargo Trousers",
    brand: "Indian Gate Textiles",
    price: 9500,
    comparePrice: 11000,
    images: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=85", // Military Olive Man Trousers
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85", // Midnight Black Man Trousers
    ],
    category: "trousers",
    tags: ["cargo", "streetwear", "men"],
    sizes: ["30", "32", "34", "36"],
    colors: ["Military Olive", "Midnight Black"],
    stock: 12,
    sku: "IGT-M-CT01",
    description: "Technical cargo trousers with a modern tapered silhouette.",
    details: ["98% cotton 2% elastane", "6 functional pockets", "Adjustable hem tabs"],
    isNew: false, isFeatured: false, isSale: true, rating: 4.6, reviewCount: 67,
  },

  // ----------- WOMEN -----------
  {
    id: "4",
    slug: "igt-womens-summer-dress",
    name: "IGT Summer Slip Dress",
    brand: "Indian Gate Textiles",
    price: 7200,
    comparePrice: undefined,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=85", // Red Dress
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85", // Black Dress
    ],
    category: "dresses",
    tags: ["women", "dress", "summer"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Crimson", "Midnight Black"],
    stock: 14,
    sku: "IGT-W-D01",
    description: "An elegant, lightweight slip dress cut on the bias from premium satin.",
    details: ["Premium poly-silk blend", "Adjustable straps", "Midi length"],
    isNew: true, isFeatured: true, isSale: false, rating: 4.9, reviewCount: 42,
  },
  {
    id: "5",
    slug: "igt-womens-crop-tee",
    name: "IGT Women's Boxy Crop",
    brand: "Indian Gate Textiles",
    price: 3200,
    comparePrice: 3800,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85", // White Crop
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85", // Black Crop
    ],
    category: "t-shirts",
    tags: ["crop", "tshirt", "women"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Off White", "Midnight Black"],
    stock: 24,
    sku: "IGT-W-CT01",
    description: "Flattering cropped silhouette crafted from signature soft combed cotton.",
    details: ["180gsm combed cotton", "Cropped boxy fit", "Ribbed crewneck"],
    isNew: true, isFeatured: false, isSale: true, rating: 4.8, reviewCount: 34,
  },
  {
    id: "6",
    slug: "igt-womens-pleated-trousers",
    name: "IGT Pleated Trousers",
    brand: "Indian Gate Textiles",
    price: 8500,
    comparePrice: undefined,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=85", // Grey Smart Trousers
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=85", // Black Trousers
    ],
    category: "trousers",
    tags: ["trousers", "smart", "women"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Slate Grey", "Midnight Black"],
    stock: 20,
    sku: "IGT-W-PT01",
    description: "High-waisted pleated trousers with a relaxed, wide-leg drape.",
    details: ["Poly-viscose blend", "Double front pleats", "High rise fit"],
    isNew: true, isFeatured: true, isSale: false, rating: 4.7, reviewCount: 22,
  },

  // ----------- KIDS -----------
  {
    id: "7",
    slug: "igt-kids-logo-hoodie",
    name: "IGT Kids Classic Hoodie",
    brand: "Indian Gate Textiles",
    price: 4500,
    comparePrice: 5000,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=85", // Deep Navy Kid Hoodie
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85", // Crimson/Orange Kid Hoodie
    ],
    category: "hoodies",
    tags: ["kids", "winter", "hoodie"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["Deep Navy", "Crimson"],
    stock: 15,
    sku: "IGT-K-H01",
    description: "Miniature version of our premium hoodie. Soft, durable and playground ready.",
    details: ["320gsm French terry", "Kangaroo pocket", "No drawstrings"],
    isNew: true, isFeatured: false, isSale: true, rating: 4.9, reviewCount: 16,
  },
  {
    id: "8",
    slug: "igt-kids-basic-tee",
    name: "IGT Kids Everyday Tee",
    brand: "Indian Gate Textiles",
    price: 2200,
    comparePrice: undefined,
    images: [
      "https://images.unsplash.com/photo-1622290291165-d341f1938b86?w=800&q=85", // Off White Kid Tee
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=85", // Midnight Black Kid Tee
    ],
    category: "t-shirts",
    tags: ["kids", "tshirt", "everyday"],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: ["Off White", "Midnight Black"],
    stock: 32,
    sku: "IGT-K-T01",
    description: "Pure cotton comfort for the little ones.",
    details: ["100% organic cotton", "Stain resistant", "Gentle on skin"],
    isNew: false, isFeatured: false, isSale: false, rating: 4.5, reviewCount: 8,
  },
  // ----------- ADDITIONAL PRODUCTS -----------
  {
    id: "9",
    slug: "igt-mens-heavy-hoodie",
    name: "IGT Premium Heavyweight Hoodie",
    brand: "Indian Gate Textiles",
    price: 8500,
    comparePrice: 9500,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=85", // Burgundy Men Hoodie
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=85", // Forest Green Men Hoodie
    ],
    category: "hoodies",
    tags: ["hoodie", "heavyweight", "men"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Burgundy", "Forest Green"],
    stock: 25,
    sku: "IGT-M-HH02",
    description: "Ultra-heavyweight 400gsm French Terry hoodie designed for high structure and warmth.",
    details: ["400gsm premium French Terry", "Double-lined hood", "Side rib panels"],
    isNew: true, isFeatured: true, isSale: false, rating: 4.9, reviewCount: 92,
  },
  {
    id: "10",
    slug: "igt-mens-oxford-shirt",
    name: "IGT Classic Oxford Shirt",
    brand: "Indian Gate Textiles",
    price: 6200,
    comparePrice: undefined,
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=85", // Oxford Blue Shirt
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=85", // Slate Grey Shirt
    ],
    category: "shirts",
    tags: ["oxford", "classic", "men"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Oxford Blue", "Slate Grey"],
    stock: 30,
    sku: "IGT-M-OS02",
    description: "A tailored cotton oxford button-down shirt that bridges the gap between smart and casual.",
    details: ["100% fine cotton oxford", "Button-down collar", "Signature curved hem"],
    isNew: false, isFeatured: true, isSale: false, rating: 4.6, reviewCount: 48,
  },
  {
    id: "11",
    slug: "igt-mens-bomber-jacket",
    name: "IGT Utility Bomber Jacket",
    brand: "Indian Gate Textiles",
    price: 12500,
    comparePrice: 14000,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85", // Midnight Black Bomber (Man)
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=85", // Classic Navy Bomber (Man)
    ],
    category: "outerwear",
    tags: ["bomber", "jacket", "men"],
    sizes: ["M", "L", "XL"],
    colors: ["Midnight Black", "Classic Navy"],
    stock: 15,
    sku: "IGT-M-BJ02",
    description: "Insulated utility flight bomber jacket with a water-resistant nylon shell.",
    details: ["Water-resistant nylon shell", "Satin lining", "Utility sleeve pocket"],
    isNew: true, isFeatured: true, isSale: true, rating: 4.8, reviewCount: 77,
  },
  {
    id: "12",
    slug: "igt-mens-chino-shorts",
    name: "IGT Tailored Chino Shorts",
    brand: "Indian Gate Textiles",
    price: 4800,
    comparePrice: 5500,
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85", // Desert Khaki Shorts (Man)
    ],
    category: "trousers",
    tags: ["shorts", "chino", "men"],
    sizes: ["30", "32", "34", "36"],
    colors: ["Desert Khaki"],
    stock: 40,
    sku: "IGT-M-CS02",
    description: "Clean tailored chino shorts made from mid-weight stretch cotton twill.",
    details: ["97% cotton 3% elastane stretch twill", "Slanted front pockets", "9-inch inseam"],
    isNew: false, isFeatured: false, isSale: false, rating: 4.4, reviewCount: 19,
  },
  {
    id: "13",
    slug: "igt-womens-knit-top",
    name: "IGT Ribbed Knit Crop Top",
    brand: "Indian Gate Textiles",
    price: 2900,
    comparePrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
    ],
    category: "t-shirts",
    tags: ["crop", "ribbed", "women"],
    sizes: ["XS", "S", "M"],
    colors: ["Midnight Black"],
    stock: 35,
    sku: "IGT-W-KT02",
    description: "Soft ribbed cotton-knit sleeveless crop top featuring a supportive, figure-hugging fit.",
    details: ["Ribbed cotton elastane blend", "Double lined front", "Scoop neckline"],
    isNew: true, isFeatured: false, isSale: true, rating: 4.7, reviewCount: 26,
  },
  {
    id: "14",
    slug: "igt-womens-wrap-dress",
    name: "IGT Linen Wrap Dress",
    brand: "Indian Gate Textiles",
    price: 7900,
    comparePrice: undefined,
    images: [
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85",
    ],
    category: "dresses",
    tags: ["women", "dress", "linen"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sage Green", "Floral White"],
    stock: 18,
    sku: "IGT-W-WD02",
    description: "Classic feminine wrap midi dress cut from premium breathable linen blend fabric.",
    details: ["70% linen 30% cotton", "Tie waist waist closure", "V-neck silhouette"],
    isNew: true, isFeatured: true, isSale: false, rating: 4.9, reviewCount: 31,
  },
  {
    id: "15",
    slug: "igt-womens-oversized-hoodie",
    name: "IGT Cozy Oversized Hoodie",
    brand: "Indian Gate Textiles",
    price: 8200,
    comparePrice: 9200,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85", // Lavender Cream Women Hoodie
    ],
    category: "hoodies",
    tags: ["cozy", "oversized", "women"],
    sizes: ["S", "M", "L"],
    colors: ["Lavender Cream"],
    stock: 22,
    sku: "IGT-W-OH02",
    description: "Relaxed slouchy hoodie made of extra plush brushed cotton fleece.",
    details: ["Brushed fleece interior", "Dropped shoulders", "Embroidered tonal chest branding"],
    isNew: false, isFeatured: true, isSale: true, rating: 4.8, reviewCount: 56,
  },
  {
    id: "16",
    slug: "igt-womens-denim-jacket",
    name: "IGT Signature Denim Jacket",
    brand: "Indian Gate Textiles",
    price: 11500,
    comparePrice: 13000,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85", // Vintage Blue Denim Jacket
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=85", // Bleach Wash Denim Jacket
    ],
    category: "outerwear",
    tags: ["women", "denim", "jacket"],
    sizes: ["S", "M", "L"],
    colors: ["Vintage Blue", "Bleach Wash"],
    stock: 12,
    sku: "IGT-W-DJ02",
    description: "A timeless trucker jacket constructed from premium 13oz heavy denim.",
    details: ["100% rigid cotton denim", "Branded silver button hardware", "Dual chest pockets"],
    isNew: true, isFeatured: false, isSale: false, rating: 4.6, reviewCount: 15,
  },
  {
    id: "17",
    slug: "igt-kids-dungarees",
    name: "IGT Kids Denim Dungarees",
    brand: "Indian Gate Textiles",
    price: 5200,
    comparePrice: 5800,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=85",
    ],
    category: "trousers",
    tags: ["kids", "denim", "dungarees"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["Classic Indigo"],
    stock: 10,
    sku: "IGT-K-DD02",
    description: "Durable and adorable rigid denim overalls with adjustable shoulder buckles.",
    details: ["100% durable cotton denim", "Adjustable shoulder clasps", "Functional tool loops"],
    isNew: true, isFeatured: true, isSale: false, rating: 4.9, reviewCount: 12,
  },
  {
    id: "18",
    slug: "igt-kids-shorts",
    name: "IGT Kids Organic Cotton Shorts",
    brand: "Indian Gate Textiles",
    price: 2500,
    comparePrice: undefined,
    images: [
      "https://images.unsplash.com/photo-1622290291165-d341f1938b86?w=800&q=85", // Caramel Brown Kids Shorts
    ],
    category: "trousers",
    tags: ["kids", "organic", "shorts"],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: ["Caramel Brown"],
    stock: 28,
    sku: "IGT-K-OS02",
    description: "Soft pull-on organic cotton canvas utility shorts with elasticated waistband.",
    details: ["100% organic cotton canvas", "Elastic drawstring waistband", "Side cargo pocketing"],
    isNew: false, isFeatured: false, isSale: false, rating: 4.7, reviewCount: 9,
  },
  {
    id: "19",
    slug: "igt-kids-sweatshirt",
    name: "IGT Kids Active Sweatshirt",
    brand: "Indian Gate Textiles",
    price: 3900,
    comparePrice: 4500,
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85", // Heather Grey Sweatshirt
    ],
    category: "hoodies",
    tags: ["kids", "sweatshirt", "active"],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    colors: ["Heather Grey"],
    stock: 20,
    sku: "IGT-K-AS02",
    description: "Super soft crewneck fleece sweater optimized for active play.",
    details: ["Cotton poly active fleece", "Ribbed crew collar and cuffs", "Raglan sleeve design"],
    isNew: true, isFeatured: false, isSale: true, rating: 4.8, reviewCount: 14,
  },
  {
    id: "20",
    slug: "igt-kids-sun-hat",
    name: "IGT Kids Summer Sun Hat",
    brand: "Indian Gate Textiles",
    price: 1800,
    comparePrice: 2200,
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=85", // Bright Yellow Kid Sun Hat
    ],
    category: "accessories",
    tags: ["kids", "hat", "summer"],
    sizes: ["One Size"],
    colors: ["Bright Yellow"],
    stock: 40,
    sku: "IGT-K-SH02",
    description: "Wide-brimmed cotton sun bucket hat offering perfect UV face protection.",
    details: ["100% soft cotton canvas", "Chin tie strap adjustments", "Embroidered sun details"],
    isNew: false, isFeatured: true, isSale: false, rating: 4.6, reviewCount: 8,
  },
];

// =============================================
// CATEGORIES
// =============================================
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "T-Shirts",
    slug: "t-shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    count: 24,
    description: "Heavyweight essentials, graphic tees, and everyday staples",
  },
  {
    id: "2",
    name: "Hoodies",
    slug: "hoodies",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    count: 16,
    description: "Premium fleece, minimalist graphics, year-round warmth",
  },
  {
    id: "3",
    name: "Shirts",
    slug: "shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    count: 18,
    description: "Linen, oxford, and technical wovens for every occasion",
  },
  {
    id: "4",
    name: "Trousers",
    slug: "trousers",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    count: 12,
    description: "Cargo, track pants, and tailored trousers",
  },
  {
    id: "5",
    name: "Outerwear",
    slug: "outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    count: 8,
    description: "Bombers, coaches, and statement jackets",
  },
  {
    id: "6",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=600&q=80",
    count: 20,
    description: "Caps, bags, socks, and the finishing touches",
  },
];

// =============================================
// REVIEWS
// =============================================
export const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Kasun P.",
    rating: 5,
    comment:
      "The quality is genuinely impressive. I've bought from international brands and this rivals them easily. The oversized tee fits perfectly and the fabric is incredibly soft.",
    date: "2026-04-15",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    id: "2",
    author: "Nimasha S.",
    rating: 5,
    comment:
      "Finally a Sri Lankan brand that actually understands quality. The hoodie is amazing — heavy, structured, and the colour hasn't faded even after 10+ washes.",
    date: "2026-03-28",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    id: "3",
    author: "Dinesh R.",
    rating: 5,
    comment:
      "Ordered the cargo trousers and was blown away. The stitching is flawless and the fit is exactly as described. Delivery was fast too.",
    date: "2026-04-02",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    id: "4",
    author: "Ayesha F.",
    rating: 4,
    comment:
      "Love the aesthetic of this brand. The linen shirt is clean and breathable — perfect for Colombo weather. Would love to see more women's sizing options.",
    date: "2026-04-10",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
  {
    id: "5",
    author: "Tharindu M.",
    rating: 5,
    comment:
      "The bomber jacket is worth every rupee. Looks and feels premium. I've gotten so many compliments. Indian Gate is genuinely world-class.",
    date: "2026-03-20",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
  },
];

// =============================================
// TESTIMONIALS (for homepage)
// =============================================
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Kasun Perera",
    location: "Colombo 07",
    text: "Indian Gate is the brand Sri Lanka has been waiting for. The quality rivals anything I've bought from international brands at three times the price.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: "2",
    name: "Nimasha Silva",
    location: "Nugegoda",
    text: "Finally, a local brand that understands minimal, premium aesthetics. Every piece I own from them gets compliments.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "3",
    name: "Raveendra Jayawardena",
    location: "Kandy",
    text: "The craftsmanship is exceptional. I ordered the bomber jacket and it arrived perfectly packaged. A true luxury purchase.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

// =============================================
// MOCK ORDERS (for account page)
// =============================================
export const MOCK_ORDERS: Order[] = [
  {
    id: "IGT-893421-X9K",
    date: "2026-05-12",
    status: "delivered",
    total: 13400,
    items: 2,
    paymentMethod: "Bank Transfer",
  },
  {
    id: "IGT-851203-M4P",
    date: "2026-05-02",
    status: "shipped",
    total: 8900,
    items: 1,
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "IGT-802941-R7Q",
    date: "2026-04-21",
    status: "delivered",
    total: 22300,
    items: 3,
    paymentMethod: "Card",
  },
];

// =============================================
// INSTAGRAM GALLERY (mock)
// =============================================
export const INSTAGRAM_POSTS = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80",
];

// =============================================
// ADMIN MOCK DATA
// =============================================
export const ADMIN_STATS = [
  { title: "Total Revenue", value: "LKR 4,823,500", change: "+18.3%", positive: true },
  { title: "Total Orders", value: "312", change: "+24.1%", positive: true },
  { title: "Total Customers", value: "1,847", change: "+12.7%", positive: true },
  { title: "Avg. Order Value", value: "LKR 15,460", change: "+4.2%", positive: true },
];

export const ADMIN_TOP_PRODUCTS = [
  { id: "5", name: "IGT Bomber Jacket — Jet Black", sold: 114, revenue: 2109000 },
  { id: "2", name: "IGT Premium Hoodie — Deep Navy", sold: 89, revenue: 792100 },
  { id: "1", name: "IGT Oversized Tee — Midnight", sold: 142, revenue: 639000 },
  { id: "7", name: "IGT Arch Graphic Hoodie", sold: 44, revenue: 404800 },
  { id: "4", name: "IGT Cargo Trousers — Military Olive", sold: 67, revenue: 636500 },
];

export const ADMIN_RECENT_ORDERS = [
  { id: "IGT-930001", customer: "Kasun Perera", total: 18500, status: "confirmed", date: "2026-05-18", items: 1, paymentMethod: "bank transfer" },
  { id: "IGT-929997", customer: "Nimasha Silva", total: 9200, status: "processing", date: "2026-05-18", items: 2, paymentMethod: "cod" },
  { id: "IGT-929988", customer: "Dinesh Ranaweera", total: 4500, status: "pending", date: "2026-05-17", items: 1, paymentMethod: "card" },
  { id: "IGT-929970", customer: "Ayesha Fernando", total: 27200, status: "shipped", date: "2026-05-17", items: 3, paymentMethod: "bank transfer" },
  { id: "IGT-929945", customer: "Tharindu Mendis", total: 6800, status: "delivered", date: "2026-05-16", items: 1, paymentMethod: "cod" },
  { id: "IGT-929901", customer: "Priya Ramasamy", total: 13700, status: "delivered", date: "2026-05-15", items: 2, paymentMethod: "card" },
];

export const ADMIN_LOW_STOCK = [
  { id: "5", name: "IGT Bomber Jacket — Jet Black", sku: "IGT-BJ-001", stock: 8, category: "Outerwear" },
  { id: "4", name: "IGT Cargo Trousers — Military Olive", sku: "IGT-CT-001", stock: 12, category: "Trousers" },
  { id: "7", name: "IGT Arch Graphic Hoodie", sku: "IGT-GH-001", stock: 15, category: "Hoodies" },
  { id: "3", name: "IGT Linen Shirt — Stone Beige", sku: "IGT-LS-001", stock: 19, category: "Shirts" },
];

export const REVENUE_CHART_DATA = [
  { month: "Nov", revenue: 1820000 },
  { month: "Dec", revenue: 3140000 },
  { month: "Jan", revenue: 2560000 },
  { month: "Feb", revenue: 2980000 },
  { month: "Mar", revenue: 3420000 },
  { month: "Apr", revenue: 3890000 },
  { month: "May", revenue: 4823500 },
];
