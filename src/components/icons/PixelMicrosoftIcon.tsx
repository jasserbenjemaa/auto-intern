import React from "react";

interface PixelIconProps {
  className?: string;
  size?: number;
}

/**
 * Authentic 8-bit Pixel Art Microsoft Logo
 * 4 square quadrants rendered with stepped retro pixel blocks.
 */
export function PixelMicrosoftIcon({ className = "", size = 20 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pixelated ${className}`}
      aria-label="Microsoft"
      role="img"
    >
      {/* Top Left: Red #F25022 */}
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="2" y="2" width="9" height="2" fill="#FF724B" />
      <rect x="2" y="2" width="2" height="9" fill="#FF724B" />
      <rect x="9" y="9" width="2" height="2" fill="#BA2E07" />

      {/* Top Right: Green #7FBA00 */}
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="13" y="2" width="9" height="2" fill="#A4DE1F" />
      <rect x="13" y="2" width="2" height="9" fill="#A4DE1F" />
      <rect x="20" y="9" width="2" height="2" fill="#5A8800" />

      {/* Bottom Left: Blue #00A4EF */}
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="2" y="13" width="9" height="2" fill="#44C4FF" />
      <rect x="2" y="13" width="2" height="9" fill="#44C4FF" />
      <rect x="9" y="20" width="2" height="2" fill="#0077B3" />

      {/* Bottom Right: Yellow #FFB900 */}
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
      <rect x="13" y="13" width="9" height="2" fill="#FFD152" />
      <rect x="13" y="13" width="2" height="9" fill="#FFD152" />
      <rect x="20" y="20" width="2" height="2" fill="#C28B00" />
    </svg>
  );
}
