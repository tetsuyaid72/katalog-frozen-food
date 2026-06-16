import type { CartItem } from "@/types/cart";
import type { DeliveryMethod, GeoLocation } from "@/types/checkout";

export type CheckoutBuyer = {
  name: string;
  whatsapp: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  location?: GeoLocation;
  pickupInfo?: {
    address: string;
    openHours: string;
    mapsUrl?: string;
  };
  note?: string;
};

export type CheckoutContext = {
  storeName: string;
  buyer: CheckoutBuyer;
  items: CartItem[];
};

export function buildWhatsappMessage({
  storeName,
  buyer,
  items,
}: CheckoutContext): string {
  const itemLines = items.map((item, index) => {
    const subtotal = item.price * item.quantity;
    return `${index + 1}. ${item.name} (${item.weight}) x${item.quantity} = ${formatRupiah(subtotal)}`;
  });

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const lines: string[] = [
    `Halo ${storeName}, saya mau pesan:`,
    "",
    ...itemLines,
    "",
    `Total Pesanan: ${formatRupiah(total)}`,
    "",
    "Data Pembeli:",
    `Nama: ${buyer.name}`,
    `No. WhatsApp: ${buyer.whatsapp}`,
  ];

  if (buyer.deliveryMethod === "delivery") {
    lines.push("Metode: Diantarkan");
    lines.push(`Alamat: ${buyer.address || "-"}`);
    if (buyer.location) {
      lines.push(
        `Pinned Location: https://maps.google.com/?q=${buyer.location.lat},${buyer.location.lng}`,
      );
    }
  } else {
    lines.push("Metode: Ambil sendiri di toko");
    if (buyer.pickupInfo) {
      lines.push(`Lokasi Toko: ${buyer.pickupInfo.address}`);
      lines.push(`Jam Toko: ${buyer.pickupInfo.openHours}`);
      if (buyer.pickupInfo.mapsUrl) {
        lines.push(`Maps Toko: ${buyer.pickupInfo.mapsUrl}`);
      }
    }
  }

  if (buyer.note && buyer.note.trim().length > 0) {
    lines.push(`Catatan: ${buyer.note}`);
  } else {
    lines.push("Catatan: -");
  }

  lines.push("", "Terima kasih.");

  return lines.join("\n");
}

export function generateWhatsappUrl(
  ownerNumber: string,
  message: string,
): string {
  const cleanNumber = ownerNumber.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
