"use client";

import React, { useState, useRef, useMemo } from "react";

/* ==========================================================================
   DATA & CONFIGURATION
   ========================================================================== */
const TONE = {
  blue: { bg: 'bg-[#E6F0FF]', text: 'text-[#1D4ED8]', icon: 'text-[#3B82F6]' },
  green: { bg: 'bg-[#E8F5E9]', text: 'text-[#1E6B3D]', icon: 'text-[#2E7D32]' },
  amber: { bg: 'bg-[#FFF3DC]', text: 'text-[#9A6B00]', icon: 'text-[#F0A527]' },
  red: { bg: 'bg-[#FDE7EA]', text: 'text-[#E8435A]', icon: 'text-[#E8435A]' },
  purple: { bg: 'bg-[#F3E8FF]', text: 'text-[#7C3AED]', icon: 'text-[#7C3AED]' },
  neutral: { bg: 'bg-[#EFF6F4]', text: 'text-[#0E1913]', icon: 'text-[#5C6B65]' }
};

const HEAT_STOPS = ['#F6B0B9', '#FBDE9C', '#93DDB2'];

const REPORT_DATA = {
  'Cleaning Report': {
    title: 'Daily Cleaning Report',
    stats: [
      { label: 'Total Cleanings', value: 32, tone: 'blue', icon: 'checklist' },
      { label: 'Completed', value: 28, tone: 'green', icon: 'check' },
      { label: 'Ongoing', value: 4, tone: 'amber', icon: 'activity' },
      { label: 'Completion Rate', value: '87.5%', tone: 'blue', icon: 'percent' }
    ],
    columns: ['SR NO', 'CLEANER NAME', 'LOCATION / WASHROOM', 'START TIME', 'END TIME', 'DURATION', 'AI SCORE', 'AVG SCORE', 'STATUS'],
    rows: [
      [1, 'srujal mane', 'dwarka nagar washroom (test33)', '01 Jul 2026, 12:05 pm', '01 Jul 2026, 12:07 pm', '2 min', '10.0', '10.0', 'COMPLETED'],
      [2, 'srujal mane', 'Ground Floor Washroom A', '30 Jun 2026, 10:06 pm', '30 Jun 2026, 10:08 pm', '2 min', '6.0', '5.3', 'COMPLETED'],
      [3, 'Omkar Cleaner', 'Test-02 (Manish 1)', '30 Jun 2026, 05:59 pm', '30 Jun 2026, 06:01 pm', '1 min', '8.4', '9.5', 'COMPLETED'],
      [4, 'Kartik Kanzode', 'kartik test 1 (Building 1)', '30 Jun 2026, 03:58 pm', '30 Jun 2026, 04:02 pm', '4 min', '8.0', '9.0', 'COMPLETED'],
      [5, 'Kartik Kanzode', 'shitla mata mandir (Nagpur)', '30 Jun 2026, 02:37 pm', 'Ongoing', '327 hrs', '0.0', '0.0', 'OVERDUE'],
      [6, 'Test-fsgs', 'Test89 (New A)', '25 Jun 2026, 10:41 am', '25 Jun 2026, 10:44 am', '2 min', '10.0', '10.0', 'COMPLETED'],
    ],
    scoreCols: [6, 7], statusCol: 8
  },
  'Washroom Report': {
    title: 'All Washrooms Report',
    showInfoCard: true,
    sectionTitle: 'Washroom Details',
    stats: [
      { label: 'Total Washrooms', value: 13, tone: 'blue', icon: 'building' },
      { label: 'Avg Rating', value: '6.7', suffix: 'out of 10', tone: 'green', icon: 'star' },
      { label: 'Avg Duration', value: 0, suffix: 'minutes', tone: 'purple', icon: 'clock' }
    ],
    columns: ['WASHROOM', 'ADDRESS', 'TYPE', 'CLEANER', 'STATUS', 'AVG RATING', 'IMAGES', 'LAST ACTIVITY'],
    colTypes: ['bold', 'plain', 'plain', 'plain', 'status', 'rating', 'plain', 'plain'],
    rows: [
      ['dwarka nagar washroom', 'pusad yavatmal', 'test33', 'srujal mane', 'Completed', '10.0', '60', '01 Jul 2026, 12:05 pm'],
      ['Ground Floor Washroom A', 'N/A', 'Lokmat building', 'srujal mane', 'Completed', '5.3', '32', '30 Jun 2026, 10:06 pm']
    ]
  },
  'Cleaner Report': {
    title: 'All Cleaners Report',
    isCleanerList: true,
    stats: [
      { label: 'Total Cleaners', value: 5, tone: 'blue', icon: 'user' },
      { label: 'Completed', value: 28, tone: 'green', icon: 'check' }
    ],
    topPerformers: ['Test-fsgs', 'Omkar Cleaner', 'Kartik Kanzode'],
    columns: ['#', 'CLEANER', 'PHONE', 'TOTAL', 'COMPLETED', 'ONGOING', 'INCOMPLETE', 'AVG SCORE', 'AVG DURATION', 'LAST ACTIVITY'],
    colTypes: ['plain', 'bold', 'plain', 'plain', 'plain', 'plain', 'plain', 'score', 'plain', 'plain'],
    rows: [
      [1, 'srujal mane', '7887364232', 7, 6, 0, 1, '5.34', '5 min', '01 Jul 2026, 12:05 pm'],
      [2, 'Omkar Cleaner', '9111111111', 6, 5, 0, 1, '8.07', '199 min', '30 Jun 2026, 05:59 pm'],
      [3, 'Kartik Kanzode', '9822233344', 12, 12, 0, 0, '7.80', '108 min', '30 Jun 2026, 03:58 pm']
    ],
    scoreCols: [7], statusCol: -1
  },
  'Washroom Hygiene Trend': {
    title: 'Washroom Daily Scores Report',
    isMatrixReport: true,
    dateRangeLabel: '14 Jun 2026 to 14 Jul 2026',
    stats: [
      { label: 'Total Washrooms', value: 53, tone: 'blue', icon: 'pin' },
      { label: 'Date Range', value: '31 Days', tone: 'purple', icon: 'calendar' },
      { label: 'Overall Avg Score', value: '1.6', tone: 'green', icon: 'star' },
      { label: 'Top Performer', value: 'Charvi Home', tone: 'amber', icon: 'award' }
    ],
    matrixStart: '2026-06-14',
    matrixEnd: '2026-06-20',
    matrixRows: [
      { sr: 1, name: 'ABC', location: 'Nagpur', zone: 'Somalwada', cleaners: ['srujal mane', 'sdm'], scores: { '15 JUN': '6.5', '18 JUN': '4.0', '20 JUN': '10.0' }, average: '6.8' },
      { sr: 2, name: 'ABC2', location: 'Nagpur', zone: 'Somalwada', cleaners: ['Sharyu', 'Kartik Kanzode'], scores: { '16 JUN': '7.0', '19 JUN': '5.5' }, average: '6.8' },
      { sr: 3, name: 'dwarka nagar', location: 'pusad yavatmal', zone: 'test33', cleaners: ['srujal mane'], scores: { '14 JUN': '9.0', '17 JUN': '10.0', '20 JUN': '10.0' }, average: '9.6' }
    ]
  }
};

