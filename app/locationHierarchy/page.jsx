"use client";

import React, { useState, useEffect } from "react";

export default function LocationHierarchy() {
  // Navigation & UI States
  const [searchQuery, setSearchQuery] = useState("");
  
  // Collapsible Tree States (stores open node IDs)
  const [expandedNodes, setExpandedNodes] = useState({
    "zone-1": true,
    "ward-12": true,
  });

  // Toast System States
  const [toast, setToast] = useState({
    message: "",
    visible: false,
  });

  // Toast Helper
  const triggerToast = (msg) => {
    setToast({ message: msg, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Toggle tree node expansion
  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // Mock Hierarchical Data Matching the App UI Structure
  const locationData = [
    {
      id: "zone-1",
      name: "North Zone",
      type: "Zone",
      code: "ZN-01",
      details: "4 Wards · 28 Vehicles",
      children: [
        {
          id: "ward-12",
          name: "Ward 12 - Civil Lines",
          type: "Ward",
          code: "WD-12",
          details: "12 Areas · 840 Bins",
          children: [
            {
              id: "area-12a",
              name: "Sadat Chowk Segment",
              type: "Area",
              code: "AR-12A",
              details: "High Density Commercial",
              children: [
                { id: "pt-1", name: "Commercial Collection Pt 1", type: "Point", code: "CP-01" },
                { id: "pt-2", name: "Residential Complex Bin 4", type: "Point", code: "RP-04" },
              ]
            },
            {
              id: "area-12b",
              name: "Model Town Residential",
              type: "Area",
              code: "AR-12B",
              details: "Standard Residential Sector"
            }
          ]
        },
        {
          id: "ward-13",
          name: "Ward 13 - Rajouri Park",
          type: "Ward",
          code: "WD-13",
          details: "9 Areas · 610 Bins"
        }
      ]
    },
    {
      id: "zone-2",
      name: "South Zone",
      type: "Zone",
      code: "ZN-02",
      details: "6 Wards · 42 Vehicles",
      children: [
        {
          id: "ward-20",
          name: "Ward 20 - Industrial Belt",
          type: "Ward",
          code: "WD-20",
          details: "5 Areas · Heavy Waste Production"
        }
      ]
    }
  ];

  // Component for rendering nested location hierarchy tree items recursively
  const RenderTreeItem = ({ node, depth = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.id];

    // Simple string search filtering logic on node elements
    const matchesSearch = 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.code.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      <div className={`flex flex-col ${matchesSearch ? "block" : "hidden"}`}>
        <div 
          onClick={() => hasChildren && toggleNode(node.id)}
          style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
          className="flex items-center justify-between py-3 pr-4 border-b border-safai-border hover:bg-safai-surface-soft transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            {hasChildren ? (
              <svg 
                className={`w-4 h-4 text-safai-text-dim transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-safai-text-faint" />
              </div>
            )}
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-safai-text text-sm sm:text-base tracking-tight">{node.name}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-safai-primary-soft text-safai-primary-deep border border-safai-primary-2/20">
                  {node.type}
                </span>
                <span className="text-xs text-safai-text-faint font-mono font-medium">{node.code}</span>
              </div>
              {node.details && <span className="text-xs text-safai-text-dim mt-0.5 font-normal">{node.details}</span>}
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                triggerToast(`Managing sub-entities for ${node.name}`);
              }} 
              className="p-1.5 hover:bg-safai-surface-tint rounded-lg text-safai-primary transition-colors duration-150 tap-fx"
              title="Add Node / Sub-location"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                triggerToast(`Editing configuration of ${node.name}`);
              }} 
              className="p-1.5 hover:bg-safai-surface-tint rounded-lg text-safai-text-dim hover:text-safai-text transition-colors duration-150 tap-fx"
              title="Configure Details"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="flex flex-col transition-all duration-300">
            {node.children?.map((child) => (
              <RenderTreeItem key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 text-safai-text font-body relative overflow-x-hidden antialiased">
      
      {/* ── BACKGROUND FLOATING GRAPHICS BLURS ── */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-safai-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulseFloat" />
      <div className="fixed top-20 -right-20 w-80 h-80 bg-safai-lime/10 rounded-full blur-[90px] pointer-events-none animate-pulseFloatReverse" />

      {/* ── MAIN CONTENT CONTAINER AREA ── */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Titles Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-safai-text">
              Location Organizational Hierarchy
            </h1>
            <p className="text-sm text-safai-text-dim mt-1 max-w-2xl font-normal">
              Organize geographical nodes, assign sanitation collection tracking matrices, structure zones, operational routing grids, and active containment parameters.
            </p>
          </div>
          
          <button 
            onClick={() => triggerToast("Initializing new primary root zone template workflow...")}
            className="self-start md:self-auto px-4 py-2.5 bg-safai-primary hover:bg-safai-primary-deep text-white font-semibold text-sm rounded-xl shadow-safai-md hover:shadow-safai-glow transition-all duration-200 flex items-center gap-2 outline-none tap-fx"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Register Top-Level Zone</span>
          </button>
        </div>

        {/* Dynamic Live Aggregated Count Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          {[
            { value: "08", label: "Operational Zones", bg: "bg-safai-primary-soft text-safai-primary-deep" },
            { value: "42", label: "Assigned Wards", bg: "bg-safai-violet-soft text-safai-violet" },
            { value: "194", label: "Tracked Sectors / Areas", bg: "bg-safai-lime-soft text-safai-lime" },
            { value: "2.8k", label: "Active Collection Points", bg: "bg-safai-amber-soft text-safai-amber" }
          ].map((stat, i) => (
            <div key={i} className="bg-safai-surface border border-safai-border rounded-2xl p-4 shadow-safai-sm flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-safai-md">
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-safai-text tracking-tight">{stat.value}</span>
              <span className="text-xs font-semibold text-safai-text-dim mt-1.5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${stat.bg.split(' ')[0]}`} /> {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Hierarchy Engine Interaction Control Panel */}
        <div className="bg-safai-surface border border-safai-border rounded-3xl shadow-safai-md overflow-hidden flex flex-col">
          
          {/* Top filtering controls segment panel */}
          <div className="p-4 sm:p-5 border-b border-safai-border bg-safai-surface-soft/30 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-safai-text-faint">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search zones, ward names, node numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-safai-surface border border-safai-border rounded-xl text-sm font-medium placeholder-safai-text-faint text-safai-text focus:outline-none focus:border-safai-primary focus:ring-2 focus:ring-safai-primary-soft transition-all duration-150"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button 
                onClick={() => {
                  setExpandedNodes({ "zone-1": true, "zone-2": true, "ward-12": true });
                  triggerToast("Expanding all verified hierarchy nodes");
                }}
                className="px-3 py-2 text-xs font-bold text-safai-text-dim hover:text-safai-text bg-safai-surface border border-safai-border rounded-xl shadow-safai-sm hover:bg-safai-surface-soft transition-colors tap-fx"
              >
                Expand All
              </button>
              <button 
                onClick={() => {
                  setExpandedNodes({});
                  triggerToast("Collapsing all viewable nodes");
                }}
                className="px-3 py-2 text-xs font-bold text-safai-text-dim hover:text-safai-text bg-safai-surface border border-safai-border rounded-xl shadow-safai-sm hover:bg-safai-surface-soft transition-colors tap-fx"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Interactive Core Tree Rendering Component Body Container */}
          <div className="flex flex-col divide-y divide-safai-border overflow-x-auto min-w-full">
            
            {/* Table/List Tree Table Head Header descriptors */}
            <div className="bg-safai-surface-soft/40 flex items-center justify-between py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-safai-text-faint select-none">
              <div className="flex items-center gap-2">
                <span>Administrative Entity Node Path Descriptor</span>
              </div>
              <div className="pr-12">Action Settings</div>
            </div>

            {/* Nested Nodes Output Block */}
            <div className="flex flex-col min-h-[300px]">
              {locationData.map((rootZone) => (
                <RenderTreeItem key={rootZone.id} node={rootZone} depth={0} />
              ))}
            </div>

          </div>

          {/* Table Bottom Navigation Footer Info Details panel */}
          <div className="p-4 border-t border-safai-border bg-safai-surface-soft/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-safai-text-dim font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safai-primary relative">
                <span className="absolute inset-0 bg-safai-primary rounded-full animate-ping opacity-75" />
              </span> 
              Live mapping active grid database coordinates
            </span>
            <span className="text-safai-text-faint font-semibold tracking-wide">
              Last updated via sync: Just Now
            </span>
          </div>

        </div>
      </div>

      {/* ── CENTRAL FLUID DISMISSABLE TOAST ALERTS ── */}
      <div 
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-safai-text/95 backdrop-blur-md rounded-2xl shadow-safai-glow text-white text-sm font-semibold tracking-wide transition-all duration-300 transform ${
          toast.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-safai-lime animate-pulse" />
        <span>{toast.message}</span>
      </div>

    </div>
  );
}