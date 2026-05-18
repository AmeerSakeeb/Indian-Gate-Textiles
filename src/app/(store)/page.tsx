"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_TESTIMONIALS, INSTAGRAM_POSTS } from "@/lib/mock-data";
import { BRAND } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";
import type { Metadata } from "next";

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=90"
          alt="INDIAN GATE Textiles hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.2) 40%, rgba(2,6,23,0.8) 100%)"
        }} />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4 max-w-4xl mx-auto" style={{ opacity }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-brand-muted tracking-widest mb-6"
          style={{ fontSize: "11px", letterSpacing: "0.4em" }}
        >
          MATALE · SRI LANKA · EST. 2024
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="font-heading font-bold text-brand-white mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          INDIAN GATE
          <br />
          <span style={{ color: "rgba(248,250,252,0.7)" }}>TEXTILES</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-brand-muted mb-10 max-w-lg mx-auto leading-relaxed"
          style={{ fontSize: "16px" }}
        >
          {BRAND.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/shop"
            id="hero-shop-btn"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-heading font-semibold rounded-xl tracking-widest transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "#991B1B", fontSize: "12px", letterSpacing: "0.15em" }}
          >
            SHOP NOW
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            id="hero-story-btn"
            className="inline-flex items-center justify-center px-8 py-4 font-heading font-semibold rounded-xl tracking-widest transition-all duration-300 hover:bg-white/10"
            style={{
              border: "1px solid rgba(248,250,252,0.3)",
              color: "#F8FAFC",
              fontSize: "12px",
              letterSpacing: "0.15em",
              backdropFilter: "blur(8px)"
            }}
          >
            OUR STORY
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-brand-muted"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}

