"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Instagram, MessageCircle, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND } from "@/lib/constants";

type Props = { isOpen: boolean; onClose: () => void };

export default function MobileNav({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-80 max-w-full z-50 flex flex-col"
            style={{ background: "#0F172A", borderLeft: "1px solid rgba(148,163,184,0.1)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
              <div>
                <p className="font-heading font-bold tracking-widest text-brand-white" style={{ fontSize: "14px", letterSpacing: "0.2em" }}>
                  INDIAN GATE
                </p>
                <p className="text-brand-muted tracking-widest" style={{ fontSize: "8px", letterSpacing: "0.3em" }}>TEXTILES</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-brand-muted hover:text-brand-white transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
            {/* Home — always first */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
              >
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-3 py-3 font-heading font-semibold tracking-widest transition-colors text-brand-white hover:text-brand-red"
                  style={{ fontSize: "13px", letterSpacing: "0.15em", borderBottom: "1px solid rgba(148,163,184,0.06)" }}
                >
                  <Home size={15} className="flex-shrink-0 opacity-60" />
                  HOME
                </Link>
              </motion.div>

              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 text-brand-muted hover:text-brand-white transition-colors font-heading font-semibold tracking-widest"
                    style={{ fontSize: "13px", letterSpacing: "0.15em", borderBottom: "1px solid rgba(148,163,184,0.06)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }}
                className="mt-6"
              >
                <Link
                  href="/account"
                  onClick={onClose}
                  className="block py-3 text-brand-muted hover:text-brand-white transition-colors font-heading font-semibold tracking-widest"
                  style={{ fontSize: "13px", letterSpacing: "0.15em", borderBottom: "1px solid rgba(148,163,184,0.06)" }}
                >
                  My Account
                </Link>
              </motion.div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-6" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
              <div className="flex gap-4 mb-4">
                <a
                  href={BRAND.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-brand-muted hover:text-brand-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-brand-muted hover:text-brand-white transition-colors"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
              <p className="text-brand-muted" style={{ fontSize: "11px" }}>
                © 2026 Indian Gate Textiles. All rights reserved.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
