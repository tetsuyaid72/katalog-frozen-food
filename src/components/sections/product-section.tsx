"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductSearch } from "@/components/product/product-search";
import { CategoryFilter } from "@/components/product/product-filter";
import { Button } from "@/components/ui/button";

type ProductSectionProps = {
  defaultCategory?: string;
};

export function ProductSection({ defaultCategory = "all" }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all"
          ? true
          : activeCategory === "best_seller"
            ? p.isBestSeller
            : activeCategory === "promo"
              ? p.isPromo
              : p.categoryId === activeCategory;

      const matchesQuery = query.trim()
        ? p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.description.toLowerCase().includes(query.trim().toLowerCase())
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const hasFilter = activeCategory !== "all" || query.trim().length > 0;

  return (
    <section
      id="katalog"
      className="relative scroll-mt-24 bg-gradient-to-b from-background via-white/30 to-background py-12 md:py-16"
    >
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary-200 bg-secondary-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-secondary-700">
              <SlidersHorizontal className="h-3 w-3" />
              Katalog Produk
            </span>
            <h2 className="mt-3 font-display text-2xl font-black tracking-tight md:text-4xl">
              Semua produk{" "}
              <span className="text-primary">frozen food</span>{" "}
              terbaik kami.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-foreground/70 md:text-base">
              {filtered.length} produk tersedia — filter kategori atau cari
              produk favoritmu.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <ProductSearch
            value={query}
            onChange={setQuery}
            className="md:flex-1"
          />
        </div>

        <div className="mt-4">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {hasFilter && (
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <span>Filter aktif:</span>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 font-semibold text-white hover:bg-foreground/90"
              >
                Kategori: {activeCategory.replace("_", " ")}
                <X className="h-3 w-3" />
              </button>
            )}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-700 hover:bg-primary-100"
              >
                &ldquo;{query}&rdquo;
                <X className="h-3 w-3" />
              </button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="ml-auto h-7 rounded-full px-3 text-xs"
            >
              Reset
            </Button>
          </div>
        )}

        <div className="mt-7">
          <ProductGrid
            products={filtered}
            searchQuery={query}
            activeCategory={activeCategory}
          />
        </div>
      </div>
    </section>
  );
}
