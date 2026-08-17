import type { FeedingBand } from "@/content/care";

/* Feeding by water temperature as a strip of flat colour bands, coldest on
   the left. Same numbers as the Feeding section, laid out so a reader can
   find their pond's temperature at a glance. */

const TONES: Record<FeedingBand["tone"], { bg: string; fg: string }> = {
  cold: { bg: "bg-[#93d9f0]/60", fg: "text-[#1f6b86]" },
  cool: { bg: "bg-[#93d9f0]/25", fg: "text-[#1f6b86]" },
  warm: { bg: "bg-[#66dd93]/30", fg: "text-[#2f8a52]" },
  peak: { bg: "bg-[#66dd93]/60", fg: "text-[#2f8a52]" },
  hot: { bg: "bg-[#f8a634]/30", fg: "text-[#a86a0f]" },
};

export default function FeedingBands({ bands }: { bands: FeedingBand[] }) {
  return (
    <div className="overflow-x-auto">
      <ol className="grid min-w-[40rem] grid-cols-6 gap-1 sm:min-w-0">
        {bands.map((b) => {
          const t = TONES[b.tone];
          return (
            <li
              key={b.temp}
              className={`flex flex-col gap-2 rounded-xl px-3 py-3 ${t.bg}`}
            >
              <span className={`font-pally text-sm font-bold ${t.fg}`}>
                {b.temp}
              </span>
              <span className="text-xs font-bold text-black/70">{b.food}</span>
              <span className="text-xs text-black/60">{b.frequency}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-xs text-black/40">
        Water temperature, not air. Change food type as the water crosses each
        boundary rather than by the calendar.
      </p>
    </div>
  );
}
