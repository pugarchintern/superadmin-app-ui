"use client";

import React, { useState, useMemo } from "react";

// --- Mock Data ---
const initialZones = [
  { id: "#147", name: "Nagpur", children: 8, parent: null },
  { id: "#148", name: "Dighori", children: 3, parent: "Nagpur" },
  { id: "#149", name: "Demo", children: 2, parent: "Nagpur" },
  { id: "#150", name: "New A", children: 0, parent: "Dighori" },
  { id: "#151", name: "Somalwada", children: 1, parent: "Nagpur" },
  { id: "#152", name: "Ram nagar", children: null, parent: "Nagpur" },
  { id: "#153", name: "Raghuji square", children: null, parent: "Nagpur" },
  { id: "#154", name: "Sadar", children: 4, parent: "Nagpur" },
  { id: "#155", name: "Civil Lines", children: 2, parent: "Sadar" },
  { id: "#156", name: "Sitabuldi", children: null, parent: "Sadar" },
  { id: "#157", name: "Dharampeth", children: 1, parent: "Nagpur" },
  { id: "#158", name: "Mahal", children: null, parent: "Nagpur" },
  { id: "#159", name: "Itwari", children: 0, parent: "Nagpur" },
  { id: "#160", name: "Gandhibagh", children: null, parent: "Nagpur" },
  { id: "#161", name: "Jaripatka", children: 2, parent: "Nagpur" },
  { id: "#162", name: "Kamptee Road", children: null, parent: "Jaripatka" },
  { id: "#163", name: "Manewada", children: null, parent: "Nagpur" },
  { id: "#164", name: "Hingna", children: 1, parent: "Nagpur" },
  { id: "#165", name: "Wathoda", children: null, parent: "Hingna" },
  { id: "#166", name: "Trimurti Nagar", children: null, parent: "Dharampeth" },
  { id: "#167", name: "Pratap Nagar", children: 0, parent: "Nagpur" },
  { id: "#168", name: "Laxmi Nagar", children: null, parent: "Nagpur" },
  { id: "#169", name: "Shivaji Nagar", children: null, parent: "Nagpur" },
  { id: "#170", name: "Ajni", children: null, parent: "Nagpur" },
  { id: "#171", name: "Seminary Hills", children: 0, parent: "Nagpur" },
  { id: "#172", name: "Friends Colony", children: null, parent: "Somalwada" },
  { id: "#173", name: "Congress Nagar", children: null, parent: "Nagpur" },
  { id: "#174", name: "Ganeshpeth", children: null, parent: "Nagpur" },
  { id: "#175", name: "Mominpura", children: null, parent: "Mahal" },
  { id: "#176", name: "Pardi", children: 0, parent: "Nagpur" },
  { id: "#177", name: "Kalamna", children: null, parent: "Nagpur" },
  { id: "#178", name: "Bhandewadi", children: null, parent: "Kalamna" },
  { id: "#179", name: "Zingabai Takli", children: null, parent: "Nagpur" },
  { id: "#180", name: "Nara", children: null, parent: "Hingna" },
  { id: "#181", name: "Narsala", children: null, parent: "Nagpur" },
  { id: "#182", name: "Besa", children: 0, parent: "Nagpur" },
  { id: "#183", name: "Wanjra", children: null, parent: "Besa" },
  { id: "#184", name: "Khamla", children: null, parent: "Dharampeth" },
  { id: "#185", name: "Friends Colony Ext", children: null, parent: "Nagpur" },
];

