import KoiChip from "@/components/koi-chip";
import type { Outcome } from "@/lib/shapes";

type Props = {
  outcome: Outcome;
  size?: "sm" | "md";
};

/** A documented pairing, drawn with the actual fish. */
export default function CrossCard({ outcome, size = "md" }: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <KoiChip party={outcome.parentA} size={size} />
        <span className="text-lg font-bold text-black/30">×</span>
        <KoiChip party={outcome.parentB} size={size} />
        <span className="text-lg font-bold text-black/30">→</span>
        <KoiChip party={outcome.offspring} size={size} />
      </div>
      <p className="text-sm text-black/60">
        {outcome.note}{" "}
        <a
          href={outcome.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-black/40 underline hover:text-black/70"
        >
          Source
        </a>
      </p>
    </div>
  );
}
