"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PixelCatMascot } from "@/components/icons/PixelCatMascot";

// Pixel SVG icons for nav items
function NavIconBuildings() {
  return (
    <svg width="16" height="16" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: "pixelated" }}>
      <rect x="1" y="2" width="2" height="6" />
      <rect x="5" y="4" width="2" height="4" />
      <rect x="1" y="0" width="2" height="1" />
      <rect x="2" y="1" width="1" height="1" />
      <rect x="2" y="3" width="1" height="1" />
      <rect x="1" y="5" width="1" height="1" />
      <rect x="5" y="5" width="1" height="1" />
    </svg>
  );
}

function NavIconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: "pixelated" }}>
      <rect x="0" y="1" width="8" height="6" />
      <rect x="1" y="2" width="1" height="1" fill="white" />
      <rect x="2" y="3" width="1" height="1" fill="white" />
      <rect x="3" y="4" width="2" height="1" fill="white" />
      <rect x="5" y="3" width="1" height="1" fill="white" />
      <rect x="6" y="2" width="1" height="1" fill="white" />
    </svg>
  );
}

function NavIconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: "pixelated" }}>
      <rect x="1" y="1" width="1" height="4" />
      <rect x="2" y="0" width="2" height="1" />
      <rect x="4" y="1" width="1" height="4" />
      <rect x="2" y="5" width="2" height="1" />
      <rect x="4" y="4" width="1" height="1" />
      <rect x="5" y="5" width="1" height="1" />
      <rect x="6" y="6" width="2" height="1" />
    </svg>
  );
}

function NavIconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 8 8" fill="currentColor" style={{ imageRendering: "pixelated" }}>
      <rect x="3" y="0" width="2" height="2" />
      <rect x="2" y="2" width="4" height="2" />
      <rect x="1" y="5" width="6" height="3" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Companies", Icon: NavIconBuildings, exact: true },
  { href: "/dashboard/emails", label: "Applications", Icon: NavIconMail, exact: false },
  { href: "/dashboard/scraper", label: "Scraper", Icon: NavIconSearch, exact: false },
  { href: "/dashboard/profile", label: "Profile", Icon: NavIconUser, exact: false },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen shipcat-grid flex flex-col font-sans selection:bg-[#3F86F7] selection:text-white">
      {/* Shared Top Navigation Bar */}
      <header className="sticky top-0 z-40 h-[72px] border-b-2 border-[#1E2129] bg-[#F2F0EA]/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0">
        {/* Left: Brand section */}
        <div className="w-48 sm:w-60 flex items-center gap-2.5 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <PixelCatMascot size={22} className="text-[#1E2129] group-hover:scale-105 transition-transform" />
            <span className="font-pixel text-[14px] font-bold text-[#1E2129] tracking-tight uppercase">
              Auto-Intern
            </span>
          </Link>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center justify-center gap-1.5 sm:gap-2.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 min-w-[72px] sm:min-w-[92px] py-1.5 px-2.5 sm:px-3.5 border-2 transition-all cursor-pointer ${
                  active
                    ? "bg-[#1E2129] text-[#F2F0EA] border-[#1E2129] shadow-[3px_3px_0px_#3F86F7] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-[#5B6170] border-[#1E2129] shadow-[2px_2px_0px_#1E2129] hover:bg-[#FAF9F5] hover:text-[#1E2129] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1E2129]"
                }`}
              >
                <span className={active ? "text-[#C8F560]" : "text-[#1E2129]"}>
                  <item.Icon />
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-tight leading-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Status Pill & Logout */}
        <div className="w-48 sm:w-60 flex items-center justify-end gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#1E2129] shadow-[1px_1px_0px_#1E2129]">
            <span className="w-2 h-2 bg-[#10B981] inline-block animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-[#1E2129] uppercase">ONLINE</span>
          </div>

          <Link
            href="/"
            className="font-mono text-[11px] font-bold text-[#1E2129] bg-white border-2 border-[#1E2129] px-3 py-1.5 shadow-[2px_2px_0px_#1E2129] hover:bg-[#FAF9F5] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            Sign out
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
