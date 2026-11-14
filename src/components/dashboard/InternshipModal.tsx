"use client";

import React, { useState, useEffect } from "react";
import { Internship } from "@/data/mockInternships";

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (internship: Internship) => void;
  initialInternship?: Internship | null;
  companyName: string;
  defaultLocation?: string;
}

export function InternshipModal({
  isOpen,
  onClose,
  onSave,
  initialInternship,
  companyName,
  defaultLocation = "Remote",
}: InternshipModalProps) {
  const isEditing = Boolean(initialInternship);

  const [titre, setTitre] = useState("");
  const [department, setDepartment] = useState("");
  const [missionPrincipale, setMissionPrincipale] = useState("");
  const [description, setDescription] = useState("");
  const [technologiesInput, setTechnologiesInput] = useState("");
  const [duree, setDuree] = useState("6 months");
  const [nbStagiaires, setNbStagiaires] = useState(1);
  const [niveauEtude, setNiveauEtude] = useState<
    "Ingénieur" | "Master 2" | "Bac+5" | "Bac+4" | "Ingénieur / Bac+5"
  >("Ingénieur / Bac+5");
  const [localisation, setLocalisation] = useState(defaultLocation);
  const [isPaid, setIsPaid] = useState<boolean>(true);
  const [preEmbauche, setPreEmbauche] = useState<boolean>(true);

  useEffect(() => {
    if (initialInternship) {
      setTitre(initialInternship.titre || "");
      setDepartment(initialInternship.department || "");
      setMissionPrincipale(initialInternship.mission_principale || "");
      setDescription(initialInternship.description || "");
      setTechnologiesInput(initialInternship.technologies ? initialInternship.technologies.join(", ") : "");
      setDuree(initialInternship.duree || "6 months");
      setNbStagiaires(initialInternship.nb_stagiaires || 1);
      setNiveauEtude(initialInternship.niveau_etude || "Ingénieur / Bac+5");
      setLocalisation(initialInternship.localisation || defaultLocation);
      setIsPaid(initialInternship.is_paid === true);
      setPreEmbauche(initialInternship.pre_embauche === true);
    } else {
      setTitre("");
      setDepartment("");
      setMissionPrincipale("");
      setDescription("");
      setTechnologiesInput("Python, TypeScript, React");
      setDuree("6 months");
      setNbStagiaires(1);
      setNiveauEtude("Ingénieur / Bac+5");
      setLocalisation(defaultLocation);
      setIsPaid(true);
      setPreEmbauche(true);
    }
  }, [initialInternship, defaultLocation, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;

    const techs = technologiesInput
      .split(/[,;\n]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedInternship: Internship = {
      id: initialInternship ? initialInternship.id : `int-${Date.now()}`,
      titre: titre.trim(),
      department: department.trim() || undefined,
      mission_principale:
        missionPrincipale.trim() ||
        "Contribute to the core design, implementation, and architecture of high-impact systems.",
      description:
        description.trim() ||
        `Graduation internship at ${companyName}. You will collaborate closely with experienced engineers on production-critical challenges.`,
      technologies: techs.length > 0 ? techs : ["Python", "TypeScript"],
      duree: duree.trim() || "6 months",
      nb_stagiaires: Math.max(1, Number(nbStagiaires) || 1),
      niveau_etude: niveauEtude,
      localisation: localisation.trim() || defaultLocation,
      is_paid: isPaid,
      pre_embauche: preEmbauche,
      posted_date: initialInternship?.posted_date || "Today",
    };

    onSave(updatedInternship);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2129]/65 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col border-2 border-[#1E2129] bg-white shadow-[8px_8px_0px_#1E2129] z-10 animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#1E2129] bg-[#E8E5DC] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#E5484D] border border-[#1E2129]" />
            <span className="w-2.5 h-2.5 bg-[#F5A623] border border-[#1E2129]" />
            <span className="w-2.5 h-2.5 bg-[#C8F560] border border-[#1E2129]" />
            <span className="font-mono text-xs font-bold uppercase tracking-tight text-[#1E2129] ml-1">
              {isEditing ? `EDIT_INTERNSHIP.EXE – [${companyName}]` : `NEW_INTERNSHIP_OFFER.EXE – [${companyName}]`}
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Titre & Département */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Internship Role Title <span className="text-[#E5484D]">*</span>
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Ex: Software Engineer Intern - Distributed Systems"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full px-3 py-2 text-sm font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7] focus:shadow-[3px_3px_0px_#3F86F7] transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Department / Team
              </label>
              <input
                type="text"
                placeholder="Ex: Core Engineering..."
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7]"
              />
            </div>
          </div>

          {/* Primary Mission */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
              Primary Mission (1-2 sentence summary)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Design and optimize high-throughput telemetry pipelines to minimize memory allocation..."
              value={missionPrincipale}
              onChange={(e) => setMissionPrincipale(e.target.value)}
              className="w-full px-3 py-2 text-xs font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7] resize-none"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
              Full Description & Scope
            </label>
            <textarea
              rows={3}
              placeholder="Details regarding context, responsibilities, technical challenges, and mentoring..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7] resize-none"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
              Technologies & Tools (comma-separated)
            </label>
            <input
              type="text"
              placeholder="Go, Kafka, Kubernetes, gRPC, Prometheus"
              value={technologiesInput}
              onChange={(e) => setTechnologiesInput(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono border-2 border-[#1E2129] bg-white text-[#1E2129] placeholder:text-[#5B6170] shadow-[2px_2px_0px_#1E2129] focus:outline-none focus:border-[#3F86F7]"
            />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Duration
              </label>
              <input
                type="text"
                placeholder="6 months"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-bold border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[1px_1px_0px_#1E2129]"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Intern Count
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={nbStagiaires}
                onChange={(e) => setNbStagiaires(parseInt(e.target.value, 10) || 1)}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-bold border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[1px_1px_0px_#1E2129]"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Degree Level
              </label>
              <select
                value={niveauEtude}
                onChange={(e) => setNiveauEtude(e.target.value as any)}
                className="w-full px-2 py-1.5 text-[11px] font-mono font-bold uppercase border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[1px_1px_0px_#1E2129]"
              >
                <option value="Ingénieur / Bac+5">Engineering / Master&apos;s</option>
                <option value="Ingénieur">Engineer</option>
                <option value="Master 2">Master 2</option>
                <option value="Bac+5">Bac+5</option>
                <option value="Bac+4">Bac+4</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-[#5B6170] mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Paris, France"
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-sans border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[1px_1px_0px_#1E2129]"
              />
            </div>
          </div>

          {/* Checkboxes: Paid & Pre-employment */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="w-4 h-4 accent-[#1E2129] rounded-none border-2 border-[#1E2129] cursor-pointer"
              />
              <span className="font-mono text-xs font-bold uppercase text-[#1E2129]">
                Paid (Stipend included)
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={preEmbauche}
                onChange={(e) => setPreEmbauche(e.target.checked)}
                className="w-4 h-4 accent-[#1E2129] rounded-none border-2 border-[#1E2129] cursor-pointer"
              />
              <span className="font-mono text-xs font-bold uppercase text-[#1E2129]">
                Pre-employment conversion opportunity (Full-time)
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-5 border-t-2 border-[#1E2129]/15 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs font-bold px-4 py-2 border-2 border-[#1E2129] bg-white text-[#5B6170] hover:text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!titre.trim()}
              className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase px-5 py-2.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[3px_3px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isEditing ? "Save Changes" : "+ Add Internship Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
