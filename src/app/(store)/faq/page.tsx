"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

const FAQ_CATEGORIES = [
  { id: "all", name: "All FAQs" },
  { id: "shipping", name: "Shipping & Delivery" },
  { id: "orders", name: "Orders & Returns" },
  { id: "sizing", name: "Sizing & Fit" },
  { id: "payments", name: "Payments & Security" },
];

const FAQS = [
  {
    category: "shipping",
    q: "How long does shipping take within Sri Lanka?",
    a: "We deliver island-wide. Delivery within Colombo and suburbs usually takes 1-2 business days. For outstation areas (including Matale, Kandy, Galle, and Jaffna), please allow 3-5 business days.",
  },
  {
    category: "shipping",
    q: "Do you offer international shipping?",
    a: "Currently, we only ship within Sri Lanka. However, we are actively working on international shipping solutions to bring Indian Gate Textiles to our global community soon.",
  },
  {
    category: "shipping",
    q: "How can I track my order?",
    a: "Once your order is dispatched, we will send you a tracking number via SMS and Email. You can use this number on our logistics partner's portal to track your package in real-time.",
  },
  {
    category: "orders",
    q: "What is your return policy?",
    a: "We offer a 14-day return and exchange window for all unworn, unwashed items in their original packaging with tags attached. Items bought on final sale are not eligible for return. Check our full Returns & Exchanges page for more details.",
  },
  {
    category: "orders",
    q: "Can I cancel or modify my order after placing it?",
    a: "Orders are processed quickly. If you need to make changes or cancel, please contact us immediately on WhatsApp (+94 77 XXX XXXX) with your Order ID. Once an order is dispatched, it cannot be modified or cancelled.",
  },
  {
    category: "sizing",
    q: "How do I know which size to purchase?",
    a: "Please refer to our comprehensive Size Guide page, which contains precise measurements for all product types. If you are between sizes, we recommend sizing up for a more relaxed fit.",
  },
  {
    category: "sizing",
    q: "Do your products shrink after washing?",
    a: "We pre-shrunk all premium cotton fabrics used in our t-shirts and hoodies. However, to preserve the lifetime of your garments, we always recommend washing in cold water and hang drying.",
  },
  {
    category: "payments",
    q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard, Cash on Delivery (COD), and Bank Transfers. Select your preferred payment option at checkout.",
  },
  {
    category: "payments",
    q: "Is it safe to pay online on your site?",
    a: "Absolutely. We use PayHere, Sri Lanka's leading secure payment gateway. Your payment details are fully encrypted and never stored on our servers.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen text-brand-white" style={{ background: "#020617" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors mb-8 text-xs tracking-wider"
        >
          <ArrowLeft size={14} /> BACK TO SHOP
        </Link>

        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-brand-red font-semibold tracking-widest mb-3 text-[10px] sm:text-xs">
            HAVE QUESTIONS?
          </p>
          <h1 className="font-heading font-bold mb-4 text-3xl sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-brand-muted max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Everything you need to know about our premium apparel, shipping, sizing, and security.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="space-y-6 mb-10">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none text-white placeholder:text-brand-muted/70 bg-[#1E293B]/40 border border-white/10 focus:border-brand-red transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 justify-center overflow-x-auto pb-2 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all whitespace-nowrap border ${
                  activeCategory === cat.id
                    ? "text-white bg-brand-red/90 border-brand-red/50 shadow-md shadow-brand-red/10"
                    : "text-brand-muted border-white/5 bg-[#1E293B]/20 hover:text-brand-white hover:border-white/10"
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 text-brand-muted"
              >
                No FAQs matched your search. Try searching something else.
              </motion.div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={faq.q}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                    style={{
                      background: isOpen ? "rgba(30,41,59,0.5)" : "rgba(30,41,59,0.2)",
                      borderColor: isOpen ? "rgba(153,27,27,0.3)" : "rgba(255,255,255,0.05)"
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left select-none gap-4 group"
                    >
                      <span className="font-semibold text-sm sm:text-base group-hover:text-brand-red transition-colors duration-200">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-brand-muted flex-shrink-0"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 pt-1 text-sm sm:text-[15px] text-brand-muted leading-relaxed border-t border-white/5">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Contact Banner */}
        <div className="mt-16 p-8 rounded-3xl border border-white/5 text-center space-y-4" style={{ background: "rgba(30,41,59,0.2)" }}>
          <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto text-brand-red mb-2">
            <HelpCircle size={22} />
          </div>
          <h3 className="font-heading font-bold text-lg">Still have questions?</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto leading-relaxed">
            Our customer care team is available 7 days a week. We usually reply within a few hours.
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
