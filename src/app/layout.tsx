import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "@/components/lenis-provider";
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
  title: "Koi-dex",
  description:
    "A koi encyclopedia: varieties, breeding, care, and pond plants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pally.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
