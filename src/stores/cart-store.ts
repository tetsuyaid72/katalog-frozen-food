"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartState } from "@/types/cart";
import type { Product } from "@/types/product";

type CartActions = {
  addItem: (product: Product) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        if (product.stockStatus === "sold_out") return;
        const items = get().items;
        const existing = items.find((i) => i.productId === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
            isOpen: true,
          });
        } else {
          const newItem: CartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight,
            quantity: 1,
          };
          set({ items: [...items, newItem], isOpen: true });
        }
      },

      increase: (productId) => {
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        });
      },

      decrease: (productId) => {
        const items = get().items;
        const target = items.find((i) => i.productId === productId);
        if (!target) return;
        if (target.quantity <= 1) {
          set({ items: items.filter((i) => i.productId !== productId) });
        } else {
          set({
            items: items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            ),
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      clear: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "frozen-mama-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      // Prevent auto-hydration during store creation. We rehydrate manually
      // from StoreProvider after the first client render so the server
      // output (empty cart) matches the first client render and we avoid
      // hydration mismatches.
      skipHydration: true,
    },
  ),
);
