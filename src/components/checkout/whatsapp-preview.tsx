"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { storeProfile } from "@/data/store";

type WhatsappPreviewProps = {
  message: string;
  url: string;
  canSend: boolean;
  onSend: () => void;
};

export function WhatsappPreview({
  message,
  url,
  canSend,
  onSend,
}: WhatsappPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast.success("Pesan disalin ke clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Gagal menyalin pesan");
    }
  };

  return (
    <div className="rounded-3xl border border-foreground/10 bg-foreground p-6 text-white shadow-pop md:p-7">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">
          <MessageCircle className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-white">
            Preview Pesan
          </h2>
          <p className="text-xs text-white/60">
            Akan dikirim ke WhatsApp {storeProfile.name}
          </p>
        </div>
      </div>
      <pre className="mt-5 max-h-72 overflow-y-auto whitespace-pre-wrap rounded-2xl bg-white/5 p-4 font-mono text-xs leading-relaxed text-white/85 sm:text-[11px]">
        {message}
      </pre>
      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          onClick={handleCopy}
          variant="outline"
          className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          size="sm"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Tersalin
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Salin Pesan
            </>
          )}
        </Button>
      </div>
      <Button
        type="button"
        onClick={onSend}
        size="lg"
        className="mt-3 w-full bg-success hover:bg-success/90"
        disabled={!canSend}
        asChild={!canSend}
      >
        {canSend ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Send className="h-4 w-4" />
            Kirim ke WhatsApp
          </a>
        ) : (
          <span>
            <Send className="h-4 w-4" />
            Kirim ke WhatsApp
          </span>
        )}
      </Button>
      {!canSend && (
        <p className="mt-2 text-center text-[11px] text-white/50">
          Lengkapi data di samping untuk mengaktifkan tombol kirim.
        </p>
      )}
    </div>
  );
}
