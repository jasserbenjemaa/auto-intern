"use client";

import React, { useState, useRef } from "react";

interface ScrapedInternship {
  id: string;
  company: string;
  role: string;
  location: string;
  type: string;
  source: string;
  tags: string[];
}

const MOCK_SCRAPED: ScrapedInternship[] = [
  {
    id: "s1",
    company: "Mistral AI",
    role: "Graduation Internship – LLM Fine-Tuning & Alignment",
    location: "Paris, France / Hybrid",
    type: "Hybrid",
    source: "careers.mistral.ai",
    tags: ["Python", "PyTorch", "LLMs", "RLHF"],
  },
  {
    id: "s2",
    company: "Hugging Face",
    role: "Graduation Internship – Open-Source ML Tooling",
    location: "Remote",
    type: "Remote",
    source: "huggingface.co/jobs",
    tags: ["Python", "Transformers", "Open Source", "ML"],
  },
  {
    id: "s3",
    company: "BNP Paribas CIB",
    role: "Graduation Internship – Algorithmic Trading & Quant Dev",
    location: "Paris, France",
    type: "On Site",
    source: "group.bnpparibas/jobs",
    tags: ["Python", "C++", "Finance", "Statistics"],
  },
  {
    id: "s4",
    company: "Thales",
    role: "Graduation Internship – Cybersecurity & Embedded Systems",
    location: "Toulouse, France",
    type: "Hybrid",
    source: "thalesgroup.com/careers",
    tags: ["C", "Rust", "Embedded", "Security"],
  },
];

const PHASES = [
  "Connecting to target career portal...",
  "Analyzing DOM structure and job listings...",
  "Extracting candidate internship offers...",
  "Filtering graduation and PFE opportunities...",
  "Enriching metadata and technical requirements...",
  "Compiling extracted results...",
];

export default function ScraperPage() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState(-1);
  const [results, setResults] = useState<ScrapedInternship[]>([]);
  const [logLines, setLogLines] = useState<string[]>([]);
  const phaseRef = useRef(0);

  const handleScrape = () => {
    if (!url.trim()) return;
    setResults([]);
    setLogLines([]);
    setPhase(0);
    phaseRef.current = 0;

    const runPhase = (idx: number) => {
      if (idx >= PHASES.length) {
        setPhase(6);
        setResults(MOCK_SCRAPED);
        return;
      }
      setPhase(idx);
      setLogLines((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${PHASES[idx]}`,
      ]);
      setTimeout(() => runPhase(idx + 1), 600 + Math.random() * 400);
    };

    runPhase(0);
  };

  const typeBg = (type: string) => {
    if (type === "Remote") return "bg-[#3F86F7] text-white";
    if (type === "Hybrid") return "bg-[#F5A623] text-[#1E2129]";
    return "bg-[#C8F560] text-[#1E2129]";
  };

  return (
    <div className="flex-1 flex flex-col pb-20">
      <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto flex flex-col gap-6">
        {/* Title + URL Input */}
        <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-6 sm:p-7">
          <h1 className="font-sans text-2xl font-extrabold tracking-tight text-[#1E2129] mb-1">
            Internship Web Scraper
          </h1>
          <p className="font-sans text-sm text-[#5B6170] mb-6">
            Paste a hiring portal URL and Auto-Intern will automatically crawl and extract relevant internship listings for you.
          </p>

          {/* URL Input Row */}
          <div className="flex gap-0 border-2 border-[#1E2129] shadow-[4px_4px_0px_#3F86F7] focus-within:shadow-[6px_6px_0px_#3F86F7] transition-all">
            <div className="flex items-center px-3 bg-[#E8E5DC] border-r-2 border-[#1E2129] shrink-0">
              <span className="font-mono text-xs font-bold text-[#5B6170]">URL</span>
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScrape()}
              placeholder="https://careers.example.com/internships"
              className="flex-1 px-4 py-3 text-sm font-sans bg-white text-[#1E2129] placeholder:text-[#5B6170] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleScrape}
              disabled={!url.trim() || (phase >= 0 && phase < 6)}
              className="px-5 py-3 font-mono text-xs font-bold uppercase tracking-tight bg-[#1E2129] text-[#F2F0EA] border-l-2 border-[#1E2129] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
            >
              {phase >= 0 && phase < 6 ? "SCANNING..." : "SCRAPE OFFERS"}
            </button>
          </div>

          {/* Quick example URLs */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="font-mono text-[10px] text-[#5B6170] uppercase">Try:</span>
            {["linkedin.com/jobs", "welcometothejungle.com", "ycombinator.com/jobs"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setUrl(`https://${ex}`)}
                className="font-mono text-[10px] text-[#3F86F7] font-bold underline hover:no-underline cursor-pointer"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Log */}
        {logLines.length > 0 && (
          <div className="border-2 border-[#1E2129] bg-[#1E2129] shadow-[4px_4px_0px_#1E2129] overflow-hidden">
            {/* Terminal titlebar */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/10 bg-[#161A20]">
              <span className="w-2.5 h-2.5 bg-[#E5484D] border border-white/20" />
              <span className="w-2.5 h-2.5 bg-[#F5A623] border border-white/20" />
              <span className="w-2.5 h-2.5 bg-[#C8F560] border border-white/20" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-white/50 ml-2">
                SCRAPER.SH – {url}
              </span>
              {phase < 6 && (
                <span className="ml-auto font-mono text-[10px] text-[#C8F560] font-bold animate-pulse">
                  ● RUNNING
                </span>
              )}
              {phase === 6 && (
                <span className="ml-auto font-mono text-[10px] text-[#10B981] font-bold">
                  ✓ DONE
                </span>
              )}
            </div>
            <div className="p-4 font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
              {logLines.map((line, i) => (
                <p key={i} className="text-[#C8F560]">
                  <span className="text-white/40">$</span> {line}
                </p>
              ))}
              {phase >= 0 && phase < 6 && (
                <p className="text-white/60 animate-pulse">█</p>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-extrabold text-lg text-[#1E2129]">
                {results.length} offers extracted
              </h2>
              <span className="font-mono text-[10px] text-[#5B6170]">
                Source: {url}
              </span>
            </div>

            {results.map((r) => (
              <div
                key={r.id}
                className="border-2 border-[#1E2129] bg-white shadow-[4px_4px_0px_#1E2129] p-5 hover:shadow-[6px_6px_0px_#3F86F7] transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-sans font-bold text-base text-[#1E2129] mb-0.5">
                      {r.role}
                    </h3>
                    <p className="font-sans text-sm text-[#5B6170]">
                      {r.company} • {r.location}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-[10px] font-bold uppercase px-2 py-1 border border-[#1E2129] ${typeBg(r.type)}`}
                  >
                    {r.type}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {r.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#E8E5DC] text-[#1E2129] border border-[#1E2129]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[#5B6170]">via {r.source}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {phase === -1 && (
          <div className="border-2 border-[#1E2129]/30 border-dashed p-12 text-center">
            <div className="font-mono text-4xl mb-4 opacity-30">🔍</div>
            <p className="font-sans font-bold text-[#1E2129] mb-1">
              No active scraping session
            </p>
            <p className="font-sans text-sm text-[#5B6170]">
              Enter a recruitment URL above and click Scrape Offers to start automated extraction.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
