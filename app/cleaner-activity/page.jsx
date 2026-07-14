"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";

// --- Mock Data ---
const initialLogs = [
  {
    id: "SM-1",
    initials: "SM",
    name: "Srujal Mane",
    role: "Staff Member",
    status: "completed",
    score: "10.00",
    photos: 14,
    location: "dwarka nagar washroom",
    date: "01/07/2026",
    time: "12:05 PM",
    theme: "bg-[#232A26]",
  },
  {
    id: "SM-2",
    initials: "SM",
    name: "Srujal Mane",
    role: "Staff Member",
    status: "completed",
    score: "6.00",
    photos: 16,
    location: "Ground Floor Washroom A",
    date: "30/06/2026",
    time: "10:06 PM",
    theme: "bg-[#2B3945]",
  },
  {
    id: "OC-1",
    initials: "OC",
    name: "Omkar Cleaner",
    role: "Staff Member",
    status: "completed",
    score: "8.40",
    photos: 6,
    location: "Test-02",
    date: "30/06/2026",
    time: "5:59 PM",
    theme: "bg-[#3FA86B]",
  },
  {
    id: "KK-1",
    initials: "KK",
    name: "Kartik Kanzode",
    role: "Staff Member",
    status: "completed",
    score: "8.00",
    photos: 8,
    location: "kartik test 1",
    date: "30/06/2026",
    time: "3:58 PM",
    theme: "bg-[#2B3945]",
  },
];

