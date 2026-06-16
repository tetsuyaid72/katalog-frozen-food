"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2, Snowflake } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/format-currency";
import { CartItemRow } from "./cart-item";
import { storeProfile } from "@/data/store";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());
  const clear = useCartStore((s) => s.clear);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border bg-gradient-to-br from-primary-50/80 to-white">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-pop">
              <Snowflake className="h-4 w-4" />
            </span>
            <div>
              <SheetTitle className="text-base">Keranjangmu</SheetTitle>
              <SheetDescription className="text-xs">
                {mounted
                  ? totalItems > 0
                    ? `${totalItems} item siap di-checkout`
                    : "Belum ada item di keranjang"
                  : "\u00A0"}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {!mounted ? (
          <div className="flex flex-1 items-center justify-center">
            <span className="text-sm text-muted">Memuat keranjang...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-500 animate-float">
              <ShoppingBag className="h-8 w-8" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Keranjang masih kosong
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Yuk pilih frozen food favoritmu dulu — semua ready stock dan
                tinggal goreng.
              </p>
            </div>
            <Button asChild onClick={closeCart}>
              <Link href="/#katalog">Lihat Katalog</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-border bg-white px-6 py-3 text-xs text-muted">
              <span>
                {totalItems} item · Diantar ke seluruh Jabodetabek
              </span>
              <button
                onClick={clear}
                className="inline-flex items-center gap-1 font-semibold text-danger/80 transition-colors hover:text-danger"
              >
                <Trash2 className="h-3 w-3" />
                Kosongkan
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>

            <div className="border-t border-border bg-white px-6 pb-6 pt-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Ongkir</span>
                  <span className="font-semibold text-success">
                    Dikonfirmasi via WhatsApp
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    Total
                  </span>
                  <span className="font-display text-2xl font-extrabold text-primary">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="mt-4 w-full"
                onClick={closeCart}
              >
                <Link href="/checkout">
                  Checkout via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted">
                Pesananmu akan dikirim ke {storeProfile.name} via WhatsApp
                dengan format rapi.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
