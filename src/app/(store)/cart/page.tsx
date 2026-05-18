"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, Minus, Plus, Tag, ArrowRight, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { DELIVERY_RATES } from "@/lib/constants";

export default function CartPage() {
  const { state, removeItem, updateQty, clearCart, subtotal } = useCart();
  const { items } = state;
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= DELIVERY_RATES.freeAbove ? 0 : DELIVERY_RATES.colombo;
  const total = subtotal - discount + delivery;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "IGTFIRST") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#020617" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-heading font-bold text-brand-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Your Bag
          </h1>
          <p className="text-brand-muted mt-1">{items.length} {items.length === 1 ? "item" : "items"}</p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <ShoppingBag size={64} className="text-brand-secondary" />
            <div className="text-center">
              <h2 className="font-heading font-bold text-brand-white text-2xl mb-2">Your bag is empty</h2>
              <p className="text-brand-muted">Looks like you haven&apos;t added anything yet.</p>
            </div>
            <Link
              href="/shop"
              className="px-8 py-4 font-heading font-semibold text-white rounded-xl tracking-wider"
              style={{ background: "#991B1B", fontSize: "12px", letterSpacing: "0.12em" }}
            >
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-5 p-5 rounded-2xl"
                    style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}
                  >
                    <Link href={`/shop/${item.product.slug}`} className="relative w-24 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="96px" />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/shop/${item.product.slug}`} className="font-heading font-semibold text-brand-white hover:text-brand-red transition-colors" style={{ fontSize: "15px" }}>
                          {item.product.name}
                        </Link>
                        <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-brand-muted hover:text-red-400 transition-colors p-1 flex-shrink-0">
                          <X size={16} />
                        </button>
                      </div>

                      <div className="flex gap-3 mt-2 text-sm text-brand-muted">
                        <span>Size: <span className="text-brand-white">{item.size}</span></span>
                        <span>·</span>
                        <span>Color: <span className="text-brand-white">{item.color}</span></span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid rgba(148,163,184,0.15)" }}>
                          <button onClick={() => updateQty(item.product.id, item.size, item.color, item.quantity - 1)} className="px-3 py-2 text-brand-muted hover:text-brand-white transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="text-brand-white font-semibold px-3">{item.quantity}</span>
                          <button onClick={() => updateQty(item.product.id, item.size, item.color, item.quantity + 1)} className="px-3 py-2 text-brand-muted hover:text-brand-white transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-brand-white" style={{ fontSize: "16px" }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button onClick={clearCart} className="text-sm text-brand-muted hover:text-red-400 transition-colors flex items-center gap-1 mt-2">
                <Trash2 size={14} /> Clear bag
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <div className="p-6 rounded-2xl sticky top-24" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
                <h2 className="font-heading font-bold text-brand-white mb-6 tracking-wider" style={{ fontSize: "16px" }}>Order Summary</h2>

                {/* Coupon */}
                <div className="mb-6">
                  <p className="text-sm text-brand-muted mb-2">Coupon code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="IGTFIRST"
                      className="flex-1 px-3 py-2.5 rounded-lg text-sm"
                      style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.15)", color: "#F8FAFC", outline: "none" }}
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2.5 rounded-lg text-xs font-semibold text-white transition-all"
                      style={{ background: "rgba(153,27,27,0.8)" }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && <p className="text-green-400 text-xs mt-1 flex items-center gap-1"><Tag size={11} /> 10% off applied!</p>}
                  {couponError && <p className="text-red-400 text-xs mt-1">{couponError}</p>}
                  <p className="text-brand-muted text-xs mt-1">Try IGTFIRST for 10% off your first order</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="text-brand-white">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">Coupon (10%)</span>
                      <span className="text-green-400">−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Delivery</span>
                    <span className={delivery === 0 ? "text-green-400" : "text-brand-white"}>
                      {delivery === 0 ? "Free" : formatPrice(delivery)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between font-bold pt-3"
                    style={{ borderTop: "1px solid rgba(148,163,184,0.1)" }}
                  >
                    <span className="text-brand-white">Total</span>
                    <span className="text-brand-white" style={{ fontSize: "20px" }}>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  id="cart-page-checkout-btn"
                  className="flex items-center justify-center gap-2 w-full py-4 font-heading font-semibold text-white rounded-xl tracking-wider transition-all hover:scale-[0.99]"
                  style={{ background: "linear-gradient(135deg, #991B1B 0%, #B91C1C 100%)", fontSize: "13px", letterSpacing: "0.1em" }}
                >
                  CHECKOUT <ArrowRight size={16} />
                </Link>

                <div className="mt-4 text-center text-xs text-brand-muted">
                  Secure checkout · PayHere · Bank Transfer · COD
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
