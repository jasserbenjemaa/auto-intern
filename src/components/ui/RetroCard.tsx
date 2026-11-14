import React from "react";

export interface RetroCardProps {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  badgeColor?: "blue" | "yellow" | "green";
  showWindowControls?: boolean;
  className?: string;
}

export function RetroCard({
  children,
  title,
  badge,
  badgeColor = "yellow",
  showWindowControls = false,
  className = "",
}: RetroCardProps) {
  const badgeBg = {
    yellow: "bg-[#FBBF24] text-[#1E2129]",
    blue: "bg-[#3F86F7] text-white",
    green: "bg-[#10B981] text-white",
  }[badgeColor];

  return (
    <div
      className={`border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] transition-all ${className}`}
    >
      {(title || showWindowControls || badge) && (
        <div className="flex items-center justify-between border-b-2 border-[#1E2129] bg-[#E8E5DC]/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            {showWindowControls && (
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-none border border-[#1E2129] bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-none border border-[#1E2129] bg-[#FBBF24]" />
                <span className="w-2.5 h-2.5 rounded-none border border-[#1E2129] bg-[#10B981]" />
              </div>
            )}
            {title && (
              <span className="font-sans text-xs font-bold tracking-tight text-[#1E2129] uppercase">
                {title}
              </span>
            )}
          </div>

          {badge && (
            <span
              className={`font-mono text-[11px] font-semibold tracking-tight px-2 py-0.5 border border-[#1E2129] shadow-[1px_1px_0px_#1E2129] ${badgeBg}`}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}
