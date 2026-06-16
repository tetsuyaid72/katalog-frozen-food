# Katalog Frozen Food

> Katalog frozen food online dengan checkout WhatsApp otomatis. Frontend-only MVP yang siap di-fork dan di-customize untuk toko frozen food rumahan.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## ✨ Fitur Utama

- 🛒 **Katalog produk** dengan filter kategori & pencarian real-time
- 🧺 **Keranjang belanja** dengan state management Zustand + persistensi localStorage
- 💬 **Checkout WhatsApp** otomatis dengan format pesan terstruktur
- 📱 **Mobile-first** — responsive untuk mobile, tablet, dan desktop
- 🎨 **Modern UI** dengan shadcn/ui + Tailwind CSS + Geist & Fraunces fonts
- ♿ **A11y-friendly** — semantic HTML, label form, dan kontras yang baik
- ⚡ **Performa** — Next.js 15 App Router, Server Components, dan prefetching

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| State | Zustand 5 (cart) + persist middleware |
| Forms | React Hook Form 7 + Zod 3 |
| UI Icons | lucide-react |
| Toasts | sonner |
| Maps API | OpenStreetMap Nominatim (reverse geocoding) |

## 🚀 Quick Start

Prasyarat: **Node.js 18+** dan **npm**.

```bash
# 1. Clone
git clone https://github.com/<USERNAME_GITHUB>/katalog-frozen-food.git
cd katalog-frozen-food

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build production

```bash
npm run build
npm start
```

### Lint & typecheck

```bash
npm run lint
npm run typecheck
```

## 📂 Struktur Folder (ringkas)

```
src/
├── app/                # App Router (Next.js 15)
│   ├── api/            # API routes (reverse geocoding)
│   ├── checkout/       # Halaman checkout
│   ├── produk/[slug]/  # Halaman detail produk (SSG)
│   ├── layout.tsx
│   └── page.tsx        # Landing page
├── components/         # Komponen UI
│   ├── cart/           # Drawer keranjang
│   ├── checkout/       # Form checkout
│   ├── layout/         # Header, footer, nav
│   ├── product/        # Card, detail, filter, search
│   ├── sections/       # Hero, kategori, promo, dll
│   └── ui/             # shadcn/ui primitives
├── data/               # Mock data (products, categories, store)
├── stores/             # Zustand stores
├── types/              # TypeScript types
└── lib/                # Helpers (cn, format currency, dll)
```

Dokumentasi produk lengkap: lihat [PRD.md](./PRD.md).

## 🛍️ Cara Customize untuk Toko Kamu

1. **Ganti data toko** — edit `src/data/store.ts` (nama, WhatsApp, alamat, jam buka)
2. **Ganti produk** — edit `src/data/products.ts` (nama, harga, gambar, kategori, stok)
3. **Ganti kategori** — edit `src/data/categories.ts`
4. **Ganti brand** — update `metadata` di `src/app/layout.tsx` dan komponen `Header` / `Footer`
5. **Ganti warna tema** — edit `tailwind.config.ts` dan `src/app/globals.css`

Gambar produk default menggunakan URL Unsplash. Untuk produksi, upload gambar ke hosting sendiri (Cloudinary, ImgBB, Vercel Blob, dll) dan update field `image` di `products.ts`.

## 🗺️ Roadmap (ide pengembangan)

- [ ] Integrasi backend (Supabase / PostgreSQL)
- [ ] Dashboard admin untuk owner
- [ ] Manajemen stok real-time
- [ ] Ongkos kirim otomatis (RajaOngkir / Biteship)
- [ ] Notifikasi pesanan ke WhatsApp owner via webhook
- [ ] Multi bahasa (ID / EN)
- [ ] PWA support

Lihat [PRD.md](./PRD.md) section 27 untuk detail rencana backend.

## 🤝 Kontribusi

Pull request dan issue sangat diterima! Untuk perubahan besar, mohon buka issue dulu untuk diskusi.

## 📄 Lisensi

[MIT](./LICENSE) — bebas dipakai untuk komersial maupun pribadi, dengan tetap menyertakan atribusi copyright.

## 🙏 Kredit

- Fonts: [Geist](https://vercel.com/font) & [Fraunces](https://fonts.google.com/specimen/Fraunces) dari Google Fonts
- Icons: [Lucide](https://lucide.dev)
- UI primitives: [shadcn/ui](https://ui.shadcn.com)
- Maps data: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
