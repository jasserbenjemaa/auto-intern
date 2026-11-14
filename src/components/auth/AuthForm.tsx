"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PixelGoogleIcon,
  PixelMicrosoftIcon,
  PixelMailIcon,
  PixelLockIcon,
  PixelEyeIcon,
  PixelEyeOffIcon,
  PixelArrowRightIcon,
} from "../ui";

export function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    router.push("/dashboard");
  };

  const handleOAuth = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* ShipCat Terminal Window Card */}
      <div className="border-2 border-[#1E2129] bg-white shadow-[8px_8px_0px_#3F86F7]">
        {/* macOS Terminal Window Titlebar */}
        <div className="flex items-center justify-between border-b-2 border-[#1E2129] bg-[#E8E5DC] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-none border border-[#1E2129] bg-[#E5484D]" />
            <span className="w-3 h-3 rounded-none border border-[#1E2129] bg-[#F5A623]" />
            <span className="w-3 h-3 rounded-none border border-[#1E2129] bg-[#C8F560]" />
            <span className="font-mono text-xs font-semibold text-[#1E2129] ml-2">
              ~/login — auto-intern
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]">
            READY
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7">
          <div className="mb-5">
            <h2 className="font-sans text-xl font-extrabold tracking-tight text-[#1E2129]">
              Pilot Authentication
            </h2>
            <p className="font-sans text-xs text-[#5B6170] mt-0.5">
              Access your automated application dashboard and PFE listings.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-1.5 text-left">
              <label
                htmlFor="email"
                className="text-xs font-sans font-bold text-[#1E2129] tracking-tight flex items-center justify-between"
              >
                <span>Email Address</span>
                <span className="font-mono text-[10px] text-[#5B6170]">user@domain</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[#5B6170] pointer-events-none">
                  <PixelMailIcon size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-[#1E2129] font-sans text-sm border-2 border-[#1E2129] pl-9 pr-3 py-2.5 shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7] focus:shadow-[3px_3px_0px_#3F86F7] transition-all placeholder:text-[#5B6170]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5 text-left">
              <label
                htmlFor="password"
                className="text-xs font-sans font-bold text-[#1E2129] tracking-tight flex items-center justify-between"
              >
                <span>Access Key / Password</span>
                <span className="font-mono text-[10px] text-[#5B6170]">••••••••</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[#5B6170] pointer-events-none">
                  <PixelLockIcon size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white text-[#1E2129] font-sans text-sm border-2 border-[#1E2129] pl-9 pr-10 py-2.5 shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7] focus:shadow-[3px_3px_0px_#3F86F7] transition-all placeholder:text-[#5B6170]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 text-[#5B6170] hover:text-[#1E2129] p-1 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <PixelEyeOffIcon size={16} /> : <PixelEyeIcon size={16} />}
                </button>
              </div>
            </div>

            {/* Auxiliary Options */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none font-sans text-[#1E2129]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 border-2 border-[#1E2129] bg-white shadow-[1px_1px_0px_#1E2129] peer-checked:bg-[#3F86F7] peer-checked:text-white flex items-center justify-center transition-all">
                  {rememberMe && <span className="block w-1.5 h-1.5 bg-white" />}
                </div>
                <span className="font-medium text-xs">Stay signed in</span>
              </label>

              <button
                type="button"
                className="font-sans font-semibold text-xs text-[#3F86F7] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* ShipCat Primary Button with Blue Shadow */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 font-sans font-bold text-sm text-[#F2F0EA] bg-[#1E2129] border-2 border-[#1E2129] py-3 px-4 shadow-[4px_4px_0px_#3F86F7] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#3F86F7] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#3F86F7] transition-all cursor-pointer"
              >
                <span>Sign In to Terminal</span>
                <PixelArrowRightIcon size={14} />
              </button>
            </div>
          </form>

          {/* ShipCat Neobrutalist Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#1E2129]" />
            </div>
            <div className="relative bg-white px-2.5 py-0.5 border border-[#1E2129] shadow-[1px_1px_0px_#1E2129]">
              <span className="font-mono text-[10px] text-[#5B6170] tracking-wider uppercase font-bold">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Social OAuth Buttons Side by Side */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleOAuth}
              className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-xs text-[#1E2129] bg-white border-2 border-[#1E2129] py-2.5 px-3 shadow-[3px_3px_0px_#1E2129] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1E2129] hover:bg-[#FAF9F5] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1E2129] transition-all cursor-pointer"
            >
              <PixelGoogleIcon size={18} />
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleOAuth}
              className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-xs text-[#1E2129] bg-white border-2 border-[#1E2129] py-2.5 px-3 shadow-[3px_3px_0px_#1E2129] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1E2129] hover:bg-[#FAF9F5] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1E2129] transition-all cursor-pointer"
            >
              <PixelMicrosoftIcon size={18} />
              <span>Microsoft</span>
            </button>
          </div>
        </div>

        {/* Terminal Footer Bar */}
        <div className="border-t-2 border-[#1E2129] bg-[#F2F0EA] px-4 py-2 flex items-center justify-between font-mono text-[11px] text-[#5B6170]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#10B981] inline-block" />
            <span>SSL 256-bit encrypted</span>
          </span>
          <span>v1.0.4</span>
        </div>
      </div>
    </div>
  );
}
