"use client";

import React, { useState, useEffect, useMemo } from "react";

/* ==========================================================================
   DATA & HELPERS
   ========================================================================== */
const formatMinsAgo = (mins) => {
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + ' min ago';
    const hrs = Math.round(mins / 60);
    return hrs + (hrs === 1 ? ' hr ago' : ' hrs ago');
};

const scoreColor = (s) => {
    if (s >= 8) return '#22B07D';
    if (s >= 6) return '#F0A527';
    return '#E8435A';
};

const scoreSoft = (s) => {
    if (s >= 8) return '#E2F5EC';
    if (s >= 6) return '#FFF3DC';
    return '#FDE7EA';
};

const pinColor = (p) => {
    if (p.status === 'attention') return '#E8435A';
    if (p.status === 'cleaning') return '#F0A527';
    return scoreColor(p.score);
};

const statusLabel = (p) => {
    if (p.status === 'cleaning') return { text: 'Cleaning in progress', bg: '#FFF3DC', fg: '#A9740F' };
    if (p.status === 'attention') return { text: p.reports + ' open report' + (p.reports > 1 ? 's' : ''), bg: '#FDE7EA', fg: '#E8435A' };
    return { text: 'No open reports', bg: '#E2F5EC', fg: '#178A5B' };
};

// Generate the mock data cleanly so it doesn't mutate globals on fast-refresh
const generateMockPins = () => {
    const pins = [
        { id: 1, name: 'Test89', sub: '2nd Floor · Unisex', score: 9.4, x: 52, y: 38, cleaned: '6 min ago', cleanedMins: 6, lat: 21.1512, lng: 79.0850, cleaner: 'Ravi K.', reports: 0, status: 'good' },
        { id: 2, name: 'Ground Floor Washroom A', sub: 'Ground Floor · Male', score: 8.9, x: 66, y: 29, cleaned: '12 min ago', cleanedMins: 12, lat: 21.1548, lng: 79.0912, cleaner: 'Sneha P.', reports: 0, status: 'good' },
        { id: 3, name: 'Tower A - Ground Floor Washroom', sub: 'Tower A · Unisex', score: 8.3, x: 47, y: 52, cleaned: '19 min ago', cleanedMins: 19, lat: 21.1462, lng: 79.0821, cleaner: 'Amit D.', reports: 0, status: 'good' },
        { id: 4, name: 'Tectura Amet Archit', sub: '1st Floor · Female', score: 7.6, x: 74, y: 47, cleaned: '34 min ago', cleanedMins: 34, lat: 21.1478, lng: 79.0961, cleaner: 'Ravi K.', reports: 0, status: 'good' },
        { id: 5, name: 'Parsi Toilet', sub: 'Ground Floor · Unisex', score: 9.1, x: 38, y: 63, cleaned: '2 min ago', cleanedMins: 2, lat: 21.1394, lng: 79.0779, cleaner: 'Sneha P.', reports: 0, status: 'good' },
        { id: 6, name: 'AT1', sub: 'Basement · Male', score: 6.4, x: 28, y: 41, cleaned: '2 hrs ago', cleanedMins: 120, lat: 21.1499, lng: 79.0733, cleaner: 'Unassigned', reports: 1, status: 'cleaning' },
        { id: 7, name: 'xyz', sub: '3rd Floor · Female', score: 5.2, x: 60, y: 57, cleaned: '5 hrs ago', cleanedMins: 300, lat: 21.1421, lng: 79.0888, cleaner: 'Amit D.', reports: 2, status: 'attention' },
        { id: 8, name: 'Ridge Road Public', sub: 'Street Level · Unisex', score: 4.8, x: 70, y: 66, cleaned: '6 hrs ago', cleanedMins: 360, lat: 21.1382, lng: 79.0940, cleaner: 'Unassigned', reports: 3, status: 'attention' },
        { id: 9, name: 'VR Nagpur Mall', sub: 'Level 2 · Unisex', score: 8.7, x: 63, y: 60, cleaned: '22 min ago', cleanedMins: 22, lat: 21.1407, lng: 79.0902, cleaner: 'Sneha P.', reports: 0, status: 'good' },
        { id: 10, name: 'Vishal Mega Mart', sub: 'Ground Floor · Female', score: 7.9, x: 79, y: 63, cleaned: '40 min ago', cleanedMins: 40, lat: 21.1373, lng: 79.0987, cleaner: 'Ravi K.', reports: 0, status: 'good' }
    ];

    const WINGS = ['Wing A', 'Wing B', 'Wing C', 'Tower A', 'Tower B', 'Block C', 'East Wing', 'West Wing', 'Annex', 'North Court'];
    const FLOORS = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', 'Basement', 'Terrace'];
    const TYPES = ['Unisex', 'Male', 'Female', 'Accessible'];
    const CLEANERS = ['Ravi K.', 'Sneha P.', 'Amit D.', 'Pooja M.', 'Karan S.', 'Unassigned'];

    let nextId = 11;
    const needed = 53 - pins.length;
    for (let i = 0; i < needed; i++) {
        const seed = (i + 1) * 37 + 11;
        const score = Math.round((4 + (seed % 61) / 10) * 10) / 10;
        const status = score >= 8 ? 'good' : (score >= 6 ? (seed % 5 === 0 ? 'cleaning' : 'good') : 'attention');
        const reports = status === 'attention' ? 1 + (seed % 3) : (status === 'cleaning' ? 1 : 0);
        const cleanedMins = (seed * 3) % 480;
        const floor = FLOORS[i % FLOORS.length];
        pins.push({
            id: nextId++,
            name: WINGS[i % WINGS.length] + ' – ' + floor + ' Washroom',
            sub: floor + ' · ' + TYPES[i % TYPES.length],
            score: score,
            x: 6 + ((seed * 13) % 88),
            y: 6 + ((seed * 7) % 86),
            cleaned: formatMinsAgo(cleanedMins),
            cleanedMins: cleanedMins,
            lat: 21.10 + (seed % 100) / 1000,
            lng: 79.05 + ((seed * 31) % 100) / 1000,
            cleaner: CLEANERS[i % CLEANERS.length],
            reports: reports,
            status: status
        });
    }
    return pins;
};

