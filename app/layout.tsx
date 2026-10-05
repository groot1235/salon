import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Salon Dubai | Where Dubai Gets Ready",
  description:
    "Experience Dubai's premier hair, nail, and beauty salon across 13 prime locations. World-class stylists, luxury treatments, and transparent pricing.",
  keywords: [
    "The Salon Dubai",
    "Dubai Hair Salon",
    "Balayage Dubai",
    "Gel Mani Pedi Dubai",
    "Hair Stylist Dubai",
    "Salon Palm Jumeirah",
    "Salon JBR",
    "Salon Marina",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-white text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
