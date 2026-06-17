"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Check, Flame, Crown, PackageX } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "./product-image";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  className?: string;
};

const stockLabel: Record<Product["stockStatus"], string> = {
  available: "Stok ready",
  low_stock: "Stok terbatas",
  sold_out: "Stok habis",
};

const stockStyle: Record<Product["stockStatus"], string> = {
  available: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-amber-100 text-amber-700",
  sold_out: "bg-red-100 text-red-700",
};

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const isSoldOut = product.stockStatus === "sold_out";
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) {
      toast.error("Stok produk sedang habis", {
        description: `${product.name} belum bisa dipesan.`,
      });
      return;
    }
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} ditambahkan`, {
      description: "Lihat keranjangmu di pojok kanan atas.",
    });
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link
      href={`/produk/${product.slug}`}
      className={cn(
        "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl",
        className,
      )}
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-pop">
        <div
          className={cn(
            "relative aspect-square overflow-hidden bg-muted/10",
            isSoldOut && "grayscale opacity-60",
          )}
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            fallbackName={product.name}
            priority={priority}
            className="transition-transform duration-500 group-hover:scale-105"
          />

          {/* badges */}
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.isPromo && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-warm">
                <Flame className="h-3 w-3" /> Promo
                {discount > 0 && (
                  <span className="ml-0.5 rounded-full bg-white/20 px-1.5">
                    {discount}%
                  </span>
                )}
              </span>
            )}
            {product.isBestSeller && !product.isPromo && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-warm">
                <Crown className="h-3 w-3" /> Best Seller
              </span>
            )}
            {product.isBestSeller && product.isPromo && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-warm">
                <Crown className="h-3 w-3" /> Best Seller
              </span>
            )}
          </div>

          {/* stock indicator (top right) */}
          <div className="absolute right-3 top-3">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider",
                stockStyle[product.stockStatus],
              )}
            >
              {isSoldOut ? <PackageX className="h-3 w-3" /> : null}
              {stockLabel[product.stockStatus]}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-sm font-bold leading-snug text-foreground md:text-base">
              {product.name}
            </h3>
          </div>
          <p className="text-[11px] font-medium text-muted">{product.weight}</p>

          <div className="mt-1 flex items-end justify-between gap-2">
            <div className="flex min-w-0 flex-col">
              {product.originalPrice && (
                <span className="text-[10px] text-muted line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <span className="font-display text-base font-extrabold text-foreground sm:text-lg">
                {formatCurrency(product.price)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={isSoldOut}
              aria-label={isSoldOut ? "Stok habis" : `Tambah ${product.name}`}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 active:scale-95",
                isSoldOut
                  ? "cursor-not-allowed bg-muted/20 text-muted"
                  : added
                    ? "bg-success text-white shadow-pop"
                    : "bg-primary text-white shadow-pop hover:bg-primary-600 hover:rotate-6",
              )}
            >
              {added ? (
                <Check className="h-5 w-5" strokeWidth={3} />
              ) : isSoldOut ? (
                <PackageX className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        <span
          className={cn(
            "absolute -top-1 -right-1 h-3 w-3 rounded-bl-2xl",
            product.isPromo ? "bg-secondary" : "bg-primary",
          )}
        />
      </article>
    </Link>
  );
}
