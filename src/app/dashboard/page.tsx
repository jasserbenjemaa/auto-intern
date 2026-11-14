"use client";

import React, { useState } from "react";
import { MOCK_COMPANIES, Internship, Company } from "@/data/mockInternships";
import { CompanySidebar } from "@/components/dashboard/CompanySidebar";
import { InternshipCard } from "@/components/dashboard/InternshipCard";
import { ApplicationDrawer } from "@/components/dashboard/ApplicationDrawer";
import { UndoSendToast, SentApplicationInfo } from "@/components/dashboard/UndoSendToast";
import { CompanyModal } from "@/components/dashboard/CompanyModal";
import { InternshipModal } from "@/components/dashboard/InternshipModal";
import { PixelCatMascot } from "@/components/icons/PixelCatMascot";
import { PixelArrowRightIcon } from "@/components/icons/PixelIcons";

// Pixel Edit Pencil Icon
function PixelEditIcon({ size = 12 }: { size?: number }) {
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
function PixelTrashIcon({ size = 12 }: { size?: number }) {
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

export default function DashboardPage() {
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    MOCK_COMPANIES[0].id
  );

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Company Modal State (supports both adding new and altering existing enterprise info)
  const [companyModalState, setCompanyModalState] = useState<{
    isOpen: boolean;
    companyToEdit: Company | null;
  }>({
    isOpen: false,
    companyToEdit: null,
  });

  // Internship Modal State (supports both adding new and altering existing internships)
  const [internshipModalState, setInternshipModalState] = useState<{
    isOpen: boolean;
    internshipToEdit: Internship | null;
  }>({
    isOpen: false,
    internshipToEdit: null,
  });

  // Selection state
  const [selectedInternshipIds, setSelectedInternshipIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [undoToastInfo, setUndoToastInfo] = useState<SentApplicationInfo | null>(null);

  const selectedCompany =
    companies.find((c) => c.id === selectedCompanyId) || companies[0] || MOCK_COMPANIES[0];

  const displayedInternships = selectedCompany?.internships || [];

  const totalInternshipsCount = companies.reduce(
    (acc, curr) => acc + curr.internships.length,
    0
  );

  // Add or Alter (Update) an enterprise
  const handleSaveCompany = (savedCompany: Company) => {
    setCompanies((prev) => {
      const exists = prev.some((c) => c.id === savedCompany.id);
      if (exists) {
        // Alter existing enterprise info while preserving internships
        return prev.map((c) =>
          c.id === savedCompany.id
            ? { ...savedCompany, internships: c.internships }
            : c
        );
      } else {
        // Add new enterprise
        return [savedCompany, ...prev];
      }
    });
    setSelectedCompanyId(savedCompany.id);
  };

  // Delete an enterprise
  const handleDeleteCompany = (companyId: string) => {
    setCompanies((prev) => {
      const remaining = prev.filter((c) => c.id !== companyId);
      if (remaining.length > 0 && selectedCompanyId === companyId) {
        setSelectedCompanyId(remaining[0].id);
      }
      return remaining;
    });
    setSelectedInternshipIds([]);
  };

  // Add or Alter (Edit) an internship
  const handleSaveInternship = (internship: Internship) => {
    setCompanies((prev) =>
      prev.map((comp) => {
        if (comp.id !== selectedCompany.id) return comp;
        const exists = comp.internships.some((i) => i.id === internship.id);
        if (exists) {
          return {
            ...comp,
            internships: comp.internships.map((i) =>
              i.id === internship.id ? internship : i
            ),
          };
        } else {
          return {
            ...comp,
            internships: [internship, ...comp.internships],
          };
        }
      })
    );
  };

  const handleDeleteInternship = (internshipId: string) => {
    setCompanies((prev) =>
      prev.map((comp) => {
        if (comp.id !== selectedCompany.id) return comp;
        return {
          ...comp,
          internships: comp.internships.filter((i) => i.id !== internshipId),
        };
      })
    );
    setSelectedInternshipIds((prev) => prev.filter((id) => id !== internshipId));
  };

  const toggleSelectInternship = (id: string) => {
    setSelectedInternshipIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedInternshipsData: { internship: Internship; company: Company }[] = [];
  companies.forEach((comp) => {
    comp.internships.forEach((intern) => {
      if (selectedInternshipIds.includes(intern.id)) {
        selectedInternshipsData.push({ internship: intern, company: comp });
      }
    });
  });

  const handleSendApplication = (info: SentApplicationInfo) => {
    setUndoToastInfo(info);
    setIsDrawerOpen(false);
  };

  const handleUndoSend = () => {
    setUndoToastInfo(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex-1 flex pb-20">
      {/* 1. Left Fixed Sidebar */}
      <CompanySidebar
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        onSelectCompany={setSelectedCompanyId}
        onOpenAddCompany={() =>
          setCompanyModalState({ isOpen: true, companyToEdit: null })
        }
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 lg:pl-80 flex flex-col min-w-0">
        {/* Mobile Sub-Bar */}
        <div className="lg:hidden sticky top-[72px] z-20 border-b-2 border-[#1E2129] bg-[#FAF9F5] px-4 py-2.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-3 py-1.5 bg-white border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129] text-[#1E2129] cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
          >
            <PixelCatMascot size={16} />
            <span>Companies ({companies.length})</span>
          </button>

          <span className="font-mono text-xs text-[#5B6170]">
            <strong className="text-[#1E2129]">{selectedCompany?.name}</strong> ({displayedInternships.length} offers)
          </span>
        </div>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto flex flex-col gap-6">
          {/* Selected Company Profile Banner */}
          {selectedCompany && (
            <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#1E2129]/15">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 border-2 border-[#1E2129] flex items-center justify-center font-bold text-base shadow-[3px_3px_0px_#1E2129] shrink-0 text-white"
                    style={{ backgroundColor: selectedCompany.logoBg }}
                  >
                    {selectedCompany.logoText}
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                      <h1 className="font-sans text-2xl font-extrabold tracking-tight text-[#1E2129]">
                        {selectedCompany.name}
                      </h1>
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 border border-[#1E2129] ${
                          selectedCompany.workplace_type === "Remote"
                            ? "bg-[#3F86F7] text-white"
                            : selectedCompany.workplace_type === "Hybrid"
                            ? "bg-[#F5A623] text-[#1E2129]"
                            : "bg-[#C8F560] text-[#1E2129]"
                        }`}
                      >
                        {selectedCompany.workplace_type}
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#5B6170]">
                      {selectedCompany.location} • {selectedCompany.tagline}
                      {selectedCompany.added_date && (
                        <span> • Added {selectedCompany.added_date}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right: Company Edit and Delete Actions (Icons Only) */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() =>
                      setCompanyModalState({
                        isOpen: true,
                        companyToEdit: selectedCompany,
                      })
                    }
                    title="Edit company info"
                    aria-label="Edit company info"
                    className="w-8 h-8 flex items-center justify-center bg-white border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129] text-[#1E2129] hover:bg-[#FAF9F5] hover:text-[#3F86F7] hover:border-[#3F86F7] hover:shadow-[2px_2px_0px_#3F86F7] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] transition-all"
                  >
                    <PixelEditIcon size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete "${selectedCompany.name}" and all its internship offers?`
                        )
                      ) {
                        handleDeleteCompany(selectedCompany.id);
                      }
                    }}
                    title="Delete company"
                    aria-label="Delete company"
                    className="w-8 h-8 flex items-center justify-center bg-white border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129] text-[#E5484D] hover:bg-[#FAF9F5] hover:border-[#E5484D] hover:shadow-[2px_2px_0px_#E5484D] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] transition-all"
                  >
                    <PixelTrashIcon size={14} />
                  </button>
                </div>
              </div>

              <div className="pt-3.5 flex items-center justify-between text-xs text-[#5B6170] font-mono flex-wrap gap-2">
                <span>
                  OFFERS: <strong>{displayedInternships.length}</strong> AVAILABLE •{" "}
                  <span className="text-[#3F86F7] font-bold">
                    {selectedInternshipIds.length} selected
                  </span>
                </span>
                <span className="hidden sm:inline">
                  SELECT OFFERS TO ASSEMBLE YOUR APPLICATION DOSSIER
                </span>
              </div>
            </div>
          )}

          {/* Internships List */}
          <div className="flex flex-col gap-6">
            {displayedInternships.length === 0 ? (
              <div className="border-2 border-[#1E2129] bg-white p-10 text-center shadow-[6px_6px_0px_#1E2129] space-y-4">
                <p className="font-sans text-base font-bold text-[#1E2129]">
                  No internship offers available for {selectedCompany?.name}.
                </p>
                <p className="font-sans text-xs text-[#5B6170] max-w-md mx-auto">
                  Get started by adding a graduation internship offer for this company.
                </p>
                <div className="flex items-center justify-center pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setInternshipModalState({
                        isOpen: true,
                        internshipToEdit: null,
                      })
                    }
                    className="font-mono text-xs font-bold uppercase px-4 py-2 border-2 border-[#1E2129] bg-[#1E2129] text-[#F2F0EA] shadow-[3px_3px_0px_#3F86F7] hover:bg-black transition-all cursor-pointer"
                  >
                    + Create an internship offer
                  </button>
                </div>
              </div>
            ) : (
              displayedInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  company={selectedCompany}
                  isSelected={selectedInternshipIds.includes(internship.id)}
                  onToggleSelect={() => toggleSelectInternship(internship.id)}
                  onEdit={() =>
                    setInternshipModalState({
                      isOpen: true,
                      internshipToEdit: internship,
                    })
                  }
                  onDelete={() => handleDeleteInternship(internship.id)}
                />
              ))
            )}

            {/* Prominent Add Button at the end of the internship feed */}
            {displayedInternships.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setInternshipModalState({
                    isOpen: true,
                    internshipToEdit: null,
                  })
                }
                className="w-full border-2 border-dashed border-[#1E2129] bg-white p-6 sm:p-7 text-center hover:bg-[#FAF9F5] hover:border-solid hover:shadow-[6px_6px_0px_#3F86F7] transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-9 h-9 border-2 border-[#1E2129] bg-[#C8F560] text-[#1E2129] flex items-center justify-center font-bold text-base shadow-[2px_2px_0px_#1E2129] group-hover:scale-105 transition-transform">
                  +
                </div>
                <div>
                  <p className="font-sans font-extrabold text-sm sm:text-base text-[#1E2129]">
                    Add a new internship offer
                  </p>
                  <p className="font-mono text-xs text-[#5B6170] mt-0.5">
                    Create a new graduation internship position for {selectedCompany?.name}
                  </p>
                </div>
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Floating Bottom Action Bar */}
      {selectedInternshipIds.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 lg:left-88 max-w-4xl mx-auto z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="border-2 border-[#1E2129] bg-white shadow-[8px_8px_0px_#3F86F7] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C8F560] border-2 border-[#1E2129] flex items-center justify-center font-mono font-bold text-sm text-[#1E2129] shadow-[1px_1px_0px_#1E2129]">
                {selectedInternshipIds.length}
              </div>
              <div>
                <p className="font-sans text-xs sm:text-sm font-extrabold text-[#1E2129]">
                  {selectedInternshipIds.length} internship offer(s) selected
                </p>
                <p className="font-sans text-[11px] text-[#5B6170] hidden sm:block">
                  Ready to tailor your resume, cover letter, and recruiter email.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setSelectedInternshipIds([])}
                className="font-mono text-xs font-bold px-3 py-2 border-2 border-[#1E2129] bg-white text-[#5B6170] hover:text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm uppercase tracking-tight px-5 py-2.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[4px_4px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <span>Make CV</span>
                <PixelArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Drawer */}
      <ApplicationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedInternships={selectedInternshipsData}
        onSendApplication={handleSendApplication}
      />

      {/* Undo Send Toast */}
      {undoToastInfo && (
        <UndoSendToast
          info={undoToastInfo}
          durationSec={5}
          onUndo={handleUndoSend}
          onDismiss={() => setUndoToastInfo(null)}
        />
      )}

      {/* Company Modal (Add new or alter existing enterprise) */}
      <CompanyModal
        isOpen={companyModalState.isOpen}
        onClose={() => setCompanyModalState({ isOpen: false, companyToEdit: null })}
        onSaveCompany={handleSaveCompany}
        onDeleteCompany={handleDeleteCompany}
        initialCompany={companyModalState.companyToEdit}
      />

      {/* Internship Modal (Add new or alter existing internship) */}
      <InternshipModal
        isOpen={internshipModalState.isOpen}
        onClose={() =>
          setInternshipModalState({ isOpen: false, internshipToEdit: null })
        }
        onSave={handleSaveInternship}
        initialInternship={internshipModalState.internshipToEdit}
        companyName={selectedCompany?.name || "Company"}
        defaultLocation={selectedCompany?.location || "Remote"}
      />
    </div>
  );
}
