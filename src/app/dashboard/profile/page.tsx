"use client";

import React, { useState } from "react";

interface ProfileData {
  fullName: string;
  email: string;
  university: string;
  degree: string;
  targetTechs: string[];
  cities: string[];
  remoteOnly: boolean;
  bio: string;
}

const INITIAL_PROFILE: ProfileData = {
  fullName: "Alex Dupont",
  email: "alex.dupont@university.edu",
  university: "National School of Computer Science & Engineering",
  degree: "Master's in Computer Science / Engineering",
  targetTechs: ["Python", "TypeScript", "React", "Machine Learning", "Docker", "Go"],
  cities: ["San Francisco", "Paris", "London", "Remote"],
  remoteOnly: false,
  bio: "Final-year software engineering student passionate about scalable distributed systems and applied AI. Looking for a high-impact graduation internship.",
};

const APP_STATS = {
  sent: 5,
  companies: 4,
  opened: 1,
  replied: 1,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(INITIAL_PROFILE);
  const [newTech, setNewTech] = useState("");
  const [newCity, setNewCity] = useState("");

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const saveEdit = () => {
    setProfile({ ...draft });
    setEditing(false);
  };

  const cancelEdit = () => setEditing(false);

  const removeTech = (tech: string) =>
    setDraft((d) => ({ ...d, targetTechs: d.targetTechs.filter((t) => t !== tech) }));

  const addTech = () => {
    if (newTech.trim() && !draft.targetTechs.includes(newTech.trim())) {
      setDraft((d) => ({ ...d, targetTechs: [...d.targetTechs, newTech.trim()] }));
      setNewTech("");
    }
  };

  const removeCity = (city: string) =>
    setDraft((d) => ({ ...d, cities: d.cities.filter((c) => c !== city) }));

  const addCity = () => {
    if (newCity.trim() && !draft.cities.includes(newCity.trim())) {
      setDraft((d) => ({ ...d, cities: [...d.cities, newCity.trim()] }));
      setNewCity("");
    }
  };

  const data = editing ? draft : profile;

  return (
    <div className="flex-1 flex flex-col pb-20">
      <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full mx-auto flex flex-col gap-6">
        {/* Page Title + Edit Actions */}
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-2xl font-extrabold tracking-tight text-[#1E2129]">
            Candidate Profile
          </h1>
          {!editing ? (
            <button
              type="button"
              onClick={startEdit}
              className="font-mono text-xs font-bold uppercase px-3.5 py-1.5 bg-[#1E2129] text-[#F2F0EA] border-2 border-[#1E2129] shadow-[2px_2px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#3F86F7] transition-all cursor-pointer"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-[#1E2129] bg-white text-[#5B6170] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="font-mono text-xs font-bold uppercase px-4 py-1.5 bg-[#C8F560] text-[#1E2129] border-2 border-[#1E2129] shadow-[2px_2px_0px_#1E2129] hover:shadow-[4px_4px_0px_#1E2129] transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Application Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Applications", value: APP_STATS.sent, color: "bg-[#3F86F7]" },
            { label: "Companies", value: APP_STATS.companies, color: "bg-[#1E2129]" },
            { label: "Emails Opened", value: APP_STATS.opened, color: "bg-[#F5A623]" },
            { label: "Replies", value: APP_STATS.replied, color: "bg-[#C8F560]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-2 border-[#1E2129] bg-white shadow-[3px_3px_0px_#1E2129] p-4 flex flex-col gap-1"
            >
              <span className={`w-2 h-2 ${stat.color} border border-[#1E2129]`} />
              <p className="font-sans text-3xl font-extrabold text-[#1E2129] leading-none">
                {stat.value}
              </p>
              <p className="font-mono text-[10px] uppercase text-[#5B6170]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Identity Card */}
        <div className="border-2 border-[#1E2129] bg-white shadow-[6px_6px_0px_#1E2129] p-6 sm:p-7">
          <div className="flex items-start gap-5 pb-5 border-b-2 border-[#1E2129]/15 mb-5">
            {/* Avatar Monogram */}
            <div className="w-16 h-16 shrink-0 border-2 border-[#1E2129] bg-[#3F86F7] flex items-center justify-center font-bold text-xl text-white shadow-[3px_3px_0px_#1E2129]">
              {profile.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <input
                  value={draft.fullName}
                  onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
                  className="font-sans text-2xl font-extrabold text-[#1E2129] border-b-2 border-[#3F86F7] bg-transparent focus:outline-none w-full mb-1"
                />
              ) : (
                <h1 className="font-sans text-2xl font-extrabold tracking-tight text-[#1E2129] mb-1">
                  {profile.fullName}
                </h1>
              )}
              {editing ? (
                <input
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                  className="font-mono text-sm text-[#5B6170] border-b border-[#1E2129]/30 bg-transparent focus:outline-none w-full"
                />
              ) : (
                <p className="font-mono text-sm text-[#5B6170]">{profile.email}</p>
              )}
            </div>
          </div>

          {/* Fields Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* University */}
            <div>
              <label className="font-mono text-[10px] font-bold uppercase text-[#5B6170] block mb-1.5">
                University / Institution
              </label>
              {editing ? (
                <input
                  value={draft.university}
                  onChange={(e) => setDraft((d) => ({ ...d, university: e.target.value }))}
                  className="w-full px-3 py-2 text-sm font-sans border-2 border-[#1E2129] bg-[#F2F0EA] text-[#1E2129] focus:outline-none focus:border-[#3F86F7]"
                />
              ) : (
                <p className="font-sans text-sm font-semibold text-[#1E2129]">{profile.university}</p>
              )}
            </div>

            {/* Degree */}
            <div>
              <label className="font-mono text-[10px] font-bold uppercase text-[#5B6170] block mb-1.5">
                Target Degree
              </label>
              {editing ? (
                <select
                  value={draft.degree}
                  onChange={(e) => setDraft((d) => ({ ...d, degree: e.target.value }))}
                  className="w-full px-3 py-2 text-sm font-sans border-2 border-[#1E2129] bg-[#F2F0EA] text-[#1E2129] focus:outline-none focus:border-[#3F86F7]"
                >
                  {["Master's in Computer Science / Engineering", "Bachelor of Science (B.S.)", "Master of Science (M.S.)", "Ph.D. Candidate"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              ) : (
                <p className="font-sans text-sm font-semibold text-[#1E2129]">{profile.degree}</p>
              )}
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="font-mono text-[10px] font-bold uppercase text-[#5B6170] block mb-1.5">
                About
              </label>
              {editing ? (
                <textarea
                  value={draft.bio}
                  onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 text-sm font-sans border-2 border-[#1E2129] bg-[#F2F0EA] text-[#1E2129] focus:outline-none focus:border-[#3F86F7] resize-none"
                />
              ) : (
                <p className="font-sans text-sm text-[#5B6170] leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="border-2 border-[#1E2129] bg-white shadow-[4px_4px_0px_#1E2129] p-6">
          <h2 className="font-sans font-extrabold text-base text-[#1E2129] mb-4">
            Target Technologies
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.targetTechs.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1.5 bg-[#1E2129] text-[#F2F0EA] border border-[#1E2129]"
              >
                {tech}
                {editing && (
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-[#E5484D] font-bold text-sm leading-none hover:text-white cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          {editing && (
            <div className="flex gap-0 border-2 border-[#1E2129] max-w-xs">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTech()}
                placeholder="Add technology..."
                className="flex-1 px-3 py-1.5 text-xs font-sans bg-white text-[#1E2129] placeholder:text-[#5B6170] focus:outline-none"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 py-1.5 font-mono text-xs font-bold bg-[#1E2129] text-[#F2F0EA] border-l-2 border-[#1E2129] cursor-pointer"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Preferred Locations */}
        <div className="border-2 border-[#1E2129] bg-white shadow-[4px_4px_0px_#1E2129] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans font-extrabold text-base text-[#1E2129]">
              Target Cities
            </h2>
            {editing && (
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setDraft((d) => ({ ...d, remoteOnly: !d.remoteOnly }))}
                  className={`w-10 h-5 border-2 border-[#1E2129] relative cursor-pointer ${
                    draft.remoteOnly ? "bg-[#C8F560]" : "bg-white"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-3 h-3 border border-[#1E2129] bg-[#1E2129] transition-all ${
                      draft.remoteOnly ? "left-5" : "left-0.5"
                    }`}
                  />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase text-[#1E2129]">
                  Remote Only
                </span>
              </label>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.cities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1.5 bg-[#C8F560] text-[#1E2129] border border-[#1E2129]"
              >
                {city}
                {editing && (
                  <button
                    type="button"
                    onClick={() => removeCity(city)}
                    className="font-bold text-sm leading-none hover:text-[#E5484D] cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          {editing && (
            <div className="flex gap-0 border-2 border-[#1E2129] max-w-xs">
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCity()}
                placeholder="Add city..."
                className="flex-1 px-3 py-1.5 text-xs font-sans bg-white text-[#1E2129] placeholder:text-[#5B6170] focus:outline-none"
              />
              <button
                type="button"
                onClick={addCity}
                className="px-3 py-1.5 font-mono text-xs font-bold bg-[#1E2129] text-[#F2F0EA] border-l-2 border-[#1E2129] cursor-pointer"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Master Resume Upload */}
        <div className="border-2 border-[#1E2129] border-dashed bg-white p-8 text-center">
          <p className="font-mono text-xs font-bold uppercase text-[#5B6170] mb-2">Master Resume</p>
          <div className="font-mono text-3xl mb-3 opacity-30">📄</div>
          <p className="font-sans text-sm font-semibold text-[#1E2129] mb-1">Base Resume Attached (PDF)</p>
          <p className="font-sans text-xs text-[#5B6170] mb-4">
            Auto-Intern dynamically adapts this resume for each specific company and job description.
          </p>
          <button
            type="button"
            className="font-mono text-xs font-bold uppercase px-5 py-2.5 border-2 border-[#1E2129] bg-[#1E2129] text-[#F2F0EA] shadow-[3px_3px_0px_#3F86F7] hover:shadow-[5px_5px_0px_#3F86F7] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
          >
            Upload New Resume (PDF)
          </button>
        </div>
      </main>
    </div>
  );
}
