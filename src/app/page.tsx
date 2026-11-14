"use client";

import React from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { PixelCatMascot, AnimatedShipCat } from "@/components/icons/PixelCatMascot";

export default function Home() {
  return (
    <div className="min-h-screen shipcat-grid flex flex-col justify-between font-sans selection:bg-[#3F86F7] selection:text-white">
      {/* Top Sticky Navigation Header */}
      <header className="sticky top-0 z-50 h-16 border-b-2 border-[#1E2129] bg-[#F2F0EA]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <PixelCatMascot size={22} className="text-[#1E2129] group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-pixel text-[15px] font-bold text-[#1E2129] tracking-tight uppercase leading-none">
                Auto-Intern
              </span>
              <span className="font-mono text-[9px] text-[#5B6170] hidden sm:inline uppercase mt-0.5">
                PFE Application Agent
              </span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[#C8F560] text-[#1E2129] border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129]">
              ● SYS: ONLINE
            </span>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase px-3.5 py-1.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[3px_3px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              <span>Dashboard</span>
              <span className="text-[10px] font-mono bg-[#3F86F7] px-1 py-0.2 text-white">
                LIVE
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Authentication Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center">
        {/* Intro Header */}
        <div className="text-center mb-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-white border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129]">
            <span className="w-2 h-2 bg-[#3F86F7] inline-block" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1E2129]">
              MISSION CONTROL · CADET ACCESS PORTAL
            </span>
          </div>

          <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1E2129] tracking-[-0.03em] mb-2">
            Pilot Login // Authentication
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#5B6170] leading-relaxed">
            Sign in to your Auto-Intern workspace. Manage automated PFE applications,
            tailor resumes on the fly, and track recruiter responses.
          </p>
        </div>

        {/* Mascot Speech Bubble */}
        <div className="w-full max-w-md mb-3 px-1">
          <div className="flex items-end justify-between gap-3">
            <div className="relative bg-white border-2 border-[#1E2129] px-4 py-2.5 shadow-[3px_3px_0px_#1E2129] text-xs font-sans text-[#1E2129] flex-1">
              <p className="font-medium tracking-tight">
                Meow! Ready to auto-apply to top internships? Sign in to unlock verified PFE offers and tailor your applications.
              </p>
              {/* Retro speech pointer */}
              <span className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-b-2 border-r-2 border-[#1E2129] rotate-45" />
            </div>

            <div className="shrink-0 bg-[#FAF9F5] border-2 border-[#1E2129] p-1.5 shadow-[3px_3px_0px_#1E2129]">
              <AnimatedShipCat size={38} />
            </div>
          </div>
        </div>

        {/* The Terminal Form */}
        <section aria-label="Sign In Terminal Form" className="w-full max-w-md">
          <AuthForm />
        </section>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <span className="px-2.5 py-1 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129] font-bold shadow-[1px_1px_0px_#1E2129]">
            256-BIT SSL ENCRYPTION
          </span>
          <span className="text-[#5B6170]">•</span>
          <span className="px-2.5 py-1 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129] font-bold shadow-[1px_1px_0px_#1E2129]">
            NO SPAM POLICY
          </span>
          <span className="text-[#5B6170]">•</span>
          <span className="px-2.5 py-1 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129] font-bold shadow-[1px_1px_0px_#1E2129]">
            END-TO-END PRIVACY
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#1E2129] bg-[#E8E5DC]/60 py-6 px-4 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#5B6170]">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-[#1E2129]">
              AUTO-INTERN // 2026
            </span>
            <span>•</span>
            <span>Autonomous Internship Applications</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#10B981] font-bold">● ALL SYSTEMS NORMAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
