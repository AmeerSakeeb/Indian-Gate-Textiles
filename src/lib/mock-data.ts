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
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85", // Black
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85", // Grey
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=85", // White
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
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=85", // Beige
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800&q=85", // White
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=800&q=85", // Grey
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
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85", // Olive
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85", // Black
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
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85", // Grey
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=85", // Black
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
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800&q=85", // Navy/Grey Kid Hoodie
      "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=800&q=85", // Red Kid Hoodie
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
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800&q=85", // White Kid Tee
      "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=800&q=85", // Black Kid Tee
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
