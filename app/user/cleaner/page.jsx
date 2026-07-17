"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, ChevronDown, Users, Plus, Mail, Phone, 
  Calendar, Eye, Edit3, Trash2, ArrowLeft, X, 
  ShieldAlert, User, Shield, Building2, Save, 
  ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';

export default function CleanerManagement() {
  // ---- Core Reactive State Data ----
  const [cleaners, setCleaners] = useState([
    { id: 1, name: "Rahul Sharma", email: null, phone: "9169403535", age: "29", company: "Ikje", status: "Active", created: "Jun 20, 2026", updated: "Jun 20, 2026" },
    { id: 2, name: "Priya Patel", email: null, phone: "4494869503", age: "27", company: null, status: "Active", created: "Jun 21, 2026", updated: "Jun 21, 2026" },
    { id: 3, name: "Amit Kumar", email: null, phone: "9150653001", age: "31", company: "HIOKEU Corp", status: "Active", created: "Jun 21, 2026", updated: "Jun 22, 2026" },
    { id: 4, name: "Amit Kumar", email: null, phone: "9114480436", age: "34", company: null, status: "Active", created: "Jun 22, 2026", updated: "Jun 23, 2026" },
    { id: 5, name: "Priya Patel", email: null, phone: "9134071193", age: "26", company: "Pearls", status: "Active", created: "Jun 23, 2026", updated: "Jun 23, 2026" },
    { id: 6, name: "cleaner2080", email: null, phone: "8149422080", age: "24", company: null, status: "Active", created: "Jun 24, 2026", updated: "Jun 24, 2026" },
    { id: 7, name: "test", email: null, phone: "1597536548", age: "35", company: null, status: "Active", created: "Jun 24, 2026", updated: "Jun 25, 2026" },
    { id: 8, name: "Sneha Gupta", email: null, phone: "9177651977", age: "22", company: "Nimbus Facilities", status: "Active", created: "Jun 25, 2026", updated: "Jun 25, 2026" },
    { id: 9, name: "Amit Kumar", email: null, phone: "9183965280", age: "27", company: null, status: "Active", created: "Jun 26, 2026", updated: "Jun 26, 2026" },
    { id: 10, name: "Sneha Gupta", email: null, phone: "9149956453", age: "30", company: null, status: "Active", created: "Jun 27, 2026", updated: "Jun 27, 2026" }
  ]);

  const baseCompanies = ["Ikje", "Pearls", "HIOKEU Corp", "Nimbus Facilities", "Vertex Holdings"];

  // ---- Query & Navigation Control States ----
  const [searchQuery, setSearchQuery] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const PAGE_SIZE = 5;

  // ---- Modals & Bottom Sheets Controllers ----
  const [formSheet, setFormSheet] = useState({ show: false, mode: 'add', cleanerId: null });
  const [profileSheet, setProfileSheet] = useState({ show: false, cleaner: null });
  const [deleteDialog, setDeleteDialog] = useState({ show: false, cleaner: null });
  const [statusDialog, setStatusDialog] = useState({ show: false, cleaner: null });

  // ---- Form Input Bindings ----
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', age: '', company: '', password: '', confirmPassword: '', isNewCompany: false, newCompanyName: ''
  });

  // ---- Visual Decoration Tokens ----
  const avatarPalettes = [
    ["from-[#3B82F6]", "to-[#60A5FA]"], ["from-[#F0A527]", "to-[#F7C15C]"], 
    ["from-[#FF6B57]", "to-[#FF9C8C]"], ["from-[#38BDF8]", "to-[#7DD3FC]"], 
    ["from-[#159A6B]", "to-[#3FC28E]"], ["from-[#8B5CF6]", "to-[#B39DFB]"]
  ];

  const getInitials = (name) => {
    const parts = name.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // ---- Computed Extracted Company Lists ----
  const uniqueCompanies = useMemo(() => {
    const sets = new Set(cleaners.map(c => c.company).filter(Boolean));
    return Array.from(sets).sort();
  }, [cleaners]);

  // ---- Filter and Search Computations ----
  const filteredCleaners = useMemo(() => {
    return cleaners.filter(u => {
      const matchesCompany = !companyFilter 
        ? true 
        : companyFilter === "__none__" 
          ? !u.company 
          : u.company === companyFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q 
        ? true 
        : u.name.toLowerCase().includes(q) || 
          (u.phone && u.phone.includes(q)) || 
          (u.company && u.company.toLowerCase().includes(q));

      return matchesCompany && matchesSearch;
    });
  }, [cleaners, companyFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCleaners.length / PAGE_SIZE));

  const paginatedCleaners = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCleaners.slice(start, start + PAGE_SIZE);
  }, [filteredCleaners, currentPage]);

  const activeCount = useMemo(() => filteredCleaners.filter(c => c.status === 'Active').length, [filteredCleaners]);
  const inactiveCount = filteredCleaners.length - activeCount;

  // ---- Core Trigger Operations ----
  const openFormSheet = (mode = 'add', cleaner = null) => {
    if (mode === 'edit' && cleaner) {
      setFormData({
        name: cleaner.name, email: cleaner.email || '', phone: cleaner.phone || '', age: cleaner.age || '',
        company: cleaner.company || '', password: '', confirmPassword: '', isNewCompany: false, newCompanyName: ''
      });
      setFormSheet({ show: true, mode: 'edit', cleanerId: cleaner.id });
    } else {
      setFormData({
        name: '', email: '', phone: '', age: '', company: '', password: '', confirmPassword: '', isNewCompany: false, newCompanyName: ''
      });
      setFormSheet({ show: true, mode: 'add', cleanerId: null });
    }
  };

  const handleStatusToggleRequest = (cleaner) => {
    if (cleaner.status === 'Active') {
      setStatusDialog({ show: true, admin: cleaner });
    } else {
      setCleaners(prev => prev.map(c => c.id === cleaner.id ? { ...c, status: 'Active' } : c));
    }
  };

  const executeStatusDisable = () => {
    if (!statusDialog.admin) return;
    setCleaners(prev => prev.map(c => c.id === statusDialog.admin.id ? { ...c, status: 'Inactive' } : c));
    setStatusDialog({ show: false, admin: null });
  };

  const executeDelete = () => {
    if (!deleteDialog.cleaner) return;
    setCleaners(prev => prev.filter(c => c.id !== deleteDialog.cleaner.id));
    setDeleteDialog({ show: false, cleaner: null });
    if (paginatedCleaners.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const assignedCompany = formData.company === '__new__' ? formData.newCompanyName.trim() : formData.company;

    setIsSubmitting(true);
    setTimeout(() => {
      if (formSheet.mode === 'edit') {
        setCleaners(prev => prev.map(c => c.id === formSheet.cleanerId ? {
          ...c,
          name: formData.name.trim(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          age: formData.age.trim() || null,
          company: assignedCompany || null,
          updated: "Jul 17, 2026"
        } : c));
      } else {
        const nextId = cleaners.length > 0 ? Math.max(...cleaners.map(c => c.id)) + 1 : 1;
        setCleaners(prev => [{
          id: nextId,
          name: formData.name.trim(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          age: formData.age.trim() || null,
          company: assignedCompany || null,
          status: "Active",
          created: "Jul 17, 2026",
          updated: "Jul 17, 2026"
        }, ...prev]);
        setCurrentPage(1);
      }
      setIsSubmitting(false);
      setFormSheet({ show: false, mode: 'add', cleanerId: null });
    }, 500);
  };

  return (
    <main className="flex-1 p-4 space-y-4 pb-24 relative">
      
      {/* Dynamic Subheader Title Navigation Module */}
      <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-[#E6F0FF] text-[#1D4ED8] rounded-xl flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display">Cleaner Management</h1>
            <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">
              Manage all cleaner users
            </p>
          </div>
        </div>
      </div>

      {/* Filter Options Search Bars Stack */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
          <input 
            type="text" 
            placeholder="Search by name, number, or company…"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-3 py-2.5 bg-safai-surface border border-safai-border rounded-xl text-xs text-safai-text placeholder:text-safai-text-faint focus:outline-none shadow-safai-sm"
          />
        </div>

        <div className="relative">
          <select 
            value={companyFilter}
            onChange={(e) => { setCompanyFilter(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-2.5 appearance-none bg-safai-surface border border-safai-border rounded-xl text-xs font-bold text-safai-text focus:outline-none shadow-safai-sm pr-9"
          >
            <option value="">All Companies</option>
            {uniqueCompanies.map(c => (
              <option key={c} value={c}>{c} ({cleaners.filter(a => a.company === c).length})</option>
            ))}
            {cleaners.some(a => !a.company) && (
              <option value="__none__">Unassigned ({cleaners.filter(a => !a.company).length})</option>
            )}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint pointer-events-none" />
        </div>

        {/* Dynamic Analytics Breakdown Stat Strip Header Row */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gradient-to-r from-white to-[#E9F2FF] border border-safai-border px-3 py-1.5 rounded-xl shadow-safai-sm flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="text-xs font-bold font-display text-safai-text flex items-baseline gap-1">
                <span className="text-sm font-extrabold">{filteredCleaners.length}</span>
                <span className="text-[9px] text-safai-text-dim font-bold">Cleaners</span>
              </div>
              <p className="text-[8.5px] font-bold text-safai-text-faint truncate flex items-center gap-1">
                {filteredCleaners.length === 0 ? (
                  "No matches"
                ) : inactiveCount === 0 ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#159A6B]" /> 
                    {"All active"}
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#159A6B]" /> {activeCount} active
                    <span className="text-safai-border">|</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8435A]" /> {inactiveCount} inactive
                  </>
                )}
              </p>
            </div>
          </div>

          <button onClick={() => openFormSheet('add')} className="flex items-center gap-1 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white px-3.5 py-2.5 rounded-xl text-xs font-black shadow-safai-glow hover:opacity-90 transition shrink-0 tap-fx">
            <Plus className="w-4 h-4 stroke-[3]" />
            Add
          </button>
        </div>
      </div>

      {/* Primary Cleaners Cards Rows Roster Feed */}
      <div className="space-y-3 pt-1">
        {paginatedCleaners.map((cleaner, idx) => {
          const globalIdx = (currentPage - 1) * PAGE_SIZE + idx + 1;
          const color = avatarPalettes[globalIdx % avatarPalettes.length];
          
          return (
            <div 
              key={cleaner.id}
              onClick={() => setProfileSheet({ show: true, cleaner })}
              className="bg-safai-surface rounded-2xl border border-safai-border shadow-safai-sm p-3.5 space-y-3 transition cursor-pointer hover:border-safai-primary/20"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color[0]} ${color[1]} text-white flex items-center justify-center font-bold font-display text-xs shrink-0 shadow-sm`}>
                    {getInitials(cleaner.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-safai-text truncate">{cleaner.name}</h3>
                    <div className="text-[10px] text-safai-text-dim font-medium flex items-center gap-1 truncate mt-0.5">
                      <Mail className="w-3 h-3 text-safai-text-faint shrink-0" />
                      <span>{cleaner.email || "No email added"}</span>
                    </div>
                    <div className="text-[10px] text-safai-text-dim font-medium flex items-center gap-1 truncate mt-0.5">
                      <Phone className="w-3 h-3 text-safai-text-faint shrink-0" />
                      <span>{cleaner.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switch Interactive Slider Element */}
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleStatusToggleRequest(cleaner); }}
                  className="flex items-center gap-1.5 bg-none border-none p-0 shrink-0 select-none cursor-pointer"
                >
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border tracking-wide uppercase ${
                    cleaner.status === 'Active' 
                      ? 'bg-[#E3FAEC] text-[#159A6B] border-emerald-500/10' 
                      : 'bg-[#FDE7EA] text-[#E8435A] border-red-500/10'
                  }`}>
                    {cleaner.status}
                  </span>
                  <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 relative ${cleaner.status === 'Active' ? 'bg-[#159A6B]' : 'bg-safai-border'}`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${cleaner.status === 'Active' ? 'translate-x-3.5' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>

              <div className="border-t border-dashed border-safai-border pt-2.5 flex justify-between items-end gap-2">
                <div className="text-[9px] font-bold text-safai-text-faint space-y-0.5 min-w-0">
                  <div className="truncate">ID: <b className="text-safai-text-dim font-extrabold font-display">#{cleaner.id}</b></div>
                  <div className="truncate">Role: <b className="text-safai-text-dim font-extrabold">Cleaner</b></div>
                  <div className="truncate flex items-center gap-0.5">
                    <Calendar className="w-2.5 h-2.5" /> Created On: <b className="text-safai-text-dim font-extrabold">{cleaner.created}</b>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setProfileSheet({ show: true, cleaner })} className="p-1.5 bg-safai-primary-soft text-safai-primary border border-safai-primary-soft rounded-lg hover:bg-safai-primary hover:text-white transition shadow-sm tap-fx">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => openFormSheet('edit', cleaner)} className="p-1.5 bg-[#FFF3DC] text-[#F0A527] border border-[#FFF3DC] rounded-lg hover:bg-[#F0A527] hover:text-white transition shadow-sm tap-fx">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteDialog({ show: true, cleaner })} className="p-1.5 bg-safai-red-soft text-safai-red border border-safai-red-soft rounded-lg hover:bg-safai-red hover:text-white transition shadow-sm tap-fx">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCleaners.length === 0 && (
          <div className="text-center py-12 px-4 bg-safai-surface rounded-2xl border border-safai-border">
            <div className="w-12 h-12 bg-safai-surface-soft text-safai-text-faint rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-safai-text">No cleaners found</h4>
            <p className="text-[10px] text-safai-text-faint font-medium mt-0.5">Try widening your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination control metrics panel */}
      {filteredCleaners.length > 0 && (
        <div className="pt-2 text-center space-y-2">
          <p className="text-[10px] font-bold text-safai-text-faint">
            {"Page "}
            <b className="text-safai-text">{currentPage}</b>
            {" of "}
            <b>{totalPages}</b>
            {" · "}
            <b>{filteredCleaners.length}</b>
            {" total cleaners"}
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="w-8 h-8 rounded-lg border border-safai-border bg-safai-surface flex items-center justify-center text-safai-text-dim disabled:opacity-35 transition tap-fx"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-safai-primary bg-safai-primary-soft border border-safai-primary/20 px-3 py-1.5 rounded-lg font-display">
              {currentPage}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="w-8 h-8 rounded-lg border border-safai-border bg-safai-surface flex items-center justify-center text-safai-text-dim disabled:opacity-35 transition tap-fx"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= BOTTOM SHEET SLIDER FORM: ADD / EDIT CLEANERS PANEL ================= */}
      {formSheet.show && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[90] animate-in fade-in duration-200" onClick={() => setFormSheet({ show: false, mode: 'add', cleanerId: null })} />
          <div className="absolute left-0 right-0 bottom-0 bg-safai-surface border-t border-safai-border rounded-t-[26px] z-[91] p-4 space-y-4 shadow-2xl max-h-[92%] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-safai-border rounded-full mx-auto" />
            
            <div className="flex justify-between items-center">
              <button onClick={() => setFormSheet({ show: false, mode: 'add', cleanerId: null })} className="flex items-center gap-1 text-[11px] font-bold text-safai-text-dim">
                <ChevronLeft className="w-4 h-4" /> Back to Cleaners
              </button>
              <button onClick={() => setFormSheet({ show: false, mode: 'add', cleanerId: null })} className="w-7 h-7 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-lg flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2.5 items-center">
              <div className="w-10 h-10 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-safai-text font-display">
                  {formSheet.mode === 'edit' ? "Edit Cleaner" : "Add New Cleaner"}
                </h2>
                <p className="text-[10px] text-safai-text-faint font-medium">
                  {formSheet.mode === 'edit' ? "Update cleaner information" : "Create a new cleaner account"}
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">
                  Full Name <span className="text-safai-red">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-safai-text-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="text" required placeholder="Enter full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-safai-text-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">
                  Phone Number <span className="text-safai-red">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-safai-text-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="tel" required placeholder="10 digit phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-10 pr-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">Age</label>
                  <input type="text" placeholder="Optional" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">Company</label>
                  <div className="relative">
                    <select 
                      value={formData.isNewCompany ? "__new__" : formData.company}
                      onChange={(e) => {
                        const isNew = e.target.value === '__new__';
                        setFormData({ ...formData, company: isNew ? '' : e.target.value, isNewCompany: isNew });
                      }}
                      className="w-full pl-3 pr-9 py-2.5 appearance-none bg-safai-surface-soft border border-safai-border rounded-xl text-xs font-bold text-safai-text focus:outline-none focus:border-safai-primary focus:bg-white"
                    >
                      <option value="">Select company</option>
                      {Array.from(new Set([...baseCompanies, ...uniqueCompanies])).sort().map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="__new__">+ Add new company…</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint pointer-events-none" />
                  </div>
                </div>
              </div>

              {formData.isNewCompany && (
                <div className="space-y-1 animate-in fade-in duration-200">
                  <label className="text-[10px] font-bold text-safai-primary uppercase">New Company Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-safai-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="text" required placeholder="Enter new company name" value={formData.newCompanyName} onChange={(e) => setFormData({ ...formData, newCompanyName: e.target.value })} className="w-full pl-10 pr-3 py-2.5 bg-white border border-safai-primary rounded-xl text-xs text-safai-text font-semibold focus:outline-none" />
                  </div>
                </div>
              )}

              <div className="space-y-3.5 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">
                    {formSheet.mode === 'edit' ? "New Password" : "Password"}{" "}
                    {formSheet.mode === 'add' && <span className="text-safai-red">*</span>}
                  </label>
                  <input type="password" required={formSheet.mode === 'add'} placeholder="••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary focus:bg-white" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">
                    {formSheet.mode === 'edit' ? "Confirm New Password" : "Confirm Password"}{" "}
                    {formSheet.mode === 'add' && <span className="text-safai-red">*</span>}
                  </label>
                  <input type="password" required={formSheet.mode === 'add'} placeholder="Re-enter password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary focus:bg-white" />
                  {formSheet.mode === 'edit' && (
                    <span className="text-[9px] font-bold text-safai-text-faint block pl-0.5">Leave blank to keep current password</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-safai-text-faint tracking-wider uppercase">Role</label>
                <div className="p-3 rounded-xl border border-safai-border bg-safai-surface-soft flex flex-col justify-center leading-tight">
                  <div className="text-xs font-black text-safai-text">Cleaner</div>
                  {formSheet.mode === 'edit' && <div className="text-[9px] font-medium text-safai-text-faint mt-0.5">Role cannot be changed</div>}
                </div>
              </div>

              <div className="sheet-divider h-px bg-safai-border my-4" />

              <div className="flex gap-2.5 pb-2">
                <button type="button" onClick={() => setFormSheet({ show: false, mode: 'add', cleanerId: null })} className="flex-1 py-2.5 bg-safai-surface-soft text-safai-text font-bold text-xs rounded-xl border border-safai-border flex items-center justify-center gap-1">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-[1.5_1_0%] py-2.5 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white font-black text-xs rounded-xl shadow-safai-glow flex items-center justify-center gap-1.5 uppercase tracking-wider disabled:opacity-75">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{formSheet.mode === 'edit' ? "Update Cleaner" : "Create Cleaner"}</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ================= BOTTOM SHEET COMPONENT: VIEW CLEANER PROFILE DETAILS ================= */}
      {profileSheet.show && profileSheet.cleaner && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[90] animate-in fade-in duration-200" onClick={() => setProfileSheet({ show: false, cleaner: null })} />
          <div className="absolute left-0 right-0 bottom-0 bg-safai-surface border-t border-safai-border rounded-t-[26px] z-[91] p-4 space-y-4 shadow-2xl max-h-[94%] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-safai-border rounded-full mx-auto" />
            
            <div className="flex justify-between items-center">
              <button onClick={() => setProfileSheet({ show: false, cleaner: null })} className="flex items-center gap-1 text-[11px] font-bold text-safai-text-dim">
                <ChevronLeft className="w-4 h-4" /> Back to Cleaners
              </button>
              <button onClick={() => setProfileSheet({ show: false, cleaner: null })} className="w-7 h-7 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-lg flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-2.5 items-center min-w-0">
                <div className="w-9 h-9 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="text-base font-black text-safai-text font-display truncate">Cleaner Details</h2>
              </div>
              <button 
                onClick={() => { const target = profileSheet.cleaner; setProfileSheet({ show: false, cleaner: null }); setTimeout(() => openFormSheet('edit', target), 200); }}
                className="flex items-center gap-1 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-sm hover:opacity-90 shrink-0"
              >
                <Edit3 className="w-3 h-3" /> Edit Details
              </button>
            </div>

            <div className="border border-safai-border rounded-2xl overflow-hidden bg-safai-surface shadow-sm">
              <div className="h-16 bg-gradient-to-r from-safai-primary-soft to-safai-surface-tint" />
              <div className="px-4 -mt-8 flex justify-between items-end">
                <div className="w-14 h-14 bg-safai-surface border border-safai-border text-safai-primary rounded-2xl flex items-center justify-center font-bold font-display shadow-sm text-sm">
                  {getInitials(profileSheet.cleaner.name)}
                </div>
                <span className="text-[10px] font-bold text-safai-text-faint mb-1">Details View Enabled</span>
              </div>

              <div className="p-4 space-y-3">
                {[
                  { label: "Name", val: profileSheet.cleaner.name, icon: <User className="w-3.5 h-3.5" /> },
                  { label: "Email", val: profileSheet.cleaner.email || "N/A", icon: <Mail className="w-3.5 h-3.5" />, placeholder: !profileSheet.cleaner.email },
                  { label: "Phone", val: profileSheet.cleaner.phone || "Not provided", icon: <Phone className="w-3.5 h-3.5" />, placeholder: !profileSheet.cleaner.phone, isNum: true },
                  { label: "User ID", val: `#${profileSheet.cleaner.id} ${profileSheet.cleaner.age ? `(Age: ${profileSheet.cleaner.age})` : ''}`, icon: <Users className="w-3.5 h-3.5" />, isNum: true },
                  { label: "Role", val: "Cleaner", icon: <Shield className="w-3.5 h-3.5" />, highlight: true },
                  { label: "Company", val: profileSheet.cleaner.company || "—", icon: <Building2 className="w-3.5 h-3.5" />, placeholder: !profileSheet.cleaner.company },
                  { label: "Created On", val: profileSheet.cleaner.created, icon: <Calendar className="w-3.5 h-3.5" />, isNum: true },
                  { label: "Updated On", val: profileSheet.cleaner.updated, icon: <Calendar className="w-3.5 h-3.5" />, isNum: true }
                ].map((f, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase flex items-center gap-1">
                      <span className="text-safai-primary/60">{f.icon}</span> {f.label}
                    </span>
                    <div className={`w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs ${
                      f.highlight ? 'text-safai-primary font-black shadow-inner bg-[#E6F0FF]/40 border-safai-primary/20' : 
                      f.placeholder ? 'text-safai-text-faint italic font-medium' : 'text-safai-text font-bold'
                    } ${f.isNum ? 'font-display' : ''}`}>
                      {f.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= MODAL DIALOG COMPONENT: PERMANENT REMOVAL ALERT ================= */}
      {deleteDialog.show && deleteDialog.cleaner && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[95] animate-in fade-in duration-200" onClick={() => setDeleteDialog({ show: false, cleaner: null })} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[300px] bg-safai-surface rounded-2xl p-5 text-center shadow-2xl z-[96] border border-safai-border space-y-4 aria-modal animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-safai-red-soft text-safai-red rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-safai-text font-display">Remove Cleaner?</h3>
              <p className="text-[11px] text-safai-text-dim font-medium leading-relaxed">
                {"This will permanently revoke admin rights for "}
                <b className="text-safai-text font-black">{`"${deleteDialog.cleaner.name}"`}</b>
                {". This action can't be undone."}
              </p>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button onClick={() => setDeleteDialog({ show: false, cleaner: null })} className="flex-1 py-2 bg-safai-surface-soft border border-safai-border text-safai-text font-bold text-xs rounded-xl transition tap-fx">
                Cancel
              </button>
              <button onClick={executeDelete} className="flex-1 py-2 bg-gradient-to-r from-safai-red to-[#FF6B57] text-white font-bold text-xs rounded-xl shadow-md transition tap-fx">
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {/* ================= MODAL DIALOG COMPONENT: ACCOUNT DEACTIVATION WARNING ================= */}
      {statusDialog.show && statusDialog.admin && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[95] animate-in fade-in duration-200" onClick={() => setStatusDialog({ show: false, admin: null })} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[300px] bg-safai-surface rounded-2xl p-5 text-center shadow-2xl z-[96] border border-safai-border space-y-4 aria-modal animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-[#FFF3DC] text-[#F0A527] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-safai-text font-display">
                {"Disable "}
                <span>{`"${statusDialog.admin.name}"`}</span>
                {"?"}
              </h3>
              <p className="text-[11px] text-safai-text-dim font-medium leading-relaxed">
                Disabling this user will remove all their location assignments. You will need to reassign locations if reactivated, except for Cleaners.
              </p>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button onClick={() => setStatusDialog({ show: false, admin: null })} className="flex-1 py-2 bg-safai-surface-soft border border-safai-border text-safai-text font-bold text-xs rounded-xl transition tap-fx">
                Cancel
              </button>
              <button onClick={executeStatusDisable} className="flex-1 py-2 bg-gradient-to-r from-[#F0A527] to-[#F7C15C] text-white font-bold text-xs rounded-xl shadow-md transition tap-fx">
                Disable
              </button>
            </div>
          </div>
        </>
      )}

    </main>
  );
}