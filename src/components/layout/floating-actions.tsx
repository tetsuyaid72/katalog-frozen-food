"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, MessageCircle, X } from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { storeProfile } from "@/data/store";
import { cn } from "@/lib/cn";

export function FloatingActions() {
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const [show, setShow] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed bottom-28 right-3 z-30 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        <div className="pointer-events-auto hidden md:block">
          {whatsappOpen ? (
            <div className="animate-fade-up flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-pop">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Chat WhatsApp
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Tanya stok & harga
                </span>
              </div>
              <a
                href={`https://wa.me/${storeProfile.whatsappNumber}?text=${encodeURIComponent(
                  "Halo Frozen Mama, saya mau tanya soal produk.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-success px-3 py-1.5 text-xs font-bold text-white shadow-pop"
              >
                Buka Chat
              </a>
              <button
                onClick={() => setWhatsappOpen(false)}
                className="rounded-full p-1 text-muted hover:bg-muted/10"
                aria-label="Tutup"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setWhatsappOpen(true)}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-pop transition-transform hover:-translate-y-1"
              aria-label="Chat WhatsApp"
            >
              <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
              <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-secondary">
                <span className="absolute inset-0 animate-ping rounded-full bg-secondary opacity-75" />
              </span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={openCart}
          className={cn(
            "pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-pop transition-transform hover:-translate-y-1",
            totalItems > 0 && "animate-float",
          )}
          aria-label="Buka keranjang"
        >
          <ShoppingBag className="h-6 w-6" strokeWidth={2.2} />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-secondary px-1.5 text-[10px] font-bold text-white ring-2 ring-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
