"use client";

import React, { useState } from 'react';
import { 
  Settings, Layers, ArrowRight, ArrowLeft, 
  Globe, Building, Eye, Copy, Trash2, Edit 
} from 'lucide-react';

export default function SystemConfigurations() {
  // Navigation view state: 'list' or 'details'
  const [currentView, setCurrentView] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleManageTemplates = (title) => {
    setSelectedCategory(title);
    setCurrentView('details');
  };

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
      {/* ================= VIEW 1: CONFIGURATION PANELS ================= */}
      {currentView === 'list' ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Top Banner Header Card */}
          <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-safai-lime-soft text-safai-lime rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Settings className="w-5 h-5 text-safai-lime" />
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

          {/* Configuration Phase Cards Stack */}
          <div className="space-y-3.5">
            {configPhases.map((item) => (
              <div 
                key={item.id} 
                className="bg-safai-surface rounded-2xl border border-safai-border shadow-safai-sm p-4 flex flex-col justify-between min-h-[140px] relative transition-all duration-200 hover:shadow-safai-md"
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Layers className="w-4 h-4 text-safai-text-faint" />
                  </div>
                  <span className="bg-safai-surface-soft border border-safai-border text-safai-text-faint font-extrabold text-[7px] px-2 py-0.5 rounded tracking-widest uppercase scale-95 origin-right">
                    {item.phase}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-black text-safai-text font-display">
                    {item.title}
                  </h3>
                  <p className="text-[10.5px] text-safai-text-dim font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button 
                  onClick={() => handleManageTemplates(item.title)}
                  className="w-full border-t border-safai-border/65 mt-4 pt-3 flex justify-between items-center group cursor-pointer tap-fx text-left"
                >
                  <span className="text-[9px] font-black text-safai-primary tracking-wider uppercase group-hover:opacity-80 transition-opacity">
                    {item.actionText}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-safai-primary transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        
        /* ================= VIEW 2: TEMPLATE MANAGEMENT DETAILED VIEW ================= */
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          
          {/* Header Action Navbar */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView('list')}
              className="w-8 h-8 bg-safai-surface border border-safai-border text-safai-text rounded-xl flex items-center justify-center shadow-sm hover:bg-safai-surface-soft transition tap-fx"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xs font-black text-safai-text uppercase tracking-wide">
                {selectedCategory === "Usage Categories" ? "Location Usage Category" : "Additional Features"}
              </h1>
              <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">
                Template Management
              </p>
            </div>
          </div>

          {/* Section A: Global Templates */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 px-1 text-[9px] font-black text-safai-text-faint tracking-wider uppercase">
              <Globe className="w-3.5 h-3.5 text-safai-primary" />
              <span>Global Templates</span>
            </div>

            <div className="bg-safai-surface rounded-2xl border-t-[3px] border-t-safai-primary border border-safai-border shadow-safai-sm p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-2.5 items-center">
                  <div className="w-8 h-8 bg-safai-surface-soft border border-safai-border text-safai-text-faint rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-safai-text-dim" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-safai-text">System Default Template</h3>
                    <p className="text-[8px] font-bold text-safai-text-faint uppercase mt-0.5">ID: #9</p>
                  </div>
                </div>
                <span className="bg-safai-surface-soft border border-safai-border text-safai-text-dim text-[7px] font-black px-1.5 py-0.5 rounded uppercase">
                  Global
                </span>
              </div>

              {/* Action Operations Sub-Row */}
              <div className="flex gap-2.5 justify-end pt-1">
                <button className="flex items-center gap-1 text-[10px] font-black text-safai-text-dim hover:text-safai-text py-1.5 px-3 transition tap-fx">
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
                <button className="flex items-center gap-1.5 bg-safai-text text-white text-[10px] font-black py-1.5 px-3 rounded-xl shadow-sm hover:opacity-90 transition tap-fx">
                  <Copy className="w-3 h-3" />
                  Copy to Company
                </button>
              </div>
            </div>
          </div>

          {/* Section B: Company Configurations */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-1.5 px-1 text-[9px] font-black text-safai-text-faint tracking-wider uppercase">
              <Building className="w-3.5 h-3.5 text-safai-amber" />
              <span>Company Configurations</span>
            </div>

            <div className="bg-safai-surface rounded-2xl border-t-[3px] border-t-safai-amber border border-safai-border shadow-safai-sm p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-2.5 items-center">
                  <div className="w-8 h-8 bg-safai-amber-soft border border-safai-amber/20 text-safai-amber rounded-xl flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-safai-text">Company Custom Version</h3>
                    <p className="text-[8px] font-bold text-safai-text-faint uppercase mt-0.5">ID: #23</p>
                  </div>
                </div>
                <span className="bg-safai-amber-soft border border-safai-amber/20 text-safai-amber text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-wide">
                  Company Override
                </span>
              </div>

              {/* Action Operations Sub-Row */}
              <div className="flex gap-2.5 justify-end pt-1">
                <button className="flex items-center gap-1 text-[10px] font-black text-safai-red hover:bg-safai-red-soft rounded-xl py-1.5 px-3 transition tap-fx">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
                <button className="flex items-center gap-1.5 bg-[#00A3C4] text-white text-[10px] font-black py-1.5 px-3 rounded-xl shadow-sm hover:opacity-95 transition tap-fx">
                  <Edit className="w-3 h-3" />
                  Edit Override
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </main>
  );
}