"use client";

import { useEffect, useState } from "react";

import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

type CategoryFilterProps = {
  active: string;
  onChange: (category: string) => void;
  className?: string;
};

export function CategoryFilter({
  active,
  onChange,
  className,
}: CategoryFilterProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={cn("relative", className)}>
      <div className="hide-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 pt-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {categories.map((cat, idx) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={cn(
                "group relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "border-transparent bg-foreground text-white shadow-pop"
                  : "border-border bg-white text-foreground/80 hover:border-primary/30 hover:text-primary",
                mounted && "animate-fade-up",
              )}
              style={{
                animationDelay: mounted ? `${idx * 40}ms` : undefined,
              }}
              aria-pressed={isActive}
            >
              <span className="inline-flex items-center gap-1.5">
                {cat.id === "best_seller" && (
                  <CrownIcon active={isActive} />
                )}
                {cat.id === "promo" && <FlameIcon active={isActive} />}
                {cat.name}
              </span>
              {cat.id === "best_seller" && !isActive && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-500" />
              )}
              {cat.id === "promo" && !isActive && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-secondary animate-blink-blink" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CrownIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    >
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zM5 21h14" />
    </svg>
  );
}

function FlameIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
