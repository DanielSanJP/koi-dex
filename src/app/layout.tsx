import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "@/components/lenis-provider";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import "lenis/dist/lenis.css";
import "./globals.css";

const pally = localFont({
  src: [
    {
      path: "../../public/fonts/Pally-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pally-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pally-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pally",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Koi-dex",
    template: "%s · Koi-dex",
  },
  description:
    "A koi encyclopedia: the real varieties, how to care for them, how breeding works, and pond plants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pally.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LenisProvider>
          <div className="flex min-h-screen flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
