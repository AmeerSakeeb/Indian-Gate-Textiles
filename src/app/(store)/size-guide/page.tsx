"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, Sparkles, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "tops", name: "T-Shirts & Tops" },
  { id: "hoodies", name: "Hoodies & Fleeces" },
  { id: "trousers", name: "Trousers & Bottoms" },
];

const MEASUREMENTS = {
  tops: [
    { size: "S", chest: '36" - 38"', length: '27.5"', shoulder: '17"' },
    { size: "M", chest: '38" - 40"', length: '28.5"', shoulder: '18"' },
    { size: "L", chest: '40" - 42"', length: '29.5"', shoulder: '19"' },
    { size: "XL", chest: '42" - 44"', length: '30.5"', shoulder: '20"' },
    { size: "XXL", chest: '44" - 46"', length: '31.5"', shoulder: '21"' },
  ],
  hoodies: [
    { size: "S", chest: '38" - 40"', length: '26.5"', sleeve: '24"' },
    { size: "M", chest: '40" - 42"', length: '27.5"', sleeve: '25"' },
    { size: "L", chest: '42" - 44"', length: '28.5"', sleeve: '26"' },
    { size: "XL", chest: '44" - 46"', length: '29.5"', sleeve: '27"' },
    { size: "XXL", chest: '46" - 48"', length: '30.5"', sleeve: '28"' },
  ],
  trousers: [
    { size: "S", waist: '28" - 30"', length: '39.5"', hip: '38"' },
    { size: "M", waist: '30" - 32"', length: '40.5"', hip: '40"' },
    { size: "L", waist: '32" - 34"', length: '41.5"', hip: '42"' },
    { size: "XL", waist: '34" - 36"', length: '42.5"', hip: '44"' },
    { size: "XXL", waist: '36" - 38"', length: '43.5"', hip: '46"' },
  ],
};

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<"tops" | "hoodies" | "trousers">("tops");

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
          <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto text-brand-red mb-4">
            <Ruler size={22} />
          </div>
          <p className="text-brand-red font-semibold tracking-widest mb-3 text-xs">
            FIND YOUR PERFECT FIT
          </p>
          <h1 className="font-heading font-bold mb-4 text-3xl sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Garment Size Guide
          </h1>
          <p className="text-brand-muted max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            All Indian Gate Textiles garments are custom-cut and tailored. Use our exact measurement charts below to find the perfect silhouette.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 justify-center border-b border-white/5 pb-4 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all whitespace-nowrap border ${
                activeTab === tab.id
                  ? "text-white bg-brand-red/90 border-brand-red/50 shadow-md shadow-brand-red/10"
                  : "text-brand-muted border-white/5 bg-[#1E293B]/20 hover:text-brand-white hover:border-white/10"
              }`}
            >
              {tab.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Measurement Table */}
        <div className="rounded-2xl border border-white/5 overflow-hidden bg-[#1E293B]/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10" style={{ background: "rgba(30,41,59,0.3)" }}>
                    <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Size</th>
                    {activeTab === "tops" && (
                      <>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Chest Fit</th>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Body Length</th>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Shoulder Width</th>
                      </>
                    )}
                    {activeTab === "hoodies" && (
                      <>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Chest Fit</th>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Body Length</th>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Sleeve Length</th>
                      </>
                    )}
                    {activeTab === "trousers" && (
                      <>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Waist Fit</th>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Outseam Length</th>
                        <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold tracking-wider text-brand-white uppercase">Hip Measurement</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(MEASUREMENTS[activeTab] as any[]).map((row, index) => (
                    <tr
                      key={row.size}
                      className="hover:bg-white/5 transition-colors"
                      style={{ background: index % 2 === 0 ? "rgba(30,41,59,0.1)" : "transparent" }}
                    >
                      <td className="p-4 sm:p-5 font-heading font-bold text-sm sm:text-base text-brand-red">{row.size}</td>
                      {activeTab === "tops" && (
                        <>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.chest}</td>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.length}</td>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.shoulder}</td>
                        </>
                      )}
                      {activeTab === "hoodies" && (
                        <>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.chest}</td>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.length}</td>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.sleeve}</td>
                        </>
                      )}
                      {activeTab === "trousers" && (
                        <>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.waist}</td>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.length}</td>
                          <td className="p-4 sm:p-5 text-xs sm:text-sm text-brand-muted">{row.hip}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sizing Tips */}
        <div className="p-8 rounded-3xl border border-white/5 bg-[#1E293B]/10 space-y-6">
          <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-white flex items-center gap-2">
            <Sparkles size={18} className="text-brand-red" />
            Fit & Sizing Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brand-muted leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-white">True to Size</h4>
              <p>
                Our t-shirts and trousers are designed to fit true to size. If you normally wear a Medium, choose Medium for a standard, crisp premium fit.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-white">Relaxed Streetwear Silhouette</h4>
              <p>
                Our hoodies feature a slightly dropped shoulder and a roomy chest for a classic streetwear silhouette. There is no need to size up to achieve a comfortable, modern oversized look.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="p-8 rounded-3xl border border-white/5 text-center space-y-4" style={{ background: "rgba(30,41,59,0.2)" }}>
          <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto text-brand-red mb-2">
            <HelpCircle size={22} />
          </div>
          <h3 className="font-heading font-bold text-lg">Still unsure about your size?</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto leading-relaxed">
            Send us your height, weight, and normal fit preference on WhatsApp, and our stylist will recommend the perfect size for you.
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
