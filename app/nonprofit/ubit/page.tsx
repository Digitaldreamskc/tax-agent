import { BadgeDollarSign, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const activities = [
  { activity: "Gift shop (unrelated to mission)", ubit: true, notes: "Taxable — regularly carried on, not related to exempt purpose" },
  { activity: "Advertising in publications", ubit: true, notes: "Taxable — commercial activity even in nonprofit publications" },
  { activity: "Parking facility open to public", ubit: true, notes: "Taxable under parking excise tax rules" },
  { activity: "Volunteer-run activities", ubit: false, notes: "Exempt — substantially all work done by volunteers" },
  { activity: "Donated goods thrift store", ubit: false, notes: "Exempt — substantially all goods are donated" },
  { activity: "Bingo games", ubit: false, notes: "Exempt — special statutory exemption (§ 513(f))" },
  { activity: "Rental income (no services)", ubit: false, notes: "Exempt — passive rental income" },
  { activity: "Dividends and interest", ubit: false, notes: "Exempt — passive investment income" },
  { activity: "Corporate sponsorship acknowledgment", ubit: false, notes: "Exempt — acknowledgment only, no endorsement or advertising" },
  { activity: "Advertising with endorsements", ubit: true, notes: "Taxable — qualitative endorsements = advertising, not sponsorship" },
];

export default function UBITPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">UBIT Tracker</h1>
        <p className="text-sm text-gray-500 mt-0.5">Unrelated Business Income Tax — what's taxable, what's exempt, and what you owe</p>
      </div>

      {/* Summary box */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "UBIT Rate", value: "21%", sub: "Federal corporate rate" },
          { label: "Specific Deduction", value: "$1,000", sub: "Before tax applies" },
          { label: "Filing Form", value: "990-T", sub: "Same due date as 990" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-[#00AEEF]">{stat.value}</p>
            <p className="text-sm font-semibold text-[#0D1B2A] mt-0.5">{stat.label}</p>
            <p className="text-xs text-gray-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* What is UBIT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <BadgeDollarSign size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">What Makes Income "Unrelated"?</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">All 3 conditions must be true for income to be subject to UBIT:</p>
        <div className="space-y-2">
          {[
            "It is from a trade or business (not passive investment)",
            "It is regularly carried on (not a one-time event)",
            "It is NOT substantially related to your exempt purpose",
          ].map((cond, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#F4F7FE] rounded-xl">
              <span className="w-6 h-6 rounded-full bg-[#00AEEF] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-[#0D1B2A]">{cond}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity reference */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-4">Common Activity Reference</h3>
        <div className="space-y-2">
          {activities.map((a) => (
            <div key={a.activity} className="flex items-start gap-3 p-3 border-b border-gray-50 last:border-0">
              {a.ubit ? (
                <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0D1B2A]">{a.activity}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      a.ubit ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {a.ubit ? "UBIT" : "EXEMPT"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{a.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsorship rules */}
      <div className="bg-[#F4F7FE] rounded-2xl border border-gray-100 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle size={16} className="text-[#F7941D] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">Sponsorship vs. Advertising (Key Distinction)</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="font-bold text-green-700 mb-1">NOT Taxable (Sponsorship)</p>
                <ul className="text-green-600 space-y-1">
                  <li>• List sponsor's name and logo</li>
                  <li>• "Presented by Company X"</li>
                  <li>• Product display at event</li>
                  <li>• Exclusive sponsorship designation</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="font-bold text-red-700 mb-1">Taxable (Advertising)</p>
                <ul className="text-red-600 space-y-1">
                  <li>• "Company X has the best products"</li>
                  <li>• Specific pricing or discounts</li>
                  <li>• Comparative claims</li>
                  <li>• Call to action to purchase</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
