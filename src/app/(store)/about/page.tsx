"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Sparkles, MapPin, ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    description: "From pre-shrunk premium cotton to extra-reinforced stitching, we ensure every garment is built to stand the test of time.",
  },
  {
    icon: Heart,
    title: "Sri Lankan Heritage",
    description: "Proudly designed and manufactured in Matale, supporting our local community and celebrating Sri Lankan craftsmanship.",
  },
  {
    icon: Sparkles,
    title: "Modern Aesthetics",
    description: "We blend timeless streetwear silhouettes with high-fashion luxury details, tailored specifically for the discerning eye.",
  },
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="pt-24 min-h-screen text-brand-white" style={{ background: "#020617" }}>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-brand-red font-semibold tracking-widest mb-4 text-xs">
              ESTABLISHED 2024
            </p>
            <h1 className="font-heading font-bold mb-6 text-4xl sm:text-6xl leading-tight">
              Crafting Sri Lanka&apos;s Premium Wardrobe Essentials
            </h1>
            <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Indian Gate Textiles was born in the heart of Matale with a vision to redefine local luxury streetwear. 
              We don&apos;t do fast fashion. We create pieces that tell a story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 border-t border-white/5 bg-slate-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Story Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=85"
                alt="Crafting Indian Gate apparel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
            </motion.div>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-heading font-bold text-2xl sm:text-4xl">
                Born in Matale, <span className="text-brand-red">Built to Last.</span>
              </h2>
              <div className="space-y-4 text-brand-muted text-sm sm:text-base leading-relaxed">
                <p>
                  Our journey started with a simple observation: it was difficult to find streetwear that offered both high durability and tailored fitting in Sri Lanka.
                </p>
                <p>
                  We decided to change that. By sourcing the finest ethically-grown organic cotton yarns, utilizing reactive dye technologies for long-lasting color, and working hand-in-hand with talented local tailors, we created Indian Gate Textiles.
                </p>
                <p>
                  Every hoodie, t-shirt, and accessory is customized, tested for shrinkage, and hand-finished in our Matale atelier. We control the entire process to guarantee an immaculate fit.
                </p>
              </div>

              {/* Quick Stat Grid */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-bold text-white">100%</h4>
                  <p className="text-xs text-brand-muted mt-1">Premium Yarns</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-bold text-white">Matale</h4>
                  <p className="text-xs text-brand-muted mt-1">Ethical Atelier</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-heading font-bold text-white">0%</h4>
                  <p className="text-xs text-brand-muted mt-1">Fast-Fashion Waste</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-2xl sm:text-4xl mb-4">Our Core Philosophy</h2>
            <p className="text-brand-muted text-sm sm:text-base max-w-md mx-auto">
              Our standards are high because we believe that what you wear is a statement of your personal values.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  variants={itemVariants}
                  className="p-8 rounded-2xl border border-white/5 space-y-4 hover:border-brand-red/35 transition-all duration-300 bg-[#1E293B]/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-brand-white">{val.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Manufacturing Highlight */}
      <section className="py-20 border-t border-white/5 bg-[#1E293B]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-16 h-16 rounded-full bg-brand-red/15 flex items-center justify-center mx-auto text-brand-red mb-2">
            <Award size={32} />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl max-w-2xl mx-auto leading-tight">
            We are redefining standards, stitch by stitch.
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            All our hoodies and knit items are made using heavy-weight, luxury loopback cotton fleece. 
            We implement dual-needle flatlock seams and signature back-neck shoulder tape. You will feel the difference the second you touch it.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red/90 text-white font-heading font-semibold rounded-xl tracking-wider text-xs transition-all hover:scale-[1.02] shadow-lg shadow-brand-red/10"
            >
              BROWSE COLLECTION <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
