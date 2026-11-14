"use client";

import React, { useState } from "react";
import { Company } from "@/data/mockInternships";

interface CompanySidebarProps {
  companies: Company[];
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
  onOpenAddCompany?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function CompanySidebar({
  companies,
  selectedCompanyId,
  onSelectCompany,
  onOpenAddCompany,
  isOpenMobile = false,
  onCloseMobile,
}: CompanySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "ALL" || c.workplace_type.toUpperCase() === filterType;
    return matchesSearch && matchesType;
  });

  const totalInternships = companies.reduce(
    (acc, curr) => acc + curr.internships.length,
    0
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-[#1E2129]/60 backdrop-blur-xs z-50 lg:hidden"
        />
      )}

      {/* Left Sidebar (Desktop: flush below 72px top bar; Mobile: full-height slide-over) */}
      <aside
        className={`fixed left-0 w-80 bg-white border-r-2 border-[#1E2129] flex flex-col transition-transform duration-200 ease-in-out ${
          isOpenMobile
            ? "top-0 bottom-0 z-50 translate-x-0 shadow-[8px_0px_0px_#1E2129]"
            : "top-[72px] bottom-0 z-30 -translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header: Search & Filters (Clean, no duplicate top add button) */}
        <div className="p-4 border-b-2 border-[#1E2129] bg-[#E8E5DC] shrink-0">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#3F86F7] border border-[#1E2129] inline-block shadow-[1px_1px_0px_#1E2129]" />
              <span className="font-mono text-xs font-bold uppercase tracking-tight text-[#1E2129]">
                Companies
              </span>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]">
                {filteredCompanies.length}/{companies.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-[#5B6170]">
                {totalInternships} Offers
              </span>

              {onCloseMobile && (
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="lg:hidden font-mono text-xs font-bold px-2 py-0.5 bg-white border border-[#1E2129] text-[#1E2129] cursor-pointer hover:bg-[#FAF9F5]"
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search company or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7] focus:shadow-[3px_3px_0px_#3F86F7] transition-all"
          />

          {/* Workplace Filter Pills */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {["ALL", "REMOTE", "HYBRID", "ON SITE"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-tight border border-[#1E2129] transition-all cursor-pointer ${
                  filterType === type
                    ? "bg-[#1E2129] text-[#F2F0EA] shadow-[1px_1px_0px_#3F86F7]"
                    : "bg-white text-[#1E2129] hover:bg-[#FAF9F5]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Companies List */}
        <div className="flex-1 overflow-y-auto divide-y-2 divide-[#1E2129]/15">
          {filteredCompanies.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#5B6170] font-mono space-y-3">
              <p>No companies found.</p>
              {onOpenAddCompany && (
                <button
                  type="button"
                  onClick={onOpenAddCompany}
                  className="font-mono text-xs font-bold uppercase px-3 py-1.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[2px_2px_0px_#3F86F7] hover:bg-black cursor-pointer"
                >
                  + Add this company
                </button>
              )}
            </div>
          ) : (
            filteredCompanies.map((company) => {
              const isSelected = company.id === selectedCompanyId;
              const workplaceBadgeBg =
                company.workplace_type === "Remote"
                  ? "bg-[#3F86F7] text-white"
                  : company.workplace_type === "Hybrid"
                  ? "bg-[#F5A623] text-[#1E2129]"
                  : "bg-[#C8F560] text-[#1E2129]";

              return (
                <button
                  key={company.id}
                  onClick={() => {
                    onSelectCompany(company.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full text-left p-3.5 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? "bg-[#F2F0EA] ring-2 ring-inset ring-[#1E2129]"
                      : "hover:bg-[#FAF9F5]"
                  }`}
                >
                  {/* Monogram Logo */}
                  <div
                    className="w-10 h-10 shrink-0 border-2 border-[#1E2129] flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_#1E2129]"
                    style={{
                      backgroundColor: company.logoBg,
                      color: "#FFFFFF",
                    }}
                  >
                    {company.logoText}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="font-sans font-bold text-sm text-[#1E2129] truncate tracking-tight">
                        {company.name}
                      </h3>
                      <span className="shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129]">
                        {company.internships.length} PFE
                      </span>
                    </div>

                    <p className="text-xs text-[#5B6170] truncate mb-2">
                      {company.location}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-[#1E2129] ${workplaceBadgeBg}`}
                      >
                        {company.workplace_type}
                      </span>

                      {company.added_date && (
                        <span className="font-mono text-[10px] text-[#5B6170] truncate">
                          {company.added_date}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}

          {/* Add Company Button at the end of the companies list */}
          {onOpenAddCompany && (
            <div className="p-3 bg-[#FAF9F5] border-t border-[#1E2129]/20">
              <button
                type="button"
                onClick={onOpenAddCompany}
                className="w-full py-2.5 px-3 font-mono text-xs font-bold uppercase tracking-tight bg-white hover:bg-[#FAF9F5] text-[#1E2129] border-2 border-dashed border-[#1E2129] hover:border-solid hover:shadow-[3px_3px_0px_#3F86F7] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="w-4 h-4 bg-[#C8F560] border border-[#1E2129] flex items-center justify-center font-bold text-xs text-[#1E2129]">
                  +
                </span>
                <span>Add a company</span>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t-2 border-[#1E2129] bg-[#E8E5DC] shrink-0 flex items-center justify-between font-mono text-[10px] text-[#5B6170]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#10B981] inline-block" />
            <span className="font-bold text-[#1E2129]">CADET PORTAL</span>
          </span>
          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]">
            {totalInternships} TOTAL OFFERS
          </span>
        </div>
      </aside>
    </>
  );
}
