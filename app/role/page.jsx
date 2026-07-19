"use client";

import React, { useState, useMemo } from "react";
import {
  Shield,
  Plus,
  Users,
  Lock,
  Globe,
  Edit3,
  Trash2,
  Sliders,
  LayoutDashboard,
  MapPin,
  GitMerge,
  X,
  Check,
  Building
} from "lucide-react";

export default function RoleMatrixAnalytics() {
  // ---- Core Security Matrix Data States ----
  const [roles, setRoles] = useState([
    { 
      id: "superadmin", name: "Superadmin", description: "Has full system access", usersCount: 10, systemLocked: true,
      permissions: { dashboard: ["view"], washrooms: ["view", "add", "update", "delete", "toggle"], hierarchy: ["view", "add", "update", "delete"] }
    },
    { 
      id: "admin", name: "Admin", description: "System level administrative oversight configurations", usersCount: 71, systemLocked: true,
      permissions: { dashboard: ["view"], washrooms: ["view", "add", "update", "toggle"], hierarchy: ["view", "update"] }
    },
    { 
      id: "supervisor", name: "Supervisor", description: "Ground operations mapping and assignments controller", usersCount: 25, systemLocked: true,
      permissions: { dashboard: ["view"], washrooms: ["view", "update"], hierarchy: ["view"] }
    },
    { 
      id: "cleaner", name: "Cleaner", description: "Standard execution access parameters for task verification", usersCount: 143, systemLocked: false,
      permissions: { dashboard: ["view"], washrooms: ["view"], hierarchy: [] }
    },
    { 
      id: "zonal-admin", name: "Zonal Admin", description: "Regional supervisor management and performance tracking", usersCount: 4, systemLocked: false,
      permissions: { dashboard: ["view"], washrooms: ["view", "update", "toggle"], hierarchy: ["view"] }
    },
    { 
      id: "facility-supervisor", name: "Facility Supervisor", description: "On-site point of contact and inspection assignment parameters", usersCount: 3, systemLocked: false,
      permissions: { dashboard: ["view"], washrooms: ["view", "update"], hierarchy: [] }
    },
    { 
      id: "facility-admin", name: "Facility Admin", description: "Oversight of singular distinct operational business locations", usersCount: 8, systemLocked: false,
      permissions: { dashboard: ["view"], washrooms: ["view", "add", "update"], hierarchy: ["view"] }
    }
  ]);

  // Operational Control States
  const [editingId, setEditingId] = useState(null);
  const [isCreatingInline, setIsCreatingInline] = useState(false);
  
  // Single-Source Form Target State Engine
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: { dashboard: [], washrooms: [], hierarchy: [] }
  });

  // ---- Computed KPIs Engine ----
  const kpiStats = useMemo(() => {
    return roles.reduce(
      (acc, curr) => {
        acc.total += 1;
        if (curr.systemLocked) acc.core += 1;
        acc.users += curr.usersCount;
        return acc;
      },
      { total: 0, core: 0, users: 0 }
    );
  }, [roles]);

  // ---- Form Management Closures ----
  const startEditing = (role) => {
    setIsCreatingInline(false);
    setEditingId(role.id);
    setFormData({
      name: role.name,
      description: role.description || "",
      permissions: JSON.parse(JSON.stringify(role.permissions))
    });
  };

  const startCreating = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      permissions: { dashboard: ["view"], washrooms: ["view"], hierarchy: [] }
    });
    setIsCreatingInline(true);
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsCreatingInline(false);
  };

  const togglePermission = (section, capability) => {
    setFormData(prev => {
      const activeArr = prev.permissions[section];
      const nextArr = activeArr.includes(capability)
        ? activeArr.filter(item => item !== capability)
        : [...activeArr, capability];
      
      return {
        ...prev,
        permissions: { ...prev.permissions, [section]: nextArr }
      };
    });
  };

  const handleFormSubmit = (e, targetId = null) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (targetId) {
      setRoles(prev =>
        prev.map(r => r.id === targetId ? {
          ...r,
          name: formData.name.trim(),
          description: formData.description.trim(),
          permissions: formData.permissions
        } : r)
      );
      setEditingId(null);
    } else {
      const generatedId = formData.name.trim().toLowerCase().replace(/\s+/g, "-");
      setRoles(prev => [
        ...prev,
        {
          id: generatedId,
          name: formData.name.trim(),
          description: formData.description.trim() || "Custom defined parameters scope",
          usersCount: 0,
          systemLocked: false,
          permissions: formData.permissions
        }
      ]);
      setIsCreatingInline(false);
    }
  };

  const deleteRole = (id) => {
    setRoles(prev => prev.filter(r => r.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <main className="flex-1 p-4 space-y-4 max-w-xl mx-auto bg-[#F4F8F7] min-h-screen text-[#0E1913]">
      
      {/* Topbar Module Header Segment */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E4EEEC] shadow-sm">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_10px_-3px_rgba(59,130,246,0.45)]">
            <Shield className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-base font-bold font-display tracking-tight text-[#0E1913]">Role Matrix</h1>
            <p className="text-[11px] font-medium text-[#5C6B65]">Identity management access panels</p>
          </div>
        </div>
        {!isCreatingInline && (
          <button 
            onClick={startCreating}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] px-4 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.6]" />
            New Role
          </button>
        )}
      </div>

      {/* Analytics KPI Segment Area */}
      {/* <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-white to-[#E9F2FF] border border-[#E4EEEC] rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#5C6B65] uppercase tracking-wider">Total Roles</span>
            <div className="w-7 h-7 rounded-lg bg-[#E6F0FF] text-[#1D4ED8] flex items-center justify-center"><Shield className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#0E1913] font-display tabular-nums">{kpiStats.total}</div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#FFF3DC] border border-[#E4EEEC] rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#5C6B65] uppercase tracking-wider">Core System</span>
            <div className="w-7 h-7 rounded-lg bg-[#FFF3DC] text-[#F0A527] flex items-center justify-center"><Lock className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#0E1913] font-display tabular-nums">{kpiStats.core}</div>
        </div>

        <div className="col-span-2 bg-gradient-to-br from-white to-[#E3FAEC] border border-[#E4EEEC] rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#5C6B65] uppercase tracking-wider">Active Covered Users</span>
            <div className="w-7 h-7 rounded-lg bg-[#E3FAEC] text-[#159A6B] flex items-center justify-center"><Users className="w-4 h-4" /></div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-2xl font-bold tracking-tight text-[#0E1913] font-display tabular-nums">{kpiStats.users.toLocaleString()}</div>
            <span className="text-[10px] font-medium text-[#93A19B] text-right">Directly bound to operations frameworks</span>
          </div>
        </div>
      </div> */}

      {/* Dynamic Custom Scope Inline Box */}
      {isCreatingInline && (
        <div className="bg-white rounded-2xl border-2 border-[#3B82F6]/40 p-4 shadow-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center border-b border-gray-100/80 pb-2.5">
            <h3 className="text-xs font-bold text-[#0E1913] flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#3B82F6] stroke-[2.5]" /> Create Custom Security Blueprint
            </h3>
            <button type="button" onClick={cancelForm} className="p-1 hover:bg-gray-50 text-[#93A19B] rounded-lg"><X className="w-4 h-4" /></button>
          </div>
          {renderFormEngine(null)}
        </div>
      )}

      {/* Role Directory Execution Feed */}
      <div className="space-y-3">
        {roles.map((role, idx) => {
          const isEditingThis = editingId === role.id;

          return (
            <div
              key={role.id}
              className={`bg-white border rounded-2xl p-4 space-y-3 transition-all duration-200 shadow-sm ${
                isEditingThis ? "border-[#3B82F6] ring-4 ring-[#E6F0FF] shadow-md" : "border-[#E4EEEC] hover:border-[#3B82F6]/30"
              }`}
            >
              {/* Card Meta Row */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[11px] font-bold text-[#93A19B] font-display bg-[#F4F8F7] border border-[#E4EEEC] w-6 h-6 rounded-lg flex items-center justify-center shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-bold tracking-tight text-[#0E1913] font-display block truncate">{role.name}</span>
                    {!isEditingThis && (
                      <span className="text-[10px] text-[#5C6B65] line-clamp-1 font-medium mt-0.5">{role.description}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 bg-[#E6F0FF] text-[#1D4ED8] font-display font-bold text-[11px] px-2.5 py-1.5 rounded-xl tabular-nums">
                  <Users className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 stroke-[2.2]" />
                  {role.usersCount}
                </div>
              </div>

              {/* Conditional Rendering View State vs Control Drawer */}
              {!isEditingThis ? (
                <>
                  <div className="h-[1px] border-t border-dashed border-[#E4EEEC] my-1" />
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[10px] font-bold text-[#93A19B] flex items-center gap-1.5">
                      Blueprint Matrix: 
                      <span className={`font-extrabold flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px] border uppercase tracking-wider ${
                        role.systemLocked 
                          ? 'text-[#F0A527] bg-[#FFF3DC] border-[#F0A527]/20' 
                          : 'text-[#3B82F6] bg-[#E6F0FF] border-[#3B82F6]/20'
                      }`}>
                        {role.systemLocked ? (
                          <><Lock className="w-2.5 h-2.5 stroke-[2.5]" /> System Core</>
                        ) : (
                          <><Globe className="w-2.5 h-2.5 stroke-[2.5]" /> Custom Scope</>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => startEditing(role)}
                        className="w-8 h-8 bg-[#E6F0FF] text-[#1D4ED8] rounded-xl flex items-center justify-center border-none transition-all hover:bg-[#3B82F6] hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {!role.systemLocked && (
                        <button 
                          onClick={() => deleteRole(role.id)}
                          className="w-8 h-8 bg-[#FDE7EA] text-[#E8435A] rounded-xl flex items-center justify-center border-none transition-all hover:bg-[#E8435A] hover:text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5" /> Matrix Adjustments
                    </span>
                    <button type="button" onClick={cancelForm} className="p-1 hover:bg-gray-100 text-[#93A19B] rounded-lg"><X className="w-4 h-4" /></button>
                  </div>
                  {renderFormEngine(role.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );

  // ---- Shared Inline Input Matrix Configuration Engine ----
  function renderFormEngine(roleId) {
    return (
      <form onSubmit={(e) => handleFormSubmit(e, roleId)} className="flex flex-col gap-4 text-left">
        <div className="space-y-3 bg-[#F4F8F7] p-3 rounded-xl border border-[#E4EEEC]">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[#5C6B65] uppercase tracking-wider">Role Name *</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-9 px-3 bg-white border border-[#E4EEEC] rounded-xl text-xs font-semibold text-[#0E1913] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all shadow-sm" 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-[#5C6B65] uppercase tracking-wider">Description Space</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full h-9 px-3 bg-white border border-[#E4EEEC] rounded-xl text-xs font-semibold text-[#0E1913] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all shadow-sm" 
            />
          </div>
        </div>

        <div className="text-[10px] font-bold text-[#0E1913] uppercase tracking-widest border-b border-[#E4EEEC] pb-1.5 mt-1">
          Permissions Mapping Architecture
        </div>

        {/* Module Group 1: Dashboard Visuals */}
        <div className="bg-white border border-[#E4EEEC] rounded-xl p-3.5 space-y-2 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8]">
            <div className="p-1.5 bg-[#E6F0FF] rounded-lg"><LayoutDashboard className="w-3.5 h-3.5 text-[#3B82F6]" /></div>
            <span>Dashboard Platform</span>
          </div>
          <p className="text-[10px] text-[#5C6B65] pl-8 -mt-1 font-medium">Main dashboard visual analysis metrics telemetry</p>
          <div className="pl-8 pt-0.5">
            <label className={`flex items-center gap-2 max-w-max px-3 py-2 border rounded-xl text-xs font-bold text-[#0E1913] cursor-pointer select-none transition-all ${
              formData.permissions.dashboard.includes("view") ? "bg-[#E6F0FF] border-[#3B82F6]/30 text-[#1D4ED8]" : "bg-[#F4F8F7] border-[#E4EEEC]"
            }`}>
              <input 
                type="checkbox" 
                checked={formData.permissions.dashboard.includes("view")}
                onChange={() => togglePermission("dashboard", "view")}
                className="w-4 h-4 accent-[#1D4ED8] cursor-pointer" 
              />
              <span>View Dashboard</span>
            </label>
          </div>
        </div>

        {/* Module Group 2: Washroom Enclosures */}
        <div className="bg-white border border-[#E4EEEC] rounded-xl p-3.5 space-y-2 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8]">
            <div className="p-1.5 bg-[#E6F0FF] rounded-lg"><MapPin className="w-3.5 h-3.5 text-[#3B82F6]" /></div>
            <span>Washrooms & Locations</span>
          </div>
          <p className="text-[10px] text-[#5C6B65] pl-8 -mt-1 font-medium">Manage and audit physical sanitation infrastructure units</p>
          
          <div className="grid grid-cols-2 gap-2 pl-8 pt-0.5">
            {["view", "add", "update", "delete"].map((cap) => (
              <label key={cap} className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-bold text-[#0E1913] cursor-pointer select-none transition-all capitalize ${
                formData.permissions.washrooms.includes(cap) ? "bg-[#E6F0FF] border-[#3B82F6]/30 text-[#1D4ED8]" : "bg-[#F4F8F7] border-[#E4EEEC]"
              }`}>
                <input 
                  type="checkbox" 
                  checked={formData.permissions.washrooms.includes(cap)}
                  onChange={() => togglePermission("washrooms", cap)}
                  className="w-4 h-4 accent-[#1D4ED8] cursor-pointer" 
                />
                <span>{cap}</span>
              </label>
            ))}
            <label className={`col-span-2 flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-bold text-[#0E1913] cursor-pointer select-none transition-all ${
              formData.permissions.washrooms.includes("toggle") ? "bg-[#E6F0FF] border-[#3B82F6]/30 text-[#1D4ED8]" : "bg-[#F4F8F7] border-[#E4EEEC]"
            }`}>
              <input 
                type="checkbox" 
                checked={formData.permissions.washrooms.includes("toggle")}
                onChange={() => togglePermission("washrooms", "toggle")}
                className="w-4 h-4 accent-[#1D4ED8] cursor-pointer" 
              />
              <span>Toggle Operational Readiness Status</span>
            </label>
          </div>
        </div>

        {/* Module Group 3: Struct Hierarchy Map */}
        <div className="bg-white border border-[#E4EEEC] rounded-xl p-3.5 space-y-2 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8]">
            <div className="p-1.5 bg-[#E6F0FF] rounded-lg"><GitMerge className="w-3.5 h-3.5 text-[#3B82F6] rotate-90" /></div>
            <span>Location Hierarchy Scope</span>
          </div>
          <p className="text-[10px] text-[#5C6B65] pl-8 -mt-1 font-medium">Manage geographic grouping and zone cluster schemas</p>
          
          <div className="grid grid-cols-2 gap-2 pl-8 pt-0.5">
            {["view", "add", "update", "delete"].map((cap) => (
              <label key={cap} className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-bold text-[#0E1913] cursor-pointer select-none transition-all ${
                formData.permissions.hierarchy.includes(cap) ? "bg-[#E6F0FF] border-[#3B82F6]/30 text-[#1D4ED8]" : "bg-[#F4F8F7] border-[#E4EEEC]"
              }`}>
                <input 
                  type="checkbox" 
                  checked={formData.permissions.hierarchy.includes(cap)}
                  onChange={() => togglePermission("hierarchy", cap)}
                  className="w-4 h-4 accent-[#1D4ED8] cursor-pointer" 
                />
                <span className="capitalize">{cap === "view" ? "View Matrix" : cap}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Form Action Bar Elements */}
        <div className="flex gap-3 mt-2">
          <button 
            type="button" 
            onClick={cancelForm} 
            className="flex-1 h-10 rounded-xl text-xs font-bold text-[#5C6B65] bg-[#F4F8F7] border border-[#E4EEEC] uppercase tracking-wider hover:bg-gray-100 transition-all active:scale-[0.99]"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 h-10 rounded-xl text-xs font-bold text-white bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] border-none uppercase tracking-wider shadow-[0_4px_12px_rgba(59,130,246,0.15)] flex items-center justify-center gap-1 hover:opacity-95 transition-all active:scale-[0.99]"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            {roleId ? "Update Blueprint" : "Deploy Framework"}
          </button>
        </div>
      </form>
    );
  }
}