import React from "react";

export interface RetroBadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "blue" | "green" | "ink" | "paper";
  size?: "sm" | "md";
  className?: string;
}

export function RetroBadge({
  children,
  variant = "yellow",
  size = "sm",
  className = "",
}: RetroBadgeProps) {
  const variantStyles = {
    yellow: "bg-[#FBBF24] text-[#1E2129] border-[#1E2129]",
    blue: "bg-[#3F86F7] text-white border-[#1E2129]",
    green: "bg-[#10B981] text-white border-[#1E2129]",
    ink: "bg-[#1E2129] text-[#F2F0EA] border-[#1E2129]",
    paper: "bg-[#E8E5DC] text-[#1E2129] border-[#1E2129]",
  }[variant];

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans font-bold tracking-tight border ${variantStyles} ${sizeStyles} shadow-[2px_2px_0px_#1E2129] ${className}`}
    >
      {children}
    </span>
  );
}