const CLEANER_PROFILES = {
  1: {
    name: 'srujal mane', phone: '7887364232',
    stats: { total: 7, completed: 6, ongoing: 0, incomplete: 1, avgScore: '5.34', avgDuration: '5 min' },
    taskColumns: ['SR NO', 'LOCATION / WASHROOM', 'START TIME', 'END TIME', 'DURATION', 'AI SCORE', 'AVG SCORE', 'STATUS'],
    tasks: [
      [1, 'dwarka nagar washroom (test33)', '01 Jul 2026, 12:05 pm', '01 Jul 2026, 12:07 pm', '2 min', '10.0', '10.0', 'COMPLETED'],
      [2, 'Ground Floor Washroom A (Lokmat)', '30 Jun 2026, 10:06 pm', '30 Jun 2026, 10:08 pm', '2 min', '6.0', '5.3', 'COMPLETED']
    ]
  },
  2: {
    name: 'Omkar Cleaner', phone: '9111111111',
    stats: { total: 6, completed: 5, ongoing: 0, incomplete: 1, avgScore: '8.07', avgDuration: '199 min' },
    taskColumns: ['SR NO', 'LOCATION / WASHROOM', 'START TIME', 'END TIME', 'DURATION', 'AI SCORE', 'AVG SCORE', 'STATUS'],
    tasks: [
      [1, 'Test-02 (Manish 1)', '30 Jun 2026, 05:59 pm', '30 Jun 2026, 06:01 pm', '1 min', '8.4', '9.5', 'COMPLETED'],
      [2, 'Test-02 (Manish 1)', '21 Jun 2026, 02:40 am', 'Ongoing', '555 hrs', '0.0', '9.5', 'OVERDUE']
    ]
  }
};

/* ==========================================================================
   HELPER COMPONENTS & FUNCTIONS
   ========================================================================== */
