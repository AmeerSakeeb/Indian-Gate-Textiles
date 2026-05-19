"use client";

import { motion } from "framer-motion";
import { Scale, BookOpen, AlertCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="pt-24 min-h-screen text-brand-white" style={{ background: "#020617" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors text-xs tracking-wider"
        >
          <ArrowLeft size={14} /> BACK TO SHOP
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto text-brand-red mb-4">
            <Scale size={22} />
          </div>
          <p className="text-brand-red font-semibold tracking-widest mb-3 text-xs">
            LEGAL AGREEMENT
          </p>
          <h1 className="font-heading font-bold mb-4 text-3xl sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Terms of Service
          </h1>
          <p className="text-brand-muted text-xs sm:text-sm">
            Last Updated: May 19, 2026
          </p>
        </div>

        {/* Terms Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-brand-muted text-sm sm:text-base leading-relaxed"
        >
          
          <motion.section variants={itemVariants} className="space-y-3">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white flex items-center gap-2">
              <BookOpen size={18} className="text-brand-red" />
              1. Scope & Definitions
            </h2>
            <p>
              Welcome to Indian Gate Textiles. These Terms of Service (&quot;Terms&quot;) govern your use of our website located at Matale, Sri Lanka and the purchase of our premium apparel products. By accessing our site or making a purchase, you agree to be bound by these Terms.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white flex items-center gap-2">
              <ShoppingBag size={18} className="text-brand-red" />
              2. Orders, Pricing & Availability
            </h2>
            <p>
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including errors in pricing or product descriptions, or suspicions of fraudulent resale.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>All prices are in **Sri Lankan Rupees (LKR)** and are subject to change without prior notice.</li>
              <li>We make every effort to display garment colors as accurately as possible. However, we cannot guarantee that your monitor or phone screen will reflect the exact shades.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white flex items-center gap-2">
              <AlertCircle size={18} className="text-brand-red" />
              3. Payments & Secure Transactions
            </h2>
            <p>
              We offer Cash on Delivery (COD), online credit card processing via **PayHere**, and direct bank transfers. You agree to provide current, complete, and accurate purchase and account information. 
              In the event of a payment dispute, we reserve the right to pause shipment until funds are cleared.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">
              4. Shipping & Returns
            </h2>
            <p>
              Deliveries are handled by trusted domestic courier services. Estimated shipping times are approximations. Indian Gate Textiles is not responsible for delayed deliveries caused by courier capacity issues or severe weather conditions.
              For all returns and exchanges, please refer directly to our comprehensive [Returns & Exchanges](/returns) policy.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">
              5. Intellectual Property
            </h2>
            <p>
              All content on this site, including but not limited to brand logos, names, product photos, graphics, text, and code, is the exclusive intellectual property of Indian Gate Textiles. Any unauthorized reproduction, distribution, or resale is strictly prohibited.
            </p>
          </motion.section>

        </motion.div>

      </div>
    </div>
  );
}
