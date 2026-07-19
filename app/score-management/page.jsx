'use client';

import React, { useState, useMemo } from 'react';

// --- Initial Data ---
const INITIAL_REVIEWS = [
  { _id: 1, cleaner: "Ravi Kulkarni", location: "Dharampeth, Nagpur", company: "Ikje", date: "2026-07-14", photos: 5, original: 6.4, modified: 8.2, status: "Complete", modBy: "Omkar P.", modAt: "14 Jul, 10:22 am" },
  { _id: 2, cleaner: "Sneha Patil", location: "Civil Lines, Nagpur", company: "Pearls", date: "2026-07-14", photos: 3, original: 9.2, modified: 9.2, status: "Ongoing", modBy: "—", modAt: "—" },
  { _id: 3, cleaner: "Arjun Deshmukh", location: "Wardha Road, Nagpur", company: "HIOKEU Corp", date: "2026-07-13", photos: 6, original: 5.6, modified: 4.2, status: "Complete", modBy: "Priya S.", modAt: "13 Jul, 04:05 pm" },
  { _id: 4, cleaner: "Meera Joshi", location: "Trimurti Nagar, Nagpur", company: "Nimbus Facilities", date: "2026-07-13", photos: 4, original: 7.8, modified: 8.8, status: "Complete", modBy: "Omkar P.", modAt: "13 Jul, 02:47 pm" },
];

const PAGE_SIZE = 5;
const avatarPalettes = [
  ["#3B82F6","#60A5FA"], ["#F0A527","#F7C15C"], ["#FF6B57","#FF9C8C"],
  ["#38BDF8","#7DD3FC"], ["#159A6B","#3FC28E"], ["#8B5CF6","#B39DFB"]
];

