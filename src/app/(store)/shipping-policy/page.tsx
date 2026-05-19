"use client";

import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, MapPin, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const SHIPPING_METHODS = [
  {
    icon: MapPin,
    title: "Colombo & Suburbs",
    time: "1 – 2 Business Days",
    cost: "LKR 350",
    note: "Free shipping for orders over LKR 15,000",
  },
  {
    icon: Truck,
    title: "Outstations (Island-wide)",
    time: "3 – 5 Business Days",
    cost: "LKR 450",
    note: "Includes Kandy, Matale, Galle, Jaffna, etc.",
  },
  {
    icon: Clock,
    title: "Express Shipping",
    time: "Next Day Delivery",
    cost: "LKR 750",
    note: "Available for orders placed before 12:00 PM (Colombo only)",
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="pt-24 min-h-screen text-brand-white" style={{ background: "#020617" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors text-xs tracking-wider"
        >
          <ArrowLeft size={14} /> BACK TO SHOP
        </Link>

        {/* Header */}
        <div className="text-center">
          <p className="text-brand-red font-semibold tracking-widest mb-3 text-xs">
            DELIVERY INFORMATION
          </p>
          <h1 className="font-heading font-bold mb-4 text-3xl sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Shipping & Delivery Policy
          </h1>
          <p className="text-brand-muted max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            We partner with the most reliable local couriers to bring your apparel directly to your doorstep, quickly and safely.
          </p>
        </div>

        {/* Shipping Rates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHIPPING_METHODS.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl border border-white/5 space-y-4 hover:border-brand-red/30 transition-all duration-300 bg-[#1E293B]/20"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-brand-white">{method.title}</h3>
                  <p className="text-xs text-brand-muted mt-0.5">{method.note}</p>
                </div>
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-brand-muted">Delivery Time:</span>
                    <span className="font-medium text-white">{method.time}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-brand-muted">Shipping Cost:</span>
                    <span className="font-semibold text-brand-red">{method.cost}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative text sections */}
        <div className="p-8 rounded-3xl border border-white/5 bg-[#1E293B]/10 space-y-6">
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">Order Processing</h2>
            <p className="text-brand-muted text-sm sm:text-[15px] leading-relaxed">
              All orders are processed and dispatched within 24 hours of confirmation. If you place your order over the weekend or on a public holiday, we will process it on the next business day. 
              You will receive a notification via SMS and Email once your order is shipped, containing your real-time tracking information.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">Cash on Delivery (COD) Guidelines</h2>
            <p className="text-brand-muted text-sm sm:text-[15px] leading-relaxed">
              For your convenience, we offer Cash on Delivery island-wide. Please prepare the exact cash amount for your delivery agent to ensure a seamless drop-off. 
              Our couriers will attempt to contact you prior to delivery. If you are unreachable after three attempts, your order will automatically be returned to our warehouse.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">Free Delivery Offer</h2>
            <p className="text-brand-muted text-sm sm:text-[15px] leading-relaxed">
              We offer free standard island-wide shipping on all orders over **{formatPrice(15000)}**. This discount is automatically applied at checkout — no coupon code required.
            </p>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="p-8 rounded-3xl border border-white/5 text-center space-y-4" style={{ background: "rgba(30,41,59,0.2)" }}>
          <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto text-brand-red mb-2">
            <HelpCircle size={22} />
          </div>
          <h3 className="font-heading font-bold text-lg">Questions about your shipment?</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto leading-relaxed">
            If you need to change your delivery address or enquire about a delayed shipment, contact us directly on WhatsApp.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-red hover:bg-brand-red/90 text-white text-xs font-semibold tracking-wider rounded-xl transition-all"
            >
              CONTACT CUSTOMER CARE
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
