import Link from "next/link";
import { Snowflake, Instagram, MessageCircle, MapPin, Clock } from "lucide-react";

import { storeProfile } from "@/data/store";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-foreground text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container relative grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5"
            aria-label={storeProfile.name}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <Snowflake className="h-5 w-5" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xl font-bold">
                Frozen <span className="text-primary-300">Mama</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Stock. Fry. Love.
              </span>
            </div>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            {storeProfile.description}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 text-sm text-white/70">
            <a
              href={`https://wa.me/${storeProfile.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <MessageCircle className="h-4 w-4 text-success" />
              {storeProfile.whatsappNumber}
            </a>
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
              {storeProfile.address}
            </p>
            <p className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary-300" />
              {storeProfile.openHours}
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-base font-bold">Kategori</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {categories.slice(0, 7).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/#katalog`}
                  className="hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-display text-base font-bold">Belanja via WhatsApp</h4>
          <p className="mt-4 text-sm text-white/70">
            Pilih produk favorit, tambahkan ke keranjang, dan checkout langsung
            ke WhatsApp. Praktis, rapi, dan tanpa registrasi.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/#katalog"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-pop hover:bg-primary-600"
            >
              Lihat Katalog
            </Link>
            {storeProfile.instagram && (
              <a
                href={`https://instagram.com/${storeProfile.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
              >
                <Instagram className="h-4 w-4" />
                {storeProfile.instagram}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {storeProfile.name}. Frozen food
            praktis untuk keluarga Indonesia.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Dibuat dengan <span className="text-secondary-300">❄</span> &
            banyak kentang goreng.
          </p>
        </div>
      </div>
    </footer>
  );
}
