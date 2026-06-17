"use client";

import { MessageCircle } from "lucide-react";

import { storeProfile } from "@/data/store";

export function FloatingActions() {
  const whatsappMessage = encodeURIComponent(
    "Halo Frozen Mama, saya mau tanya soal produk.",
  );
  const whatsappUrl = `https://wa.me/${storeProfile.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-pop transition-transform hover:-translate-y-1 active:scale-95 md:bottom-6 md:right-6"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
      <span className="absolute -left-1 -top-1 flex h-3 w-3">
        <span className="absolute inset-0 animate-ping rounded-full bg-secondary opacity-75" />
        <span className="relative h-3 w-3 rounded-full bg-secondary ring-2 ring-white" />
      </span>
    </a>
  );
}
