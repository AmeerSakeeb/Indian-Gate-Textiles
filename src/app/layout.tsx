import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "INDIAN GATE Textiles — Premium Fashion, Matale Sri Lanka",
    template: "%s | INDIAN GATE Textiles",
  },
  description:
    "Premium clothing brand from Matale, Sri Lanka. Crafted for the bold, worn by the few. Shop heavyweight tees, hoodies, shirts, and outerwear.",
  keywords: [
    "Indian Gate Textiles",
    "premium clothing Sri Lanka",
    "luxury streetwear",
    "Matale fashion",
    "Sri Lankan clothing brand",
  ],
  openGraph: {
    type: "website",
    siteName: "INDIAN GATE Textiles",
    title: "INDIAN GATE Textiles — Premium Fashion Sri Lanka",
    description:
      "Premium clothing brand from Sri Lanka. Crafted for the bold, worn by the few.",
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://indiangatetextiles.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" style={{ background: "#020617", color: "#F8FAFC" }}>
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1E293B",
                  color: "#F8FAFC",
                  border: "1px solid rgba(148,163,184,0.15)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: { primary: "#991B1B", secondary: "#F8FAFC" },
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
