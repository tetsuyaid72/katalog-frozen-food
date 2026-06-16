# PRD.md — Frozen Food Katalog WhatsApp Order

## 1. Ringkasan Produk

**Frozen Food Katalog WhatsApp Order** adalah webapp katalog produk frozen food yang memungkinkan pembeli melihat produk, memilih item, memasukkan ke keranjang, lalu checkout langsung ke WhatsApp owner dengan format pesanan otomatis.

Project ini dibuat **frontend only terlebih dahulu**, sehingga belum menggunakan backend/database asli. Semua data produk, kategori, toko, dan keranjang menggunakan mock data/local state. Struktur frontend harus tetap disiapkan agar nanti mudah dihubungkan ke backend seperti Supabase, API route, atau database lain.

---

## 2. Masalah yang Ingin Diselesaikan

Banyak penjual frozen food masih menjual produk lewat WhatsApp secara manual. Produk biasanya dikirim satu per satu lewat chat, story WhatsApp, atau katalog gambar. Ini membuat pembeli sulit melihat daftar produk secara lengkap, dan owner harus berulang kali menjawab pertanyaan seperti harga, stok, varian, dan cara pesan.

Masalah utama:

1. Produk tidak tersusun rapi.
2. Pembeli harus tanya harga satu-satu.
3. Owner sering mengirim katalog manual lewat chat.
4. Pesanan mudah salah karena ditulis manual.
5. Tidak ada keranjang sebelum checkout.
6. Bisnis terlihat kurang profesional.
7. Produk frozen food butuh info jelas seperti berat, isi, stok, dan cara penyimpanan.

---

## 3. Solusi

Membuat website katalog frozen food yang rapi, modern, ringan, dan responsif.

Pembeli bisa:

1. Melihat daftar produk frozen food.
2. Memfilter berdasarkan kategori.
3. Melihat detail produk.
4. Menambahkan produk ke keranjang.
5. Mengatur jumlah pesanan.
6. Checkout langsung ke WhatsApp owner.
7. Mengirim format pesanan otomatis.

Owner bisa:

1. Menampilkan produk secara profesional.
2. Membagikan link katalog ke WhatsApp, Instagram, TikTok, atau bio.
3. Mengurangi chat berulang dari pembeli.
4. Menerima pesanan dengan format rapi.

---

## 4. Tujuan Produk

### Tujuan Utama

Membuat webapp katalog frozen food yang mempermudah pembeli memilih produk dan melakukan checkout ke WhatsApp.

### Tujuan Frontend

1. Membuat UI katalog yang modern dan menarik.
2. Membuat pengalaman belanja yang simpel.
3. Membuat sistem keranjang frontend.
4. Membuat checkout WhatsApp otomatis.
5. Membuat desain responsif untuk mobile, tablet, dan desktop.
6. Menyiapkan struktur frontend yang mudah diintegrasikan ke backend di fase berikutnya.

---

## 5. Target Pengguna

### Primary User

Pembeli frozen food rumahan yang ingin melihat produk dan melakukan pemesanan lewat WhatsApp.

### Secondary User

Owner bisnis frozen food yang ingin punya katalog online sederhana dan profesional.

---

## 6. Persona Pengguna

### Persona 1 — Pembeli Rumahan

Nama: Ibu Dina
Kebutuhan: Mau beli frozen food untuk stok makanan keluarga.
Masalah: Tidak mau scroll chat panjang untuk lihat produk.
Solusi: Buka katalog, pilih produk, checkout ke WhatsApp.

### Persona 2 — Owner Frozen Food

Nama: Kak Rani
Kebutuhan: Ingin produk jualannya tampil rapi dan mudah dibagikan.
Masalah: Capek membalas pertanyaan harga dan stok berulang.
Solusi: Bagikan link katalog, pembeli pesan otomatis lewat WhatsApp.

---

## 7. Scope Project Frontend Only

### Termasuk di MVP Frontend

1. Landing page toko.
2. Header dan navbar.
3. Hero section.
4. Section kategori produk.
5. List produk frozen food.
6. Card produk.
7. Detail produk.
8. Keranjang belanja.
9. Checkout WhatsApp.
10. Search produk.
11. Filter kategori.
12. Badge stok tersedia/habis.
13. Responsive layout.
14. Empty state.
15. Loading skeleton dummy.
16. Data produk menggunakan mock data.
17. State keranjang menggunakan Zustand/local state.
18. Desain mobile-first.

### Tidak Termasuk di Fase Frontend Only