const Icon = ({ name, className }) => {
  const icons = {
    checklist: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
    check: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>,
    activity: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    percent: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>,
    building: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></svg>,
    star: <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.6 6.2L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.4-.8z" /></svg>,
    clock: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></svg>,
    user: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    warn: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    pin: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    calendar: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    award: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" /></svg>,
    target: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /></svg>
  };
  return icons[name] || null;
};

const lerpColor = (hexA, hexB, t) => {
  const a = parseInt(hexA.slice(1), 16), b = parseInt(hexB.slice(1), 16);
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
  const r = Math.round(ar + (br - ar) * t), g = Math.round(ag + (bg - ag) * t), bl = Math.round(ab + (bb - ab) * t);
  return '#' + [r, g, bl].map(x => x.toString(16).padStart(2, '0')).join('');
};

const getHeatBg = (v) => {
  let n = parseFloat(v);
  if (isNaN(n)) return '#EEF2F1';
  n = Math.max(0, Math.min(10, n));
  const segs = HEAT_STOPS.length - 1;
  const pos = (n / 10) * segs;
  const i = Math.min(segs - 1, Math.floor(pos));
  return lerpColor(HEAT_STOPS[i], HEAT_STOPS[i + 1], pos - i);
};

const getHeatText = (v) => {
  const n = parseFloat(v);
  if (isNaN(n)) return '#8A968F';
  if (n < 4) return '#B3273C';
  if (n < 7) return '#8A5A00';
  return '#0E7A56';
};

const StatusPill = ({ status }) => {
  const s = String(status).toUpperCase();
  let cls = 'bg-[#E5F5EF] text-[#0E7A56]';
  if (s === 'OVERDUE') cls = 'bg-[#FDE7EA] text-[#E8435A]';
  else if (s === 'PENDING' || s === 'NEEDS ATTENTION') cls = 'bg-[#FFF3DC] text-[#9A6B00]';

  return (
    <span className={`inline-flex items-center gap-1 py-1 px-2 rounded-full text-[10px] font-extrabold whitespace-nowrap ${cls}`}>
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="9" /></svg>
      {status}
    </span>
  );
};

const ScorePill = ({ val }) => {
  const n = parseFloat(val);
  let cls = 'bg-[#EFF6F4] text-[#5C6B65]';
  if (!isNaN(n)) {
    if (n >= 8) cls = 'bg-[#E5F5EF] text-[#0E7A56]';
    else if (n >= 5) cls = 'bg-[#FFF3DC] text-[#9A6B00]';
    else cls = 'bg-[#FDE7EA] text-[#E8435A]';
  }
  return <span className={`inline-flex items-center py-0.5 px-1.5 rounded-full text-[10.5px] font-extrabold whitespace-nowrap ${cls}`}>{val}</span>;
};

