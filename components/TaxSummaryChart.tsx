"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyChartData, formatCurrency } from "@/lib/data";

// Group data by quarter
const quarterlyData = [
  {
    period: "Q1",
    revenue: monthlyChartData.slice(0, 3).reduce((s, d) => s + d.revenue, 0),
    expenses: monthlyChartData.slice(0, 3).reduce((s, d) => s + d.expenses, 0),
  },
  {
    period: "Q2",
    revenue: monthlyChartData.slice(3, 6).reduce((s, d) => s + d.revenue, 0),
    expenses: monthlyChartData.slice(3, 6).reduce((s, d) => s + d.expenses, 0),
  },
  {
    period: "Q3",
    revenue: monthlyChartData.slice(6, 9).reduce((s, d) => s + d.revenue, 0),
    expenses: monthlyChartData.slice(6, 9).reduce((s, d) => s + d.expenses, 0),
  },
  {
    period: "Q4",
    revenue: monthlyChartData.slice(9, 12).reduce((s, d) => s + d.revenue, 0),
    expenses: monthlyChartData.slice(9, 12).reduce((s, d) => s + d.expenses, 0),
  },
];

const totalRevenue = monthlyChartData.reduce((s, d) => s + d.revenue, 0);
const totalExpenses = monthlyChartData.reduce((s, d) => s + d.expenses, 0);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 text-xs">
        <p className="font-bold text-[#0D1B2A] mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-500 capitalize">{p.name}:</span>
            <span className="font-semibold text-[#0D1B2A]">{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function TaxSummaryChart() {
  const [view, setView] = useState<"month" | "quarter">("month");
  const data = view === "month" ? monthlyChartData.map(d => ({ period: d.month, ...d })) : quarterlyData;

  return (
    <div
      className="rounded-2xl p-6 h-full"
      style={{ background: "#0D1B2A" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Tax Summary YTD</h3>
          <div className="flex items-baseline gap-3 mt-1">
            <p className="text-3xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
            <span className="text-sm text-gray-400">total revenue</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#00AEEF]" />
              <span className="text-xs text-gray-400">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#F7941D]" />
              <span className="text-xs text-gray-400">Expenses</span>
            </div>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-xs text-emerald-400 font-medium">
              Net: {formatCurrency(totalRevenue - totalExpenses)}
            </span>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex bg-white/10 rounded-xl p-1">
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              view === "month"
                ? "bg-[#00AEEF] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("quarter")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              view === "quarter"
                ? "bg-[#00AEEF] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Quarter
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
          barSize={view === "month" ? 14 : 40}
          barGap={3}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="period"
            tick={{ fill: "#9CA3AF", fontSize: 11, fontFamily: "Inter, sans-serif" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 11, fontFamily: "Inter, sans-serif" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="revenue" fill="#00AEEF" radius={[4, 4, 0, 0]} name="revenue" />
          <Bar dataKey="expenses" fill="#F7941D" radius={[4, 4, 0, 0]} name="expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
