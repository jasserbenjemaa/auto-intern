import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto-Intern | Retro PFE & Internship Applier",
  description: "Automate your internship search and applications with pixel-perfect precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F2F0EA] text-[#1E2129]">
        {children}
      </body>
    </html>
  );
}
