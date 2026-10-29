"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  Tag,
  Calendar,
  Upload,
  Lightbulb,
  FileText,
  Settings,
} from "lucide-react";
import Back2KCLogo from "./Back2KCLogo";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/income", label: "Income", icon: TrendingUp },
  { href: "/expenses", label: "Expenses", icon: Receipt },
  { href: "/deductions", label: "Deductions", icon: Tag },
  { href: "/quarterly", label: "Quarterly Taxes", icon: Calendar },
  { href: "/upload", label: "Upload Documents", icon: Upload },
  { href: "/opportunities", label: "Opportunities", icon: Lightbulb },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-white border-r border-gray-100 shadow-sm flex flex-col z-50">
      {/* Logo area */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Back2KCLogo size="md" />
        <p className="text-xs text-gray-400 mt-1 ml-0.5">Tax Advisor Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>
        <ul className="space-y-1">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? "bg-[#00AEEF] text-white shadow-sm"
                      : "text-gray-500 hover:bg-blue-50 hover:text-[#00AEEF]"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`flex-shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-[#00AEEF]"
                    }`}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3 mt-6">
          Tools
        </p>
        <ul className="space-y-1">
          {navItems.slice(5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? "bg-[#00AEEF] text-white shadow-sm"
                      : "text-gray-500 hover:bg-blue-50 hover:text-[#00AEEF]"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`flex-shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-[#00AEEF]"
                    }`}
                  />
                  {item.label}
                  {item.label === "Opportunities" && (
                    <span className="ml-auto bg-[#F7941D] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      8
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom profile area */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00AEEF] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            JP
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate">Jessica Powell</p>
            <p className="text-xs text-gray-400 truncate">Back2KC LLC</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
