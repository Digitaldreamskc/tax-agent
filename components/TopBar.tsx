"use client";

import { Bell, Settings, Search } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left: search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions, documents..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F4F7FE] text-sm text-gray-600 placeholder-gray-400 border border-transparent focus:border-[#00AEEF] focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Right: icons + avatar */}
      <div className="flex items-center gap-3">
        {/* Tax year badge */}
        <span className="text-xs font-semibold bg-blue-50 text-[#00AEEF] px-3 py-1 rounded-full border border-blue-100">
          Tax Year 2025
        </span>

        {/* Notification bell */}
        <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors group">
          <Bell size={18} className="text-gray-500 group-hover:text-[#00AEEF] transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F7941D] rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors group">
          <Settings size={18} className="text-gray-500 group-hover:text-[#00AEEF] transition-colors" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0088CC] flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer">
          JP
        </div>
      </div>
    </header>
  );
}
