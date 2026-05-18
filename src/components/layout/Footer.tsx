"use client";

import Link from "next/link";
import { Instagram, MessageCircle, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ background: "#0F172A", borderTop: "1px solid rgba(148,163,184,0.08)" }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="font-heading font-bold tracking-widest text-brand-white mb-1"
                style={{ fontSize: "18px", letterSpacing: "0.2em" }}>
                INDIAN GATE
              </p>
              <p className="text-brand-muted tracking-widest" style={{ fontSize: "9px", letterSpacing: "0.35em" }}>
                TEXTILES
              </p>
            </div>
            <p className="text-brand-muted leading-relaxed mb-6" style={{ fontSize: "14px" }}>
              Premium fashion crafted for the discerning Sri Lankan. Quality without compromise,
              style without boundaries.
            </p>
            <div className="flex gap-3">
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-brand-muted hover:text-brand-white transition-all duration-200 group"
                style={{ background: "rgba(30,41,59,0.8)" }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-brand-muted hover:text-brand-white transition-all duration-200"
                style={{ background: "rgba(30,41,59,0.8)" }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-heading font-semibold text-brand-white mb-6 tracking-widest"
              style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
              SHOP
            </h3>
            <ul className="space-y-3">
              {[
                ["New Arrivals", "/shop?category=new-arrivals"],
                ["T-Shirts", "/shop?category=t-shirts"],
                ["Hoodies", "/shop?category=hoodies"],
                ["Shirts", "/shop?category=shirts"],
                ["Trousers", "/shop?category=trousers"],
                ["Outerwear", "/shop?category=outerwear"],
                ["Accessories", "/shop?category=accessories"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-brand-muted hover:text-brand-white transition-colors duration-200"
                    style={{ fontSize: "14px" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-heading font-semibold text-brand-white mb-6 tracking-widest"
              style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
              HELP
            </h3>
            <ul className="space-y-3">
              {[
                ["FAQ", "/shop"],
                ["Shipping Policy", "/shipping-policy"],
                ["Returns & Exchanges", "/returns"],
                ["Size Guide", "/size-guide"],
                ["Contact Us", "/contact"],
                ["About Us", "/shop"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-brand-muted hover:text-brand-white transition-colors duration-200"
                    style={{ fontSize: "14px" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-brand-white mb-6 tracking-widest"
              style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-brand-muted" style={{ fontSize: "14px" }}>
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-red" />
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-white transition-colors"
                >
                  {BRAND.address}
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-muted" style={{ fontSize: "14px" }}>
                <Phone size={16} className="flex-shrink-0 text-brand-red" />
                <a href={`tel:${BRAND.phone}`}
                  className="hover:text-brand-white transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-muted" style={{ fontSize: "14px" }}>
                <Mail size={16} className="flex-shrink-0 text-brand-red" />
                <a href={`mailto:${BRAND.email}`}
                  className="hover:text-brand-white transition-colors">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-muted" style={{ fontSize: "14px" }}>
                <MessageCircle size={16} className="flex-shrink-0 text-brand-red" />
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={{ borderTop: "1px solid rgba(148,163,184,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {["Cash on Delivery", "Bank Transfer", "PayHere"].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 text-xs text-brand-muted rounded"
                  style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(148,163,184,0.1)" }}
                >
                  {method}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-brand-muted" style={{ fontSize: "12px" }}>
              <Link href="/privacy-policy" className="hover:text-brand-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-brand-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: "1px solid rgba(148,163,184,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-brand-muted" style={{ fontSize: "12px" }}>
            © 2026 Indian Gate Textiles. All rights reserved. Matale, Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
}
