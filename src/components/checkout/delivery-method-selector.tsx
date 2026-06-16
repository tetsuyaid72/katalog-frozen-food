"use client";

import {
  Truck,
  Store,
  Check,
  MessageCircle,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { DeliveryMethod } from "@/types/checkout";
import { cn } from "@/lib/cn";

type DeliveryMethodSelectorProps = {
  value: DeliveryMethod;
  onChange: (value: DeliveryMethod) => void;
  className?: string;
};

type Option = {
  id: DeliveryMethod;
  title: string;
  description: string;
  icon: LucideIcon;
  infoIcon: LucideIcon;
  info: string;
  accent: "primary" | "secondary";
};

const options: Option[] = [
  {
    id: "delivery",
    title: "Diantarkan",
    description: "Mama antar pesanan langsung ke alamat kamu.",
    icon: Truck,
    infoIcon: MessageCircle,
    info: "Ongkir dikonfirmasi via WhatsApp",
    accent: "primary",
  },
  {
    id: "pickup",
    title: "Ambil Sendiri",
    description: "Ambil pesanan di toko Frozen Mama setelah konfirmasi.",
    icon: Store,
    infoIcon: Wallet,
    info: "Hemat ongkir, langsung bawa pulang",
    accent: "secondary",
  },
];

export function DeliveryMethodSelector({
  value,
  onChange,
  className,
}: DeliveryMethodSelectorProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4", className)}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const InfoIcon = opt.infoIcon;
        const isActive = value === opt.id;
        const accent = opt.accent;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            role="radio"
            aria-checked={isActive}
            className={cn(
              "group relative flex w-full flex-col items-stretch overflow-hidden rounded-3xl border bg-white p-5 text-left transition-all duration-200 sm:p-6",
              "gap-4 sm:gap-5",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "active:scale-[0.99]",
              isActive
                ? accent === "primary"
                  ? "border-primary bg-gradient-to-br from-primary-50/70 to-primary-50/20 shadow-pop ring-1 ring-primary/20"
                  : "border-secondary bg-gradient-to-br from-secondary-50/60 to-secondary-50/10 shadow-warm ring-1 ring-secondary/20"
                : "border-border shadow-soft hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-pop",
            )}
          >
            {/* decorative diagonal accent (only when active) */}
            {isActive && (
              <span
                className={cn(
                  "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl opacity-60",
                  accent === "primary" ? "bg-primary-200" : "bg-secondary-200",
                )}
                aria-hidden
              />
            )}

            {/* TOP: icon + check indicator */}
            <div className="flex w-full items-start justify-between">
              <span
                className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200",
                  isActive
                    ? accent === "primary"
                      ? "bg-primary text-white shadow-pop"
                      : "bg-secondary text-white shadow-warm"
                    : accent === "primary"
                      ? "bg-primary-50 text-primary-600 group-hover:bg-primary group-hover:text-white"
                      : "bg-secondary-50 text-secondary-600 group-hover:bg-secondary group-hover:text-white",
                )}
              >
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </span>

              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isActive
                    ? accent === "primary"
                      ? "scale-100 bg-primary text-white opacity-100"
                      : "scale-100 bg-secondary text-white opacity-100"
                    : "scale-50 bg-muted/0 text-transparent opacity-0",
                )}
                aria-hidden
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
              </span>
            </div>

            {/* MIDDLE: title + description */}
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold leading-tight text-foreground md:text-xl">
                {opt.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {opt.description}
              </p>
            </div>

            {/* BOTTOM: info chip (pushed to baseline via mt-auto) */}
            <div
              className={cn(
                "mt-auto flex w-full items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors",
                isActive
                  ? "border-border/60 bg-white/90 text-foreground/80 backdrop-blur-sm"
                  : "border-border bg-background/80 text-muted",
              )}
            >
              <InfoIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="font-semibold">{opt.info}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