function getInitials(name) {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g,'').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function ScoreManagement() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ company: "", date: "", status: "", reviewType: "", range: "" });
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [toast, setToast] = useState({ msg: "", show: false });
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  
  // Unique companies for select
  const companies = useMemo(() => Array.from(new Set(reviews.map(r => r.company))).sort(), [reviews]);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast({ msg, show: false }), 2000);
  };

  const inRange = (score, range) => {
    if (!range) return true;
    const [min, max] = range.split('-').map(Number);
    return score >= min && score <= max;
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      if (query && !r.cleaner.toLowerCase().includes(query.toLowerCase()) && !r.location.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.company && r.company !== filters.company) return false;
      if (filters.date && r.date !== filters.date) return false;
      if (filters.status && r.status !== filters.status) return false;
      if (filters.reviewType === "modified" && r.original === r.modified) return false;
      if (filters.reviewType === "original" && r.original !== r.modified) return false;
      if (filters.range && !inRange(r.modified, filters.range)) return false;
      return true;
    });
  }, [reviews, query, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / PAGE_SIZE));
  const paginatedReviews = cardsRevealed ? filteredReviews.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE) : [];

  const handleResetFilters = () => {
    setFilters({ company: "", date: "", status: "", reviewType: "", range: "" });
    setQuery("");
    setCurrentPage(1);
    setCardsRevealed(true);
    showToast('Filters reset');
  };

  const saveScoreEdit = (id) => {
    const val = parseFloat(editValue);
    if (isNaN(val) || val < 0 || val > 10) {
      showToast('Enter a valid score (0-10)');
      return;
    }
    setReviews(prev => prev.map(r => {
      if (r._id === id) {
        return { ...r, modified: val, modAt: 'Just now', modBy: 'Admin' };
      }
      return r;
    }));
    setEditingId(null);
    showToast('Score updated successfully');
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#EAF1EE] font-body">
      <div className="w-full max-w-md h-[100dvh] bg-safai-bg flex flex-col relative text-safai-text shadow-2xl sm:border-x border-safai-border overflow-hidden">
        
        {/* Topbar */}
        <div className="flex items-center gap-3 p-4 pb-3.5 bg-gradient-to-b from-white to-safai-surface-tint border-b border-safai-border relative z-10 shrink-0 shadow-sm">
          <button className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-safai-surface-soft to-white flex items-center justify-center text-safai-text shrink-0 active:scale-95 border border-safai-border">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <span className="w-[34px] h-[34px] rounded-[11px] bg-safai-primary-soft text-safai-primary-deep flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
            </span>
            <div className="min-w-0">
              <div className="text-[18px] font-extrabold font-display tracking-tight leading-tight">Score Management</div>
              <div className="text-[11.5px] text-safai-text-dim font-medium truncate">Review and manage cleaner scores</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto hide-scrollbar p-4 flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint pointer-events-none"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              value={query} 
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }} 
              className="w-full py-3 pr-3.5 pl-10 rounded-2xl border border-safai-border bg-safai-surface text-[13.5px] font-medium text-safai-text outline-none shadow-safai-sm focus:border-safai-primary-2 focus:ring-[3px] focus:ring-safai-primary-soft placeholder:text-safai-text-faint" 
              placeholder="Search by cleaner name or location…" 
            />
          </div>

          {/* Grid Filters */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative">
              <label className="flex items-center gap-1.5 text-[10.5px] font-bold text-safai-text-dim mb-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>
                Company
              </label>
              <select 
                value={filters.company} 
                onChange={e => setFilters({...filters, company: e.target.value})} 
                className="w-full py-2.5 pl-3 pr-8 rounded-xl border border-safai-border bg-safai-surface text-[12.5px] font-semibold text-safai-text outline-none shadow-safai-sm appearance-none focus:border-safai-primary-2 focus:ring-[3px] focus:ring-safai-primary-soft truncate"
              >
                <option value="">Select company</option>
                {companies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="relative">
              <label className="flex items-center gap-1.5 text-[10.5px] font-bold text-safai-text-dim mb-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Date
              </label>
              <input 
                type="date" 
                value={filters.date} 
                onChange={e => { setFilters({...filters, date: e.target.value}); setCardsRevealed(true); }} 
                className="w-full py-2.5 px-3 rounded-xl border border-safai-border bg-safai-surface text-[12.5px] font-semibold text-safai-text outline-none shadow-safai-sm focus:border-safai-primary-2 focus:ring-[3px] focus:ring-safai-primary-soft"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-safai-text-dim bg-safai-surface border border-safai-border py-2 px-3 rounded-xl flex-1 min-w-0">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-safai-text-dim" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
              <span><b className="text-safai-text font-display">{cardsRevealed ? filteredReviews.length : 0}</b> reviews</span>
            </div>
            <button onClick={() => setIsFilterSheetOpen(true)} className="flex items-center gap-1.5 text-[12px] font-bold text-safai-text bg-gradient-to-br from-safai-surface-soft to-white border border-safai-border py-2 px-3 rounded-xl shrink-0 relative active:scale-95 transition-transform">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filters
              {(filters.status || filters.reviewType || filters.range) && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-safai-primary border-2 border-white"></span>}
            </button>
            <button onClick={() => cardsRevealed ? setCardsRevealed(false) : handleResetFilters()} className="flex items-center gap-1.5 text-[12px] font-bold text-safai-red bg-safai-red-soft py-2 px-3 rounded-xl shrink-0 active:scale-95 transition-transform">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              Reset
            </button>
          </div>

          {/* List */}
          <div className="bg-safai-surface border border-safai-border rounded-[18px] shadow-safai-sm p-3 flex flex-col gap-2.5">
            {!cardsRevealed || paginatedReviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-5 text-center">
                <div className="w-14 h-14 rounded-[18px] bg-safai-surface-soft border border-safai-border flex items-center justify-center text-safai-text-faint mb-4">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/></svg>
                </div>
                <div className="text-[14.5px] font-bold font-display">No reviews found</div>
                <div className="text-[12px] text-safai-text-faint mt-1 max-w-[230px]">Try adjusting filters or resetting your current search</div>
              </div>
            ) : (
              paginatedReviews.map((r, i) => (
                <div key={r._id} className={`rounded-[18px] p-3.5 shadow-safai-sm border ${r.status === 'Complete' ? 'bg-gradient-to-br from-white to-[#E3FAEC] border-[#0E7A5638] border-l-4 border-l-[#159A6B]' : 'bg-gradient-to-br from-white to-[#FFF3DC] border-[#B0770838] border-l-4 border-l-[#F0A527]'}`}>
                  {/* Card Top */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-[38px] h-[38px] rounded-xl text-white font-extrabold text-[14px] font-display flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${avatarPalettes[i % avatarPalettes.length][0]}, ${avatarPalettes[i % avatarPalettes.length][1]})` }}>
                      {getInitials(r.cleaner)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold text-safai-text-faint font-display">#{r._id}</span>
                        <span className="text-[14.5px] font-bold font-display truncate">{r.cleaner}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 mt-1 text-safai-primary-deep text-[11px] font-bold bg-safai-primary-soft border border-safai-primary-soft py-0.5 px-2.5 rounded-full">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span className="truncate max-w-[120px]">{r.location}</span>
                      </div>
                    </div>
                    <span className={`text-[9.5px] font-extrabold tracking-wide px-2.5 py-1 rounded-full border ${r.status === 'Complete' ? 'bg-[#E3FAEC] text-[#159A6B] border-[#0E7A5638]' : 'bg-[#FFF3DC] text-[#8A5D06] border-[#B0770838]'}`}>
                      {r.status}
                    </span>
                  </div>

                  <div className="h-px bg-safai-border my-2.5"></div>

                  {/* Score Box */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 bg-safai-surface-soft border border-safai-border rounded-[11px] p-1.5 text-center">
                      <div className="text-[8.5px] font-bold text-safai-text-faint uppercase tracking-wider">Original</div>
                      <div className="text-[13px] font-extrabold font-display mt-0.5 text-safai-text">{r.original.toFixed(1)}</div>
                    </div>
                    
                    <div className={`min-w-[24px] py-1 rounded-[10px] flex flex-col items-center justify-center border ${r.modified > r.original ? 'bg-[#E3FAEC] text-[#159A6B] border-[#0E7A5638]' : r.modified < r.original ? 'bg-safai-red-soft text-safai-red border-safai-red-soft' : 'bg-safai-surface-soft text-safai-text-faint border-safai-border'}`}>
                       <span className="text-[7.5px] font-extrabold font-display tracking-tight">{r.modified === r.original ? '0.0' : (r.modified > r.original ? `+${(r.modified - r.original).toFixed(1)}` : (r.modified - r.original).toFixed(1))}</span>
                    </div>

                    <div className="flex-1 bg-safai-primary-soft border border-safai-primary-soft rounded-[11px] p-1.5 text-center relative">
                      {editingId === r._id ? (
                        <>
                          <div className="text-[8.5px] font-bold text-safai-text-faint uppercase tracking-wider">Edit</div>
                          <div className="flex items-center justify-center gap-1 mt-0.5">
                            <input type="number" value={editValue} onChange={e => setEditValue(e.target.value)} className="w-[38px] text-[12.5px] font-extrabold font-display text-center border-[1.5px] border-safai-primary-2 rounded-md px-0.5 outline-none text-safai-primary-deep" autoFocus />
                            <button onClick={() => saveScoreEdit(r._id)} className="w-[18px] h-[18px] rounded-md bg-[#E3FAEC] text-[#159A6B] flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></button>
                            <button onClick={() => setEditingId(null)} className="w-[18px] h-[18px] rounded-md bg-safai-red-soft text-safai-red flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                          </div>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingId(r._id); setEditValue(r.modified.toFixed(1)); }} className="absolute top-[3px] right-[3px] w-[26px] h-[26px] rounded-lg bg-white/75 shadow-sm text-safai-primary-deep flex items-center justify-center hover:bg-white transition-colors">
                            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>
                          </button>
                          <div className="text-[8.5px] font-bold text-safai-text-faint uppercase tracking-wider">Modified</div>
                          <div className={`text-[13px] font-extrabold font-display mt-0.5 ${r.modified >= 8 ? 'text-[#159A6B]' : r.modified >= 5 ? 'text-[#F0A527]' : 'text-safai-red'}`}>{r.modified.toFixed(1)}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Notification Toast */}
        {toast.show && (
          <div className="absolute left-1/2 bottom-8 -translate-x-1/2 bg-[#101915] text-white text-[12.5px] font-semibold py-2.5 px-4 rounded-xl shadow-xl z-50 transition-all duration-300 pointer-events-none truncate max-w-[80%]">
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  );
}