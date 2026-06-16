import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type NominatimResponse = {
  display_name?: string;
  lat?: string;
  lon?: string;
  address?: {
    road?: string;
    pedestrian?: string;
    suburb?: string;
    village?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};

// --- In-memory rate limit (per IP) -------------------------------------------
// Nominatim policy: max 1 request/second. We use a 1.2s window to be safe.
const RATE_WINDOW_MS = 1_200;
const lastHitByIp = new Map<string, number>();

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const last = lastHitByIp.get(ip) ?? 0;
  if (now - last < RATE_WINDOW_MS) return true;
  lastHitByIp.set(ip, now);
  return false;
}

export async function GET(req: NextRequest) {
  const ip = clientIp(req);

  if (rateLimited(ip)) {
    return Response.json(
      { error: "rate_limited", message: "Terlalu banyak permintaan, coba lagi." },
      { status: 429 },
    );
  }

  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return Response.json(
      { error: "missing_params", message: "Parameter lat & lng wajib diisi." },
      { status: 400 },
    );
  }

  const latNum = Number(lat);
  const lngNum = Number(lng);
  if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
    return Response.json(
      { error: "invalid_params", message: "lat / lng harus angka." },
      { status: 400 },
    );
  }

  if (Math.abs(latNum) > 90 || Math.abs(lngNum) > 180) {
    return Response.json(
      { error: "out_of_range", message: "Koordinat di luar jangkauan." },
      { status: 400 },
    );
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "json");
    url.searchParams.set("lat", String(latNum));
    url.searchParams.set("lon", String(lngNum));
    url.searchParams.set("accept-language", "id");
    url.searchParams.set("zoom", "18");
    url.searchParams.set("addressdetails", "1");

    const upstream = await fetch(url, {
      headers: {
        // Nominatim policy: wajib set User-Agent yang identifiable.
        "User-Agent": "FrozenMamaApp/1.0 (frozenmama.id contact)",
        "Accept": "application/json",
      },
      // Cache 1 jam di edge untuk mengurangi hit ke Nominatim
      next: { revalidate: 3600 },
    });

    if (!upstream.ok) {
      return Response.json(null, { status: 200 });
    }

    const data = (await upstream.json()) as NominatimResponse;

    if (!data.display_name) {
      return Response.json(null, { status: 200 });
    }

    return Response.json(
      {
        formattedAddress: data.display_name,
        lat: Number(data.lat ?? latNum),
        lng: Number(data.lon ?? lngNum),
        address: data.address ?? null,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      },
    );
  } catch (err) {
    // Silent fallback — client akan handle dengan tetap menyimpan koordinat
    return Response.json(null, { status: 200 });
  }
}
