"use client";

import React, { useEffect, useState } from "react";
import { PixelMailIcon } from "@/components/icons/PixelIcons";

export interface SentApplicationInfo {
  companyName: string;
  companyEmail: string;
  roleTitle: string;
  attachments: string[];
}

interface UndoSendToastProps {
  info: SentApplicationInfo;
  durationSec?: number;
  onUndo: () => void;
  onFinalized?: () => void;
  onDismiss: () => void;
}

export function UndoSendToast({
  info,
  durationSec = 5,
  onUndo,
  onFinalized,
  onDismiss,
}: UndoSendToastProps) {
  const [timeLeft, setTimeLeft] = useState(durationSec);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onFinalized) onFinalized();
      onDismiss();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onFinalized, onDismiss]);

  const progressPercent = (timeLeft / durationSec) * 100;

  return (
    <div className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] overflow-hidden">
        {/* Toast Header / Message */}
        <div className="p-4 bg-[#FAF9F5] flex items-start justify-between gap-3 border-b-2 border-[#1E2129]/15">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 shrink-0 bg-[#C8F560] border-2 border-[#1E2129] flex items-center justify-center font-bold shadow-[2px_2px_0px_#1E2129]">
              <PixelMailIcon size={16} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-sans text-sm font-extrabold text-[#1E2129]">
                  Application Sent!
                </span>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]">
                  {timeLeft}s
                </span>
              </div>
              <p className="font-sans text-xs text-[#5B6170] leading-snug">
                Dispatched to <strong>{info.companyEmail}</strong> for the role{" "}
                <em>&quot;{info.roleTitle}&quot;</em>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="font-mono text-xs font-bold text-[#5B6170] hover:text-[#1E2129] px-1.5 py-0.5 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-2.5 bg-white flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-[#5B6170]">
            Files: {info.attachments.join(" + ")}
          </span>

          <button
            type="button"
            onClick={onUndo}
            className="inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-tight px-3 py-1.5 bg-[#E5484D] text-white border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1E2129] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
          >
            <span>Undo Send ({timeLeft}s)</span>
          </button>
        </div>

        {/* 5-Second Countdown Progress Bar */}
        <div className="w-full bg-[#E8E5DC] h-1.5 border-t border-[#1E2129]/20">
          <div
            className="bg-[#3F86F7] h-full transition-all ease-linear duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
