"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  LayoutGrid,
  ListOrdered,
  Snowflake,
  ChevronRight,
  X,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { storeProfile } from "@/data/store";
import { cn } from "@/lib/cn";

const primaryNav = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/#katalog", label: "Katalog", icon: LayoutGrid },
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
          <SheetHeader className="relative border-b border-border bg-gradient-to-br from-primary-50/80 to-white px-6 pb-4 pt-6">
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
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
              aria-label="Tutup menu"
            >
              <X className="h-4 w-4" />
            </button>
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
                        "flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98]",
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-foreground/80 hover:bg-muted/40 hover:text-foreground",
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
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
