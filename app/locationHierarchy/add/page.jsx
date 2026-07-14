"use client";

import React, { useState } from 'react';
import { 
  Layers, HelpCircle, Maximize2, Move,
  RotateCcw, Plus, ChevronDown, Building2, ArrowLeft,
  User, ClipboardList, ShieldAlert, KeyRound
} from 'lucide-react';

export default function AddZoneFinal() {
  const [zoneName, setZoneName] = useState('');
  const [parentType, setParentType] = useState('');

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
      {/* Page Title Card */}
      <div className="bg-safai-surface p-3.5 rounded-2xl shadow-safai-sm border border-safai-border flex justify-between items-center">
        <div className="flex gap-2.5 items-center">
          <div className="w-9 h-9 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display leading-tight">Add New Zone Type</h1>
            <p className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase">
              Configure Workspace Architecture
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1 border border-safai-coral/30 text-safai-coral px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-safai-coral-soft transition shrink-0">
          <ArrowLeft className="w-3 h-3" />
          Back to List
        </button>
      </div>

      {/* Form: Zone Configuration */}
      <div className="bg-safai-surface p-4 rounded-2xl shadow-safai-sm border border-safai-border space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-safai-surface-soft text-safai-violet rounded-lg flex items-center justify-center border border-safai-border shrink-0">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-safai-text">Zone Configuration</h2>
            <p className="text-[10px] text-safai-text-dim">Define a new zone classification</p>
          </div>
        </div>

        {/* Input Field */}
        <div className="space-y-1">
          <label className="text-[9px] font-extrabold text-safai-primary tracking-wider uppercase flex items-center gap-0.5">
            Zone Type Name <span className="text-safai-red">*</span>
          </label>
          <div className="relative">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-safai-text-faint" />
            <input 
              type="text" 
              placeholder="e.g. Storage Zone"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text placeholder:text-safai-text-faint focus:outline-none focus:border-safai-primary transition"
            />
          </div>
        </div>

        {/* Dropdown Field */}
        <div className="space-y-1">
          <label className="text-[9px] font-extrabold text-safai-text-dim tracking-wider uppercase">
            Parent Type <span className="text-safai-text-faint font-normal text-[8px] lowercase">(optional)</span>
          </label>
          <div className="relative">
            <select 
              value={parentType}
              onChange={(e) => setParentType(e.target.value)}
              className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text appearance-none focus:outline-none focus:border-safai-primary transition"
            >
              <option value="">Select parent type...</option>
              <option value="building">Building</option>
              <option value="floor">Floor</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-safai-text-dim pointer-events-none" />
          </div>
        </div>

        {/* Informational Alert Box */}
        <div className="bg-safai-surface-soft border border-safai-border rounded-xl p-2.5 flex gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-safai-violet shrink-0 mt-0.5" />
          <p className="text-[10px] text-safai-text-dim leading-normal">
            Establishing a parent organizes zones logically and enables better resource management across the registry.
          </p>
        </div>
      </div>

      {/* Architecture Tree Section */}
      <div className="bg-safai-surface p-4 rounded-2xl shadow-safai-sm border border-safai-border space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-safai-violet-soft text-safai-violet rounded-lg flex items-center justify-center shrink-0">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-safai-text">Architecture</h2>
              <p className="text-[8px] text-safai-text-faint font-bold tracking-wider uppercase">Hierarchical Map</p>
            </div>
          </div>
          <button className="p-1.5 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-lg hover:bg-safai-border transition">
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Diagram Viewport Frame */}
        <div className="relative border border-safai-border rounded-xl bg-safai-surface-soft/40 p-4 min-h-[300px] flex flex-col items-center justify-center overflow-x-auto hide-scrollbar">
          
          {/* Hierarchical Structure Node Tree */}
          <div className="scale-95 flex flex-col items-center gap-5 min-w-[340px] origin-center">
            
            {/* Level 1: Building Root */}
            <div className="bg-safai-surface border border-safai-primary rounded-xl p-2 shadow-safai-sm flex flex-col items-center w-28 relative z-10">
              <div className="w-6 h-6 bg-safai-primary-soft text-safai-primary rounded-lg flex items-center justify-center mb-1">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-black text-safai-text text-center leading-tight">Corporate Building1</span>
            </div>

            {/* Vertical Connector Line 1 */}
            <div className="w-px h-5 bg-safai-border -mt-5"></div>

            {/* Horizontal Line covering Level 2 Nodes */}
            <div className="w-[240px] h-px bg-safai-border -mt-5 relative">
              <div className="absolute left-0 top-0 w-px h-5 bg-safai-border"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-5 bg-safai-border"></div>
              <div className="absolute right-0 top-0 w-px h-5 bg-safai-border"></div>
            </div>

            {/* Level 2: Floor Child Nodes (Exactly 3 Columns as shown in screenshot 1) */}
            <div className="flex gap-4 justify-center w-full">
              {/* Floor 2 */}
              <div className="bg-safai-surface border border-safai-border rounded-xl p-2 shadow-safai-sm flex flex-col items-center w-18">
                <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center mb-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-black text-safai-text">Floor 2</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase tracking-wide">Level</span>
              </div>

              {/* Floor 3 */}
              <div className="bg-safai-surface border border-safai-border rounded-xl p-2 shadow-safai-sm flex flex-col items-center w-18 relative">
                <div className="w-5 h-5 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center mb-0.5">
                  <ClipboardList className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-black text-safai-text">Floor 3</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase tracking-wide">Level</span>
                {/* Center Connector dropping down to terminal zone items */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-5 bg-safai-border translate-y-full"></div>
              </div>

              {/* Floor 4 */}
              <div className="bg-safai-surface border border-safai-border rounded-xl p-2 shadow-safai-sm flex flex-col items-center w-18">
                <div className="w-5 h-5 bg-safai-primary-soft text-safai-primary rounded-lg flex items-center justify-center mb-0.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-black text-safai-text">Floor 4</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase tracking-wide">Level</span>
              </div>
            </div>

            {/* Horizontal Line connecting Terminal Zones */}
            <div className="w-[260px] h-px bg-safai-border mt-1 relative">
              <div className="absolute left-0 top-0 w-px h-4 bg-safai-border"></div>
              <div className="absolute left-[33%] -translate-x-1/2 top-0 w-px h-4 bg-safai-border"></div>
              <div className="absolute left-[66%] -translate-x-1/2 top-0 w-px h-4 bg-safai-border"></div>
              <div className="absolute right-0 top-0 w-px h-4 bg-safai-border"></div>
            </div>

            {/* Level 3: Zone Terminals Grid Stack (4 Columns matching screenshot 1) */}
            <div className="flex gap-2 justify-between w-full px-1">
              {/* Parking Zone */}
              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-16">
                <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[8px] font-black mb-0.5">
                  P
                </div>
                <span className="text-[8px] font-black text-safai-text">Parking</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase tracking-tight">Zone</span>
              </div>

              {/* Lobby Zone */}
              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-16">
                <div className="w-5 h-5 bg-orange-500 text-white rounded-xl flex items-center justify-center mb-0.5">
                  <Building2 className="w-3 h-3" />
                </div>
                <span className="text-[8px] font-black text-safai-text">Lobby</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase tracking-tight">Zone</span>
              </div>

              {/* Service Zone */}
              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-16">
                <div className="w-5 h-5 bg-safai-violet text-white rounded-xl flex items-center justify-center mb-0.5">
                  <KeyRound className="w-3 h-3" />
                </div>
                <span className="text-[8px] font-black text-safai-text">Service</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase tracking-tight">Zone</span>
              </div>

              {/* Utility Zone */}
              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-16">
                <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[8px] font-black mb-0.5">
                  U
                </div>
                <span className="text-[8px] font-black text-safai-text">Utility</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase tracking-tight">Zone</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Navigation Label */}
          <div className="absolute bottom-1.5 left-0 right-0 flex items-center justify-center gap-1.5 text-[7px] font-bold tracking-wider text-safai-text-faint uppercase bg-safai-surface-soft/80 py-0.5 backdrop-blur-sm">
            <Move className="w-2.5 h-2.5" />
            Drag to pan, pinch to zoom
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button className="flex items-center justify-center gap-1.5 bg-safai-coral text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm shadow-safai-coral/10 hover:opacity-90 transition tap-fx">
            <RotateCcw className="w-3.5 h-3.5" />
            Discard
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-safai-amber-soft text-safai-amber py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-safai-amber/20 transition tap-fx">
            <Plus className="w-3.5 h-3.5" />
            Create Zone
          </button>
        </div>
      </div>
    </main>
  );
}