1. Login owner.
2. Dashboard admin.
3. Database.
4. Payment gateway.
5. QRIS otomatis.
6. Upload gambar produk.
7. Manajemen stok real-time.
8. Multi toko.
9. Ongkir otomatis.
10. Notifikasi pesanan.
11. Auth user.
12. Integrasi Supabase.

---

## 8. Konsep Brand

### Nama Toko Demo

**Frozen Mama**

### Tagline

**Frozen Food Praktis untuk Stok Harian Keluarga**

### Gaya Visual

Modern, clean, fresh, dan friendly.

### Kesan UI

1. Bersih.
2. Mudah dipahami.
3. Tidak terlalu ramai.
4. Cocok untuk ibu rumah tangga dan keluarga muda.
5. Produk terlihat menggugah selera.
6. Mobile-first karena mayoritas pembeli membuka dari HP.

---

## 9. Tech Stack Frontend

Gunakan stack berikut:

1. **Next.js App Router**
2. **TypeScript**
3. **Tailwind CSS**
4. **shadcn/ui**
5. **Lucide React**
6. **Zustand** untuk cart state
7. **React Hook Form** untuk form checkout sederhana
8. **Zod** untuk validasi form
9. **Framer Motion** untuk animasi ringan
10. **Sonner** untuk toast notification

---

## 10. Struktur Folder

```txt
src/
  app/
    page.tsx
    produk/
      [slug]/
        page.tsx
    checkout/
      page.tsx
    layout.tsx
    globals.css

  components/
    layout/
      header.tsx
      footer.tsx
      mobile-nav.tsx

    sections/
      hero-section.tsx
      category-section.tsx
      product-section.tsx
      promo-section.tsx
      how-to-order-section.tsx

    product/
      product-card.tsx
      product-grid.tsx
      product-detail.tsx
      product-filter.tsx
      product-search.tsx

    cart/
      cart-drawer.tsx
      cart-item.tsx
      cart-summary.tsx
      cart-button.tsx

    checkout/
      checkout-form.tsx
      whatsapp-preview.tsx

    ui/
      button.tsx
      card.tsx
      badge.tsx
      input.tsx
      sheet.tsx
      dialog.tsx
      separator.tsx
      skeleton.tsx

  data/
    products.ts
    categories.ts
    store.ts

  stores/
    cart-store.ts

  types/
    product.ts
    category.ts
    cart.ts
    store.ts

  lib/
    format-currency.ts
    generate-whatsapp-url.ts
    cn.ts
```

---

## 11. Data Model Frontend

### Product Type

```ts
export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  weight: string;
  stockStatus: "available" | "low_stock" | "sold_out";
  isBestSeller?: boolean;
  isPromo?: boolean;
};
```

### Category Type

```ts
export type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string;
};
```

### Cart Item Type

```ts
export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
```

### Store Type

```ts
export type StoreProfile = {
  name: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  address: string;
  openHours: string;
  instagram?: string;
};
```

---

## 12. Contoh Kategori Produk

1. Semua Produk
2. Nugget
3. Sosis
4. Bakso
5. Dimsum
6. Kentang
7. Seafood
8. Paket Hemat
9. Best Seller
10. Promo

---

## 13. Contoh Produk Dummy

Minimal siapkan 12 produk dummy:

1. Chicken Nugget 500gr
2. Sosis Ayam 500gr
3. Bakso Sapi Premium 500gr
4. Dimsum Ayam Isi 20
5. Kentang Shoestring 1kg
6. Fish Roll 500gr
7. Scallop Ikan 500gr
8. Otak-Otak Singapore 500gr
9. Tempura Ikan 500gr
10. Cireng Frozen Isi Ayam
11. Paket Hemat Anak
12. Paket Frozen Keluarga

Setiap produk harus punya:

1. Nama.
2. Harga.
3. Gambar.
4. Deskripsi singkat.
5. Berat/isi.
6. Kategori.
7. Status stok.
8. Badge best seller atau promo jika ada.

---

## 14. Halaman dan Fitur

## 14.1 Home Page `/`

Home page adalah halaman utama katalog toko.

### Section yang wajib ada:

1. Header
2. Hero section
3. Kategori produk
4. Produk best seller
5. Semua produk
6. Promo section
7. Cara pesan
8. Footer
9. Floating cart button
10. Floating WhatsApp button

### Hero Section

Isi hero:

