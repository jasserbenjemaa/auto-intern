import React, { forwardRef } from "react";

export interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const RetroInput = forwardRef<HTMLInputElement, RetroInputProps>(function RetroInput(
  { label, error, hint, leftIcon, rightElement, id, className = "", ...props },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-sans font-semibold text-[#1E2129] tracking-tight flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-[#EF4444] text-[11px] font-mono">*required</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-[#5B6170] pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          ref={ref}
          className={`w-full bg-white text-[#1E2129] font-sans text-sm border-2 transition-all placeholder:text-[#5B6170] disabled:bg-[#E8E5DC] disabled:cursor-not-allowed ${
            leftIcon ? "pl-10" : "pl-3.5"
          } ${rightElement ? "pr-10" : "pr-3.5"} py-2.5 ${
            error
              ? "border-[#EF4444] shadow-[2px_2px_0px_#EF4444] focus:border-[#EF4444] focus:shadow-[3px_3px_0px_#EF4444]"
              : "border-[#1E2129] shadow-[2px_2px_0px_#1E2129] focus:border-[#3F86F7] focus:shadow-[3px_3px_0px_#3F86F7]"
          } focus:outline-none ${className}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-2.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs font-sans text-[#EF4444] mt-0.5 flex items-center gap-1 font-medium">
          <span className="font-bold">!</span> {error}
        </p>
      ) : hint ? (
        <p className="text-xs font-sans text-[#5B6170] mt-0.5">{hint}</p>
      ) : null}
    </div>
  );
});
