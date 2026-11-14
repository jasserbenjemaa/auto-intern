import React from "react";

export interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "social" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function RetroButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: RetroButtonProps) {
  // Base retro styles using shipcat.app's clean Geist font
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-sans font-semibold transition-all duration-100 cursor-pointer select-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  // Size variations (matching shipcat button proportions)
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-none",
    md: "px-4 py-2.5 text-sm rounded-none tracking-tight",
    lg: "px-5 py-3 text-base rounded-none tracking-tight",
  }[size];

  // Variant styling matching shipcat.app neobrutalist retro rules
  const variantStyles = {
    primary:
      "border-2 border-[#1E2129] bg-[#1E2129] text-[#F2F0EA] shadow-[4px_4px_0px_#3F86F7] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#3F86F7] active:shadow-[1px_1px_0px_#3F86F7]",
    secondary:
      "border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[4px_4px_0px_#1E2129] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E2129] hover:bg-[#FAF9F5] active:shadow-[1px_1px_0px_#1E2129]",
    social:
      "border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[3px_3px_0px_#1E2129] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#1E2129] hover:bg-[#FAF9F5] active:shadow-[1px_1px_0px_#1E2129]",
    accent:
      "border-2 border-[#1E2129] bg-[#FBBF24] text-[#1E2129] shadow-[4px_4px_0px_#1E2129] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E2129] active:shadow-[1px_1px_0px_#1E2129]",
    ghost:
      "border-2 border-transparent bg-transparent text-[#1E2129] hover:bg-[#E8E5DC]/50 active:bg-[#E8E5DC]",
  }[variant];

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent animate-spin" />
          <span>Connecting...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
