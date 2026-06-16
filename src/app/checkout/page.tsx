import type { Metadata } from "next";
import { ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { storeProfile } from "@/data/store";

export const metadata: Metadata = {
  title: "Checkout",
  description: `Selesaikan pesanan frozen food dari ${storeProfile.name} dan kirim ke WhatsApp.`,
};

export default function CheckoutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/#katalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali belanja
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-black leading-tight text-foreground md:text-3xl">
                Checkout via WhatsApp
              </h1>
              <p className="text-sm text-muted">
                Lengkapi data, lalu pesananmu langsung terkirim ke WhatsApp
                Mama.
              </p>
            </div>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          Tanpa registrasi · Data lokal
        </span>
      </div>
      <CheckoutForm />
    </div>
  );
}