const InsightChip = ({ icon, label, value, bg, fg, flagged }) => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-br from-[#FFFFFF] to-[#E9F2FF] border border-[#E4EEEC] rounded-2xl py-2.5 pr-3.5 pl-2.5 shadow-[0_2px_10px_rgba(30,58,138,.06)]" style={flagged ? { backgroundColor: '#FDE7EA', borderColor: '#F6C7CE' } : {}}>
      <div className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg, color: fg }}>
        <Icon name={icon} className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[12.5px] font-extrabold font-display leading-tight whitespace-nowrap" style={flagged ? { color: fg } : {}}>
          {value}
        </div>
        <div className="text-[9px] text-[#93A19B] font-bold uppercase tracking-wide mt-0.5 whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export default function SafaiReportsContent() {
  const [view, setView] = useState('config');
  const [activeModule, setActiveModule] = useState('Cleaning Report');
  const [toasts, setToasts] = useState([]);
  const [selectedCleanerId, setSelectedCleanerId] = useState(null);
  const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false);

  // Form State
  const [startDate, setStartDate] = useState('13-07-2026');
  const [endDate, setEndDate] = useState('13-07-2026');
  const [generatedDate, setGeneratedDate] = useState('');

  // Matrix Scroll State
  const matrixWrapRef = useRef(null);
  const [matrixScrollPct, setMatrixScrollPct] = useState(0);

  // Trigger Toast Helper
  const triggerToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2200);
  };

  const handleDatePreset = (preset) => {
    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);

    switch (preset) {
      case 'today': break;
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        break;
      case '7d':
        start.setDate(start.getDate() - 6);
        break;
      case 'month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
    }

    const fmtDate = (d) => `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    setStartDate(fmtDate(start));
    setEndDate(fmtDate(end));
    triggerToast(`Date range set to ${preset}`);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    triggerToast("Compiling metric analytical summary blocks...");
    
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let h12 = now.getHours() % 12 || 12;
    const ampm = now.getHours() >= 12 ? 'pm' : 'am';
    const mm = now.getMinutes().toString().padStart(2, '0');
    setGeneratedDate(`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${h12}:${mm} ${ampm}`);
    
    setView('report');
  };

  const currentData = REPORT_DATA[activeModule] || REPORT_DATA['Cleaning Report'];

  const handleMatrixScroll = () => {
    if (matrixWrapRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = matrixWrapRef.current;
      const max = scrollWidth - clientWidth;
      setMatrixScrollPct(max > 0 ? Math.round((scrollLeft / max) * 100) : 0);
    }
  };

  const scrollMatrix = (amount) => {
    if (matrixWrapRef.current) matrixWrapRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Compute Smart Insights
  const reportInsights = useMemo(() => {
    if (!currentData) return [];
    let chips = [];
    if (currentData.isMatrixReport) {
      const avgStat = currentData.stats.find((s) => s.label === 'Overall Avg Score');
      const topStat = currentData.stats.find((s) => s.label === 'Top Performer');
      if (avgStat) chips.push({ bg: '#E6F0FF', fg: '#1D4ED8', icon: 'target', value: `${avgStat.value} / 10`, label: 'Overall Avg' });
      if (topStat) chips.push({ bg: '#FFF3DC', fg: '#9A6B00', icon: 'award', value: topStat.value, label: 'Top Performer' });
    } else if (currentData.isCleanerList) {
      if (currentData.topPerformers?.[0]) {
        chips.push({ bg: '#FFF3DC', fg: '#9A6B00', icon: 'award', value: currentData.topPerformers[0], label: 'Top Performer' });
      }
    } else {
      const completionStat = currentData.stats.find((s) => s.label === 'Completion Rate');
      if (completionStat) chips.push({ bg: '#E8F5E9', fg: '#1E6B3D', icon: 'check', value: completionStat.value, label: 'Completion Rate' });
    }
    return chips;
  }, [currentData]);

  return (
    <div className="w-full flex-1 relative font-sans text-[#0E1913]">
      {/* Toast Stack */}
      <div className="fixed left-4 right-4 bottom-6 z-50 flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-[#14231E] text-white text-[12.5px] font-semibold py-2.5 px-3.5 rounded-[13px] shadow-[0_10px_24px_rgba(10,25,20,0.35)] flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
            <Icon name="check" className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span>{toast.msg}</span>
          </div>
        ))}
      </div>

      <div className="p-4 md:p-6 pb-24">
        {/* ================= CONFIG VIEW ================= */}
        {view === 'config' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] to-[#E9F2FF] rounded-[20px] border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)] p-4 mb-4">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#3B82F6]/10 blur-2xl pointer-events-none"></div>
              <div className="relative flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center flex-shrink-0 shadow-[0_10px_30px_rgba(59,130,246,.18)]">
                  <Icon name="checklist" className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h1 className="m-0 text-[18px] font-extrabold font-display tracking-tight leading-tight truncate">Analytics Reports</h1>
                  <p className="m-0 mt-0.5 text-[10.5px] font-bold text-[#93A19B] uppercase tracking-wide">Select a module & configure parameters</p>
                </div>
              </div>
            </div>

            {/* Module Selector */}
            <div className="relative z-20 bg-[#FFFFFF] rounded-[20px] p-3.5 mb-4 border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)]">
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#5C6B65] mb-2.5">
                Report Module
              </div>
              <button 
                type="button" 
                onClick={() => setModuleDropdownOpen(!moduleDropdownOpen)}
                className="w-full flex items-center justify-between gap-2 h-[52px] px-3 rounded-2xl border border-[#E4EEEC] bg-gradient-to-br from-[#EFF6F4] to-[#FFFFFF] active:scale-[0.98] transition-all"
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-xl bg-[#E5F5EF] text-[#0E7A56] flex items-center justify-center flex-shrink-0">
                    <Icon name={currentData.isMatrixReport ? 'trend' : (currentData.isCleanerList ? 'user' : 'checklist')} className="w-3.5 h-3.5" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-[13.5px] font-bold text-[#0E1913] truncate font-display">{activeModule}</span>
                    <span className="block text-[10px] font-semibold text-[#93A19B] uppercase tracking-wide">Tap to change module</span>
                  </span>
                </span>
                <svg className={`w-4 h-4 text-[#93A19B] flex-shrink-0 transition-transform duration-200 ${moduleDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              {moduleDropdownOpen && (
                <div className="mt-2 rounded-2xl border border-[#E4EEEC] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(30,58,138,.08)] overflow-hidden divide-y divide-[#E4EEEC] animate-in fade-in slide-in-from-top-2">
                  {Object.keys(REPORT_DATA).map(mod => (
                    <button
                      key={mod}
                      onClick={() => { setActiveModule(mod); setModuleDropdownOpen(false); triggerToast(`Switched to ${mod}`); }}
                      className={`w-full flex items-center justify-between gap-2 px-3.5 py-3 text-[13px] transition-colors ${activeModule === mod ? 'bg-[#E5F5EF] text-[#0E7A56] font-bold' : 'text-[#5C6B65] hover:bg-[#EFF6F4]'}`}
                    >
                      <span>{mod}</span>
                      {activeModule === mod && <Icon name="check" className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Configuration Form */}
            <div className="bg-gradient-to-br from-[#FFFFFF] to-[#E9F2FF] rounded-3xl p-5 border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)]">
              <div className="flex items-center gap-3 mb-6 pb-3.5 border-b border-[#E4EEEC]">
                <div className="w-8.5 h-8.5 rounded-xl bg-[#E6F0FF] text-[#1D4ED8] flex items-center justify-center p-2">
                   <Icon name="checklist" className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="m-0 text-[13.5px] font-extrabold font-display uppercase tracking-[0.01em]">Configure {activeModule.split(' ')[0]}</h2>
                  <p className="m-0 mt-0.5 text-[11px] text-[#93A19B] font-medium uppercase">Define your filters</p>
                </div>
              </div>

              <form onSubmit={handleGenerate}>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#93A19B] mb-2">Scope</div>
                <div className="grid grid-cols-2 gap-3">
                  {['Zone', 'Location'].map(label => (
                    <div key={label} className="mb-4 relative">
                      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#5C6B65] mb-1.5 tracking-wider">
                        <Icon name={label === 'Zone' ? 'pin' : 'building'} className="w-3.5 h-3.5 text-[#3B82F6]" /> {label}
                      </label>
                      <div className="relative">
                        <select className="w-full h-11 bg-[#EFF6F4] border border-[#E4EEEC] rounded-xl pl-4 pr-9 text-xs font-semibold text-[#0E1913] appearance-none outline-none focus:border-[#60A5FA] focus:bg-[#FFFFFF] transition-all">
                          <option>All {label}s</option>
                        </select>
                        <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#93A19B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#93A19B] mb-2 mt-1">Assignment</div>
                <div className="grid grid-cols-2 gap-3">
                  {['Cleaner', 'Status'].map(label => (
                    <div key={label} className="mb-4 relative">
                      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#5C6B65] mb-1.5 tracking-wider">
                         <Icon name={label === 'Cleaner' ? 'user' : 'activity'} className="w-3.5 h-3.5 text-[#3B82F6]" /> {label}
                      </label>
                      <div className="relative">
                        <select className="w-full h-11 bg-[#EFF6F4] border border-[#E4EEEC] rounded-xl pl-4 pr-9 text-xs font-semibold text-[#0E1913] appearance-none outline-none focus:border-[#60A5FA] focus:bg-[#FFFFFF] transition-all">
                          <option>All {label}s</option>
                        </select>
                        <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#93A19B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#93A19B] mb-2 mt-1">Date Range</div>
                <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                  {['Today', 'Yesterday', 'Last 7 Days', 'This Month'].map((preset) => (
                    <button 
                      key={preset} 
                      type="button" 
                      onClick={() => handleDatePreset(preset.toLowerCase().replace(' ', ''))}
                      className="flex-shrink-0 py-1.5 px-3 rounded-full text-[10.5px] font-bold border border-[#E4EEEC] bg-[#EFF6F4] text-[#5C6B65] hover:bg-[#E6F0FF] hover:text-[#1D4ED8]"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="relative">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#5C6B65] mb-1.5 tracking-wider">
                      <Icon name="calendar" className="w-3.5 h-3.5 text-[#3B82F6]" /> Start Date
                    </label>
                    <input type="text" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full h-11 bg-[#EFF6F4] border border-[#E4EEEC] rounded-xl px-4 text-xs font-semibold text-[#0E1913] outline-none focus:border-[#60A5FA] focus:bg-[#FFFFFF]" />
                  </div>
                  <div className="relative">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#5C6B65] mb-1.5 tracking-wider">
                      <Icon name="calendar" className="w-3.5 h-3.5 text-[#3B82F6]" /> End Date
                    </label>
                    <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full h-11 bg-[#EFF6F4] border border-[#E4EEEC] rounded-xl px-4 text-xs font-semibold text-[#0E1913] outline-none focus:border-[#60A5FA] focus:bg-[#FFFFFF]" />
                  </div>
                </div>

                {/* Actions Stack */}
                <div className="flex flex-col gap-2.5">
                  <button type="submit" className="w-full h-11 rounded-xl text-[12.5px] font-bold font-display flex items-center justify-center gap-1.5 bg-gradient-to-br from-[#F0A527] to-[#E09517] text-white shadow-[0_4px_14px_-4px_rgba(240,165,39,0.6)] active:scale-[0.98] transition-all">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    GENERATE REPORT
                  </button>
                  <button type="button" onClick={() => triggerToast('Filters reset to default')} className="w-full h-11 bg-[#FFFFFF] border border-[#E4EEEC] rounded-xl text-[12.5px] font-bold text-[#5C6B65] font-display active:bg-[#EFF6F4] active:scale-[0.98] transition-all">
                    RESET FILTERS
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= REPORT VIEW ================= */}
        {view === 'report' && currentData && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <button onClick={() => setView('config')} className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E4EEEC] text-[#0E1913] text-[12.5px] font-bold py-2 px-3 rounded-xl mb-3 shadow-[0_2px_10px_rgba(30,58,138,.06)] active:scale-[0.96] transition-transform">
              <svg className="w-3.5 h-3.5 text-[#5C6B65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Back to filters
            </button>

            {/* Header Card */}
            <div className="bg-gradient-to-br from-[#FFFFFF] to-[#E9F2FF] rounded-2xl p-4 mb-4 border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)]">
              <div className="flex items-start justify-between gap-2">
                <h2 className="m-0 text-[16px] font-extrabold font-display leading-tight text-[#0E1913]">{currentData.title}</h2>
                <button onClick={() => setView('config')} className="w-8 h-8 rounded-lg bg-[#EFF6F4] border border-[#E4EEEC] flex items-center justify-center text-[#5C6B65] active:scale-95">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-2">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#0E1913]">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#3B82F6] flex-shrink-0"></span> Corporate Building1
                </span>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#1D4ED8] bg-[#E6F0FF] py-1 px-2 rounded-full">
                  <Icon name="calendar" className="w-3 h-3" /> {currentData.dateRangeLabel || `${startDate} to ${endDate}`}
                </span>
              </div>
              <div className="text-[10.5px] text-[#93A19B] font-semibold mt-1.5">Generated: {generatedDate}</div>
              
              <div className="flex items-center gap-2 mt-3.5">
                {['PDF', 'Excel', 'Print'].map((btn, i) => (
                  <button key={btn} onClick={() => triggerToast(`Preparing ${btn}...`)} className={`flex-1 h-9 rounded-xl text-white text-[11px] font-bold font-display flex items-center justify-center gap-1 active:scale-[0.96] transition-transform ${i===0?'bg-[#E8435A]':i===1?'bg-[#1E8E5A]':'bg-[#3B82F6]'}`}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Insights */}
            {reportInsights.length > 0 && (
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 mb-4" style={{ scrollbarWidth: 'none' }}>
                {reportInsights.map((insight, i) => (
                  <InsightChip key={i} {...insight} />
                ))}
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {currentData.stats.map((s, i) => {
                const t = TONE[s.tone];
                return (
                  <div key={i} className={`rounded-xl p-3 border border-[#E4EEEC] ${t.bg}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[9.5px] font-extrabold uppercase tracking-wide ${t.text}`}>{s.label}</span>
                      <span className={t.icon}><Icon name={s.icon} className="w-4 h-4" /></span>
                    </div>
                    <div className={`text-[19px] font-extrabold font-display mt-1 ${t.text}`}>{s.value}</div>
                    {s.suffix && <div className={`text-[9.5px] font-semibold opacity-70 mt-0.5 ${t.text}`}>{s.suffix}</div>}
                  </div>
                )
              })}
            </div>

            {/* Top Performers (Cleaner Only) */}
            {currentData.topPerformers && (
               <div className="bg-[#FFFFFF] rounded-2xl border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)] p-4 mb-4">
                 <div className="text-[13px] font-extrabold font-display text-[#0E1913] mb-2.5">Top Performers (Avg Score)</div>
                 <ol className="flex flex-col gap-2">
                   {currentData.topPerformers.map((name, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[12.5px] font-semibold text-[#0E1913]">
                        <span className="w-5 h-5 rounded-full bg-[#E6F0FF] text-[#1D4ED8] text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        <span className="truncate">{name}</span>
                      </li>
                   ))}
                 </ol>
               </div>
            )}

            {/* Matrix View OR Standard Table */}
            {currentData.isMatrixReport ? (
              <div>
                <div className="bg-[#E6F0FF] border border-[#E4EEEC] rounded-xl py-2.5 px-3 mb-3 flex flex-col gap-2">
                   <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#1D4ED8]">💡 Scroll to view dates</span>
                      <span className="text-[9px] font-mono font-bold bg-[#FFFFFF] border border-[#E4EEEC] rounded px-1.5 py-0.5 text-[#5C6B65]">Shift + Scroll</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <button onClick={() => scrollMatrix(-160)} className="w-7 h-7 rounded-lg bg-[#FFFFFF] flex items-center justify-center border border-[#E4EEEC] active:scale-95 text-[#5C6B65]">{'<'}</button>
                     <div className="flex-1 h-1.5 bg-[#E4EEEC] rounded-full relative overflow-hidden">
                       <div className="absolute top-0 bottom-0 left-0 bg-[#3B82F6] transition-all duration-150" style={{ width: `${Math.max(4, matrixScrollPct)}%` }}></div>
                     </div>
                     <button onClick={() => scrollMatrix(160)} className="w-7 h-7 rounded-lg bg-[#FFFFFF] flex items-center justify-center border border-[#E4EEEC] active:scale-95 text-[#5C6B65]">{'>'}</button>
                   </div>
                </div>
                
                <div className="flex items-center justify-between gap-3 mb-3 px-0.5">
                  <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#93A19B]">
                    <span className="w-3.5 h-3.5 rounded-[4px] flex-shrink-0 bg-[repeating-linear-gradient(135deg,#EEF2F1,#EEF2F1_3px,#E4EAE8_3px,#E4EAE8_6px)]"></span>
                    No visit
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 max-w-[190px]">
                    <span className="text-[9px] font-extrabold text-[#93A19B]">Low</span>
                    <span className="flex-1 h-2 rounded-full" style={{ background: 'linear-gradient(90deg,#F6B0B9,#FBDE9C,#93DDB2)' }}></span>
                    <span className="text-[9px] font-extrabold text-[#93A19B]">High</span>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] rounded-2xl border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)] overflow-hidden mb-4">
                  <div ref={matrixWrapRef} onScroll={handleMatrixScroll} className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                    <table className="border-collapse text-[11px] min-w-[600px]">
                      <thead>
                        <tr className="bg-[#EFF6F4] text-[#5C6B65]">
                          {['WASHROOM', '15 JUN', '16 JUN', '17 JUN', 'AVG'].map(h => (
                            <th key={h} className="text-left font-extrabold text-[9.5px] uppercase tracking-wide py-2.5 px-3 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.matrixRows.map((row, i) => (
                          <tr key={i} className={`border-t border-[#E4EEEC] ${i%2!==0?'bg-[#F4F8F7]/40':''}`}>
                            <td className="py-2.5 px-3 font-extrabold text-[#0E1913]">{row.name} <span className="block font-semibold text-[10px] text-[#93A19B]">{row.location}</span></td>
                            {Object.values(row.scores).slice(0,3).map((score, idx) => (
                              <td key={idx} className="p-1">
                                <div className="h-9 rounded-lg flex items-center justify-center text-[11px] font-extrabold" style={{ backgroundColor: getHeatBg(score), color: getHeatText(score) }}>{score}</div>
                              </td>
                            ))}
                            <td className="p-1">
                              <div className="h-9 rounded-lg flex items-center justify-center text-[12px] font-extrabold border-2" style={{ backgroundColor: getHeatBg(row.average), color: getHeatText(row.average), borderColor: getHeatText(row.average)+'33' }}>{row.average}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)] overflow-hidden mb-4">
                {currentData.sectionTitle && <div className="text-[13px] font-extrabold font-display text-[#0E1913] py-3 px-4 border-b border-[#E4EEEC]">{currentData.sectionTitle}</div>}
                <div className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                  <table className="border-collapse text-[11px] w-full min-w-[560px]">
                    <thead>
                      <tr className="bg-[#EFF6F4] text-[#5C6B65]">
                        {currentData.columns.map((col, i) => (
                          <th key={i} className="text-left font-extrabold text-[9.5px] uppercase py-2.5 px-3 whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.rows.map((row, rIdx) => (
                        <tr 
                          key={rIdx} 
                          onClick={() => currentData.isCleanerList ? (setSelectedCleanerId(row[0]), setView('cleanerDetail')) : null}
                          className={`border-t border-[#E4EEEC] ${rIdx%2!==0?'bg-[#F4F8F7]/40':''} ${currentData.isCleanerList ? 'cursor-pointer active:bg-[#E6F0FF]/60' : ''}`}
                        >
                          {row.map((cell, cIdx) => {
                            const isScore = currentData.scoreCols?.includes(cIdx);
                            const isStatus = currentData.statusCol === cIdx;
                            return (
                              <td key={cIdx} className={`py-2.5 px-3 whitespace-nowrap text-[#0E1913] ${cIdx===1&&currentData.isCleanerList?'font-extrabold':''}`}>
                                {isStatus ? <StatusPill status={cell} /> : isScore ? <ScorePill val={cell} /> : cell}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= CLEANER DETAIL ================= */}
        {view === 'cleanerDetail' && selectedCleanerId && CLEANER_PROFILES[selectedCleanerId] && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <button onClick={() => setView('report')} className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E4EEEC] text-[#0E1913] text-[12.5px] font-bold py-2 px-3 rounded-xl mb-3 shadow-[0_2px_10px_rgba(30,58,138,.06)] active:scale-[0.96] transition-transform">
              <svg className="w-3.5 h-3.5 text-[#5C6B65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Back to cleaners
            </button>

            <div className="bg-gradient-to-br from-[#FFFFFF] to-[#E9F2FF] rounded-2xl p-4 mb-4 border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)]">
               <div className="flex items-center gap-3">
                 <div className="w-11 h-11 rounded-[15px] bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-white flex items-center justify-center font-extrabold font-display text-[15px]">{CLEANER_PROFILES[selectedCleanerId].name.split(' ').map((n)=>n[0]).join('').substring(0,2).toUpperCase()}</div>
                 <div>
                   <h2 className="text-[16px] font-extrabold font-display leading-tight text-[#0E1913] m-0">{CLEANER_PROFILES[selectedCleanerId].name}</h2>
                   <div className="text-[11px] font-semibold text-[#5C6B65] mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3 text-[#93A19B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {CLEANER_PROFILES[selectedCleanerId].phone}
                   </div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-4">
              <div className="rounded-xl p-3 border border-[#E4EEEC] bg-[#E6F0FF]">
                <div className="text-[9.5px] font-extrabold uppercase tracking-wide text-[#1D4ED8]">Avg Score</div>
                <div className="text-[19px] font-extrabold font-display mt-1 text-[#1D4ED8]">{CLEANER_PROFILES[selectedCleanerId].stats.avgScore}</div>
              </div>
              <div className="rounded-xl p-3 border border-[#E4EEEC] bg-[#E8F5E9]">
                <div className="text-[9.5px] font-extrabold uppercase tracking-wide text-[#1E6B3D]">Completed</div>
                <div className="text-[19px] font-extrabold font-display mt-1 text-[#1E6B3D]">{CLEANER_PROFILES[selectedCleanerId].stats.completed}</div>
              </div>
              <div className="rounded-xl p-3 border border-[#E4EEEC] bg-[#FFF3DC]">
                <div className="text-[9.5px] font-extrabold uppercase tracking-wide text-[#9A6B00]">Total Tasks</div>
                <div className="text-[19px] font-extrabold font-display mt-1 text-[#9A6B00]">{CLEANER_PROFILES[selectedCleanerId].stats.total}</div>
              </div>
            </div>

            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E4EEEC] shadow-[0_2px_10px_rgba(30,58,138,.06)] overflow-hidden mb-4">
                <div className="text-[13px] font-extrabold font-display text-[#0E1913] py-3 px-4 border-b border-[#E4EEEC]">Task History</div>
                <div className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                  <table className="border-collapse text-[11px] w-full min-w-[560px]">
                    <thead>
                      <tr className="bg-[#EFF6F4] text-[#5C6B65]">
                        {CLEANER_PROFILES[selectedCleanerId].taskColumns.map((col, i) => (
                          <th key={i} className="text-left font-extrabold text-[9.5px] uppercase py-2.5 px-3 whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CLEANER_PROFILES[selectedCleanerId].tasks.map((row, rIdx) => (
                        <tr key={rIdx} className={`border-t border-[#E4EEEC] ${rIdx%2!==0?'bg-[#F4F8F7]/40':''}`}>
                          {row.map((cell, cIdx) => {
                            const isScore = [5, 6].includes(cIdx);
                            const isStatus = cIdx === 7;
                            return (
                              <td key={cIdx} className={`py-2.5 px-3 whitespace-nowrap text-[#0E1913] ${cIdx===1?'font-extrabold':''}`}>
                                {isStatus ? <StatusPill status={cell} /> : isScore ? <ScorePill val={cell} /> : cell}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}