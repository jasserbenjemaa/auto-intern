import React from "react";

export interface PixelCatMascotProps {
  className?: string;
  size?: number;
  showDropShadow?: boolean;
  mood?: string;
}

/**
 * Exact 5x5 Pixel Cat Mascot from ShipCat (https://shipcat.app/)
 * Features the signature 5x5 pixel art matrix with animated blinking eyes.
 */
export function PixelCatMascot({
  className = "",
  size = 24,
  showDropShadow = false,
}: PixelCatMascotProps) {
  return (
    <div
      className={`inline-block select-none ${className}`}
      style={{
        filter: showDropShadow ? "drop-shadow(4px 4px 0 #3F86F7)" : undefined,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 5 5"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="pixelated block"
        role="img"
        aria-label="ShipCat Pixel Mascot"
      >
        <path d="M0 0h1v1H0zM4 0h1v1H4zM0 1h5v1H0zM0 2h1v1H0zM2 2h1v1H2zM4 2h1v1H4zM0 3h5v1H0zM1 4h1v1H1zM3 4h1v1H3z" />
      </svg>
    </div>
  );
}

/**
 * Detailed Animated ShipCat Mascot with Peeking and Blinking
 * Used for hero sections, terminal corners, and cards.
 */
export function AnimatedShipCat({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        filter: "drop-shadow(4px 4px 0 #3F86F7)",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 5 5"
        fill="#1E2129"
        xmlns="http://www.w3.org/2000/svg"
        className="pixelated block"
      >
        {/* Base cat body */}
        <path d="M0 0h1v1H0zM4 0h1v1H4zM0 1h5v1H0zM0 2h1v1H0zM2 2h1v1H2zM4 2h1v1H4zM0 3h5v1H0zM1 4h1v1H1zM3 4h1v1H3z" />
        {/* Blinking eyes */}
        <rect
          x="1"
          y="2"
          width="1"
          height="1"
          fill="#3F86F7"
          className="animate-pulse"
        />
        <rect
          x="3"
          y="2"
          width="1"
          height="1"
          fill="#3F86F7"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}
