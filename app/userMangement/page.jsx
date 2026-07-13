"use client";

import React, { useState } from 'react';
import { 
  Users, Plus, LayoutGrid, Search, 
  RotateCcw, CalendarDays, Edit3
} from 'lucide-react';

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Mock Data for Staff Registry
  const staffMembers = [
    { id: '#442', name: 'Sneha Gupta', phone: '9121606496', role: 'CLEANER', initial: 'S' },
    { id: '#441', name: 'New Cleaner Ktc', phone: '9100025946', role: 'CLEANER', initial: 'N' },
    { id: '#394', name: 'Test90', email: 'hjoi@gmail.com', role: 'CLEANER', initial: 'T' },
    { id: '#386', name: 'Kamlesh Sup...', email: 'KamleshSupervisor.test@safai.com', role: 'SUPERVISOR', initial: 'K' },
    { id: '#277', name: 'Hyacinth ...', email: 'gyne@mailinator.com', role: 'FACILITY ADMIN', initial: 'H' },
  ];

  // Counters configuration
  const counters = [
    { key: 'ALL', count: 41, label: 'TOTAL USERS' },
    { key: 'SUPERVISOR', count: 6, label: 'SUPERVISOR' },
    { key: 'CLEANER', count: 30, label: 'CLEANER' },
    { key: 'FACILITY ADMIN', count: 5, label: 'FAC. ADMIN' },
  ];

  // Filter Logic
  const filteredStaff = staffMembers.filter(member => {
    const matchesFilter = activeFilter === 'ALL' || member.role === activeFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (member.phone && member.phone.includes(searchQuery));
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
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
        
        <button className="w-full flex items-center justify-center gap-1 border border-safai-amber/30 text-safai-amber py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase hover:bg-safai-amber-soft transition bg-safai-surface shadow-safai-sm">
          <Plus className="w-4 h-4" />
          Add New User
        </button>
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
              onClick={() => setActiveFilter(item.key)}
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredStaff.map((member, idx) => (
            <div key={idx} className="border border-safai-border bg-safai-surface-soft/50 p-3 rounded-xl flex items-center justify-between shadow-safai-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 bg-safai-surface border border-safai-border text-safai-text-dim rounded-full flex items-center justify-center font-semibold text-xs shrink-0 shadow-sm">
                  {member.initial}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-safai-text truncate">{member.name}</h4>
                  <p className="text-[9px] text-safai-text-dim font-medium truncate">
                    ID: {member.id} • {member.phone || member.email}
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
                <button className="p-1 border border-safai-border bg-safai-surface rounded-lg text-safai-text-dim hover:bg-safai-surface-soft transition shadow-sm tap-fx">
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

        {/* Bottom Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={() => { setActiveFilter('ALL'); setSearchQuery(''); }}
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
    </main>
  );
}