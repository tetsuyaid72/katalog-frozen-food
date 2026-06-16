"use client";

const steps = [
  {
    n: "01",
    title: "Pilih produk favorit",
    description:
      "Gunakan filter kategori atau search bar untuk cari frozen food yang kamu mau.",
    color: "from-primary-500 to-primary-600",
    icon: "🛒",
  },
  {
    n: "02",
    title: "Masukkan ke keranjang",
    description:
      "Atur jumlah pesanan, lalu klik checkout. Keranjangmu tersimpan otomatis.",
    color: "from-secondary-500 to-secondary-600",
    icon: "📦",
  },
  {
    n: "03",
    title: "Isi data pembeli",
    description:
      "Lengkapi nama, alamat, dan nomor WhatsApp. Format pesan otomatis rapi.",
    color: "from-emerald-500 to-emerald-600",
    icon: "📝",
  },
  {
    n: "04",
    title: "Kirim ke WhatsApp",
    description:
      "Satu klik, pesananmu langsung terkirim ke WhatsApp Mama. Tinggal tunggu konfirmasi.",
    color: "from-amber-500 to-amber-600",
    icon: "💬",
  },
];

export function HowToOrderSection() {
  return (
    <section
      id="cara-pesan"
      className="relative overflow-hidden py-14 md:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary-700">
            Cara Pesan
          </span>
          <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
            Dari keranjang ke WhatsApp dalam{" "}
            <span className="relative inline-block text-primary">
              4 langkah
              <span className="absolute -right-3 -top-2 text-lg text-secondary">
                ✦
              </span>
            </span>
            .
          </h2>
          <p className="mt-3 text-foreground/70">
            Tidak perlu registrasi, tidak perlu aplikasi tambahan. Praktis
            dan terstruktur untuk stok makan keluarga.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.n}
              className="group relative overflow-hidden rounded-3xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-pop"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className={`absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-2xl text-white opacity-15 transition-opacity group-hover:opacity-25`}
              >
                {step.icon}
              </div>
              <p className="font-display text-xs font-extrabold tracking-widest text-muted">
                {step.n}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold leading-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                {step.description}
              </p>
              <div
                className={`mt-4 h-1 w-12 rounded-full bg-gradient-to-r ${step.color}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
