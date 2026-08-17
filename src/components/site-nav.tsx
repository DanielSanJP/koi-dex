import Link from "next/link";
import NavLinks from "@/components/nav-links";
import SiteSearch from "@/components/site-search";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#c1c1c1] bg-secondary">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-8"
      >
        <Link href="/" className="font-pally text-lg font-bold tracking-wide">
          KOI-DEX
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <NavLinks />
          <SiteSearch />
        </div>
      </nav>
    </header>
  );
}
