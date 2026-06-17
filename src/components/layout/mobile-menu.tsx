"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  Search,
  ListOrdered,
  Snowflake,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  ChevronRight,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { categories } from "@/data/categories";
import { storeProfile } from "@/data/store";
import { cn } from "@/lib/cn";

const primaryNav = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/#katalog", label: "Katalog", icon: Search },
  { href: "/#cara-pesan", label: "Cara Pesan", icon: ListOrdered },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary md:hidden"
        aria-label="Buka menu navigasi"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          id="mobile-menu"
          side="left"
          showClose={false}
          className="flex w-full max-w-xs flex-col gap-0 p-0 sm:max-w-sm"
        >
          <SheetHeader className="border-b border-border bg-gradient-to-br from-primary-50/80 to-white">
            <Link
              href="/"
              onClick={close}
              className="inline-flex items-center gap-2.5"
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
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Stock. Fry. Love.
                </span>
              </div>
            </Link>
            <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
          </SheetHeader>

          <nav
            className="flex-1 overflow-y-auto px-3 py-4"
            aria-label="Menu mobile"
          >
            <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-muted">
              Menu
            </p>
            <ul className="space-y-1">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href.split("#")[0]);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-foreground/80 hover:bg-muted/40 hover:text-foreground active:bg-muted/60",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-muted">
              Kategori
            </p>
            <ul className="grid grid-cols-2 gap-2 px-1">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href="/#katalog"
                    onClick={close}
                    className="flex items-center justify-center rounded-xl border border-border bg-white px-2 py-2 text-center text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/30 hover:bg-primary-50 hover:text-primary-700 active:scale-95"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href={`https://wa.me/${storeProfile.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-bold text-white shadow-pop transition-transform active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Chat WhatsApp
            </a>
            <div className="mt-4 space-y-2 text-xs text-muted">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="leading-snug">{storeProfile.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0 text-secondary" />
                {storeProfile.openHours}
              </p>
              {storeProfile.instagram && (
                <a
                  href={`https://instagram.com/${storeProfile.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <Instagram className="h-3.5 w-3.5 shrink-0" />
                  {storeProfile.instagram}
                </a>
              )}
              <a
                href={`tel:+${storeProfile.whatsappNumber}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +{storeProfile.whatsappNumber}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
