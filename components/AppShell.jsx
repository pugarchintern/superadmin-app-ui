"use client";

import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // The absolute device shell container you set up earlier
   <div
  className="
    relative
    w-full
    max-w-[390px]
    h-[90vh]
    max-h-[844px]
    bg-[#101915]
    rounded-[58px]
    p-[14px]
    shadow-[0_40px_80px_-20px_rgba(10,30,25,.45),_0_10px_30px_-10px_rgba(10,30,25,.35),_inset_0_0_0_2px_rgba(255,255,255,.04)]
    my-5
    mx-auto

    before:content-['']
    before:absolute
    before:-right-[3px]
    before:top-[19%]
    before:w-[3px]
    before:h-[7%]
    before:bg-[#0b120e]
    before:rounded-[3px_0_0_3px]

    after:content-['']
    after:absolute
    after:-left-[3px]
    after:top-[15%]
    after:w-[3px]
    after:h-[11%]
    after:bg-[#0b120e]
    after:rounded-[0_3px_3px_0]
    after:shadow-[0_13%_0_0_#0b120e,_0_26%_0_0_#0b120e]

    max-sm:w-full
    max-sm:max-w-none
    max-sm:h-[100dvh]
    max-sm:rounded-none
    max-sm:p-0
    max-sm:m-0
    max-sm:before:hidden
    max-sm:after:hidden
  "
>
      
      {/* iPhone Notch */}
      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[112px] h-[28px] bg-[#101915] rounded-[20px] z-40 max-sm:hidden"></div>
      
      {/* Inner Screen */}
      <div className="relative w-full h-full bg-safai-bg rounded-[38px] overflow-hidden max-sm:rounded-none flex flex-col">
        
        {/* Scrollable Area */}
        <div 
          className="w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar" 
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="w-full flex flex-col min-h-full">
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
            
            {/* Page Content injected here */}
            {children}
          </div>
        </div>
        
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Home Indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[118px] h-[5px] rounded-[6px] bg-[rgba(16,25,21,.55)] z-40 max-sm:hidden"></div>
      </div>
    </div>
  );
}