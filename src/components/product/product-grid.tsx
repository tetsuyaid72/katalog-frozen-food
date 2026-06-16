"use client";

import { PackageSearch } from "lucide-react";

import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  searchQuery?: string;
  activeCategory?: string;
};

export function ProductGrid({
  products,
  searchQuery,
  activeCategory,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-white py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-500">
          <PackageSearch className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-foreground">
          Produk tidak ditemukan
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Coba gunakan kata kunci lain atau pilih kategori berbeda. Frozen
          food favoritmu mungkin menunggu di kategori lain.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-fade-up"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <ProductCard product={product} priority={i < 4} />
        </div>
      ))}
    </div>
  );
}
