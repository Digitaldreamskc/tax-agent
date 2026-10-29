"use client";

import { useState } from "react";
import { Lightbulb, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/data";

type Priority = "ALL" | "HIGH" | "MEDIUM" | "LOW";

const priorityConfig = {
  HIGH: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500", label: "HIGH" },
  MEDIUM: { bg: "bg-yellow-100", text: "text-yellow-600", dot: "bg-yellow-500", label: "MED" },
  LOW: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400", label: "LOW" },
};

interface Opportunity {
  id: number;
  priority: string;
  title: string;
  estimatedSavings: number;
  description: string;
  whyItMatters: string;
  action: string;
  category: string;
}

interface Props {
  opportunities: Opportunity[];
  totalSavings: number;
}

export default function OpportunitiesClient({ opportunities, totalSavings }: Props) {
  const [filter, setFilter] = useState<Priority>("ALL");

  const filtered = filter === "ALL" ? opportunities : opportunities.filter((o) => o.priority === filter);
  const filteredSavings = filtered.reduce((s, o) => s + o.estimatedSavings, 0);

  return (
    <>
      {/* Summary bar */}
      <div className="bg-gradient-to-r from-[#0D1B2A] to-[#1A3A55] rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00AEEF]/20 flex items-center justify-center">
            <Lightbulb size={22} className="text-[#00AEEF]" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">
              {filtered.length} {filter !== "ALL" ? filter : ""} opportunities found
            </p>
            <p className="text-gray-400 text-sm">
              Estimated savings:{" "}
              <span className="text-[#F7941D] font-bold">
                {filteredSavings > 0 ? formatCurrency(filteredSavings) + "/year" : "—"}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {(["ALL", "HIGH", "MEDIUM", "LOW"] as Priority[]).map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === p
                  ? "bg-[#00AEEF] text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity cards grid */}
      <div className="grid grid-cols-2 gap-5">
        {filtered.map((opp) => {
          const config = priorityConfig[opp.priority as keyof typeof priorityConfig] ?? priorityConfig.MEDIUM;
          return (
            <div
              key={opp.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                  {config.label} PRIORITY
                </span>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                  {opp.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0D1B2A] mb-1">{opp.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{opp.description}</p>

              {opp.estimatedSavings > 0 && (
                <div className="bg-[#F4F7FE] rounded-xl p-3 mb-3">
                  <p className="text-xs font-semibold text-gray-400 mb-0.5">Estimated Annual Savings</p>
                  <p className="text-2xl font-bold text-[#0D1B2A]">{formatCurrency(opp.estimatedSavings)}</p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-1">Why it matters</p>
                <p className="text-xs text-gray-500 leading-relaxed">{opp.whyItMatters}</p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#00AEEF] hover:bg-[#0096CC] text-white text-sm font-semibold rounded-xl transition-colors">
                {opp.action}
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
