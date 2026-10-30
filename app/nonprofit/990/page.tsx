import { ClipboardList, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const forms = [
  {
    form: "990-N (e-Postcard)",
    threshold: "Gross receipts ≤ $50,000",
    dueDate: "May 15",
    fee: "Free",
    notes: "Online only. Cannot be extended. Takes ~5 minutes.",
    status: "not-applicable",
  },
  {
    form: "990-EZ",
    threshold: "Gross receipts < $200K AND assets < $500K",
    dueDate: "May 15",
    fee: "Free",
    notes: "2-page simplified form. Schedule A public support test required.",
    status: "current",
  },
  {
    form: "990 (Full)",
    threshold: "Gross receipts ≥ $200K OR assets ≥ $500K",
    dueDate: "May 15",
    fee: "Free",
    notes: "Full form with all schedules. Disclose officer compensation > $100K.",
    status: "not-applicable",
  },
  {
    form: "990-PF",
    threshold: "Private foundations — always",
    dueDate: "May 15",
    fee: "Free",
    notes: "1.39% excise tax on net investment income. 5% minimum distribution.",
    status: "not-applicable",
  },
];

const schedules = [
  { name: "Schedule A", purpose: "Public Support Test — critical for public charity status", required: true },
  { name: "Schedule B", purpose: "List of donors giving $5,000+ (confidential — not public)", required: true },
  { name: "Schedule G", purpose: "Fundraising activities and gaming", required: false },
  { name: "Schedule L", purpose: "Transactions with interested persons (loans, excess benefit)", required: false },
  { name: "Schedule O", purpose: "Supplemental information for 990 narrative answers", required: true },
];

export default function Form990Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Form 990 Filing</h1>
        <p className="text-sm text-gray-500 mt-0.5">Federal annual return for tax-exempt organizations</p>
      </div>

      {/* Current filing status */}
      <div className="bg-[#00AEEF] rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={16} />
          <span className="text-sm font-semibold">2025 Filing Status</span>
        </div>
        <p className="text-2xl font-bold">Form 990-EZ Due May 15, 2026</p>
        <p className="text-sm text-blue-100 mt-1">Extension available via Form 8868 → extends to November 15, 2026</p>
      </div>

      {/* Form selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Which Form Do You File?</h3>
        </div>
        <div className="space-y-3">
          {forms.map((f) => (
            <div
              key={f.form}
              className={`rounded-xl border p-4 transition-all ${
                f.status === "current"
                  ? "border-[#00AEEF] bg-blue-50"
                  : "border-gray-100 bg-[#F4F7FE]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0D1B2A]">{f.form}</span>
                    {f.status === "current" && (
                      <span className="text-[10px] font-bold bg-[#00AEEF] text-white px-2 py-0.5 rounded-full">
                        YOUR FORM
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{f.threshold}</p>
                  <p className="text-xs text-gray-400 mt-1">{f.notes}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-[#0D1B2A]">Due: {f.dueDate}</p>
                  <p className="text-xs text-gray-400">{f.fee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key schedules */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-4">Required Schedules</h3>
        <div className="space-y-2">
          {schedules.map((s) => (
            <div key={s.name} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
              {s.required ? (
                <CheckCircle2 size={16} className="text-[#00AEEF] flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <span className="text-sm font-semibold text-[#0D1B2A]">{s.name}</span>
                <p className="text-xs text-gray-500">{s.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Penalties */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={16} className="text-amber-500" />
          <h3 className="text-sm font-bold text-amber-800">Late Filing Penalties</h3>
        </div>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• <strong>$20/day</strong> for organizations with gross receipts under $1M (max $11,000/year)</li>
          <li>• <strong>$105/day</strong> for organizations with gross receipts over $1M (max $55,000/year)</li>
          <li>• <strong>Missing 3 consecutive years</strong> = automatic revocation of exempt status</li>
          <li>• 990-N cannot be extended — file on time (5 minutes online at IRS.gov)</li>
        </ul>
      </div>
    </div>
  );
}
