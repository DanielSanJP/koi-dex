import Link from "next/link";
import { formatDexNumber } from "@/lib/data";
import { r2PublicUrl } from "@/lib/r2";
import type { Koi } from "@/lib/types";

export default function KoiCard({ koi }: { koi: Koi }) {
  return (
    <Link
      href={`/koi/${koi.slug}`}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
    >
      <span className="self-start text-xs font-bold text-black/40">
        {formatDexNumber(koi.number)}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={r2PublicUrl(koi.preview ?? koi.body)!}
        alt={`${koi.name} koi`}
        className="h-24 w-auto max-w-full object-contain transition-transform group-hover:scale-105"
        loading="lazy"
      />
      <span className="font-pally font-bold">{koi.name}</span>
    </Link>
  );
}
