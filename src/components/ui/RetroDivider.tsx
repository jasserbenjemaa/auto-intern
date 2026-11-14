import React from "react";

interface RetroDividerProps {
  label?: string;
  className?: string;
}

export function RetroDivider({ label = "OR", className = "" }: RetroDividerProps) {
  return (
    <div className={`relative flex items-center justify-center my-6 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-[#1E2129]" />
      </div>
      <div className="relative bg-white px-3 py-0.5 border border-[#1E2129] shadow-[1px_1px_0px_#1E2129]">
        <span className="font-sans text-xs text-[#5B6170] tracking-wider uppercase font-bold">
          {label}
        </span>
      </div>
    </div>
  );
}
