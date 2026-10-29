"use client";

import { TrendingUp, TrendingDown, Tag, DollarSign, Lightbulb } from "lucide-react";
import { kpiData as mockKpiData, formatCurrency } from "@/lib/data";

interface KpiData {
  netProfitYTD: number;
  netProfitChange: number;
  totalDeductions: number;
  deductionsChange: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  opportunitiesFound: number;
  estimatedSavings: number;
}

interface KPICardsProps {
  kpi?: KpiData;
}

export default function KPICards({ kpi = mockKpiData }: KPICardsProps) {
  return (
    <div className="grid grid-cols-4 gap-5">
      {/* Net Profit YTD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00AEEF] to-[#0088CC] rounded-t-2xl" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Profit YTD</p>
            <p className="text-3xl font-bold text-[#0D1B2A] mt-1.5">{formatCurrency(kpi.netProfitYTD)}</p>
            <div className="flex items-center gap-1.5 mt-2">
              {kpi.netProfitChange >= 0 ? (
                <TrendingUp size={14} className="text-emerald-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              {kpi.netProfitChange !== 0 && (
                <>
                  <span className={`text-xs font-semibold ${kpi.netProfitChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {kpi.netProfitChange >= 0 ? "+" : ""}{kpi.netProfitChange}%
                  </span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </>
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={20} className="text-[#00AEEF]" />
          </div>
        </div>
        {/* Mini sparkline placeholder */}
        <div className="mt-4 flex items-end gap-0.5 h-8">
          {[40, 55, 45, 60, 52, 68, 62, 75, 70, 80, 74, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-blue-100"
              style={{ height: `${h}%`, backgroundColor: i === 11 ? "#00AEEF" : "#DBEAFE" }}
            />
          ))}
        </div>
      </div>

      {/* Total Deductions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00AEEF] to-[#00D4FF] rounded-t-2xl" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Deductions</p>
            <p className="text-3xl font-bold text-[#0D1B2A] mt-1.5">{formatCurrency(kpi.totalDeductions)}</p>
            <div className="flex items-center gap-1.5 mt-2">
              {kpi.deductionsChange !== 0 && (
                <>
                  <TrendingUp size={14} className="text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-500">+{kpi.deductionsChange}%</span>
                  <span className="text-xs text-gray-400">identified YTD</span>
                </>
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
            <Tag size={20} className="text-[#00AEEF]" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#00AEEF] rounded-full" style={{ width: "68%" }} />
          </div>
          <span className="text-xs text-gray-400 font-medium">68% of limit</span>
        </div>
      </div>

      {/* Est. Tax Owed */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F7941D] to-[#FFBA55] rounded-t-2xl" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Est. Tax Owed</p>
            <p className="text-3xl font-bold text-[#0D1B2A] mt-1.5">{formatCurrency(kpi.totalTax)}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs font-medium text-[#F7941D]">Fed: {formatCurrency(kpi.federalTax)}</span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs font-medium text-purple-500">MO: {formatCurrency(kpi.stateTax)}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <DollarSign size={20} className="text-[#F7941D]" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#F7941D] rounded-full" style={{ width: "75%" }} />
          </div>
          <span className="text-xs text-gray-400 font-medium">75% paid</span>
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-t-2xl" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Opportunities Found</p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <p className="text-3xl font-bold text-[#0D1B2A]">{kpi.opportunitiesFound}</p>
              <span className="text-sm text-gray-400 font-medium">found</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {kpi.estimatedSavings > 0 && (
                <>
                  <span className="text-xs font-semibold text-purple-600">{formatCurrency(kpi.estimatedSavings)}</span>
                  <span className="text-xs text-gray-400">est. savings</span>
                </>
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Lightbulb size={20} className="text-purple-500" />
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">
          <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">3 HIGH</span>
          <span className="text-xs bg-yellow-100 text-yellow-600 font-semibold px-2 py-0.5 rounded-full">3 MED</span>
          <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">2 LOW</span>
        </div>
      </div>
    </div>
  );
}
