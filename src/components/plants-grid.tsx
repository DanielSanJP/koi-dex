"use client";

import PlantCard from "@/components/plant-card";
import type { PlantType } from "@/generated/prisma/enums";
import { useUrlSearch } from "@/hooks/use-url-search";
import { TYPE_LABEL } from "@/lib/plant-labels";
import type { PlantSummary } from "@/lib/queries";

const TYPES: PlantType[] = ["FLOATING", "SUBMERGED", "MARGINAL"];

type Props = { plants: PlantSummary[] };

export default function PlantsGrid({ plants }: Props) {
  // ?type=floating|submerged|marginal and ?koi=safe live in the URL.
  const { params, update } = useUrlSearch();
  const rawType = params.get("type")?.toUpperCase();
  const type = TYPES.includes(rawType as PlantType) ? (rawType as PlantType) : null;
  const koiSafeOnly = params.get("koi") === "safe";

  const visible = plants.filter(
    (p) => (!type || p.type === type) && (!koiSafeOnly || p.koiSafe),
  );

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-sm font-bold transition-colors ${
        active
          ? "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]"
          : "border-black/10 bg-white text-black/60 hover:text-black"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {chip("all", type === null, () => update({ type: null }))}
        {TYPES.map((t) =>
          chip(TYPE_LABEL[t], type === t, () =>
            update({ type: type === t ? null : t.toLowerCase() }),
          ),
        )}
        <span className="mx-1 h-5 w-px bg-black/10" aria-hidden />
        {chip("koi leave it alone", koiSafeOnly, () =>
          update({ koi: koiSafeOnly ? null : "safe" }),
        )}
        <span className="ml-auto text-xs text-black/55">
          {visible.length} of {plants.length}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <PlantCard key={p.slug} plant={p} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-12 text-center text-black/60">
          No plants match those filters.
        </p>
      )}
    </div>
  );
}
