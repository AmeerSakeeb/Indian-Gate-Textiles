"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Heart, User, MapPin, ChevronRight, LogOut } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";

export default function AccountPage() {
  // Mock logged-in user
  const user = { name: "Kasun Perera", email: "kasun@example.com", initials: "KP" };

  const getStatusStyle = (status: string) => {
    const found = ORDER_STATUSES.find((s) => s.value === status);
    return found?.color ?? "text-brand-muted";
  };

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#020617" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-10"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-xl text-white"
            style={{ background: "linear-gradient(135deg, #991B1B, #B91C1C)" }}
          >
            {user.initials}
          </div>
          <div>
            <h1 className="font-heading font-bold text-brand-white" style={{ fontSize: "24px" }}>
              {user.name}
            </h1>
            <p className="text-brand-muted text-sm">{user.email}</p>
          </div>
          <button className="ml-auto flex items-center gap-2 text-sm text-brand-muted hover:text-brand-white transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {[
                { icon: Package, label: "Orders", href: "/account/orders", active: true },
                { icon: Heart, label: "Wishlist", href: "/account/wishlist" },
                { icon: MapPin, label: "Addresses", href: "/account/addresses" },
                { icon: User, label: "Profile", href: "/account/profile" },
              ].map(({ icon: Icon, label, href, active }) => (
                <Link key={href} href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    active ? "text-brand-white" : "text-brand-muted hover:text-brand-white"
                  }`}
                  style={{ background: active ? "rgba(153,27,27,0.15)" : "transparent", border: active ? "1px solid rgba(153,27,27,0.2)" : "1px solid transparent" }}
                >
                  <Icon size={16} />
                  {label}
                  {active && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Orders */}
          <div className="lg:col-span-3">
            <h2 className="font-heading font-bold text-brand-white mb-6" style={{ fontSize: "22px" }}>
              Recent Orders
            </h2>
            <div className="space-y-4">
              {MOCK_ORDERS.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl flex items-center justify-between gap-4"
                  style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: "rgba(153,27,27,0.1)" }}>
                      <Package size={20} className="text-brand-red" />
                    </div>
                    <div>
                      <p className="font-mono font-semibold text-brand-white text-sm">{order.id}</p>
                      <p className="text-brand-muted text-xs mt-0.5">
                        {formatDate(order.date)} · {order.items} item{order.items > 1 ? "s" : ""} · {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <p className="font-bold text-brand-white">{formatPrice(order.total)}</p>
                      <p className={`text-xs font-semibold capitalize ${getStatusStyle(order.status)}`}>
                        ● {order.status}
                      </p>
                    </div>
                    <Link href={`/account/orders/${order.id}`}
                      className="p-2 rounded-lg text-brand-muted hover:text-brand-white transition-colors"
                      style={{ background: "rgba(30,41,59,0.6)" }}>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
