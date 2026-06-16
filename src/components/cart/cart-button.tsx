"use client";

import { ShoppingBag } from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/cn";

type CartButtonProps = {
  className?: string;
};

export function CartButton({ className }: CartButtonProps) {
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <button
      type="button"
      onClick={openCart}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-pop",
        className,
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      Lihat Keranjang
      {totalItems > 0 && (
        <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-secondary px-1.5 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}
