"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { items: wishlistItems, toggle } = useWishlist();
  const { addItem } = useCart();

  const wishlistProducts = MOCK_PRODUCTS.filter((p) =>
    wishlistItems.some((i) => i.id === p.id)
  );

  const handleAddToCart = (productId: string) => {
    const p = MOCK_PRODUCTS.find((x) => x.id === productId);
    if (p) {
      addItem(p, p.sizes[2] ?? p.sizes[0], p.colors[0]);
      toast.success("Added to bag!");
    }
  };

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#020617" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="font-heading font-bold text-brand-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Wishlist
            </h1>
            <p className="text-brand-muted mt-1">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? "s" : ""}</p>
          </div>
          {wishlistProducts.length > 0 && (
            <Link href="/shop" className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-white transition-colors">
              Continue shopping <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <Heart size={64} className="text-brand-secondary" />
            <div className="text-center">
              <h2 className="font-heading font-bold text-brand-white text-2xl mb-2">Your wishlist is empty</h2>
              <p className="text-brand-muted">Save items you love and come back to them later.</p>
            </div>
            <Link href="/shop" className="px-8 py-4 font-heading font-semibold text-white rounded-xl tracking-wider" style={{ background: "#991B1B", fontSize: "12px", letterSpacing: "0.12em" }}>
              EXPLORE PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative"
              >
                <Link href={`/shop/${product.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl mb-3" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <button
                      onClick={(e) => { e.preventDefault(); toggle(product.id, product.slug); toast("Removed from wishlist", { icon: "💔" }); }}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-brand-red text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="font-semibold text-brand-white text-sm mb-1 line-clamp-2 group-hover:text-brand-red transition-colors">{product.name}</p>
                  <p className="font-bold text-brand-white">{formatPrice(product.price)}</p>
                </Link>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full mt-3 py-2.5 rounded-xl text-xs font-heading font-semibold text-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{ background: "rgba(153,27,27,0.8)", letterSpacing: "0.1em" }}
                >
                  <ShoppingBag size={13} /> ADD TO BAG
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
