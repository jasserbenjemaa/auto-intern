"use client";

import React, { useState } from "react";
import { Internship, Company } from "@/data/mockInternships";
import { PixelCheckIcon, PixelArrowRightIcon, PixelMailIcon } from "@/components/icons/PixelIcons";
import { PixelCatMascot } from "@/components/icons/PixelCatMascot";
import { SentApplicationInfo } from "./UndoSendToast";

interface ApplicationDrawerProps {
  selectedInternships: { internship: Internship; company: Company }[];
  isOpen: boolean;
  onClose: () => void;
  onSendApplication?: (info: SentApplicationInfo) => void;
}

export function ApplicationDrawer({
  selectedInternships,
  isOpen,
  onClose,
  onSendApplication,
}: ApplicationDrawerProps) {
  // Navigation step in the drawer: "materials" (CV & Cover Letter) or "email" (Done -> Email Preview)
  const [currentStep, setCurrentStep] = useState<"materials" | "email">("materials");
  const [activeTab, setActiveTab] = useState<"cv" | "cover_letter">("cv");

  // User choice: what to send (CV, Cover Letter, or Both)
  const [sendCV, setSendCV] = useState(true);
  const [sendCoverLetter, setSendCoverLetter] = useState(true);

  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen || selectedInternships.length === 0) return null;

  // Extract company and role details
  const primaryItem = selectedInternships[0];
  const companyName = primaryItem.company.name;
  const roleTitle = primaryItem.internship.titre;
  const location = primaryItem.internship.localisation;
  const duration = primaryItem.internship.duree;

  // Extract unique technologies across all selected internships
  const allTechs = Array.from(
    new Set(selectedInternships.flatMap((item) => item.internship.technologies))
  );

  // Recruiter contact email mapping
  const companyEmail = `${companyName.toLowerCase().replace(/\s+/g, "")}-recrutement-pfe@${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
  const emailSubject = `Candidature Stage PFE (${duration}) — Alexandre Dupont — ${roleTitle}`;

  // Formatted Tailored Cover Letter
  const coverLetterText = `Alexandre Dupont
Élève-Ingénieur en Informatique — Promotion 2026
alexandre.dupont@insa.fr | +33 6 12 34 56 78
Paris, France

À l'attention de l'équipe Recrutement Technique & Tuteurs PFE
${companyName} — ${location}

Objet : ${emailSubject}

Madame, Monsieur,

Actuellement en dernière année d'école d'ingénieur en informatique (Bac+5), je prépare mon stage de fin d'études (PFE) d'une durée de ${duration}. Suivant avec grand intérêt les innovations de ${companyName}, je vous adresse ma candidature pour l'opportunité de stage : "${roleTitle}".

Mes projets académiques et personnels m'ont permis de développer une solide maîtrise des environnements ${allTechs.slice(0, 4).join(", ")}. Passionné par les défis de scalabilité et la conception de code maintenable, j'ai notamment conçu et déployé un pipeline distribué à haute vélocité en temps réel, optimisant la consommation mémoire et la latence sous forte charge.

La mission proposée — "${primaryItem.internship.mission_principale}" — s'inscrit en parfaite cohérence avec mes compétences techniques et mes aspirations professionnelles. Intégrer ${companyName} pour mon PFE représente l'opportunité idéale d'apporter ma rigueur d'ingénieur tout en apprenant au contact de vos équipes d'experts.

