"use client";

import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/format-currency";

type CartSummaryProps = {
  className?: string;
};

export function CartSummary({ className }: CartSummaryProps) {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  if (items.length === 0) {
    return (
      <div className={className}>
        <p className="text-sm text-muted">Belum ada item.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex items-start justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-muted">
                {item.weight} · {item.quantity} × {formatCurrency(item.price)}
              </p>
            </div>
            <span className="font-display font-bold text-foreground">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            Total ({totalItems} item)
          </p>
          <p className="font-display text-2xl font-extrabold text-foreground">
            {formatCurrency(totalPrice)}
          </p>
        </div>
        <p className="text-right text-[11px] text-muted">
          Ongkir dikonfirmasi via
          <br />
          WhatsApp
        </p>
      </div>
    </div>
  );
}
