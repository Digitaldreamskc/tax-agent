"use client";

import { Calendar, AlertCircle } from "lucide-react";
import Back2KCLogo from "./Back2KCLogo";

const deadlines = [
  {
    label: "Q4 Federal Estimate",
    date: "Jan 15, 2026",
    amount: "$4,500",
    urgency: "high",
    daysLeft: 78,
  },
  {
    label: "MO State Return",
    date: "Apr 15, 2026",
    amount: "TBD",
    urgency: "medium",
    daysLeft: 168,
  },
  {
    label: "Federal Return",
    date: "Apr 15, 2026",
    amount: "TBD",
    urgency: "medium",
    daysLeft: 168,
  },
];

export default function WelcomePanel() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Welcome card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Welcome back</p>
        <h2 className="text-xl font-bold text-[#0D1B2A] mt-1">Jessica 👋</h2>
        <p className="text-sm text-gray-500 mt-1">
          Your tax dashboard is up to date through Oct 2025.
        </p>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">Next action needed</p>
          <p className="text-sm font-semibold text-[#F7941D] mt-0.5 flex items-center gap-1.5">
            <AlertCircle size={13} />
            Pay Q4 estimate by Jan 15
          </p>
        </div>
      </div>

      {/* Business card */}
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D1B2A 0%, #1A3A55 60%, #00AEEF22 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#00AEEF] opacity-10" />
        <div className="absolute -bottom-6 -right-2 w-28 h-28 rounded-full bg-[#F7941D] opacity-10" />

        <div className="relative z-10">
          <Back2KCLogo size="sm" />
          <p className="text-sm font-bold text-white mt-3">Jessica Powell</p>
          <p className="text-xs text-blue-300 mt-0.5">Tax Strategy Client</p>
          <div className="mt-4 pt-3 border-t border-white/10">
            <p className="text-xs text-gray-400">Tax Year</p>
            <p className="text-sm font-semibold text-white">2025 — Missouri</p>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-400">Business Type</p>
            <p className="text-sm font-semibold text-white">Sole Proprietor</p>
          </div>
        </div>
      </div>

      {/* Upcoming deadlines */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Tax Deadlines</h3>
        </div>
        <div className="space-y-3">
          {deadlines.map((d, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  d.urgency === "high" ? "bg-[#F7941D]" : "bg-[#00AEEF]"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#0D1B2A] leading-tight">{d.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{d.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-bold text-[#0D1B2A]">{d.amount}</p>
                <p className="text-xs text-gray-400">{d.daysLeft}d</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
