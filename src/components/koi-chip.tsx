import Link from "next/link";
import KoiComposite from "@/components/koi-composite";
import type { CrossParty } from "@/lib/breeding";

const SIZES = {
  sm: { box: "w-16", buffer: 172, label: "text-[0.65rem]" },
  md: { box: "w-24", buffer: 258, label: "text-xs" },
  lg: { box: "w-32", buffer: 344, label: "text-sm" },
} as const;

type Props = {
  party: CrossParty;
  size?: keyof typeof SIZES;
};

/** One party in a cross: a real koi is drawn, an art-free ancestor is named. */
export default function KoiChip({ party, size = "md" }: Props) {
  const s = SIZES[size];

  if (party.kind === "ancestor") {
    return (
      <span
        className={`inline-flex ${s.box} items-center justify-center rounded-xl border border-dashed border-black/25 px-2 py-3 text-center font-bold text-black/45 ${s.label}`}
        title="An ancestral variety this site has no artwork for"
      >
        {party.name}
      </span>
    );
  }

  return (
    <Link
      href={`/koi/${party.koi.slug}`}
      className={`group flex ${s.box} flex-col items-center gap-1`}
    >
      <KoiComposite
        koi={party.koi}
        bufferWidth={s.buffer}
        className="w-full transition-transform group-hover:scale-105"
      />
      <span className={`text-center font-bold ${s.label}`}>
        {party.koi.name}
      </span>
    </Link>
  );
}
