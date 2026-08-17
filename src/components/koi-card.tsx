import Link from "next/link";
import KoiComposite from "@/components/koi-composite";
import { formatDexNumber } from "@/lib/data";
import type { Koi } from "@/lib/types";

export default function KoiCard({ koi }: { koi: Koi }) {
  return (
    <Link
      href={`/koi/${koi.slug}`}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
    >
      <span className="self-start text-xs font-bold text-black/55">
        {formatDexNumber(koi.number)}
      </span>
      <KoiComposite
        koi={koi}
        className="w-full transition-transform group-hover:scale-105"
        bufferWidth={344}
      />
      <span className="font-pally font-bold">{koi.name}</span>
    </Link>
  );
}
