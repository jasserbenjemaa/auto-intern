"use client";

import React, { useState } from "react";
import { Internship, Company } from "@/data/mockInternships";
import { PixelCheckIcon, PixelArrowRightIcon } from "@/components/icons/PixelIcons";
import { PixelCatMascot } from "@/components/icons/PixelCatMascot";

interface TailoredCVModalProps {
  selectedInternships: { internship: Internship; company: Company }[];
  isOpen: boolean;
  onClose: () => void;
}

export function TailoredCVModal({
  selectedInternships,
  isOpen,
  onClose,
}: TailoredCVModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || selectedInternships.length === 0) return null;

  // Extract unique technologies across all selected internships
  const allTechs = Array.from(
    new Set(
      selectedInternships.flatMap((item) => item.internship.technologies)
    )
  );

  // Extract unique departments & topics
  const targetTopics = Array.from(
    new Set(
      selectedInternships.map(
        (item) => item.internship.department || "Software Engineering"
      )
    )
  );

  const targetCompanies = Array.from(
    new Set(selectedInternships.map((item) => item.company.name))
  );

  // Generate plain text CV for copy/download
  const cvText = `# ALEXANDRE DUPONT
Étudiant Ingénieur en Informatique — Recherche de Stage PFE (6 Mois)
Email: alexandre.dupont@insa.fr | Tel: +33 6 12 34 56 78 | GitHub: github.com/cadet-dev | LinkedIn: linkedin.com/in/alexandre-dupont

---

## PROFIL & OBJECTIF PFE
Étudiant en dernière année d'école d'ingénieur (Bac+5), passionné par l'architecture logicielle et les systèmes distribués.
Candidature orientée vers les opportunités PFE chez : ${targetCompanies.join(", ")}.
Objectif : Mettre en pratique mes compétences en ${allTechs.slice(0, 4).join(", ")} pour contribuer à des projets à fort impact technique.

---

## COMPÉTENCES TECHNIQUES CIBLÉES
- Technologies prioritaires : ${allTechs.join(" • ")}
- Méthodologies : Clean Code, CI/CD, Tests unitaires & intégration, Git, Architecture microservices
- Langues : Français (Natif), Anglais (C1 - Courant technique)

---

## PROJETS D'INGÉNIERIE & RÉALISATIONS ALIGNÉES
1. Pipeline Distribué d'Analyse Télémétrique (Projet Majeure Ingénieur)
   - Conçu un système d'ingestion de métriques haute vélocité avec Kafka et Go.
   - Implémentation d'un stockage time-series optimisé, réduction de la latence de 35%.
   - Technologies : ${allTechs.filter((t) => ["Go", "Kafka", "Docker", "Python"].includes(t)).join(", ") || "Go, Docker, PostgreSQL"}

2. Assistant IA & Recherche Sémantique (Projet R&D / Hackathon)
   - Entraînement et déploiement d'un pipeline de recherche vectorielle avec embeddings.
   - API de recommandation temps réel sous FastAPI et vector database.
   - Technologies : ${allTechs.filter((t) => ["Python", "PyTorch", "FastAPI", "React"].includes(t)).join(", ") || "Python, PyTorch, React"}

---

## FORMATION
- 2021 – 2026 : Diplôme d'Ingénieur en Informatique & Systèmes d'Information (Bac+5)
- Cours pertinents : Algorithmique avancée, Systèmes distribués, Machine Learning, Sécurité logicielle
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    const element = document.createElement("a");
    const file = new Blob([cvText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `CV_PFE_Tailored_${targetCompanies.join("_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => setDownloading(false), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2129]/70 backdrop-blur-sm overflow-y-auto">
      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-3xl my-8 border-2 border-[#1E2129] bg-white shadow-[10px_10px_0px_#3F86F7] flex flex-col">
        {/* macOS Title Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#1E2129] bg-[#E8E5DC] px-4 py-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#E5484D] border border-[#1E2129]" />
            <span className="w-3 h-3 bg-[#F5A623] border border-[#1E2129]" />
            <span className="w-3 h-3 bg-[#C8F560] border border-[#1E2129]" />
            <span className="font-mono text-xs font-bold uppercase text-[#1E2129] ml-2">
              ~/cv-generator — tailored for {selectedInternships.length} {selectedInternships.length > 1 ? "offers" : "offer"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]">
              ● AI TAILORED
            </span>
            <button
              onClick={onClose}
              className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-[#1E2129] text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Subheader / Target summary */}
        <div className="p-4 sm:p-5 border-b-2 border-[#1E2129]/15 bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PixelCatMascot size={20} />
              <h2 className="font-sans text-base font-extrabold text-[#1E2129]">
                CV Spécialement Adapté à Vos Sélections
              </h2>
            </div>
            <p className="font-sans text-xs text-[#5B6170]">
              Compétences et projets calibrés pour : <strong>{targetCompanies.join(", ")}</strong> ({targetTopics.join(", ")})
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-[#1E2129] bg-white text-[#1E2129] shadow-[2px_2px_0px_#1E2129] hover:bg-[#FAF9F5] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            >
              {copied ? "✓ Copié !" : "Copier Texte"}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-[#1E2129] bg-[#1E2129] text-[#F2F0EA] shadow-[3px_3px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            >
              {downloading ? "Téléchargement..." : "Télécharger (.TXT)"}
            </button>
          </div>
        </div>

        {/* Tailored CV Live Preview Sheet */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto font-sans text-[#1E2129] space-y-6">
          {/* Candidate Header */}
          <div className="border-b-2 border-[#1E2129] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-[#1E2129]">
                Alexandre Dupont
              </h3>
              <p className="text-sm font-semibold text-[#3F86F7]">
                Élève Ingénieur en Informatique — Recherche de Stage PFE (6 Mois)
              </p>
            </div>
            <div className="font-mono text-xs text-[#5B6170] text-right">
              <p>alexandre.dupont@insa.fr</p>
              <p>+33 6 12 34 56 78 • Paris / Mobile</p>
            </div>
          </div>

          {/* Section 1: Tailored Objective */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] bg-[#E8E5DC] px-2 py-0.5 inline-block border border-[#1E2129] mb-2">
              Profil & Objectif PFE
            </h4>
            <p className="text-xs sm:text-sm text-[#1E2129] leading-relaxed">
              Étudiant en 5ème année d&apos;ingénierie logicielle, je candidate spécifiquement aux offres de fin d&apos;études chez{" "}
              <strong>{targetCompanies.join(", ")}</strong>. Mon parcours académique et mes projets personnels m&apos;ont permis de développer une solide rigueur sur les environnements <strong>{allTechs.slice(0, 5).join(", ")}</strong>, avec une volonté marquée de m&apos;investir sur des systèmes critiques et scalables.
            </p>
          </div>

          {/* Section 2: Targeted Skills Matrix */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] bg-[#E8E5DC] px-2 py-0.5 inline-block border border-[#1E2129] mb-2.5">
              Compétences & Stack Extraites des Postes Ciblés
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {allTechs.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs font-bold px-2 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129] shadow-[1px_1px_0px_#1E2129]"
                >
                  ✓ {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Tailored Projects */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] bg-[#E8E5DC] px-2 py-0.5 inline-block border border-[#1E2129] mb-3">
              Projets Techniques Significatifs
            </h4>

            <div className="space-y-4">
              <div className="border border-[#1E2129] p-3.5 bg-[#FAF9F5]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h5 className="font-bold text-sm text-[#1E2129]">
                    Pipeline Distribué d&apos;Analyse Télémétrique & Métriques
                  </h5>
                  <span className="font-mono text-[11px] text-[#5B6170]">2025</span>
                </div>
                <p className="text-xs text-[#5B6170] leading-relaxed mb-2">
                  Implémentation d&apos;une architecture de traitement d&apos;événements scalables. Benchmarking de latence et réduction des goulots d&apos;étranglement mémoire sous forte charge concurrente.
                </p>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#3F86F7]">
                  <strong>Stack :</strong>
                  <span>{allTechs.slice(0, 4).join(" • ")}</span>
                </div>
              </div>

              <div className="border border-[#1E2129] p-3.5 bg-[#FAF9F5]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h5 className="font-bold text-sm text-[#1E2129]">
                    Moteur de Recherche Sémantique & Traitement Intelligent
                  </h5>
                  <span className="font-mono text-[11px] text-[#5B6170]">2024 – 2025</span>
                </div>
                <p className="text-xs text-[#5B6170] leading-relaxed mb-2">
                  Conception d&apos;un service d&apos;indexation vectorielle pour requêtes complexes avec ranking contextuel et interface de visualisation interactive.
                </p>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#3F86F7]">
                  <strong>Stack :</strong>
                  <span>{allTechs.slice(2, 6).join(" • ") || "Python • React • PostgreSQL"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Formation */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] bg-[#E8E5DC] px-2 py-0.5 inline-block border border-[#1E2129] mb-2">
              Formation
            </h4>
            <div className="text-xs text-[#1E2129]">
              <p className="font-bold">Diplôme d&apos;Ingénieur en Informatique (Bac+5)</p>
              <p className="text-[#5B6170]">École Nationale Supérieure d&apos;Ingénieurs — Promotion 2026</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t-2 border-[#1E2129] bg-[#E8E5DC] flex items-center justify-between gap-3 shrink-0">
          <span className="font-mono text-xs text-[#5B6170]">
            Prêt pour soumission aux recruteurs
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs font-bold px-4 py-2 border-2 border-[#1E2129] bg-white text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="font-sans font-bold text-xs uppercase px-4 py-2 border-2 border-[#1E2129] bg-[#1E2129] text-[#F2F0EA] shadow-[3px_3px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer"
            >
              Télécharger le CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
