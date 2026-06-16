"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem } from "@/types/cart";
import { useCartStore } from "@/stores/cart-store";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format-currency";
import { ProductImage } from "@/components/product/product-image";

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);
  const product = products.find((p) => p.id === item.productId);

  return (
    <div className="group flex gap-3 rounded-2xl border border-border bg-white p-3 transition-colors hover:border-primary/30">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted/10">
        {product ? (
          <ProductImage
            src={product.image}
            alt={product.name}
            fallbackName={product.name}
            sizes="80px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-50 font-display text-2xl font-bold text-primary-300">
            {item.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="line-clamp-2 text-sm font-bold text-foreground">
              {item.name}
            </h4>
            <p className="mt-0.5 text-[11px] text-muted">{item.weight}</p>
          </div>
          <button
            onClick={() => removeItem(item.productId)}
            className="rounded-full p-1.5 text-muted opacity-60 transition-all hover:bg-red-50 hover:text-danger hover:opacity-100"
            aria-label={`Hapus ${item.name} dari keranjang`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-sm font-extrabold text-foreground">
            {formatCurrency(item.price * item.quantity)}
          </span>
          <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
            <button
              onClick={() => decrease(item.productId)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white"
              aria-label="Kurangi jumlah"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
            <span className="min-w-6 text-center text-sm font-bold tabular-nums text-foreground">
              {item.quantity}
            </span>
            <button
              onClick={() => increase(item.productId)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-600"
              aria-label="Tambah jumlah"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
