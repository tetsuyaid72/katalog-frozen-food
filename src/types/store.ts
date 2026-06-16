export type StoreProfile = {
  name: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  address: string;
  openHours: string;
  instagram?: string;
  tiktok?: string;
  coordinates?: { lat: number; lng: number };
  mapsUrl?: string;
};
