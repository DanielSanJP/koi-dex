import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-[#c1c1c1] bg-secondary">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 sm:px-8">
        <p className="font-pally text-sm font-bold">KOI-DEX</p>
        <p className="text-sm text-black/60">
          A koi encyclopedia school project. Artwork from the{" "}
          <Link href="https://koi-calm.app" className="underline hover:text-black">
            Koi
          </Link>{" "}
          app.
        </p>
      </div>
    </footer>
  );
}
