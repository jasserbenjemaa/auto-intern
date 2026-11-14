"use client";

import React, { useState } from "react";

type ApplicationStatus = "SENT" | "OPENED" | "REPLIED" | "REJECTED";

interface SentApp {
  id: string;
  company: string;
  companyInitial: string;
  logoBg: string;
  role: string;
  dateSent: string;
  status: ApplicationStatus;
  attachments: string[];
  email: string;
}

const MOCK_SENT: SentApp[] = [
  {
    id: "1",
    company: "Datadog",
    companyInitial: "DD",
    logoBg: "#6929C4",
    role: "Graduation Internship – Real-time Metrics Pipeline",
    dateSent: "Nov 12, 2026",
    status: "OPENED",
    attachments: ["Resume", "Cover Letter"],
    email: "careers@datadoghq.com",
  },
  {
    id: "2",
    company: "Doctolib",
    companyInitial: "DL",
    logoBg: "#0F62FE",
    role: "Graduation Internship – Machine Learning Healthcare",
    dateSent: "Nov 10, 2026",
    status: "REPLIED",
    attachments: ["Resume"],
    email: "internships@doctolib.fr",
  },
  {
    id: "3",
    company: "InstaDeep",
    companyInitial: "ID",
    logoBg: "#198038",
    role: "Graduation Internship – RL & Industrial Optimization",
    dateSent: "Nov 8, 2026",
    status: "SENT",
    attachments: ["Resume", "Cover Letter"],
    email: "jobs@instadeep.com",
  },
  {
    id: "4",
    company: "Alan",
    companyInitial: "AL",
    logoBg: "#9F1853",
    role: "Graduation Internship – Cloud Infrastructure & Backend",
    dateSent: "Nov 5, 2026",
    status: "REJECTED",
    attachments: ["Resume"],
    email: "tech-hiring@alan.eu",
  },
  {
    id: "5",
    company: "Qonto",
    companyInitial: "QT",
    logoBg: "#005D5D",
    role: "Graduation Internship – Fintech Core Banking",
    dateSent: "Nov 3, 2026",
    status: "SENT",
    attachments: ["Resume", "Cover Letter"],
    email: "careers@qonto.com",
  },
];

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  SENT: "bg-[#3F86F7] text-white",
  OPENED: "bg-[#F5A623] text-[#1E2129]",
  REPLIED: "bg-[#C8F560] text-[#1E2129]",
  REJECTED: "bg-[#E5484D] text-white",
};

const STATUS_DOT: Record<ApplicationStatus, string> = {
  SENT: "bg-[#3F86F7]",
  OPENED: "bg-[#F5A623]",
  REPLIED: "bg-[#10B981]",
  REJECTED: "bg-[#E5484D]",
};

export default function EmailsPage() {
  const [filter, setFilter] = useState<ApplicationStatus | "ALL">("ALL");

  const displayed =
    filter === "ALL" ? MOCK_SENT : MOCK_SENT.filter((a) => a.status === filter);

  const counts = {
    ALL: MOCK_SENT.length,
    SENT: MOCK_SENT.filter((a) => a.status === "SENT").length,
    OPENED: MOCK_SENT.filter((a) => a.status === "OPENED").length,
    REPLIED: MOCK_SENT.filter((a) => a.status === "REPLIED").length,
    REJECTED: MOCK_SENT.filter((a) => a.status === "REJECTED").length,
  };

  return (
    <div className="flex-1 flex flex-col pb-20">
      <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto flex flex-col gap-6">
        {/* Page Title */}
        <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-sans text-2xl font-extrabold tracking-tight text-[#1E2129] mb-1">
                Sent Applications
              </h1>
              <p className="font-sans text-sm text-[#5B6170]">
                Live tracking of all your dispatched graduation internship applications and response status.
              </p>
            </div>

            {/* Stats Row */}
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              {(["SENT", "OPENED", "REPLIED", "REJECTED"] as ApplicationStatus[]).map((s) => (
                <div key={s} className="text-center">
                  <p className="font-mono text-lg font-bold text-[#1E2129]">{counts[s]}</p>
                  <p className="font-mono text-[9px] uppercase text-[#5B6170]">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-5 flex-wrap">
            {(["ALL", "SENT", "OPENED", "REPLIED", "REJECTED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-tight border border-[#1E2129] transition-all cursor-pointer ${
                  filter === f
                    ? "bg-[#1E2129] text-[#F2F0EA] shadow-[2px_2px_0px_#3F86F7]"
                    : "bg-white text-[#1E2129] hover:bg-[#FAF9F5]"
                }`}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="border-2 border-[#1E2129] bg-white shadow-[4px_4px_0px_#1E2129] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-0 border-b-2 border-[#1E2129] bg-[#E8E5DC] px-4 py-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5B6170]">Company</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5B6170]">Role</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5B6170]">Date</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5B6170]">Status</span>
          </div>

          {displayed.length === 0 ? (
            <div className="p-10 text-center font-mono text-xs text-[#5B6170]">
              No applications match this filter.
            </div>
          ) : (
            displayed.map((app, idx) => (
              <div
                key={app.id}
                className={`grid grid-cols-[2fr_3fr_1fr_1fr] gap-0 items-center px-4 py-4 border-b border-[#1E2129]/15 transition-colors hover:bg-[#FAF9F5] ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"
                }`}
              >
                {/* Company */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 shrink-0 border-2 border-[#1E2129] flex items-center justify-center font-bold text-[10px] text-white shadow-[2px_2px_0px_#1E2129]"
                    style={{ backgroundColor: app.logoBg }}
                  >
                    {app.companyInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans font-bold text-sm text-[#1E2129] truncate">{app.company}</p>
                    <p className="font-mono text-[10px] text-[#5B6170] truncate">{app.email}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="min-w-0 pr-4">
                  <p className="font-sans text-xs text-[#1E2129] font-semibold truncate">{app.role}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {app.attachments.map((att) => (
                      <span
                        key={att}
                        className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129]/30"
                      >
                        {att}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <p className="font-mono text-[10px] text-[#5B6170]">{app.dateSent}</p>

                {/* Status Badge */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wide px-2 py-1 border border-[#1E2129] ${STATUS_STYLES[app.status]}`}
                  >
                    <span className={`w-1.5 h-1.5 ${STATUS_DOT[app.status]} inline-block`} />
                    {app.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
