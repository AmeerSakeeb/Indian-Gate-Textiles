"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Copy, MessageCircle, Upload, CreditCard, Banknote, Truck, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateOrderId, cn } from "@/lib/utils";
import { BANK_DETAILS, DELIVERY_RATES, BRAND } from "@/lib/constants";
import toast from "react-hot-toast";

type Step = 1 | 2 | 3;
type PaymentMethod = "cod" | "bank_transfer" | "card";

export default function CheckoutPage() {
  const { state, subtotal, clearCart } = useCart();
  const { items } = state;
  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [orderId] = useState(generateOrderId());
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const delivery = subtotal >= DELIVERY_RATES.freeAbove ? 0 : DELIVERY_RATES.colombo;
  const total = subtotal + delivery;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "Matale",
    postalCode: "",
    notes: "",
  });

  const updateForm = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const placeOrder = () => {
    clearCart();
    setOrderPlaced(true);
    setStep(3);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Indian Gate Textiles! I've placed an order.\n\nOrder ID: ${orderId}\nTotal: ${formatPrice(total)}\nPayment: Bank Transfer\n\nPlease confirm receipt of payment.`
  );

  const copyBankDetails = () => {
    const text = `Bank: ${BANK_DETAILS.bankName}\nAccount: ${BANK_DETAILS.accountName}\nNumber: ${BANK_DETAILS.accountNumber}\nBranch: ${BANK_DETAILS.branch}`;
    navigator.clipboard.writeText(text);
    toast.success("Bank details copied!");
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-28 min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#020617" }}>
        <p className="text-brand-muted text-lg mb-4">Your bag is empty</p>
        <Link href="/shop" className="px-8 py-3 bg-brand-red text-white rounded-xl font-heading font-semibold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#020617" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/cart" className="text-brand-muted hover:text-brand-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-heading font-bold text-brand-white" style={{ fontSize: "28px" }}>Checkout</h1>
            <p className="text-brand-muted text-sm">Order ID: <span className="text-brand-white font-mono">{orderId}</span></p>
          </div>
        </div>

        {/* Stepper */}
        {!orderPlaced && (
          <div className="flex items-center gap-2 mb-10">
            {[
              { n: 1, label: "Delivery" },
              { n: 2, label: "Payment" },
              { n: 3, label: "Confirm" },
            ].map(({ n, label }, i) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                      step >= n ? "bg-brand-red text-white" : "text-brand-muted"
                    )}
                    style={step < n ? { background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.15)" } : {}}
                  >
                    {step > n ? <Check size={14} /> : n}
                  </div>
                  <span className={cn("text-sm hidden sm:block", step >= n ? "text-brand-white" : "text-brand-muted")}>
                    {label}
                  </span>
                </div>
                {i < 2 && <div className="flex-1 h-px mx-2" style={{ background: step > n ? "#991B1B" : "rgba(148,163,184,0.2)" }} />}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* ── STEP 1: DELIVERY ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
                    <h2 className="font-heading font-semibold text-brand-white mb-6 tracking-wider" style={{ fontSize: "16px" }}>
                      Delivery Details
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>FIRST NAME *</label>
                        <input value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red outline-none" required />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>LAST NAME *</label>
                        <input value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red outline-none" required />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>PHONE *</label>
                        <input type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+94 7X XXX XXXX" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red outline-none" required />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>EMAIL</label>
                        <input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider text-black" style={{ letterSpacing: "0.08em" }}>ADDRESS *</label>
                        <input value={form.address} onChange={(e) => updateForm("address", e.target.value)} placeholder="Street address, apartment, etc." className="w-full px-4 py-3 rounded-xl text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>CITY *</label>
                        <input value={form.city} onChange={(e) => updateForm("city", e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>DISTRICT</label>
                        <input value={form.district} onChange={(e) => updateForm("district", e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>ORDER NOTES (optional)</label>
                        <textarea value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} rows={3} placeholder="Any special instructions..." className="w-full px-4 py-3 rounded-xl text-sm resize-none text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red outline-none" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!form.firstName || !form.lastName || !form.phone || !form.address || !form.city) {
                        toast.error("Please fill in all required fields");
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full py-4 font-heading font-semibold text-white rounded-xl tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[0.99]"
                    style={{ background: "#991B1B", fontSize: "13px", letterSpacing: "0.12em" }}
                  >
                    CONTINUE TO PAYMENT <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* ── STEP 2: PAYMENT ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
                    <h2 className="font-heading font-semibold text-brand-white mb-6 tracking-wider" style={{ fontSize: "16px" }}>Payment Method</h2>

                    <div className="space-y-3">
                      {[
                        { id: "cod" as const, icon: Truck, label: "Cash on Delivery", desc: "Pay when your order arrives at your door" },
                        { id: "bank_transfer" as const, icon: Banknote, label: "Bank Transfer", desc: "Direct deposit — upload receipt to confirm" },
                        { id: "card" as const, icon: CreditCard, label: "Card Payment", desc: "Powered by PayHere — Visa, Mastercard" },
                      ].map(({ id, icon: Icon, label, desc }) => (
                        <button
                          key={id}
                          onClick={() => setPaymentMethod(id)}
                          id={`payment-${id}`}
                          className={cn(
                            "w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all",
                            paymentMethod === id
                              ? "border-brand-red bg-brand-red/10"
                              : "hover:border-brand-muted/40"
                          )}
                          style={{
                            border: `1px solid ${paymentMethod === id ? "#991B1B" : "rgba(148,163,184,0.15)"}`,
                            background: paymentMethod === id ? "rgba(153,27,27,0.08)" : "rgba(15,23,42,0.5)"
                          }}
                        >
                          <div className={cn(
                            "p-2 rounded-lg",
                            paymentMethod === id ? "bg-brand-red text-white" : "text-brand-muted"
                          )} style={{ background: paymentMethod !== id ? "rgba(30,41,59,0.8)" : undefined }}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-brand-white text-sm">{label}</p>
                            <p className="text-brand-muted text-xs mt-0.5">{desc}</p>
                          </div>
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                            paymentMethod === id ? "border-brand-red" : "border-brand-muted/30"
                          )}>
                            {paymentMethod === id && <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bank Transfer details */}
                  {paymentMethod === "bank_transfer" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-6 rounded-2xl"
                      style={{ background: "rgba(153,27,27,0.08)", border: "1px solid rgba(153,27,27,0.3)" }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading font-semibold text-brand-white">Bank Details</h3>
                        <button
                          onClick={copyBankDetails}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-brand-muted hover:text-brand-white transition-all"
                          style={{ background: "rgba(30,41,59,0.8)" }}
                        >
                          <Copy size={12} /> Copy
                        </button>
                      </div>
                      <div className="space-y-3 font-mono text-sm">
                        {[
                          ["Bank", BANK_DETAILS.bankName],
                          ["Account Name", BANK_DETAILS.accountName],
                          ["Account No.", BANK_DETAILS.accountNumber],
                          ["Branch", BANK_DETAILS.branch],
                          ["Reference", orderId],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-4">
                            <span className="text-brand-muted text-xs">{k}</span>
                            <span className="text-brand-white text-xs font-semibold text-right">{v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <p className="text-brand-muted text-xs mb-3">After payment, confirm via WhatsApp or upload receipt:</p>
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="whatsapp-confirm-btn"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                            style={{ background: "#25D366" }}
                          >
                            <MessageCircle size={16} /> WhatsApp
                          </a>
                          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-muted cursor-pointer hover:text-brand-white transition-all"
                            style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.15)" }}>
                            <Upload size={16} />
                            {receiptUploaded ? "✓ Uploaded" : "Upload Receipt"}
                            <input type="file" accept="image/*" className="hidden" onChange={() => setReceiptUploaded(true)} />
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="p-5 rounded-2xl text-center" style={{ background: "rgba(30,41,59,0.3)", border: "1px solid rgba(148,163,184,0.08)" }}>
                      <CreditCard size={32} className="text-brand-muted mx-auto mb-3" />
                      <p className="text-brand-muted text-sm">PayHere integration will be activated when you confirm your order. You will be redirected to the secure payment page.</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-semibold text-brand-muted hover:text-brand-white transition-colors text-sm"
                      style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.15)" }}>
                      Back
                    </button>
                    <button
                      onClick={placeOrder}
                      id="place-order-btn"
                      className="flex-1 py-4 font-heading font-semibold text-white rounded-xl tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[0.99]"
                      style={{ background: "#991B1B", fontSize: "13px", letterSpacing: "0.12em" }}
                    >
                      PLACE ORDER — {formatPrice(total)}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: CONFIRMATION ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(74,222,128,0.15)", border: "2px solid rgba(74,222,128,0.4)" }}
                  >
                    <Check size={36} className="text-green-400" />
                  </motion.div>
                  <h2 className="font-heading font-bold text-brand-white mb-3" style={{ fontSize: "28px" }}>Order Confirmed!</h2>
                  <p className="text-brand-muted mb-2">Thank you for your order.</p>
                  <p className="text-brand-white font-mono mb-8 text-lg">{orderId}</p>

                  {paymentMethod === "bank_transfer" && (
                    <div className="p-5 rounded-2xl mb-8 text-left" style={{ background: "rgba(153,27,27,0.08)", border: "1px solid rgba(153,27,27,0.3)" }}>
                      <p className="text-brand-white font-semibold mb-2">Complete your payment</p>
                      <p className="text-brand-muted text-sm mb-4">Transfer {formatPrice(total)} to the account details above and send your receipt via WhatsApp to confirm your order.</p>
                      <a
                        href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold"
                        style={{ background: "#25D366" }}
                      >
                        <MessageCircle size={18} /> Confirm via WhatsApp
                      </a>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/" className="px-8 py-3 rounded-xl text-sm font-semibold text-brand-muted hover:text-brand-white transition-colors"
                      style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.15)" }}>
                      Back to Home
                    </Link>
                    <Link href="/shop" className="px-8 py-3 rounded-xl text-sm font-heading font-semibold text-white tracking-wider"
                      style={{ background: "#991B1B", letterSpacing: "0.1em" }}>
                      CONTINUE SHOPPING
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          {!orderPlaced && (
            <div>
              <div className="p-6 rounded-2xl sticky top-24" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
                <h3 className="font-heading font-semibold text-brand-white mb-5" style={{ fontSize: "15px" }}>Order Summary</h3>

                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto scrollbar-none">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-muted rounded-full text-xs font-bold text-brand-dark flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-brand-white text-xs font-semibold line-clamp-2">{item.product.name}</p>
                        <p className="text-brand-muted text-xs">{item.size} · {item.color}</p>
                        <p className="text-brand-white text-sm font-bold mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="text-brand-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Delivery</span>
                    <span className={delivery === 0 ? "text-green-400" : "text-brand-white"}>
                      {delivery === 0 ? "Free" : formatPrice(delivery)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
                    <span className="text-brand-white">Total</span>
                    <span className="text-brand-white" style={{ fontSize: "18px" }}>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
