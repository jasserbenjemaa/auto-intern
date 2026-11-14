"use client";

import React from "react";
import { Internship, Company } from "@/data/mockInternships";
import { PixelCheckIcon } from "@/components/icons/PixelIcons";

interface InternshipCardProps {
  internship: Internship;
  company: Company;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Pixel Edit Pencil Icon
function PixelEditIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="currentColor"
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="5" y="0" width="2" height="1" />
      <rect x="6" y="1" width="2" height="1" />
      <rect x="4" y="2" width="2" height="1" />
      <rect x="3" y="3" width="2" height="1" />
      <rect x="2" y="4" width="2" height="1" />
      <rect x="1" y="5" width="2" height="1" />
      <rect x="0" y="7" width="2" height="1" />
      <rect x="0" y="6" width="1" height="1" />
    </svg>
  );
}

// Pixel Trash Icon
function PixelTrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="currentColor"
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="2" y="0" width="4" height="1" />
      <rect x="1" y="1" width="6" height="1" />
      <rect x="1" y="2" width="6" height="5" />
      <rect x="3" y="3" width="1" height="3" fill="white" />
      <rect x="4" y="3" width="1" height="3" fill="white" />
    </svg>
  );
}

export function InternshipCard({
  internship,
  company,
  isSelected = false,
  onToggleSelect,
  onEdit,
  onDelete,
}: InternshipCardProps) {
  const renderPaidStatus = () => {
    if (internship.is_paid === true) {
      return (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1E2129] bg-[#C8F560] border-2 border-[#1E2129] px-2.5 py-0.5 shadow-[1px_1px_0px_#1E2129]">
          <span className="w-2 h-2 bg-[#10B981] inline-block" />
          PAID (STIPEND INCLUDED)
        </span>
      );
    }
    if (internship.is_paid === false) {
      return (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white bg-[#E5484D] border-2 border-[#1E2129] px-2.5 py-0.5 shadow-[1px_1px_0px_#1E2129]">
          UNPAID
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#5B6170] bg-[#E8E5DC] border border-[#1E2129] px-2.5 py-0.5">
        STIPEND UNSPECIFIED
      </span>
    );
  };

  return (
    <article
      className={`border-2 border-[#1E2129] transition-all p-6 sm:p-7 ${
        isSelected
          ? "bg-[#FAF9F5] shadow-[8px_8px_0px_#3F86F7] ring-2 ring-[#3F86F7]"
          : "bg-white shadow-[6px_6px_0px_#1E2129] hover:shadow-[8px_8px_0px_#1E2129] hover:translate-x-[-1px] hover:translate-y-[-1px]"
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-[#1E2129]/15">
        <div className="flex flex-wrap items-center gap-2">
          {renderPaidStatus()}

          {/* Pre-embauche */}
          <span
            className={`font-mono text-xs font-bold px-2.5 py-0.5 border-2 border-[#1E2129] shadow-[1px_1px_0px_#1E2129] ${
              internship.pre_embauche
                ? "bg-[#F5A623] text-[#1E2129]"
                : "bg-[#E8E5DC] text-[#5B6170]"
            }`}
          >
            {internship.pre_embauche ? "★ FULL-TIME OFFER: YES" : "FULL-TIME OFFER: NO"}
          </span>

          {/* Niveau d'étude */}
          <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129]">
            {internship.niveau_etude}
          </span>
        </div>

        {/* Duration & Interns */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#5B6170]">
          <span className="bg-[#FAF9F5] px-2.5 py-0.5 border border-[#1E2129] font-bold text-[#1E2129]">
            {internship.duree}
          </span>
          <span>•</span>
          <span className="font-bold text-[#1E2129]">
            {internship.nb_stagiaires} {internship.nb_stagiaires > 1 ? "interns" : "intern"}
          </span>
        </div>
      </div>

      {/* Titre & Localisation */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-[#1E2129] mb-1.5 leading-snug">
            {internship.titre}
          </h3>

          {/* Top Quick Action Buttons (Edit / Delete) - Icons Only */}
          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                title="Edit this offer"
                aria-label="Edit this offer"
                className="w-7 h-7 flex items-center justify-center bg-white border border-[#1E2129] shadow-[1px_1px_0px_#1E2129] text-[#1E2129] hover:bg-[#FAF9F5] hover:text-[#3F86F7] hover:border-[#3F86F7] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                <PixelEditIcon size={14} />
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete the offer "${internship.titre}"?`)) {
                    onDelete();
                  }
                }}
                title="Delete this offer"
                aria-label="Delete this offer"
                className="w-7 h-7 flex items-center justify-center bg-white border border-[#1E2129] shadow-[1px_1px_0px_#1E2129] text-[#E5484D] hover:bg-[#FAF9F5] hover:border-[#E5484D] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                <PixelTrashIcon size={14} />
              </button>
            )}
          </div>
        </div>

        <p className="font-sans text-xs text-[#5B6170] flex items-center gap-2">
          <span className="font-bold text-[#1E2129]">{company.name}</span>
          <span>•</span>
          <span>{internship.localisation}</span>
          {internship.department && (
            <>
              <span>•</span>
              <span className="text-[#3F86F7] font-semibold">{internship.department}</span>
            </>
          )}
          {internship.posted_date && (
            <>
              <span>•</span>
              <span className="font-mono text-[10px] text-[#5B6170]">{internship.posted_date}</span>
            </>
          )}
        </p>
      </div>

      {/* Primary Mission */}
      <div className="mb-4 bg-[#FAF9F5] border-2 border-[#1E2129] p-4 shadow-[2px_2px_0px_#1E2129]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 bg-[#3F86F7] inline-block" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#3F86F7]">
            Primary Mission
          </h4>
        </div>
        <p className="font-sans text-sm text-[#1E2129] leading-relaxed font-medium">
          {internship.mission_principale}
        </p>
      </div>

      {/* Description */}
      <div className="mb-5">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6170] mb-1.5">
          Description
        </h4>
        <p className="font-sans text-sm text-[#5B6170] leading-relaxed">
          {internship.description}
        </p>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6170] mb-2">
          Technologies & Tools
        </h4>
        <div className="flex flex-wrap gap-2">
          {internship.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono font-semibold bg-white text-[#1E2129] border-2 border-[#1E2129] shadow-[1px_1px_0px_#1E2129]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer: Selection and Edit Controls */}
      <div className="pt-4 border-t-2 border-[#1E2129]/15 flex items-center justify-between gap-4 flex-wrap">
        <span className="font-mono text-xs text-[#5B6170]">
          REF: #{internship.id.toUpperCase()}
        </span>

        <div className="flex items-center gap-2.5">
          {onToggleSelect && (
            <button
              type="button"
              onClick={onToggleSelect}
              className={`inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm tracking-tight px-5 py-2.5 border-2 border-[#1E2129] transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#C8F560] text-[#1E2129] shadow-[3px_3px_0px_#1E2129] active:translate-x-[1px] active:translate-y-[1px]"
                  : "bg-white text-[#1E2129] shadow-[3px_3px_0px_#1E2129] hover:bg-[#FAF9F5] hover:shadow-[5px_5px_0px_#1E2129] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
              }`}
            >
              {isSelected ? (
                <>
                  <PixelCheckIcon size={14} />
                  <span>✓ Selected for Resume</span>
                </>
              ) : (
                <span>Select for Resume</span>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
