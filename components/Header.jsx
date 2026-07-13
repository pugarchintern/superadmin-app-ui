"use client";

import React, { useState, useEffect, useRef } from "react";

// --- SVG Icon Helper ---
const Icon = ({ name, className }) => {
  const icons = {
    menu: <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></>,
    chevDown: <polyline points="6 9 12 15 18 9" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={name === "chevDown" ? "2.4" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

export default function Header({ onOpenSidebar }) {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'building' | 'notif' | null
  const [selectedBuilding, setSelectedBuilding] = useState("Corporate Building1");
  const headerRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const buildings = ["Corporate Building1", "Corporate Building2", "Warehouse East"];

  return (
    <header className="w-full relative z-40" ref={headerRef}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-white to-safai-surface-tint relative">
        
        {/* Sidebar Trigger */}
        <button 
          onClick={onOpenSidebar}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-safai-surface-soft to-white border-none flex items-center justify-center text-safai-text shrink-0 relative cursor-pointer active:scale-[0.93] transition-transform hover:shadow-sm" 
          aria-label="Menu"
        >
          <Icon name="menu" className="w-[19px] h-[19px]" />
        </button>

        {/* Building Picker */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('building')}
            className="flex items-center gap-2 bg-none border-none p-1.5 cursor-pointer active:scale-[0.98] transition-transform" 
            aria-haspopup="true" 
            aria-expanded={activeDropdown === 'building'}
          >
            <span className="w-[30px] h-[30px] rounded-[10px] bg-gradient-to-br from-safai-primary to-safai-primary-2 text-white flex items-center justify-center shrink-0 shadow-safai-glow">
              <Icon name="building" className="w-[15px] h-[15px]" />
            </span>
            <span className="text-[14.5px] font-bold font-display">{selectedBuilding}</span>
            <Icon 
              name="chevDown" 
              className={`w-[15px] h-[15px] text-safai-text-faint ml-[1px] transition-transform ${activeDropdown === 'building' ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Building Menu Dropdown */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-safai-surface border border-safai-border rounded-[14px] shadow-safai-md p-1.5 min-w-[168px] origin-top transition-all duration-150 ${activeDropdown === 'building' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="text-[9.5px] font-extrabold tracking-[.06em] uppercase text-safai-text-faint px-2.5 py-2 pt-2">
              Switch building
            </div>
            {buildings.map((building) => (
              <button 
                key={building}
                onClick={() => {
                  setSelectedBuilding(building);
                  setActiveDropdown(null);
                }}
                className={`flex items-center gap-2 w-full text-left p-2.5 rounded-[9px] text-[12.5px] font-semibold text-safai-text bg-none border-none cursor-pointer transition-colors ${selectedBuilding === building ? 'bg-safai-primary-soft text-safai-primary-deep font-bold' : 'hover:bg-safai-surface-soft'}`}
              >
                <Icon name="building" className="w-[14px] h-[14px] shrink-0 text-safai-text-faint" />
                {building}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notif')}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-safai-surface-soft to-white border-none flex items-center justify-center text-safai-text shrink-0 relative cursor-pointer active:scale-[0.93] transition-transform hover:shadow-sm" 
            aria-label="Notifications"
          >
            <Icon name="bell" className="w-[19px] h-[19px]" />
            {/* Remove badge logic dynamically when viewed if needed */}
            <span className="absolute top-[6px] right-[7px] w-2 h-2 rounded-full bg-safai-coral border-2 border-safai-surface"></span>
          </button>

          {/* Notifications Dropdown */}
          <div className={`absolute top-full right-0 mt-1 bg-safai-surface border border-safai-border rounded-[14px] shadow-safai-md p-1.5 min-w-[250px] max-w-[270px] origin-top-right transition-all duration-150 ${activeDropdown === 'notif' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="text-[9.5px] font-extrabold tracking-[.06em] uppercase text-safai-text-faint px-2.5 py-2 pt-2">
              Notifications
            </div>
            
            {/* Example Notification Items */}
            <div className="flex gap-2.5 p-2 rounded-[11px] items-start cursor-pointer hover:bg-safai-surface-soft transition-colors">
              <span className="w-[7px] h-[7px] rounded-full bg-safai-coral shrink-0 mt-[5px]"></span>
              <div>
                <div className="text-xs font-semibold leading-snug">New repair request at Ground Floor Washroom A</div>
                <div className="text-[10px] text-safai-text-faint font-semibold mt-0.5">2 min ago</div>
              </div>
            </div>
            <div className="flex gap-2.5 p-2 rounded-[11px] items-start cursor-pointer hover:bg-safai-surface-soft transition-colors">
              <span className="w-[7px] h-[7px] rounded-full bg-safai-amber shrink-0 mt-[5px]"></span>
              <div>
                <div className="text-xs font-semibold leading-snug">Cleaner assigned to AT1</div>
                <div className="text-[10px] text-safai-text-faint font-semibold mt-0.5">14 min ago</div>
              </div>
            </div>
            <div className="flex gap-2.5 p-2 rounded-[11px] items-start cursor-pointer hover:bg-safai-surface-soft transition-colors">
              <span className="w-[7px] h-[7px] rounded-full bg-safai-primary shrink-0 mt-[5px]"></span>
              <div>
                <div className="text-xs font-semibold leading-snug">Inspection completed at Tower A - GF Washroom</div>
                <div className="text-[10px] text-safai-text-faint font-semibold mt-0.5">1 hr ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Greeting Row */}
      <div className="flex items-center justify-between px-4 py-2 pb-[18px] bg-gradient-to-b from-white to-safai-surface-tint border-b border-safai-border rounded-b-[24px]">
        <div className="flex items-center gap-[11px] min-w-0">
          <div className="w-11 h-11 rounded-[15px] bg-gradient-to-br from-safai-primary-soft to-white text-safai-primary-deep flex items-center justify-center font-extrabold text-sm shrink-0 border-[1.5px] border-safai-primary-soft font-display">
            OP
          </div>
          <div className="min-w-0">
            <div className="text-xs text-safai-text-dim font-medium">Hey Omkar,</div>
            <div className="flex items-center gap-[7px] mt-0.5 flex-wrap">
              <div className="text-[15px] font-bold font-display whitespace-nowrap">Omkar Porlikar</div>
              <span className="text-[9px] font-extrabold tracking-[.03em] text-safai-primary-deep bg-safai-primary-soft px-2 py-[3px] rounded-[20px] whitespace-nowrap">
                SUPER ADMIN
              </span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => console.log('Handle Logout')}
          className="flex items-center gap-1.5 bg-gradient-to-br from-white to-safai-surface-tint text-safai-primary-deep border-[1.5px] border-safai-primary-soft font-bold text-xs px-3 py-[9px] rounded-xl shrink-0 cursor-pointer active:bg-safai-primary-soft transition-colors hover:shadow-sm"
        >
          <Icon name="logout" className="w-[14px] h-[14px]" />
          Logout
        </button>
      </div>
    </header>
  );
}