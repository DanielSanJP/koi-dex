import Button from "@/components/button";
import KoiComposite from "@/components/koi-composite";
import { getKoiSummaries } from "@/lib/queries";

/** 404: the Karasugoi, an all-black koi, is the one you cannot see. */
export default async function NotFound() {
  const summaries = await getKoiSummaries();
  const koi = summaries.find((k) => k.slug === "karasugoi") ?? summaries[0];
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center sm:px-8">
      {koi && (
        <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <KoiComposite koi={koi.koi} className="w-full" bufferWidth={480} />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-wide text-black/55 uppercase">404</p>
        <h1 className="font-pally text-3xl font-bold">Nothing in this part of the pond.</h1>
        <p className="max-w-prose text-black/60">
          That page does not exist, or the address is slightly off. The koi-dex,
          the guides and the plants are all one tap away.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button text="Browse the koi-dex" href="/koi" />
        <Button text="Home" href="/" variant="outline" />
      </div>
    </div>
  );
}
