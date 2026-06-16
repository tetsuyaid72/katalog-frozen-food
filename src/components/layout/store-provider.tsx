"use client";

import { useEffect } from "react";

import { useCartStore } from "@/stores/cart-store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // The cart store is created with `skipHydration: true` so the first
    // client render matches the server (empty cart). We trigger the
    // localStorage rehydration here, right after the first paint, so the
    // UI updates with the persisted items without throwing a hydration
    // mismatch warning.
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    // Suppress transient "Failed to fetch" errors thrown by Next.js App
    // Router prefetch requests. These happen when:
    //   - the dev server restarts / hot-reloads,
    //   - a request is aborted (e.g. user clicks another link mid-prefetch),
    //   - the target route is still being compiled on first request.
    // The actual navigation still completes on click — only the background
    // RSC prefetch fails, surfacing as an unhandled promise rejection and
    // polluting the console. Re-throw anything that isn't a fetch failure.
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as { name?: string; message?: string } | null;
      const message = reason?.message ?? "";
      const isFetchFailure =
        reason?.name === "TypeError" &&
        (message === "Failed to fetch" ||
          message === "NetworkError when attempting to fetch resource." ||
          message === "Load failed");
      if (isFetchFailure) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
}
