"use client";

import { motion } from "framer-motion";
import { RefreshCcw, ClipboardList, CheckCircle, PackageOpen, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const RETURN_STEPS = [
  {
    icon: ClipboardList,
    title: "1. Request Return",
    description: "Send us a message on WhatsApp or email with your Order ID, detailing the product you want to return or exchange and the reason.",
  },
  {
    icon: PackageOpen,
    title: "2. Prepare Package",
    description: "Ensure the item is unworn, unwashed, and in its original packaging with all Indian Gate Textiles tags intact.",
  },
  {
    icon: RefreshCcw,
    title: "3. Exchange / Refund",
    description: "Once we receive and inspect your package, we will dispatch your exchange item or process your refund bank transfer within 3 days.",
  },
];

export default function ReturnsPolicyPage() {
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
            HASSLE-FREE RETURNS
          </p>
          <h1 className="font-heading font-bold mb-4 text-3xl sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Returns & Exchanges Policy
          </h1>
          <p className="text-brand-muted max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Your satisfaction is our priority. If your purchase doesn&apos;t fit or isn&apos;t quite what you expected, we are here to help.
          </p>
        </div>

        {/* Return Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RETURN_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl border border-white/5 space-y-4 hover:border-brand-red/30 transition-all duration-300 bg-[#1E293B]/20"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-base text-brand-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Guidelines */}
        <div className="p-8 rounded-3xl border border-white/5 bg-[#1E293B]/10 space-y-6">
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">Return Eligibility</h2>
            <ul className="space-y-2.5 text-brand-muted text-sm sm:text-[15px] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>Items must be returned within **14 days** of the delivery date.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>Garments must be **unworn, unwashed**, and free of perfume, stains, or damage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>All original tags, bags, and labels must be securely attached.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
                <span>Discounted items purchased during &quot;Final Sale&quot; events are not eligible for return or exchange.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">Sizing Exchanges</h2>
            <p className="text-brand-muted text-sm sm:text-[15px] leading-relaxed">
              Want a different size or color? We offer **free standard shipping** on replacement items. Simply follow the standard return process to send the incorrect size back to us, and we will send out your new size as soon as we receive your return.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">Refunds (If Applicable)</h2>
            <p className="text-brand-muted text-sm sm:text-[15px] leading-relaxed">
              If you request a refund instead of an exchange, we will transfer the purchase amount back to your bank account within **3 business days** after verifying the returned item. 
              Please note that original shipping fees are non-refundable, and return shipping costs are the responsibility of the customer unless the item delivered was defective.
            </p>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="p-8 rounded-3xl border border-white/5 text-center space-y-4" style={{ background: "rgba(30,41,59,0.2)" }}>
          <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto text-brand-red mb-2">
            <HelpCircle size={22} />
          </div>
          <h3 className="font-heading font-bold text-lg">Need to process a return?</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto leading-relaxed">
            Message us directly on WhatsApp with your Order ID, and we will guide you step-by-step.
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
