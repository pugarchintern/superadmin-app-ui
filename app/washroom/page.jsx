"use client";

import React, { useState } from 'react';
import { 
  FileText, UserPlus, Plus, Search, SlidersHorizontal, 
  ChevronDown, List, Grid, Star, Navigation, MoreVertical, User
} from 'lucide-react';

export default function WashroomLocations() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Data for Washroom Cards
  const washrooms = [
    { id: '423', name: 'Test89', sub: 'NEW A', status: 'ACTIVE', currentScore: '—', rating: '10', cleaner: 'Anil Clean', count: '+1', staff: 'N/A' },
    { id: '422', name: 'test-bf-ghs', sub: 'TEST-B-FA', status: 'ACTIVE', currentScore: '—', rating: '0.0', cleaner: 'Test - FA1', count: null, staff: 'N/A' },
    { id: '421', name: 'Test -FA', sub: 'WATHODA', status: 'ACTIVE', currentScore: '—', rating: '1.3', cleaner: 'Ramesh C.', count: '+1', staff: 'safai' },
    { id: '420', name: 'Test B - Limit', sub: 'RAM NAGAR', status: 'ACTIVE', currentScore: '—', rating: '0.0', cleaner: 'N/A', count: null, staff: 'N/A' }
  ];

  return (
    <main className="flex-1 p-4 space-y-4 pb-20 relative">
      
      {/* Main Module Banner */}
      <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm space-y-3">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-safai-primary text-white rounded-xl flex items-center justify-center shadow-md shadow-safai-primary/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display tracking-wide">Washroom Locations</h1>
            <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">
              Details, Assignments & Ratings
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2.5">
          <button className="flex items-center justify-center gap-1 border border-safai-coral/30 text-safai-coral bg-safai-surface py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-safai-coral-soft transition tap-fx">
            <UserPlus className="w-3.5 h-3.5" />
            Assign
          </button>
          <button className="flex items-center justify-center gap-1 bg-safai-surface-soft text-safai-text border border-safai-border py-2 rounded-xl text-xs font-bold hover:bg-safai-border/40 transition tap-fx">
            <Plus className="w-3.5 h-3.5" />
            Add Location
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-safai-surface p-3 rounded-2xl border border-safai-border shadow-safai-sm flex flex-col items-center justify-between relative overflow-hidden min-h-[72px]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-safai-primary-2"></div>
          <span className="text-lg font-black text-safai-text mt-1">53</span>
          <span className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase text-center">Washrooms</span>
        </div>
        
        <div className="bg-safai-surface p-3 rounded-2xl border border-safai-border shadow-safai-sm flex flex-col items-center justify-between relative overflow-hidden min-h-[72px]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-safai-lime"></div>
          <span className="text-lg font-black text-safai-text mt-1">49</span>
          <span className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase text-center">Active</span>
        </div>
        
        <div className="bg-safai-surface p-3 rounded-2xl border border-safai-border shadow-safai-sm flex flex-col items-center justify-between relative overflow-hidden min-h-[72px]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-safai-amber"></div>
          <span className="text-lg font-black text-safai-text mt-1">3.4</span>
          <span className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase text-center">Avg Rating</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
            <input 
              type="text" 
              placeholder="Search facility name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-safai-surface border border-safai-border rounded-xl text-xs text-safai-text placeholder:text-safai-text-faint focus:outline-none shadow-safai-sm"
            />
          </div>
          <button className="p-2 bg-safai-surface border border-safai-border rounded-xl text-safai-text-dim hover:bg-safai-surface-soft shadow-safai-sm tap-fx">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Inline Badges selectors */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pt-0.5">
          <button className="flex items-center gap-1 bg-safai-surface border border-safai-border px-2.5 py-1 rounded-lg text-[10px] font-bold text-safai-text-dim whitespace-nowrap">
            Types: All <ChevronDown className="w-3 h-3 text-safai-text-faint" />
          </button>
          <button className="flex items-center gap-1 bg-safai-surface border border-safai-border px-2.5 py-1 rounded-lg text-[10px] font-bold text-safai-text-dim whitespace-nowrap">
            Facility: All <ChevronDown className="w-3 h-3 text-safai-text-faint" />
          </button>
          <button className="flex items-center gap-1 bg-safai-surface border border-safai-border px-2.5 py-1 rounded-lg text-[10px] font-bold text-safai-text-dim whitespace-nowrap">
            Rating: All <ChevronDown className="w-3 h-3 text-safai-text-faint" />
          </button>
        </div>
      </div>

      {/* List Meta Row */}
      <div className="flex justify-between items-center text-[11px] font-medium text-safai-text-dim pt-1">
        <div>Showing <span className="font-bold text-safai-text">1-15</span> of <span className="font-bold text-safai-text">53</span> washrooms</div>
        <div className="flex items-center gap-1 bg-safai-surface-soft p-0.5 rounded-lg border border-safai-border">
          <button className="p-1 bg-safai-surface rounded-md text-safai-primary shadow-sm"><List className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-safai-text-faint hover:text-safai-text-dim"><Grid className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Washrooms Stack Cards */}
      <div className="space-y-3">
        {washrooms.map((item, index) => (
          <div key={index} className="bg-safai-surface rounded-2xl border border-safai-border shadow-safai-sm overflow-hidden">
            <div className="p-3 space-y-2.5">
              {/* Title & Status */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-safai-primary-soft text-safai-primary rounded-lg flex items-center justify-center border border-safai-primary/20">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-safai-text">{item.name}</h3>
                    <p className="text-[9px] text-safai-text-dim font-medium">ID {item.id} • {item.sub}</p>
                  </div>
                </div>
                <span className="bg-safai-surface-soft text-safai-text text-[8px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-safai-border">
                  <span className="w-1.5 h-1.5 bg-safai-lime rounded-full animate-livePillPulse"></span>
                  {item.status}
                </span>
              </div>

              {/* Stats Slots */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-safai-surface-soft/60 border border-safai-border rounded-xl p-2 flex flex-col">
                  <span className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase">Current Score</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-safai-amber-soft flex items-center justify-center text-[8px] text-safai-amber font-bold">★</div>
                    <span className="text-xs font-bold text-safai-text">{item.currentScore}</span>
                  </div>
                </div>
                <div className="bg-safai-surface-soft/60 border border-safai-border rounded-xl p-2 flex flex-col">
                  <span className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase">Avg Rating</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-safai-amber fill-safai-amber" />
                    <span className="text-xs font-black text-safai-text">{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Sub-Footer Row */}
            <div className="bg-safai-surface-soft border-t border-safai-border px-3 py-2 flex justify-between items-center text-[10px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 bg-safai-lime rounded-full shrink-0"></span>
                <span className="font-bold text-safai-text truncate">{item.cleaner}</span>
                {item.count && (
                  <span className="bg-safai-primary-soft text-safai-primary font-bold text-[8px] px-1 rounded border border-safai-primary/10 shrink-0">
                    {item.count}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-safai-text-faint font-medium shrink-0">
                <div className="flex items-center gap-0.5">
                  <User className="w-3 h-3 text-safai-text-dim" />
                  <span className="text-safai-text-dim">{item.staff}</span>
                </div>
                <button className="text-safai-primary hover:opacity-80 transition tap-fx">
                  <Navigation className="w-3.5 h-3.5 transform rotate-45" />
                </button>
                <button className="text-safai-text-dim hover:text-safai-text transition tap-fx">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-6 right-4 w-11 h-11 bg-safai-coral text-white rounded-full flex items-center justify-center shadow-safai-glow hover:opacity-90 transition z-30 tap-fx">
        <Plus className="w-5 h-5 stroke-[3]" />
      </button>

    </main>
  );
}