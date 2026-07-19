"use client";

import React, { useState, useMemo } from 'react';
import { 
  Users, Plus, LayoutGrid, Search, 
  RotateCcw, CalendarDays, Edit3,
  ChevronLeft, ChevronRight, X, Save
} from 'lucide-react';

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  // Mock Data for Staff Registry
  const [staffMembers, setStaffMembers] = useState([
    { id: '#442', name: 'Sneha Gupta', phone: '9121606496', email: '', role: 'CLEANER', initial: 'S' },
    { id: '#441', name: 'New Cleaner Ktc', phone: '9100025946', email: '', role: 'CLEANER', initial: 'N' },
    { id: '#394', name: 'Test90', phone: '', email: 'hjoi@gmail.com', role: 'CLEANER', initial: 'T' },
    { id: '#386', name: 'Kamlesh Sup...', phone: '', email: 'KamleshSupervisor.test@safai.com', role: 'SUPERVISOR', initial: 'K' },
    { id: '#277', name: 'Hyacinth ...', phone: '', email: 'gyne@mailinator.com', role: 'FACILITY ADMIN', initial: 'H' },
    { id: '#254', name: 'Rahul Sharma', phone: '9169403535', email: '', role: 'CLEANER', initial: 'R' },
    { id: '#251', name: 'Priya Patel', phone: '4494869503', email: '', role: 'CLEANER', initial: 'P' },
    { id: '#249', name: 'Amit Kumar', phone: '9150653001', email: '', role: 'SUPERVISOR', initial: 'A' },
    { id: '#244', name: 'Anjali Desai', phone: '9846464646', email: '', role: 'SUPERVISOR', initial: 'A' },
    { id: '#238', name: 'Sneha Gupta B', phone: '9149956453', email: '', role: 'CLEANER', initial: 'S' },
    { id: '#211', name: 'Kartik Kanzode', phone: '1111111100', email: '', role: 'FACILITY ADMIN', initial: 'K' },
    { id: '#198', name: 'Harish Adatiya', phone: '', email: '9021550864@gmail.com', role: 'SUPERVISOR', initial: 'H' },
    { id: '#184', name: 'Charvi Chandekar', phone: '9850246304', email: '', role: 'CLEANER', initial: 'C' },
    { id: '#176', name: 'Anad Admin', phone: '', email: 'demo5@gmail.com', role: 'FACILITY ADMIN', initial: 'A' },
    { id: '#142', name: 'Ramesh Test', phone: '', email: 'ramesh.test@safai.com', role: 'FACILITY ADMIN', initial: 'R' }
  ]);

  // Edit Panel Form State Controls
  const [editSheet, setEditSheet] = useState({ show: false, targetMember: null });
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', role: '' });

  // Open sheet handler targeting specific registry index keys
  const handleOpenEdit = (member) => {
    setFormData({
      name: member.name,
      phone: member.phone || '',
      email: member.email || '',
      role: member.role
    });
    setEditSheet({ show: true, targetMember: member });
  };

  // Submit and patch modifications live back down into records allocation table
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editSheet.targetMember) return;

    setStaffMembers(prev => prev.map(m => m.id === editSheet.targetMember.id ? {
      ...m,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      role: formData.role,
      initial: formData.name.trim().charAt(0).toUpperCase() || '?'
    } : m));

    setEditSheet({ show: false, targetMember: null });
  };

  // Dynamically compute counter tabs based on the active dataset search query matches
  const counters = useMemo(() => {
    const searchMatch = staffMembers.filter(member => {
      return member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
             (member.phone && member.phone.includes(searchQuery));
    });

    return [
      { key: 'ALL', count: searchMatch.length, label: 'TOTAL MATCH' },
      { key: 'SUPERVISOR', count: searchMatch.filter(m => m.role === 'SUPERVISOR').length, label: 'SUPERVISOR' },
      { key: 'CLEANER', count: searchMatch.filter(m => m.role === 'CLEANER').length, label: 'CLEANER' },
      { key: 'FACILITY ADMIN', count: searchMatch.filter(m => m.role === 'FACILITY ADMIN').length, label: 'FAC. ADMIN' },
    ];
  }, [staffMembers, searchQuery]);

  // Combined Search and Filter Logic execution matching directory view scope mapping rules
  const filteredStaff = useMemo(() => {
    return staffMembers.filter(member => {
      const matchesFilter = activeFilter === 'ALL' || member.role === activeFilter;
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (member.phone && member.phone.includes(searchQuery));
      return matchesFilter && matchesSearch;
    });
  }, [staffMembers, activeFilter, searchQuery]);

  // Compute pagination parameters
  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / PAGE_SIZE));
  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredStaff.slice(start, start + PAGE_SIZE);
  }, [filteredStaff, currentPage]);

  return (
    <main className="flex-1 p-4 space-y-4 pb-20 relative">
      
      {/* Main Module Headline Card */}
      <div className="bg-safai-surface p-4 rounded-2xl shadow-safai-sm border border-safai-border space-y-3">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display tracking-wide uppercase">User Management</h1>
            <p className="text-[9px] font-bold text-safai-text-faint tracking-wide uppercase leading-tight">
              Manage Roles, Permissions, and Staff Access
            </p>
          </div>
        </div>
      </div>

      {/* Metric Scopes Configuration Counters */}
      <div className="bg-safai-surface p-4 rounded-2xl shadow-safai-sm border border-safai-border space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-safai-surface-soft text-safai-violet rounded-lg flex items-center justify-center border border-safai-border shrink-0">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-safai-text">Registry Counters</h2>
            <p className="text-[10px] text-safai-text-dim">Filter directory list view scopes</p>
          </div>
        </div>

        {/* Micro Dashboard Horizontal Grid layout selectors */}
        <div className="grid grid-cols-4 gap-1.5">
          {counters.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveFilter(item.key); setCurrentPage(1); }}
              className={`p-2 rounded-xl flex flex-col items-center justify-center transition border tap-fx ${
                activeFilter === item.key 
                  ? 'bg-safai-text border-safai-text text-white shadow-safai-sm' 
                  : 'bg-safai-surface-soft border-safai-border text-safai-text hover:bg-safai-border/40'
              }`}
            >
              <span className="text-xs font-extrabold leading-tight">{item.count}</span>
              <span className={`text-[7px] font-bold tracking-tighter text-center mt-0.5 uppercase block truncate w-full ${
                activeFilter === item.key ? 'text-safai-lime-2' : 'text-safai-text-dim'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Input Search Field */}
        <div className="relative pt-0.5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
          <input 
            type="text" 
            placeholder="Search name, email, or phone..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text placeholder:text-safai-text-faint focus:outline-none focus:border-safai-primary transition shadow-inner"
          />
        </div>
      </div>

      {/* Staff Directory Registry View List */}
      <div className="bg-safai-surface p-4 rounded-2xl shadow-safai-sm border border-safai-border space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-safai-primary-soft text-safai-primary rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-safai-text">Staff Members</h2>
            <p className="text-[9px] text-safai-text-faint font-bold tracking-wider uppercase">Directory Registry View</p>
          </div>
        </div>

        {/* Directory Cards Stack */}
        <div className="space-y-2">
          {paginatedStaff.map((member, idx) => (
            <div key={idx} className="border border-safai-border bg-safai-surface-soft/50 p-3 rounded-xl flex items-center justify-between shadow-safai-sm animate-in fade-in duration-150">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 bg-safai-surface border border-safai-border text-safai-text-dim rounded-full flex items-center justify-center font-semibold text-xs shrink-0 shadow-sm">
                  {member.initial}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-safai-text truncate">{member.name}</h4>
                  <p className="text-[9px] text-safai-text-dim font-medium truncate">
                    ID: {member.id} &bull; {member.phone || member.email || "No contact info"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className={`text-[7px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase border ${
                  member.role === 'CLEANER' ? 'bg-safai-coral-soft text-safai-coral border-safai-coral/20' :
                  member.role === 'SUPERVISOR' ? 'bg-safai-primary-soft text-safai-primary border-safai-primary/20' :
                  'bg-safai-violet-soft text-safai-violet border-safai-violet/20'
                }`}>
                  {member.role === 'FACILITY ADMIN' ? 'FAC. ADMIN' : member.role}
                </span>
                <button 
                  onClick={() => handleOpenEdit(member)}
                  className="p-1 border border-safai-border bg-safai-surface rounded-lg text-safai-text-dim hover:bg-safai-surface-soft transition shadow-sm tap-fx"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {filteredStaff.length === 0 && (
            <div className="text-center py-8 text-xs text-safai-text-faint font-medium">
              No matching staff records found.
            </div>
          )}
        </div>

        {/* Dynamic Pagination Index Control Block */}
        {filteredStaff.length > 0 && (
          <div className="pt-2 text-center space-y-2 border-t border-dashed border-safai-border">
            <p className="text-[9px] font-bold text-safai-text-faint uppercase tracking-wider">
              Page <b className="text-safai-text">{currentPage}</b> of <b>{totalPages}</b> &middot; <b>{filteredStaff.length}</b> staff matches
            </p>
            <div className="flex items-center justify-center gap-1.5">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-7 h-7 rounded-lg border border-safai-border bg-safai-surface flex items-center justify-center text-safai-text-dim disabled:opacity-35 transition tap-fx"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center border transition tap-fx ${
                    p === currentPage 
                      ? 'bg-safai-primary border-safai-primary text-white shadow-safai-sm font-extrabold' 
                      : 'bg-safai-surface border-safai-border text-safai-text-dim hover:bg-safai-surface-soft'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-7 h-7 rounded-lg border border-safai-border bg-safai-surface flex items-center justify-center text-safai-text-dim disabled:opacity-35 transition tap-fx"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={() => { setActiveFilter('ALL'); setSearchQuery(''); setCurrentPage(1); }}
            className="flex items-center justify-center gap-1.5 bg-safai-coral text-white py-2 px-3 rounded-xl text-xs font-bold shadow-sm shadow-safai-coral/10 hover:opacity-90 transition tap-fx"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-safai-amber text-white py-2 px-3 rounded-xl text-xs font-bold shadow-sm shadow-safai-amber/10 hover:opacity-90 transition tap-fx">
            <CalendarDays className="w-3.5 h-3.5" />
            Shifts
          </button>
        </div>
      </div>

      {/* ================= INLINE BOTTOM SHEET DRAW MODAL: EDIT USER DETAILS ================= */}
      {editSheet.show && editSheet.targetMember && (
        <>
          {/* Backdrop Scrim */}
          <div 
            className="absolute inset-0 bg-safai-text/40 backdrop-blur-sm z-90 animate-in airy-fade-in duration-200" 
            onClick={() => setEditSheet({ show: false, targetMember: null })} 
          />
          {/* Drawer Wrapper Sheet */}
          <div className="absolute left-0 right-0 bottom-0 bg-safai-surface border-t border-safai-border rounded-t-[26px] z-91 p-4 space-y-4 shadow-2xl max-h-[92%] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-safai-border rounded-full mx-auto" />
            
            <div className="flex justify-between items-center">
              <button 
                type="button" 
                onClick={() => setEditSheet({ show: false, targetMember: null })} 
                className="flex items-center gap-1 text-[11px] font-bold text-safai-text-dim"
              >
                <ChevronLeft className="w-4 h-4" /> Cancel
              </button>
              <button 
                type="button" 
                onClick={() => setEditSheet({ show: false, targetMember: null })} 
                className="w-7 h-7 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-lg flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2.5 items-center">
              <div className="w-9 h-9 bg-safai-primary-soft text-safai-primary rounded-xl flex items-center justify-center shadow-sm font-bold font-display text-xs">
                {editSheet.targetMember.initial}
              </div>
              <div>
                <h2 className="text-xs font-black text-safai-text font-display uppercase tracking-wider">Modify Staff Record</h2>
                <p className="text-[9px] text-safai-text-faint font-bold uppercase tracking-wide">ID Identifier: {editSheet.targetMember.id}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 pt-1">
              {/* Name field input */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-safai-text-dim uppercase tracking-wider">Display Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white"
                />
              </div>

              {/* Phone contact input field */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-safai-text-dim uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white"
                />
              </div>

              {/* Email tracking input field */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-safai-text-dim uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-semibold focus:outline-none focus:border-safai-primary focus:bg-white"
                />
              </div>

              {/* Role Scope Select Mapping Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-safai-text-dim uppercase tracking-wider">Operational Role Scope</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 bg-safai-surface-soft border border-safai-border rounded-xl text-xs font-bold text-safai-text focus:outline-none focus:border-safai-primary focus:bg-white"
                >
                  <option value="CLEANER">CLEANER</option>
                  <option value="SUPERVISOR">SUPERVISOR</option>
                  <option value="FACILITY ADMIN">FACILITY ADMIN</option>
                </select>
              </div>

              {/* Action Operations submission row wrapper */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full py-3 bg-safai-text text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider hover:opacity-95 transition shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </>
      )}

    </main>
  );
}