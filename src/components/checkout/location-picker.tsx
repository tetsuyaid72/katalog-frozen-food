"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  MapPin,
  Loader2,
  Check,
  AlertCircle,
  Crosshair,
  Wifi,
  Satellite,
  Edit3,
  HelpCircle,
  RotateCcw,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "sonner";

import type { GeoLocation } from "@/types/checkout";
import {
  GeolocationError,
  getCurrentPosition,
  type GeolocationErrorCode,
} from "@/lib/geolocation";
import { reverseGeocode } from "@/lib/reverse-geocode";
import { cn } from "@/lib/cn";

type LocationPickerProps = {
  value: GeoLocation | null;
  onChange: (loc: GeoLocation | null) => void;
  onAddressDetected?: (address: string) => void;
  disabled?: boolean;
};

type DetectMode = "gps" | "network";

type Status =
  | { kind: "idle" }
  | { kind: "loading"; mode: DetectMode; elapsed: number }
  | { kind: "success"; coords: GeoLocation; address: string | null }
  | {
      kind: "error";
      code: GeolocationErrorCode;
      message: string;
      triedMode: DetectMode;
    };

const TIMEOUT_GPS_MS = 15_000;
const TIMEOUT_NETWORK_MS = 6_000;

export function LocationPicker({
  value,
  onChange,
  onAddressDetected,
  disabled,
}: LocationPickerProps) {
  const [status, setStatus] = useState<Status>(() =>
    value
      ? { kind: "success", coords: value, address: null }
      : { kind: "idle" },
  );
  const [showHelp, setShowHelp] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleDetect = useCallback(
    async (mode: DetectMode = "gps") => {
      if (disabled) return;

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setStatus({ kind: "loading", mode, elapsed: 0 });
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setStatus((prev) =>
          prev.kind === "loading"
            ? {
                ...prev,
                elapsed: Math.floor((Date.now() - startTime) / 1000),
              }
            : prev,
        );
      }, 250);

      try {
        const coords = await getCurrentPosition({
          enableHighAccuracy: mode === "gps",
          timeout: mode === "gps" ? TIMEOUT_GPS_MS : TIMEOUT_NETWORK_MS,
          maximumAge: 0,
        });
        onChange(coords);

        let detected: string | null = null;
        try {
          const result = await reverseGeocode(coords);
          if (result?.formattedAddress) {
            detected = result.formattedAddress;
            onAddressDetected?.(detected);
          }
        } catch {
          // Silent fallback — user can type the address manually
        }

        setStatus({ kind: "success", coords, address: detected });
        toast.success("Lokasi terdeteksi", {
          description: detected
            ? "Alamat otomatis terisi — bisa diedit jika perlu."
            : "Koordinat tersimpan. Silakan ketik alamat lengkap secara manual.",
        });
      } catch (err) {
        const code =
          err instanceof GeolocationError ? err.code : "POSITION_UNAVAILABLE";
        const message = mapErrorMessage(code, mode);
        setStatus({ kind: "error", code, message, triedMode: mode });
        toast.error("Lokasi tidak dapat dideteksi", {
          description: message,
        });
      } finally {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    },
    [disabled, onChange, onAddressDetected],
  );

  const handleReset = useCallback(() => {
    onChange(null);
    onAddressDetected?.("");
    setStatus({ kind: "idle" });
    setShowHelp(false);
  }, [onChange, onAddressDetected]);

  const handleSkip = useCallback(() => {
    setStatus({ kind: "idle" });
    setShowHelp(false);
  }, []);

  const handleTryOtherMode = useCallback(() => {
    if (status.kind !== "error") return;
    const otherMode: DetectMode =
      status.triedMode === "gps" ? "network" : "gps";
    handleDetect(otherMode);
  }, [status, handleDetect]);

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center gap-2">
        {status.kind === "idle" && (
          <button
            type="button"
            onClick={() => handleDetect("gps")}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Crosshair className="h-3.5 w-3.5" />
            Gunakan Lokasi Saya
          </button>
        )}

        {status.kind === "loading" && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {status.mode === "gps"
              ? `Mendeteksi dengan GPS${status.elapsed > 0 ? ` (${status.elapsed}s)` : ""}…`
              : `Mendeteksi via jaringan${status.elapsed > 0 ? ` (${status.elapsed}s)` : ""}…`}
          </span>
        )}

        {status.kind === "success" && (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <Check className="h-3.5 w-3.5" />
              Lokasi terdeteksi
              {status.coords.accuracy && status.coords.accuracy < 1000 && (
                <span className="text-emerald-600/80">
                  · akurasi ±{Math.round(status.coords.accuracy)}m
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-[11px] font-semibold text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
              aria-label="Reset lokasi"
            >
              <RotateCcw className="h-3 w-3" />
              Ubah
            </button>
            <a
              href={`https://maps.google.com/?q=${status.coords.lat},${status.coords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-[11px] font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            >
              <MapPin className="h-3 w-3" />
              Lihat di Peta
              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
            </a>
          </>
        )}

        {status.kind === "error" && (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {status.message}
            </span>
            <button
              type="button"
              onClick={() => setShowHelp((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-[11px] font-semibold text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
              aria-expanded={showHelp}
            >
              <HelpCircle className="h-3 w-3" />
              {showHelp ? "Tutup" : "Bantuan"}
            </button>
          </>
        )}
      </div>

      {status.kind === "error" && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleTryOtherMode}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-100 active:scale-95"
            >
              {status.triedMode === "gps" ? (
                <>
                  <Wifi className="h-3.5 w-3.5" />
                  Coba via jaringan
                </>
              ) : (
                <>
                  <Satellite className="h-3.5 w-3.5" />
                  Coba dengan GPS
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-bold text-foreground/80 transition-colors hover:border-primary/30 hover:text-primary active:scale-95"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Isi alamat manual
            </button>
          </div>

          {showHelp && (
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-foreground/80 animate-fade-up">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-amber-900">
                  Tips agar lokasi bisa terdeteksi:
                </p>
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  className="rounded-full p-0.5 text-amber-700 transition-colors hover:bg-amber-100"
                  aria-label="Tutup bantuan"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <ul className="mt-2 space-y-1 pl-4 list-disc marker:text-amber-600">
                <li>
                  Pastikan <strong>GPS / layanan lokasi</strong> perangkat
                  kamu aktif (Pengaturan → Lokasi)
                </li>
                <li>
                  Cek <strong>izin browser</strong> — klik ikon kunci/info di
                  address bar, set lokasi ke &ldquo;Izinkan&rdquo;
                </li>
                <li>
                  Coba di <strong>luar ruangan</strong> atau dekat jendela
                  agar sinyal GPS lebih kuat
                </li>
                <li>
                  Atau cukup <strong>ketik alamat</strong> lengkap secara
                  manual di kolom atas (Jalan, No, RT/RW, Kelurahan, Kota)
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {status.kind === "success" && (
        <p className="flex items-start gap-1.5 text-[11px] text-muted">
          <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
          <span>
            Koordinat: {status.coords.lat.toFixed(5)},{" "}
            {status.coords.lng.toFixed(5)}
            {status.address
              ? " · link Maps akan dikirim otomatis di WhatsApp."
              : " · link Maps akan dikirim otomatis. Ketik alamat lengkap di atas."}
          </span>
        </p>
      )}
    </div>
  );
}

function mapErrorMessage(
  code: GeolocationErrorCode,
  mode: DetectMode,
): string {
  switch (code) {
    case "PERMISSION_DENIED":
      return "Akses lokasi ditolak oleh browser";
    case "TIMEOUT":
      return mode === "gps"
        ? "GPS butuh waktu lebih lama dari biasanya"
        : "Deteksi via jaringan terlalu lama";
    case "POSITION_UNAVAILABLE":
      return "Perangkat tidak bisa menentukan posisi saat ini";
    case "UNSUPPORTED":
      return "Browser tidak mendukung deteksi lokasi";
    default:
      return "Gagal mendeteksi lokasi";
  }
}
