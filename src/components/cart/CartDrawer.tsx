"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, ShoppingBag, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { DELIVERY_RATES } from "@/lib/constants";

export default function CartDrawer() {
  const { state, removeItem, updateQty, closeCart, subtotal } = useCart();
  const { items, isOpen } = state;

  const deliveryFree = subtotal >= DELIVERY_RATES.freeAbove;
  const total = deliveryFree ? subtotal : subtotal + DELIVERY_RATES.colombo;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full z-50 flex flex-col"
            style={{ width: "420px", maxWidth: "100vw", background: "#0F172A", borderLeft: "1px solid rgba(148,163,184,0.1)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-white" />
                <h2 className="font-heading font-semibold text-brand-white tracking-wider" style={{ fontSize: "15px" }}>
                  Your Bag ({items.length})
                </h2>
              </div>
              <button onClick={closeCart} className="p-1.5 text-brand-muted hover:text-brand-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Free shipping progress */}
            {!deliveryFree && subtotal > 0 && (
              <div className="px-6 py-3" style={{ background: "rgba(153,27,27,0.08)", borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
                <p className="text-xs text-brand-muted mb-2">
                  Add {formatPrice(DELIVERY_RATES.freeAbove - subtotal)} more for free delivery
                </p>
                <div className="h-1 rounded-full" style={{ background: "rgba(148,163,184,0.15)" }}>
                  <div
                    className="h-1 rounded-full bg-brand-red transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / DELIVERY_RATES.freeAbove) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            {deliveryFree && subtotal > 0 && (
              <div className="px-6 py-2.5 text-xs text-green-400 text-center" style={{ background: "rgba(74,222,128,0.06)", borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
                🎉 You qualify for free delivery!
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-none">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-brand-secondary" />
                  <div>
                    <p className="font-heading font-semibold text-brand-white mb-1">Your bag is empty</p>
                    <p className="text-brand-muted text-sm">Add some premium pieces to get started</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 text-sm font-semibold text-brand-white rounded-lg transition-all"
                    style={{ background: "#991B1B" }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 p-3 rounded-xl"
                      style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)" }}
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-heading font-semibold text-brand-white hover:text-brand-red transition-colors line-clamp-2"
                          style={{ fontSize: "13px" }}
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex gap-2 mt-1 text-xs text-brand-muted">
                          <span>{item.size}</span>
                          <span>·</span>
                          <span>{item.color}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2 rounded-lg overflow-hidden"
                            style={{ border: "1px solid rgba(148,163,184,0.15)" }}>
                            <button
                              onClick={() => updateQty(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="px-2 py-1.5 text-brand-muted hover:text-brand-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-brand-white text-sm w-5 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="px-2 py-1.5 text-brand-muted hover:text-brand-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-brand-white" style={{ fontSize: "14px" }}>
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id, item.size, item.color)}
                              className="text-brand-muted hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 space-y-4" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="text-brand-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Delivery</span>
                    <span className={deliveryFree ? "text-green-400" : "text-brand-white"}>
                      {deliveryFree ? "Free" : formatPrice(DELIVERY_RATES.colombo)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2" style={{ borderTop: "1px solid rgba(148,163,184,0.1)" }}>
                    <span className="text-brand-white">Total</span>
                    <span className="text-brand-white" style={{ fontSize: "18px" }}>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  id="cart-checkout-btn"
                  className="flex items-center justify-center w-full py-4 font-heading font-semibold text-white rounded-xl transition-all duration-300 hover:scale-[0.99] tracking-wider"
                  style={{ background: "linear-gradient(135deg, #991B1B 0%, #B91C1C 100%)", fontSize: "13px", letterSpacing: "0.1em" }}
                >
                  CHECKOUT — {formatPrice(total)}
                </Link>

                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    onClick={closeCart}
                    className="text-brand-muted hover:text-brand-white transition-colors py-1.5 flex items-center gap-1 font-heading font-bold tracking-wider uppercase text-[10px]"
                  >
                    ← Continue Shopping
                  </button>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-brand-muted hover:text-brand-white transition-colors py-1.5 underline font-heading font-bold tracking-wider uppercase text-[10px]"
                  >
                    View full cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