// ─── FEATURED CATEGORIES ──────────────────────────────────────────────────────
function FeaturedCategories() {
  const featured = MOCK_CATEGORIES.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-brand-muted tracking-widest mb-2" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
            BROWSE
          </p>
          <h2 className="font-heading font-bold text-brand-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Shop by Category
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden sm:flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors group"
          style={{ fontSize: "13px" }}
        >
          View all
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              id={`category-card-${cat.slug}`}
              className="group relative block overflow-hidden rounded-2xl"
              style={{ aspectRatio: i === 0 || i === 3 ? "3/4" : "1/1" }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.1) 60%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-heading font-bold text-brand-white mb-1" style={{ fontSize: "18px" }}>
                  {cat.name}
                </p>
                <p className="text-brand-muted text-xs">{cat.count} products</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── TRENDING PRODUCTS ────────────────────────────────────────────────────────
function TrendingProducts() {
  const trending = MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-20 lg:py-28" style={{ background: "rgba(15,23,42,0.5)" }}>
      <div className="px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-brand-muted tracking-widest mb-2" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
              BESTSELLERS
            </p>
            <h2 className="font-heading font-bold text-brand-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Trending Now
            </h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors group" style={{ fontSize: "13px" }}>
            View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────
function PromoBanner() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl"
          style={{ minHeight: "400px" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
            alt="Promotion"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(153,27,27,0.85) 0%, rgba(2,6,23,0.8) 60%)"
          }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-red-200 tracking-widest mb-3"
              style={{ fontSize: "11px", letterSpacing: "0.35em" }}
            >
              LIMITED TIME
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              Free Delivery
              <br />
              Over {formatPrice(15000)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-red-100 mb-8 max-w-md"
              style={{ fontSize: "16px", opacity: 0.85 }}
            >
              Island-wide delivery. Fast, tracked, and insured.
            </motion.p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white font-heading font-semibold rounded-xl tracking-widest transition-all hover:scale-[1.02]"
              style={{ color: "#991B1B", fontSize: "12px", letterSpacing: "0.15em" }}
            >
              SHOP NOW <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NEW ARRIVALS ─────────────────────────────────────────────────────────────
function NewArrivals() {
  const newProducts = MOCK_PRODUCTS.filter((p) => p.isNew);

  return (
    <section className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-brand-muted tracking-widest mb-2" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
            JUST IN
          </p>
          <h2 className="font-heading font-bold text-brand-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            New Arrivals
          </h2>
        </div>
        <Link href="/shop?sort=newest" className="hidden sm:flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors group" style={{ fontSize: "13px" }}>
          View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {newProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── BRAND STORY ─────────────────────────────────────────────────────────────
function BrandStory() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "rgba(15,23,42,0.6)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=85"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div
              className="absolute -bottom-6 -right-6 p-5 rounded-2xl hidden md:block"
              style={{ background: "#991B1B", maxWidth: "180px" }}
            >
              <p className="font-heading font-bold text-white mb-1" style={{ fontSize: "28px" }}>2024</p>
              <p className="text-red-200 text-xs">Founded in Matale</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <p className="text-brand-muted tracking-widest mb-4" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
              OUR STORY
            </p>
            <h2 className="font-heading font-bold text-brand-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
              Born in Matale.
              <br />
              <span style={{ color: "#991B1B" }}>Built to Last.</span>
            </h2>
            <div className="space-y-4 text-brand-muted" style={{ fontSize: "16px", lineHeight: 1.8 }}>
              <p>
                Indian Gate Textiles was born from a simple belief: Sri Lankans deserve access to
                world-class quality clothing without the world-class price tag.
              </p>
              <p>
                Every piece we create is thoughtfully designed and rigorously crafted — from the
                weight of the fabric to the tension of every stitch. We don&apos;t do fast fashion.
                We do lasting fashion.
              </p>
              <p>
                Located in the heart of Matale, we&apos;re proud to be a homegrown brand that
                represents Sri Lanka on a global stage.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-heading font-semibold text-white rounded-xl tracking-wider transition-all hover:scale-[1.02]"
                style={{ background: "#991B1B", fontSize: "12px", letterSpacing: "0.12em" }}
              >
                READ OUR STORY <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-brand-muted tracking-widest mb-3" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>REVIEWS</p>
        <h2 className="font-heading font-bold text-brand-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          What Our Customers Say
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="p-8 rounded-2xl flex flex-col gap-4"
            style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)" }}
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <span key={s} className="text-amber-400" style={{ fontSize: "14px" }}>★</span>
              ))}
            </div>
            <p className="text-brand-muted leading-relaxed flex-1" style={{ fontSize: "15px", lineHeight: 1.75 }}>
              &quot;{t.text}&quot;
            </p>
            <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="font-semibold text-brand-white" style={{ fontSize: "14px" }}>{t.name}</p>
                <p className="text-brand-muted" style={{ fontSize: "12px" }}>{t.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── INSTAGRAM GALLERY ────────────────────────────────────────────────────────
function InstagramGallery() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "rgba(15,23,42,0.4)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-brand-muted tracking-widest mb-3" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>FOLLOW US</p>
          <h2 className="font-heading font-bold text-brand-white mb-2" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            @indiangatetextiles
          </h2>
          <p className="text-brand-muted" style={{ fontSize: "14px" }}>Tag us in your fits</p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {INSTAGRAM_POSTS.map((url, i) => (
            <motion.a
              key={i}
              href={BRAND.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-xl group block"
              style={{ aspectRatio: "1/1" }}
            >
              <Image
                src={url}
                alt={`Instagram post ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-all duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function Newsletter() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-brand-muted tracking-widest mb-4" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
            STAY IN THE LOOP
          </p>
          <h2 className="font-heading font-bold text-brand-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Join the Inner Circle
          </h2>
          <p className="text-brand-muted mb-8" style={{ fontSize: "16px" }}>
            Be the first to know about new drops, exclusive offers, and behind-the-scenes stories.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              id="newsletter-email"
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 rounded-xl text-sm"
              style={{
                background: "rgba(30,41,59,0.8)",
                border: "1px solid rgba(148,163,184,0.15)",
                color: "#F8FAFC",
                outline: "none"
              }}
            />
            <button
              type="submit"
              id="newsletter-submit"
              className="px-7 py-4 font-heading font-semibold text-white rounded-xl tracking-wider transition-all hover:scale-[1.02]"
              style={{ background: "#991B1B", fontSize: "12px", letterSpacing: "0.12em", whiteSpace: "nowrap" }}
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-brand-muted mt-4" style={{ fontSize: "12px" }}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <PromoBanner />
      <NewArrivals />
      <BrandStory />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
