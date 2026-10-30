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
  Building2,
  HeartHandshake,
  ClipboardList,
  BadgeDollarSign,
  ShieldCheck,
  PackageOpen,
  LogOut,
} from "lucide-react";
import Back2KCLogo from "./Back2KCLogo";
import { useEntityType } from "@/context/EntityTypeContext";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
};

type NavGroup = {
  section: string;
  items: NavItem[];
};

const businessNav: NavGroup[] = [
  {
    section: "Main Menu",
    items: [
      { href: "/", label: "Overview", icon: LayoutDashboard },
      { href: "/income", label: "Income", icon: TrendingUp },
      { href: "/expenses", label: "Expenses", icon: Receipt },
      { href: "/deductions", label: "Deductions", icon: Tag },
      { href: "/exemptions", label: "Exemptions", icon: ShieldCheck },
      { href: "/quarterly", label: "Quarterly Taxes", icon: Calendar },
    ],
  },
  {
    section: "Tools",
    items: [
      { href: "/upload", label: "Upload Documents", icon: Upload },
      { href: "/tax-packet", label: "Tax Packet", icon: PackageOpen },
      { href: "/opportunities", label: "Opportunities", icon: Lightbulb, badge: "8" },
      { href: "/reports", label: "Reports", icon: FileText },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

const nonprofitNav: NavGroup[] = [
  {
    section: "Main Menu",
    items: [
      { href: "/", label: "Overview", icon: LayoutDashboard },
      { href: "/income", label: "Revenue & Grants", icon: TrendingUp },
      { href: "/expenses", label: "Expenses", icon: Receipt },
      { href: "/nonprofit/990", label: "Form 990 Filing", icon: ClipboardList },
      { href: "/nonprofit/exemptions", label: "Exemptions", icon: ShieldCheck },
    ],
  },
  {
    section: "Compliance",
    items: [
      { href: "/nonprofit/donors", label: "Donor Rules", icon: HeartHandshake },
      { href: "/nonprofit/compliance", label: "Compliance Calendar", icon: Calendar },
      { href: "/nonprofit/ubit", label: "UBIT Tracker", icon: BadgeDollarSign },
    ],
  },
  {
    section: "Tools",
    items: [
      { href: "/upload", label: "Upload Documents", icon: Upload },
      { href: "/tax-packet", label: "Tax Packet", icon: PackageOpen },
      { href: "/opportunities", label: "Opportunities", icon: Lightbulb },
      { href: "/reports", label: "Reports", icon: FileText },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { entityType, setEntityType, isNonprofit } = useEntityType();

  const navGroups = isNonprofit ? nonprofitNav : businessNav;

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-white border-r border-gray-100 shadow-sm flex flex-col z-50">
      {/* Logo area */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Back2KCLogo size="md" />
        <p className="text-xs text-gray-400 mt-1 ml-0.5">Tax Advisor Dashboard</p>
      </div>

      {/* Entity type toggle */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Filing Type
        </p>
        <div className="flex bg-[#F4F7FE] rounded-xl p-0.5 gap-0.5">
          <button
            onClick={() => setEntityType("business")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
              !isNonprofit
                ? "bg-[#00AEEF] text-white shadow-sm"
                : "text-gray-500 hover:text-[#00AEEF]"
            }`}
          >
            <Building2 size={13} />
            Business
          </button>
          <button
            onClick={() => setEntityType("nonprofit")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
              isNonprofit
                ? "bg-[#00AEEF] text-white shadow-sm"
                : "text-gray-500 hover:text-[#00AEEF]"
            }`}
          >
            <HeartHandshake size={13} />
            Nonprofit
          </button>
        </div>
        {isNonprofit && (
          <p className="text-[10px] text-[#00AEEF] mt-1.5 text-center font-medium">
            501(c)(3) · Form 990 mode
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.section} className="mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-3">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
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
                      {"badge" in item && item.badge && (
                        <span className="ml-auto bg-[#F7941D] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom profile + logout */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00AEEF] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            JP
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-semibold text-gray-800 truncate">Jessica Powell</p>
            <p className="text-xs text-gray-400 truncate">
              {isNonprofit ? "Back2KC · Nonprofit" : "Back2KC LLC"}
            </p>
          </div>
          <a
            href="/api/auth/logout"
            title="Sign out"
            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          >
            <LogOut size={16} />
          </a>
        </div>
      </div>
    </aside>
  );
}
