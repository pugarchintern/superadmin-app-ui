"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Info,
  Layers,
  Activity,
  ShieldCheck,
  Eye,
  Edit3,
  X,
  Settings,
  Save,
  AlertTriangle
} from "lucide-react";

export default function SaasLimitsController() {
  // ---- Core Limits Roster State Engine ----
  const [limits, setLimits] = useState([
    { id: "max-washrooms", title: "Max Washrooms", current: 1, max: 1, isRelational: false, palette: ["from-[#3B82F6]", "to-[#60A5FA]"] },
    { id: "max-users", title: "Max Users", current: 130, max: 500, isRelational: false, palette: ["from-[#F0A527]", "to-[#F7C15C]"] },
    { id: "max-cleaners", title: "Max Cleaners", current: 30, max: 50, isRelational: false, palette: ["from-[#FF6B57]", "to-[#FF9C8C]"] },
    { id: "max-supervisors", title: "Max Supervisors", current: 6, max: 10, isRelational: false, palette: ["from-[#38BDF8]", "to-[#7DD3FC]"] },
    { id: "max-washrooms-per-cleaner", title: "Max Washrooms Per Cleaner", current: 150, max: 0, isRelational: true, palette: ["from-[#159A6B]", "to-[#3FC28E]"] },
    { id: "max-cleaners-per-washroom", title: "Max Cleaners Per Washroom", current: 2, max: 0, isRelational: true, palette: ["from-[#8B5CF6]", "to-[#B39DFB]"] }
  ]);

  // Operational Inline State
  const [editingId, setEditingId] = useState(null);
  const [formValue, setFormValue] = useState("");

  // ---- Computed KPIs Dashboard Engine ----
  const activeQuotasCount = useMemo(() => limits.length, [limits]);

  // ---- Inline Action Controls ----
  const toggleInlineEdit = (limit) => {
    if (editingId === limit.id) {
      setEditingId(null);
    } else {
      setEditingId(limit.id);
      setFormValue(limit.isRelational ? limit.current : limit.max);
    }
  };

  const handleFormSubmit = (e, targetId) => {
    e.preventDefault();
    const cleanNum = parseInt(formValue, 10) || 1;

    setLimits(prev =>
      prev.map(item => {
        if (item.id !== targetId) return item;
        return item.isRelational 
          ? { ...item, current: cleanNum }
          : { ...item, max: Math.max(1, cleanNum) };
      })
    );
    setEditingId(null);
  };

  return (
    <div className="w-full min-h-full bg-[#F4F8F7] text-[#0E1913] select-none p-4 pt-6 space-y-4">
      
      {/* Topbar Header Segment Area - Adjusted for shell insets */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#E4EEEC] shadow-sm">
        <button 
          type="button" 
          aria-label="Go back"
          className="w-8 h-8 rounded-xl bg-[#F4F8F7] border border-[#E4EEEC] flex items-center justify-center text-[#0E1913] shrink-0 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </button>
        <div className="min-w-0">
          <h1 className="text-sm font-bold font-display tracking-tight text-[#0E1913] truncate">SaaS Limits Controller</h1>
          <p className="text-[10px] font-medium text-[#5C6B65] truncate">Manage quotas and prevent abuse</p>
        </div>
      </div>

      {/* Context Informational Strip Banner */}
      {/* <div className="bg-gradient-to-br from-[#E6F0FF]/60 to-white/50 border border-[#3B82F6]/15 rounded-2xl p-3 flex gap-2.5 items-start shadow-sm">
        <div className="w-5 h-5 rounded-md bg-white text-[#3B82F6] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <Info className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0">
          <h4 className="text-[11px] font-bold text-[#1D4ED8]">Viewing limits for: Global Default</h4>
          <p className="text-[10px] text-[#5C6B65] font-medium leading-normal mt-0.5">
            Changes applied here take effect immediately for all subsequent API requests.
          </p>
        </div>
      </div> */}

      {/* Operational Overview KPI Element */}
      {/* <div className="bg-gradient-to-br from-white to-[#E9F2FF] border border-[#E4EEEC] rounded-2xl p-3 flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_10px_-3px_rgba(59,130,246,0.45)] shrink-0">
          <Layers className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5 line-height-none">
            <span className="text-base font-bold font-display text-[#0E1913] tabular-nums">{activeQuotasCount}</span>
            <span className="text-[10px] font-bold text-[#5C6B65]">System Quotas</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-semibold text-[#93A19B] mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#159A6B]" />
            All Active Configurations
          </div>
        </div>
      </div> */}

      {/* Core Limits Mapping Target Output Feed */}
      <div className="space-y-3 pb-8">
        {limits.map((limit) => {
          const isEditing = editingId === limit.id;
          const percentage = limit.isRelational ? 0 : Math.min(100, Math.round((limit.current / limit.max) * 100)) || 0;
          const hasAlert = !limit.isRelational && percentage >= 90;

          return (
            <div 
              key={limit.id}
              className={`bg-white border rounded-2xl p-3.5 space-y-3 transition-all duration-200 shadow-sm ${
                isEditing ? "border-[#3B82F6] ring-2 ring-[#E6F0FF]" : "border-[#E4EEEC]"
              }`}
            >
              {/* Card Header Structure */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${limit.palette[0]} ${limit.palette[1]} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold tracking-tight text-[#0E1913] font-display block truncate">{limit.title}</span>
                    <div className="flex items-center gap-1 text-[9.5px] text-[#5C6B65] font-medium mt-0.5">
                      <Activity className="w-3 h-3 text-[#93A19B]" />
                      <span className="truncate">Status Indicator Block Scope</span>
                    </div>
                  </div>
                </div>
                <span className={`text-[8px] font-bold tracking-wider px-2 py-0.5 rounded-full border text-center uppercase shrink-0 ${
                  limit.isRelational 
                    ? "bg-[#E3FAEC] text-[#159A6B] border-emerald-500/10" 
                    : "bg-[#E6F0FF] text-[#1D4ED8] border-blue-500/10"
                }`}>
                  {limit.isRelational ? "Relational" : "Quota"}
                </span>
              </div>

              {/* Dynamic Operations Space vs Inline Parameters Drawer */}
              {!isEditing ? (
                <>
                  {!limit.isRelational && (
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${limit.palette[0]} ${limit.palette[1]} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  )}

                  <div className="h-[1px] border-t border-dashed border-[#E4EEEC]" />

                  <div className="flex items-end justify-between gap-3 pt-0.5">
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-[9px] font-bold text-[#93A19B] truncate">ID: <span className="font-display font-extrabold text-[#5C6B65] tabular-nums">#{limit.id.slice(0, 4)}</span></div>
                      <div className="text-[10px] font-bold text-[#93A19B] truncate">
                        {limit.isRelational ? (
                          <>Max Capacity: <span className="font-display font-extrabold text-[#1D4ED8] text-[11px] tabular-nums">{limit.current} Allowed</span></>
                        ) : (
                          <>Usage: <span className="text-[#5C6B65] font-extrabold tabular-nums">{limit.current}</span> / <span className="text-[#5C6B65] font-extrabold tabular-nums">{limit.max} ({percentage}%)</span></>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        type="button"
                        aria-label="View status details"
                        className="w-7 h-7 bg-[#E6F0FF] text-[#1D4ED8] rounded-lg flex items-center justify-center hover:bg-[#3B82F6] hover:text-white transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => toggleInlineEdit(limit)}
                        aria-label="Edit inline parameter configuration"
                        className="w-7 h-7 bg-[#FFF3DC] text-[#F0A527] rounded-lg flex items-center justify-center hover:bg-[#F0A527] hover:text-white transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {hasAlert && (
                    <div className="bg-[#FDE7EA] border border-[#E8435A]/15 text-[#E8435A] rounded-xl p-2 text-[9px] font-bold flex items-center gap-1.5 mt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Action Required: Threshold values critical</span>
                    </div>
                  )}
                </>
              ) : (
                <form 
                  onSubmit={(e) => handleFormSubmit(e, limit.id)}
                  className="bg-[#EFF6F4] border border-[#E4EEEC] rounded-xl p-2.5 space-y-2"
                >
                  <label className="text-[8.5px] font-bold tracking-wider text-[#5C6B65] uppercase flex items-center gap-1">
                    <Settings className="w-3 h-3 text-[#3B82F6]" />
                    {limit.isRelational ? "Modify Value" : "Adjust Quota Ceiling"}
                  </label>
                  
                  <div className="flex gap-1.5">
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={formValue}
                      onChange={(e) => setFormValue(e.target.value)}
                      className="flex-1 h-8 px-2 bg-white border border-[#E4EEEC] rounded-lg text-xs font-bold font-display text-[#0E1913] outline-none focus:border-[#3B82F6] shadow-sm min-w-0"
                    />
                    <button 
                      type="submit"
                      className="h-8 px-3 bg-[#0E1913] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm shrink-0"
                    >
                      <Save className="w-3 h-3" />
                      Save
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="w-8 h-8 bg-white border border-[#E4EEEC] text-[#5C6B65] rounded-lg flex items-center justify-center shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}