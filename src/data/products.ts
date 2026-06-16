import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "p001",
    name: "Chicken Nugget Crispy",
    slug: "chicken-nugget-crispy",
    description:
      "Nugget ayam fillet asli dengan lapisan crispy yang renyah di luar, juicy di dalam. Cocok untuk stok lauk makan keluarga, bekal anak, atau camilan sore.",
    price: 35000,
    originalPrice: 42000,
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80&auto=format&fit=crop",
    categoryId: "nugget",
    weight: "500 gr",
    stockStatus: "available",
    isBestSeller: true,
    isPromo: true,
    storage:
      "Simpan di freezer pada suhu -18°C. Jangan dibekukan ulang setelah produk mencair.",
    cooking:
      "Goreng di minyak panas 170°C selama 3-4 menit hingga kuning keemasan, atau panaskan di air fryer 180°C selama 6-8 menit.",
    highlights: [
      "100% daging ayam fillet",
      "Tanpa pengawet tambahan",
      "Tanpa MSG berlebihan",
    ],
  },
  {
    id: "p002",
    name: "Sosis Ayam Smoked",
    slug: "sosis-ayam-smoked",
    description:
      "Sosis ayam dengan aroma smoke yang gurih. Diolah dari daging ayam pilihan, cocok untuk sate, sup, atau sosis bakar BBQ.",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80&auto=format&fit=crop",
    categoryId: "sosis",
    weight: "500 gr (isi ±25 pcs)",
    stockStatus: "available",
    isBestSeller: true,
    storage: "Simpan di freezer -18°C. Setelah dibuka langsung masak.",
    cooking:
      "Panggang, rebus, atau goreng 3-5 menit. Cocok untuk sosis bakar, sosis soup, atau sate sosis.",
    highlights: ["Ayam fillet asli", "Aroma smoke alami", "Tanpa pewarna sintetis"],
  },
  {
    id: "p003",
    name: "Bakso Sapi Premium",
    slug: "bakso-sapi-premium",
    description:
      "Bakso daging sapi premium dengan tekstur kenyal dan rasa kaldu sapi yang kuat. Cocok untuk bakso urat, mie bakso, atau pangsit.",
    price: 48000,
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80&auto=format&fit=crop",
    categoryId: "bakso",
    weight: "500 gr (isi ±40 butir)",
    stockStatus: "available",
    isBestSeller: true,
    storage: "Simpan di freezer -18°C. Tidak perlu dicairkan sebelum dimasak.",
    cooking:
      "Rebus dalam air mendidih 8-10 menit hingga mengapung. Sajikan dengan kuah kaldu hangat.",
    highlights: ["Daging sapi segar 80%", "Aroma kaldu sapi", "Tekstur super kenyal"],
  },
  {
    id: "p004",
    name: "Dimsum Ayam Isi 20",
    slug: "dimsum-ayam-isi-20",
    description:
      "Dimsum ayam lembut dengan isian melimpah. Kulit tipis dan isian juicy, ideal untuk camilan keluarga atau ide jualan.",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80&auto=format&fit=crop",
    categoryId: "dimsum",
    weight: "20 pcs (350 gr)",
    stockStatus: "available",
    isBestSeller: true,
    isPromo: true,
    storage:
      "Simpan di freezer -18°C. Pindahkan ke chiller 1 jam sebelum dikukus.",
    cooking:
      "Kukus 12-15 menit di atas api sedang. Sajikan dengan saus sambal atau chili oil.",
    highlights: ["Isian ayam 70%", "Tanpa pengenyal", "Ready to steam"],
  },
  {
    id: "p005",
    name: "Kentang Shoestring Frozen",
    slug: "kentang-shoestring-frozen",
    description:
      "Kentang potong tipis siap goreng untuk hidangan ala cafe di rumah. Crispy di luar, lembut di dalam. Cocok untuk lauk anak.",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80&auto=format&fit=crop",
    categoryId: "kentang",
    weight: "1 kg",
    stockStatus: "available",
    isPromo: true,
    storage: "Simpan di freezer -18°C. Jangan refreeze setelah dicairkan.",
    cooking:
      "Goreng 3-5 menit di minyak panas 175°C hingga kuning keemasan, atau oven/air fryer 200°C selama 12 menit.",
    highlights: ["Potongan shoestring", "Tanpa pengawet", "Tinggi karbohidrat"],
  },
  {
    id: "p006",
    name: "Fish Roll Sayuran",
    slug: "fish-roll-sayuran",
    description:
      "Fish roll lembut dengan campuran sayuran asli, cocok untuk sup, hotpot, atau sate lilit. Tekstur lembut disukai anak-anak.",
    price: 36000,
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80&auto=format&fit=crop",
    categoryId: "seafood",
    weight: "500 gr (isi ±15 pcs)",
    stockStatus: "low_stock",
    storage: "Simpan di freezer -18°C dalam kemasan kedap udara.",
    cooking:
      "Panggang 3-4 menit, goreng 2-3 menit, atau tambahkan ke sup 5 menit sebelum disajikan.",
    highlights: ["Ikan fillet asli", "Sayuran segar", "Rendah sodium"],
  },
  {
    id: "p007",
    name: "Scallop Ikan Premium",
    slug: "scallop-ikan-premium",
    description:
      "Scallop daging ikan berkualitas dengan rasa manis alami. Cocok untuk seafood hot plate, sushi, atau pasta seafood.",
    price: 58000,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80&auto=format&fit=crop",
    categoryId: "seafood",
    weight: "500 gr",
    stockStatus: "available",
    isPromo: true,
    storage:
      "Simpan di freezer -18°C. Setelah dicairkan, masak dalam 24 jam.",
    cooking:
      "Tumis cepat 2-3 menit dengan bawang putih dan mentega untuk hasil terbaik.",
    highlights: ["Ikan premium", "Tanpa pewangi buatan", "Kaya omega 3"],
  },
  {
    id: "p008",
    name: "Otak-Otak Singapore",
    slug: "otak-otak-singapore",
    description:
      "Otak-otak khas Singapore dengan rasa seafood gurih dan saus kacang pedas. Tinggal panaskan untuk sajian praktis.",
    price: 34000,
    image:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800&q=80&auto=format&fit=crop",
    categoryId: "seafood",
    weight: "500 gr (isi ±10 pcs)",
    stockStatus: "available",
    storage: "Simpan di freezer -18°C. Sajikan dengan saus kacang.",
    cooking:
      "Kukus 8-10 menit atau panggang 4 menit. Sajikan dengan saus kacang atau sambal.",
    highlights: ["Rasa otentik Singapore", "Siap saji", "Cocok untuk stok frozen"],
  },
  {
    id: "p009",
    name: "Tempura Udang Crispy",
    slug: "tempura-udang-crispy",
    description:
      "Udang tempura dengan balutan crispy ringan. Daging udang masih utuh, rasa manis dan segar. Cocok untuk lauk, isi bento, atau camilan.",
    price: 52000,
    originalPrice: 62000,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80&auto=format&fit=crop",
    categoryId: "seafood",
    weight: "500 gr (isi ±12 pcs)",
    stockStatus: "available",
    isPromo: true,
    isBestSeller: true,
    storage: "Simpan di freezer -18°C. Jangan biarkan di suhu ruang lebih dari 30 menit.",
    cooking:
      "Goreng 1-2 menit di minyak panas 180°C. Hindari api terlalu besar agar tidak gosong.",
    highlights: ["Udang utuh premium", "Balutan crispy ringan", "Tanpa MSG"],
  },
  {
    id: "p010",
    name: "Cireng Frozen Isi Ayam",
    slug: "cireng-frozen-isi-ayam",
    description:
      "Cireng isi ayam suwir pedas khas Bandung. Tinggal goreng untuk camilan praktis keluarga. Tekstur kenyal di luar, gurih di dalam.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800&q=80&auto=format&fit=crop",
    categoryId: "nugget",
    weight: "500 gr (isi ±15 pcs)",
    stockStatus: "low_stock",
    storage: "Simpan di freezer -18°C. Setelah dicairkan, segera masak.",
    cooking:
      "Goreng 4-5 menit di minyak panas sedang hingga kecokelatan. Sajikan dengan saus cuko.",
    highlights: ["Isian ayam pedas", "Tanpa pengawet", "Ready to fry"],
  },
  {
    id: "p011",
    name: "Paket Hemat Anak Kos",
    slug: "paket-hemat-anak-kos",
    description:
      "Paket bundling cocok untuk anak kos atau keluarga kecil. Berisi nugget, sosis, dan kentang siap masak untuk seminggu.",
    price: 75000,
    originalPrice: 95000,
    image:
      "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=800&q=80&auto=format&fit=crop",
    categoryId: "paket_hemat",
    weight: "1.5 kg (3 varian)",
    stockStatus: "available",
    isPromo: true,
    storage: "Simpan di freezer -18°C. Pisahkan kemasan per jenis produk.",
    cooking:
      "Goreng setiap varian 3-5 menit di minyak panas. Bisa dimasak sebagian sesuai kebutuhan.",
    highlights: [
      "3 varian favorit",
      "Hemat 21%",
      "Cocok untuk 4-5x makan",
    ],
  },
  {
    id: "p012",
    name: "Paket Frozen Keluarga",
    slug: "paket-frozen-keluarga",
    description:
      "Paket keluarga komplet berisi 6 varian frozen food paling laris. Solusi stok bulanan untuk keluarga dengan anak kecil.",
    price: 165000,
    originalPrice: 210000,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop",
    categoryId: "paket_hemat",
    weight: "3 kg (6 varian)",
    stockStatus: "available",
    isBestSeller: true,
    isPromo: true,
    storage: "Simpan di freezer -18°C. Produk sudah dikemas per varian.",
    cooking:
      "Tinggal goreng, kukus, atau tumis sesuai jenis produk. Masak sesuai petunjuk di kemasan.",
    highlights: [
      "6 varian favorit",
      "Hemat 22%",
      "Stok makan keluarga 2 minggu",
    ],
  },
  {
    id: "p013",
    name: "Nugget Sayur Keju",
    slug: "nugget-sayur-keju",
    description:
      "Nugget dengan campuran wortel, brokoli, dan keju cheddar. Pilihan sehat dan tetap lezat untuk anak yang picky eater.",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80&auto=format&fit=crop",
    categoryId: "nugget",
    weight: "500 gr",
    stockStatus: "sold_out",
    storage: "Simpan di freezer -18°C.",
    cooking: "Goreng 3-4 menit atau air fryer 180°C selama 7 menit.",
    highlights: ["Sayuran asli", "Keju cheddar", "Tanpa pewarna sintetis"],
  },
  {
    id: "p014",
    name: "Sosis Sapi Bakar",
    slug: "sosis-sapi-bakar",
    description:
      "Sosis daging sapi tebal dengan cita rasa BBQ. Cocok untuk stok lauk, isi hotdog, atau grilling weekend.",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=800&q=80&auto=format&fit=crop",
    categoryId: "sosis",
    weight: "500 gr (isi ±12 pcs)",
    stockStatus: "available",
    storage: "Simpan di freezer -18°C.",
    cooking:
      "Panggang 3-4 menit di wajan teflon, atau grill 2-3 menit hingga ada grill mark.",
    highlights: ["Daging sapi fillet", "Aroma BBQ", "Tanpa pengenyal"],
  },
];

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function findRelatedProducts(
  product: Product,
  limit = 4,
): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}
