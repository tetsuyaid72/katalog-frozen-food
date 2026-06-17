"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, MessageCircle, User } from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { storeProfile } from "@/data/store";
import { cn } from "@/lib/cn";

const items = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/#katalog", label: "Cari", icon: Search },
  { href: "/checkout", label: "Checkout", icon: ShoppingBag, isCart: true },
  {
    href: `https://wa.me/${storeProfile.whatsappNumber}`,
    label: "Chat",
    icon: MessageCircle,
    external: true,
  },
  {
    href: `https://wa.me/${storeProfile.whatsappNumber}`,
    label: "CS",
    icon: User,
    external: true,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-white/95 px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 gap-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            !item.external &&
            !item.isCart &&
            (item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("#")[0]));
          const isCart = item.isCart && totalItems > 0;

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={openCart}
                className="group flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-semibold text-foreground/70 transition-colors hover:text-primary"
                aria-label={item.label}
              >
                <span className="relative flex h-8 w-10 items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100">
                  <Icon className="h-4 w-4 text-primary" />
                  {isCart && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </span>
                <span className="leading-none">{item.label}</span>
              </button>
            );
          }

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-semibold text-foreground/70 transition-colors hover:text-success"
                aria-label={item.label}
              >
                <span className="flex h-8 w-10 items-center justify-center rounded-full">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="leading-none">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-semibold transition-colors",
                isActive
                  ? "text-primary-700"
                  : "text-foreground/70 hover:text-primary",
              )}
              aria-label={item.label}
            >
              <span
                className={cn(
                  "flex h-8 w-10 items-center justify-center rounded-full",
                  isActive ? "bg-primary-50" : "group-hover:bg-primary-50",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
