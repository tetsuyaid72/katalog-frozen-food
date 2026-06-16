"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackName?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProductImage({
  src,
  alt,
  className,
  fallbackName,
  priority,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-muted/40 via-muted/20 to-muted/10",
          className,
        )}
      >
        <span className="font-display text-5xl font-black text-muted/40 md:text-6xl">
          {fallbackName?.charAt(0).toUpperCase() ?? "?"}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/60">
          No image
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
