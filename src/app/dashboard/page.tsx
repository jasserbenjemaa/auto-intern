"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_COMPANIES, Internship, Company } from "@/data/mockInternships";
import { CompanySidebar } from "@/components/dashboard/CompanySidebar";
import { InternshipCard } from "@/components/dashboard/InternshipCard";
import { ApplicationDrawer } from "@/components/dashboard/ApplicationDrawer";
import { UndoSendToast, SentApplicationInfo } from "@/components/dashboard/UndoSendToast";
import { PixelCatMascot } from "@/components/icons/PixelCatMascot";
import { PixelArrowRightIcon } from "@/components/icons/PixelIcons";

export default function DashboardPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    MOCK_COMPANIES[0].id
  );
  const [paidOnlyFilter, setPaidOnlyFilter] = useState(false);
  const [preEmbaucheOnlyFilter, setPreEmbaucheOnlyFilter] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Set of selected internship IDs
  const [selectedInternshipIds, setSelectedInternshipIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Undo Send Toast State (persists for 5s)
  const [undoToastInfo, setUndoToastInfo] = useState<SentApplicationInfo | null>(null);

  const selectedCompany =
    MOCK_COMPANIES.find((c) => c.id === selectedCompanyId) || MOCK_COMPANIES[0];

  const displayedInternships = selectedCompany.internships.filter((i) => {
    if (paidOnlyFilter && i.is_paid !== true) return false;
    if (preEmbaucheOnlyFilter && !i.pre_embauche) return false;
    return true;
  });

  const totalInternshipsCount = MOCK_COMPANIES.reduce(
    (acc, curr) => acc + curr.internships.length,
    0
  );

  // Toggle selection for an internship
  const toggleSelectInternship = (id: string) => {
    setSelectedInternshipIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Find all selected internship items with their company data
  const selectedInternshipsData: { internship: Internship; company: Company }[] = [];
  MOCK_COMPANIES.forEach((comp) => {
    comp.internships.forEach((intern) => {
      if (selectedInternshipIds.includes(intern.id)) {
        selectedInternshipsData.push({ internship: intern, company: comp });
      }
    });
  });

  // Handle send: closes window automatically and triggers 5s undo toast
  const handleSendApplication = (info: SentApplicationInfo) => {
    setUndoToastInfo(info);
    setIsDrawerOpen(false);
  };

  // Handle undo: cancels the send and reopens the drawer
  const handleUndoSend = () => {
    setUndoToastInfo(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen shipcat-grid flex font-sans selection:bg-[#3F86F7] selection:text-white pb-20">
      {/* 1. Left Fixed Full-Height Sidebar */}
      <CompanySidebar
        companies={MOCK_COMPANIES}
        selectedCompanyId={selectedCompanyId}
        onSelectCompany={(id) => setSelectedCompanyId(id)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 min-h-screen lg:pl-84 flex flex-col min-w-0">
        {/* Sticky Main Top Navigation Bar */}
        <header className="sticky top-0 z-30 h-16 border-b-2 border-[#1E2129] bg-[#F2F0EA]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-2.5 py-1.5 bg-white border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129] text-[#1E2129] cursor-pointer"
            >
              <PixelCatMascot size={18} />
              <span>COMPANIES ({MOCK_COMPANIES.length})</span>
            </button>

            {/* Breadcrumb / Workspace Title */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#5B6170]">
              <span className="font-bold text-[#1E2129] uppercase">Dashboard</span>
              <span>/</span>
              <span className="text-[#3F86F7] font-semibold">{selectedCompany.name}</span>
            </div>
          </div>

          {/* Metrics & Actions */}
          <div className="flex items-center gap-3">
            {/* Header Make CV Button when selections exist */}
            {selectedInternshipIds.length > 0 && (
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase px-3.5 py-1.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[3px_3px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <span>Make CV</span>
                <span className="font-mono text-[10px] bg-[#C8F560] text-[#1E2129] px-1.5 py-0.2 font-bold">
                  {selectedInternshipIds.length}
                </span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-3 font-mono text-xs text-[#5B6170]">
              <span>
                <strong className="text-[#1E2129]">{MOCK_COMPANIES.length}</strong> Entreprises
              </span>
              <span>•</span>
              <span>
                <strong className="text-[#3F86F7]">{totalInternshipsCount}</strong> Offres PFE
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1E2129] bg-white border-2 border-[#1E2129] px-3 py-1.5 shadow-[2px_2px_0px_#1E2129] hover:bg-[#FAF9F5] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              Déconnexion
            </Link>
          </div>
        </header>

        {/* Scrollable Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full flex flex-col gap-6">
          {/* Selected Company Profile Banner */}
          <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#1E2129]/15">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 border-2 border-[#1E2129] flex items-center justify-center font-bold text-base shadow-[3px_3px_0px_#1E2129] shrink-0"
                  style={{
                    backgroundColor: selectedCompany.logoBg,
                    color: "#FFFFFF",
                  }}
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
                  </p>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaidOnlyFilter(!paidOnlyFilter)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-tight border-2 border-[#1E2129] transition-all cursor-pointer ${
                    paidOnlyFilter
                      ? "bg-[#C8F560] text-[#1E2129] shadow-[2px_2px_0px_#1E2129]"
                      : "bg-white text-[#1E2129] hover:bg-[#FAF9F5]"
                  }`}
                >
                  {paidOnlyFilter ? "✓ RÉMUNÉRÉ" : "FILTRE: RÉMUNÉRÉ"}
                </button>

                <button
                  type="button"
                  onClick={() => setPreEmbaucheOnlyFilter(!preEmbaucheOnlyFilter)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-tight border-2 border-[#1E2129] transition-all cursor-pointer ${
                    preEmbaucheOnlyFilter
                      ? "bg-[#F5A623] text-[#1E2129] shadow-[2px_2px_0px_#1E2129]"
                      : "bg-white text-[#1E2129] hover:bg-[#FAF9F5]"
                  }`}
                >
                  {preEmbaucheOnlyFilter
                    ? "✓ PRÉ-EMBAUCHE"
                    : "FILTRE: PRÉ-EMBAUCHE"}
                </button>
              </div>
            </div>

            <div className="pt-3.5 flex items-center justify-between text-xs text-[#5B6170] font-mono">
              <span>
                OFFRES: <strong>{displayedInternships.length}</strong> DISPONIBLES •{" "}
                <span className="text-[#3F86F7] font-bold">
                  {selectedInternshipIds.length} sélectionnée(s)
                </span>
              </span>
              <span className="hidden sm:inline">
                SÉLECTIONNEZ POUR CRÉER VOTRE DOSSIER DE CANDIDATURE
              </span>
            </div>
          </div>

          {/* Internships List */}
          <div className="flex flex-col gap-6">
            {displayedInternships.length === 0 ? (
              <div className="border-2 border-[#1E2129] bg-white p-10 text-center shadow-[6px_6px_0px_#1E2129]">
                <p className="font-sans text-base font-bold text-[#1E2129] mb-1">
                  Aucune offre ne correspond aux critères sélectionnés.
                </p>
                <p className="font-sans text-xs text-[#5B6170] mb-5">
                  Réinitialisez les filtres pour voir l&apos;ensemble des stages de {selectedCompany.name}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPaidOnlyFilter(false);
                    setPreEmbaucheOnlyFilter(false);
                  }}
                  className="font-mono text-xs font-bold uppercase px-4 py-2 border-2 border-[#1E2129] bg-[#1E2129] text-[#F2F0EA] shadow-[3px_3px_0px_#3F86F7] hover:bg-black transition-all cursor-pointer"
                >
                  RÉINITIALISER LES FILTRES
                </button>
              </div>
            ) : (
              displayedInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  company={selectedCompany}
                  isSelected={selectedInternshipIds.includes(internship.id)}
                  onToggleSelect={() => toggleSelectInternship(internship.id)}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* 3. Floating Bottom Action Bar when Internships are selected */}
      {selectedInternshipIds.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 lg:left-88 max-w-4xl mx-auto z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="border-2 border-[#1E2129] bg-white shadow-[8px_8px_0px_#3F86F7] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C8F560] border-2 border-[#1E2129] flex items-center justify-center font-mono font-bold text-sm text-[#1E2129] shadow-[1px_1px_0px_#1E2129]">
                {selectedInternshipIds.length}
              </div>
              <div>
                <p className="font-sans text-xs sm:text-sm font-extrabold text-[#1E2129]">
                  {selectedInternshipIds.length} offre(s) de stage sélectionnée(s)
                </p>
                <p className="font-sans text-[11px] text-[#5B6170] hidden sm:block">
                  Prêt pour générer le CV, la lettre de motivation et l&apos;email aux recruteurs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setSelectedInternshipIds([])}
                className="font-mono text-xs font-bold px-3 py-2 border-2 border-[#1E2129] bg-white text-[#5B6170] hover:text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Vider
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

      {/* 4. Slide-over Right Window: CV, Cover Letter & Prepared Email */}
      <ApplicationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedInternships={selectedInternshipsData}
        onSendApplication={handleSendApplication}
      />

      {/* 5. 5-Second Undo Send Toast */}
      {undoToastInfo && (
        <UndoSendToast
          info={undoToastInfo}
          durationSec={5}
          onUndo={handleUndoSend}
          onDismiss={() => setUndoToastInfo(null)}
        />
      )}
    </div>
  );
}
