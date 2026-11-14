"use client";

import React, { useState, useEffect } from "react";
import { Company } from "@/data/mockInternships";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCompany: (company: Company) => void;
  onDeleteCompany?: (companyId: string) => void;
  initialCompany?: Company | null;
}

const PRESET_COLORS = [
  "#3F86F7", // Blue
  "#632CA6", // Purple
  "#10B981", // Emerald
  "#F5A623", // Amber
  "#E5484D", // Red
  "#005D5D", // Teal
  "#1E2129", // Ink
];

export function CompanyModal({
  isOpen,
  onClose,
  onSaveCompany,
  onDeleteCompany,
  initialCompany,
}: CompanyModalProps) {
  const isEditing = Boolean(initialCompany);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [tagline, setTagline] = useState("");
  const [workplaceType, setWorkplaceType] = useState<"Remote" | "Hybrid" | "On site">("Hybrid");
  const [logoBg, setLogoBg] = useState(PRESET_COLORS[0]);
  const [customLogoText, setCustomLogoText] = useState("");

  useEffect(() => {
    if (initialCompany) {
      setName(initialCompany.name || "");
      setLocation(initialCompany.location || "");
      setTagline(initialCompany.tagline || "");
      setWorkplaceType(initialCompany.workplace_type || "Hybrid");
      setLogoBg(initialCompany.logoBg || PRESET_COLORS[0]);
      setCustomLogoText(initialCompany.logoText || "");
    } else {
      setName("");
      setLocation("");
      setTagline("");
      setWorkplaceType("Hybrid");
      setLogoBg(PRESET_COLORS[0]);
      setCustomLogoText("");
    }
  }, [initialCompany, isOpen]);

  if (!isOpen) return null;

  const derivedLogoText = (customLogoText.trim() || name.trim())
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase() || "CO";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const savedCompany: Company = {
      id: initialCompany ? initialCompany.id : `comp-${Date.now()}`,
      name: name.trim(),
      logoText: derivedLogoText,
      logoBg,
      workplace_type: workplaceType,
      location: location.trim() || "Remote",
      tagline: tagline.trim() || "Innovative enterprise with high-impact internships",
      internships: initialCompany ? initialCompany.internships : [],
      added_date: initialCompany?.added_date || "Today",
    };

    onSaveCompany(savedCompany);
    onClose();
  };

  const handleDelete = () => {
    if (!initialCompany || !onDeleteCompany) return;
    if (confirm(`Are you sure you want to delete "${initialCompany.name}" and all its internship offers?`)) {
      onDeleteCompany(initialCompany.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2129]/65 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg border-2 border-[#1E2129] bg-white shadow-[8px_8px_0px_#1E2129] z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#1E2129] bg-[#E8E5DC]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#E5484D] border border-[#1E2129]" />
            <span className="w-2.5 h-2.5 bg-[#F5A623] border border-[#1E2129]" />
            <span className="w-2.5 h-2.5 bg-[#C8F560] border border-[#1E2129]" />
            <span className="font-mono text-xs font-bold uppercase tracking-tight text-[#1E2129] ml-1">
              {isEditing ? `EDIT_COMPANY.EXE – [${initialCompany?.name}]` : "NEW_COMPANY.EXE"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-[#1E2129] text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Company Name & Monogram Preview */}
          <div className="flex items-start gap-4">
            {/* Monogram Live Preview */}
            <div
              className="w-16 h-16 shrink-0 border-2 border-[#1E2129] flex items-center justify-center font-bold text-base shadow-[3px_3px_0px_#1E2129] text-white"
              style={{ backgroundColor: logoBg }}
            >
              {derivedLogoText}
            </div>

            <div className="flex-1 min-w-0">
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Company Name <span className="text-[#E5484D]">*</span>
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Ex: Stripe, Datadog, Mistral AI..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7] focus:shadow-[3px_3px_0px_#3F86F7] transition-all"
              />
            </div>
          </div>

          {/* Color Picker & Custom Monogram Initials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1.5">
                Brand Color
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setLogoBg(color)}
                    style={{ backgroundColor: color }}
                    className={`w-7 h-7 border-2 border-[#1E2129] cursor-pointer transition-transform ${
                      logoBg === color ? "scale-110 shadow-[2px_2px_0px_#1E2129] ring-2 ring-[#3F86F7]" : "hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Logo Initials (optional)
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="Ex: DD, STR..."
                value={customLogoText}
                onChange={(e) => setCustomLogoText(e.target.value.toUpperCase())}
                className="w-full px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7]"
              />
            </div>
          </div>

          {/* Location & Workplace Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Location / City
              </label>
              <input
                type="text"
                placeholder="Ex: San Francisco, Paris, London..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7]"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Workplace Type
              </label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as "Remote" | "Hybrid" | "On site")}
                className="w-full px-3 py-2 text-xs font-mono font-bold uppercase border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7]"
              >
                <option value="Hybrid">HYBRID</option>
                <option value="Remote">REMOTE</option>
                <option value="On site">ON SITE</option>
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
              Short Description / Tagline
            </label>
            <input
              type="text"
              placeholder="Ex: Financial infrastructure for the internet"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-xs font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t-2 border-[#1E2129]/15 flex items-center justify-between gap-3">
            <div>
              {isEditing && onDeleteCompany && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="font-mono text-xs font-bold px-3 py-2 border-2 border-[#E5484D] bg-white text-[#E5484D] hover:bg-[#FAF9F5] cursor-pointer"
                >
                  Delete Company
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs font-bold px-4 py-2 border-2 border-[#1E2129] bg-white text-[#5B6170] hover:text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!name.trim()}
                className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase px-5 py-2.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[3px_3px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isEditing ? "Save Changes" : "+ Add Company"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Re-export as AddCompanyModal for backwards-compatibility
export { CompanyModal as AddCompanyModal };
