"use client";

import React, { useState } from 'react';
import { 
  Users, Plus, Search, X, ChevronDown, List, Grid, Trash2, Calendar, MapPin
} from 'lucide-react';

export default function CleanerAssignments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Mock Data matching the user interface view
  const assignments = [
    { id: 1, name: 'srujal mane', phone: '7887364232', role: 'CLEANER', initial: 'SM', location: 'Ground Floor Washroom', date: '6/30/2026', status: 'ASSIGNED' },
    { id: 2, name: 'srujal mane', phone: '7887364232', role: 'CLEANER', initial: 'SM', location: 'Final Test', date: '6/30/2026', status: 'ASSIGNED' },
    { id: 3, name: 'srujal mane', phone: '7887364232', role: 'CLEANER', initial: 'SM', location: 'Test-02', date: '6/30/2026', status: 'ASSIGNED', highlighted: true },
    { id: 4, name: 'Anil Clener test', phone: '4234567891', role: 'CLEANER', initial: 'AC', location: 'Test89', date: '6/25/2026', status: 'ASSIGNED' },
    { id: 5, name: 'Test-fsgs', phone: '4376777777', role: 'CLEANER', initial: 'TE', location: 'Test89', date: '6/25/2026', status: 'ASSIGNED' }
  ];

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
      {/* Module Headline Card */}
      <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm space-y-3">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-safai-primary text-white rounded-xl flex items-center justify-center shadow-md shadow-safai-primary/20 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display">Cleaner Assignments</h1>
            <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">
              System Personnel Mapping Registry
            </p>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-1.5 bg-safai-amber text-white py-2 rounded-xl text-xs font-bold shadow-sm shadow-safai-amber/10 hover:opacity-90 transition tap-fx">
          <Plus className="w-4 h-4 stroke-[3]" />
          Add Cleaner
        </button>
      </div>

      {/* Registry Metric Counter Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-safai-surface p-2.5 rounded-2xl border border-safai-primary/20 shadow-safai-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[76px]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-safai-primary" />
          <span className="text-base font-black text-safai-text mt-1">125</span>
          <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase mt-0.5">Total Staff</span>
        </div>
        
        <div className="bg-safai-surface p-2.5 rounded-2xl border border-safai-lime/20 shadow-safai-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[76px]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-safai-lime" />
          <span className="text-base font-black text-safai-text mt-1">125</span>
          <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase mt-0.5">Assigned</span>
        </div>

        <div className="bg-safai-surface p-2.5 rounded-2xl border border-safai-coral/20 shadow-safai-sm flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[76px]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-safai-coral" />
          <span className="text-base font-black text-safai-text mt-1">0</span>
          <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase mt-0.5">Unassigned</span>
        </div>
      </div>

      {/* Filter Control Options */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
          <input 
            type="text" 
            placeholder="Search cleaner or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 bg-safai-surface border border-safai-border rounded-xl text-xs text-safai-text placeholder:text-safai-text-faint focus:outline-none shadow-safai-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-safai-text-faint hover:text-safai-text-dim">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Horizontal Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pt-0.5 text-[10px] font-bold">
          <button className="flex items-center gap-0.5 bg-safai-surface border border-safai-border px-2.5 py-1 rounded-lg text-safai-text-dim whitespace-nowrap tap-fx">
            All Roles <ChevronDown className="w-3 h-3 text-safai-text-faint" />
          </button>
          <div className="h-4 w-px bg-safai-border mx-0.5" />
          {['All', 'Assigned', 'Unassigned'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap transition tap-fx ${
                activeFilter === tab 
                  ? 'bg-safai-primary/10 border-safai-primary text-safai-primary' 
                  : 'bg-safai-surface border-safai-border text-safai-text-faint'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Meta Pagination Row */}
      <div className="flex justify-between items-center text-[10px] font-bold text-safai-text-dim pt-1">
        <div>Showing <span className="text-safai-text">1-10</span> of <span className="text-safai-text">125</span> staff</div>
        <div className="flex items-center gap-0.5 bg-safai-surface-soft p-0.5 rounded-lg border border-safai-border shadow-sm">
          <button className="p-1 bg-safai-surface rounded-md text-safai-primary shadow-sm"><List className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-safai-text-faint hover:text-safai-text-dim"><Grid className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Assignments Display Stack */}
      <div className="space-y-3">
        {assignments.map((item) => (
          <div 
            key={item.id} 
            className={`bg-safai-surface rounded-2xl border transition shadow-safai-sm overflow-hidden ${
              item.highlighted ? 'border-safai-primary ring-1 ring-safai-primary/30' : 'border-safai-border'
            }`}
          >
            <div className="p-3.5 space-y-3">
              {/* Profile Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 bg-safai-primary-soft text-safai-primary rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm border border-safai-primary/10">
                    {item.initial}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-safai-text truncate capitalize">{item.name}</h3>
                    <p className="text-[9px] text-safai-text-faint font-medium flex items-center gap-1 mt-0.5">
                      📞 <span className="text-safai-text-dim">{item.phone}</span>
                    </p>
                  </div>
                </div>
                <span className="bg-safai-primary-soft text-safai-primary text-[8px] font-black px-2 py-0.5 rounded border border-safai-primary/10 tracking-wider">
                  {item.role}
                </span>
              </div>

              {/* Location and Date Grid Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-safai-surface-soft/60 border border-safai-border rounded-xl p-2 flex flex-col min-w-0">
                  <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-safai-text-faint" /> Location
                  </span>
                  <span className="text-[10px] font-bold text-safai-text truncate mt-0.5">
                    {item.location}
                  </span>
                </div>
                
                <div className="bg-safai-surface-soft/60 border border-safai-border rounded-xl p-2 flex flex-col min-w-0">
                  <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5 text-safai-text-faint" /> Assigned On
                  </span>
                  <span className="text-[10px] font-bold text-safai-text mt-0.5">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Action and Badge Footer Row */}
              <div className="flex justify-between items-center pt-0.5">
                <span className="bg-safai-surface-soft text-safai-lime text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-safai-border">
                  <span className="w-1.5 h-1.5 bg-safai-lime rounded-full animate-livePillPulse" />
                  {item.status}
                </span>
                
                <button className="p-1.5 border border-safai-coral-soft bg-safai-coral-soft text-safai-coral rounded-lg hover:bg-safai-coral hover:text-white transition shadow-sm tap-fx">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}