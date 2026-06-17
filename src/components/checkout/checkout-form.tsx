"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Phone,
  MapPin,
  FileText,
  ShoppingBag,
  Clock,
  Navigation,
  Snowflake,
  ExternalLink,
} from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { storeProfile } from "@/data/store";
import {
  buildWhatsappMessage,
  generateWhatsappUrl,
} from "@/lib/generate-whatsapp-url";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { CartSummary } from "@/components/cart/cart-summary";
import { WhatsappPreview } from "./whatsapp-preview";
import { DeliveryMethodSelector } from "./delivery-method-selector";
import { LocationPicker } from "./location-picker";
import type { DeliveryMethod, GeoLocation } from "@/types/checkout";

const checkoutSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nama minimal 2 karakter")
      .max(60, "Nama terlalu panjang"),
    whatsapp: z
      .string()
      .min(8, "Nomor WhatsApp minimal 8 digit")
      .max(20, "Nomor WhatsApp terlalu panjang")
      .regex(/^[0-9+\s-]+$/, "Hanya boleh angka, +, spasi, atau strip"),
    deliveryMethod: z.enum(["delivery", "pickup"]),
    address: z.string().max(300, "Alamat terlalu panjang").optional(),
    note: z.string().max(200, "Catatan maksimal 200 karakter").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "delivery") {
      if (!data.address || data.address.trim().length < 8) {
        ctx.addIssue({
          code: "custom",
          path: ["address"],
          message:
            "Alamat terlalu pendek, tambahkan detail jalan, nomor rumah, dan patokan.",
        });
      }
    }
  });

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);
  const [location, setLocation] = useState<GeoLocation | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      whatsapp: "",
      deliveryMethod: "delivery",
      address: "",
      note: "",
    },
  });

  const values = watch();
  const deliveryMethod: DeliveryMethod = values.deliveryMethod ?? "delivery";

  // When delivery method changes, clear address / location so the user
  // doesn't carry state over between modes.
  useEffect(() => {
    setValue("address", "", { shouldValidate: false });
    setLocation(null);
    trigger("address");
  }, [deliveryMethod, setValue, trigger]);

  const message = useMemo(() => {
    if (items.length === 0) return "";
    return buildWhatsappMessage({
      storeName: storeProfile.name,
      buyer: {
        name: values.name || "Nama kamu",
        whatsapp: values.whatsapp || "08xxxxxxxxxx",
        deliveryMethod,
        address:
          deliveryMethod === "delivery"
            ? values.address || "Alamat kamu"
            : undefined,
        location: deliveryMethod === "delivery" ? location ?? undefined : undefined,
        pickupInfo:
          deliveryMethod === "pickup"
            ? {
                address: storeProfile.address,
                openHours: storeProfile.openHours,
                mapsUrl: storeProfile.mapsUrl,
              }
            : undefined,
        note: values.note,
      },
      items,
    });
  }, [items, values, deliveryMethod, location]);

  const url = useMemo(() => {
    if (items.length === 0) return "";
    return generateWhatsappUrl(storeProfile.whatsappNumber, message);
  }, [items, message]);

  const handleSend = () => {
    if (items.length === 0) return;
    if (!isValid) return;
    window.open(url, "_blank");
  };

  if (!mounted) {
    return (
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="h-6 w-40 animate-pulse rounded-full bg-muted/30" />
            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded-full bg-muted/30" />
                  <div className="h-12 animate-pulse rounded-2xl bg-muted/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="h-64 animate-pulse rounded-3xl bg-muted/20" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="space-y-6 lg:col-span-7">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft md:p-7">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
              <User className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground md:text-xl">
                Data Pembeli
              </h2>
              <p className="mt-1 text-sm text-muted">
                Data ini akan disertakan di pesan WhatsApp kamu.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-1.5">
                <Navigation className="h-3.5 w-3.5 text-muted" />
                <Label className="text-sm">
                  Cara Pengiriman
                  <span className="ml-1 text-danger">*</span>
                </Label>
              </div>
              <DeliveryMethodSelector
                value={deliveryMethod}
                onChange={(v) =>
                  setValue("deliveryMethod", v, { shouldValidate: true })
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nama Lengkap"
                required
                error={errors.name?.message}
                icon={User}
              >
                <Input
                  placeholder="Contoh: Dina Wulandari"
                  autoComplete="name"
                  {...register("name")}
                  className={cn(errors.name && "border-danger")}
                />
              </Field>

              <Field
                label="Nomor WhatsApp"
                required
                hint="Pastikan nomor aktif untuk konfirmasi pesanan."
                error={errors.whatsapp?.message}
                icon={Phone}
              >
                <Input
                  placeholder="08xxxxxxxxxx"
                  inputMode="tel"
                  autoComplete="tel"
                  {...register("whatsapp")}
                  className={cn(errors.whatsapp && "border-danger")}
                />
              </Field>
            </div>

            {deliveryMethod === "delivery" ? (
              <Field
                label="Alamat Pengiriman"
                required
                hint="Sertakan nama jalan, nomor rumah, kelurahan, dan patokan. Hanya dipakai untuk ongkir."
                error={errors.address?.message}
                icon={MapPin}
              >
                <div className="space-y-2.5">
                  <Textarea
                    placeholder="Jl. Melati No. 10, RT 02/03, Kelurahan..."
                    rows={3}
                    {...register("address")}
                    className={cn(errors.address && "border-danger")}
                  />
                  <LocationPicker
                    value={location}
                    onChange={setLocation}
                    onAddressDetected={(addr) =>
                      setValue("address", addr, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                  />
                </div>
              </Field>
            ) : (
              <PickupInfoCard />
            )}

            <Field
              label="Catatan Pesanan"
              hint="Opsional. Misal: dikirim sore, packing rapat, dll."
              error={errors.note?.message}
              icon={FileText}
            >
              <Textarea
                placeholder="Tolong dikirim sore ya, packing yang rapi..."
                rows={3}
                {...register("note")}
                className={cn(errors.note && "border-danger")}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft md:p-7">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-700">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Pesanan
              </h2>
              <p className="text-sm text-muted">
                {totalItems} item · {formatCurrency(totalPrice)}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <CartSummary />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-24 space-y-4">
          <WhatsappPreview
            message={message}
            url={url}
            canSend={isValid && items.length > 0}
            onSend={handleSend}
          />

          <div className="rounded-3xl border border-border bg-white p-5 text-sm shadow-soft">
            <h3 className="font-display text-sm font-bold text-foreground">
              Setelah kirim?
            </h3>
            <ol className="mt-3 space-y-2.5 text-foreground/80">
              {[
                deliveryMethod === "pickup"
                  ? "Mama akan balas dengan konfirmasi pesanan & jam ambil."
                  : "Mama akan balas dengan konfirmasi stok & ongkir.",
                "Pesanan diproses setelah ada konfirmasi dari kamu.",
                "Pembayaran via transfer/QRIS akan diinfokan via chat.",
              ].map((step, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[10px] font-extrabold text-primary-700">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  icon: Icon,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-muted" />
        <Label className="text-sm">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </Label>
      </div>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-[11px] text-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-[11px] font-semibold text-danger">{error}</p>
      )}
    </div>
  );
}

function PickupInfoCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-secondary-200 bg-gradient-to-br from-secondary-50/60 via-white to-primary-50/40">
      <div className="flex items-start gap-3 p-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-white shadow-warm">
          <Snowflake className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-secondary-700">
            Lokasi Pengambilan
          </p>
          <h3 className="mt-0.5 font-display text-base font-bold text-foreground">
            {storeProfile.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
            {storeProfile.address}
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-white/70 px-3 py-2 text-xs text-foreground/80">
            <Clock className="h-3.5 w-3.5 shrink-0 text-secondary-600" />
            <span>{storeProfile.openHours}</span>
          </div>
          {storeProfile.mapsUrl && (
            <a
              href={storeProfile.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-white shadow-soft transition-colors hover:bg-foreground/90"
            >
              <MapPin className="h-3 w-3" />
              Buka di Google Maps
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-secondary-100/80 bg-white/50 px-4 py-2.5 text-[11px] text-muted">
        Pesanan akan siap diambil setelah dikonfirmasi via WhatsApp. Bawa
        struk/format pesanan dari chat sebagai bukti.
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-white p-10 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-500">
        <ShoppingBag className="h-7 w-7" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold text-foreground">
        Keranjang masih kosong
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">
        Yuk pilih frozen food favoritmu dulu, baru lanjut ke checkout via
        WhatsApp.
      </p>
      <Button asChild className="mt-6">
        <Link href="/#katalog">Lihat Katalog</Link>
      </Button>
    </div>
  );
}
