import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";
import { storeProfile } from "@/data/store";
import { products } from "@/data/products";

export function HeroSection() {
  const heroProducts = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden pb-12 pt-8 md:pb-20 md:pt-12">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-secondary-200/40 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />

      <div className="container relative grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col justify-center md:col-span-7 lg:col-span-7">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-3 py-1.5 text-xs font-bold text-primary-700 shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Stok mingguan fresh & baru</span>
            <span className="ml-1 hidden h-1.5 w-1.5 rounded-full bg-secondary sm:block" />
            <span className="hidden text-foreground/60 sm:inline">
              Kirim Jabodetabek
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:mt-6 md:text-6xl lg:text-[68px]">
            Frozen food{" "}
            <span className="relative inline-block text-primary">
              praktis
              <svg
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 h-3 w-full text-secondary"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8 C 40 2, 80 12, 120 5 S 198 6, 198 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            buat stok harian{" "}
            <span className="relative inline-block">
              keluarga
              <span className="absolute -right-3 -top-3 text-2xl text-secondary-500 md:text-3xl">
                ✦
              </span>
            </span>
            .
          </h1>

          <p className="mt-5 max-w-xl text-base text-foreground/70 md:text-lg">
            Pilih frozen food favorit, masukkan ke keranjang, dan checkout
            langsung ke WhatsApp Mama. Tinggal goreng, kukus, atau tumis —
            dapur tenang, keluarga happy.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="#katalog">
                Lihat Produk
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-success/30 text-success hover:border-success/60 hover:text-success"
            >
              <a
                href={`https://wa.me/${storeProfile.whatsappNumber}?text=${encodeURIComponent(
                  "Halo Frozen Mama, saya mau tanya soal produk.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Chat WhatsApp
              </a>
            </Button>
          </div>

          <dl className="mt-9 grid max-w-md grid-cols-3 gap-3 border-t border-border pt-6 sm:gap-4">
            <div>
              <dt className="text-[9px] font-bold uppercase tracking-wider text-muted sm:text-[10px]">
                Varian
              </dt>
              <dd className="mt-1 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                14<span className="text-primary">+</span>
              </dd>
            </div>
            <div>
              <dt className="text-[9px] font-bold uppercase tracking-wider text-muted sm:text-[10px]">
                Pelanggan
              </dt>
              <dd className="mt-1 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                2.4k<span className="text-secondary">+</span>
              </dd>
            </div>
            <div>
              <dt className="text-[9px] font-bold uppercase tracking-wider text-muted sm:text-[10px]">
                Rating
              </dt>
              <dd className="mt-1 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                4.9<span className="text-amber-500">★</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative md:col-span-5 lg:col-span-5">
          <HeroCollage products={heroProducts} />
        </div>
      </div>
    </section>
  );
}

function HeroCollage({
  products,
}: {
  products: typeof import("@/data/products").products;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-md">
      {/* center large card */}
      <div className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] md:w-[58%]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-[5px] border-white bg-muted/10 shadow-pop md:border-[6px]">
          {products[1] && (
            <ProductImage
              src={products[1].image}
              alt={products[1].name}
              fallbackName={products[1].name}
              sizes="(min-width: 768px) 30vw, 55vw"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="font-display text-sm font-bold text-white">
              {products[1]?.name}
            </p>
            <p className="text-[10px] text-white/80">
              {products[1]?.weight}
            </p>
          </div>
        </div>
        <div className="absolute -left-3 -top-3 rotate-[-18deg] rounded-md bg-amber-300 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-900 shadow-md md:-left-4 md:-top-4">
          Best Seller
        </div>
      </div>

      {/* top right small card */}
      <div className="absolute right-1 top-1 w-[36%] rotate-[8deg] md:right-2 md:top-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border-[4px] border-white bg-muted/10 shadow-pop">
          {products[0] && (
            <ProductImage
              src={products[0].image}
              alt={products[0].name}
              fallbackName={products[0].name}
              sizes="(min-width: 768px) 20vw, 30vw"
            />
          )}
        </div>
        <div className="absolute -right-2 -bottom-2 rotate-12 rounded-full bg-secondary px-2 py-1 text-[9px] font-extrabold uppercase text-white shadow-md md:-right-3 md:-bottom-3">
          Hot 🔥
        </div>
      </div>

      {/* bottom left small card */}
      <div className="absolute bottom-3 left-1 w-[34%] rotate-[-10deg] md:bottom-4 md:left-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border-[4px] border-white bg-muted/10 shadow-pop">
          {products[2] && (
            <ProductImage
              src={products[2].image}
              alt={products[2].name}
              fallbackName={products[2].name}
              sizes="(min-width: 768px) 20vw, 30vw"
            />
          )}
        </div>
      </div>

      {/* bottom right sticker — hidden on small mobile to reduce clutter */}
      <div className="absolute -bottom-1 right-2 hidden rotate-[-4deg] rounded-2xl border-2 border-dashed border-primary bg-primary-50 px-3 py-2 text-[10px] font-bold text-primary-700 shadow-soft sm:block md:-bottom-2 md:right-4">
        <p className="leading-tight">Tinggal goreng</p>
        <p className="text-[8px] text-primary-600/80">siap 5 menit ✦</p>
      </div>

      {/* floating decorations — hidden on small mobile */}
      <span className="absolute -right-4 top-12 hidden text-2xl text-primary-300 animate-float md:block">
        ❄
      </span>
      <span className="absolute -left-2 top-1/2 hidden text-3xl text-secondary-300 animate-float [animation-delay:1s] md:block">
        ✦
      </span>
      <span className="absolute bottom-12 -right-2 hidden text-2xl text-primary animate-blink-blink md:block">
        ★
      </span>
    </div>
  );
}
