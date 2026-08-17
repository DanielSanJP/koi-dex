"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/koi", label: "Koi" },
  { href: "/breeding", label: "Breeding" },
  { href: "/care", label: "Care" },
  { href: "/plants", label: "Plants" },
];

/** Header links with aria-current on the section you are in. */
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {LINKS.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`font-pally text-sm font-bold transition-colors hover:text-black sm:text-base ${
              active ? "underline decoration-2 underline-offset-4" : ""
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </>
  );
}
