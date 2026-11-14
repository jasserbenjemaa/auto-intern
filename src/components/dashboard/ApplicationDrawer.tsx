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
  const [currentStep, setCurrentStep] = useState<"materials" | "email">("materials");
  const [activeTab, setActiveTab] = useState<"cv" | "cover_letter">("cv");

  const [sendCV, setSendCV] = useState(true);
  const [sendCoverLetter, setSendCoverLetter] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen || selectedInternships.length === 0) return null;

  const primaryItem = selectedInternships[0];
  const companyName = primaryItem.company.name;
  const roleTitle = primaryItem.internship.titre;
  const location = primaryItem.internship.localisation;
  const duration = primaryItem.internship.duree;

  const allTechs = Array.from(
    new Set(selectedInternships.flatMap((item) => item.internship.technologies))
  );

  const companyEmail = `${companyName.toLowerCase().replace(/\s+/g, "")}-careers@${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
  const emailSubject = `Graduation Internship Application (${duration}) — Alex Dupont — ${roleTitle}`;

  const coverLetterText = `Alex Dupont
Software Engineering Student — Class of 2026
alex.dupont@university.edu | +1 (555) 019-2834
San Francisco, CA / Paris, France

To the attention of the Engineering Hiring Team & Internship Mentors
${companyName} — ${location}

Subject: ${emailSubject}

Dear Hiring Team,

Currently completing my final year of engineering studies in Computer Science, I am seeking a graduation internship (PFE) for a duration of ${duration}. Following ${companyName}'s impactful engineering work with great enthusiasm, I am excited to submit my application for the role: "${roleTitle}".

Through academic and production projects, I have developed strong proficiency in ${allTechs.slice(0, 4).join(", ")}. Passionate about scalability, low-latency architectures, and clean code, I recently built and benchmarked a distributed real-time pipeline that optimized memory footprint and processing latency under heavy loads.

The team's mission — "${primaryItem.internship.mission_principale}" — directly aligns with my technical background and professional goals. Joining ${companyName} represents an ideal environment to contribute rigorous engineering work while learning from your world-class team.

I would welcome the opportunity to discuss my background and how I can deliver value to your team during this internship.

Thank you for your time and consideration.

Sincerely,
Alex Dupont`;

  const emailBody = `Hi ${companyName} Recruiting Team,

I am a final-year Computer Science engineering student reaching out to apply for the graduation internship position:
"${roleTitle}" (${duration}, ${location}).

With hands-on experience building distributed systems in ${allTechs.slice(0, 5).join(", ")}, I was particularly drawn to your team's technical focus on:
"${primaryItem.internship.mission_principale}"

${
  sendCV && sendCoverLetter
    ? "Attached please find my tailored Resume and Cover Letter for this role."
    : sendCV
    ? "Attached please find my tailored Resume for this role."
    : "Attached please find my Cover Letter detailing my background and motivation."
}

Would you be open to a brief 15-minute introductory call this week to explore how my background fits your team?

