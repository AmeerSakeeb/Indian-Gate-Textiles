"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowDownRight, Eye
} from "lucide-react";
import { ADMIN_STATS, ADMIN_RECENT_ORDERS, ADMIN_TOP_PRODUCTS } from "@/lib/mock-data";
import { formatPrice, cn } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

function StatCard({ title, value, change, positive, prefix = "" }: {
  title: string; value: string | number; change: string; positive: boolean; prefix?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-4 sm:p-6 rounded-2xl h-full flex flex-col justify-between"
      style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.08)" }}
    >
      <div>
        <p className="text-brand-muted text-[10px] sm:text-xs tracking-wider mb-1 uppercase" style={{ letterSpacing: "0.1em" }}>{title}</p>
        <p className="font-heading font-bold text-brand-white mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl break-words">
          {prefix}{typeof value === "number" && title.toLowerCase().includes("revenue") ? formatPrice(value) : value}
        </p>
      </div>
      <div className={cn("flex flex-wrap items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold", positive ? "text-green-400" : "text-red-400")}>
        {positive ? <ArrowUpRight size={12} className="flex-shrink-0" /> : <ArrowDownRight size={12} className="flex-shrink-0" />}
        <span className="truncate">{change} vs last month</span>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    const found = ORDER_STATUSES.find((s) => s.value === status);
    return found?.color ?? "text-brand-muted";
  };

  const getStatusBg = (status: string) => {
    const colors: Record<string, string> = {
      pending: "rgba(251,191,36,0.1)",
      processing: "rgba(59,130,246,0.1)",
      shipped: "rgba(168,85,247,0.1)",
      delivered: "rgba(34,197,94,0.1)",
      cancelled: "rgba(239,68,68,0.1)",
    };
    return colors[status] ?? "rgba(148,163,184,0.1)";
  };

  return (
    <AdminLayoutWrapper title="Dashboard" subtitle="Welcome back, Admin">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {ADMIN_STATS.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              positive={stat.positive}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2">
          <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-brand-white" style={{ fontSize: "16px" }}>Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs text-brand-muted hover:text-brand-white transition-colors">View all →</Link>
            </div>
            <div className="space-y-3 overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth: "500px" }}>
                <thead>
                  <tr className="text-brand-muted text-xs" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                    {["Order ID", "Customer", "Total", "Items", "Payment", "Status", ""].map((h) => (
                      <th key={h} className="text-left pb-3 pr-4 font-medium tracking-wider" style={{ letterSpacing: "0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {ADMIN_RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-brand-dark/30 transition-colors" style={{ borderBottom: "1px solid rgba(148,163,184,0.04)" }}>
                      <td className="py-3 pr-4">
                        <span className="font-mono text-brand-white text-xs">{order.id}</span>
                      </td>
                      <td className="py-3 pr-4 text-brand-muted text-xs">{order.customer}</td>
                      <td className="py-3 pr-4 font-bold text-brand-white">{formatPrice(order.total)}</td>
                      <td className="py-3 pr-4 text-brand-muted text-xs">{order.items}</td>
                      <td className="py-3 pr-4 text-brand-muted text-xs capitalize">{order.paymentMethod}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold capitalize", getStatusColor(order.status))}
                          style={{ background: getStatusBg(order.status) }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <Link href={`/admin/orders?id=${order.id}`} className="inline-block p-1.5 rounded-lg text-brand-muted hover:text-brand-white transition-colors" style={{ background: "rgba(15,23,42,0.6)" }}>
                          <Eye size={13} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div>
          <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-brand-white" style={{ fontSize: "16px" }}>Top Products</h2>
              <Link href="/admin/products" className="text-xs text-brand-muted hover:text-brand-white transition-colors">View all →</Link>
            </div>
            <div className="space-y-4">
              {ADMIN_TOP_PRODUCTS.map((product, i) => (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="text-brand-muted font-bold w-5 text-xs">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-white text-sm font-semibold truncate">{product.name}</p>
                    <p className="text-brand-muted text-xs">{product.sold} sold · {formatPrice(product.revenue)}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-1.5 rounded-full" style={{ background: "rgba(148,163,184,0.1)" }}>
                      <div
                        className="h-1.5 rounded-full bg-brand-red"
                        style={{ width: `${Math.min(100, (product.sold / 120) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender split */}
          <div className="p-4 sm:p-6 rounded-2xl mt-4" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <h3 className="font-heading font-semibold text-brand-white mb-5 text-sm">Sales by Gender</h3>
            <div className="space-y-3">
              {[
                { label: "Men", pct: 55, color: "#3B82F6" },
                { label: "Women", pct: 35, color: "#EC4899" },
                { label: "Kids", pct: 10, color: "#F59E0B" },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-brand-muted">{label}</span>
                    <span className="text-brand-white font-semibold">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "rgba(148,163,184,0.1)" }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
