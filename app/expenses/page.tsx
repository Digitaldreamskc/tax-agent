import { Receipt } from "lucide-react";
import { monthlyChartData, formatCurrency } from "@/lib/data";

const total = monthlyChartData.reduce((s, d) => s + d.expenses, 0);

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Expenses</h1>
        <p className="text-sm text-gray-500 mt-0.5">Business expense tracking for Tax Year 2025</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <Receipt size={20} className="text-[#F7941D]" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Expenses YTD</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{formatCurrency(total)}</p>
          </div>
        </div>
        <div className="space-y-2">
          {monthlyChartData.map((d) => (
            <div key={d.month} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400 w-8">{d.month}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F7941D] rounded-full"
                  style={{ width: `${(d.expenses / 4800) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[#0D1B2A] w-16 text-right">{formatCurrency(d.expenses)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
