"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayoutWrapper title="Products" subtitle="Manage your product catalog, inventory, and variants">
      <div className="flex flex-col gap-6">
        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-muted">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search products by name, SKU or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
              style={{
                background: "rgba(30,41,59,0.5)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
            />
          </div>
          <button
            onClick={() => alert("Add Product modal would open here in full implementation!")}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-red-700 text-white rounded-xl text-sm font-semibold tracking-wider transition-colors duration-200"
          >
            <Plus size={16} />
            ADD PRODUCT
          </button>
        </div>

        {/* Products Table */}
        <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: "800px" }}>
              <thead>
                <tr className="text-brand-muted text-xs uppercase" style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Product</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">SKU</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Category</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Price</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Stock</th>
                  <th className="text-left pb-3 pr-4 font-semibold tracking-wider">Rating</th>
                  <th className="text-right pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-dark/20 transition-colors">
                    <td className="py-4 pr-4 flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${product.images[0]})`, border: "1px solid rgba(255,255,255,0.05)" }}
                      />
                      <div className="min-w-0">
                        <p className="text-brand-white font-semibold truncate text-xs sm:text-sm">{product.name}</p>
                        <p className="text-brand-muted text-[10px] sm:text-xs">
                          {product.colors.join(" / ")}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="font-mono text-brand-muted text-xs">{product.sku}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="px-2.5 py-1 bg-slate-800/60 text-brand-muted text-xs rounded-lg capitalize border border-slate-700/30">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 pr-4 font-bold text-brand-white">
                      {formatPrice(product.price)}
                    </td>
                    <td className="py-4 pr-4">
                      {product.stock <= 15 ? (
                        <span className="text-yellow-400 font-semibold text-xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                          {product.stock} low
                        </span>
                      ) : (
                        <span className="text-green-400 text-xs">
                          {product.stock} in stock
                        </span>
                      )}
                    </td>
                    <td className="py-4 pr-4 text-brand-muted text-xs">
                      ★ {product.rating} ({product.reviewCount})
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/shop/${product.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg text-brand-muted hover:text-brand-white transition-colors hover:bg-slate-800/50"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <button
                          onClick={() => alert("Edit action would open a modal here!")}
                          className="p-2 rounded-lg text-brand-muted hover:text-brand-white transition-colors hover:bg-slate-800/50"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg text-brand-red hover:text-red-400 transition-colors hover:bg-red-950/20"
                        >
                          <Trash2 size={14} />
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