* Nama toko: Frozen Mama
* Tagline: Frozen Food Praktis untuk Stok Harian Keluarga
* Deskripsi singkat
* Tombol CTA: Lihat Produk
* Tombol CTA kedua: Chat WhatsApp
* Gambar produk frozen food

Contoh copywriting:

```txt
Stok makanan praktis untuk keluarga, tinggal goreng atau kukus kapan saja. Pilih produk favoritmu, masukkan ke keranjang, lalu checkout langsung ke WhatsApp.
```

### Category Section

Menampilkan kategori produk dalam bentuk horizontal scroll di mobile dan grid di desktop.

Kategori yang aktif harus terlihat jelas.

### Product Section

Menampilkan produk dalam bentuk grid.

Desktop: 4 kolom
Tablet: 3 kolom
Mobile: 2 kolom

Card produk harus berisi:

1. Gambar produk.
2. Badge promo/best seller.
3. Nama produk.
4. Berat/isi.
5. Harga.
6. Status stok.
7. Tombol tambah ke keranjang.

### Promo Section

Menampilkan promo sederhana seperti:

```txt
Paket Hemat Mingguan
Beli paket frozen food keluarga mulai dari Rp75.000.
```

### How to Order Section

Langkah pemesanan:

1. Pilih produk.
2. Masukkan ke keranjang.
3. Klik checkout.
4. Pesanan terkirim ke WhatsApp.
5. Tunggu konfirmasi owner.

---

## 14.2 Product Detail Page `/produk/[slug]`

Halaman detail produk.

Isi halaman:

1. Gambar produk besar.
2. Nama produk.
3. Harga.
4. Berat/isi.
5. Status stok.
6. Deskripsi.
7. Cara penyimpanan.
8. Tombol tambah ke keranjang.
9. Tombol beli via WhatsApp.
10. Produk terkait.

Contoh cara penyimpanan:

```txt
Simpan dalam freezer pada suhu beku. Jangan dibekukan ulang setelah produk mencair.
```

---

## 14.3 Checkout Page `/checkout`

Halaman checkout sebelum diarahkan ke WhatsApp.

Isi halaman:

1. Ringkasan produk.
2. Jumlah item.
3. Total harga.
4. Form data pembeli.
5. Preview pesan WhatsApp.
6. Tombol Kirim ke WhatsApp.

Field form:

1. Nama pembeli.
2. Nomor WhatsApp pembeli.
3. Alamat.
4. Catatan pesanan.

Validasi:

1. Nama wajib diisi.
2. Nomor WhatsApp wajib diisi.
3. Alamat wajib diisi.
4. Keranjang tidak boleh kosong.

---

## 15. Format Pesan WhatsApp

Saat checkout, sistem harus membuat URL WhatsApp otomatis.

Contoh format pesan:

```txt
Halo Frozen Mama, saya mau pesan:

1. Chicken Nugget 500gr x2 = Rp70.000
2. Dimsum Ayam Isi 20 x1 = Rp32.000

Total Pesanan: Rp102.000

Data Pembeli:
Nama: Dina
No. WhatsApp: 08123456789
Alamat: Jl. Melati No. 10
Catatan: Tolong dikirim sore ya.

Terima kasih.
```

URL harus menggunakan format:

```txt
https://wa.me/{nomorOwner}?text={encodedMessage}
```

Nomor WhatsApp owner disimpan di file mock store profile.

---

## 16. Cart Behavior

Keranjang harus memiliki fitur:

1. Tambah produk.
2. Kurangi jumlah produk.
3. Hapus produk.
4. Kosongkan keranjang.
5. Hitung total item.
6. Hitung total harga.
7. Simpan sementara di localStorage.
8. Tampilkan toast saat produk ditambahkan.
9. Tampilkan drawer cart di mobile dan desktop.

Rules:

1. Produk sold out tidak bisa ditambahkan ke keranjang.
2. Jika produk sudah ada di cart, quantity bertambah.
3. Jika quantity 0, produk dihapus.
4. Tombol checkout disabled jika cart kosong.

---

## 17. UI/UX Requirement

### Prinsip Desain

1. Mobile-first.
2. Clean dan modern.
3. Card produk harus jelas.
4. Harga harus mudah terlihat.
5. Tombol checkout harus menonjol.
6. Jangan terlalu banyak animasi.
7. Gunakan spacing yang lega.
8. Gunakan warna yang terasa fresh dan makanan.

### Warna

Rekomendasi color palette:

