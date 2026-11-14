import React from "react";

interface PixelIconProps {
  className?: string;
  size?: number;
}

/**
 * Authentic 8-bit Pixel Art Google "G" Logo
 * Rendered with pixel blocks for a retro look.
 */
export function PixelGoogleIcon({ className = "", size = 20 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      aria-label="Google"
      role="img"
    >
      {/* Red - Top Arc */}
      <rect x="7" y="2" width="10" height="2" fill="#EA4335" />
      <rect x="5" y="4" width="2" height="2" fill="#EA4335" />
      <rect x="17" y="4" width="2" height="2" fill="#EA4335" />
      <rect x="3" y="6" width="2" height="2" fill="#EA4335" />
      <rect x="19" y="6" width="2" height="2" fill="#EA4335" />
      <rect x="7" y="4" width="10" height="2" fill="#EA4335" />

      {/* Blue - Right & Center Bar */}
      <rect x="12" y="10" width="9" height="4" fill="#4285F4" />
      <rect x="19" y="14" width="2" height="2" fill="#4285F4" />
      <rect x="17" y="16" width="2" height="2" fill="#4285F4" />
      <rect x="19" y="8" width="2" height="2" fill="#4285F4" />

      {/* Green - Bottom Arc */}
      <rect x="7" y="20" width="10" height="2" fill="#34A853" />
      <rect x="15" y="18" width="4" height="2" fill="#34A853" />
      <rect x="7" y="18" width="8" height="2" fill="#34A853" />
      <rect x="5" y="18" width="2" height="2" fill="#34A853" />

      {/* Yellow - Left Arc */}
      <rect x="1" y="8" width="2" height="8" fill="#FBBC05" />
      <rect x="3" y="8" width="2" height="8" fill="#FBBC05" />
      <rect x="3" y="16" width="2" height="2" fill="#FBBC05" />
    </svg>
  );
}
