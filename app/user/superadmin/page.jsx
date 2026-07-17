"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, ChevronDown, Users, Plus, Mail, Phone, 
  Calendar, Eye, Edit3, Trash2, ArrowLeft, X, 
  ShieldAlert, User, Shield, Building2, Save, 
  ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';

export default function SuperadminManagement() {
  // ---- Core Reactive State Data ----
  const [superadmins, setSuperadmins] = useState([
    { id: 1, name: "Omkar Porlikar-01", email: "omkrporlikar353@gmail.com", phone: "9111111115", age: "25", company: "Ikje", status: "Active", created: "Jun 20, 2026", updated: "Jun 20, 2026" },
    { id: 2, name: "Kartik Kanzode", email: null, phone: "1111111100", age: "28", company: null, status: "Active", created: "Jun 21, 2026", updated: "Jun 21, 2026" },
    { id: 3, name: "Harish Adatiya", email: "9021550864@gmail.com", phone: "9860600040", age: "31", company: "HIOKEU Corp", status: "Active", created: "Jun 22, 2026", updated: "Jun 22, 2026" },
    { id: 4, name: "Anil-1 Safai Superadmin", email: "1111111111sdgdj@gmail.com", phone: "9021550864", age: "29", company: null, status: "Active", created: "Jun 22, 2026", updated: "Jun 23, 2026" },
    { id: 5, name: "Anad Superadmin", email: "demo5@gmail.com", phone: "9356150565", age: "26", company: "Pearls", status: "Active", created: "Jun 23, 2026", updated: "Jun 23, 2026" },
    { id: 6, name: "Kartik", email: "test56@gmail.com", phone: "1111111110", age: "24", company: null, status: "Active", created: "Jun 24, 2026", updated: "Jun 24, 2026" },
    { id: 7, name: "Safai superadmin", email: null, phone: "9021550861", age: "35", company: null, status: "Active", created: "Jun 24, 2026", updated: "Jun 25, 2026" },
    { id: 8, name: "Test-1 SuperAdmin", email: "klgfd@gmail.com", phone: "9021550860", age: "22", company: "Nimbus Facilities", status: "Active", created: "Jun 25, 2026", updated: "Jun 25, 2026" },
    { id: 9, name: "Charvi Chandekar", email: "charvi.chandekar@pugarch.in", phone: "9850246304", age: "27", company: null, status: "Active", created: "Jun 26, 2026", updated: "Jun 26, 2026" },
    { id: 10, name: "Omkar Porlikar", email: "omkar11@example.com", phone: "1111111111", age: "30", company: null, status: "Active", created: "Jun 27, 2026", updated: "Jun 27, 2026" }
  ]);

  const baseCompanies = ["Ikje", "Pearls", "HIOKEU Corp", "Nimbus Facilities", "Vertex Holdings"];

  // ---- Query & Navigation Control States ----
  const [searchQuery, setSearchQuery] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const PAGE_SIZE = 5;

  // ---- Modals & Bottom Sheets Controllers ----
  const [formSheet, setFormSheet] = useState({ show: false, mode: 'add', superadminId: null });
  const [profileSheet, setProfileSheet] = useState({ show: false, superadmin: null });
  const [deleteDialog, setDeleteDialog] = useState({ show: false, superadmin: null });
  const [statusDialog, setStatusDialog] = useState({ show: false, superadmin: null });

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
    const sets = new Set(superadmins.map(s => s.company).filter(Boolean));
    return Array.from(sets).sort();
  }, [superadmins]);

  // ---- Filter and Search Computations ----
  const filteredSuperadmins = useMemo(() => {
    return superadmins.filter(u => {
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
  }, [superadmins, companyFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredSuperadmins.length / PAGE_SIZE));

  const paginatedSuperadmins = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSuperadmins.slice(start, start + PAGE_SIZE);
  }, [filteredSuperadmins, currentPage]);

  const activeCount = useMemo(() => filteredSuperadmins.filter(s => s.status === 'Active').length, [filteredSuperadmins]);
  const inactiveCount = filteredSuperadmins.length - activeCount;

  // ---- Core Trigger Operations ----
  const openFormSheet = (mode = 'add', superadmin = null) => {
    if (mode === 'edit' && superadmin) {
      setFormData({
        name: superadmin.name, email: superadmin.email || '', phone: superadmin.phone || '', age: superadmin.age || '',
        company: superadmin.company || '', password: '', confirmPassword: '', isNewCompany: false, newCompanyName: ''
      });
      setFormSheet({ show: true, mode: 'edit', superadminId: superadmin.id });
    } else {
      setFormData({
        name: '', email: '', phone: '', age: '', company: '', password: '', confirmPassword: '', isNewCompany: false, newCompanyName: ''
      });
      setFormSheet({ show: true, mode: 'add', superadminId: null });
    }
  };

  const handleStatusToggleRequest = (superadmin) => {
    if (superadmin.status === 'Active') {
      setStatusDialog({ show: true, superadmin });
    } else {
      setSuperadmins(prev => prev.map(s => s.id === superadmin.id ? { ...s, status: 'Active' } : s));
    }
  };

  const executeStatusDisable = () => {
    if (!statusDialog.superadmin) return;
    setSuperadmins(prev => prev.map(s => s.id === statusDialog.superadmin.id ? { ...s, status: 'Inactive' } : s));
    setStatusDialog({ show: false, superadmin: null });
  };

  const executeDelete = () => {
    if (!deleteDialog.superadmin) return;
    setSuperadmins(prev => prev.filter(s => s.id !== deleteDialog.superadmin.id));
    setDeleteDialog({ show: false, superadmin: null });
    if (paginatedSuperadmins.length === 1 && currentPage > 1) {
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
        setSuperadmins(prev => prev.map(s => s.id === formSheet.superadminId ? {
          ...s,
          name: formData.name.trim(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          age: formData.age.trim() || null,
          company: assignedCompany || null,
          updated: "Jul 17, 2026"
        } : a));
      } else {
        const nextId = superadmins.length > 0 ? Math.max(...superadmins.map(s => s.id)) + 1 : 1;
        setSuperadmins(prev => [{
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
      setFormSheet({ show: false, mode: 'add', superadminId: null });
    }, 500);
  };

  return (
    <main className="flex-1 p-4 space-y-4 pb-24 relative">
      
      {/* Sub Header Segment Block */}
      <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-[#E6F0FF] text-[#1D4ED8] rounded-xl flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display">Superadmin Management</h1>
            <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">
              Manage all superadmin users
            </p>
          </div>
        </div>
      </div>

      {/* Filter Parameters Form Bars Row Stack */}
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
              <option key={c} value={c}>{c} ({superadmins.filter(s => s.company === c).length})</option>
            ))}
            {superadmins.some(s => !s.company) && (
              <option value="__none__">Unassigned ({superadmins.filter(s => !s.company).length})</option>
            )}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint pointer-events-none" />
        </div>

        {/* Operational Indicators Count Grid Line */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gradient-to-r from-white to-[#E9F2FF] border border-safai-border px-3 py-1.5 rounded-xl shadow-safai-sm flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="text-xs font-bold font-display text-safai-text flex items-baseline gap-1">
                <span className="text-sm font-extrabold">{filteredSuperadmins.length}</span>
                <span className="text-[9px] text-safai-text-dim font-bold">Superadmins</span>
              </div>
              <p className="text-[8.5px] font-bold text-safai-text-faint truncate flex items-center gap-1">
                {filteredSuperadmins.length === 0 ? (
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

      {/* Primary Cards Roster Block Stack Container */}
      <div className="space-y-3 pt-1">
        {paginatedSuperadmins.map((superadmin, idx) => {
          const globalIdx = (currentPage - 1) * PAGE_SIZE + idx + 1;
          const color = avatarPalettes[globalIdx % avatarPalettes.length];
          
          return (
            <div 
              key={superadmin.id}
              onClick={() => setProfileSheet({ show: true, superadmin })}
              className="bg-safai-surface rounded-2xl border border-safai-border shadow-safai-sm p-3.5 space-y-3 transition cursor-pointer hover:border-safai-primary/20"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color[0]} ${color[1]} text-white flex items-center justify-center font-bold font-display text-xs shrink-0 shadow-sm`}>
                    {getInitials(superadmin.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-safai-text truncate">{superadmin.name}</h3>
                    <div className="text-[10px] text-safai-text-dim font-medium flex items-center gap-1 truncate mt-0.5">
                      <Mail className="w-3 h-3 text-safai-text-faint shrink-0" />
                      <span>{superadmin.email || "No email added"}</span>
                    </div>
                    <div className="text-[10px] text-safai-text-dim font-medium flex items-center gap-1 truncate mt-0.5">
                      <Phone className="w-3 h-3 text-safai-text-faint shrink-0" />
                      <span>{superadmin.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switch Interactive Slider Element */}
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleStatusToggleRequest(superadmin); }}
                  className="flex items-center gap-1.5 bg-none border-none p-0 shrink-0 select-none cursor-pointer"
                >
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border tracking-wide uppercase ${
                    superadmin.status === 'Active' 
                      ? 'bg-[#E3FAEC] text-[#159A6B] border-emerald-500/10' 
                      : 'bg-[#FDE7EA] text-[#E8435A] border-red-500/10'
                  }`}>
                    {superadmin.status}
                  </span>
                  <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 relative ${superadmin.status === 'Active' ? 'bg-[#159A6B]' : 'bg-safai-border'}`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${superadmin.status === 'Active' ? 'translate-x-3.5' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>

              <div className="border-t border-dashed border-safai-border pt-2.5 flex justify-between items-end gap-2">
                <div className="text-[9px] font-bold text-safai-text-faint space-y-0.5 min-w-0">
                  <div className="truncate">ID: <b className="text-safai-text-dim font-extrabold font-display">#{superadmin.id}</b></div>
                  <div className="truncate">Role: <b className="text-safai-text-dim font-extrabold">Superadmin</b></div>
                  <div className="truncate flex items-center gap-0.5">
                    <Calendar className="w-2.5 h-2.5" /> Created On: <b className="text-safai-text-dim font-extrabold">{superadmin.created}</b>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setProfileSheet({ show: true, superadmin })} className="p-1.5 bg-safai-primary-soft text-safai-primary border border-safai-primary-soft rounded-lg hover:bg-safai-primary hover:text-white transition shadow-sm tap-fx">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => openFormSheet('edit', superadmin)} className="p-1.5 bg-[#FFF3DC] text-[#F0A527] border border-[#FFF3DC] rounded-lg hover:bg-[#F0A527] hover:text-white transition shadow-sm tap-fx">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteDialog({ show: true, superadmin })} className="p-1.5 bg-safai-red-soft text-safai-red border border-safai-red-soft rounded-lg hover:bg-safai-red hover:text-white transition shadow-sm tap-fx">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredSuperadmins.length === 0 && (
          <div className="text-center py-12 px-4 bg-safai-surface rounded-2xl border border-safai-border">
            <div className="w-12 h-12 bg-safai-surface-soft text-safai-text-faint rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-safai-text">No superadmins found</h4>
            <p className="text-[10px] text-safai-text-faint font-medium mt-0.5">Try widening your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination Action Control Bar Layout */}
      {filteredSuperadmins.length > 0 && (
        <div className="pt-2 text-center space-y-2">
          <p className="text-[10px] font-bold text-safai-text-faint">
            {"Page "}
            <b className="text-safai-text">{currentPage}</b>
            {" of "}
            <b>{totalPages}</b>
            {" · "}
            <b>{filteredSuperadmins.length}</b>
            {" total superadmins"}
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

      {/* ================= BOTTOM SHEET CONTAINER FORM: ADD / EDIT SUPERADMINS ================= */}
      {formSheet.show && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[90] animate-in fade-in duration-200" onClick={() => setFormSheet({ show: false, mode: 'add', superadminId: null })} />
          <div className="absolute left-0 right-0 bottom-0 bg-safai-surface border-t border-safai-border rounded-t-[26px] z-[91] p-4 space-y-4 shadow-2xl max-h-[92%] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-safai-border rounded-full mx-auto" />
            
            <div className="flex justify-between items-center">
              <button onClick={() => setFormSheet({ show: false, mode: 'add', superadminId: null })} className="flex items-center gap-1 text-[11px] font-bold text-safai-text-dim">
                <ChevronLeft className="w-4 h-4" /> Back to Superadmins
              </button>
              <button onClick={() => setFormSheet({ show: false, mode: 'add', superadminId: null })} className="w-7 h-7 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-lg flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2.5 items-center">
              <div className="w-10 h-10 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-safai-text font-display">
                  {formSheet.mode === 'edit' ? "Edit Superadmin" : "Add New Superadmin"}
                </h2>
                <p className="text-[10px] text-safai-text-faint font-medium">
                  {formSheet.mode === 'edit' ? "Update superadmin account parameters" : "Create a secondary platform superadmin account"}
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
                  <input type="tel" required placeholder="10 digit phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-10 pr-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white" />
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
                  <input type="password" required={formSheet.mode === 'add'} placeholder="•••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary focus:bg-white" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-safai-text-dim uppercase tracking-wider">
                    {formSheet.mode === 'edit' ? "Confirm New Password" : "Confirm Password"}{" "}
                    {formSheet.mode === 'add' && <span className="text-safai-red">*</span>}
                  </label>
                  <input type="password" required={formSheet.mode === 'add'} placeholder="Re-enter secret password confirmation" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary focus:bg-white" />
                  {formSheet.mode === 'edit' && (
                    <span className="text-[9px] font-bold text-safai-text-faint block pl-0.5">Leave blank to retain current system password credentials</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-safai-text-faint tracking-wider uppercase">Role</label>
                <div className="p-3 rounded-xl border border-safai-border bg-safai-surface-soft flex flex-col justify-center leading-tight">
                  <div className="text-xs font-black text-safai-text">Superadmin</div>
                  {formSheet.mode === 'edit' && <div className="text-[9px] font-medium text-safai-text-faint mt-0.5">Role level cannot be altered</div>}
                </div>
              </div>

              <div className="sheet-divider h-px bg-safai-border my-4" />

              <div className="flex gap-2.5 pb-2">
                <button type="button" onClick={() => setFormSheet({ show: false, mode: 'add', superadminId: null })} className="flex-1 py-2.5 bg-safai-surface-soft text-safai-text font-bold text-xs rounded-xl border border-safai-border flex items-center justify-center gap-1">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-[1.5_1_0%] py-2.5 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white font-black text-xs rounded-xl shadow-safai-glow flex items-center justify-center gap-1.5 uppercase tracking-wider disabled:opacity-75">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{formSheet.mode === 'edit' ? "Update User" : "Create Account"}</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ================= BOTTOM SHEET COMPONENT: INFOPANEL PROFILE DETAILS OVERVIEW ================= */}
      {profileSheet.show && profileSheet.superadmin && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[90] animate-in fade-in duration-200" onClick={() => setProfileSheet({ show: false, superadmin: null })} />
          <div className="absolute left-0 right-0 bottom-0 bg-safai-surface border-t border-safai-border rounded-t-[26px] z-[91] p-4 space-y-4 shadow-2xl max-h-[94%] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-safai-border rounded-full mx-auto" />
            
            <div className="flex justify-between items-center">
              <button onClick={() => setProfileSheet({ show: false, superadmin: null })} className="flex items-center gap-1 text-[11px] font-bold text-safai-text-dim">
                <ChevronLeft className="w-4 h-4" /> Back to Superadmins
              </button>
              <button onClick={() => setProfileSheet({ show: false, superadmin: null })} className="w-7 h-7 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-lg flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-2.5 items-center min-w-0">
                <div className="w-9 h-9 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="text-base font-black text-safai-text font-display truncate">Superadmin Details</h2>
              </div>
              <button 
                onClick={() => { const target = profileSheet.superadmin; setProfileSheet({ show: false, superadmin: null }); setTimeout(() => openFormSheet('edit', target), 200); }}
                className="flex items-center gap-1 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-sm hover:opacity-90 shrink-0"
              >
                <Edit3 className="w-3 h-3" /> Edit Details
              </button>
            </div>

            <div className="border border-safai-border rounded-2xl overflow-hidden bg-safai-surface shadow-sm">
              <div className="h-16 bg-gradient-to-r from-safai-primary-soft to-safai-surface-tint" />
              <div className="px-4 -mt-8 flex justify-between items-end">
                <div className="w-14 h-14 bg-safai-surface border border-safai-border text-safai-primary rounded-2xl flex items-center justify-center font-bold font-display shadow-sm text-sm">
                  {getInitials(profileSheet.superadmin.name)}
                </div>
                <span className="text-[10px] font-bold text-safai-text-faint mb-1">Details View Enabled</span>
              </div>

              <div className="p-4 space-y-3">
                {[
                  { label: "Name", val: profileSheet.superadmin.name, icon: <User className="w-3.5 h-3.5" /> },
                  { label: "Email", val: profileSheet.superadmin.email || "N/A", icon: <Mail className="w-3.5 h-3.5" />, placeholder: !profileSheet.superadmin.email },
                  { label: "Phone", val: profileSheet.superadmin.phone || "Not provided", icon: <Phone className="w-3.5 h-3.5" />, placeholder: !profileSheet.superadmin.phone, isNum: true },
                  { label: "User ID", val: `#${profileSheet.superadmin.id} ${profileSheet.superadmin.age ? `(Age: ${profileSheet.superadmin.age})` : ''}`, icon: <Users className="w-3.5 h-3.5" />, isNum: true },
                  { label: "Role", val: "Superadmin", icon: <Shield className="w-3.5 h-3.5" />, highlight: true },
                  { label: "Company", val: profileSheet.superadmin.company || "—", icon: <Building2 className="w-3.5 h-3.5" />, placeholder: !profileSheet.superadmin.company },
                  { label: "Created On", val: profileSheet.superadmin.created, icon: <Calendar className="w-3.5 h-3.5" />, isNum: true },
                  { label: "Updated On", val: profileSheet.superadmin.updated, icon: <Calendar className="w-3.5 h-3.5" />, isNum: true }
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

      {/* ================= MODAL DELETION WARNING DIALOG BOX ALERT ================= */}
      {deleteDialog.show && deleteDialog.superadmin && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[95] animate-in fade-in duration-200" onClick={() => setDeleteDialog({ show: false, superadmin: null })} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[300px] bg-safai-surface rounded-2xl p-5 text-center shadow-2xl z-[96] border border-safai-border space-y-4 aria-modal animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-safai-red-soft text-safai-red rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-safai-text font-display">Remove Superadmin?</h3>
              <p className="text-[11px] text-safai-text-dim font-medium leading-relaxed">
                {"This will permanently revoke admin rights for "}
                <b className="text-safai-text font-black">{`"${deleteDialog.superadmin.name}"`}</b>
                {". This action can't be undone."}
              </p>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button onClick={() => setDeleteDialog({ show: false, superadmin: null })} className="flex-1 py-2 bg-safai-surface-soft border border-safai-border text-safai-text font-bold text-xs rounded-xl transition tap-fx">
                Cancel
              </button>
              <button onClick={executeDelete} className="flex-1 py-2 bg-gradient-to-r from-safai-red to-[#FF6B57] text-white font-bold text-xs rounded-xl shadow-md transition tap-fx">
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {/* ================= MODAL STATUS CONFIRM DISABLING DIALOG ALERT ================= */}
      {statusDialog.show && statusDialog.superadmin && (
        <>
          <div className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-[95] animate-in fade-in duration-200" onClick={() => setStatusDialog({ show: false, superadmin: null })} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[300px] bg-safai-surface rounded-2xl p-5 text-center shadow-2xl z-[96] border border-safai-border space-y-4 aria-modal animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-[#FFF3DC] text-[#F0A527] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-safai-text font-display">
                {"Disable "}
                <span>{`"${statusDialog.superadmin.name}"`}</span>
                {"?"}
              </h3>
              <p className="text-[11px] text-safai-text-dim font-medium leading-relaxed">
                Disabling this user will remove all their location assignments. You will need to reassign locations if reactivated, except for Superadmins.
              </p>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button onClick={() => setStatusDialog({ show: false, superadmin: null })} className="flex-1 py-2 bg-safai-surface-soft border border-safai-border text-safai-text font-bold text-xs rounded-xl transition tap-fx">
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