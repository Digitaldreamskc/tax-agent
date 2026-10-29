import { TrendingUp } from "lucide-react";
import { monthlyChartData, formatCurrency } from "@/lib/data";

const total = monthlyChartData.reduce((s, d) => s + d.revenue, 0);

export default function IncomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Income</h1>
        <p className="text-sm text-gray-500 mt-0.5">Revenue tracking for Tax Year 2025</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <TrendingUp size={20} className="text-[#00AEEF]" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Revenue YTD</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{formatCurrency(total)}</p>
          </div>
        </div>
        <div className="space-y-2">
          {monthlyChartData.map((d) => (
            <div key={d.month} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400 w-8">{d.month}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00AEEF] rounded-full"
                  style={{ width: `${(d.revenue / 12000) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[#0D1B2A] w-16 text-right">{formatCurrency(d.revenue)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
