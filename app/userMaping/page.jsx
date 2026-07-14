"use client";

import React from 'react';
import { 
  Share2, ArrowLeft, Users, Plus, MapPin, Calendar, ClipboardList
} from 'lucide-react';

export default function CreateAssignments() {
  // Mock data matching the layout in your screenshot
  const assignmentsList = [
    {
      index: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      initials: "RS",
      location: "Ground Floor - Washroom A",
      role: "CLEANER",
      date: "7/10/2026",
      status: "ASSIGNED"
    },
    {
      index: 2,
      name: "Priya Kapoor",
      phone: "9123456789",
      initials: "PK",
      location: "Floor 1 Lobby",
      role: "SUPERVISOR",
      date: "7/11/2026",
      status: "ASSIGNED"
    },
    {
      index: 3,
      name: "Amit Patel",
      phone: "9988776655",
      initials: "AP",
      location: "Ground Floor - Washroom B",
      role: "CLEANER",
      date: "7/12/2026",
      status: "ASSIGNED"
    }
  ];

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
      {/* Top Title Banner Card */}
      <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-safai-primary text-white rounded-xl flex items-center justify-center shadow-md shadow-safai-primary/20 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display">Create Assignments</h1>
            <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">
              User Registry Mapping
            </p>
          </div>
        </div>
        
        <button className="flex items-center gap-1 border border-safai-border text-safai-text-dim px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-safai-surface-soft transition tap-fx shadow-sm">
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
      </div>

      {/* Metrics Section Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Total Users */}
        <div className="bg-safai-surface p-3 rounded-2xl border border-safai-border shadow-safai-sm flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-safai-primary" />
          <div className="flex justify-between items-start pl-1">
            <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase">Total Users</span>
            <span className="text-base font-black text-safai-text leading-none">8</span>
          </div>
          <span className="text-[6px] font-bold text-safai-primary tracking-tight pl-1 uppercase mt-3">Registry</span>
        </div>

        {/* Assigned */}
        <div className="bg-safai-surface p-3 rounded-2xl border border-safai-border shadow-safai-sm flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-safai-lime" />
          <div className="flex justify-between items-start pl-1">
            <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase">Assigned</span>
            <span className="text-base font-black text-safai-text leading-none">3</span>
          </div>
          <span className="text-[6px] font-bold text-safai-lime tracking-tight pl-1 uppercase mt-3">of 8</span>
        </div>

        {/* Unassigned */}
        <div className="bg-safai-surface p-3 rounded-2xl border border-safai-border shadow-safai-sm flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-safai-coral" />
          <div className="flex justify-between items-start pl-1">
            <span className="text-[7px] font-bold text-safai-text-faint tracking-wider uppercase">Unassigned</span>
            <span className="text-base font-black text-safai-text leading-none">5</span>
          </div>
          <span className="text-[6px] font-bold text-safai-coral tracking-tight pl-1 uppercase mt-3">Needs mapping</span>
        </div>
      </div>

      {/* Dynamic Header Section for Assignments List */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <h2 className="text-xs font-black text-safai-text uppercase tracking-wide">Assignments List</h2>
          <p className="text-[8px] text-safai-text-faint font-medium">Tap a row to view details</p>
        </div>
        <button className="flex items-center gap-1 bg-safai-lime text-safai-text font-black text-[10px] px-3 py-1.5 rounded-xl shadow-sm hover:opacity-90 transition tap-fx">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          Add
        </button>
      </div>

      {/* Nested Vertical Step Items Stack */}
      <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-safai-border/80">
        {assignmentsList.map((item) => (
          <div key={item.index} className="relative pl-6">
            
            {/* Round Step Badge Timeline Marker */}
            <div className="absolute left-0 top-1.5 w-4 h-4 bg-safai-primary-soft text-safai-primary rounded-full flex items-center justify-center font-bold text-[8px] z-10 ring-4 ring-safai-bg">
              {item.index}
            </div>

            {/* Core Row Data Layout Wrapper */}
            <div className="bg-safai-surface rounded-2xl border border-safai-border shadow-safai-sm p-3.5 space-y-3">
              
              {/* Profile Block Meta */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 bg-safai-amber-soft text-safai-amber rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-safai-text truncate">{item.name}</h3>
                    <p className="text-[9px] text-safai-text-faint font-medium mt-0.5">{item.phone}</p>
                  </div>
                </div>

                <span className="bg-safai-lime-soft text-safai-lime border border-safai-lime/20 text-[7px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
                  {item.status}
                </span>
              </div>

              {/* Functional Operational Scope Assignment Details */}
              <div className="bg-safai-surface-soft/60 border border-safai-border rounded-xl p-2.5 space-y-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-safai-primary shrink-0" />
                  <span className="text-[10px] font-bold text-safai-text truncate">
                    {item.location}
                  </span>
                </div>
                
                <span className={`inline-block text-[7px] font-black px-2 py-0.5 rounded tracking-wider ${
                  item.role === 'SUPERVISOR' 
                    ? 'bg-safai-primary-soft text-safai-primary' 
                    : 'bg-safai-violet-soft text-safai-violet'
                }`}>
                  {item.role}
                </span>
              </div>

              {/* Timestamp Tracking Footer */}
              <div className="flex items-center gap-1 text-[8px] font-bold text-safai-text-faint">
                <Calendar className="w-3 h-3 text-safai-text-faint" />
                <span>Assigned on: {item.date}</span>
              </div>

            </div>
          </div>
        ))}
      </div>

    </main>
  );
}