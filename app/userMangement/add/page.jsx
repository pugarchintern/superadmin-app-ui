"use client";

import React, { useState } from 'react';
import { 
  UserPlus, Target, User, Mail, Phone, Lock, 
  ShieldAlert, ChevronDown, ArrowLeft
} from 'lucide-react';

export default function AddUser() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: 'srujal@mail.rr',
    phone: '123XXXXX12',
    password: '••••••',
    accessLevel: 'Cleaner'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex-1 p-4 space-y-4 pb-6">
      
      {/* Back Action Button */}
      <button className="w-full flex items-center justify-center gap-2 border border-safai-coral/30 text-safai-coral py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase bg-safai-surface shadow-safai-sm hover:bg-safai-coral-soft transition tap-fx" >
        <ArrowLeft className="w-4 h-4" />
        Back to User List
      </button>

      {/* Form Segment Container */}
      <div className="bg-safai-surface p-4 rounded-2xl shadow-safai-sm border border-safai-border space-y-4">
        
        {/* Form Headline Block */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-safai-primary-soft text-safai-primary rounded-lg flex items-center justify-center shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-safai-text">User Registration</h2>
            <p className="text-[10px] text-safai-text-faint">Define system permission credentials</p>
          </div>
        </div>

        {/* Config Alert Box: Assigned Operation Node */}
        <div className="bg-safai-surface-soft border border-safai-border rounded-xl p-3 flex gap-2.5">
          <Target className="w-4 h-4 text-safai-violet shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[10px] font-extrabold text-safai-text tracking-wide uppercase">
              Assigned Operation Node
            </h4>
            <p className="text-[10px] text-safai-text-dim leading-normal mt-0.5">
              Select the operation node for this user profile.
            </p>
          </div>
        </div>

        {/* Section 1: User Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-safai-amber tracking-wider uppercase border-b border-safai-border pb-1">
            <User className="w-3.5 h-3.5" />
            User Information
          </div>

          {/* Input Full Name */}
          <div className="space-y-1">
            <label className="text-[9px] font-extrabold text-safai-primary tracking-wider uppercase">
              Full Name <span className="text-safai-red">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
              <input 
                type="text" 
                name="fullName"
                placeholder="Legal Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text placeholder:text-safai-text-faint focus:outline-none focus:border-safai-primary transition"
              />
            </div>
          </div>

          {/* Email & Phone Twin Flex Row Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-safai-primary tracking-wider uppercase">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary transition font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-safai-primary tracking-wider uppercase">
                Phone <span className="text-safai-red">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary transition font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Access & Security */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-safai-amber tracking-wider uppercase border-b border-safai-border pb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            Access & Security
          </div>

          {/* Password & Access Level Twin Flex Row Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-safai-primary tracking-wider uppercase">
                Password <span className="text-safai-red">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-faint" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text focus:outline-none focus:border-safai-primary transition font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-safai-primary tracking-wider uppercase">
                Access Level <span className="text-safai-red">*</span>
              </label>
              <div className="relative">
                <select 
                  name="accessLevel"
                  value={formData.accessLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-safai-surface-soft border border-safai-border rounded-xl text-xs text-safai-text font-medium appearance-none focus:outline-none focus:border-safai-primary transition"
                >
                  <option value="Cleaner">Cleaner</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Facility Admin"> Admin</option>
                  <option value="Facility Admin">Facility Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safai-text-dim pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions Footer Grid Component */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <button className="flex items-center justify-center bg-safai-coral text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm shadow-safai-coral/10 hover:opacity-90 transition uppercase tracking-wider tap-fx">
            Cancel
          </button>
          <button className="flex items-center justify-center bg-safai-amber text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm shadow-safai-amber/10 hover:opacity-90 transition uppercase tracking-wider tap-fx">
            Create User
          </button>
        </div>

      </div>
    </main>
  );
}