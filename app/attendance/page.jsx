"use client";

import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, ChevronDown, RotateCcw, Search,
  MapPin, Eye, CheckCircle2, AlertCircle, UserCheck
} from 'lucide-react';

export default function AttendanceExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ON DUTY' | 'MISSING'
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCleaner, setSelectedCleaner] = useState('All Cleaners');

  // Comprehensive Location Options list matching image dropdowns
  const locationsList = [
    "All Locations", "ABC", "ABC2", "bajaj", "Charvi Home", "Chinchbhavan", 
    "Dominos", "dwarka nagar washroom", "Final Test", "Ground Floor Washroom A", 
    "Ground Floor Washroom B", "Hinjewadi Tech Park - Updated", "Pardi Toilet", 
    "Sakkardhara Toilet 1", "shitla mata mandir"
  ];

  // Comprehensive Cleaners list matching image dropdowns
  const cleanersList = [
    "All Cleaners", "abc", "abc test", "Anil Clener test", "Anil Final Test Cleaner", 
    "cleaner10", "Kartik Kanzode", "komal test", "New Cleaner ktc", "Omkar Cleaner", 
    "Omkar test 1", "Prathmesh Mankar", "Ramesh Cleaner Test", "Sneha Gupta"
  ];

  // Upgraded dynamic data array mapping both Present & Missing personnel records
  const initialAttendance = [
    { id: 1, name: 'abc', initial: 'A', location: 'Chinchbhavan', count: '+1', totalLogs: 0, status: 'MISSING' },
    { id: 2, name: 'abc test', initial: 'A', location: 'Chinchbhavan', count: '+3', totalLogs: 0, status: 'MISSING' },
    { id: 3, name: 'Anil Clener test', initial: 'A', location: 'Pardi Toilet', count: '+2', totalLogs: 3, status: 'ON DUTY' },
    { id: 4, name: 'Anil Final Test Cleaner', initial: 'A', location: 'Final Test', count: null, totalLogs: 0, status: 'MISSING' },
    { id: 5, name: 'cleaner10', initial: 'C', location: 'Washroom 1', count: '+3', totalLogs: 4, status: 'ON DUTY' },
    { id: 6, name: 'Kartik Kanzode', initial: 'K', location: 'bajaj', count: '+19', totalLogs: 0, status: 'MISSING' },
    { id: 7, name: 'Kartik Kanzode', initial: 'K', location: 'Test -FA', count: null, totalLogs: 2, status: 'ON DUTY' },
    { id: 8, name: 'komal test', initial: 'K', location: 'shitla mata mandir', count: '+2', totalLogs: 0, status: 'MISSING' },
    { id: 9, name: 'New Cleaner ktc', initial: 'N', location: 'washRoom1', count: null, totalLogs: 0, status: 'MISSING' },
    { id: 10, name: 'Omkar Cleaner', initial: 'O', location: 'Sakkardhara Toilet 1', count: '+5', totalLogs: 5, status: 'ON DUTY' },
    { id: 11, name: 'Omkar test 1', initial: 'O', location: 'Dighori', count: '+6', totalLogs: 0, status: 'MISSING' },
    { id: 12, name: 'Prathmesh Mankar', initial: 'P', location: 'NMN test', count: '+7', totalLogs: 6, status: 'ON DUTY' },
    { id: 13, name: 'Ramesh Cleaner Test', initial: 'R', location: 'Test -FA', count: null, totalLogs: 0, status: 'MISSING' },
    { id: 14, name: 'Sneha Gupta', initial: 'S', location: 'Charvi Home', count: null, totalLogs: 4, status: 'ON DUTY' }
  ];

  // Filter and Search computational evaluation hook
  const filteredAttendance = useMemo(() => {
    return initialAttendance.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      const matchesLocation = selectedLocation === 'All Locations' || item.location === selectedLocation;
      const matchesCleaner = selectedCleaner === 'All Cleaners' || item.name === selectedCleaner;
      
      return matchesSearch && matchesStatus && matchesLocation && matchesCleaner;
    });
  }, [searchQuery, statusFilter, selectedLocation, selectedCleaner]);

  // Derived real-time counters
  const onDutyCount = initialAttendance.filter(i => i.status === 'ON DUTY').length;
  const missingCount = initialAttendance.filter(i => i.status === 'MISSING').length;

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setSelectedLocation('All Locations');
    setSelectedCleaner('All Cleaners');
  };

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
      {/* Top Banner Card */}
      <div className="bg-safai-surface p-4 rounded-2xl border border-safai-border shadow-safai-sm flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-safai-primary text-white rounded-xl flex items-center justify-center shadow-md shadow-safai-primary/20 shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-safai-text font-display">Attendance Explorer</h1>
            <p className="text-[9px] font-extrabold text-safai-text-faint tracking-wider uppercase">
              Operational Matrix Overview
            </p>
          </div>
        </div>
        
        <button className="flex items-center gap-1 bg-safai-primary text-white font-black text-[10px] px-2.5 py-1.5 rounded-xl shadow-sm hover:opacity-90 transition tap-fx">
          <Eye className="w-3.5 h-3.5" />
          On-Duty List
        </button>
      </div>

      {/* Upgraded Native Dropdown Controls */}
      <div className="bg-safai-surface p-3 rounded-2xl border border-safai-border shadow-safai-sm space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Location Dropdown selector */}
          <div className="relative">
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-2.5 pr-7 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-[11px] font-bold text-safai-text appearance-none focus:outline-none focus:border-safai-primary transition text-ellipsis overflow-hidden"
            >
              {locationsList.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-safai-text-faint pointer-events-none" />
          </div>

          {/* Cleaner Dropdown selector */}
          <div className="relative">
            <select 
              value={selectedCleaner}
              onChange={(e) => setSelectedCleaner(e.target.value)}
              className="w-full pl-2.5 pr-7 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-[11px] font-bold text-safai-text appearance-none focus:outline-none focus:border-safai-primary transition text-ellipsis overflow-hidden"
            >
              {cleanersList.map((cleaner, idx) => (
                <option key={idx} value={cleaner}>{cleaner}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-safai-text-faint pointer-events-none" />
          </div>
        </div>

        {/* Input Text Search & Reset block row */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-safai-text-faint" />
            <input 
              type="text" 
              placeholder="Search by name or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-[11px] font-medium text-safai-text focus:outline-none focus:border-safai-primary transition"
            />
          </div>
          
          <button 
            onClick={resetFilters}
            className="p-2 bg-safai-surface-soft border border-safai-border rounded-xl text-safai-text-dim hover:bg-safai-border/40 transition tap-fx"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactable Split Grid Stat Scope Selector Filters */}
      <div className="grid grid-cols-2 gap-3">
        {/* On Duty Filter Toggle Card */}
        <button 
          onClick={() => setStatusFilter(statusFilter === 'ON DUTY' ? 'ALL' : 'ON DUTY')}
          className={`p-3.5 rounded-2xl border transition text-left flex justify-between items-center relative overflow-hidden tap-fx ${
            statusFilter === 'ON DUTY' 
              ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/20' 
              : 'bg-safai-surface border-safai-border shadow-safai-sm'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 tracking-wide uppercase">
              <UserCheck className="w-3 h-3" />
              On Duty
            </div>
            <span className="text-[8px] font-bold text-safai-text-faint uppercase block">(Today)</span>
          </div>
          <span className="text-2xl font-black text-emerald-600 leading-none">{onDutyCount}</span>
        </button>

        {/* Missing Filter Toggle Card */}
        <button 
          onClick={() => setStatusFilter(statusFilter === 'MISSING' ? 'ALL' : 'MISSING')}
          className={`p-3.5 rounded-2xl border transition text-left flex justify-between items-center relative overflow-hidden tap-fx ${
            statusFilter === 'MISSING' 
              ? 'bg-safai-coral-soft border-safai-coral shadow-md ring-1 ring-safai-coral/20' 
              : 'bg-safai-surface border-safai-border shadow-safai-sm'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[9px] font-black text-safai-coral tracking-wide uppercase">
              <AlertCircle className="w-3 h-3" />
              Missing
            </div>
            <span className="text-[8px] font-bold text-safai-text-faint uppercase block">(Today)</span>
          </div>
          <span className="text-2xl font-black text-safai-coral leading-none">{missingCount}</span>
        </button>
      </div>

      {/* Attendance Matrix Header Label */}
      <div className="flex justify-between items-center px-1 pt-1">
        <h2 className="text-xs font-black text-safai-text uppercase tracking-wide">Attendance Matrix</h2>
        <span className="text-[9px] text-safai-text-faint font-medium">
          Showing <b>{filteredAttendance.length}</b> rows
        </span>
      </div>

      {/* Upgraded Roster List Cards View Layout */}
      <div className="space-y-2.5">
        {filteredAttendance.map((cleaner) => (
          <div key={cleaner.id} className="bg-safai-surface rounded-2xl border border-safai-border shadow-safai-sm p-3 flex justify-between items-center">
            
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Profile Avatar initial element */}
              <div className="w-8 h-8 bg-safai-surface-soft border border-safai-border text-safai-text-dim rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                {cleaner.initial}
              </div>
              
              <div className="min-w-0 space-y-0.5">
                <h3 className="text-xs font-black text-safai-text truncate capitalize">{cleaner.name}</h3>
                
                <div className="flex items-center gap-1 text-safai-text-faint font-bold text-[9px] min-w-0">
                  <MapPin className="w-3 h-3 text-safai-primary shrink-0" />
                  <span className="truncate text-safai-text-dim">{cleaner.location}</span>
                  {cleaner.count && (
                    <span className="bg-safai-primary-soft text-safai-primary text-[7px] px-1 rounded border border-safai-primary/10 font-extrabold shrink-0">
                      {cleaner.count}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Split Right Content Metadata Columns */}
            <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
              <span className={`text-[7px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase border flex items-center gap-1 ${
                cleaner.status === 'ON DUTY' 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                  : 'bg-safai-coral-soft text-safai-coral border-safai-coral/20'
              }`}>
                {cleaner.status === 'ON DUTY' && <span className="w-1 h-1 bg-emerald-500 rounded-full animate-livePillPulse" />}
                {cleaner.status}
              </span>
              
              <span className="text-[9px] font-bold text-safai-text-faint">
                Total Logs: <b className="text-safai-text font-black">{cleaner.totalLogs}</b>
              </span>
            </div>

          </div>
        ))}

        {filteredAttendance.length === 0 && (
          <div className="text-center py-10 text-xs font-semibold text-safai-text-faint bg-safai-surface rounded-2xl border border-safai-border">
            No matching cleaner attendance records found.
          </div>
        )}
      </div>

    </main>
  );
}