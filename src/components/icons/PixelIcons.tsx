import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export function PixelEyeIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      role="img"
      aria-label="Show password"
    >
      <rect x="8" y="5" width="8" height="2" fill="currentColor" />
      <rect x="4" y="7" width="4" height="2" fill="currentColor" />
      <rect x="16" y="7" width="4" height="2" fill="currentColor" />
      <rect x="2" y="9" width="2" height="6" fill="currentColor" />
      <rect x="20" y="9" width="2" height="6" fill="currentColor" />
      <rect x="4" y="15" width="4" height="2" fill="currentColor" />
      <rect x="16" y="15" width="4" height="2" fill="currentColor" />
      <rect x="8" y="17" width="8" height="2" fill="currentColor" />
      {/* Pupil */}
      <rect x="10" y="10" width="4" height="4" fill="currentColor" />
      <rect x="12" y="10" width="1" height="1" fill="#FFFFFF" />
    </svg>
  );
}

export function PixelEyeOffIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      role="img"
      aria-label="Hide password"
    >
      <rect x="8" y="5" width="8" height="2" fill="currentColor" />
      <rect x="4" y="7" width="4" height="2" fill="currentColor" />
      <rect x="16" y="7" width="4" height="2" fill="currentColor" />
      <rect x="2" y="9" width="2" height="6" fill="currentColor" />
      <rect x="20" y="9" width="2" height="6" fill="currentColor" />
      <rect x="4" y="15" width="4" height="2" fill="currentColor" />
      <rect x="16" y="15" width="4" height="2" fill="currentColor" />
      <rect x="8" y="17" width="8" height="2" fill="currentColor" />
      {/* Diagonal slash */}
      <rect x="4" y="4" width="2" height="2" fill="#EF4444" />
      <rect x="6" y="6" width="2" height="2" fill="#EF4444" />
      <rect x="8" y="8" width="2" height="2" fill="#EF4444" />
      <rect x="10" y="10" width="4" height="4" fill="#EF4444" />
      <rect x="14" y="14" width="2" height="2" fill="#EF4444" />
      <rect x="16" y="16" width="2" height="2" fill="#EF4444" />
      <rect x="18" y="18" width="2" height="2" fill="#EF4444" />
    </svg>
  );
}

export function PixelMailIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      role="img"
      aria-label="Email"
    >
      <rect x="3" y="6" width="18" height="2" fill="currentColor" />
      <rect x="3" y="16" width="18" height="2" fill="currentColor" />
      <rect x="3" y="8" width="2" height="8" fill="currentColor" />
      <rect x="19" y="8" width="2" height="8" fill="currentColor" />
      {/* V envelope fold */}
      <rect x="5" y="8" width="2" height="2" fill="currentColor" />
      <rect x="17" y="8" width="2" height="2" fill="currentColor" />
      <rect x="7" y="10" width="2" height="2" fill="currentColor" />
      <rect x="15" y="10" width="2" height="2" fill="currentColor" />
      <rect x="9" y="12" width="6" height="2" fill="currentColor" />
    </svg>
  );
}

export function PixelLockIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      role="img"
      aria-label="Password lock"
    >
      {/* Shackle */}
      <rect x="8" y="4" width="8" height="2" fill="currentColor" />
      <rect x="6" y="6" width="2" height="5" fill="currentColor" />
      <rect x="16" y="6" width="2" height="5" fill="currentColor" />
      {/* Body */}
      <rect x="4" y="10" width="16" height="10" fill="currentColor" />
      {/* Keyhole */}
      <rect x="11" y="13" width="2" height="3" fill="#F2F0EA" />
      <rect x="11" y="15" width="2" height="3" fill="#F2F0EA" />
    </svg>
  );
}

export function PixelCheckIcon({ className = "", size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      role="img"
      aria-label="Checked"
    >
      <rect x="11" y="4" width="2" height="2" fill="currentColor" />
      <rect x="9" y="6" width="2" height="2" fill="currentColor" />
      <rect x="7" y="8" width="2" height="2" fill="currentColor" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" />
      <rect x="3" y="4" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

export function PixelArrowRightIcon({ className = "", size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      role="img"
      aria-label="Arrow right"
    >
      <rect x="2" y="7" width="10" height="2" fill="currentColor" />
      <rect x="8" y="3" width="2" height="2" fill="currentColor" />
      <rect x="10" y="5" width="2" height="2" fill="currentColor" />
      <rect x="12" y="7" width="2" height="2" fill="currentColor" />
      <rect x="10" y="9" width="2" height="2" fill="currentColor" />
      <rect x="8" y="11" width="2" height="2" fill="currentColor" />
    </svg>
  );
}
