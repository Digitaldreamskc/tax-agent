"use client";

import { useState } from "react";
import { FileText, Download, Plus, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { reports } from "@/lib/data";

const statusConfig = {
  FINAL: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle2 },
  DRAFT: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
};

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1B2A]">Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">Generated tax reports and documents</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#00AEEF] hover:bg-[#0096CC] disabled:bg-gray-200 text-white text-sm font-bold rounded-xl transition-colors"
        >
          {generating ? (
            <><Loader2 size={16} className="animate-spin" /> Generating...</>
          ) : (
            <><Plus size={16} /> Generate New Report</>
          )}
        </button>
      </div>

      {generated && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-emerald-700">
            New report generated: Back2KC_TaxSummary_2025_Full.pdf
          </p>
        </div>
      )}

      {/* Report stats */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Reports</p>
          <p className="text-3xl font-bold text-[#0D1B2A] mt-1">{reports.length + (generated ? 1 : 0)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Final</p>
          <p className="text-3xl font-bold text-[#0D1B2A] mt-1">{reports.filter(r => r.status === "FINAL").length + (generated ? 1 : 0)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Drafts</p>
          <p className="text-3xl font-bold text-[#0D1B2A] mt-1">{reports.filter(r => r.status === "DRAFT").length}</p>
        </div>
      </div>

      {/* Reports list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-[#0D1B2A]">All Reports</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[...(generated ? [{
            id: 99,
            filename: "Back2KC_TaxSummary_2025_Full.pdf",
            type: "Tax Summary",
            generatedAt: "Oct 29, 2025",
            status: "FINAL",
            pages: 15,
          }] : []), ...reports].map((report) => {
            const statusCfg = statusConfig[report.status as keyof typeof statusConfig];
            const StatusIcon = statusCfg.icon;
            return (
              <div key={report.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F4F7FE] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0D1B2A] truncate">{report.filename}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{report.type}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-400">{report.generatedAt}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-400">{report.pages} pages</span>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.text}`}>
                  <StatusIcon size={12} />
                  {report.status}
                </span>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F4F7FE] hover:bg-blue-50 text-[#00AEEF] text-xs font-semibold transition-colors">
                  <Download size={13} />
                  Download
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
