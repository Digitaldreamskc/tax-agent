"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { taxBreakdown, formatCurrency } from "@/lib/data";

const total = taxBreakdown.reduce((s, d) => s + d.value, 0);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.color }} />
          <span className="font-semibold text-[#0D1B2A]">{item.name}</span>
        </div>
        <p className="mt-1 font-bold text-[#0D1B2A]">{formatCurrency(item.value)}</p>
        <p className="text-gray-400">{((item.value / total) * 100).toFixed(1)}% of total</p>
      </div>
    );
  }
  return null;
}

export default function TaxDonutChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tax Breakdown</p>
        <p className="text-2xl font-bold text-[#0D1B2A] mt-1">{formatCurrency(total)}</p>
        <p className="text-xs text-gray-400 mt-0.5">Total estimated owed</p>
      </div>

      {/* Donut chart with center label */}
      <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: 160 }}>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={taxBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {taxBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-400 font-medium">Total</p>
          <p className="text-lg font-bold text-[#0D1B2A] leading-tight">{formatCurrency(total)}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2.5">
        {taxBreakdown.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-gray-500 leading-tight">{item.name}</span>
            </div>
            <span className="text-xs font-bold text-[#0D1B2A]">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