const INITIAL_MOCK_PINS = generateMockPins();

/* ==========================================================================
   MAIN COMPONENT EXPORT
   ========================================================================== */
export default function MapPage() {
    const [view, setView] = useState('map');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('score');
    const [pins, setPins] = useState(INITIAL_MOCK_PINS);

    const [mapZoom, setMapZoom] = useState(13);
    const [mapType, setMapType] = useState('m');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    const [selectedPin, setSelectedPin] = useState(null);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportCategory, setReportCategory] = useState(null);
    const [reportNote, setReportNote] = useState('');
    const [toasts, setToasts] = useState([]);

    // Toast Helper
    const showToast = (msg) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, msg }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 2200);
    };

    // Live simulation tick
    useEffect(() => {
        const interval = setInterval(() => {
            setPins(prev => prev.map(p => {
                let newMins = p.cleanedMins + 1;
                let newP = { ...p, cleanedMins: newMins, cleaned: formatMinsAgo(newMins) };

                // Randomly nudge score for one pin
                if (Math.random() < 0.05) {
                    const drift = (Math.random() - 0.45) * 0.6;
                    newP.score = Math.max(3, Math.min(9.9, Math.round((newP.score + drift) * 10) / 10));
                    if (newP.status === 'cleaning' && Math.random() < 0.3) {
                        newP.status = 'good';
                        newP.cleanedMins = 0;
                        newP.cleaned = 'just now';
                        newP.reports = 0;
                        showToast(`${newP.name} marked clean`);
                    }
                }
                return newP;
            }));
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    // Filter & Sort
    const filteredPins = useMemo(() => {
        let result = pins.filter(p => {
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
            let matchFilter = true;
            if (filter === 'attention') matchFilter = p.status === 'attention';
            if (filter === 'high') matchFilter = p.score >= 8;
            if (filter === 'cleaning') matchFilter = p.status === 'cleaning';
            return matchSearch && matchFilter;
        });

        if (sort === 'recent') result.sort((a, b) => a.cleanedMins - b.cleanedMins);
        else if (sort === 'attention') {
            const rank = { attention: 0, cleaning: 1, good: 2 };
            result.sort((a, b) => rank[a.status] - rank[b.status] || b.score - a.score);
        }
        else if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
        else result.sort((a, b) => b.score - a.score);

        return result;
    }, [pins, search, filter, sort]);

    const handleReportSubmit = () => {
        if (!selectedPin || !reportCategory) return;

        setPins(prev => prev.map(p => {
            if (p.id === selectedPin.id) {
                return {
                    ...p,
                    reports: p.reports + 1,
                    status: p.status === 'good' ? 'attention' : p.status
                };
            }
            return p;
        }));

        showToast(`${reportCategory} issue reported for ${selectedPin.name}`);
        setReportModalOpen(false);
        setSelectedPin(null);
    };

    return (
        <div className="flex-1 w-full bg-[#EAF1EE] font-sans text-[#0E1913] relative overflow-hidden flex flex-col min-h-screen">

            {/* Toast Stack */}
            <div className="fixed left-4 right-4 bottom-6 z-[90] flex flex-col items-center gap-2 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id} className="bg-[#14231E] text-white text-[12.5px] font-semibold py-2.5 px-3.5 rounded-[13px] shadow-[0_10px_24px_rgba(10,25,20,0.35)] flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
                        <svg className="w-3.5 h-3.5 text-[#60A5FA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
                        <span>{t.msg}</span>
                    </div>
                ))}
            </div>

            <main className={`p-4 md:p-6 flex-1 flex flex-col min-h-0 ${isFullscreen ? 'hidden' : ''}`}>

                {/* Header */}
                <div className="mb-3.5">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold tracking-[0.06em] uppercase text-[#1D4ED8] mb-1">
                        <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.1-9.5-10A5.5 5.5 0 0 1 12 4.5 5.5 5.5 0 0 1 21.5 11c-2.5 3.9-9.5 10-9.5 10z" /><circle cx="12" cy="10.5" r="2.2" /></svg>
                        Locate on Map
                    </div>
                    <div className="text-[20px] font-extrabold font-display tracking-tight">Washroom Map</div>
                </div>

                {/* Search */}
                <div className="relative mb-3 flex-shrink-0">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#93A19B] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        className="w-full h-[46px] rounded-[14px] border-[1.5px] border-[#E4EEEC] bg-[#FFFFFF] px-3.5 pl-10 text-[13.5px] font-medium text-[#0E1913] outline-none shadow-[0_2px_10px_rgba(30,58,138,.06)] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#E6F0FF] transition-all placeholder:text-[#93A19B]"
                        type="text"
                        placeholder="Search toilets by name…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-[9px] bg-[#EFF6F4] text-[#5C6B65] flex items-center justify-center active:scale-95" onClick={() => setSearch('')}>
                            <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    )}
                </div>

                {/* Result Count & Toggle */}
                <div className="flex items-center justify-between gap-2.5 mb-3 flex-shrink-0">
                    <span className="text-[12px] font-semibold text-[#5C6B65]">Showing <b className="text-[#0E1913] font-extrabold">{filteredPins.length}</b> of <b className="text-[#0E1913] font-extrabold">{pins.length}</b> locations</span>
                    <div className="flex items-center gap-0.5 bg-[#FFFFFF] border-[1.5px] border-[#E4EEEC] rounded-[11px] p-[3px]">
                        <button className={`flex items-center gap-1.5 px-[11px] py-1.5 text-[10.5px] font-bold rounded-[8px] transition-colors active:scale-95 ${view === 'map' ? 'bg-[#1D4ED8] text-white' : 'text-[#5C6B65] bg-transparent'}`} onClick={() => setView('map')}>
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z" /><path d="M8 2v16M16 6v16" /></svg>Map
                        </button>
                        <button className={`flex items-center gap-1.5 px-[11px] py-1.5 text-[10.5px] font-bold rounded-[8px] transition-colors active:scale-95 ${view === 'list' ? 'bg-[#1D4ED8] text-white' : 'text-[#5C6B65] bg-transparent'}`} onClick={() => setView('list')}>
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>List
                        </button>
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-1 px-1 mb-1 flex-shrink-0" style={{ scrollbarWidth: 'none' }}>
                    {[
                        { id: 'all', label: 'All', color: null },
                        { id: 'attention', label: 'Needs Attention', color: '#E8435A' },
                        { id: 'high', label: 'High Score', color: '#22B07D' },
                        { id: 'cleaning', label: 'Cleaning Now', color: '#F0A527' }
                    ].map(f => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-[11.5px] font-bold rounded-[20px] border-[1.5px] transition-colors active:scale-95 whitespace-nowrap ${filter === f.id ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' : 'bg-[#FFFFFF] border-[#E4EEEC] text-[#5C6B65]'}`}
                        >
                            {f.color && <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ backgroundColor: f.color, boxShadow: filter === f.id ? '0 0 0 2px rgba(255,255,255,0.5)' : 'none' }}></span>}
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* List View Component */}
                {view === 'list' && (
                    <div className="flex-1 min-h-0 flex flex-col gap-2.5 pb-1">
                        <div className="flex gap-2 mb-0.5 flex-shrink-0">
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                                className="flex-1 h-9 rounded-[10px] border-[1.5px] border-[#E4EEEC] bg-[#FFFFFF] px-2.5 text-[11.5px] font-bold text-[#5C6B65] outline-none"
                            >
                                <option value="score">Sort: Highest score</option>
                                <option value="recent">Sort: Recently cleaned</option>
                                <option value="attention">Sort: Needs attention first</option>
                                <option value="name">Sort: Name (A–Z)</option>
                            </select>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2.5" style={{ scrollbarWidth: 'none' }}>
                            {filteredPins.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center py-8">
                                    <svg className="w-[34px] h-[34px] text-[#93A19B] opacity-60 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                    <div className="text-[13.5px] font-extrabold text-[#5C6B65] font-display">No washrooms match</div>
                                    <div className="text-[11.5px] font-medium text-[#93A19B]">Try a different search term or clear the current filter.</div>
                                    <button className="mt-1 text-[11.5px] font-extrabold text-[#1D4ED8] bg-[#E6F0FF] px-3.5 py-2 rounded-[20px] active:scale-95 transition-transform" onClick={() => { setSearch(''); setFilter('all'); }}>Reset filters</button>
                                </div>
                            ) : (
                                filteredPins.map(p => (
                                    <div key={p.id} className="flex items-center gap-[11px] bg-[#FFFFFF] border border-[#E4EEEC] rounded-[16px] p-3 shadow-[0_2px_10px_rgba(30,58,138,.06)] cursor-pointer active:scale-[0.98] transition-transform" onClick={() => setSelectedPin(p)}>
                                        <div className="w-[38px] h-[38px] rounded-[12px] flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: scoreColor(p.score) }}>
                                            <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[13px] font-bold font-display truncate text-[#0E1913]">{p.name}</div>
                                            <div className="text-[11px] font-semibold text-[#93A19B] mt-0.5 flex items-center gap-1 flex-wrap">
                                                <span>{p.sub}</span><span>· {p.cleaned}</span>
                                            </div>
                                        </div>
                                        <div className="text-[14px] font-extrabold font-display flex-shrink-0 px-2.5 py-1 rounded-[10px]" style={{ color: scoreColor(p.score), backgroundColor: scoreSoft(p.score) }}>
                                            {p.score.toFixed(1)}
                                        </div>
                                        <svg className="w-3.5 h-3.5 text-[#93A19B] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Map View Component (Can be full screen) */}
            <div className={`${view === 'map' ? 'flex-1 flex flex-col relative min-h-[360px] md:mx-6 md:mb-6 rounded-[22px] overflow-hidden border border-[#E4EEEC] shadow-[0_8px_24px_rgba(30,58,138,.08)] bg-[#EFF6F4]' : 'hidden'} ${isFullscreen ? '!fixed !inset-0 !z-[55] !rounded-none !m-0 !h-full' : ''}`}>

                {/* Loading Overlay */}
                {isLoadingMap && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#93A19B] text-[12px] font-semibold bg-[#EFF6F4] z-[5] pointer-events-none">
                        <svg className="w-[26px] h-[26px] text-[#3B82F6] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-9-9" /></svg>
                        Loading map…
                    </div>
                )}

                <iframe
                className="absolute inset-0 w-full h-full"  
                    key={`${mapZoom}-${mapType}`} // Adding this key forces a refresh when zoom/type changes
                    id="mapFrame"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14882.35!2d79.0882!3d21.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin`}
                    onLoad={() => {
                        console.log("Map finished loading");
                        setIsLoadingMap(false);
                    }}
                    onError={() => {
                        console.error("Map failed to load");
                        setIsLoadingMap(false); // Stop loading even if it fails
                    }}
                    // width="100%"
                    // height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    title="Washroom Map"
                    loading="lazy"
                ></iframe>

                {/* Top-Left Controls */}
                <div className="absolute top-3 left-3 z-[6] flex bg-[#E6F0FF] border border-[#3b82f62e] rounded-[11px] p-[3px] shadow-[0_2px_10px_rgba(30,58,138,.06)]">
                    <button className={`px-3 py-1.5 text-[11px] font-bold rounded-[8px] active:scale-95 transition-colors ${mapType === 'm' ? 'bg-[#1D4ED8] text-white' : 'text-[#1D4ED8] bg-transparent'}`} onClick={() => setMapType('m')}>Map</button>
                    <button className={`px-3 py-1.5 text-[11px] font-bold rounded-[8px] active:scale-95 transition-colors ${mapType === 'k' ? 'bg-[#1D4ED8] text-white' : 'text-[#1D4ED8] bg-transparent'}`} onClick={() => setMapType('k')}>Satellite</button>
                </div>

                {/* Top-Right Controls */}
                <div className="absolute top-3 right-3 z-[6] flex flex-col bg-[#E6F0FF] border border-[#3b82f62e] rounded-[11px] shadow-[0_2px_10px_rgba(30,58,138,.06)] overflow-hidden">
                    <button className="w-[34px] h-[34px] flex items-center justify-center text-[#1D4ED8] active:bg-[#3b82f624] border-b border-[#3b82f62e] disabled:opacity-40" onClick={() => setMapZoom(z => Math.min(18, z + 1))} disabled={mapZoom >= 18}>
                        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    <button className="w-[34px] h-[34px] flex items-center justify-center text-[#1D4ED8] active:bg-[#3b82f624] border-b border-[#3b82f62e] disabled:opacity-40" onClick={() => setMapZoom(z => Math.max(10, z - 1))} disabled={mapZoom <= 10}>
                        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    <button className={`w-[34px] h-[34px] flex items-center justify-center ${isFullscreen ? 'bg-[#1D4ED8] text-white' : 'text-[#1D4ED8] active:bg-[#3b82f624]'}`} onClick={() => setIsFullscreen(!isFullscreen)}>
                        {isFullscreen ? (
                            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="10" y1="14" x2="3" y2="21" /></svg>
                        ) : (
                            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
                        )}
                    </button>
                </div>

                {/* Pin Layer */}
                <div className="absolute inset-0 z-[4]">
                    {filteredPins.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setSelectedPin(p)}
                            className={`absolute -translate-x-1/2 -translate-y-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer p-0 bg-transparent border-none drop-shadow-md hover:scale-110 active:scale-95 transition-transform ${selectedPin?.id === p.id ? 'scale-110 z-[2]' : ''}`}
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        >
                            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px]">
                                <path d="M12 0C6.48 0 2 4.48 2 10c0 7.5 10 20 10 20s10-12.5 10-20c0-5.52-4.48-10-10-10z" fill={pinColor(p)} />
                                <circle cx="12" cy="10" r="4" fill="#fff" />
                            </svg>
                            {p.status !== 'good' && (
                                <span className="absolute -inset-1.5 rounded-full border-2 border-[#E8435A] animate-ping opacity-60 pointer-events-none"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Bottom Actions */}
                <div className="absolute left-3 right-3 bottom-3 z-[6] flex items-center justify-between pointer-events-none">
                    <button className="flex items-center gap-1.5 bg-[#E6F0FF] border border-[#3b82f62e] rounded-[20px] px-3 py-2 text-[11px] font-extrabold text-[#1D4ED8] shadow-[0_2px_10px_rgba(30,58,138,.06)] active:scale-95 pointer-events-auto" onClick={() => window.open(`http://googleusercontent.com/maps.google.com/maps?z=${mapZoom}`, '_blank')}>
                        <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        <span className="hidden sm:inline">Open in Maps</span>
                    </button>
                </div>
            </div>

            {/* ================= MODALS ================= */}

            {/* Detail Bottom Sheet */}
            {selectedPin && (
                <>
                    <div className="absolute inset-0 bg-[#0a191459] backdrop-blur-[1.5px] z-[70] animate-in fade-in duration-200" onClick={() => setSelectedPin(null)}></div>
                    <div className="absolute left-0 right-0 bottom-0 bg-[#FFFFFF] rounded-t-[24px] px-[18px] pb-6 pt-2.5 shadow-[0_-14px_40px_rgba(10,25,20,.22)] z-[71] animate-in slide-in-from-bottom-full duration-300">
                        <div className="w-[38px] h-[4px] rounded-[3px] bg-[#E4EEEC] mx-auto mb-3.5"></div>

                        <div className="flex items-start gap-[11px] mb-3.5">
                            <div className="w-[42px] h-[42px] rounded-[13px] flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: pinColor(selectedPin) }}>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[15px] font-extrabold font-display leading-[1.25]">{selectedPin.name}</div>
                                <div className="text-[11.5px] font-semibold text-[#93A19B] mt-0.5">{selectedPin.sub}</div>
                            </div>
                            <div className="text-[19px] font-extrabold font-display flex-shrink-0 px-[11px] py-1 rounded-[11px]" style={{ color: scoreColor(selectedPin.score), backgroundColor: scoreSoft(selectedPin.score) }}>
                                {selectedPin.score.toFixed(1)}
                            </div>
                        </div>

                        <div className="flex gap-2 mb-3">
                            <div className="flex-1 bg-[#EFF6F4] rounded-[13px] p-2.5">
                                <div className="text-[9.5px] font-bold text-[#93A19B] uppercase tracking-[0.03em]">Last cleaned</div>
                                <div className="text-[12.5px] font-extrabold font-display mt-1 text-[#0E1913]">{selectedPin.cleaned}</div>
                            </div>
                            <div className="flex-1 bg-[#EFF6F4] rounded-[13px] p-2.5">
                                <div className="text-[9.5px] font-bold text-[#93A19B] uppercase tracking-[0.03em]">Cleaner</div>
                                <div className="text-[12.5px] font-extrabold font-display mt-1 text-[#0E1913]">{selectedPin.cleaner}</div>
                            </div>
                            <div className="flex-1 bg-[#EFF6F4] rounded-[13px] p-2.5">
                                <div className="text-[9.5px] font-bold text-[#93A19B] uppercase tracking-[0.03em]">Open reports</div>
                                <div className="text-[12.5px] font-extrabold font-display mt-1 text-[#0E1913]">{selectedPin.reports}</div>
                            </div>
                        </div>

                        <div className="mb-3.5">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-[11px] py-1.5 rounded-[20px]" style={{ backgroundColor: statusLabel(selectedPin).bg, color: statusLabel(selectedPin).fg }}>
                                {statusLabel(selectedPin).text}
                            </span>
                        </div>

                        <div className="flex gap-2.5">
                            <button
                                className="flex-1 flex items-center justify-center gap-1.5 p-3 rounded-[14px] text-[12.5px] font-extrabold bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white shadow-[0_10px_30px_rgba(59,130,246,.18)] border-none active:scale-[0.97] transition-transform"
                                onClick={() => window.open(`http://googleusercontent.com/maps.google.com/maps?q=${selectedPin.lat},${selectedPin.lng}`, '_blank')}
                            >
                                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                                Directions
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center gap-1.5 p-3 rounded-[14px] text-[12.5px] font-bold bg-[#FFFFFF] border-[1.5px] border-[#E4EEEC] text-[#0E1913] active:bg-[#EFF6F4] active:scale-[0.97] transition-all"
                                onClick={() => setReportModalOpen(true)}
                            >
                                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
                                Report Issue
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Report Modal */}
            {reportModalOpen && selectedPin && (
                <>
                    <div className="absolute inset-0 bg-[#0a191466] backdrop-blur-[2px] z-[80] animate-in fade-in duration-200" onClick={() => setReportModalOpen(false)}></div>
                    <div className="absolute left-0 right-0 bottom-0 bg-[#FFFFFF] rounded-t-[22px] px-[18px] pb-6 pt-4 shadow-[0_-14px_40px_rgba(10,25,20,.22)] z-[81] animate-in slide-in-from-bottom-full duration-300">
                        <div className="text-[15px] font-extrabold font-display mb-0.5">Report an issue</div>
                        <div className="text-[11.5px] font-semibold text-[#93A19B] mb-3.5">{selectedPin.name}</div>

                        <div className="grid grid-cols-2 gap-2 mb-3.5">
                            {[
                                { id: 'Cleanliness', icon: <path d="M4 4l16 16M20 4 4 20" /> },
                                { id: 'Supplies', icon: <><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 7h6M9 11h6" /></> },
                                { id: 'Repair', icon: <path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6l-2.5 2.5-2-2z" /> },
                                { id: 'Odor', icon: <><path d="M9.5 3a3 3 0 0 1 3 3v10a2.5 2.5 0 1 1-5 0" /><path d="M14.5 8a3 3 0 1 1 3 3H4" /></> }
                            ].map(cat => (
                                <button
                                    key={cat.id}
                                    className={`flex items-center gap-2 p-[11px] rounded-[13px] border-[1.5px] text-[12px] font-bold transition-all active:scale-95 ${reportCategory === cat.id ? 'border-[#3B82F6] bg-[#E6F0FF] text-[#1D4ED8]' : 'border-[#E4EEEC] bg-[#FFFFFF] text-[#5C6B65]'}`}
                                    onClick={() => setReportCategory(cat.id)}
                                >
                                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{cat.icon}</svg>
                                    {cat.id}
                                </button>
                            ))}
                        </div>

                        <textarea
                            className="w-full min-h-[64px] rounded-[13px] border-[1.5px] border-[#E4EEEC] bg-[#FFFFFF] p-[10px_12px] text-[12.5px] font-sans text-[#0E1913] outline-none resize-none mb-3 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#E6F0FF] transition-all placeholder:text-[#93A19B]"
                            placeholder="Add a short note (optional)…"
                            maxLength="200"
                            value={reportNote}
                            onChange={e => setReportNote(e.target.value)}
                        ></textarea>

                        <div className="flex gap-2.5">
                            <button
                                className="flex-1 flex items-center justify-center p-3 rounded-[14px] text-[12.5px] font-bold bg-[#FFFFFF] border-[1.5px] border-[#E4EEEC] text-[#0E1913] active:bg-[#EFF6F4] active:scale-[0.97] transition-all"
                                onClick={() => setReportModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 flex items-center justify-center p-3 rounded-[14px] text-[12.5px] font-extrabold bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white shadow-[0_10px_30px_rgba(59,130,246,.18)] border-none disabled:opacity-50 disabled:shadow-none active:scale-[0.97] transition-all"
                                disabled={!reportCategory}
                                onClick={handleReportSubmit}
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}