```txt
Primary: #0EA5E9
Secondary: #F97316
Background: #F8FAFC
Card: #FFFFFF
Text: #0F172A
Muted: #64748B
Border: #E2E8F0
Success: #16A34A
Warning: #F59E0B
Danger: #DC2626
```

Primary biru memberi kesan dingin/frozen, secondary orange memberi kesan makanan dan promo.

### Font

Gunakan font:

```txt
Geist Sans
```

Alternatif:

```txt
Poppins
```

### Layout

Mobile:

1. Header sticky.
2. Category horizontal scroll.
3. Product grid 2 kolom.
4. Cart drawer dari bawah/kanan.
5. Floating cart button.

Desktop:

1. Container maksimal 1200px.
2. Product grid 4 kolom.
3. Header horizontal.
4. Cart drawer dari kanan.

---

## 18. Component Requirement

### ProductCard

Props:

```ts
type ProductCardProps = {
  product: Product;
};
```

Fungsi:

1. Tampilkan gambar produk.
2. Tampilkan nama.
3. Tampilkan harga.
4. Tampilkan badge stok.
5. Tampilkan tombol tambah.
6. Link ke detail produk.

### CartDrawer

Fungsi:

1. Menampilkan daftar item cart.
2. Menambah/mengurangi quantity.
3. Hapus item.
4. Total harga.
5. Tombol checkout.

### CheckoutForm

Fungsi:

1. Input data pembeli.
2. Validasi form.
3. Generate pesan WhatsApp.
4. Redirect ke WhatsApp.

### ProductFilter

Fungsi:

1. Filter berdasarkan kategori.
2. Menampilkan active state.
3. Responsive horizontal scroll.

### ProductSearch

Fungsi:

1. Search berdasarkan nama produk.
2. Search harus realtime.
3. Jika tidak ada hasil, tampilkan empty state.

---

## 19. Empty State

Jika produk tidak ditemukan, tampilkan pesan:

```txt
Produk tidak ditemukan.
Coba gunakan kata kunci lain atau pilih kategori berbeda.
```

Jika keranjang kosong:

```txt
Keranjang masih kosong.
Yuk pilih frozen food favoritmu dulu.
```

---

## 20. Loading State

Walaupun data masih mock, siapkan komponen skeleton untuk future API.

Loading state digunakan pada:

1. Product grid.
2. Product detail.
3. Checkout summary.

---

## 21. Responsive Requirement

### Mobile

Ukuran: 360px - 767px

Requirement:

1. Product grid 2 kolom.
2. Header tidak terlalu tinggi.
3. Tombol mudah diklik.
4. Floating cart tidak menutupi konten.
5. Category bisa digeser horizontal.
6. Text harga tetap jelas.

### Tablet

Ukuran: 768px - 1023px

Requirement:

1. Product grid 3 kolom.
2. Hero bisa 2 kolom.
3. Spacing lebih lega.

### Desktop

Ukuran: 1024px ke atas

Requirement:

1. Product grid 4 kolom.
2. Container maksimal 1200px.
3. Hero 2 kolom.
4. Cart drawer dari kanan.

---

## 22. SEO Frontend

Siapkan metadata:

```ts
title: "Frozen Mama — Katalog Frozen Food Online"
description: "Pesan frozen food praktis untuk keluarga. Pilih produk, masukkan ke keranjang, dan checkout langsung ke WhatsApp."
```

Open Graph:

1. Title.
2. Description.
3. Image.
4. URL.

---

## 23. Accessibility

Requirement:

1. Semua tombol punya label jelas.
2. Gambar produk punya alt text.
3. Warna teks harus kontras.
4. Form punya label.
5. Bisa digunakan dengan keyboard.
6. Dialog/drawer bisa ditutup dengan tombol close.
7. Jangan hanya mengandalkan warna untuk status stok.

---

## 24. Performance Requirement

1. Gambar produk harus optimized.
2. Gunakan Next Image jika memungkinkan.
3. Hindari animasi berat.
4. Komponen dipisah agar maintainable.
5. Cart state ringan.
6. First load harus cepat.
7. Jangan import library yang tidak perlu.

---

## 25. Acceptance Criteria

Project dianggap selesai untuk fase frontend only jika:

