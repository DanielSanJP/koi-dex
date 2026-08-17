import Link from "next/link";
import KoiComposite from "@/components/koi-composite";
import type { Party } from "@/lib/shapes";

const SIZES = {
  sm: { box: "w-16", buffer: 172, label: "text-[0.65rem]" },
  md: { box: "w-24", buffer: 258, label: "text-xs" },
  lg: { box: "w-32", buffer: 344, label: "text-sm" },
} as const;

type Props = {
  /** A koi (drawn), an art-free variety (named), or null = line-bred selection. */
  party: Party | null;
  size?: keyof typeof SIZES;
};

/** One party in a cross: a real koi is drawn, an art-free ancestor is named,
    and a null parent (selection within a line) says so. */
export default function KoiChip({ party, size = "md" }: Props) {
  const s = SIZES[size];

  if (!party) {
    return (
      <span
        className={`inline-flex ${s.box} items-center justify-center rounded-xl border border-dotted border-black/25 px-2 py-3 text-center font-bold text-black/55 ${s.label}`}
        title="Bred by selecting within a line rather than pairing two named varieties"
      >
        line-bred selection
      </span>
    );
  }

  if (!party.koi) {
    return (
      <span
        className={`inline-flex ${s.box} items-center justify-center rounded-xl border border-dashed border-black/25 px-2 py-3 text-center font-bold text-black/60 ${s.label}`}
        title="A variety this site has no artwork for"
      >
        {party.name}
      </span>
    );
  }

  return (
    <Link
      href={`/koi/${party.slug}`}
      className={`group flex ${s.box} flex-col items-center gap-1`}
    >
      <KoiComposite
        koi={party.koi}
        bufferWidth={s.buffer}
        className="w-full transition-transform group-hover:scale-105"
      />
      <span className={`text-center font-bold ${s.label}`}>{party.name}</span>
    </Link>
  );
}
