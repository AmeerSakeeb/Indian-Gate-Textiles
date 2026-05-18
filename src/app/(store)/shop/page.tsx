"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { SIZES, SHOP_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gender = searchParams.get("gender") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") ?? "featured") as SortOption;
  const searchQ = searchParams.get("q") ?? "";

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Filter products
  let products = MOCK_PRODUCTS;

  if (gender) {
    products = products.filter((p) =>
      p.tags.includes(gender) || p.category === gender
    );
  }
  if (category === "new-arrivals") {
    products = products.filter((p) => p.isNew);
  } else if (category === "sale") {
    products = products.filter((p) => p.isSale);
  } else if (category) {
    products = products.filter((p) => p.category === category);
  }
  if (searchQ) {
    const q = searchQ.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }
  if (selectedSizes.length > 0) {
    products = products.filter((p) =>
      selectedSizes.some((s) => p.sizes.includes(s))
    );
  }

  // Sort
  if (sort === "newest") products = [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  else if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
  else products = [...products].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

  const activeFilters = [
    gender && `Gender: ${gender}`,
    category && `Category: ${category}`,
    ...selectedSizes.map((s) => `Size: ${s}`),
  ].filter(Boolean);

  const clearAll = () => {
    setSelectedSizes([]);
    router.push(pathname, { scroll: false });
  };

  const pageTitle =
    gender
      ? SHOP_SECTIONS.find((s) => s.slug === gender)?.name ?? "Shop"
      : category === "new-arrivals"
        ? "New Arrivals"
        : category === "sale"
          ? "Sale"
          : MOCK_CATEGORIES.find((c) => c.slug === category)?.name ?? "All Products";

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#020617" }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-2">
          <p className="text-brand-muted tracking-widest" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
            INDIAN GATE TEXTILES
          </p>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="font-heading font-bold text-brand-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {pageTitle}
          </h1>
          <p className="text-brand-muted hidden sm:block" style={{ fontSize: "14px" }}>
            {products.length} products
          </p>
        </div>

        {/* Gender tabs */}
        <div className="flex gap-1 mt-8 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => updateParam("gender", "")}
            className={cn(
              "px-5 py-2 rounded-xl text-sm font-semibold tracking-wider transition-all whitespace-nowrap",
              !gender
                ? "text-white"
                : "text-brand-muted hover:text-brand-white"
            )}
            style={!gender
              ? { background: "rgba(153,27,27,0.9)", fontSize: "12px", letterSpacing: "0.08em" }
              : { background: "rgba(30,41,59,0.5)", fontSize: "12px", letterSpacing: "0.08em" }}
          >
            ALL
          </button>
          {SHOP_SECTIONS.slice(0, 3).map((s) => (
            <button
              key={s.slug}
              onClick={() => updateParam("gender", s.slug)}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-semibold tracking-wider transition-all whitespace-nowrap",
                gender === s.slug
                  ? "text-white"
                  : "text-brand-muted hover:text-brand-white"
              )}
              style={gender === s.slug
                ? { background: "rgba(153,27,27,0.9)", fontSize: "12px", letterSpacing: "0.08em" }
                : { background: "rgba(30,41,59,0.5)", fontSize: "12px", letterSpacing: "0.08em" }}
            >
              {s.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between mt-6 gap-4 flex-wrap">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => updateParam("category", category === cat.slug ? "" : cat.slug)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all",
                  category === cat.slug
                    ? "text-white bg-brand-dark border border-brand-red"
                    : "text-brand-muted border hover:text-brand-white"
                )}
                style={{ borderColor: "rgba(148,163,184,0.15)", fontSize: "11px", letterSpacing: "0.08em" }}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort + Filter */}
          <div className="flex items-center gap-3 ml-auto">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="px-4 py-2 rounded-lg text-sm text-brand-muted cursor-pointer"
              style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.15)", outline: "none" }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low–High</option>
              <option value="price-desc">Price: High–Low</option>
            </select>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
              style={{
                background: filtersOpen ? "rgba(153,27,27,0.2)" : "rgba(30,41,59,0.8)",
                border: `1px solid ${filtersOpen ? "rgba(153,27,27,0.5)" : "rgba(148,163,184,0.15)"}`,
                color: filtersOpen ? "#F8FAFC" : "#94A3B8"
              }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {selectedSizes.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-brand-red text-white text-xs rounded-full">
                  {selectedSizes.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {activeFilters.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 px-3 py-1 text-xs text-brand-muted rounded-lg"
                style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.12)" }}
              >
                {f}
              </span>
            ))}
            <button onClick={clearAll} className="text-xs text-brand-red hover:text-red-400 transition-colors">
              Clear all
            </button>
          </div>
        )}

        {/* Filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-6 p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
                <div>
                  <h3 className="font-heading font-semibold text-brand-white mb-4 tracking-wider" style={{ fontSize: "12px", letterSpacing: "0.15em" }}>SIZE</h3>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes((prev) =>
                          prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                        )}
                        className={cn(
                          "w-12 h-12 rounded-xl text-sm font-semibold transition-all",
                          selectedSizes.includes(size)
                            ? "bg-brand-red text-white"
                            : "text-brand-muted hover:text-brand-white"
                        )}
                        style={!selectedSizes.includes(size)
                          ? { background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.15)" }
                          : {}}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-brand-muted text-lg mb-4">No products found</p>
            <button onClick={clearAll} className="text-brand-red hover:text-red-400 transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen" style={{ background: "#020617" }} />}>
      <ShopContent />
    </Suspense>
  );
}
