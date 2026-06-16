"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format-currency";

export function PromoSection() {
  const promoProducts = products.filter((p) => p.isPromo).slice(0, 3);
  const heroPromo = promoProducts[0];

  if (!heroPromo) return null;

  return (
    <section className="container py-10 md:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-foreground p-6 text-white shadow-pop md:p-10">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/40 blur-3xl" />

        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-secondary-200">
              <Sparkles className="h-3 w-3" />
              Promo Mingguan
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-balance md:text-4xl">
              Paket Hemat{" "}
              <span className="text-secondary-300">Mingguan</span>{" "}
              untuk keluarga.
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/70 md:text-base">
              Pilih paket bundling frozen food favorit mulai dari{" "}
              <span className="font-bold text-white">
                {formatCurrency(75000)}
              </span>
              . Hemat hingga 22% dan stok makan keluarga jadi lebih
              terencana.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90"
              >
                <Link href="#katalog">
                  Lihat Paket Hemat
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <span className="text-xs text-white/50">
                *Berlaku sampai akhir minggu
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {promoProducts.slice(0, 3).map((p, idx) => (
              <div
                key={p.id}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm ${idx === 0 ? "col-span-2" : ""}`}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-300">
                  {idx === 0 ? "Paket Utama" : "Tambahan"}
                </p>
                <p className="mt-1 font-display text-sm font-bold leading-tight md:text-base">
                  {p.name}
                </p>
                <p className="text-[10px] text-white/60">{p.weight}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-base font-extrabold text-white">
                    {formatCurrency(p.price)}
                  </span>
                  {p.originalPrice && (
                    <span className="text-[10px] text-white/50 line-through">
                      {formatCurrency(p.originalPrice)}
                    </span>
                  )}
                </div>
                {idx === 0 && (
                  <div className="absolute right-3 top-3 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-extrabold text-white">
                    Hemat 21%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
