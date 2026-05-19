"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            <Shield size={22} />
          </div>
          <p className="text-brand-red font-semibold tracking-widest mb-3 text-xs">
            SECURITY & CONFIDENCE
          </p>
          <h1 className="font-heading font-bold mb-4 text-3xl sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Privacy Policy
          </h1>
          <p className="text-brand-muted text-xs sm:text-sm">
            Last Updated: May 19, 2026
          </p>
        </div>

        {/* Policy Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-brand-muted text-sm sm:text-base leading-relaxed"
        >
          
          <motion.section variants={itemVariants} className="space-y-3">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white flex items-center gap-2">
              <Eye size={18} className="text-brand-red" />
              1. Information We Collect
            </h2>
            <p>
              We collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>**Personal details** such as your name, delivery address, phone number, and email address provided during checkout or account registration.</li>
              <li>**Transaction data** related to purchases you make on our website, excluding actual payment card details (which are securely processed directly by our payment processor, PayHere).</li>
              <li>**Device and browser information** such as your IP address, browser type, and page interaction data, which we use to improve website functionality and user experience.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white flex items-center gap-2">
              <Lock size={18} className="text-brand-red" />
              2. How We Use Your Information
            </h2>
            <p>
              We strictly use your information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>To **process and deliver your orders** and send you related shipping updates via Email/SMS.</li>
              <li>To **provide customer support** and answer your questions on WhatsApp or email.</li>
              <li>To **send newsletters and marketing campaigns** if you have explicitly joined our Inner Circle newsletter (you can unsubscribe at any time via the link in the emails).</li>
              <li>To **prevent fraud** and maintain the security of our platform.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white flex items-center gap-2">
              <FileText size={18} className="text-brand-red" />
              3. Information Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal data. We only share information with third parties who help us operate our store, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Our **delivery and logistics partners** (e.g. Prompt Xpress or Domex) who require your name, address, and phone number to fulfill deliveries within Sri Lanka.</li>
              <li>Our **payment gateway provider**, PayHere, to securely authorize your credit card transactions.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 pt-6 border-t border-white/5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white">
              4. Data Retention & Security
            </h2>
            <p>
              We store your personal transaction history securely inside protected servers. We use industry-standard SSL encryption across our entire site to prevent unauthorized data access. 
              If you wish to have your account or personal details permanently deleted from our records, please contact us at support@indiangatetextiles.com.
            </p>
          </motion.section>

        </motion.div>

      </div>
    </div>
  );
}