export default function CleanersActivityUpdated() {
  // State
  const [activeTab, setActiveTab] = useState("all");
  const [cleanerFilter, setCleanerFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'grid'
  const [selectedLog, setSelectedLog] = useState(null); // null = dashboard view

  // Dropdown states
  const [isCleanerMenuOpen, setIsCleanerMenuOpen] = useState(false);
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

  // Filter Logic
  const filteredLogs = useMemo(() => {
    return initialLogs.filter((log) => {
      const matchStatus = activeTab === "all" || log.status === activeTab;
      const matchCleaner = cleanerFilter === "all" || log.name === cleanerFilter;
      const matchDate = dateFilter === "all" || log.date === dateFilter;
      return matchStatus && matchCleaner && matchDate;
    });
  }, [activeTab, cleanerFilter, dateFilter]);

  const resetFilters = () => {
    setActiveTab("all");
    setCleanerFilter("all");
    setDateFilter("all");
  };

  // Click-away listener for dropdowns
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsCleanerMenuOpen(false);
        setIsDateMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="max-w-md mx-auto py-4 px-4 font-sans text-[#111827] bg-[#F5F7FA] min-h-screen relative pb-24" ref={menuRef}>
      
      {/* ================= DASHBOARD VIEW ================= */}
      {!selectedLog ? (
        <div id="dashboardView" className="animate-in fade-in duration-300">
          {/* --- Hero Section --- */}
          <section className="mb-[18px]">
            <div className="bg-[linear-gradient(165deg,#FFFFFF_0%,#E9F1FF_100%)] rounded-[20px] p-4 shadow-[0_2px_10px_rgba(29,78,216,.07),inset_0_1px_0_rgba(255,255,255,.7)] border border-[#E1E8F0]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-[14px] bg-[linear-gradient(140deg,#3B82F6_0%,#60A5FA_130%)] text-white flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_6px_14px_-4px_#3B82F6]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div>
                  <div className="text-[18px] font-extrabold font-display tracking-[-0.2px]">Cleaners Activity</div>
                  <div className="text-[10.5px] font-bold text-[#94A0AC] uppercase tracking-[.05em] mt-[3px]">Monitor real-time daily cleaning progress</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <StatCard 
                  value={initialLogs.length} label="Total Logs" 
                  gradient="from-[#3B82F6] to-[#60A5FA]" shadowGlow="rgba(59,130,246,.28)" iconColor="text-[#1D4ED8]"
                  icon={<rect x="4" y="3" width="16" height="18" rx="2" />}
                />
                <StatCard 
                  value={initialLogs.filter(l => l.status === 'completed').length} label="Completed" 
                  gradient="from-[#0E7A56] to-[#34D399]" shadowGlow="rgba(14,122,86,.24)" iconColor="text-[#0E7A56]"
                  icon={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>}
                />
                <StatCard 
                  value="8.10" label="Avg Score" 
                  gradient="from-[#F0A527] to-[#FFCE6B]" shadowGlow="rgba(240,165,39,.28)" iconColor="text-[#8F5608]"
                  icon={<path d="M12 2l2.6 6.2L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.8z"/>}
                />
              </div>
            </div>
          </section>

          {/* --- Filters Section --- */}
          <section className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex bg-[#EEF3F9] rounded-[20px] p-[3px] gap-0.5 border border-[#E1E8F0] shrink-0">
                {["all", "ongoing", "completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-3.5 rounded-2xl text-[11.5px] font-bold whitespace-nowrap transition-all duration-200 capitalize ${
                      activeTab === tab
                        ? "bg-white text-[#1D4ED8] shadow-[0_1px_5px_rgba(29,78,216,.18)]"
                        : "text-[#94A0AC] hover:text-[#1D4ED8] hover:bg-white/55"
                    }`}
                  >
                    {tab === "all" ? "All Tasks" : tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2.5">
              {/* Cleaner Filter */}
              <div className="relative shrink-0">
                <button 
                  onClick={() => { setIsCleanerMenuOpen(!isCleanerMenuOpen); setIsDateMenuOpen(false); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#5B6472] bg-white border border-[#E1E8F0] py-2.5 px-3 rounded-[20px] whitespace-nowrap shadow-[0_2px_10px_rgba(29,78,216,.07)] hover:border-[#3B82F6] hover:text-[#1D4ED8]"
                >
                  Cleaner: {cleanerFilter === "all" ? "All" : cleanerFilter}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#94A0AC]"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {isCleanerMenuOpen && (
                  <div className="absolute z-50 bg-white border border-[#E1E8F0] rounded-2xl shadow-[0_8px_24px_rgba(29,78,216,.1)] p-1.5 min-w-[190px] top-[calc(100%+8px)] left-0 animate-in zoom-in-95 duration-150">
                    <div className="text-[9.5px] font-extrabold tracking-[.06em] uppercase text-[#94A0AC] py-2 px-2.5 pb-1">Filter by cleaner</div>
                    {["all", "Srujal Mane", "Omkar Cleaner", "Kartik Kanzode"].map(opt => (
                      <button key={opt} onClick={() => { setCleanerFilter(opt); setIsCleanerMenuOpen(false); }} className={`w-full text-left py-[9px] px-2.5 rounded-[9px] text-[12.5px] font-semibold transition-colors ${cleanerFilter === opt ? "bg-[#E6F0FF] text-[#1D4ED8] font-bold" : "text-[#111827] hover:bg-[#EEF3F9]"}`}>
                        {opt === "all" ? "All Cleaners" : opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Filter */}
              <div className="relative shrink-0">
                <button 
                  onClick={() => { setIsDateMenuOpen(!isDateMenuOpen); setIsCleanerMenuOpen(false); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#5B6472] bg-white border border-[#E1E8F0] py-2.5 px-3 rounded-[20px] whitespace-nowrap shadow-[0_2px_10px_rgba(29,78,216,.07)] hover:border-[#3B82F6] hover:text-[#1D4ED8]"
                >
                  Date: {dateFilter === "all" ? "All Time" : dateFilter}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#94A0AC]"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {isDateMenuOpen && (
                  <div className="absolute z-50 bg-white border border-[#E1E8F0] rounded-2xl shadow-[0_8px_24px_rgba(29,78,216,.1)] p-1.5 min-w-[170px] top-[calc(100%+8px)] left-0 animate-in zoom-in-95 duration-150">
                    <div className="text-[9.5px] font-extrabold tracking-[.06em] uppercase text-[#94A0AC] py-2 px-2.5 pb-1">Filter by date</div>
                    {["all", "01/07/2026", "30/06/2026"].map(opt => (
                      <button key={opt} onClick={() => { setDateFilter(opt); setIsDateMenuOpen(false); }} className={`w-full text-left py-[9px] px-2.5 rounded-[9px] text-[12.5px] font-semibold transition-colors ${dateFilter === opt ? "bg-[#E6F0FF] text-[#1D4ED8] font-bold" : "text-[#111827] hover:bg-[#EEF3F9]"}`}>
                        {opt === "all" ? "All Time" : opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={resetFilters} className="ml-auto flex items-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-[20px] whitespace-nowrap shadow-[0_2px_10px_rgba(29,78,216,.07)] text-[#E8435A] border border-[rgba(232,67,90,.2)] bg-[#FDE7EA] hover:bg-[#E8435A] hover:text-white transition-colors">
                Reset
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 9 8 9"/></svg>
              </button>
            </div>
          </section>

          {/* --- Logs Roster --- */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-[#5B6472] font-semibold">
                Showing <b className="text-[#111827] font-extrabold">{filteredLogs.length}</b> of <b className="text-[#111827] font-extrabold">{initialLogs.length}</b> logs
              </div>
              <div className="flex items-center gap-0.5 bg-white border border-[#E1E8F0] rounded-[11px] p-[3px] shadow-[0_2px_10px_rgba(29,78,216,.07)] shrink-0">
                <button onClick={() => setViewMode("list")} className={`flex items-center justify-center w-7 h-[26px] rounded-lg transition-all ${viewMode === "list" ? "bg-[linear-gradient(150deg,#E6F0FF_0%,#E9F1FF_100%)] text-[#1D4ED8] shadow-[inset_0_1px_0_rgba(255,255,255,.7)]" : "text-[#94A0AC]"}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
                </button>
                <button onClick={() => setViewMode("grid")} className={`flex items-center justify-center w-7 h-[26px] rounded-lg transition-all ${viewMode === "grid" ? "bg-[linear-gradient(150deg,#E6F0FF_0%,#E9F1FF_100%)] text-[#1D4ED8] shadow-[inset_0_1px_0_rgba(255,255,255,.7)]" : "text-[#94A0AC]"}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>
                </button>
              </div>
            </div>

            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF3F9] text-[#94A0AC] flex items-center justify-center mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <div className="text-[13.5px] font-bold font-display text-[#111827] mb-1">No logs match your filters</div>
                <div className="text-[11.5px] text-[#94A0AC] font-semibold">Try a different cleaner, date, or tap Reset</div>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-2 gap-[10px]" : "flex flex-col gap-3"}>
                {filteredLogs.map(log => (
                  <LogCard key={log.id} log={log} viewMode={viewMode} onSelect={() => setSelectedLog(log)} />
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        /* ================= REPORT VIEW ================= */
        <div id="reportView" className="animate-in slide-in-from-right-4 duration-300">
          <button onClick={() => setSelectedLog(null)} className="inline-flex items-center gap-1.5 bg-white border border-[#E1E8F0] text-[#111827] text-[12.5px] font-bold py-2 px-3 rounded-xl mb-3 shadow-[0_2px_10px_rgba(29,78,216,.06)] hover:border-[#3B82F6] hover:text-[#1D4ED8] transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to cleaner activity
          </button>

          {/* Review header */}
          <section className="mb-4">
            <div className="bg-[linear-gradient(165deg,#FFFFFF_0%,#E9F1FF_100%)] rounded-[20px] p-4 shadow-[0_2px_10px_rgba(29,78,216,.07),inset_0_1px_0_rgba(255,255,255,.7)] border border-[#E1E8F0]">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="text-[17px] font-extrabold font-display leading-[1.25] pr-1">Cleaning Review – {selectedLog.name}</div>
                <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-extrabold font-display py-1 px-2.5 rounded-full bg-[#E5F5EF] text-[#0E7A56]">{selectedLog.score}/10</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#F0A527]">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6.1-9.5-10A5.5 5.5 0 0 1 12 4.5 5.5 5.5 0 0 1 21.5 11c-2.5 3.9-9.5 10-9.5 10z"/><circle cx="12" cy="10.5" r="2.2"/></svg>
                <span>{selectedLog.location}</span>
              </div>
            </div>
          </section>

          {/* Task Details */}
          <section className="mb-4">
            <div className="bg-white rounded-2xl p-4 border border-[#E1E8F0] shadow-[0_1px_1px_rgba(20,20,30,.04),0_10px_20px_-14px_rgba(20,20,30,.14)]">
              <div className="flex items-center gap-2 mb-3 text-[13px] font-extrabold font-display text-[#111827]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 text-[#3B82F6]"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                Task Details
              </div>
              <div className="flex flex-col gap-2 text-[12.5px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#5B6472] font-semibold">Started</span>
                  <span className="text-[#111827] font-bold">{selectedLog.date}, {selectedLog.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5B6472] font-semibold">Completed</span>
                  <span className="text-[#111827] font-bold">{selectedLog.date}, 12:07:58 PM</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 pt-2.5 border-t border-dashed border-[#E1E8F0] text-[#0E7A56] font-bold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Completed in 2m
                </div>
              </div>
            </div>
          </section>

          {/* Task Review */}
          <section className="mb-4">
            <div className="bg-white rounded-2xl p-4 border border-[#E1E8F0] shadow-[0_1px_1px_rgba(20,20,30,.04),0_10px_20px_-14px_rgba(20,20,30,.14)]">
              <div className="flex items-center gap-2 mb-3 text-[13px] font-extrabold font-display text-[#111827]">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4 text-[#F0A527]"><path d="M12 2l2.6 6.2L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.8z"/></svg>
                Task Review
              </div>

              <div className="flex items-center justify-between bg-[#F5F7FA] border border-[#E1E8F0] rounded-xl py-2.5 px-3 mb-4">
                <div>
                  <div className="text-[9.5px] font-extrabold text-[#94A0AC] uppercase tracking-[.05em]">Cleaning Status</div>
                  <div className="text-[13px] font-extrabold font-display text-[#111827] mt-0.5">Inspected & Completed</div>
                </div>
                <span className="shrink-0 text-[11px] font-extrabold font-display py-1.5 px-2.5 rounded-full bg-[#F0A527] text-white">10/10</span>
              </div>

              <div className="mb-3.5">
                <div className="text-[9.5px] font-extrabold text-[#94A0AC] uppercase tracking-[.05em] mb-1">Initial Observation</div>
                <div className="text-[12.5px] font-semibold text-[#5B6472]">No remarks &nbsp;|&nbsp; No remarks</div>
              </div>
              <div>
                <div className="text-[9.5px] font-extrabold text-[#94A0AC] uppercase tracking-[.05em] mb-1">Post-Cleaning Notes</div>
                <div className="text-[12.5px] font-semibold text-[#5B6472]">No remarks &nbsp;|&nbsp; No remarks &nbsp;|&nbsp; Done cleaning</div>
              </div>
            </div>
          </section>

          {/* Visual Evidence (Hardcoded 7 areas as per requested template) */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-4 border border-[#E1E8F0] shadow-[0_1px_1px_rgba(20,20,30,.04),0_10px_20px_-14px_rgba(20,20,30,.14)]">
              <div className="flex items-center gap-2 mb-3 text-[13px] font-extrabold font-display text-[#111827]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#E8435A]"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                Visual Evidence <span className="text-[#94A0AC] font-bold">({selectedLog.photos} Photos)</span>
              </div>

              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map((area) => (
                  <div key={area}>
                    <div className="text-[10px] font-extrabold text-[#94A0AC] uppercase tracking-[.05em] mb-1.5">Area {area}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <PhotoBox label="Before" badgeColor="bg-black/55" />
                      <PhotoBox label="After" badgeColor="bg-[#F0A527]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

    </main>
  );
}


// --- Reusable Sub-components ---

function StatCard({ value, label, gradient, shadowGlow, iconColor, icon }) {
  return (
    <div className={`relative overflow-hidden isolate rounded-2xl py-3 px-2 pb-[11px] text-center bg-[linear-gradient(165deg,#FFFFFF_0%,#E9F1FF_100%)] shadow-[0_1px_1px_rgba(16,25,21,.03),0_10px_20px_-12px_${shadowGlow},inset_0_1px_0_rgba(255,255,255,.8)] border border-white/90 transition-all duration-200 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:z-[2] before:bg-gradient-to-r before:${gradient}`}>
      <div className={`w-7 h-7 rounded-[9px] bg-white flex items-center justify-center mx-auto mb-[7px] ${iconColor} relative z-[1] shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_rgba(59,130,246,.15),0_0_0_1px_rgba(59,130,246,.08)] [&_svg]:w-3.5 [&_svg]:h-3.5`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </div>
      <div className="text-[18px] font-extrabold font-display text-[#111827] relative z-[1]">{value}</div>
      <div className="text-[9px] font-bold text-[#5B6472] uppercase tracking-[.04em] mt-0.5 relative z-[1]">{label}</div>
    </div>
  );
}

function LogCard({ log, viewMode, onSelect }) {
  const isGrid = viewMode === "grid";

  return (
    <div className={`relative bg-[linear-gradient(165deg,#FFFFFF_0%,#E9F1FF_100%)] rounded-2xl border border-[#E1E8F0] shadow-[0_1px_1px_rgba(20,20,30,.04),0_10px_20px_-14px_rgba(20,20,30,.14),inset_0_1px_0_rgba(255,255,255,.7)] overflow-hidden transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_4px_10px_rgba(20,20,30,.06),0_18px_30px_-14px_rgba(20,20,30,.2)] hover:border-[rgba(59,130,246,.3)] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[linear-gradient(180deg,#3B82F6,#60A5FA)] before:opacity-40 hover:before:opacity-[.85] hover:before:w-1 ${isGrid ? 'p-3 pl-[13px]' : 'py-3.5 px-3.5 pl-4 pb-[13px]'}`}>
      
      <div className={`flex items-start ${isGrid ? 'flex-wrap gap-[7px] mb-[9px]' : 'gap-[11px] mb-[11px]'}`}>
        <div className={`rounded-xl bg-[linear-gradient(150deg,#E6F0FF_0%,#fff_100%)] text-[#1D4ED8] border-[1.5px] border-[#E6F0FF] flex items-center justify-center shrink-0 font-display font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,.7)] ${isGrid ? 'w-8 h-8 text-[10.5px]' : 'w-10 h-10 text-[13px]'}`}>
          {log.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-bold font-display overflow-hidden text-ellipsis whitespace-nowrap capitalize ${isGrid ? 'text-xs' : 'text-[14.5px]'}`}>{log.name}</div>
          <div className={`text-[#94A0AC] font-semibold uppercase tracking-[.03em] ${isGrid ? 'text-[9px] mt-px' : 'text-[11px] mt-0.5'}`}>{log.role}</div>
        </div>
        <div className={`shrink-0 flex items-center gap-[5px] font-extrabold tracking-[.03em] uppercase rounded-[20px] text-[#0E7A56] bg-[#E5F5EF] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#0E7A56] ${isGrid ? 'flex-[1_0_100%] justify-center mt-[5px] text-[8.5px] py-1 px-2' : 'text-[10px] py-[5px] pl-2 pr-2.5'}`}>
          {log.status}
        </div>
      </div>

      <div className={`grid gap-2 ${isGrid ? 'grid-cols-1 gap-1.5 mb-[9px]' : 'grid-cols-2 mb-[11px]'}`}>
        <div className={`bg-white border border-[#E1E8F0] rounded-[11px] ${isGrid ? 'py-[7px] px-[9px]' : 'py-2 px-2.5'}`}>
          <div className={`font-bold text-[#94A0AC] uppercase tracking-[.04em] ${isGrid ? 'text-[9px]' : 'text-[9.5px]'}`}>Score</div>
          <div className={`flex items-center font-extrabold font-display text-[#111827] mt-0.5 [&_svg]:text-[#F0A527] [&_svg]:shrink-0 ${isGrid ? 'text-[12.5px] gap-[3px] [&_svg]:w-[11px] [&_svg]:h-[11px]' : 'text-sm gap-1 [&_svg]:w-[13px] [&_svg]:h-[13px]'}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.6 6.2L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.8z"/></svg>
            {log.score}<span className="text-[#94A0AC] font-semibold text-[11px]"> / 10</span>
          </div>
        </div>
        <div className={`bg-white border border-[#E1E8F0] rounded-[11px] ${isGrid ? 'py-[7px] px-[9px]' : 'py-2 px-2.5'}`}>
          <div className={`font-bold text-[#94A0AC] uppercase tracking-[.04em] ${isGrid ? 'text-[9px]' : 'text-[9.5px]'}`}>Evidence Logs</div>
          <div className={`flex items-center font-extrabold font-display text-[#111827] mt-0.5 ${isGrid ? 'text-[12.5px] gap-[3px]' : 'text-sm gap-1'}`}>
            {log.photos} <span className="text-[#94A0AC] font-semibold text-[11px]">photos</span>
          </div>
        </div>
      </div>

      <div className={`flex items-center ${isGrid ? 'gap-[5px] mb-[9px]' : 'gap-1.5 mb-[11px]'}`}>
        <div className={`border border-[#E1E8F0] ${log.theme} ${isGrid ? 'w-6 h-[26px] rounded-[7px]' : 'w-[30px] h-8 rounded-lg'}`}></div>
        <div className={`border border-[#E1E8F0] ${log.theme} ${isGrid ? 'w-6 h-[26px] rounded-[7px]' : 'w-[30px] h-8 rounded-lg'}`}></div>
        <div className={`bg-[#FFF3DC] text-[#8F5608] flex items-center justify-center font-extrabold font-display border border-[rgba(240,165,39,.2)] ${isGrid ? 'w-6 h-[26px] rounded-[7px] text-[9.5px]' : 'w-[30px] h-8 rounded-lg text-[10.5px]'}`}>
          +{log.photos - 2}
        </div>
      </div>

      <div className={`flex justify-between border-t border-dashed border-[#E1E8F0] ${isGrid ? 'flex-col items-stretch gap-2 pt-[9px]' : 'items-center gap-2 pt-[11px]'}`}>
        <div className={`min-w-0 flex-1 flex flex-col ${isGrid ? 'gap-1' : 'gap-[5px]'}`}>
          <div className={`flex items-center gap-1.5 font-bold text-[#111827] overflow-hidden [&_svg]:w-[13px] [&_svg]:h-[13px] [&_svg]:text-[#3B82F6] [&_svg]:shrink-0 ${isGrid ? 'text-[11px]' : 'text-xs'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap capitalize">{log.location}</span>
          </div>
          <div className={`text-[#94A0AC] font-semibold flex items-center gap-[5px] overflow-hidden [&_svg]:w-[11px] [&_svg]:h-[11px] [&_svg]:shrink-0 ${isGrid ? 'text-[9.5px]' : 'text-[10.5px]'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">Started {log.date}, {log.time}</span>
          </div>
        </div>
        <button onClick={onSelect} className={`shrink-0 flex items-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,#F0A527,#FFB84D)] text-white font-bold border-0 whitespace-nowrap shadow-[0_4px_14px_rgba(240,165,39,.25)] hover:brightness-[1.06] active:scale-[.97] transition-all [&_svg]:w-[13px] [&_svg]:h-[13px] ${isGrid ? 'w-full justify-center py-2 px-2.5 text-[11.5px]' : 'py-2.5 px-3.5 text-xs'}`}>
          Report
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

    </div>
  );
}

function PhotoBox({ label, badgeColor }) {
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden bg-[linear-gradient(155deg,#1F2937_0%,#111827_100%)] cursor-pointer active:scale-95 transition-transform">
      <span className={`absolute top-1.5 left-1.5 text-[9px] font-extrabold tracking-[.04em] uppercase text-white ${badgeColor} py-1 px-2 rounded-md`}>
        {label}
      </span>
      <svg className="absolute inset-0 m-auto w-7 h-7 text-white/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
    </div>
  );
}