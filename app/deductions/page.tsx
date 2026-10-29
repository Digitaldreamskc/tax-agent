import { Tag, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/data";

const deductions = [
  { category: "Home Office", amount: 4200, status: "CONFIRMED" },
  { category: "Vehicle Mileage", amount: 3840, status: "CONFIRMED" },
  { category: "Software & Subscriptions", amount: 2760, status: "CONFIRMED" },
  { category: "Professional Services", amount: 3500, status: "CONFIRMED" },
  { category: "Business Meals (50%)", amount: 847, status: "CONFIRMED" },
  { category: "Health Insurance", amount: 3600, status: "CONFIRMED" },
  { category: "Equipment & Supplies", amount: 2100, status: "CONFIRMED" },
  { category: "Phone & Internet (Business %)", amount: 2000, status: "CONFIRMED" },
];

const total = deductions.reduce((s, d) => s + d.amount, 0);

export default function DeductionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Deductions</h1>
        <p className="text-sm text-gray-500 mt-0.5">Confirmed deductions for Tax Year 2025</p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Deductions</p>
          <p className="text-3xl font-bold text-[#0D1B2A] mt-1">{formatCurrency(total)}</p>
          <p className="text-sm text-gray-400 mt-1">{deductions.length} categories confirmed</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Tax Savings Impact</p>
          <p className="text-3xl font-bold text-emerald-500 mt-1">{formatCurrency(Math.round(total * 0.22))}</p>
          <p className="text-sm text-gray-400 mt-1">At 22% effective rate</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-[#0D1B2A]">Deduction Breakdown</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {deductions.map((d) => (
            <div key={d.category} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#F4F7FE] flex items-center justify-center">
                <Tag size={14} className="text-[#00AEEF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0D1B2A]">{d.category}</p>
              </div>
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="text-sm font-bold text-[#0D1B2A] w-20 text-right">{formatCurrency(d.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
