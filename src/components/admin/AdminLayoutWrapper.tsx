"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
  TrendingUp, Bell, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: TrendingUp, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayoutWrapper({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen" style={{ background: "#020617" }}>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ width: "240px", background: "#0F172A", borderRight: "1px solid rgba(148,163,184,0.08)" }}
      >
        {/* Logo */}
        <div className="px-4 py-5" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
          <p className="font-heading font-bold text-brand-white tracking-widest mb-1" style={{ fontSize: "14px", letterSpacing: "0.2em" }}>
            INDIAN GATE
          </p>
          <p className="text-brand-muted tracking-widest mb-4" style={{ fontSize: "8px", letterSpacing: "0.35em" }}>ADMIN PANEL</p>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold text-white transition-all hover:scale-[1.02] w-full"
            style={{ background: "rgba(153,27,27,0.25)", border: "1px solid rgba(153,27,27,0.4)" }}
          >
            <span>←</span>
            Back to Store
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                  isActive ? "text-white bg-brand-red/15 font-semibold" : "text-brand-muted hover:text-brand-white hover:bg-brand-dark/50"
                )}
                style={isActive ? { border: "1px solid rgba(153,27,27,0.25)" } : {}}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom spacer */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
          <p className="text-brand-muted text-[10px] text-center tracking-widest" style={{ letterSpacing: "0.1em" }}>INDIAN GATE © 2024</p>
        </div>
      </aside>

      {/* Sidebar backdrop on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 sticky top-0 z-30"
          style={{ background: "rgba(2,6,23,0.95)", borderBottom: "1px solid rgba(148,163,184,0.08)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-brand-muted hover:text-brand-white flex-shrink-0">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="min-w-0">
              <h1 className="font-heading font-bold text-brand-white truncate text-base sm:text-lg">{title}</h1>
              {subtitle && <p className="text-brand-muted text-[10px] sm:text-xs truncate">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button className="p-2 text-brand-muted hover:text-brand-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-red" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
              style={{ background: "#991B1B" }}>
              A
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