Je me tiens à votre entière disposition pour convenir d'un échange afin de vous détailler mes réalisations et ma motivation.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Alexandre Dupont`;

  // Formatted Cold Application Email Body
  const emailBody = `Bonjour à l'équipe recrutement de ${companyName},

Étudiant en dernière année d'école d'ingénieur (Bac+5), je vous contacte pour postuler au stage de fin d'études :
"${roleTitle}" (${duration}, ${location}).

Fort de mes réalisations sur la stack ${allTechs.slice(0, 5).join(", ")}, j'ai particulièrement apprécié l'orientation technique de votre équipe autour de :
"${primaryItem.internship.mission_principale}"

${
  sendCV && sendCoverLetter
    ? "Vous trouverez ci-joint mon CV ainsi que ma Lettre de Motivation spécialement préparés pour ce rôle."
    : sendCV
    ? "Vous trouverez ci-joint mon CV actualisé et calibré pour cette mission."
    : "Vous trouverez ci-joint ma Lettre de Motivation détaillée."
}

Seriez-vous disponible cette semaine pour un court échange téléphonique (15 min) afin de discuter de cette opportunité ?

Bien cordialement,
Alexandre Dupont
Élève-Ingénieur en Informatique
+33 6 12 34 56 78 | alexandre.dupont@insa.fr
Portfolio / GitHub : github.com/alexandre-dupont`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(
      `À : ${companyEmail}\nObjet : ${emailSubject}\n\n${emailBody}`
    );
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // When send is clicked: trigger callback and close drawer automatically!
  const handleDispatchEmail = () => {
    if (onSendApplication) {
      onSendApplication({
        companyName,
        companyEmail,
        roleTitle,
        attachments: [
          ...(sendCV ? ["CV"] : []),
          ...(sendCoverLetter ? ["Lettre de Motivation"] : []),
        ],
      });
    }
    // Close the window automatically as requested
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#1E2129]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Window from the Right */}
      <aside className="fixed top-0 right-0 bottom-0 z-50 h-screen w-full sm:w-[560px] md:w-[640px] lg:w-[700px] bg-white border-l-2 border-[#1E2129] shadow-[-10px_0px_0px_#1E2129] flex flex-col animate-in slide-in-from-right duration-250 ease-out font-sans">
        {/* macOS Title Bar Header */}
        <div className="p-3.5 border-b-2 border-[#1E2129] bg-[#E8E5DC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#E5484D] border border-[#1E2129]" />
            <span className="w-3 h-3 bg-[#F5A623] border border-[#1E2129]" />
            <span className="w-3 h-3 bg-[#C8F560] border border-[#1E2129]" />
            <span className="font-mono text-xs font-bold uppercase text-[#1E2129] ml-2">
              ~/cadet-pipeline — {currentStep === "materials" ? "documents" : "email-dispatch"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]">
              {selectedInternships.length} PFE CIBLÉ(S)
            </span>
            <button
              onClick={onClose}
              className="font-mono text-xs font-bold px-2.5 py-0.5 bg-white border border-[#1E2129] text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* STEP 1: CV & COVER LETTER VIEW */}
        {currentStep === "materials" ? (
          <>
            {/* Subheader & Selection Controls */}
            <div className="p-4 sm:p-5 border-b-2 border-[#1E2129]/15 bg-[#FAF9F5] shrink-0 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <PixelCatMascot size={22} />
                  <div>
                    <h2 className="font-sans text-base font-extrabold text-[#1E2129] leading-tight">
                      Dossier de Candidature Sur Mesure
                    </h2>
                    <p className="font-sans text-xs text-[#5B6170]">
                      Généré pour : <strong>{companyName}</strong> ({roleTitle})
                    </p>
                  </div>
                </div>

                {/* Tabs to view CV vs Cover Letter */}
                <div className="flex items-center border-2 border-[#1E2129] p-0.5 bg-white shadow-[2px_2px_0px_#1E2129]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("cv")}
                    className={`px-3 py-1 text-xs font-sans font-bold transition-all cursor-pointer ${
                      activeTab === "cv"
                        ? "bg-[#1E2129] text-[#F2F0EA]"
                        : "text-[#5B6170] hover:text-[#1E2129]"
                    }`}
                  >
                    CV
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("cover_letter")}
                    className={`px-3 py-1 text-xs font-sans font-bold transition-all cursor-pointer ${
                      activeTab === "cover_letter"
                        ? "bg-[#1E2129] text-[#F2F0EA]"
                        : "text-[#5B6170] hover:text-[#1E2129]"
                    }`}
                  >
                    Lettre de Motivation
                  </button>
                </div>
              </div>

              {/* What to Send Selector: Choose CV, Cover letter, or both */}
              <div className="p-3 border-2 border-[#1E2129] bg-white shadow-[2px_2px_0px_#1E2129] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-tight text-[#1E2129]">
                  Documents à envoyer :
                </span>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#1E2129] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendCV}
                      onChange={(e) => setSendCV(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 border-2 border-[#1E2129] bg-white shadow-[1px_1px_0px_#1E2129] peer-checked:bg-[#3F86F7] peer-checked:text-white flex items-center justify-center transition-all">
                      {sendCV && <PixelCheckIcon size={12} className="text-white" />}
                    </div>
                    <span>CV</span>
                  </label>

                  <label className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#1E2129] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendCoverLetter}
                      onChange={(e) => setSendCoverLetter(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 border-2 border-[#1E2129] bg-white shadow-[1px_1px_0px_#1E2129] peer-checked:bg-[#3F86F7] peer-checked:text-white flex items-center justify-center transition-all">
                      {sendCoverLetter && <PixelCheckIcon size={12} className="text-white" />}
                    </div>
                    <span>Cover Letter</span>
                  </label>

                  <span className="text-[11px] font-mono text-[#5B6170]">
                    ({sendCV && sendCoverLetter ? "Les 2 sélectionnés" : sendCV ? "CV uniquement" : sendCoverLetter ? "Lettre uniquement" : "Aucun"})
                  </span>
                </div>
              </div>
            </div>

            {/* Document Preview Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-[#1E2129]">
              {activeTab === "cv" ? (
                /* CV Sheet */
                <div className="border-2 border-[#1E2129] bg-[#FAF9F5] p-5 sm:p-6 shadow-[4px_4px_0px_#1E2129] space-y-5">
                  <div className="border-b-2 border-[#1E2129] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">Alexandre Dupont</h3>
                      <p className="text-xs font-bold text-[#3F86F7]">
                        Élève-Ingénieur en Informatique — Recherche PFE ({duration})
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 bg-[#E8E5DC] border border-[#1E2129]">
                      PARIS / REMOTE
                    </span>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] bg-[#E8E5DC] px-2 py-0.5 inline-block border border-[#1E2129] mb-1.5">
                      Objectif PFE
                    </h4>
                    <p className="text-xs text-[#1E2129] leading-relaxed">
                      Candidature ciblée chez <strong>{companyName}</strong> sur le sujet &quot;{roleTitle}&quot;.
                      Volonté d&apos;apporter mon expertise en {allTechs.slice(0, 4).join(", ")} pour relever les défis de votre équipe.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] bg-[#E8E5DC] px-2 py-0.5 inline-block border border-[#1E2129] mb-2">
                      Stack Technique Spécifique
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {allTechs.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs font-bold px-2 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]"
                        >
                          ✓ {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] bg-[#E8E5DC] px-2 py-0.5 inline-block border border-[#1E2129] mb-2">
                      Projet Alignant la Mission
                    </h4>
                    <div className="border border-[#1E2129] p-3 bg-white">
                      <p className="font-bold text-xs mb-1">Système Distribué & Traitement Concurant</p>
                      <p className="text-xs text-[#5B6170] leading-relaxed">
                        Conception et benchmarking d&apos;un module haute performance. Optimisation des temps de réponse et résilience réseau.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Cover Letter Sheet */
                <div className="border-2 border-[#1E2129] bg-[#FAF9F5] p-5 sm:p-6 shadow-[4px_4px_0px_#1E2129]">
                  <div className="border-b-2 border-[#1E2129] pb-3 mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase text-[#3F86F7]">
                      Lettre de Motivation Personnalisée
                    </span>
                    <span className="font-mono text-[11px] text-[#5B6170]">
                      {companyName}
                    </span>
                  </div>
                  <pre className="font-sans text-xs text-[#1E2129] leading-relaxed whitespace-pre-wrap font-normal">
                    {coverLetterText}
                  </pre>
                </div>
              )}
            </div>

            {/* Step 1 Footer: Done Button */}
            <div className="p-4 border-t-2 border-[#1E2129] bg-[#E8E5DC] shrink-0 flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-[#5B6170]">
                {sendCV || sendCoverLetter
                  ? "Prêt pour la génération de l'email"
                  : "Veuillez cocher au moins un document"}
              </span>

              <button
                type="button"
                disabled={!sendCV && !sendCoverLetter}
                onClick={() => setCurrentStep("email")}
                className="inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm uppercase tracking-tight px-6 py-2.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[4px_4px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <span>Done (Voir l&apos;Email de Candidature)</span>
                <PixelArrowRightIcon size={14} />
              </button>
            </div>
          </>
        ) : (
          /* STEP 2: EMAIL PREVIEW & DISPATCH SCREEN (SHOWN WHEN DONE IS CLICKED) */
          <>
            {/* Header info */}
            <div className="p-4 sm:p-5 border-b-2 border-[#1E2129]/15 bg-[#FAF9F5] shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#10B981] inline-block" />
                  <h2 className="font-sans text-base font-extrabold text-[#1E2129]">
                    Email de Candidature Prêt à l&apos;Envoi
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep("materials")}
                  className="font-mono text-xs font-bold text-[#3F86F7] hover:underline cursor-pointer"
                >
                  &larr; Modifier les documents
                </button>
              </div>
              <p className="font-sans text-xs text-[#5B6170]">
                Généré automatiquement par l&apos;agent Auto-Intern avec les pièces jointes choisies.
              </p>
            </div>

            {/* Email Inspection Terminal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
              <div className="border-2 border-[#1E2129] bg-white shadow-[4px_4px_0px_#1E2129] divide-y-2 divide-[#1E2129]/15">
                {/* Field: To / Recruiter Email */}
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#5B6170] uppercase w-28 shrink-0">
                    Destinataire :
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-mono text-xs font-bold text-[#1E2129] bg-[#FAF9F5] px-2.5 py-1 border border-[#1E2129] break-all">
                      {companyEmail}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129] shrink-0">
                      VÉRIFIÉ
                    </span>
                  </div>
                </div>

                {/* Field: Subject */}
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#5B6170] uppercase w-28 shrink-0">
                    Objet :
                  </span>
                  <span className="font-sans text-xs font-extrabold text-[#1E2129] bg-[#FAF9F5] px-2.5 py-1 border border-[#1E2129] flex-1">
                    {emailSubject}
                  </span>
                </div>

                {/* Field: Attachments */}
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#5B6170] uppercase w-28 shrink-0">
                    Pièces Jointes :
                  </span>
                  <div className="flex flex-wrap items-center gap-2 flex-1">
                    {sendCV && (
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129]">
                        📎 CV_Alexandre_Dupont.pdf
                      </span>
                    )}
                    {sendCoverLetter && (
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129]">
                        📎 Lettre_Motivation_${companyName}.pdf
                      </span>
                    )}
                  </div>
                </div>

                {/* Field: Email Body Content */}
                <div className="p-4 space-y-2 bg-[#FAF9F5]">
                  <span className="font-mono text-xs font-bold text-[#5B6170] uppercase block">
                    Contenu du Message :
                  </span>
                  <pre className="font-sans text-xs sm:text-sm text-[#1E2129] leading-relaxed whitespace-pre-wrap font-normal bg-white p-4 border border-[#1E2129] shadow-inner">
                    {emailBody}
                  </pre>
                </div>
              </div>
            </div>

            {/* Step 2 Footer: Action Buttons */}
            <div className="p-4 border-t-2 border-[#1E2129] bg-[#E8E5DC] shrink-0 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="font-mono text-xs font-bold px-3.5 py-2 border-2 border-[#1E2129] bg-white text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
              >
                {copiedEmail ? "✓ Email Copié !" : "Copier le Texte de l'Email"}
              </button>

              <button
                type="button"
                onClick={handleDispatchEmail}
                className="inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm uppercase tracking-tight px-6 py-2.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[4px_4px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <PixelMailIcon size={16} />
                <span>Envoyer la Candidature</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