1. Home page tampil rapi dan responsif.
2. Produk dummy tampil minimal 12 item.
3. Filter kategori berfungsi.
4. Search produk berfungsi.
5. Tombol tambah ke keranjang berfungsi.
6. Cart drawer berfungsi.
7. Quantity produk bisa ditambah/dikurangi.
8. Produk bisa dihapus dari cart.
9. Total harga otomatis berubah.
10. Halaman checkout tampil.
11. Form checkout memiliki validasi.
12. Pesan WhatsApp otomatis tergenerate.
13. Tombol checkout membuka WhatsApp owner.
14. Produk sold out tidak bisa ditambahkan ke cart.
15. Product detail page bisa dibuka.
16. UI nyaman di mobile, tablet, dan desktop.
17. Tidak ada error TypeScript.
18. Tidak ada layout yang rusak.
19. Struktur folder rapi.
20. Data mock mudah diganti ke API/backend nanti.

---

## 26. Development Phase

## Phase 1 — Setup Project

Tujuan:

1. Setup Next.js TypeScript.
2. Setup Tailwind.
3. Setup shadcn/ui.
4. Setup folder structure.
5. Setup mock data.
6. Setup helper format currency.

Output:

1. Project bisa dijalankan.
2. Struktur folder rapi.
3. Data produk dummy tersedia.

---

## Phase 2 — Layout dan Landing Page

Tujuan:

1. Buat header.
2. Buat hero section.
3. Buat footer.
4. Buat section cara pesan.
5. Buat promo section.

Output:

1. Landing page terlihat modern.
2. Responsive mobile dan desktop.

---

## Phase 3 — Product Catalog

Tujuan:

1. Buat product card.
2. Buat product grid.
3. Buat category filter.
4. Buat search produk.
5. Buat empty state.

Output:

1. Produk tampil rapi.
2. Filter dan search berfungsi.

---

## Phase 4 — Cart System

Tujuan:

1. Setup Zustand cart store.
2. Buat add to cart.
3. Buat cart drawer.
4. Buat cart item.
5. Buat total price.
6. Simpan cart ke localStorage.

Output:

1. Keranjang berfungsi penuh.
2. Quantity bisa diatur.
3. Total otomatis berubah.

---

## Phase 5 — Product Detail

Tujuan:

1. Buat halaman detail produk.
2. Tampilkan info produk lengkap.
3. Tambahkan CTA add to cart.
4. Tambahkan produk terkait.

Output:

1. Detail produk bisa dibuka dari card.
2. CTA berfungsi.

---

## Phase 6 — Checkout WhatsApp

Tujuan:

1. Buat halaman checkout.
2. Buat form data pembeli.
3. Validasi form dengan Zod.
4. Generate pesan WhatsApp.
5. Redirect ke WhatsApp owner.

Output:

1. Checkout berjalan sampai WhatsApp.
2. Format pesan rapi.

---

## Phase 7 — Polish UI

Tujuan:

1. Perbaiki spacing.
2. Perbaiki responsive.
3. Tambah animasi ringan.
4. Tambah skeleton.
5. Tambah toast.
6. Perbaiki accessibility.

Output:

1. UI terasa siap demo.
2. Tidak ada tampilan berantakan di mobile.

---

## 27. Future Backend Plan

Walaupun fase ini frontend only, struktur harus siap untuk backend.

Nanti data ini bisa dipindah:

1. `data/products.ts` → tabel `products`
2. `data/categories.ts` → tabel `categories`
3. `data/store.ts` → tabel `stores`
4. Cart tetap frontend/localStorage
5. Checkout tetap WhatsApp
6. Admin dashboard ditambahkan di fase berikutnya

Backend yang direkomendasikan:

1. Supabase Database
2. Supabase Auth
3. Supabase Storage
4. Row Level Security
5. Admin dashboard untuk owner

---

## 28. Catatan Penting untuk Developer

1. Jangan membuat backend dulu.
2. Jangan membuat login dulu.
3. Jangan membuat dashboard admin dulu.
4. Fokus pada tampilan pembeli.
5. Pastikan flow belanja sampai WhatsApp berjalan.
6. Gunakan mock data yang realistis.
7. UI harus bagus di mobile.
8. Jangan terlalu banyak fitur.
9. Struktur harus bersih agar mudah lanjut ke backend.
10. Semua komponen harus reusable.

---

## 29. Definition of Done

Frontend MVP selesai jika user bisa membuka website, melihat produk frozen food, mencari produk, memfilter kategori, memasukkan produk ke keranjang, mengisi data checkout, lalu mengirim pesanan ke WhatsApp owner dengan format pesan otomatis.

Target utama:

```txt
Buka katalog → pilih produk → masuk keranjang → checkout → WhatsApp terbuka.
```

Itulah inti produk fase pertama.
