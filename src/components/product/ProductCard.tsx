"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, cn } from "@/lib/utils";
import { COLORS } from "@/lib/constants";
import type { Product } from "@/lib/mock-data";
import toast from "react-hot-toast";

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);

  const handleImgError = (idx: number) => {
    setImgErrors((prev) => ({ ...prev, [idx]: true }));
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[2] ?? product.sizes[0];
    const defaultColor = product.colors[0];
    addItem(product, defaultSize, defaultColor);
    toast.success(`Added to bag — ${defaultSize}`, { duration: 2000 });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id, product.slug);
    toast(wished ? "Removed from wishlist" : "Added to wishlist", {
      icon: wished ? "💔" : "❤️",
      duration: 1500,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      onMouseEnter={() => {
        setHovered(true);
        if (product.images[1]) setActiveImage(1);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setActiveImage(0);
      }}
      className="group relative flex flex-col h-full bg-[#1E293B]/60 rounded-[22px] p-2 sm:p-3 border border-white/10 shadow-lg hover:border-brand-red/50 hover:shadow-[0_0_30px_rgba(153,27,27,0.25)] transition-all duration-500"
    >
      <Link href={`/shop/${product.slug}`} className="flex flex-col h-full" id={`product-card-${product.id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl mb-4 shrink-0" style={{ aspectRatio: "3/4" }}>
          {imgErrors[activeImage] ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)" }}
            >
              <span style={{ fontSize: "40px", opacity: 0.25 }}>👕</span>
            </div>
          ) : (
            <Image
              src={product.images[activeImage] ?? product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={() => handleImgError(activeImage)}
            />
          )}

          {/* Badges & Actions */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 sm:gap-2 z-20">
            {product.isNew && <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-wider rounded sm:rounded-md text-brand-dark" style={{ background: "#F8FAFC" }}>NEW</span>}
            {product.isSale && <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-wider rounded sm:rounded-md text-white" style={{ background: "#991B1B" }}>SALE</span>}
          </div>
          
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 z-20 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-brand-dark transition-transform hover:scale-110"
              style={{ background: "rgba(248, 250, 252, 0.9)", backdropFilter: "blur(4px)" }}
            >
              <Heart className={"w-3.5 h-3.5 sm:w-4 sm:h-4 " + (wished ? "fill-brand-red text-brand-red" : "")} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/shop/${product.slug}`; }}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-brand-dark transition-transform hover:scale-110"
              style={{ background: "rgba(248, 250, 252, 0.9)", backdropFilter: "blur(4px)" }}
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-white text-[10px] sm:text-xs font-semibold tracking-widest backdrop-blur-sm transition-all hover:opacity-90"
              style={{ background: "rgba(153,27,27,0.95)", letterSpacing: "0.1em" }}
            >
              QUICK ADD
            </button>
          </div>

          {/* Image dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-10 sm:bottom-14 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200",
                    activeImage === i ? "bg-white scale-125" : "bg-white/50 hover:bg-white/90"
                  )}
                  onMouseEnter={() => setActiveImage(i)}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveImage(i); }}
                />
              ))}
            </div>
          )}

          {/* Quick nav arrows */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveImage((p) => (p - 1 + product.images.length) % product.images.length); }}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/40 text-white opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 z-20 backdrop-blur-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveImage((p) => (p + 1) % product.images.length); }}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/40 text-white opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 z-20 backdrop-blur-sm"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2 flex-1 flex flex-col px-1 pb-1">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-brand-secondary fill-brand-secondary"}
              />
            ))}
            <span className="text-brand-muted ml-1" style={{ fontSize: "11px" }}>
              ({product.reviewCount})
            </span>
          </div>

          <h3 className="font-heading font-semibold text-brand-white group-hover:text-brand-red transition-colors leading-snug line-clamp-2 text-sm sm:text-[15px]">
            {product.name}
          </h3>

          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="font-semibold text-brand-white text-[13px] sm:text-[15px]">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="line-through text-brand-muted text-[11px] sm:text-[13px]">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="mt-auto pt-2">
            {product.colors.length > 0 && (
              <div className="flex gap-2 items-center">
                <span className="text-brand-muted text-[10px] uppercase font-bold mr-0.5">Colors</span>
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  title={color}
                  onMouseEnter={() => {
                    const colorIdx = product.colors.indexOf(color);
                    if (colorIdx >= 0 && colorIdx < product.images.length) setActiveImage(colorIdx);
                  }}
                  className="w-4 h-4 rounded-full transition-all cursor-help"
                  style={{ border: "2px solid rgba(148,163,184,0.3)", background: COLORS.find(c => c.name === color)?.hex || "#ccc" }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-brand-muted text-xs self-center">+{product.colors.length - 4}</span>
              )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
