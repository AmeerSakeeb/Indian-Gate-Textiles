"use client";

import { useState } from "react";
import { TrendingUp, Award, ArrowUpRight, DollarSign, Percent, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default function AdminAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30");

  return (
    <AdminLayoutWrapper title="Analytics & Reports" subtitle="Detailed look into sales revenue, shop conversions, and inventory trends">
      <div className="flex flex-col gap-6">
        {/* Controls row */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-brand-muted tracking-wider uppercase">PERFORMANCE REPORTS</h2>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 rounded-xl text-sm text-brand-white outline-none"
            style={{
              background: "rgba(30,41,59,0.5)",
              border: "1px solid rgba(148,163,184,0.1)",
            }}
          >
            <option value="7" className="bg-[#0f172a]">Last 7 Days</option>
            <option value="30" className="bg-[#0f172a]">Last 30 Days</option>
            <option value="90" className="bg-[#0f172a]">Last 90 Days</option>
            <option value="365" className="bg-[#0f172a]">This Year</option>
          </select>
        </div>

        {/* Analytics Key Figures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-brand-muted uppercase font-bold tracking-wider">Gross Profit Margins</span>
              <DollarSign size={18} className="text-green-400" />
            </div>
            <p className="font-heading font-bold text-brand-white mb-2 text-xl sm:text-2xl lg:text-3xl">
              {formatPrice(482100)}
            </p>
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <ArrowUpRight size={14} /> +12.4% vs last month
            </span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-brand-muted uppercase font-bold tracking-wider">Shop Conversion Rate</span>
              <Percent size={18} className="text-blue-400" />
            </div>
            <p className="font-heading font-bold text-brand-white mb-2 text-xl sm:text-2xl lg:text-3xl">
              3.42%
            </p>
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <ArrowUpRight size={14} /> +0.8% vs last month
            </span>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-brand-muted uppercase font-bold tracking-wider">Average Order Value</span>
              <ShoppingBag size={18} className="text-purple-400" />
            </div>
            <p className="font-heading font-bold text-brand-white mb-2 text-xl sm:text-2xl lg:text-3xl">
              {formatPrice(8420)}
            </p>
            <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
              -1.2% vs last month
            </span>
          </div>
        </div>

        {/* Visual Charts simulation */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Chart mock */}
          <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <h3 className="font-heading font-semibold text-brand-white mb-6 text-sm">Monthly Revenue Trend</h3>
            <div className="h-64 flex items-end gap-3 px-2 pt-4">
              {[
                { month: "Jan", val: 40 },
                { month: "Feb", val: 55 },
                { month: "Mar", val: 48 },
                { month: "Apr", val: 70 },
                { month: "May", val: 85 },
                { month: "Jun", val: 95 },
              ].map(({ month, val }) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-brand-red/80 hover:bg-brand-red transition-all cursor-pointer relative group" style={{ height: `${val * 2}px` }}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-slate-700">
                      {formatPrice(val * 2500)}
                    </div>
                  </div>
                  <span className="text-[10px] text-brand-muted">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Categories mock */}
          <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
            <h3 className="font-heading font-semibold text-brand-white mb-6 text-sm">Sales Distribution by Categories</h3>
            <div className="space-y-4 pt-2">
              {[
                { category: "T-Shirts & Tops", percentage: 42, color: "#991B1B", amount: 202482 },
                { category: "Shirts & Blouses", percentage: 28, color: "#1E3A8A", amount: 134988 },
                { category: "Trousers & Shorts", percentage: 18, color: "#115E59", amount: 86775 },
                { category: "Outerwear & Hoodies", percentage: 12, color: "#701A75", amount: 57850 },
              ].map(({ category, percentage, color, amount }) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-white font-medium">{category}</span>
                    <span className="text-brand-muted">{percentage}% ({formatPrice(amount)})</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "rgba(148,163,184,0.06)" }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${percentage}%`, background: color }} />
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
