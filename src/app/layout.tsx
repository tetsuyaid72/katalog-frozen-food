import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StoreProvider } from "@/components/layout/store-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-nav";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { storeProfile } from "@/data/store";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: {
    default: `${storeProfile.name} — Katalog Frozen Food Online`,
    template: `%s | ${storeProfile.name}`,
  },
  description:
    "Pesan frozen food praktis untuk keluarga. Pilih produk, masukkan ke keranjang, dan checkout langsung ke WhatsApp.",
  keywords: [
    "frozen food",
    "katalog frozen food",
    "nugget",
    "sosis",
    "dimsum",
    "pesan via WhatsApp",
  ],
  authors: [{ name: storeProfile.name }],
  openGraph: {
    type: "website",
    title: `${storeProfile.name} — Katalog Frozen Food Online`,
    description:
      "Pesan frozen food praktis untuk keluarga. Pilih produk, masukkan ke keranjang, dan checkout langsung ke WhatsApp.",
    siteName: storeProfile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${storeProfile.name} — Katalog Frozen Food Online`,
    description:
      "Pesan frozen food praktis untuk keluarga. Pilih produk, masukkan ke keranjang, dan checkout langsung ke WhatsApp.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0EA5E9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geist.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        <StoreProvider>
          <Header />
          <main className="relative pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16">{children}</main>
          <Footer />
          <MobileBottomNav />
          <FloatingActions />
          <CartDrawer />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
