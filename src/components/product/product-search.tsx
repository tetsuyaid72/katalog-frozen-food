"use client";

import { Search, X } from "lucide-react";

import { cn } from "@/lib/cn";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function ProductSearch({
  value,
  onChange,
  placeholder = "Cari nugget, sosis, atau frozen food favorit...",
  className,
}: ProductSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-border bg-white pl-11 pr-12 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
        aria-label="Cari produk"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-3 my-auto h-8 w-8 rounded-full text-muted transition-colors hover:bg-muted/20 hover:text-foreground"
          aria-label="Bersihkan pencarian"
        >
          <X className="m-auto h-4 w-4" />
        </button>
      )}
    </div>
  );
}