Best regards,
Alex Dupont
CS Engineering Student
+1 (555) 019-2834 | alex.dupont@university.edu
Portfolio / GitHub: github.com/alex-dupont`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(
      `To: ${companyEmail}\nSubject: ${emailSubject}\n\n${emailBody}`
    );
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDispatchEmail = () => {
    if (onSendApplication) {
      onSendApplication({
        companyName,
        companyEmail,
        roleTitle,
        attachments: [
          ...(sendCV ? ["Resume"] : []),
          ...(sendCoverLetter ? ["Cover Letter"] : []),
        ],
      });
    }
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
              {selectedInternships.length} TARGETED POSITION(S)
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
                      Tailored Application Package
                    </h2>
                    <p className="font-sans text-xs text-[#5B6170]">
                      Generated for: <strong>{companyName}</strong> ({roleTitle})
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
                    Resume
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
                    Cover Letter
                  </button>
                </div>
              </div>

              {/* Checkboxes: Choose What To Send */}
              <div className="p-3 border-2 border-[#1E2129] bg-white shadow-[3px_3px_0px_#1E2129]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5B6170] block mb-2">
                  Choose what to attach in application:
                </span>

                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendCV}
                      onChange={(e) => setSendCV(e.target.checked)}
                      className="w-4 h-4 accent-[#1E2129] rounded-none border-2 border-[#1E2129] cursor-pointer"
                    />
                    <span className="font-sans text-xs font-bold text-[#1E2129]">
                      Attach Tailored Resume (CV)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendCoverLetter}
                      onChange={(e) => setSendCoverLetter(e.target.checked)}
                      className="w-4 h-4 accent-[#1E2129] rounded-none border-2 border-[#1E2129] cursor-pointer"
                    />
                    <span className="font-sans text-xs font-bold text-[#1E2129]">
                      Attach Cover Letter
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Scrollable Document Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F2F0EA]">
              {activeTab === "cv" ? (
                /* Resume Document Preview */
                <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-6 space-y-6">
                  {/* CV Header */}
                  <div className="border-b-2 border-[#1E2129] pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h1 className="font-sans text-2xl font-black text-[#1E2129] tracking-tight">
                          ALEX DUPONT
                        </h1>
                        <p className="font-mono text-xs font-bold text-[#3F86F7] uppercase mt-0.5">
                          Software Engineer Intern — Core & Distributed Systems
                        </p>
                      </div>
                      <div className="text-right font-mono text-[11px] text-[#5B6170]">
                        <p>alex.dupont@university.edu</p>
                        <p>+1 (555) 019-2834</p>
                        <p>github.com/alex-dupont</p>
                      </div>
                    </div>
                  </div>

                  {/* Tailored Profile Summary */}
                  <div>
                    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#1E2129]" />
                      Executive Summary
                    </h2>
                    <p className="font-sans text-xs text-[#5B6170] leading-relaxed">
                      Final-year Computer Science engineering student targeting graduation internship at{" "}
                      <strong>{companyName}</strong>. Specialized in high-performance backends, distributed data pipelines, and scalable cloud architectures. Passionate about solving real-world latency challenges.
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#3F86F7]" />
                      Key Skills Aligned with {companyName}
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {allTechs.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs font-bold px-2 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience & Projects */}
                  <div>
                    <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E2129] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#10B981]" />
                      Relevant Engineering Projects
                    </h2>
                    <div className="space-y-3 font-sans text-xs">
                      <div className="border border-[#1E2129]/20 p-3 bg-[#FAF9F5]">
                        <div className="flex justify-between font-bold text-[#1E2129] mb-1">
                          <span>High-Throughput Streaming Engine</span>
                          <span className="font-mono text-[10px] text-[#5B6170]">2025</span>
                        </div>
                        <p className="text-[#5B6170] leading-snug">
                          Built a streaming pipeline processing 100K+ events/sec with zero-copy deserialization. Deployed with automated health metrics and horizontal auto-scaling.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Cover Letter Document Preview */
                <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-6">
                  <div className="font-mono text-xs text-[#1E2129] leading-relaxed whitespace-pre-wrap">
                    {coverLetterText}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="p-4 border-t-2 border-[#1E2129] bg-white shrink-0 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs font-bold px-4 py-2 border-2 border-[#1E2129] bg-white text-[#5B6170] hover:text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                disabled={!sendCV && !sendCoverLetter}
                onClick={() => setCurrentStep("email")}
                className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase px-5 py-2.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[3px_3px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#3F86F7] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <span>Done: Review Email</span>
                <PixelArrowRightIcon size={14} />
              </button>
            </div>
          </>
        ) : (
          /* STEP 2: PREPARED EMAIL PREVIEW */
          <>
            <div className="p-4 sm:p-5 border-b-2 border-[#1E2129]/15 bg-[#FAF9F5] shrink-0">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#C8F560] border-2 border-[#1E2129] flex items-center justify-center font-bold shadow-[2px_2px_0px_#1E2129]">
                    <PixelMailIcon size={16} />
                  </div>
                  <div>
                    <h2 className="font-sans text-base font-extrabold text-[#1E2129] leading-tight">
                      Recruiter Email Preview
                    </h2>
                    <p className="font-sans text-xs text-[#5B6170]">
                      Ready for dispatch to <strong>{companyName}</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep("materials")}
                  className="font-mono text-xs font-bold text-[#3F86F7] hover:underline cursor-pointer"
                >
                  ← Edit attachments
                </button>
              </div>

              {/* Email Meta Bar */}
              <div className="border-2 border-[#1E2129] bg-white divide-y-2 divide-[#1E2129]/15 font-mono text-xs">
                <div className="px-3 py-2 flex items-center gap-2">
                  <span className="font-bold text-[#5B6170] w-14 shrink-0 uppercase">TO:</span>
                  <span className="font-bold text-[#1E2129] select-all truncate">{companyEmail}</span>
                </div>
                <div className="px-3 py-2 flex items-center gap-2">
                  <span className="font-bold text-[#5B6170] w-14 shrink-0 uppercase">SUBJECT:</span>
                  <span className="font-bold text-[#1E2129] select-all truncate">{emailSubject}</span>
                </div>
                <div className="px-3 py-2 flex items-center gap-2 bg-[#FAF9F5]">
                  <span className="font-bold text-[#5B6170] w-14 shrink-0 uppercase">ATTACH:</span>
                  <div className="flex gap-2">
                    {sendCV && (
                      <span className="px-1.5 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129] font-bold text-[10px]">
                        ✓ Resume_Alex_Dupont.pdf
                      </span>
                    )}
                    {sendCoverLetter && (
                      <span className="px-1.5 py-0.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129] font-bold text-[10px]">
                        ✓ Cover_Letter_{companyName}.pdf
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Body Preview */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F2F0EA]">
              <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#1E2129]/15">
                  <span className="font-mono text-[11px] font-bold uppercase text-[#5B6170]">
                    Message Body
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="font-mono text-xs font-bold text-[#3F86F7] hover:underline cursor-pointer"
                  >
                    {copiedEmail ? "✓ Copied to clipboard!" : "Copy text"}
                  </button>
                </div>

                <div className="font-sans text-xs sm:text-sm text-[#1E2129] leading-relaxed whitespace-pre-wrap">
                  {emailBody}
                </div>
              </div>
            </div>

            {/* Final Dispatch Button */}
            <div className="p-4 border-t-2 border-[#1E2129] bg-white shrink-0 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep("materials")}
                className="font-mono text-xs font-bold px-4 py-2 border-2 border-[#1E2129] bg-white text-[#5B6170] hover:text-[#1E2129] hover:bg-[#FAF9F5] cursor-pointer"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleDispatchEmail}
                className="inline-flex items-center gap-2 font-sans font-extrabold text-xs sm:text-sm uppercase tracking-tight px-6 py-3 bg-[#10B981] text-[#1E2129] border-2 border-[#1E2129] shadow-[4px_4px_0px_#1E2129] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#1E2129] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <PixelMailIcon size={16} />
                <span>Send Application Now</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
