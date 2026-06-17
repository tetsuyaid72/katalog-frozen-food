import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

const colorSchemes: Record<string, string> = {
  all: "from-primary-100 to-primary-50 text-primary-700",
  best_seller: "from-amber-100 to-amber-50 text-amber-700",
  promo: "from-secondary-100 to-secondary-50 text-secondary-700",
  nugget: "from-orange-100 to-amber-50 text-orange-700",
  sosis: "from-rose-100 to-pink-50 text-rose-700",
  bakso: "from-emerald-100 to-emerald-50 text-emerald-700",
  dimsum: "from-purple-100 to-purple-50 text-purple-700",
  kentang: "from-yellow-100 to-yellow-50 text-yellow-700",
  seafood: "from-sky-100 to-sky-50 text-sky-700",
  paket_hemat: "from-fuchsia-100 to-fuchsia-50 text-fuchsia-700",
};

export function CategorySection() {
  return (
    <section className="container py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-muted">
            Jelajahi Kategori
          </span>
          <h2 className="mt-3 font-display text-2xl font-black tracking-tight md:text-3xl">
            Pilih kategori{" "}
            <span className="text-primary">favoritmu</span>.
          </h2>
        </div>
        <Link
          href="#katalog"
          className="hidden text-sm font-semibold text-primary hover:underline md:inline-flex md:items-center md:gap-1"
        >
          Lihat semua
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-3 pt-1 hide-scrollbar md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0"
        role="list"
      >
        {categories.map((cat, idx) => {
          const count =
            cat.id === "all"
              ? products.length
              : cat.id === "best_seller"
                ? products.filter((p) => p.isBestSeller).length
                : cat.id === "promo"
                  ? products.filter((p) => p.isPromo).length
                  : products.filter((p) => p.categoryId === cat.id).length;

          return (
            <Link
              key={cat.id}
              href="#katalog"
              role="listitem"
              className={cn(
                "group relative w-[150px] shrink-0 overflow-hidden rounded-2xl border border-border bg-gradient-to-br p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-pop active:scale-[0.98] md:w-auto",
                colorSchemes[cat.id] ?? colorSchemes.all,
                "animate-fade-up",
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/40 blur-xl transition-opacity group-hover:opacity-80" />
              <CategoryIcon id={cat.id} />
              <p className="mt-3 font-display text-base font-bold leading-tight">
                {cat.name}
              </p>
              <p className="mt-0.5 text-xs opacity-75">
                {count} produk
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CategoryIcon({ id }: { id: string }) {
  const className = "h-6 w-6";
  const map: Record<string, React.ReactNode> = {
    all: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
      </svg>
    ),
    best_seller: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zM5 21h14" />
      </svg>
    ),
    promo: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    nugget: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9.5h.01M15 9.5h.01M9 14h.01M15 14h.01" />
      </svg>
    ),
    sosis: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c0-3 2-5 5-5h8c3 0 5 2 5 5s-2 5-5 5H8c-3 0-5-2-5-5z" />
        <path d="M7 12h10" />
      </svg>
    ),
    bakso: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    dimsum: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 11h14l-2 9H7l-2-9zM7 11l1-3M11 11l1-3M15 11l1-3" />
      </svg>
    ),
    kentang: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c3-5 15-5 18 0M5 12c0 3 3 5 7 5s7-2 7-5" />
        <path d="M7 9c1 1 1 2 0 3M11 8c1 1 1 2 0 3M15 9c1 1 1 2 0 3" />
      </svg>
    ),
    seafood: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c3-5 8-7 14-7 3 0 4 1 4 1v12s-1 1-4 1c-6 0-11-2-14-7z" />
        <circle cx="17" cy="12" r="1" />
      </svg>
    ),
    paket_hemat: (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  };
  return <>{map[id] ?? map.all}</>;
}
