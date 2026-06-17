"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Snowflake, Phone } from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { storeProfile } from "@/data/store";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/#katalog", label: "Katalog" },
  { href: "/#cara-pesan", label: "Cara Pesan" },
];

export function Header() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-border/70 shadow-sm"
          : "bg-white/60 backdrop-blur-md",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="group flex items-center gap-2.5 -ml-1"
          aria-label={storeProfile.name}
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-pop">
            <Snowflake className="h-5 w-5" strokeWidth={2.4} />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-secondary ring-2 ring-white" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Frozen <span className="text-primary">Mama</span>
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted md:block">
              Stock. Fry. Love.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0]);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-foreground/70 hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            asChild
          >
            <a
              href={`https://wa.me/${storeProfile.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat WhatsApp"
            >
              <Phone className="h-4 w-4" />
            </a>
          </Button>

          <button
            type="button"
            onClick={openCart}
            className="group relative flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-pop"
            aria-label="Buka keranjang"
          >
            <ShoppingBag className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Keranjang</span>
            <Badge
              variant={totalItems > 0 ? "secondary" : "outline"}
              className="ml-0.5 h-5 min-w-[1.25rem] justify-center px-1.5"
            >
              {totalItems}
            </Badge>
          </button>
        </div>
      </div>
    </header>
  );
}
