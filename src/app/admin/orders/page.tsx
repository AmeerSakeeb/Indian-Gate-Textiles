"use client";

import { useState } from "react";
import { Search, Eye, Filter, CheckCircle2, Truck, XCircle, Clock } from "lucide-react";
import { ADMIN_RECENT_ORDERS } from "@/lib/mock-data";
import { formatPrice, cn } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(ADMIN_RECENT_ORDERS);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayoutWrapper title="Orders" subtitle="Track and manage customer orders, invoices, and fulfillment status">
      <div className="flex flex-col gap-6">
        {/* Filters and Search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-muted">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by Order ID or Customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
              style={{
                background: "rgba(30,41,59,0.5)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-brand-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm text-brand-white outline-none"
              style={{
                background: "rgba(30,41,59,0.5)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
            >
              <option value="all" className="bg-[#0f172a]">All Statuses</option>
              <option value="pending" className="bg-[#0f172a]">Pending</option>
              <option value="processing" className="bg-[#0f172a]">Processing</option>
              <option value="shipped" className="bg-[#0f172a]">Shipped</option>
              <option value="delivered" className="bg-[#0f172a]">Delivered</option>
              <option value="cancelled" className="bg-[#0f172a]">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: "750px" }}>
              <thead>
                <tr className="text-brand-muted text-xs uppercase" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Order ID</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Customer</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Items</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Payment Method</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Status</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Total Amount</th>
                  <th className="text-right pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-dark/20 transition-colors">
                    <td className="py-4 pr-4">
                      <span className="font-mono text-brand-white font-semibold text-xs">{order.id}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-brand-white font-medium text-xs sm:text-sm">{order.customer}</p>
                    </td>
                    <td className="py-4 pr-4 text-brand-muted text-xs">
                      {order.items} items
                    </td>
                    <td className="py-4 pr-4 text-brand-muted text-xs capitalize">
                      {order.paymentMethod}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold capitalize", getStatusColor(order.status))}
                        style={{ background: getStatusBg(order.status) }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 font-bold text-brand-white">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === "pending" && (
                          <button
                            onClick={() => updateStatus(order.id, "processing")}
                            title="Mark as Processing"
                            className="p-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-950/20 transition-colors"
                          >
                            <Clock size={14} />
                          </button>
                        )}
                        {order.status === "processing" && (
                          <button
                            onClick={() => updateStatus(order.id, "shipped")}
                            title="Mark as Shipped"
                            className="p-2 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-950/20 transition-colors"
                          >
                            <Truck size={14} />
                          </button>
                        )}
                        {order.status === "shipped" && (
                          <button
                            onClick={() => updateStatus(order.id, "delivered")}
                            title="Mark as Delivered"
                            className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-950/20 transition-colors"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                        )}
                        {order.status !== "delivered" && order.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(order.id, "cancelled")}
                            title="Cancel Order"
                            className="p-2 rounded-lg text-brand-red hover:text-red-400 hover:bg-red-950/20 transition-colors"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => alert(`View invoice details for order ${order.id}`)}
                          className="p-2 rounded-lg text-brand-muted hover:text-brand-white transition-colors hover:bg-slate-800/50"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
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
