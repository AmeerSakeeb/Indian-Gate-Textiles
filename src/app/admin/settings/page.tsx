"use client";

import { useState } from "react";
import { Save, Shield, Settings, Sliders, DollarSign, BellRing } from "lucide-react";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Indian Gate Textiles");
  const [supportEmail, setSupportEmail] = useState("support@indiangatetextiles.com");
  const [bankName, setBankName] = useState("Commercial Bank of Ceylon");
  const [accountNumber, setAccountNumber] = useState("8009124355");
  const [deliveryCharge, setDeliveryCharge] = useState(350);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(10000);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings successfully saved and simulated in mock database!");
    }, 1000);
  };

  return (
    <AdminLayoutWrapper title="Store Settings" subtitle="Configure bank deposits, courier delivery rates, contact details, and site options">
      <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-4xl">
        
        {/* Profile and general */}
        <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
          <h3 className="font-heading font-semibold text-brand-white mb-5 text-sm sm:text-base flex items-center gap-2">
            <Settings size={18} className="text-brand-red" /> General Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-muted font-medium uppercase tracking-wider">Store Public Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)" }}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-muted font-medium uppercase tracking-wider">Customer Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)" }}
                required
              />
            </div>
          </div>
        </div>

        {/* Banking settings */}
        <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
          <h3 className="font-heading font-semibold text-brand-white mb-5 text-sm sm:text-base flex items-center gap-2">
            <DollarSign size={18} className="text-brand-red" /> Bank Transfer Gateway Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-muted font-medium uppercase tracking-wider">Receiving Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)" }}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-muted font-medium uppercase tracking-wider">Account Number (LKR Deposits)</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)" }}
                required
              />
            </div>
          </div>
        </div>

        {/* Shipping configurations */}
        <div className="p-4 sm:p-6 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
          <h3 className="font-heading font-semibold text-brand-white mb-5 text-sm sm:text-base flex items-center gap-2">
            <Sliders size={18} className="text-brand-red" /> Courier Delivery Charges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-muted font-medium uppercase tracking-wider">Flat Courier Rate (LKR)</label>
              <input
                type="number"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                className="px-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)" }}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-muted font-medium uppercase tracking-wider">Free Delivery Minimum order (LKR)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="px-4 py-2.5 rounded-xl text-sm text-brand-white outline-none"
                style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)" }}
                required
              />
            </div>
          </div>
        </div>

        {/* Save bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-brand-red hover:bg-red-700 disabled:bg-red-950 text-white rounded-xl text-sm font-semibold tracking-wider transition-colors duration-200"
          >
            <Save size={16} />
            {isSaving ? "SAVING..." : "SAVE SETTINGS"}
          </button>
        </div>
      </form>
    </AdminLayoutWrapper>
  );
}
