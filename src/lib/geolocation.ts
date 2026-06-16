"use client";

import type { GeoLocation } from "@/types/checkout";

export type GeolocationErrorCode =
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "UNSUPPORTED";

export class GeolocationError extends Error {
  code: GeolocationErrorCode;
  constructor(code: GeolocationErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "GeolocationError";
  }
}

type GetPositionOptions = {
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;
};

/**
 * Ask the browser for the user's current position.
 * Normalizes the various browser errors into a single GeolocationError class.
 */
export function getCurrentPosition(
  options: GetPositionOptions = {},
): Promise<GeoLocation> {
  const {
    timeout = 10_000,
    maximumAge = 0,
    enableHighAccuracy = true,
  } = options;

  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      reject(
        new GeolocationError(
          "UNSUPPORTED",
          "Browser tidak mendukung geolocation.",
        ),
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          reject(
            new GeolocationError(
              "PERMISSION_DENIED",
              "Akses lokasi ditolak oleh browser.",
            ),
          );
        } else if (err.code === err.TIMEOUT) {
          reject(
            new GeolocationError(
              "TIMEOUT",
              "Waktu deteksi lokasi habis, coba lagi.",
            ),
          );
        } else {
          reject(
            new GeolocationError(
              "POSITION_UNAVAILABLE",
              "Lokasi tidak dapat dideteksi saat ini.",
            ),
          );
        }
      },
      {
        timeout,
        maximumAge,
        enableHighAccuracy,
      },
    );
  });
}

export function buildGoogleMapsUrl(loc: GeoLocation): string {
  return `https://maps.google.com/?q=${loc.lat},${loc.lng}`;
}
