"use client";

import React, { useState } from 'react';
import { 
  Settings, Layers, ArrowRight, ArrowLeft, Save,
  Globe, Building, Eye, Copy, Trash2, Edit, Plus, GripVertical, Cpu, Lock
} from 'lucide-react';

export default function SystemConfigurations() {
  // Navigation view state: 'list' | 'details' | 'editor' | 'viewer'
  const [currentView, setCurrentView] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('Usage Categories');

  // Schema Builder & Viewer Mock Data
  const [schemas, setSchemas] = useState([
    {
      id: "men-group",
      label: "Men",
      key: "men",
      entities: [
        { label: "WC", key: "wc", aiEnabled: true },
        { label: "Indian", key: "indian", aiEnabled: true },
        { label: "Urinals", key: "urinals", aiEnabled: true },
        { label: "Shower", key: "shower", aiEnabled: false },
        { label: "Basin", key: "basin", aiEnabled: false }
      ]
    },
    {
      id: "women-group",
      label: "Women",
      key: "women",
      entities: [
        { label: "WC", key: "wc", aiEnabled: true },
        { label: "Indian", key: "indian", aiEnabled: true },
        { label: "Urinals", key: "urinals", aiEnabled: false },
        { label: "Shower", key: "shower", aiEnabled: false },
        { label: "Basin", key: "basin", aiEnabled: false }
      ]
    }
  ]);

  const configPhases = [
    {
      id: "LOCATION_USAGE_CATEGORY",
      phase: "PHASE 1",
      title: "Usage Categories",
      description: "Manages functional space categories and AI photographic criteria.",
      actionText: "MANAGE TEMPLATES"
    },
    {
      id: "ADDITIONAL_FEATURES",
      phase: "PHASE 2",
      title: "Additional Features",
      description: "Manages boolean operational features like Paid Entry, Wheelchair Access.",
      actionText: "MANAGE TEMPLATES"
    }
  ];

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
      {/* ================= STEP 1: MODULE LIST VIEW ================= */}
      {currentView === 'list' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-safai-lime-soft text-safai-lime rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-safai-text font-display tracking-wide uppercase">
                  System Configurations
                </h1>
                <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase mt-0.5">
                  Manage operational modules and system logic schemas
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            {configPhases.map((item) => (
              <div key={item.id} className="bg-safai-surface rounded-2xl border border-safai-border shadow-safai-sm p-4 flex flex-col justify-between min-h-[140px]">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Layers className="w-4 h-4 text-safai-text-faint" />
                  </div>
                  <span className="bg-safai-surface-soft border border-safai-border text-safai-text-faint font-extrabold text-[7px] px-2 py-0.5 rounded tracking-widest uppercase scale-95 origin-right">
                    {item.phase}
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-black text-safai-text font-display">{item.title}</h3>
                  <p className="text-[10.5px] text-safai-text-dim font-medium leading-relaxed">{item.description}</p>
                </div>
                <button 
                  onClick={() => { setSelectedCategory(item.title); setCurrentView('details'); }}
                  className="w-full border-t border-safai-border/65 mt-4 pt-3 flex justify-between items-center group cursor-pointer tap-fx text-left"
                >
                  <span className="text-[9px] font-black text-safai-primary tracking-wider uppercase">{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-safai-primary" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= STEP 2: TEMPLATE MANAGEMENT DETAILED VIEW ================= */}
      {currentView === 'details' && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('list')} className="w-8 h-8 bg-safai-surface border border-safai-border text-safai-text rounded-xl flex items-center justify-center shadow-sm hover:bg-safai-surface-soft transition tap-fx">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xs font-black text-safai-text uppercase tracking-wide">
                {selectedCategory === "Usage Categories" ? "Location Usage Category" : "Additional Features"}
              </h1>
              <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">Template Management</p>
            </div>
          </div>

          {/* Global Card */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 px-1 text-[9px] font-black text-safai-text-faint tracking-wider uppercase">
              <Globe className="w-3.5 h-3.5 text-safai-primary" />
              <span>Global Templates</span>
            </div>
            <div className="bg-safai-surface rounded-2xl border-t-[3px] border-t-safai-primary border border-safai-border p-4 space-y-3 shadow-safai-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-black text-safai-text">System Default Template</h3>
                  <p className="text-[8px] font-bold text-safai-text-faint uppercase mt-0.5">ID: #9</p>
                </div>
                <span className="bg-safai-surface-soft border border-safai-border text-safai-text-dim text-[7px] font-black px-1.5 py-0.5 rounded uppercase">Global</span>
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button 
                  onClick={() => setCurrentView('viewer')}
                  className="flex items-center gap-1 text-[10px] font-black text-safai-text shadow-sm border border-safai-border rounded-xl bg-safai-surface-soft py-1.5 px-3 transition tap-fx"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
                <button className="flex items-center gap-1.5 bg-safai-text text-white text-[10px] font-black py-1.5 px-3 rounded-xl shadow-sm transition tap-fx"><Copy className="w-3 h-3" />Copy to Company</button>
              </div>
            </div>
          </div>

          {/* Company Card */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 px-1 text-[9px] font-black text-safai-text-faint tracking-wider uppercase">
              <Building className="w-3.5 h-3.5 text-safai-amber" />
              <span>Company Configurations</span>
            </div>
            <div className="bg-safai-surface rounded-2xl border-t-[3px] border-t-safai-amber border border-safai-border p-4 space-y-3 shadow-safai-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-black text-safai-text">Company Custom Version</h3>
                  <p className="text-[8px] font-bold text-safai-text-faint uppercase mt-0.5">ID: #23</p>
                </div>
                <span className="bg-safai-amber-soft border border-safai-amber/20 text-safai-amber text-[7px] font-black px-1.5 py-0.5 rounded uppercase">Company Override</span>
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button className="flex items-center gap-1 text-[10px] font-black text-safai-red py-1.5 px-2 transition tap-fx"><Trash2 className="w-3.5 h-3.5" />Delete</button>
                <button 
                  onClick={() => setCurrentView('editor')}
                  className="flex items-center gap-1.5 bg-[#00A3C4] text-white text-[10px] font-black py-1.5 px-3 rounded-xl shadow-sm hover:opacity-95 transition tap-fx"
                >
                  <Edit className="w-3 h-3" />
                  Edit Override
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3 (EDIT MODE): SCHEMA BUILDER & AI RULES EDITOR ================= */}
      {currentView === 'editor' && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
          <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentView('details')} className="w-8 h-8 bg-safai-surface border border-safai-border text-safai-text rounded-xl flex items-center justify-center shadow-sm hover:bg-safai-surface-soft transition tap-fx">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-xs font-black text-safai-text uppercase tracking-wide">Location Usage Category</h1>
                <p className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase mt-0.5">Schema Builder & AI Rules</p>
              </div>
            </div>
            <button className="flex items-center gap-1 bg-[#00A3C4] text-white font-black text-[10px] px-3 py-1.5 rounded-xl shadow-sm hover:opacity-95 transition tap-fx">
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
          </div>

          {schemas.map((group, groupIdx) => (
            <div key={group.id} className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm space-y-4">
              <div className="flex gap-2 items-end">
                <div className="text-safai-text-faint pb-2.5 cursor-grab"><GripVertical className="w-4 h-4" /></div>
                <div className="flex-[1.5_1_0%] space-y-1">
                  <label className="text-[8px] font-extrabold text-safai-text-faint tracking-wider uppercase">Label Name</label>
                  <input type="text" value={group.label} onChange={(e) => {
                    const updated = [...schemas];
                    updated[groupIdx].label = e.target.value;
                    setSchemas(updated);
                  }} className="w-full px-2.5 py-2 bg-safai-surface border border-safai-border rounded-xl text-xs text-safai-text font-bold focus:outline-none focus:border-safai-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[8px] font-extrabold text-safai-text-faint tracking-wider uppercase">Machine Key</label>
                  <input type="text" value={group.key} disabled className="w-full px-2.5 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text-dim font-medium focus:outline-none" />
                </div>
                <button className="p-2 text-safai-text-faint hover:text-safai-red transition mb-0.5"><Trash2 className="w-4 h-4" /></button>
              </div>

              <div className="space-y-2 pt-2 border-t border-dashed border-safai-border">
                {group.entities.map((entity, entityIdx) => (
                  <div key={entityIdx} className="flex gap-1.5 items-center">
                    <input type="text" value={entity.label} onChange={(e) => {
                      const updated = [...schemas];
                      updated[groupIdx].entities[entityIdx].label = e.target.value;
                      setSchemas(updated);
                    }} className="flex-[2_1_0%] min-w-0 px-2.5 py-2 bg-safai-surface border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary" />
                    <input type="text" value={entity.key} disabled className="flex-[1.2_1_0%] min-w-0 px-2 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text-faint font-medium text-center focus:outline-none" />
                    
                    <button 
                      onClick={() => {
                        const updated = [...schemas];
                        updated[groupIdx].entities[entityIdx].aiEnabled = !entity.aiEnabled;
                        setSchemas(updated);
                      }}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all shadow tap-fx ${
                        entity.aiEnabled ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-safai-surface-soft text-safai-text-faint border-safai-border'
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-safai-text-faint hover:text-safai-red shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
              <button onClick={() => {
                const updated = [...schemas];
                updated[groupIdx].entities.push({ label: "New Entity", key: "new_entity", aiEnabled: false });
                setSchemas(updated);
              }} className="w-full py-2 bg-safai-surface border border-dashed border-safai-border rounded-xl flex items-center justify-center gap-1 text-[10px] font-black text-safai-primary hover:bg-safai-surface-soft transition"><Plus className="w-3.5 h-3.5 stroke-[3]" />ADD ENTITY</button>
            </div>
          ))}
        </div>
      )}

      {/* ================= STEP 4 (VIEWER MODE): EXACT MATCH TO SYSTEM GLOBAL PREVIEW ================= */}
      {currentView === 'viewer' && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
          
          {/* Top Navbar Viewer Header Container */}
          <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentView('details')} className="w-8 h-8 bg-safai-surface border border-safai-border text-safai-text rounded-xl flex items-center justify-center shadow-sm hover:bg-safai-surface-soft transition tap-fx">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-xs font-black text-safai-text uppercase tracking-wide">Location Usage Category</h1>
                <p className="text-[8px] font-bold text-safai-text-faint tracking-wider uppercase mt-0.5">Schema Builder & AI Rules</p>
              </div>
            </div>

            {/* Read-Only Lock Badge */}
            <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[8px] font-black px-2 py-1 rounded-lg flex items-center gap-1 uppercase tracking-wide">
              <Lock className="w-2.5 h-2.5" />
              Read Only
            </span>
          </div>

          {/* Render Schemas Groups (Men & Women Immutable Cards Stack) */}
          {schemas.map((group) => (
            <div key={group.id} className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm space-y-4">
              
              {/* Group Read-Only Top Labels Row */}
              <div className="flex gap-3 items-end">
                <div className="flex-1 space-y-1">
                  <label className="text-[8px] font-extrabold text-safai-text-faint tracking-wider uppercase">Label (Display Name)</label>
                  <div className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-black select-none">
                    {group.label}
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <label className="text-[8px] font-extrabold text-safai-text-faint tracking-wider uppercase">Machine Key (ID)</label>
                  <div className="w-full px-3 py-2 bg-slate-50 border border-safai-border rounded-xl text-xs text-safai-text-faint font-mono">
                    {group.key}
                  </div>
                </div>
              </div>

              {/* Inner Entities Roster Rows Stack */}
              <div className="space-y-2 pt-2 border-t border-dashed border-safai-border">
                {group.entities.map((entity, entityIdx) => (
                  <div key={entityIdx} className="flex gap-2 items-center justify-between bg-safai-surface-soft/40 p-1.5 rounded-xl border border-safai-border/60">
                    
                    {/* Label */}
                    <div className="flex-[2_1_0%] pl-1 text-xs font-black text-safai-text">
                      {entity.label}
                    </div>

                    {/* Technical ID Identifier */}
                    <div className="flex-[1.2_1_0%] text-center text-[10px] font-mono text-safai-text-faint">
                      {entity.key}
                    </div>

                    {/* Circular Status Indicator */}
                    <div 
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 shadow-sm ${
                        entity.aiEnabled 
                          ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/10' 
                          : 'bg-slate-100 border-slate-200 text-slate-300'
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </main>
  );
}