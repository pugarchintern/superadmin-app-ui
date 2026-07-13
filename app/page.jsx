"use client";

import React, { useState } from "react";

// --- Mock Data (Converted from your vanilla JS) ---
const rankedWashrooms = [
  { name: 'Test89', score: 9.4, medal: 'linear-gradient(135deg,#FFC24B,#F0A527)', bar: 'linear-gradient(90deg,#FFC24B,#F0A527)' },
  { name: 'Ground Floor Washroom A', score: 8.9, medal: 'linear-gradient(135deg,#5FA8FF,#3E8BFF)', bar: 'linear-gradient(90deg,#5FA8FF,#3E8BFF)' },
  { name: 'Tower A - Ground Floor Washroom', score: 8.3, medal: 'linear-gradient(135deg,#B79BFF,#8B7CFF)', bar: 'linear-gradient(90deg,#B79BFF,#8B7CFF)' },
  { name: 'Tectura amet archit', score: 7.6, medal: 'linear-gradient(135deg,#60A5FA,#3B82F6)', bar: 'linear-gradient(90deg,#60A5FA,#3B82F6)' },
  { name: 'xyz', score: 6.8, medal: '#AEB3BF', bar: 'linear-gradient(90deg,#C7CBD4,#AEB3BF)' }
];

const activityFeed = [
  { text: 'Cleaning completed at Parsi Toilet', time: '2 min ago', status: 'Completed', bg: 'bg-safai-primary-soft', fg: 'text-safai-primary-deep', icon: <><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></> },
  { text: 'New repair request at Ground Floor Washroom A', time: '11 min ago', status: 'Pending', bg: 'bg-safai-amber-soft', fg: 'text-safai-amber', icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a4 4 0 0 1-5.4 5.4L7 20l-3-3 8.4-8.4a4 4 0 0 1 5.4-5.4z"/> },
  { text: 'Inspection completed at Tower A - GF Washroom', time: '24 min ago', status: 'Reviewed', bg: 'bg-safai-blue-soft', fg: 'text-safai-blue', icon: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></> },
  { text: 'Cleaner assigned to AT1', time: '38 min ago', status: 'Assigned', bg: 'bg-safai-red-soft', fg: 'text-safai-red', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> }
];

export default function Home() {
  const [heatRange, setHeatRange] = useState("31D");

  return (
    <main className="px-4 pt-[18px] pb-1 w-full">
      
      {/* SECTION 1: Facility Pulse */}
      <section className="mb-5">
        <div className="bg-gradient-to-br from-[#1D4ED8] via-[#3B82F6] to-[#60A5FA] rounded-[26px] p-5 pb-[18px] text-white relative overflow-hidden shadow-[0_16px_34px_-12px_rgba(14,110,95,.55)]">
          <div className="absolute -top-[60px] -right-[50px] w-[170px] h-[170px] rounded-full bg-white/10 animate-pulseFloat"></div>
          <div className="absolute -bottom-[70px] -left-[40px] w-[150px] h-[150px] rounded-full bg-[#7DD3FC]/10 animate-pulseFloatReverse"></div>
          
          <div className="flex items-center justify-between relative z-10 mb-3.5">
            <div>
              <div className="text-[10.5px] font-bold tracking-[.08em] uppercase opacity-80">Facility Pulse</div>
              <div className="text-base font-bold font-display mt-0.5">Corporate Building1</div>
            </div>
            <span className="flex items-center gap-1.5 text-[9.5px] font-extrabold bg-white/16 px-2.5 py-1.5 rounded-[20px] backdrop-blur-[4px]">
              <i className="w-1.5 h-1.5 rounded-full bg-safai-lime-2 inline-block shadow-[0_0_0_3px_rgba(125,211,252,.35)] animate-livePulse"></i>LIVE
            </span>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="relative w-[128px] h-[128px] shrink-0">
              <svg width="128" height="128" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="9"/>
                <circle cx="64" cy="64" r="42" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="9"/>
                <circle cx="64" cy="64" r="28" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="9"/>
                <circle cx="64" cy="64" r="56" fill="none" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" strokeDasharray="351.9" strokeDashoffset="218" transform="rotate(-90 64 64)"/>
                <circle cx="64" cy="64" r="42" fill="none" stroke="#7DD3FC" strokeWidth="9" strokeLinecap="round" strokeDasharray="263.9" strokeDashoffset="114" transform="rotate(-90 64 64)"/>
                <circle cx="64" cy="64" r="28" fill="none" stroke="#3E8BFF" strokeWidth="9" strokeLinecap="round" strokeDasharray="175.9" strokeDashoffset="167" transform="rotate(-90 64 64)"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[26px] font-extrabold font-display leading-none tracking-tight">3.80</div>
                <div className="text-[8.5px] font-bold tracking-[.06em] uppercase opacity-75 mt-[3px]">/ 10 score</div>
              </div>
            </div>

            <div className="flex flex-col gap-[9px] flex-1 min-w-0">
              <div className="flex items-center gap-[9px]">
                <span className="w-[9px] h-[9px] rounded-[3px] shrink-0 bg-white"></span>
                <span className="text-[11px] font-semibold opacity-85 flex-1 min-w-0">Cleanliness score</span>
                <span className="text-[13px] font-extrabold font-display shrink-0 tracking-tight">38%</span>
              </div>
              <div className="flex items-center gap-[9px]">
                <span className="w-[9px] h-[9px] rounded-[3px] shrink-0 bg-[#7DD3FC]"></span>
                <span className="text-[11px] font-semibold opacity-85 flex-1 min-w-0">Cleaner coverage</span>
                <span className="text-[13px] font-extrabold font-display shrink-0 tracking-tight">57%</span>
              </div>
              <div className="flex items-center gap-[9px]">
                <span className="w-[9px] h-[9px] rounded-[3px] shrink-0 bg-[#3E8BFF]"></span>
                <span className="text-[11px] font-semibold opacity-85 flex-1 min-w-0">Tasks completed</span>
                <span className="text-[13px] font-extrabold font-display shrink-0 tracking-tight">95%</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-white/20 my-4 relative z-10"></div>
          
          <div className="flex items-center justify-between text-[10.5px] font-bold tracking-[.05em] uppercase opacity-75 mb-2.5 relative z-10">
            <span>Top 5 locations by score</span>
          </div>
          
          <div className="flex flex-col gap-[9px] relative z-10">
            {['Test89', 'Voluptatum…', 'tej-test', 'Parsi Toilet', 'Chinchbhav…'].map((loc, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-[92px] shrink-0 text-[11.5px] font-semibold truncate">{loc}</div>
                <div className="flex-1 h-1.5 bg-white/20 rounded-[3px] overflow-hidden">
                  <div className="h-full rounded-[3px] bg-gradient-to-r from-[#FFB020] to-[#FFE29A]" style={{ width: "100%" }}></div>
                </div>
                <div className="w-10 text-right shrink-0 text-[11.5px] font-extrabold font-display">10.00</div>
              </div>
            ))}
          </div>

          <button className="flex items-center justify-center gap-1 text-xs font-bold text-white bg-white/15 p-2.5 rounded-xl mt-3.5 w-full relative z-10 border-none tap-fx">
            View All Locations
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </section>

      {/* SECTION 2: At A Glance Blocks */}
      <section className="mb-5">
        <div className="flex items-center justify-between mb-[13px] gap-2">
          <div className="flex items-center gap-[9px] min-w-0">
            <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_currentColor] bg-safai-blue-soft text-safai-blue">
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
            </div>
            <div className="text-[15px] font-extrabold tracking-tight font-display">At a glance</div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto px-[2px] pb-2.5 -mx-[2px] snap-x snap-proximity hide-scrollbar">
          {/* Card 1 */}
          <div className="shrink-0 w-[148px] snap-start bg-gradient-to-br from-white to-safai-surface-tint rounded-[20px] p-[15px] pb-[14px] shadow-[0_1px_1px_rgba(16,25,21,.03),0_14px_26px_-12px_var(--stat-glow),0_3px_8px_-2px_rgba(16,25,21,.06),inset_0_1px_0_rgba(255,255,255,.8)] border border-white/90 relative overflow-hidden tap-fx transition-all duration-200" style={{ "--stat-glow": "rgba(62,139,255,.30)", "--stat-accent": "#3E8BFF", "--stat-accent-2": "#7FB3FF", "--stat-icon-glow": "rgba(62,139,255,.45)", "--stat-icon-ring": "rgba(62,139,255,.16)" }}>
            <div className="flex items-center justify-between mb-[13px] relative z-10">
              <div className="w-[36px] h-[36px] rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_var(--stat-icon-glow),0_0_0_1px_var(--stat-icon-ring)] bg-safai-blue-soft text-safai-blue">
                <svg className="w-[17px] h-[17px] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="text-[24px] font-extrabold tracking-tight relative z-10 font-display text-safai-text leading-none">53</div>
            </div>
            <div className="text-[10.5px] text-safai-text-dim font-bold mt-[3px] leading-tight relative z-10 uppercase tracking-[.02em]">Total Toilets</div>
            <div className="flex items-end gap-[2px] h-[18px] mt-[11px] relative z-10 *:flex-1 *:rounded-t-[2px] *:bg-safai-surface-soft *:block">
              <i style={{ height: "40%" }}></i><i style={{ height: "55%" }}></i><i style={{ height: "35%" }}></i><i style={{ height: "70%" }} className="!bg-safai-blue"></i><i style={{ height: "60%" }} className="!bg-safai-blue"></i><i style={{ height: "80%" }} className="!bg-safai-blue"></i>
            </div>
            <div className="inline-flex items-center gap-[3px] text-[9.5px] font-extrabold mt-[9px] px-[7px] py-[3px] rounded-[20px] relative z-10 text-safai-primary-deep bg-safai-primary-soft">
              <svg className="w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              8% vs last week
            </div>
          </div>
          {/* Card 2 */}
          <div className="shrink-0 w-[148px] snap-start bg-gradient-to-br from-white to-safai-surface-tint rounded-[20px] p-[15px] pb-[14px] shadow-[0_1px_1px_rgba(16,25,21,.03),0_14px_26px_-12px_var(--stat-glow),0_3px_8px_-2px_rgba(16,25,21,.06),inset_0_1px_0_rgba(255,255,255,.8)] border border-white/90 relative overflow-hidden tap-fx transition-all duration-200" style={{ "--stat-glow": "rgba(92,138,42,.28)", "--stat-accent": "#7CB342", "--stat-accent-2": "#AEDC5F", "--stat-icon-glow": "rgba(92,138,42,.42)", "--stat-icon-ring": "rgba(92,138,42,.16)" }}>
            <div className="flex items-center justify-between mb-[13px] relative z-10">
              <div className="w-[36px] h-[36px] rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_var(--stat-icon-glow),0_0_0_1px_var(--stat-icon-ring)] bg-safai-lime-soft text-[#5C8A2A]">
                <svg className="w-[17px] h-[17px] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/></svg>
              </div>
              <div className="text-[24px] font-extrabold tracking-tight relative z-10 font-display text-safai-text leading-none">0</div>
            </div>
            <div className="text-[10.5px] text-safai-text-dim font-bold mt-[3px] leading-tight relative z-10 uppercase tracking-[.02em]">Ongoing Tasks</div>
            <div className="flex items-end gap-[2px] h-[18px] mt-[11px] relative z-10 *:flex-1 *:rounded-t-[2px] *:bg-safai-surface-soft *:block">
              <i style={{ height: "20%" }}></i><i style={{ height: "20%" }}></i><i style={{ height: "20%" }}></i><i style={{ height: "20%" }}></i><i style={{ height: "20%" }}></i><i style={{ height: "20%" }}></i>
            </div>
            <div className="inline-flex items-center gap-[3px] text-[9.5px] font-extrabold mt-[9px] px-[7px] py-[3px] rounded-[20px] relative z-10 text-safai-text-faint bg-safai-surface-soft">— No change</div>
          </div>
          {/* Card 3 */}
          <div className="shrink-0 w-[148px] snap-start bg-gradient-to-br from-white to-safai-surface-tint rounded-[20px] p-[15px] pb-[14px] shadow-[0_1px_1px_rgba(16,25,21,.03),0_14px_26px_-12px_var(--stat-glow),0_3px_8px_-2px_rgba(16,25,21,.06),inset_0_1px_0_rgba(255,255,255,.8)] border border-white/90 relative overflow-hidden tap-fx transition-all duration-200" style={{ "--stat-glow": "rgba(29,78,216,.30)", "--stat-accent": "#1D4ED8", "--stat-accent-2": "#60A5FA", "--stat-icon-glow": "rgba(29,78,216,.45)", "--stat-icon-ring": "rgba(29,78,216,.16)" }}>
            <div className="flex items-center justify-between mb-[13px] relative z-10">
              <div className="w-[36px] h-[36px] rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_var(--stat-icon-glow),0_0_0_1px_var(--stat-icon-ring)] bg-safai-primary-soft text-safai-primary-deep">
                <svg className="w-[17px] h-[17px] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <div className="text-[24px] font-extrabold tracking-tight relative z-10 font-display text-safai-text leading-none">0</div>
            </div>
            <div className="text-[10.5px] text-safai-text-dim font-bold mt-[3px] leading-tight relative z-10 uppercase tracking-[.02em]">Completed Tasks</div>
            <div className="flex items-end gap-[2px] h-[18px] mt-[11px] relative z-10 *:flex-1 *:rounded-t-[2px] *:bg-safai-surface-soft *:block">
              <i style={{ height: "30%" }}></i><i style={{ height: "45%" }}></i><i style={{ height: "38%" }}></i><i style={{ height: "60%" }} className="!bg-safai-primary"></i><i style={{ height: "75%" }} className="!bg-safai-primary"></i><i style={{ height: "90%" }} className="!bg-safai-primary"></i>
            </div>
            <div className="inline-flex items-center gap-[3px] text-[9.5px] font-extrabold mt-[9px] px-[7px] py-[3px] rounded-[20px] relative z-10 text-safai-primary-deep bg-safai-primary-soft">
              <svg className="w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              29% vs last week
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Charts */}
      <section className="mb-5">
        <div className="bg-gradient-to-br from-white to-safai-surface-tint rounded-[20px] p-4 shadow-safai-sm border border-safai-border transition-all duration-150">
          <div className="flex items-start justify-between gap-2.5 mb-3.5">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-[32px] h-[32px] rounded-[11px] bg-gradient-to-br from-safai-primary-soft to-white text-safai-primary-deep flex items-center justify-center shrink-0 mt-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,.8),_0_4px_10px_-3px_currentColor]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="20" x2="6" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="14"/></svg>
              </div>
              <div>
                <div className="text-[13px] font-extrabold tracking-[.01em] font-display">Weekly Cleaner Performance</div>
                <div className="text-[11px] text-safai-text-faint font-medium mt-0.5">Assigned vs completed tasks</div>
              </div>
            </div>
          </div>

          <div className="flex items-stretch gap-1.5 h-[114px] mb-2">
            <div className="flex flex-col justify-between items-end pb-0 w-4 shrink-0 *:text-[9px] *:text-safai-text-faint *:font-semibold *:leading-none">
              <span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
            </div>
            <div className="flex-1 flex items-end gap-2">
              {[44, 64, 70, 56, 90, 40, 65].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative">
                  {h === 90 && <span className="absolute -top-[18px] text-[9px] font-extrabold text-safai-primary-deep font-display">6</span>}
                  <div className={`w-full max-w-[22px] rounded-[8px_8px_4px_4px] min-h-[5px] ${h === 90 ? 'bg-gradient-to-b from-[#fff2a8] to-safai-amber' : 'bg-gradient-to-b from-safai-lime-2 to-safai-primary'}`} style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mb-3.5 pl-[22px] *:flex-1 *:text-center *:text-[10px] *:text-safai-text-faint *:font-semibold">
            <span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span className="!text-safai-primary-deep !font-extrabold">Wed</span><span>Thu</span><span>Fri</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-gradient-to-br from-safai-surface-soft to-white rounded-[13px] p-[11px_12px]">
              <div className="text-[10px] text-safai-text-dim font-semibold flex items-center gap-[3px]">Total Tasks Completed</div>
              <div className="text-[17px] font-extrabold mt-[3px] font-display leading-tight">0</div>
              <div className="text-[10px] text-safai-primary-deep font-bold mt-0.5">↑ 8%</div>
            </div>
            <div className="bg-gradient-to-br from-safai-surface-soft to-white rounded-[13px] p-[11px_12px]">
              <div className="text-[10px] text-safai-text-dim font-semibold flex items-center gap-[3px]">Average / Day</div>
              <div className="text-[17px] font-extrabold mt-[3px] font-display leading-tight">0</div>
              <div className="text-[10px] text-safai-primary-deep font-bold mt-0.5">↑ 2%</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Hygiene Heatmap (Shell) */}
      <section className="mb-5">
        <div className="bg-gradient-to-br from-white to-safai-surface-tint rounded-[20px] p-4 shadow-safai-sm border border-safai-border">
          <div className="flex items-start gap-2.5 min-w-0 mb-3.5">
            <div className="w-[32px] h-[32px] rounded-[11px] bg-gradient-to-br from-safai-primary-soft to-white text-safai-primary-deep flex items-center justify-center shrink-0 mt-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,.8),_0_4px_10px_-3px_currentColor]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V6H9.5A2.5 2.5 0 0 1 7 3.5v0A2.5 2.5 0 0 1 9.5 2z"/><path d="M20.5 12A2.5 2.5 0 0 1 18 14.5H16.5V12A2.5 2.5 0 0 1 19 9.5h0A2.5 2.5 0 0 1 20.5 12z"/><path d="M2 9.5A2.5 2.5 0 0 1 4.5 7H6v2.5A2.5 2.5 0 0 1 3.5 12h0A2.5 2.5 0 0 1 2 9.5z"/><path d="M12 6h6a2 2 0 0 1 2 2v3.5"/><path d="M6 9.5V16a2 2 0 0 0 2 2h4"/></svg>
            </div>
            <div>
              <div className="text-[13px] font-extrabold tracking-[.01em] font-display">Hygiene Performance Heatmap</div>
              <div className="text-[11px] text-safai-text-faint font-medium mt-0.5">Daily hygiene scores by washroom (0-10)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex bg-safai-surface-soft rounded-[11px] p-[3px] gap-[2px]">
              {['7D', '31D', '90D'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setHeatRange(tab)}
                  className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${heatRange === tab ? 'bg-gradient-to-br from-white to-[#F5FBFA] text-safai-primary-deep shadow-[0_1px_4px_rgba(30,58,138,.12)]' : 'text-safai-text-dim bg-transparent'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative rounded-2xl bg-gradient-to-br from-safai-surface-soft to-white border border-safai-border p-[10px_4px_8px_10px] shadow-[inset_0_1px_4px_rgba(16,25,21,.045)]">
             <div className="text-center text-xs text-safai-text-faint py-8">
               {/* Note: The extensive JS heatmap table logic was here. To keep performance high in React, build a separate <HeatmapTable /> component that generates your grid. */}
               [ Heatmap Data Grid Renders Here ]
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Washrooms & Activity */}
      <section className="mb-5 flex flex-col gap-3.5">
        
        {/* Top Rated Washrooms */}
        <div className="bg-gradient-to-br from-white to-safai-surface-tint rounded-[20px] p-4 shadow-safai-sm border border-safai-border">
          <div className="flex items-center justify-between gap-1.5 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_currentColor] bg-safai-amber-soft text-safai-amber">
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a2 2 0 0 1 2 2 4 4 0 0 1-4 4M7 5H4a2 2 0 0 0-2 2 4 4 0 0 0 4 4"/></svg>
              </div>
              <div className="text-[12.5px] font-bold font-display leading-[1.25]">Top Rated Washrooms</div>
            </div>
          </div>

          <div className="flex flex-col">
            {rankedWashrooms.map((r, i) => {
              const isFirst = i === 0;
              const filled = Math.round(r.score / 2);
              return (
                <div key={i} className={`flex items-center gap-[11px] px-2 py-2.5 rounded-[14px] -mx-2 relative transition-colors tap-fx active:bg-safai-surface-soft ${isFirst ? 'bg-gradient-to-br from-[#F0A527]/10 to-[#F0A527]/0 shadow-[inset_0_0_0_1px_rgba(240,165,39,.18)]' : 'border-b border-safai-border last:border-b-0'}`}>
                  <div className={`shrink-0 flex items-center justify-center text-xs font-extrabold text-white font-display relative ${isFirst ? 'w-8 h-8 rounded-[10px] shadow-[0_4px_12px_rgba(240,165,39,.4),_inset_0_1px_0_rgba(255,255,255,.4)]' : 'w-[29px] h-[29px] rounded-[10px]'}`} style={{ background: r.medal }}>
                    {isFirst && <svg className="w-[15px] h-[15px] absolute -top-[7px] left-1/2 -translate-x-1/2 text-safai-amber drop-shadow-[0_1px_1px_rgba(0,0,0,.15)]" viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18l-1.5-9-4.5 3.5L12 5l-3 8.5L4.5 10 3 19z"/></svg>}
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] truncate ${isFirst ? 'font-extrabold' : 'font-bold'}`}>{r.name}</div>
                    <div className="flex items-center gap-[7px] mt-[5px]">
                      <div className="flex gap-[1.5px] shrink-0">
                        {[0, 1, 2, 3, 4].map(s => (
                          <svg key={s} viewBox="0 0 24 24" fill="currentColor" className={`w-[11px] h-[11px] ${s < filled ? 'text-safai-amber' : 'text-[#E1E2EA]'}`}><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>
                        ))}
                      </div>
                      <div className="flex-1 h-1 rounded-[3px] bg-safai-surface-soft overflow-hidden min-w-[24px]">
                        <span className="block h-full rounded-[3px]" style={{ width: `${r.score * 10}%`, background: r.bar }}></span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-[1px]">
                    <div className="text-sm font-extrabold text-safai-text font-display leading-none">{r.score.toFixed(1)}</div>
                    <div className="text-[8.5px] font-bold text-safai-text-faint tracking-[.02em]">/ 10</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-gradient-to-br from-white to-safai-surface-tint rounded-[20px] p-4 shadow-safai-sm border border-safai-border">
          <div className="flex items-center justify-between gap-1.5 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_currentColor] bg-safai-primary-soft text-safai-primary-deep">
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <div className="text-[12.5px] font-bold font-display leading-[1.25]">Live Activity Feed</div>
            </div>
            <span className="flex items-center gap-[5px] text-[9.5px] font-extrabold text-white bg-gradient-to-br from-safai-primary to-safai-primary-2 px-[9px] py-1 rounded-[20px] shrink-0 shadow-[0_3px_8px_rgba(59,130,246,.3)]">
              <i className="w-[5px] h-[5px] rounded-full bg-white inline-block animate-livePillPulse"></i>Live
            </span>
          </div>

          <div className="flex flex-col relative">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-start gap-[11px] px-2 py-[9px] rounded-[14px] -mx-2 relative transition-colors tap-fx active:bg-safai-surface-soft after:content-[''] after:absolute after:left-[18.5px] after:top-[38px] after:bottom-[-3px] after:w-[2px] after:bg-gradient-to-b after:from-safai-border after:to-transparent last:after:hidden">
                <div className={`w-[30px] h-[30px] rounded-[10px] flex items-center justify-center shrink-0 mt-[1px] z-10 shadow-[0_0_0_4px_#fff] ${a.bg} ${a.fg}`}>
                  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    {a.icon}
                  </svg>
                </div>
                <div className="min-w-0 flex-1 pt-[1px]">
                  <div className="text-[12.5px] font-bold leading-[1.4]">{a.text}</div>
                  <div className="flex items-center gap-1.5 mt-[3px]">
                    <span className={`text-[9px] font-extrabold tracking-[.02em] px-[7px] py-[2px] rounded-[20px] shrink-0 whitespace-nowrap ${a.bg} ${a.fg}`}>{a.status}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-safai-text-faint opacity-50 shrink-0"></span>
                    <span className="text-[10.5px] text-safai-text-faint font-semibold">{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Quick Actions */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-[13px] gap-2">
          <div className="flex items-center gap-[9px] min-w-0">
            <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_4px_10px_-3px_currentColor] bg-safai-amber-soft text-safai-amber">
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div className="text-[15px] font-extrabold tracking-tight font-display">Quick actions</div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="flex-1 flex flex-col items-center gap-2 p-[15px_8px] rounded-2xl bg-gradient-to-br from-safai-primary to-safai-primary-2 shadow-safai-glow border-none cursor-pointer tap-fx active:scale-95 transition-transform">
            <div className="w-[34px] h-[34px] rounded-[11px] bg-white/22 text-white flex items-center justify-center"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
            <span className="text-[12px] font-bold text-white">Add Washroom</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2 p-[15px_8px] rounded-2xl bg-white shadow-safai-sm border border-safai-border cursor-pointer tap-fx active:scale-95 transition-transform">
            <div className="w-[34px] h-[34px] rounded-[11px] bg-safai-primary-soft text-safai-primary-deep flex items-center justify-center"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
            <span className="text-[12px] font-bold text-safai-text">Assign Cleaner</span>
          </div>
        </div>
      </section>

    </main>
  );
}