"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- SVG Icon Helper ---
const Icon = ({ name, className }) => {
  const icons = {
    close: <path d="M18 6 6 18M6 6l12 12" />,
    chevRight: <polyline points="9 18 15 12 9 6" />,
    chevDown: <polyline points="6 9 12 15 18 9" />,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
    map: <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" />,
    list: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" /></>,
    facility: <><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></>,
    pin: <><path d="M12 21s-7-6.1-9.5-10A5.5 5.5 0 0 1 12 4.5 5.5 5.5 0 0 1 21.5 11c-2.5 3.9-9.5 10-9.5 10z" /><circle cx="12" cy="10.5" r="2.2" /></>,
    activity: <path d="M3 12h3l2-6 4 12 2-8 2 4h5" />,
    attendance: <><circle cx="9" cy="7" r="4" /><path d="M1 21v-2a4 4 0 0 1 4-4h2.5" /><path d="M17 11l2 2 4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    report: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

// --- Subcomponents ---
const MenuSectionTitle = ({ title }) => (
  <div className="text-[10px] font-extrabold tracking-[.08em] uppercase text-safai-text-faint mt-4 mb-2">
    {title}
  </div>
);

const DrawerLink = ({ icon, label, active, badge, href, onClick }) => {
  const activeClasses = active ? "bg-gradient-to-br from-safai-primary-soft to-[#EAFBF6] !text-safai-primary-deep font-bold" : "hover:bg-safai-surface-soft";
  
  const content = (
    <div 
      className={`flex items-center gap-3 px-2.5 py-[11px] rounded-xl text-[13.5px] font-semibold text-safai-text cursor-pointer transition-all duration-150 active:scale-[0.98] ${activeClasses}`}
      onClick={onClick}
    >
      <span className="flex items-center gap-3 min-w-0">
        <Icon name={icon} className="w-[18px] h-[18px] text-safai-text-dim shrink-0" />
        {label}
      </span>
      {badge && (
        <span className="text-[10px] font-extrabold text-safai-text-dim bg-safai-surface-soft px-2 py-[2px] rounded-[20px] shrink-0 font-display ml-auto">
          {badge}
        </span>
      )}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

const DrawerSublink = ({ label, active, href, onClick }) => {
  const activeClasses = active ? "bg-safai-primary-soft !text-safai-primary-deep font-bold" : "active:bg-safai-surface-soft";
  
  const content = (
    <div 
      className={`flex items-center gap-[9px] px-2.5 py-[9px] rounded-[10px] text-[12.5px] font-semibold text-safai-text-dim cursor-pointer transition-colors ${activeClasses}`}
      onClick={onClick}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-safai-text-faint shrink-0"></span>
      {label}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

const CollapsibleMenu = ({ icon, label, badge, isOpen, onToggle, children }) => (
  <>
    <div 
      className="flex items-center gap-3 px-2.5 py-[11px] rounded-xl text-[13.5px] font-semibold text-safai-text cursor-pointer transition-all duration-150 active:scale-[0.98] hover:bg-safai-surface-soft"
      onClick={onToggle}
    >
      <span className="flex items-center gap-3 min-w-0">
        <Icon name={icon} className="w-[18px] h-[18px] text-safai-text-dim shrink-0" />
        {label}
      </span>
      {badge && (
        <span className="text-[10px] font-extrabold text-safai-text-dim bg-safai-surface-soft px-2 py-[2px] rounded-[20px] shrink-0 font-display">
          {badge}
        </span>
      )}
      <Icon 
        name="chevDown" 
        className={`ml-auto w-[14px] h-[14px] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-safai-primary-deep" : "text-safai-text-faint"}`} 
      />
    </div>
    <div className={`overflow-hidden transition-[max-height] duration-250 pl-[34px] ${isOpen ? "max-h-[200px]" : "max-h-0"}`}>
      {children}
    </div>
  </>
);

// --- Main Sidebar Component ---
export default function Sidebar({ isOpen, onClose }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  // Replace this with your actual route matching logic
  const activePath = "/client-dashboard"; 

  return (
    <>
      {/* Scrim Overlay */}
      <div 
        className={`absolute inset-0 bg-[rgba(10,25,20,.4)] backdrop-blur-[2px] transition-opacity duration-250 z-[60] ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        className={`absolute top-0 bottom-0 left-0 w-[82%] max-w-[320px] bg-gradient-to-br from-white to-safai-surface-tint z-[61] p-[22px] pt-[22px] flex flex-col overflow-hidden transition-transform duration-300 ease-[cubic-bezier(.2,.9,.3,1)] shadow-[12px_0_40px_rgba(10,25,20,.18)] ${isOpen ? "translate-x-0" : "-translate-x-[104%]"}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
      >
        <button 
          className="absolute top-[18px] right-4 w-[30px] h-[30px] rounded-[10px] bg-safai-surface-soft border-none flex items-center justify-center text-safai-text-dim cursor-pointer"
          onClick={onClose}
        >
          <Icon name="close" className="w-[15px] h-[15px]" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-3 pb-[18px] mb-4 border-b border-safai-border cursor-pointer rounded-[14px] -mx-1.5 px-1.5 pt-2.5 active:bg-safai-surface-soft transition-colors">
          <div className="w-[46px] h-[46px] rounded-[15px] bg-gradient-to-br from-safai-primary to-safai-primary-2 text-white flex items-center justify-center font-extrabold font-display">
            OP
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14.5px] font-bold font-display">Omkar Porlikar</div>
            <div className="text-[10px] font-extrabold text-safai-primary-deep tracking-[.04em] mt-0.5">SUPER ADMIN</div>
          </div>
          <Icon name="chevRight" className="w-[14px] h-[14px] text-safai-text-faint shrink-0" />
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto -mx-[18px] px-[18px] hide-scrollbar">
          
          <MenuSectionTitle title="Overview" />
          <DrawerLink icon="grid" label="Main Dashboard" href="/" />
          <DrawerLink icon="layout" label="Client Dashboard" href="/" active={activePath === "/client-dashboard"} />

          <MenuSectionTitle title="Manage" />
          <CollapsibleMenu icon="map" label="Location Hierarchy" isOpen={openMenus["location"]} onToggle={() => toggleMenu("location")}>
            <DrawerSublink label="View Hierarchy" href="/locationHierarchy" />
            <DrawerSublink label="Add Hierarchy" href="/add-zone-type_final" />
          </CollapsibleMenu>

          <CollapsibleMenu icon="list" label="Washrooms" badge="53" isOpen={openMenus["washrooms"]} onToggle={() => toggleMenu("washrooms")}>
            <DrawerSublink label="Washroom List" href="/washroom_list" />
            <DrawerSublink label="Add Washroom" href="/add_washroom" />
          </CollapsibleMenu>

          <CollapsibleMenu icon="users" label="User Management" badge="30" isOpen={openMenus["users"]} onToggle={() => toggleMenu("users")}>
            <DrawerSublink label="User List" href="/user_manage-final" />
            <DrawerSublink label="Add User" href="/add_user_final" />
          </CollapsibleMenu>

          <CollapsibleMenu icon="share" label="User Mapping" isOpen={openMenus["mapping"]} onToggle={() => toggleMenu("mapping")}>
            <DrawerSublink label="Mapped List" href="/cleaner-assignmentV2" />
            <DrawerSublink label="Add Mapping" href="/add_mapping" />
          </CollapsibleMenu>

          <CollapsibleMenu icon="facility" label="Facility Companies" isOpen={openMenus["facility"]} onToggle={() => toggleMenu("facility")}>
            <DrawerSublink label="View List" href="/facility_list" />
            <DrawerSublink label="Add Facility" href="/add_facility" />
          </CollapsibleMenu>

          <MenuSectionTitle title="Operations" />
          <DrawerLink icon="pin" label="Locate On Map" href="/map" />
          <DrawerLink icon="activity" label="Cleaner Activity" href="/activity" />
          <DrawerLink icon="attendance" label="Attendance" href="/attendance" />

          <MenuSectionTitle title="System" />
          <DrawerLink icon="settings" label="Dynamic Configuration" href="/settings" />
          <DrawerLink icon="chat" label="User Review" href="/reviews" />
          <DrawerLink icon="report" label="Reports" href="/reports" />

          <div 
            className="flex items-center gap-3 px-2.5 py-3 rounded-xl text-[13.5px] font-bold text-safai-red mt-[18px] border-t border-safai-border pt-5 cursor-pointer active:bg-safai-red-soft transition-colors"
            onClick={() => console.log('Handle Logout')}
          >
            <Icon name="logout" className="w-[18px] h-[18px]" />
            Logout
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-3.5 pb-8 text-[10px] font-bold text-safai-text-faint tracking-[.03em]">
            Safai · v2.4.1
          </div>
        </div>
      </aside>
    </>
  );
}