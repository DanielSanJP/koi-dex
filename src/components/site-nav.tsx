import Link from "next/link";

const LINKS = [
  { href: "/koi", label: "Koi" },
  { href: "/breeding", label: "Breeding" },
  { href: "/care", label: "Care" },
  { href: "/plants", label: "Plants" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#c1c1c1] bg-secondary">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-8">
        <Link href="/" className="font-pally text-lg font-bold tracking-wide">
          KOI-DEX
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-pally text-sm font-bold transition-colors hover:text-black sm:text-base"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
