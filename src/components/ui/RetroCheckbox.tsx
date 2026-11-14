import React from "react";
import { PixelCheckIcon } from "../icons/PixelIcons";

export interface RetroCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
}

export function RetroCheckbox({ label, id, checked, className = "", ...props }: RetroCheckboxProps) {
  const checkboxId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <label htmlFor={checkboxId} className={`inline-flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-sans text-[#1E2129] ${className}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 border-2 border-[#1E2129] bg-white shadow-[2px_2px_0px_#1E2129] peer-checked:bg-[#3F86F7] peer-checked:text-white transition-all flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-[#3F86F7]">
          {checked && <PixelCheckIcon size={12} className="text-white" />}
        </div>
      </div>
      <span className="font-medium text-[#1E2129]">{label}</span>
    </label>
  );
}
