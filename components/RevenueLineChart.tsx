"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueLineData, monthlyChartData, formatCurrency } from "@/lib/data";

const combinedData = revenueLineData.map((d, i) => ({
  ...d,
  profit: monthlyChartData[i].profit,
}));

const totalRevenue = revenueLineData.reduce((s, d) => s + d.value, 0);

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
          <div key={p.name} className="flex items-center gap-2 mt-1">
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

export default function RevenueLineChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Revenue YTD</p>
          <p className="text-2xl font-bold text-[#0D1B2A] mt-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Jan – Dec 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#00AEEF]" />
            <span className="text-xs text-gray-500">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#F7941D]" />
            <span className="text-xs text-gray-500">Net Profit</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={combinedData}
          margin={{ top: 5, right: 0, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00AEEF" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#00AEEF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F7941D" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#F7941D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00AEEF"
            strokeWidth={2.5}
            fill="url(#colorRevenue)"
            dot={false}
            activeDot={{ r: 4, fill: "#00AEEF" }}
            name="revenue"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#F7941D"
            strokeWidth={2.5}
            fill="url(#colorProfit)"
            dot={false}
            activeDot={{ r: 4, fill: "#F7941D" }}
            name="profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