export default function LocationHierarchy() {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [isTreeView, setIsTreeView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const PAGE_SIZE = 8;

  // Filter & Pagination Logic
  const filteredZones = useMemo(() => {
    if (!searchQuery) return initialZones;
    return initialZones.filter((z) =>
      z.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredZones.length / PAGE_SIZE));
  const currentZones = filteredZones.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Tree Logic
  const treeRoots = useMemo(() => {
    const byName = {};
    initialZones.forEach((z) => {
      byName[z.name] = { ...z, kids: [] };
    });
    const roots = [];
    initialZones.forEach((z) => {
      if (z.parent && byName[z.parent]) {
        byName[z.parent].kids.push(byName[z.name]);
      } else {
        roots.push(byName[z.name]);
      }
    });
    return roots;
  }, []);

  return (
    <main className="max-w-md mx-auto p-[16px_16px_4px] font-body text-safai-text pb-24 relative min-h-screen">
      
      {/* --- Hero Section --- */}
      <section className="mb-4.5">
        <div className="bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] rounded-[20px] p-4 shadow-[var(--shadow-safai-sm)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] border border-safai-border transition-all hover:shadow-[var(--shadow-safai-md)] hover:-translate-y-0.5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[linear-gradient(140deg,var(--color-safai-primary)_0%,var(--color-safai-primary-2)_130%)] text-white flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),_0_6px_14px_-4px_var(--color-safai-primary)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[23px] h-[23px]">
                <circle cx="12" cy="5" r="2.2" />
                <circle cx="6" cy="19" r="2.2" />
                <circle cx="18" cy="19" r="2.2" />
                <path d="M12 7.2V12M12 12H6v4.8M12 12h6v4.8" />
              </svg>
            </div>
            <div>
              <div className="font-display text-[18px] font-extrabold tracking-[-0.2px]">Location Hierarchy</div>
              <div className="text-[10.5px] font-bold text-safai-text-faint uppercase tracking-wider mt-[3px]">Organization structure & zones</div>
            </div>
          </div>
          
          <div className="flex gap-2.5">
            <button
              onClick={() => setIsTreeView(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[13px] font-bold p-[12px_10px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
                isTreeView
                  ? "bg-[linear-gradient(135deg,#8F5608_0%,var(--color-safai-amber)_60%,#FFC169_100%)] text-white shadow-[0_8px_18px_-6px_rgba(201,122,29,0.45)]"
                  : "bg-white border-[1.5px] border-safai-amber text-[#8F5608]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px]">
                <circle cx="12" cy="5" r="2.2" />
                <circle cx="6" cy="19" r="2.2" />
                <circle cx="18" cy="19" r="2.2" />
                <path d="M12 7.2V12M12 12H6v4.8M12 12h6v4.8" />
              </svg>
              Show Hierarchy
            </button>
            <button
              onClick={() => setIsTreeView(false)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[13px] font-bold p-[12px_10px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
                !isTreeView
                  ? "bg-[linear-gradient(135deg,#8F5608_0%,var(--color-safai-amber)_60%,#FFC169_100%)] text-white shadow-[0_8px_18px_-6px_rgba(201,122,29,0.45)]"
                  : "bg-white border-[1.5px] border-safai-amber text-[#8F5608]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="w-[15px] h-[15px]">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Hierarchy
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3.5">
            {/* Stat 1 */}
            <div className="relative overflow-hidden rounded-2xl p-[12px_8px_11px] text-center bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] shadow-[0_1px_1px_rgba(16,25,21,0.03),_0_10px_20px_-12px_rgba(59,130,246,0.30),_inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/90 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-safai-primary before:to-safai-primary-2 before:z-10">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center mx-auto mb-1.5 text-safai-primary-deep relative z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_4px_10px_-3px_rgba(59,130,246,0.4),_0_0_0_1px_rgba(59,130,246,0.12)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                  <path d="M12 2 2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="text-[18px] font-extrabold font-display relative z-10">39</div>
              <div className="text-[9px] font-bold text-safai-text-dim uppercase tracking-wider mt-0.5 relative z-10">Total Zones</div>
            </div>
            {/* Stat 2 */}
            <div className="relative overflow-hidden rounded-2xl p-[12px_8px_11px] text-center bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] shadow-[0_1px_1px_rgba(16,25,21,0.03),_0_10px_20px_-12px_rgba(240,165,39,0.28),_inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/90 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-safai-amber before:to-[#FFCE6B] before:z-10">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center mx-auto mb-1.5 text-[#8F5608] relative z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_4px_10px_-3px_rgba(240,165,39,0.42),_0_0_0_1px_rgba(240,165,39,0.18)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                  <path d="M12 2l2.6 6.2L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.8z" />
                </svg>
              </div>
              <div className="text-[18px] font-extrabold font-display relative z-10">1</div>
              <div className="text-[9px] font-bold text-safai-text-dim uppercase tracking-wider mt-0.5 relative z-10">Top-Level</div>
            </div>
            {/* Stat 3 */}
            <div className="relative overflow-hidden rounded-2xl p-[12px_8px_11px] text-center bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] shadow-[0_1px_1px_rgba(16,25,21,0.03),_0_10px_20px_-12px_rgba(14,122,86,0.24),_inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/90 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-[#0E7A56] before:to-[#34D399] before:z-10">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center mx-auto mb-1.5 text-[#0E7A56] relative z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_4px_10px_-3px_rgba(14,122,86,0.38),_0_0_0_1px_rgba(14,122,86,0.16)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                  <rect x="4" y="4" width="6" height="6" rx="1.2" />
                  <rect x="14" y="4" width="6" height="6" rx="1.2" />
                  <rect x="4" y="14" width="6" height="6" rx="1.2" />
                  <rect x="14" y="14" width="6" height="6" rx="1.2" />
                </svg>
              </div>
              <div className="text-[18px] font-extrabold font-display relative z-10">3</div>
              <div className="text-[9px] font-bold text-safai-text-dim uppercase tracking-wider mt-0.5 relative z-10">Levels Deep</div>
            </div>
          </div>
        </div>
      </section>

      {!isTreeView ? (
        <>
          {/* --- Search & List View --- */}
          <section className="mb-4">
            <div className="flex gap-2.5">
              <div className="flex-1 flex items-center gap-2 bg-white border border-safai-border rounded-xl p-[12px_14px] shadow-sm focus-within:border-safai-primary focus-within:ring-2 focus-within:ring-safai-primary-soft transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px] text-safai-text-faint">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search zones or locations…"
                  className="bg-transparent border-none outline-none text-[13px] w-full text-safai-text placeholder:text-safai-text-faint"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button className="w-[46px] h-[46px] rounded-xl bg-white border border-safai-border flex items-center justify-center text-safai-text-dim shadow-sm active:scale-95 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" className="w-[17px] h-[17px]">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </button>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] text-safai-text-dim font-semibold">
                Showing <b className="text-safai-text font-extrabold">{currentZones.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, filteredZones.length)}</b> of <b className="text-safai-text font-extrabold">{filteredZones.length}</b> zones
              </div>
              <div className="flex bg-safai-surface-soft rounded-[10px] p-[3px] gap-[2px]">
                <button
                  onClick={() => setViewMode("list")}
                  className={`w-[30px] h-[28px] rounded-[7px] flex items-center justify-center transition-all ${
                    viewMode === "list" ? "bg-white text-safai-primary-deep shadow-sm" : "text-safai-text-faint hover:text-safai-primary-deep"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-[14.5px] h-[14.5px]">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`w-[30px] h-[28px] rounded-[7px] flex items-center justify-center transition-all ${
                    viewMode === "grid" ? "bg-white text-safai-primary-deep shadow-sm" : "text-safai-text-faint hover:text-safai-primary-deep"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[14.5px] h-[14.5px]">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* List/Grid Container */}
            <div className={viewMode === "grid" ? "grid grid-cols-2 gap-2.5" : "flex flex-col gap-3"}>
              {currentZones.map((zone) =>
                viewMode === "grid" ? (
                  <ZoneGridCard key={zone.id} zone={zone} />
                ) : (
                  <ZoneListCard key={zone.id} zone={zone} />
                )
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-3.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="min-w-[32px] h-[32px] rounded-[10px] border border-safai-border bg-white text-safai-primary-deep flex items-center justify-center disabled:opacity-50 disabled:text-safai-text-faint active:scale-95 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[32px] h-[32px] rounded-[10px] font-display text-[12.5px] font-bold flex items-center justify-center transition-all ${
                      currentPage === pageNum
                        ? "bg-[linear-gradient(135deg,var(--color-safai-primary-deep),var(--color-safai-primary-2))] text-white shadow-[0_6px_14px_-4px_rgba(29,78,216,0.35)] border-transparent"
                        : "border border-safai-border bg-white text-safai-text-dim hover:text-safai-primary-deep hover:border-safai-primary active:scale-95"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="min-w-[32px] h-[32px] rounded-[10px] border border-safai-border bg-white text-safai-primary-deep flex items-center justify-center disabled:opacity-50 disabled:text-safai-text-faint active:scale-95 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            )}

            {/* Footer Summary */}
            <div className="flex items-center gap-3 bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] border border-safai-border rounded-2xl p-[14px_15px] mt-3.5 shadow-sm active:scale-95 transition-transform cursor-pointer">
              <div className="w-[38px] h-[38px] rounded-xl bg-[linear-gradient(140deg,var(--color-safai-primary)_0%,var(--color-safai-primary-2)_130%)] text-white flex items-center justify-center shrink-0 shadow-[0_4px_10px_-3px_var(--color-safai-primary)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 3 14 8 20 8" />
                  <path d="M9 13h6M9 17h6" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-safai-text-faint uppercase tracking-wider">Total zones registered</div>
                <div className="text-[22px] font-extrabold font-display text-safai-primary-deep mt-[1px]">39</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-safai-text-faint shrink-0">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

          </section>
        </>
      ) : (
        /* --- Tree / Org-Chart View --- */
        <section>
          <button
            onClick={() => setIsTreeView(false)}
            className="flex items-center gap-2 text-[12.5px] font-bold text-[#8F5608] bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-amber-soft)_100%)] border-[1.5px] border-safai-amber-soft p-[7px_14px_7px_7px] rounded-[13px] mb-3.5 shadow-[0_4px_12px_-6px_rgba(201,122,29,0.3)] active:scale-95 transition-transform"
          >
            <span className="w-6 h-6 rounded-lg bg-[linear-gradient(135deg,#8F5608_0%,var(--color-safai-amber)_60%,#FFC169_100%)] text-white flex items-center justify-center shrink-0 shadow-[0_3px_8px_-2px_rgba(201,122,29,0.5)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]"><polyline points="15 18 9 12 15 6" /></svg>
            </span>
            Back to list
          </button>
          
          <div className="flex flex-col gap-3.5">
            {treeRoots.map((root) => (
              <TreeNode key={root.id} node={root} isRoot />
            ))}
          </div>
        </section>
      )}

      {/* Floating Action Button */}
      <button className="absolute right-5 bottom-8 z-50 w-14 h-14 rounded-full bg-[linear-gradient(150deg,#8F5608_0%,var(--color-safai-amber)_55%,#FFC169_100%)] text-white flex items-center justify-center shadow-[0_12px_26px_-6px_rgba(201,122,29,0.5),_inset_0_1px_0_rgba(255,255,255,0.3)] active:scale-95 transition-transform border-none outline-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="w-6 h-6">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

    </main>
  );
}

// --- Sub-components for Cards & Tree ---

function ZoneListCard({ zone }) {
  const hasChildren = zone.children !== null;
  return (
    <div className="relative flex gap-3 bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] rounded-2xl p-[14px_14px_14px_16px] border border-safai-border shadow-[0_1px_1px_rgba(20,20,30,0.04),_0_10px_20px_-14px_rgba(20,20,30,0.14),_inset_0_1px_0_rgba(255,255,255,0.7)] overflow-hidden transition-transform hover:-translate-y-1">
      {/* Left Gradient Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-safai-primary to-safai-primary-2 opacity-40"></div>
      
      <div className="w-12 h-12 rounded-full bg-[linear-gradient(150deg,var(--color-safai-primary-soft)_0%,#fff_100%)] text-safai-primary-deep border-[1.5px] border-safai-primary-soft flex items-center justify-center text-[11.5px] font-extrabold font-display shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        {zone.id}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="text-[14.5px] font-bold font-display truncate">{zone.name}</div>
          <div className="flex items-center gap-2 shrink-0">
            {hasChildren ? (
              <span className="text-[10px] font-bold text-safai-primary-deep bg-safai-primary-soft p-[4px_10px] rounded-full whitespace-nowrap">
                {zone.children} Child Zone{zone.children === 1 ? "" : "s"}
              </span>
            ) : (
              <span className="text-[10px] font-bold text-safai-text-faint bg-safai-surface-soft p-[4px_10px] rounded-full whitespace-nowrap">—</span>
            )}
            <button className="text-safai-text-faint hover:text-safai-primary-deep transition-colors p-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-[11px] text-safai-text-dim font-medium">Parent Hierarchy</div>
            <div className={`text-[12.5px] mt-[1px] ${zone.parent ? "font-bold text-safai-text" : "font-semibold text-safai-text-faint"}`}>
              {zone.parent || "—"}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="w-8 h-8 rounded-lg bg-[#EAF2FE] text-[#2E6FE0] border-[1.5px] border-[#D7E7FD] flex items-center justify-center active:scale-95 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-safai-amber-soft text-[#8F5608] border-[1.5px] border-[#F6DBA6] flex items-center justify-center active:scale-95 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-safai-red-soft text-safai-red border-[1.5px] border-[#F9CFD6] flex items-center justify-center active:scale-95 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoneGridCard({ zone }) {
  const hasChildren = zone.children !== null;
  return (
    <div className="relative bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] border border-safai-border rounded-2xl p-[12px_12px_11px] flex flex-col gap-2 overflow-hidden shadow-[0_1px_1px_rgba(20,20,30,0.04),_0_10px_20px_-14px_rgba(20,20,30,0.14),_inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform hover:scale-[1.01]">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-safai-primary to-safai-primary-2 opacity-40"></div>
      
      <div className="flex items-start justify-between gap-1.5">
        <div className="w-[34px] h-[34px] rounded-lg bg-[linear-gradient(150deg,var(--color-safai-primary-soft)_0%,#fff_100%)] text-safai-primary-deep border-[1.5px] border-safai-primary-soft flex items-center justify-center text-[9.5px] font-extrabold font-display shrink-0">
          {zone.id}
        </div>
        <button className="text-safai-text-faint p-1 hover:text-safai-primary-deep transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>
        </button>
      </div>

      <div>
        <div className="text-[13px] font-bold font-display truncate">{zone.name}</div>
        <div className="text-[10.5px] text-safai-text-faint font-semibold mt-[1px]">
          {zone.parent ? <>Under <b className="text-safai-text font-bold">{zone.parent}</b></> : "Top-level zone"}
        </div>
      </div>

      {hasChildren ? (
        <span className="self-start text-[9.5px] font-bold text-safai-primary-deep bg-safai-primary-soft p-[3px_8px] rounded-full whitespace-nowrap">
          {zone.children} Child Zone{zone.children === 1 ? "" : "s"}
        </span>
      ) : (
        <span className="self-start text-[9.5px] font-bold text-safai-text-faint bg-safai-surface-soft p-[3px_8px] rounded-full whitespace-nowrap">—</span>
      )}

      <div className="flex gap-1.5 mt-[1px]">
        <button className="flex-1 h-7 rounded-lg bg-[#EAF2FE] text-[#2E6FE0] border-[1.5px] border-[#D7E7FD] flex items-center justify-center active:scale-95 transition-transform">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>
        </button>
        <button className="flex-1 h-7 rounded-lg bg-safai-amber-soft text-[#8F5608] border-[1.5px] border-[#F6DBA6] flex items-center justify-center active:scale-95 transition-transform">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
        </button>
        <button className="flex-1 h-7 rounded-lg bg-safai-red-soft text-safai-red border-[1.5px] border-[#F9CFD6] flex items-center justify-center active:scale-95 transition-transform">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    </div>
  );
}

function TreeNode({ node, isRoot = false }) {
  const hasChildren = node.kids && node.kids.length > 0;
  
  if (isRoot) {
    return (
      <div>
        <div className="flex items-center gap-3 p-3.5 rounded-[15px] bg-[linear-gradient(165deg,#FFFFFF_0%,var(--color-safai-surface-tint)_100%)] border border-safai-border shadow-[0_1px_1px_rgba(20,20,30,0.04),_0_10px_20px_-14px_rgba(20,20,30,0.14),_0_0_0_1px_rgba(59,130,246,0.06)] cursor-pointer active:scale-95 transition-transform">
          <div className="w-9 h-9 rounded-xl bg-[linear-gradient(135deg,var(--color-safai-primary),var(--color-safai-primary-2))] text-white flex items-center justify-center shrink-0 shadow-[0_4px_10px_-3px_rgba(59,130,246,0.45)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]"><circle cx="12" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="19" r="2.2"/><path d="M12 7.2V12M12 12H6v4.8M12 12h6v4.8"/></svg>
          </div>
          <div>
            <div className="text-[14.5px] font-extrabold font-display text-safai-text">{node.name}</div>
            <div className="text-[10.5px] font-semibold text-safai-text-dim mt-[1px] opacity-75">{node.id} · Root location</div>
          </div>
        </div>
        {hasChildren && (
          <div className="ml-[17px] pl-0 mt-0.5 border-l-2 border-dashed border-[rgba(59,130,246,0.25)]">
            {node.kids.map((kid) => (
              <TreeNode key={kid.id} node={kid} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative p-[9px_0_9px_22px] before:absolute before:left-0 before:top-[19px] before:w-4 before:h-[2px] before:bg-[rgba(59,130,246,0.25)]">
      <div className="flex items-center gap-2.5 rounded-lg p-[4px_6px] -mx-1.5 transition-colors cursor-pointer hover:bg-safai-primary-soft">
        <span className="w-2 h-2 rounded-full bg-safai-primary shrink-0 shadow-[0_0_0_3px_var(--color-safai-primary-soft)]"></span>
        <span className="text-[12.5px] font-bold flex-1 min-w-0 truncate text-safai-text">{node.name}</span>
        {node.children !== null ? (
          <span className="text-[9px] font-bold text-safai-primary-deep bg-safai-primary-soft p-[2px_7px] rounded-full shrink-0">
            {node.children} Child{node.children === 1 ? "" : "s"}
          </span>
        ) : (
          <span className="text-[9px] font-bold text-safai-text-faint bg-safai-surface-soft p-[2px_7px] rounded-full shrink-0">—</span>
        )}
      </div>
      {hasChildren && (
        <div className="ml-[3px] mt-1 border-l-2 border-dashed border-[rgba(59,130,246,0.25)]">
          {node.kids.map((kid) => (
            <TreeNode key={kid.id} node={kid} />
          ))}
        </div>
      )}
    </div>
  );
}