"use client";

import React, { useState } from "react";

export default function LocationHierarchy() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Stores which nodes are expanded. Initialized to match the exact state in the image.
  const [expandedNodes, setExpandedNodes] = useState({
    "nmc": true,
    "zn-dharampeth": true,
    "wd-12": true,
    "ar-sadat": true
  });

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // Exact data structure matching the image provided
  const locationData = [
    {
      id: "nmc",
      name: "Nagpur Municipal Corporation",
      type: "NMC",
      children: [
        {
          id: "zn-dharampeth",
          name: "Dharampeth Zone",
          type: "ZN",
          children: [
            {
              id: "wd-12",
              name: "Ward 12",
              type: "WD",
              children: [
                {
                  id: "ar-sadat",
                  name: "Sadat Chowk",
                  type: "AR",
                  children: [
                    { id: "pt-1", name: "Point 1", type: "PT" },
                    { id: "pt-2", name: "Point 2", type: "PT" },
                  ]
                },
                {
                  id: "ar-model",
                  name: "Model Town",
                  type: "AR",
                  // Added a dummy child so it shows the chevron like in the image
                  children: [{ id: "dummy-1", name: "Dummy Point", type: "PT" }] 
                }
              ]
            },
            {
              id: "wd-13",
              name: "Ward 13",
              type: "WD",
              children: [{ id: "dummy-2", name: "Dummy Area", type: "AR" }]
            }
          ]
        },
        {
          id: "zn-laxmi",
          name: "Laxmi Nagar Zone",
          type: "ZN",
          children: [{ id: "dummy-3", name: "Dummy Ward", type: "WD" }]
        }
      ]
    }
  ];

  // Specific background and text colors for each hierarchy level tag
  const badgeColors = {
    NMC: "bg-blue-100 text-blue-700",
    ZN: "bg-sky-100 text-sky-700",
    WD: "bg-orange-100 text-orange-700",
    AR: "bg-emerald-100 text-emerald-700",
    PT: "bg-gray-100 text-gray-600"
  };

  // Recursive component to render the tree
  const RenderNode = ({ node, depth = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    
    // Simple recursive search check to keep parents visible if children match
    const hasMatchingDescendant = (n) => {
      if (n.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
      if (n.children) return n.children.some(hasMatchingDescendant);
      return false;
    };
    
    const showNode = searchQuery === "" || hasMatchingDescendant(node);
    if (!showNode) return null;
    
    // Auto-expand if searching, otherwise use state
    const isExpanded = (searchQuery !== "" && hasChildren) || expandedNodes[node.id];

    return (
      <div className="flex flex-col">
        <div 
          onClick={() => hasChildren && toggleNode(node.id)}
          className="flex items-center py-3 pr-4 cursor-pointer active:bg-gray-50 select-none transition-colors"
          style={{ paddingLeft: `${16 + depth * 24}px` }}
        >
          {/* Chevron or Leaf Indicator */}
          <div className="w-5 flex-shrink-0 flex items-center justify-center text-gray-400 mr-2">
            {hasChildren ? (
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90 text-gray-600" : ""}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            )}
          </div>
          
          {/* Tag / Badge */}
          <div className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${badgeColors[node.type] || "bg-gray-100 text-gray-600"}`}>
            {node.type}
          </div>
          
          {/* Location Name */}
          <span className="ml-3 text-[15px] font-medium text-gray-900 truncate">
            {node.name}
          </span>
        </div>
        
        {/* Render Children if expanded */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col">
            {node.children.map(child => (
              <RenderNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen flex justify-center font-sans antialiased text-gray-900">
      {/* Mobile Container wrapper (simulates the phone screen look) */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-sm relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-10">
          <button className="p-2 -ml-2 text-gray-700 hover:bg-gray-50 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">
            Location Hierarchy
          </h1>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </header>
        
        {/* Search Bar */}
        <div className="p-4 bg-white z-10">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 mx-2 outline-none text-[15px] placeholder-gray-400 text-gray-800" 
            />
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Tree Container */}
        <div className="flex-1 overflow-y-auto pb-8">
          {locationData.map((rootNode) => (
            <RenderNode key={rootNode.id} node={rootNode} depth={0} />
          ))}
          
          {searchQuery !== "" && locationData.every(n => !n.name.toLowerCase().includes(searchQuery.toLowerCase()) && !n.children?.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))) && (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              No locations found matching "{searchQuery}"
            </div>
          )}
        </div>

      </div>
    </div>
  );
}