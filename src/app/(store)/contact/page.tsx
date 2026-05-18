"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";
export default function ContactPage() {
  const whatsappMsg = encodeURIComponent("Hi, I'd like to enquire about Indian Gate Textiles.");

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#020617" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-muted tracking-widest mb-3" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
            GET IN TOUCH
          </p>
          <h1 className="font-heading font-bold text-brand-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Contact Us
          </h1>
          <p className="text-brand-muted max-w-lg mx-auto" style={{ fontSize: "16px" }}>
            Have a question, a custom order request, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">

            {/* WhatsApp — primary CTA */}
            <a
              href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-whatsapp-btn"
              className="flex items-center gap-4 p-6 rounded-2xl transition-all hover:scale-[1.01]"
              style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              <div className="p-3 rounded-xl" style={{ background: "#25D366" }}>
                <MessageCircle size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-heading font-semibold text-brand-white mb-0.5">WhatsApp (Fastest)</p>
                <p className="text-brand-muted text-sm">{BRAND.whatsapp}</p>
              </div>
              <ArrowRight size={16} className="text-green-400" />
            </a>

            {/* Info cards */}
            {[
              {
                icon: Phone,
                label: "Phone",
                value: BRAND.phone,
                href: `tel:${BRAND.phone}`,
                color: "rgba(59,130,246,0.15)",
                border: "rgba(59,130,246,0.3)",
                iconColor: "#3B82F6",
              },
              {
                icon: Mail,
                label: "Email",
                value: BRAND.email,
                href: `mailto:${BRAND.email}`,
                color: "rgba(168,85,247,0.1)",
                border: "rgba(168,85,247,0.3)",
                iconColor: "#A855F7",
              },
              {
                icon: MapPin,
                label: "Store Location",
                value: BRAND.address,
                href: BRAND.mapsUrl,
                color: "rgba(153,27,27,0.1)",
                border: "rgba(153,27,27,0.3)",
                iconColor: "#991B1B",
              },
            ].map(({ icon: Icon, label, value, href, color, border, iconColor }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.01]"
                style={{ background: color, border: `1px solid ${border}` }}
              >
                <div className="p-2.5 rounded-xl" style={{ background: iconColor + "33" }}>
                  <Icon size={20} style={{ color: iconColor }} />
                </div>
                <div>
                  <p className="text-brand-muted text-xs mb-0.5">{label}</p>
                  <p className="font-semibold text-brand-white text-sm">{value}</p>
                </div>
              </a>
            ))}

            {/* Hours */}
            <div className="p-5 rounded-2xl" style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Clock size={18} className="text-brand-muted" />
                <p className="font-heading font-semibold text-brand-white">Store Hours</p>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  ["Monday – Friday", "9:00 AM – 7:00 PM"],
                  ["Saturday", "9:00 AM – 6:00 PM"],
                  ["Sunday", "10:00 AM – 4:00 PM"],
                  ["Public Holidays", "Closed"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-brand-muted">{day}</span>
                    <span className="text-brand-white font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for your message! We'll get back to you within 24 hours.");
                (e.target as HTMLFormElement).reset();
              }}
              className="p-8 rounded-2xl space-y-5"
              style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(148,163,184,0.08)" }}
            >
              <h2 className="font-heading font-bold text-brand-white mb-6" style={{ fontSize: "22px" }}>
                Send a Message
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>
                    FULL NAME *
                  </label>
                  <input type="text" name="name" required placeholder="Your name" className="w-full px-4 py-3 rounded-xl text-sm outline-none text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red" />
                </div>
                <div>
                  <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>
                    EMAIL
                  </label>
                  <input type="email" name="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl text-sm outline-none text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>
                  PHONE / WHATSAPP
                </label>
                <input type="tel" name="phone" placeholder="+94 7X XXX XXXX" className="w-full px-4 py-3 rounded-xl text-sm outline-none text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red" />
              </div>

              <div>
                <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>
                  SUBJECT
                </label>
                <select name="subject" className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer outline-none text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red">
                  <option value="">Select a topic</option>
                  <option value="order">Order Enquiry</option>
                  <option value="product">Product Question</option>
                  <option value="return">Returns & Exchanges</option>
                  <option value="wholesale">Wholesale / Bulk Order</option>
                  <option value="custom">Custom Order</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-brand-muted mb-2 tracking-wider" style={{ letterSpacing: "0.08em" }}>
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none text-white placeholder:text-brand-muted/70 bg-brand-secondary/80 border border-brand-muted/20 focus:border-brand-red"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full py-4 font-heading font-semibold text-white rounded-xl tracking-wider transition-all hover:scale-[0.99]"
                style={{ background: "linear-gradient(135deg, #991B1B, #B91C1C)", fontSize: "13px", letterSpacing: "0.12em" }}
              >
                SEND MESSAGE
              </button>

              <p className="text-center text-brand-muted text-xs">
                Or reach us instantly on{" "}
                <a href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                  WhatsApp
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Map embed */}
        <div className="mt-14 rounded-2xl overflow-hidden" style={{ height: "300px", border: "1px solid rgba(148,163,184,0.08)" }}>
          <iframe
            title="Indian Gate Textiles Location"
            src={`https://maps.google.com/maps?q=7.4695593,80.6239295&z=16&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
