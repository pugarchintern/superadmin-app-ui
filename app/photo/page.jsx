"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Camera,
  Search,
  RotateCcw,
  Building2,
  MapPin,
  Image as ImageIcon,
  Calendar,
  Star,
  CheckSquare,
  Square
} from "lucide-react";

export default function PhotoGalleryManagement() {
  // ---- Core Static Dataset Engine ----
  const galleryData = [
    {
      id: "log-set-1",
      company: "Central Railways",
      dateString: "10 Jul 2026",
      isoDate: "2026-07-10",
      locationName: "Sleeper class waiting room washroom",
      ratingScore: "4.5/5",
      timestampString: "10:45 AM",
      beforeImages: [{ id: "b1", score: "32%" }, { id: "b2", score: "25%" }, { id: "b3", score: "40%" }],
      afterImages: [{ id: "a1", score: "95%" }, { id: "a2", score: "98%" }]
    },
    {
      id: "log-set-2",
      company: "Central Railways",
      dateString: "11 Jul 2026",
      isoDate: "2026-07-11",
      locationName: "Kamthee railway station beside entry",
      ratingScore: "4.5/5",
      timestampString: "12:39 PM",
      beforeImages: [{ id: "kb1", score: "85%" }, { id: "kb2", score: "90%" }],
      afterImages: [{ id: "ka1", score: "92%" }]
    },
    {
      id: "log-set-3",
      company: "Central Railways",
      dateString: "12 Jul 2026",
      isoDate: "2026-07-12",
      locationName: "HandiCap Kamthee Railway station",
      ratingScore: "4.8/5",
      timestampString: "01:15 PM",
      beforeImages: [{ id: "hcb1", score: "44%" }],
      afterImages: [{ id: "hca1", score: "99%" }, { id: "hca2", score: "96%" }]
    },
    {
      id: "log-set-4",
      company: "Metro Transit Corp",
      dateString: "14 Jul 2026",
      isoDate: "2026-07-14",
      locationName: "Nagpur-East Junction Hub",
      ratingScore: "4.2/5",
      timestampString: "04:10 PM",
      beforeImages: [{ id: "neb1", score: "50%" }, { id: "neb2", score: "35%" }],
      afterImages: [{ id: "nea1", score: "91%" }]
    }
  ];

  // ---- Advanced Filtering Reactive States ----
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Selectable Node Registry Matrix (For multi-photo verification tasks)
  const [selectedPhotos, setSelectedPhotos] = useState({});

  // ---- Extract Location Matrix Based on Company Selection ----
  const availableLocations = useMemo(() => {
    const locs = new Set();
    galleryData.forEach(item => {
      if (companyFilter === "all" || item.company === companyFilter) {
        locs.add(item.locationName);
      }
    });
    return Array.from(locs).sort();
  }, [companyFilter]);

  // Adjust location state cleanly if company change invalidates it
  useEffect(() => {
    if (locationFilter !== "all" && !availableLocations.includes(locationFilter)) {
      setLocationFilter("all");
    }
  }, [companyFilter, availableLocations, locationFilter]);

  // ---- Main Processing Pipeline Logic ----
  const processedTimeline = useMemo(() => {
    // Pipeline constraint rule: Hide images until a specific washroom target is locked
    if (locationFilter === "all") {
      return { groups: [], count: 0 };
    }

    let totalPhotoCounter = 0;
    const searchVal = searchQuery.toLowerCase().trim();

    const filtered = galleryData
      .filter(group => {
        const matchesSearch = !searchVal
          ? true
          : group.locationName.toLowerCase().includes(searchVal) ||
            group.dateString.toLowerCase().includes(searchVal) ||
            group.company.toLowerCase().includes(searchVal);

        const matchesCompany = companyFilter === "all" || group.company === companyFilter;
        const matchesLocation = group.locationName === locationFilter;

        let matchesDateRange = true;
        if (startDate && group.isoDate < startDate) matchesDateRange = false;
        if (endDate && group.isoDate > endDate) matchesDateRange = false;

        return matchesSearch && matchesCompany && matchesLocation && matchesDateRange;
      })
      .map(group => {
        const hasBefore = typeFilter === "all" || typeFilter === "before";
        const hasAfter = typeFilter === "all" || typeFilter === "after";

        const validBefore = hasBefore ? group.beforeImages : [];
        const validAfter = hasAfter ? group.afterImages : [];

        totalPhotoCounter += validBefore.length + validAfter.length;

        return {
          ...group,
          renderedBefore: validBefore,
          renderedAfter: validAfter
        };
      })
      .filter(group => group.renderedBefore.length > 0 || group.renderedAfter.length > 0)
      .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

    return { groups: filtered, count: totalPhotoCounter };
  }, [searchQuery, companyFilter, locationFilter, typeFilter, startDate, endDate]);

  // ---- Action Functions ----
  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => ({
      ...prev,
      [photoId]: !prev[photoId]
    }));
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setCompanyFilter("all");
    setLocationFilter("all");
    setTypeFilter("all");
    setStartDate("");
    setEndDate("");
    setSelectedPhotos({});
  };

  return (
    <div className="w-full min-h-full bg-[#F4F8F7] text-[#0E1913] select-none p-4 pt-6 space-y-4">
      
      {/* Topbar Module Header */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E4EEEC] shadow-sm">
        <div className="flex gap-3 items-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_10px_-3px_rgba(59,130,246,0.45)] shrink-0">
            <Camera className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-display tracking-tight text-[#0E1913]">Photo Gallery</h1>
            <p className="text-[10px] font-semibold text-[#5C6B65]">
              Filtered Assets: <span className="font-display font-bold text-[#3B82F6] tabular-nums">{processedTimeline.count}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Glassmorphic Filtering Matrix */}
      <div className="bg-gradient-to-br from-white to-[#EFF6F4] border border-[#E4EEEC] rounded-2xl p-3.5 space-y-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93A19B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parameters..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E4EEEC] rounded-xl text-xs font-medium outline-none focus:border-[#3B82F6] shadow-inner text-[#0E1913]"
            />
          </div>
          <button
            type="button"
            onClick={resetAllFilters}
            className="text-[10px] font-extrabold text-[#E8435A] tracking-wider uppercase flex items-center gap-1 px-2.5 py-2 hover:bg-[#FDE7EA] rounded-xl transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 relative">
            <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#93A19B] pointer-events-none" />
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="w-full h-8 pl-8 pr-3 appearance-none bg-white border border-[#E4EEEC] rounded-lg text-xs font-bold text-[#5C6B65] outline-none"
            >
              <option value="all">All Companies</option>
              <option value="Central Railways">Central Railways</option>
              <option value="Metro Transit Corp">Metro Transit Corp</option>
            </select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#93A19B] pointer-events-none" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full h-8 pl-8 pr-3 appearance-none bg-white border border-[#E4EEEC] rounded-lg text-xs font-bold text-[#5C6B65] outline-none"
            >
              <option value="all">Select Washroom</option>
              {availableLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <ImageIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#93A19B] pointer-events-none" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full h-8 pl-8 pr-3 appearance-none bg-white border border-[#E4EEEC] rounded-lg text-xs font-bold text-[#5C6B65] outline-none"
            >
              <option value="all">All Image Types</option>
              <option value="before">Before Only</option>
              <option value="after">After Only</option>
            </select>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-2">
            <div className="relative flex items-center">
              <Calendar className="absolute left-2.5 w-3.5 h-3.5 text-[#93A19B] pointer-events-none" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-label="Start date"
                className="w-full h-8 pl-8 pr-2 bg-white border border-[#E4EEEC] rounded-lg text-[11px] font-bold text-[#5C6B65] outline-none"
              />
            </div>
            <div className="relative flex items-center">
              <Calendar className="absolute left-2.5 w-3.5 h-3.5 text-[#93A19B] pointer-events-none" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                aria-label="End date"
                className="w-full h-8 pl-8 pr-2 bg-white border border-[#E4EEEC] rounded-lg text-[11px] font-bold text-[#5C6B65] outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Grid Output Stream */}
      <div className="space-y-3 pb-8">
        {locationFilter === "all" ? (
          <div className="text-center p-8 text-xs font-bold text-[#5C6B65] bg-white rounded-2xl border border-dashed border-[#E4EEEC] shadow-sm">
            Select a target washroom to see tracking images
          </div>
        ) : processedTimeline.groups.length === 0 ? (
          <div className="text-center p-8 text-xs font-medium text-[#93A19B] bg-white rounded-2xl border border-[#E4EEEC] shadow-sm">
            No matching photos found for active parameters.
          </div>
        ) : (
          processedTimeline.groups.map((group) => (
            <div key={group.id} className="bg-gradient-to-br from-white to-[#E9F2FF] border border-[#E4EEEC] rounded-2xl p-3.5 space-y-3 shadow-sm animate-in fade-in duration-200">
              
              {/* Group Meta Header Info Segment */}
              <div className="flex flex-col gap-1.5 border-b border-[#E4EEEC] pb-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold font-display text-[#0E1913] leading-tight max-w-[70%]">{group.locationName}</span>
                  <span className="text-[8px] font-extrabold text-[#159A6B] bg-[#E3FAEC] border border-[#159A6B]/20 px-2 py-0.5 rounded-full flex items-center gap-0.5 whitespace-nowrap">
                    <Star className="w-2.5 h-2.5 fill-current" /> Rating: {group.ratingScore}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#5C6B65] font-semibold">
                  <div className="flex items-center gap-1.5 tabular-nums">
                    <span>{group.dateString}</span>
                    <span className="text-gray-300">&bull;</span>
                    <span>{group.timestampString}</span>
                  </div>
                  <span className="text-[8.5px] font-extrabold text-[#1D4ED8] bg-[#E6F0FF] px-1.5 py-0.5 rounded text-center font-display uppercase tracking-wider scale-95 origin-right">
                    {group.company}
                  </span>
                </div>
              </div>

              {/* Phase block: Before Status */}
              {group.renderedBefore.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[9px] font-extrabold text-[#93A19B] uppercase tracking-wider flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-gray-100">
                    Before Execution
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {group.renderedBefore.map((img) => (
                      <div 
                        key={img.id} 
                        onClick={() => togglePhotoSelection(img.id)}
                        className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#E2ECE9] to-[#D3E2DE] border border-[#E4EEEC] flex flex-col items-center justify-center p-2 cursor-pointer transition-all active:scale-95 group select-none"
                      >
                        <div className="absolute left-2 top-2 z-10 text-white drop-shadow-sm">
                          {selectedPhotos[img.id] ? (
                            <CheckSquare className="w-4 h-4 text-[#3B82F6] fill-white rounded" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400 fill-white/80 rounded" />
                          )}
                        </div>
                        <div className="absolute right-2 top-2 flex flex-col gap-1 items-end z-10 font-display text-[7.5px] font-black text-white">
                          <span className="bg-gradient-to-r from-[#E8435A] to-[#FF6B57] px-1.5 py-0.5 rounded shadow-sm border border-red-500/20 uppercase tracking-wide">Before</span>
                          <span className="bg-black/70 px-1 py-0.5 rounded">Q: {img.score}</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-[#5C6B65] mt-2 shadow-sm">
                          <Camera className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-extrabold text-[#5C6B65] uppercase tracking-wider mt-2 font-display">Unit</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phase block: After Verification */}
              {group.renderedAfter.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[9px] font-extrabold text-[#93A19B] uppercase tracking-wider flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-gray-100">
                    After Verification
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {group.renderedAfter.map((img) => (
                      <div 
                        key={img.id} 
                        onClick={() => togglePhotoSelection(img.id)}
                        className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#E2ECE9] to-[#D3E2DE] border border-[#E4EEEC] flex flex-col items-center justify-center p-2 cursor-pointer transition-all active:scale-95 group select-none"
                      >
                        <div className="absolute left-2 top-2 z-10 text-white drop-shadow-sm">
                          {selectedPhotos[img.id] ? (
                            <CheckSquare className="w-4 h-4 text-[#3B82F6] fill-white rounded" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400 fill-white/80 rounded" />
                          )}
                        </div>
                        <div className="absolute right-2 top-2 flex flex-col gap-1 items-end z-10 font-display text-[7.5px] font-black text-white">
                          <span className="bg-gradient-to-r from-[#159A6B] to-[#3FC28E] px-1.5 py-0.5 rounded shadow-sm border border-emerald-500/20 uppercase tracking-wide">After</span>
                          <span className="bg-black/70 px-1 py-0.5 rounded">Q: {img.score}</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-[#5C6B65] mt-2 shadow-sm">
                          <Camera className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-extrabold text-[#5C6B65] uppercase tracking-wider mt-2 font-display">Unit</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
}