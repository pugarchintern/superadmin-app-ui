"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Plus,
  Mail,
  Building2,
  Calendar,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  AlertCircle,
  Save
} from "lucide-react";

export default function OrganizationsManagement() {
  // ---- Core States ----
  const [orgs, setSchemas] = useState([
    { _id: 1, name: "Ikje", email: null, status: "Active", created: "13 Jul 2026, 09:54 am", description: "" },
    { _id: 2, name: "Pearls", email: null, status: "Active", created: "12 Jul 2026, 03:25 pm", description: "" },
    { _id: 3, name: "HIOKEU Corp", email: null, status: "Active", created: "11 Jul 2026, 02:39 pm", description: "" },
    { _id: 4, name: "Pending Setup", email: null, status: "Active", created: "11 Jul 2026, 12:13 pm", description: "" },
    { _id: 5, name: "Test Nomad", email: null, status: "Active", created: "10 Jul 2026, 05:11 pm", description: "" },
    { _id: 6, name: "Oraganization -021", email: null, status: "Active", created: "10 Jul 2026, 02:42 pm", description: "" },
    { _id: 7, name: "Nimbus Facilities", email: "contact@nimbus.io", status: "Active", created: "09 Jul 2026, 11:20 am", description: "" },
    { _id: 8, name: "Greenfield Ops", email: null, status: "Active", created: "08 Jul 2026, 04:47 pm", description: "" },
    { _id: 9, name: "Vertex Holdings", email: "hello@vertex.co", status: "Inactive", created: "07 Jul 2026, 09:02 am", description: "" },
    { _id: 10, name: "Northwind Group", email: null, status: "Active", created: "06 Jul 2026, 01:15 pm", description: "" },
    { _id: 11, name: "Ashford Estates", email: null, status: "Active", created: "05 Jul 2026, 10:38 am", description: "" },
    { _id: 12, name: "Silverline Corp", email: "info@silverline.com", status: "Active", created: "04 Jul 2026, 06:05 pm", description: "" },
    { _id: 13, name: "Bluewave Retail", email: null, status: "Active", created: "03 Jul 2026, 02:59 pm", description: "" },
    { _id: 14, name: "Kestrel Towers", email: null, status: "Active", created: "02 Jul 2026, 08:41 am", description: "" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const PAGE_SIZE = 6;

  // Track which organization ID is currently being edited inline
  const [editingOrgId, setEditingOrgId] = useState(null);
  
  // Modals & Panels Control State
  const [showAddModal, setShowAddModal] = useState(false);
  const [profileModal, setProfileModal] = useState({ show: false, org: null });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, org: null });

  // Form Fields State
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [formError, setFormError] = useState(false);

  const avatarPalettes = [
    ["from-[#3B82F6]", "to-[#60A5FA]"],
    ["from-[#F0A527]", "to-[#F7C15C]"],
    ["from-[#FF6B57]", "to-[#FF9C8C]"],
    ["from-[#38BDF8]", "to-[#7DD3FC]"],
    ["from-[#159A6B]", "to-[#3FC28E]"],
    ["from-[#8B5CF6]", "to-[#B39DFB]"],
  ];

  const getInitials = (name) => {
    const parts = name.replace(/[^a-zA-Z0-9 ]/g, "").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const filteredOrgs = useMemo(() => {
    if (!searchQuery.trim()) return orgs;
    return orgs.filter((o) => o.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));
  }, [orgs, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredOrgs.length / PAGE_SIZE));

  const paginatedOrgs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrgs.slice(start, start + PAGE_SIZE);
  }, [filteredOrgs, currentPage]);

  // Handle Inline Edit Initiation
  const startInlineEdit = (org) => {
    setEditingOrgId(org._id);
    setFormData({
      name: org.name,
      email: org.email || "",
      description: org.description || "",
    });
    setFormError(false);
  };

  // Handle Add Initiation (Kept separate as a dynamic top/bottom card anchor)
  const openAddModal = () => {
    setFormData({ name: "", email: "", description: "" });
    setFormError(false);
    setShowAddModal(true);
  };

  // Handle Form Submission
  const handleFormSubmit = (e, mode, orgId = null) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (mode === "edit") {
        setSchemas((prev) =>
          prev.map((o) =>
            o._id === orgId
              ? {
                  ...o,
                  name: formData.name.trim(),
                  email: formData.email.trim() || null,
                  description: formData.description.trim(),
                }
              : o
          )
        );
        setEditingOrgId(null);
      } else {
        const nextId = Math.max(...orgs.map((o) => o._id), 0) + 1;
        setSchemas((prev) => [
          {
            _id: nextId,
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            description: formData.description.trim(),
            status: "Active",
            created: "16 Jul 2026, 11:46 am",
          },
          ...prev,
        ]);
        setShowAddModal(false);
        setCurrentPage(1);
      }
      setIsSubmitting(false);
    }, 600);
  };

  const executeDelete = () => {
    if (!confirmDelete.org) return;
    setSchemas((prev) => prev.filter((o) => o._id !== confirmDelete.org._id));
    setConfirmDelete({ show: false, org: null });
    if (paginatedOrgs.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleExportCSV = () => {
    if (filteredOrgs.length === 0) return;
    const header = ["ID", "Name", "Email", "Status", "Created"];
    const rows = filteredOrgs.map((o, idx) => [idx + 1, o.name, o.email || "", o.status, o.created]);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `organizations_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex-1 p-4 space-y-4 pb-20 relative">
      {/* Navigation Sub Header */}
      <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display">Organizations</h1>
            <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">Manage Registered Systems</p>
          </div>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
          <input
            type="text"
            placeholder="Search organizations…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2.5 bg-safai-surface border border-safai-border rounded-xl text-xs text-safai-text placeholder:text-safai-text-faint focus:outline-none shadow-safai-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-safai-surface border border-safai-border px-3 py-2 rounded-xl text-[10px] font-bold text-safai-text-dim flex items-center gap-1.5 truncate">
            <Building2 className="w-3.5 h-3.5 text-safai-text-faint" />
            <span><b>{orgs.length}</b> total companies</span>
          </div>

          <button onClick={handleExportCSV} className="flex items-center gap-1 bg-safai-surface border border-safai-border px-3 py-2 rounded-xl text-[11px] font-bold text-safai-text shadow-sm hover:bg-safai-surface-soft transition">
            <Download className="w-3.5 h-3.5" /> Export
          </button>

          <button onClick={openAddModal} className="flex items-center gap-1 bg-safai-primary text-white px-3 py-2 rounded-xl text-[11px] font-black shadow-safai-glow hover:opacity-90 transition">
            <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add
          </button>
        </div>
      </div>

      {/* Inline Create Dynamic Placement Card Container */}
      {showAddModal && (
        <div className="bg-safai-surface rounded-2xl border-2 border-safai-primary/40 shadow-lg p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-safai-text flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-safai-primary" /> New Organization Setup
            </h3>
            <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-safai-surface-soft rounded-lg text-safai-text-faint"><X className="w-3.5 h-3.5" /></button>
          </div>
          <form onSubmit={(e) => handleFormSubmit(e, "add")} className="space-y-3">
            <input
              type="text"
              placeholder="Company Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 bg-safai-surface-soft border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary ${formError ? "border-safai-red bg-safai-red-soft/20" : "border-safai-border"}`}
            />
            <input
              type="email"
              placeholder="Contact Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary"
            />
            <textarea
              placeholder="Short description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text min-h-[50px] resize-none focus:outline-none focus:border-safai-primary"
            />
            <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-safai-primary text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save Organization
            </button>
          </form>
        </div>
      )}

      {/* Core Organizations Card List View */}
      <div className="space-y-3">
        {paginatedOrgs.map((org, idx) => {
          const globalIdx = (currentPage - 1) * PAGE_SIZE + idx + 1;
          const palette = avatarPalettes[globalIdx % avatarPalettes.length];
          const isEditingThis = editingOrgId === org._id;

          return (
            <div
              key={org._id}
              onClick={() => !isEditingThis && setProfileModal({ show: true, org })}
              className={`bg-safai-surface rounded-2xl border p-3.5 space-y-3 transition ${
                isEditingThis ? "border-safai-primary ring-2 ring-safai-primary-soft shadow-md" : "border-safai-border cursor-pointer hover:border-safai-primary/30"
              }`}
            >
              {/* Default View Mode Layout */}
              {!isEditingThis ? (
                <>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${palette[0]} ${palette[1]} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
                        {getInitials(org.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-black text-safai-text-faint font-display">#{globalIdx}</span>
                          <h3 className="text-xs font-black text-safai-text truncate">{org.name}</h3>
                        </div>
                        <p className="text-[10px] text-safai-text-dim font-medium flex items-center gap-1 truncate mt-0.5">
                          <Mail className="w-3 h-3 text-safai-text-faint shrink-0" />
                          {org.email || "No email added"}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border shrink-0 tracking-wider ${org.status === "Active" ? "bg-safai-surface-soft text-emerald-600 border-emerald-500/20" : "bg-safai-surface-soft text-safai-text-faint border-safai-border"}`}>
                      {org.status}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-safai-border pt-2.5 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-safai-text-faint flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Created <b className="text-safai-text-dim font-extrabold">{org.created}</b>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => startInlineEdit(org)} className="p-1.5 border border-safai-primary-soft bg-safai-primary-soft text-safai-primary rounded-lg hover:bg-safai-primary hover:text-white transition shadow-sm">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setConfirmDelete({ show: true, org })} className="p-1.5 border border-safai-red-soft bg-safai-red-soft text-safai-red rounded-lg hover:bg-safai-red hover:text-white transition shadow-sm">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* INLINE CARD EDIT BLOCK PLACEHOLDER (Triggers inside the card itself) */
                <form onSubmit={(e) => handleFormSubmit(e, "edit", org._id)} className="space-y-3 animate-in fade-in duration-150" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center border-b border-safai-border pb-1.5">
                    <span className="text-[10px] font-black text-safai-primary uppercase tracking-wider">Editing #{globalIdx}</span>
                    <button type="button" onClick={() => setEditingOrgId(null)} className="p-0.5 hover:bg-safai-surface-soft rounded text-safai-text-faint"><X className="w-3.5 h-3.5" /></button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-[9px] font-extrabold text-safai-text-dim block mb-0.5">Company Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-2.5 py-1.5 bg-safai-surface-soft border text-xs text-safai-text rounded-lg focus:outline-none ${formError ? "border-safai-red" : "border-safai-border"}`}
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-extrabold text-safai-text-dim block mb-0.5">Contact Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-safai-surface-soft border border-safai-border text-xs text-safai-text rounded-lg focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-extrabold text-safai-text-dim block mb-0.5">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-safai-surface-soft border border-safai-border text-xs text-safai-text rounded-lg min-h-[45px] resize-none focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={() => setEditingOrgId(null)} className="flex-1 py-1.5 border border-safai-border bg-safai-surface text-safai-text text-[11px] font-bold rounded-xl transition">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 py-1.5 bg-safai-primary text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 shadow-sm transition">
                      {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}

        {filteredOrgs.length === 0 && (
          <div className="text-center py-12 px-4 bg-safai-surface rounded-2xl border border-safai-border">
            <div className="w-12 h-12 bg-safai-surface-soft text-safai-text-faint rounded-xl flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-safai-text">No organizations found</h4>
            <p className="text-[10px] text-safai-text-faint font-medium mt-0.5">Try a different search criterion.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredOrgs.length > 0 && (
        <div className="pt-2 text-center space-y-2">
          <p className="text-[10px] font-bold text-safai-text-faint">
            Page <b className="text-safai-text">{currentPage}</b> of <b>{totalPages}</b> &middot; <b>{filteredOrgs.length}</b> matches
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="w-8 h-8 rounded-lg border border-safai-border bg-safai-surface flex items-center justify-center text-safai-text-dim disabled:opacity-35 transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-safai-primary bg-safai-primary-soft border border-safai-primary/20 px-3 py-1.5 rounded-lg">
              {currentPage}
            </span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="w-8 h-8 rounded-lg border border-safai-border bg-safai-surface flex items-center justify-center text-safai-text-dim disabled:opacity-35 transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL SLIDE DRAWER: COMPANY PROFILE OVERVIEW ================= */}
      {profileModal.show && profileModal.org && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[90] animate-in fade-in duration-200" onClick={() => setProfileModal({ show: false, org: null })} />
          <div className="absolute left-0 right-0 bottom-0 bg-safai-surface border-t border-safai-border rounded-t-[26px] z-[91] p-4 space-y-4 shadow-2xl max-h-[92%] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-safai-border rounded-full mx-auto" />
            <div className="flex justify-between items-center">
              <button onClick={() => setProfileModal({ show: false, org: null })} className="flex items-center gap-1 text-[11px] font-bold text-safai-text-dim"><ChevronLeft className="w-4 h-4" /> Back</button>
              <button onClick={() => setProfileModal({ show: false, org: null })} className="w-7 h-7 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-lg flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex justify-between items-center gap-2">
              <h2 className="text-base font-black text-safai-text font-display truncate">Company Profile</h2>
              <button
                onClick={() => {
                  const target = profileModal.org;
                  setProfileModal({ show: false, org: null });
                  setTimeout(() => startInlineEdit(target), 200);
                }}
                className="flex items-center gap-1 bg-safai-primary text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-sm hover:opacity-90"
              >
                <Edit3 className="w-3 h-3" /> Edit Inline
              </button>
            </div>
            <div className="border border-safai-border rounded-2xl overflow-hidden bg-safai-surface p-4 space-y-3">
              <div>
                <span className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase block">Company Name</span>
                <div className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-black">{profileModal.org.name}</div>
              </div>
              <div>
                <span className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase block">Contact Email</span>
                <div className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-bold">{profileModal.org.email || "Not provided"}</div>
              </div>
              <div>
                <span className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase block">Description</span>
                <div className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs min-h-[52px]">{profileModal.org.description || "No description available."}</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= MODAL DIALOG: ACCESS DELETION DIALOG ================= */}
      {confirmDelete.show && confirmDelete.org && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[95] animate-in fade-in duration-200" onClick={() => setConfirmDelete({ show: false, org: null })} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[300px] bg-safai-surface rounded-2xl p-5 text-center shadow-2xl z-[96] border border-safai-border space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-safai-red-soft text-safai-red rounded-2xl flex items-center justify-center mx-auto shadow-sm"><AlertCircle className="w-6 h-6" /></div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-safai-text font-display">Delete organization?</h3>
              <p className="text-[11px] text-safai-text-dim font-medium leading-relaxed">This will permanently remove <b className="text-safai-text font-black">{`"${confirmDelete.org.name}"`}</b>.</p>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button onClick={() => setConfirmDelete({ show: false, org: null })} className="flex-1 py-2 bg-safai-surface-soft border border-safai-border text-safai-text font-bold text-xs rounded-xl">Cancel</button>
              <button onClick={executeDelete} className="flex-1 py-2 bg-gradient-to-r from-safai-red to-[#FF6B57] text-white font-bold text-xs rounded-xl shadow-md">Delete</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}