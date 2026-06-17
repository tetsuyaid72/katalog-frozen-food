"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Flame,
  Crown,
  Check,
  PackageX,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Snowflake as FrozenIcon,
  ChefHat,
} from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { storeProfile } from "@/data/store";
import { findRelatedProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { formatCurrency } from "@/lib/format-currency";
import { generateWhatsappUrl, buildWhatsappMessage } from "@/lib/generate-whatsapp-url";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { ProductImage } from "@/components/product/product-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

type ProductDetailProps = {
  product: Product;
};

const stockLabel: Record<Product["stockStatus"], string> = {
  available: "Tersedia",
  low_stock: "Stok terbatas",
  sold_out: "Stok habis",
};

const stockStyle: Record<Product["stockStatus"], string> = {
  available: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-amber-100 text-amber-700",
  sold_out: "bg-red-100 text-red-700",
};

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const isSoldOut = product.stockStatus === "sold_out";
  const category = categories.find((c) => c.id === product.categoryId);
  const related = findRelatedProducts(product);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100,
        )
      : 0;

  const handleAdd = () => {
    if (isSoldOut) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleBuyWhatsapp = () => {
    if (isSoldOut) return;
    const items = [
      {
        productId: product.id,
        name: product.name,
        weight: product.weight,
        price: product.price,
        image: product.image,
        quantity,
      },
    ];
    const message = buildWhatsappMessage({
      storeName: storeProfile.name,
      buyer: {
        name: "Saya",
        whatsapp: "-",
        deliveryMethod: "delivery",
        address: "Akan dikonfirmasi via WhatsApp",
      },
      items,
    });
    const url = generateWhatsappUrl(storeProfile.whatsappNumber, message);
    window.open(url, "_blank");
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6">
        <Link
          href="/#katalog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke katalog
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border border-border bg-muted/10 shadow-pop",
              isSoldOut && "grayscale opacity-70",
            )}
          >
            <div className="relative aspect-square w-full">
              <ProductImage
                src={product.image}
                alt={product.name}
                fallbackName={product.name}
              />
            </div>

            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.isPromo && (
                <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                  <Flame className="h-3 w-3" />
                  Promo {discount > 0 && `· ${discount}%`}
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge
                  variant="warning"
                  className="gap-1 bg-amber-500 px-3 py-1.5 text-white"
                >
                  <Crown className="h-3 w-3" />
                  Best Seller
                </Badge>
              )}
            </div>
            <div className="absolute right-4 top-4">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold",
                  stockStyle[product.stockStatus],
                )}
              >
                {isSoldOut && <PackageX className="h-3 w-3" />}
                {stockLabel[product.stockStatus]}
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            <Feature
              icon={FrozenIcon}
              label="Frozen"
              value="-18°C"
              color="primary"
            />
            <Feature
              icon={ShieldCheck}
              label="Higienis"
              value="Halal & Aman"
              color="success"
            />
            <Feature
              icon={Clock}
              label="Siap Masak"
              value="≤ 10 menit"
              color="warning"
            />
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {category && (
              <Link
                href="/#katalog"
                className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 font-bold uppercase tracking-wider text-primary-700 hover:bg-primary-100"
              >
                {category.name}
              </Link>
            )}
            <span className="text-muted">·</span>
            <span className="text-muted">{product.weight}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-black leading-tight text-foreground md:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-end gap-3">
            <p className="font-display text-3xl font-black text-primary md:text-4xl">
              {formatCurrency(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-muted line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-secondary-50 px-2 py-1 text-[10px] font-extrabold uppercase text-secondary-700">
                Hemat {discount}%
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            {product.description}
          </p>

          {product.highlights && product.highlights.length > 0 && (
            <ul className="mt-4 space-y-2">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.storage && (
              <InfoCard
                icon={FrozenIcon}
                title="Cara Penyimpanan"
                body={product.storage}
              />
            )}
            {product.cooking && (
              <InfoCard
                icon={ChefHat}
                title="Cara Masak"
                body={product.cooking}
              />
            )}
          </div>

          <div className="mt-7 flex flex-col gap-3 rounded-3xl border border-border bg-white p-4 shadow-soft md:flex-row md:items-center md:p-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Jumlah
              </span>
              <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white active:scale-95"
                  aria-label="Kurangi"
                >
                  <Minus className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <span className="min-w-8 text-center text-sm font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-600 active:scale-95"
                  aria-label="Tambah"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 sm:flex-row md:justify-end">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBuyWhatsapp}
                disabled={isSoldOut}
                className="border-success/30 text-success hover:border-success/60 hover:text-success"
              >
                <MessageCircle className="h-4 w-4" />
                Beli via WhatsApp
              </Button>
              <Button
                size="lg"
                onClick={handleAdd}
                disabled={isSoldOut}
                className="flex-1 sm:flex-none"
              >
                <ShoppingBag className="h-4 w-4" />
                {isSoldOut ? "Stok Habis" : "Tambah ke Keranjang"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                Produk Terkait
              </span>
              <h2 className="mt-3 font-display text-2xl font-black tracking-tight md:text-3xl">
                Mungkin kamu juga{" "}
                <span className="text-primary">suka</span>.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Feature({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: "primary" | "success" | "warning";
}) {
  const colorMap = {
    primary: "bg-primary-50 text-primary-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
  };
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-white p-2.5 sm:gap-3 sm:p-3">
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9", colorMap[color])}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-muted sm:text-[10px]">
          {label}
        </p>
        <p className="truncate text-xs font-bold text-foreground sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-3.5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-xs font-bold uppercase tracking-wider text-muted">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
        {body}
      </p>
    </div>
  );
}
