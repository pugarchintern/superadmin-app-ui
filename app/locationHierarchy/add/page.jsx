"use client";

import React, { useState } from 'react';
import { 
  Layers, HelpCircle, Maximize2, Move,
  RotateCcw, Plus, ChevronDown, User, Building2, ArrowLeft
} from 'lucide-react';

export default function AddZoneMobile() {
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
            <h1 className="text-sm font-bold text-safai-text font-display leading-tight">Add New Zone</h1>
            <p className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase">
              Configure Architecture
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1 border border-safai-coral/30 text-safai-coral px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-safai-coral-soft transition shrink-0">
          <ArrowLeft className="w-3 h-3" />
          Back
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
              <option value="" className="text-safai-text-faint">Select parent type...</option>
              <option value="building" className="text-safai-text">Building</option>
              <option value="floor" className="text-safai-text">Floor</option>
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
            <div className="w-7 h-7 bg-safai-primary-soft text-safai-primary rounded-lg flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5" />
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
        <div className="relative border border-safai-border rounded-xl bg-safai-surface-soft/60 p-3 min-h-[230px] flex flex-col items-center justify-center overflow-hidden">
          
          {/* Hierarchical Structure Node Tree */}
          <div className="scale-90 flex flex-col items-center gap-4 origin-center">
            
            {/* Level 1: Building Root */}
            <div className="bg-safai-surface border-2 border-safai-primary rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-24 relative z-10">
              <div className="w-5 h-5 bg-safai-primary text-white rounded-full flex items-center justify-center mb-0.5">
                <Building2 className="w-3 h-3" />
              </div>
              <span className="text-[8px] font-bold text-safai-text text-center leading-tight">Corporate Bldg</span>
            </div>

            {/* Vertical Connector Line 1 */}
            <div className="w-0.5 h-4 bg-safai-border -mt-4"></div>

            {/* Horizontal Level Line */}
            <div className="w-[140px] h-0.5 bg-safai-border -mt-4 relative">
              <div className="absolute left-0 top-0 w-0.5 h-4 bg-safai-border"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-4 bg-safai-border"></div>
              <div className="absolute right-0 top-0 w-0.5 h-4 bg-safai-border"></div>
            </div>

            {/* Level 2: Floor Child Nodes */}
            <div className="flex gap-2">
              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-14">
                <span className="text-[8px] font-bold text-safai-text">Floor 1</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase">Level</span>
              </div>

              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-14 relative">
                <span className="text-[8px] font-bold text-safai-text">Floor 2</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase">Level</span>
                {/* Connector down to child zones */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-safai-border translate-y-full"></div>
              </div>

              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-14">
                <span className="text-[8px] font-bold text-safai-text">Floor 3</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase">Level</span>
              </div>
            </div>

            {/* Level 3: Zone Terminals */}
            <div className="flex gap-2 mt-1">
              <div className="bg-safai-surface border border-safai-lime rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-14">
                <span className="text-[8px] font-bold text-safai-text">Parking</span>
                <span className="text-[6px] text-safai-lime font-bold uppercase">Zone</span>
              </div>

              <div className="bg-safai-surface border border-safai-border rounded-xl p-1.5 shadow-safai-sm flex flex-col items-center w-14">
                <span className="text-[8px] font-bold text-safai-text">Lobby</span>
                <span className="text-[6px] text-safai-text-faint font-bold uppercase">Zone</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Navigation Label */}
          <div className="absolute bottom-1.5 left-0 right-0 flex items-center justify-center gap-1 text-[7px] font-bold tracking-wider text-safai-text-faint uppercase">
            <Move className="w-2.5 h-2.5" />
            Pinch to zoom / Pan map
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button className="flex items-center justify-center gap-1.5 bg-safai-coral text-white py-2 px-3 rounded-xl text-xs font-bold shadow-sm shadow-safai-coral/10 hover:opacity-90 transition">
            <RotateCcw className="w-3.5 h-3.5" />
            Discard
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-safai-amber-soft text-safai-amber py-2 px-3 rounded-xl text-xs font-bold hover:bg-safai-amber/20 transition">
            <Plus className="w-3.5 h-3.5" />
            Create
          </button>
        </div>
      </div>
    </main>
  );
}