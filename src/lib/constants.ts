// =============================================
// BRAND CONSTANTS — INDIAN GATE TEXTILES
// =============================================

export const BRAND = {
  name: "INDIAN GATE",
  subtitle: "Textiles",
  fullName: "Indian Gate Textiles",
  tagline: "Crafted for the Bold. Worn by the Few.",
  description:
    "Premium fashion for the discerning Sri Lankan. Luxury streetwear meets refined elegance.",
  // TODO: Replace with real WhatsApp number
  whatsapp: "+94771234567",
  // TODO: Replace with real email
  email: "hello@indiangatetextiles.com",
  // TODO: Replace with real phone
  phone: "+94 11 234 5678",
  // Matale, Central Province, Sri Lanka (from Google Maps)
  address: "Matale, Central Province, Sri Lanka",
  mapsUrl: "https://maps.app.goo.gl/hQiZC2Y2ZDmU1N3Y8",
  mapsEmbed: "https://maps.google.com/maps?q=INDIAN+GATE+Textiles&ll=7.4695593,80.6239295&z=17",
  social: {
    // TODO: Replace with real handles
    instagram: "https://instagram.com/indiangatetextiles",
    facebook: "https://facebook.com/indiangatetextiles",
    tiktok: "https://tiktok.com/@indiangatetextiles",
  },
};

// TODO: Replace with real bank details before go-live
export const BANK_DETAILS = {
  bankName: "Commercial Bank of Ceylon",
  accountName: "Indian Gate Textiles (Pvt) Ltd",
  accountNumber: "8001234567890",
  branch: "Colombo 03",
  swiftCode: "CCEYLKLX",
};

// TODO: Adjust delivery rates
export const DELIVERY_RATES = {
  colombo: 350,
  westernProvince: 450,
  outstation: 600,
  freeAbove: 15000,
};

export const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "💵",
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    description: "Direct bank deposit or online transfer",
    icon: "🏦",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Powered by PayHere — secure online payment",
    icon: "💳",
  },
];

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "text-yellow-400" },
  { value: "confirmed", label: "Confirmed", color: "text-blue-400" },
  { value: "processing", label: "Processing", color: "text-purple-400" },
  { value: "shipped", label: "Shipped", color: "text-cyan-400" },
  { value: "delivered", label: "Delivered", color: "text-green-400" },
  { value: "cancelled", label: "Cancelled", color: "text-red-400" },
];

export const SIZES = ["OS", "XS", "S", "M", "L", "XL", "XXL", "2Y", "4Y", "6Y", "8Y", "10Y"];

export const COLORS = [
  { name: "Midnight Black", hex: "#0a0a0a" },
  { name: "Slate Grey", hex: "#4B5563" },
  { name: "Off White", hex: "#F8FAFC" },
  { name: "Deep Navy", hex: "#0F172A" },
  { name: "Crimson", hex: "#991B1B" },
  { name: "Military Olive", hex: "#4D5E2F" },
  { name: "Stone Beige", hex: "#C2B49A" },
  { name: "Dusty Rose", hex: "#C9A9A6" },
];

export const CATEGORIES = [
  { slug: "t-shirts", name: "T-Shirts", count: 24 },
  { slug: "hoodies", name: "Hoodies", count: 16 },
  { slug: "shirts", name: "Shirts", count: 18 },
  { slug: "trousers", name: "Trousers", count: 12 },
  { slug: "outerwear", name: "Outerwear", count: 8 },
  { slug: "accessories", name: "Accessories", count: 20 },
];

export const SHOP_SECTIONS = [
  { slug: "men", name: "Men", description: "Premium menswear — tees, hoodies, shirts & more" },
  { slug: "women", name: "Women", description: "Elegant fits designed for her" },
  { slug: "kids", name: "Kids", description: "Quality pieces for the little ones" },
  { slug: "new-arrivals", name: "New Arrivals", description: "Just dropped" },
  { slug: "sale", name: "Sale", description: "Up to 30% off selected styles" },
];

export const NAV_LINKS = [
  { href: "/shop?gender=men", label: "Men" },
  { href: "/shop?gender=women", label: "Women" },
  { href: "/shop?gender=kids", label: "Kids" },
  { href: "/shop?category=new-arrivals", label: "New Arrivals" },
  { href: "/shop", label: "All" },
  { href: "/about", label: "Our Story" },
];
