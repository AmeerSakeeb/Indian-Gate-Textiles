"use client";

import { useState } from "react";
import { Search, Mail, Phone, Calendar, ShieldCheck, UserCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

const MOCK_CUSTOMERS = [
  { id: "C-01", name: "Ameer Sakeeb", email: "ameer.sakeeb@gmail.com", phone: "+94 77 123 4567", ordersCount: 14, totalSpent: 124500, tier: "Gold", status: "Active" },
  { id: "C-02", name: "Pradeep Perera", email: "pradeep@dialog.lk", phone: "+94 77 987 6543", ordersCount: 8, totalSpent: 76800, tier: "Silver", status: "Active" },
  { id: "C-03", name: "Dilini Fernando", email: "dilini.f@hotmail.com", phone: "+94 71 555 1212", ordersCount: 4, totalSpent: 32400, tier: "Bronze", status: "Active" },
  { id: "C-04", name: "Fathima Riza", email: "fathima@riza.org", phone: "+94 72 333 4444", ordersCount: 21, totalSpent: 198900, tier: "Gold", status: "Active" },
  { id: "C-05", name: "Suresh Pillai", email: "suresh@tasty.lk", phone: "+94 76 444 8888", ordersCount: 1, totalSpent: 9500, tier: "Bronze", status: "Inactive" },
];

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case "Gold":
        return { color: "#F59E0B", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" };
      case "Silver":
        return { color: "#94A3B8", background: "rgba(148,163,184,0.1)", border: "1px solid rgba(148,163,184,0.2)" };
      default:
        return { color: "#B45309", background: "rgba(180,83,9,0.1)", border: "1px solid rgba(180,83,9,0.2)" };
    }
  };

  return (
    <AdminLayoutWrapper title="Customers" subtitle="View customer accounts, tiers, purchase histories, and contact info">
      <div className="flex flex-col gap-6">
        {/* Controls row */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-muted">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
              style={{
                background: "rgba(30,41,59,0.5)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: "750px" }}>
              <thead>
                <tr className="text-brand-muted text-xs uppercase" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Customer ID</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Name</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Contact Info</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Orders</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Total Spent</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Loyalty Tier</th>
                  <th className="text-right pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-brand-dark/20 transition-colors">
                    <td className="py-4 pr-4">
                      <span className="font-mono text-brand-muted text-xs">{customer.id}</span>
                    </td>
                    <td className="py-4 pr-4 flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
                        style={{ background: customer.status === "Active" ? "#1e293b" : "#0f172a", border: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-brand-white font-semibold text-xs sm:text-sm">{customer.name}</p>
                        {customer.tier === "Gold" && (
                          <span className="text-[10px] text-yellow-400 font-medium flex items-center gap-0.5 mt-0.5">
                            <ShieldCheck size={10} /> Premium Member
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col gap-0.5 text-xs text-brand-muted">
                        <span className="flex items-center gap-1"><Mail size={12} /> {customer.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} /> {customer.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 font-semibold text-brand-white">
                      {customer.ordersCount} orders
                    </td>
                    <td className="py-4 pr-4 font-bold text-brand-white">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                        style={getTierBadgeStyle(customer.tier)}
                      >
                        {customer.tier}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {customer.status === "Active" ? (
                        <span className="text-green-400 text-xs font-semibold bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="text-brand-muted text-xs font-semibold bg-slate-800/50 px-2 py-1 rounded-lg">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
