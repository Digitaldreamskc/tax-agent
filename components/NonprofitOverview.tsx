"use client";

import { ShieldCheck, ClipboardList, Calendar, AlertCircle, CheckCircle2, HeartHandshake } from "lucide-react";
import Link from "next/link";

const upcomingDeadlines = [
  { task: "Form 990-EZ", due: "May 15, 2026", status: "upcoming", urgency: "normal" },
  { task: "MO AG Renewal (Form AG-2)", due: "Jun 30, 2026", status: "upcoming", urgency: "normal" },
  { task: "SOS Annual Report", due: "Mar 31, 2026", status: "upcoming", urgency: "soon" },
  { task: "Property Tax Exemption", due: "Mar 1, 2026", status: "upcoming", urgency: "soon" },
];

const exemptionStatus = [
  { name: "Federal Income Tax", status: "exempt" },
  { name: "Missouri Income Tax", status: "exempt" },
  { name: "Missouri Sales Tax (Form 1746)", status: "action-needed" },
  { name: "MO AG Registration (Form AG-1)", status: "action-needed" },
  { name: "Property Tax (County)", status: "unknown" },
];

const nonprofitKPIs = [
  { label: "Gross Revenue YTD", value: "$112,600", sub: "Contributions + grants" },
  { label: "Program Expense %", value: "72%", sub: "Above 65% threshold" },
  { label: "Form 990 Type", value: "990-EZ", sub: "Gross receipts < $200K" },
  { label: "Fundraising Days Used", value: "3 of 6", sub: "MO 6-day rule" },
];

export default function NonprofitOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Nonprofit Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tax Year 2025 · 501(c)(3) Filing Mode</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {nonprofitKPIs.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs text-gray-400 font-medium">{kpi.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A] mt-1">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Exemption status + deadlines */}
      <div className="grid grid-cols-12 gap-6">
        {/* Exemption checklist */}
        <div className="col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-[#00AEEF]" />
            <h3 className="text-sm font-bold text-[#0D1B2A]">Exemption Status</h3>
            <Link href="/nonprofit/exemptions" className="ml-auto text-xs text-[#00AEEF] hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {exemptionStatus.map((e) => (
              <div key={e.name} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-[#0D1B2A]">{e.name}</span>
                {e.status === "exempt" && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <CheckCircle2 size={13} /> Exempt
                  </span>
                )}
                {e.status === "action-needed" && (
                  <Link href="/nonprofit/exemptions">
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#F7941D] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full cursor-pointer hover:bg-orange-100">
                      <AlertCircle size={11} /> Apply Now
                    </span>
                  </Link>
                )}
                {e.status === "unknown" && (
                  <span className="text-xs text-gray-400">Check county</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming deadlines */}
        <div className="col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-[#00AEEF]" />
            <h3 className="text-sm font-bold text-[#0D1B2A]">Upcoming Deadlines</h3>
            <Link href="/nonprofit/compliance" className="ml-auto text-xs text-[#00AEEF] hover:underline">
              Full calendar →
            </Link>
          </div>
          <div className="space-y-2">
            {upcomingDeadlines.map((d) => (
              <div
                key={d.task}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  d.urgency === "soon" ? "bg-amber-50 border border-amber-100" : "bg-[#F4F7FE]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {d.urgency === "soon" ? (
                    <AlertCircle size={15} className="text-amber-500" />
                  ) : (
                    <ClipboardList size={15} className="text-[#00AEEF]" />
                  )}
                  <span className="text-sm font-medium text-[#0D1B2A]">{d.task}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  d.urgency === "soon"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-[#00AEEF]/10 text-[#00AEEF]"
                }`}>
                  {d.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: ClipboardList, label: "Form 990 Filing", sub: "Determine your form type", href: "/nonprofit/990", color: "text-[#00AEEF]", bg: "bg-blue-50" },
          { icon: HeartHandshake, label: "Donor Rules", sub: "Acknowledgment requirements", href: "/nonprofit/donors", color: "text-[#F7941D]", bg: "bg-orange-50" },
          { icon: AlertCircle, label: "UBIT Tracker", sub: "Unrelated business income", href: "/nonprofit/ubit", color: "text-purple-500", bg: "bg-purple-50" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-[#00AEEF] transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                  <Icon size={20} className={card.color} />
                </div>
                <p className="text-sm font-bold text-[#0D1B2A]">{card.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
