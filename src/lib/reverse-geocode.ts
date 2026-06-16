import type { GeoLocation } from "@/types/checkout";

export type ReverseGeocodeResult = {
  formattedAddress: string;
  lat: number;
  lng: number;
  address?: {
    road?: string;
    suburb?: string;
    village?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  } | null;
};

/**
 * Hit our internal Next.js API route, which proxies to OpenStreetMap Nominatim.
 * Returns null on any error so the client can fall back gracefully.
 */
export async function reverseGeocode(
  loc: GeoLocation,
): Promise<ReverseGeocodeResult | null> {
  try {
    const url = new URL("/api/reverse-geocode", window.location.origin);
    url.searchParams.set("lat", String(loc.lat));
    url.searchParams.set("lng", String(loc.lng));

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as ReverseGeocodeResult | null;
    return data;
  } catch {
    return null;
  }
}
