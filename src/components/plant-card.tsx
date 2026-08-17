import Image from "next/image";
import Link from "next/link";
import type { PlantSummary } from "@/lib/queries";
import {
  CHIP_GOOD,
  CHIP_NEUTRAL,
  CHIP_WARN,
  NZ_CHIP,
  NZ_LABEL,
  TYPE_LABEL,
} from "@/lib/plant-labels";

export default function PlantCard({ plant }: { plant: PlantSummary }) {
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
    >
      {plant.imagePath ? (
        <div className="overflow-hidden rounded-xl">
          <Image
            src={`/assets/${plant.imagePath}`}
            alt={plant.imageAlt ?? plant.name}
            width={600}
            height={400}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="aspect-[3/2] w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[3/2] w-full rounded-xl bg-[#8ed874]/20" />
      )}
      <div className="flex flex-col gap-0.5">
        <span className="font-pally font-bold">{plant.name}</span>
        <span className="text-xs text-black/45 italic">{plant.latinName}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 text-[0.65rem] font-bold">
        <span className={`rounded-full border px-2 py-0.5 ${CHIP_NEUTRAL}`}>
          {TYPE_LABEL[plant.type]}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 ${plant.koiSafe ? CHIP_GOOD : CHIP_WARN}`}
        >
          {plant.koiSafe ? "Koi leave it" : "Koi eat it"}
        </span>
        <span className={`rounded-full border px-2 py-0.5 ${NZ_CHIP[plant.nzStatus]}`}>
          {NZ_LABEL[plant.nzStatus]}
        </span>
      </div>
    </Link>
  );
}
