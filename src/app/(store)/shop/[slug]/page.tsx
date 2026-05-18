"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Heart, ShoppingBag, Truck, RotateCcw, Shield,
  ChevronLeft, ChevronRight, Minus, Plus, ArrowRight
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, cn } from "@/lib/utils";
import { MOCK_REVIEWS } from "@/lib/mock-data";
import ProductCard from "@/components/product/ProductCard";
import toast from "react-hot-toast";

type Props = { params: Promise<{ slug: string }> };

export default function ProductDetailPage(props: Props) {
  const params = use(props.params);
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "delivery" | "returns">("description");
  const [sizeError, setSizeError] = useState(false);

  // Sync color selection with image index
  useEffect(() => {
    const colorIdx = product.colors.indexOf(selectedColor);
    if (colorIdx >= 0 && colorIdx < product.images.length) {
      setSelectedImage(colorIdx);
    }
  }, [selectedColor, product.colors, product.images.length]);

  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);

  const related = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.tags.some((t) => product.tags.includes(t)))
  ).slice(0, 4);

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      toast.error("Please select a size");
      return;
    }
    addItem(product, selectedSize, selectedColor, qty);
    toast.success(`Added to bag! ${selectedSize} · ${selectedColor}`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast.error("Please select a size");
      return;
    }
    addItem(product, selectedSize, selectedColor, qty);
    window.location.href = "/checkout";
  };

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#020617" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm text-brand-muted">
          <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-white transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-brand-white transition-colors capitalize">
            {product.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-brand-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* ── GALLERY ── */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative overflow-hidden rounded-xl transition-all duration-200",
                    selectedImage === i
                      ? "ring-2 ring-brand-red"
                      : "ring-1 ring-transparent hover:ring-brand-muted/40"
                  )}
                  style={{ aspectRatio: "1/1" }}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 overflow-hidden rounded-2xl group" style={{ aspectRatio: "3/4" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((p) => (p - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((p) => (p + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 text-xs font-bold text-white rounded-lg tracking-wider" style={{ background: "#991B1B", letterSpacing: "0.08em" }}>NEW</span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 text-xs font-bold text-white rounded-lg" style={{ background: "rgba(15,23,42,0.9)" }}>-{discount}%</span>
                )}
              </div>
            </div>
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-brand-secondary fill-brand-secondary"} />
                ))}
              </div>
              <span className="text-brand-muted text-sm">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <h1 className="font-heading font-bold text-brand-white mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-bold text-brand-white" style={{ fontSize: "28px" }}>
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="line-through text-brand-muted" style={{ fontSize: "18px" }}>
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white rounded-lg" style={{ background: "#991B1B" }}>
                  SAVE {discount}%
                </span>
              )}
            </div>

            {/* Color selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-brand-white text-sm tracking-wider" style={{ letterSpacing: "0.08em" }}>
                  COLOR — <span className="text-brand-muted font-normal">{selectedColor}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm transition-all duration-200",
                      selectedColor === color
                        ? "bg-brand-dark text-white ring-2 ring-brand-red"
                        : "text-brand-muted hover:text-brand-white"
                    )}
                    style={{
                      background: selectedColor !== color ? "rgba(30,41,59,0.5)" : undefined,
                      border: selectedColor !== color ? "1px solid rgba(148,163,184,0.15)" : undefined
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className={cn(
                  "font-semibold text-sm tracking-wider transition-colors",
                  sizeError ? "text-red-400" : "text-brand-white"
                )} style={{ letterSpacing: "0.08em" }}>
                  SIZE {sizeError && <span className="text-red-400 font-normal ml-1">— Please select</span>}
                </p>
                <Link href="/size-guide" className="text-xs text-brand-muted hover:text-brand-white transition-colors underline underline-offset-2">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={cn(
                      "min-w-[52px] h-12 px-3 rounded-xl text-sm font-semibold transition-all duration-200",
                      selectedSize === size
                        ? "bg-brand-red text-white"
                        : "text-brand-muted hover:text-brand-white"
                    )}
                    style={selectedSize !== size
                      ? { background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.15)" }
                      : {}}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex gap-3 mb-4">
              {/* Qty */}
              <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(148,163,184,0.15)" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-4 text-brand-muted hover:text-brand-white transition-colors">
                  <Minus size={14} />
                </button>
                <span className="text-brand-white font-semibold w-10 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-4 text-brand-muted hover:text-brand-white transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-semibold text-white tracking-wider transition-all hover:scale-[0.99]"
                style={{ background: "rgba(153,27,27,0.9)", fontSize: "12px", letterSpacing: "0.12em" }}
              >
                <ShoppingBag size={16} />
                ADD TO BAG
              </button>

              {/* Wishlist */}
              <button
                onClick={() => { toggle(product.id, product.slug); toast(wished ? "Removed from wishlist" : "Saved to wishlist", { icon: wished ? "💔" : "❤️" }); }}
                className={cn(
                  "p-4 rounded-xl transition-all",
                  wished ? "bg-brand-red text-white" : "text-brand-muted hover:text-brand-white"
                )}
                style={!wished ? { background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.15)" } : {}}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={wished ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Buy Now */}
            <button
              id="buy-now-btn"
              onClick={handleBuyNow}
              className="w-full py-4 rounded-xl font-heading font-semibold text-brand-dark tracking-wider transition-all hover:scale-[0.99] mb-8"
              style={{ background: "#F8FAFC", fontSize: "12px", letterSpacing: "0.12em" }}
            >
              BUY NOW
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: "Free delivery", sub: "Over LKR 15,000" },
                { icon: RotateCcw, label: "Free returns", sub: "Within 14 days" },
                { icon: Shield, label: "Authentic", sub: "100% guaranteed" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl gap-2"
                  style={{ background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.06)" }}>
                  <Icon size={18} className="text-brand-muted" />
                  <div>
                    <p className="text-brand-white font-semibold" style={{ fontSize: "11px" }}>{label}</p>
                    <p className="text-brand-muted" style={{ fontSize: "10px" }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info tabs */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(148,163,184,0.08)" }}>
              <div className="flex" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                {(["description", "delivery", "returns"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-3 text-xs font-semibold tracking-wider capitalize transition-colors",
                      activeTab === tab ? "text-brand-white bg-brand-dark" : "text-brand-muted hover:text-brand-white"
                    )}
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {tab === "description" ? "Details" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {activeTab === "description" && (
                  <div>
                    <p className="text-brand-muted leading-relaxed mb-4" style={{ fontSize: "14px" }}>
                      {product.description}
                    </p>
                    <ul className="space-y-2">
                      {product.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-brand-muted" style={{ fontSize: "13px" }}>
                          <span className="w-1 h-1 rounded-full bg-brand-red flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "delivery" && (
                  <div className="space-y-3 text-brand-muted" style={{ fontSize: "14px" }}>
                    <p>🚚 <strong className="text-brand-white">Colombo:</strong> 2–3 business days (LKR 350)</p>
                    <p>📦 <strong className="text-brand-white">Island-wide:</strong> 3–5 business days (LKR 600)</p>
                    <p>🎁 <strong className="text-brand-white">Free delivery</strong> on orders over LKR 15,000</p>
                    <p>📍 Shipped from Matale, Central Province</p>
                  </div>
                )}
                {activeTab === "returns" && (
                  <div className="space-y-3 text-brand-muted" style={{ fontSize: "14px" }}>
                    <p>↩️ <strong className="text-brand-white">14-day returns</strong> on unworn, unwashed items</p>
                    <p>🏷️ Tags must still be attached</p>
                    <p>📞 Contact us via WhatsApp to initiate a return</p>
                    <p>💳 Refunds processed within 5–7 business days</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-20">
          <h2 className="font-heading font-bold text-brand-white mb-8" style={{ fontSize: "28px" }}>
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_REVIEWS.slice(0, 4).map((review) => (
              <div key={review.id} className="p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={review.avatar} alt={review.author} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-white text-sm">{review.author}</p>
                      {review.verified && <p className="text-green-400" style={{ fontSize: "11px" }}>✓ Verified purchase</p>}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-brand-secondary"} />
                    ))}
                  </div>
                </div>
                <p className="text-brand-muted leading-relaxed" style={{ fontSize: "14px" }}>
                  &quot;{review.comment}&quot;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-bold text-brand-white" style={{ fontSize: "28px" }}>You May Also Like</h2>
              <Link href="/shop" className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-white transition-colors">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 glass-dark">
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 rounded-xl font-heading font-semibold text-white tracking-wider"
            style={{ background: "#991B1B", fontSize: "13px", letterSpacing: "0.1em" }}
          >
            ADD TO BAG — {formatPrice(product.price * qty)}
          </button>
          <button
            onClick={() => { toggle(product.id, product.slug); }}
            className={cn("p-4 rounded-xl transition-all", wished ? "bg-brand-red text-white" : "text-brand-muted")}
            style={!wished ? { background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.15)" } : {}}
          >
            <Heart size={18} fill={wished ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
