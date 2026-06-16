import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Snowflake } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary-500">
        <Snowflake className="h-9 w-9" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-black text-foreground md:text-5xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-foreground/70 md:text-base">
        Produk atau halaman yang kamu cari sudah tidak tersedia. Yuk kembali
        ke katalog dan pilih frozen food favoritmu.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
