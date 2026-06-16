"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-2xl border border-border shadow-pop text-sm font-medium",
          title: "font-bold",
        },
      }}
    />
  );
}
