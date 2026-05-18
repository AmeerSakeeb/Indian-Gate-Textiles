"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { totalItems, toggleCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || !isHome
            ? "glass-dark shadow-xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex flex-col leading-none">
                <span
                  className="font-heading font-700 tracking-widest text-brand-white"
                  style={{ fontSize: "17px", letterSpacing: "0.2em", fontWeight: 700 }}
                >
                  INDIAN GATE
                </span>
                <span
                  className="text-brand-muted tracking-widest"
                  style={{ fontSize: "9px", letterSpacing: "0.35em", fontWeight: 400 }}
                >
                  TEXTILES
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm tracking-wider transition-colors duration-200 relative group",
                    pathname === link.href
                      ? "text-brand-white"
                      : "text-brand-muted hover:text-brand-white"
                  )}
                  style={{ fontWeight: 500, letterSpacing: "0.08em" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-red group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <div className="relative">
                {searchOpen && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center glass rounded-lg overflow-hidden"
                    style={{ width: "220px" }}>
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchVal.trim()) {
                          window.location.href = `/shop?q=${encodeURIComponent(searchVal)}`;
                        }
                        if (e.key === "Escape") setSearchOpen(false);
                      }}
                      placeholder="Search..."
                      className="bg-transparent px-3 py-2 text-sm text-brand-white placeholder-brand-muted outline-none flex-1"
                      style={{ border: "none" }}
                    />
                  </div>
                )}
                <button
                  id="header-search-btn"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-brand-muted hover:text-brand-white transition-colors duration-200 relative z-10"
                  aria-label="Toggle search"
                >
                  {searchOpen ? <X size={20} /> : <Search size={20} />}
                </button>
              </div>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                id="header-wishlist-btn"
                className="p-2 text-brand-muted hover:text-brand-white transition-colors duration-200 relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-brand-red text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                id="header-cart-btn"
                onClick={toggleCart}
                className="p-2 text-brand-muted hover:text-brand-white transition-colors duration-200 relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-brand-red text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                id="header-mobile-menu-btn"
                className="lg:hidden p-2 text-brand-muted hover:text-brand-white transition-colors duration-200"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Mobile Nav */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
