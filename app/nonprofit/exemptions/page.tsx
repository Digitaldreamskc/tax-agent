import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, ExternalLink } from "lucide-react";

const exemptions = [
  {
    name: "Federal Income Tax",
    status: "EXEMPT",
    how: "Automatic with 501(c)(3) determination letter",
    action: null,
    form: null,
    icon: "check",
  },
  {
    name: "Missouri Income Tax",
    status: "EXEMPT",
    how: "Automatic — no separate application needed",
    action: "Keep IRS determination letter on file",
    form: null,
    icon: "check",
  },
  {
    name: "Missouri Sales Tax (Purchases)",
    status: "APPLY REQUIRED",
    how: "NOT automatic — must apply separately with Missouri DOR",
    action: "File Form 1746. Free. Processing: 4–6 weeks.",
    form: "Form 1746",
    icon: "warning",
  },
  {
    name: "Missouri Property Tax",
    status: "APPLY REQUIRED",
    how: "Apply with your county assessor (not DOR)",
    action: "File by March 1 each year with county assessor. Attach IRS letter + property use description.",
    form: "County Assessor Application",
    icon: "warning",
  },
  {
    name: "Charitable Registration (AG)",
    status: "APPLY REQUIRED",
    how: "Required before soliciting donations if MO revenue > $10,000/year",
    action: "File Form AG-1 before soliciting. Annual renewal: Form AG-2 within 6 months of fiscal year end.",
    form: "Form AG-1 (initial) / AG-2 (renewal)",
    icon: "warning",
  },
  {
    name: "FICA (Social Security/Medicare)",
    status: "NOT EXEMPT",
    how: "501(c)(3)s must withhold and match FICA for all employees",
    action: "Exception: some religious orgs can opt out via Form 8274",
    form: null,
    icon: "x",
  },
];

const fundraisingSalesDays = [
  { days: "1–6 days", status: "Exempt", note: "No sales tax on fundraising sales" },
  { days: "Day 7+", status: "Taxable", note: "Must collect and remit Missouri sales tax" },
];

export default function ExemptionsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Tax Exemptions</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your Missouri nonprofit exemption status and required applications</p>
      </div>

      {/* Most missed alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800">Most Commonly Missed Step</p>
          <p className="text-sm text-amber-700">
            Federal 501(c)(3) status does <strong>NOT</strong> automatically exempt you from Missouri sales tax.
            You must file Form 1746 with the Missouri Department of Revenue.
          </p>
        </div>
      </div>

      {/* Exemption cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Exemption Status</h3>
        </div>
        <div className="space-y-3">
          {exemptions.map((e) => (
            <div key={e.name} className="rounded-xl border border-gray-100 bg-[#F4F7FE] p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {e.icon === "check" && <CheckCircle2 size={18} className="text-green-500" />}
                  {e.icon === "warning" && <AlertCircle size={18} className="text-[#F7941D]" />}
                  {e.icon === "x" && <XCircle size={18} className="text-red-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-sm font-bold text-[#0D1B2A]">{e.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        e.status === "EXEMPT"
                          ? "bg-green-100 text-green-700"
                          : e.status === "APPLY REQUIRED"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{e.how}</p>
                  {e.action && (
                    <p className="text-xs text-[#0D1B2A] font-medium mt-1.5 flex items-center gap-1">
                      <span className="text-[#00AEEF]">→</span> {e.action}
                    </p>
                  )}
                  {e.form && (
                    <span className="inline-block mt-1.5 text-[10px] font-bold bg-[#00AEEF]/10 text-[#00AEEF] px-2 py-0.5 rounded-md">
                      {e.form}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missouri 6-day fundraising rule */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-1">Missouri 6-Day Fundraising Rule</h3>
        <p className="text-xs text-gray-500 mb-4">
          Nonprofits are exempt from collecting sales tax on fundraising sales for up to 6 days per year.
          Day 7 and beyond require you to collect and remit sales tax.
        </p>
        <div className="flex gap-3">
          {fundraisingSalesDays.map((r) => (
            <div
              key={r.days}
              className={`flex-1 rounded-xl p-4 text-center ${
                r.status === "Exempt" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              <p className={`text-lg font-bold ${r.status === "Exempt" ? "text-green-700" : "text-red-600"}`}>
                {r.days}
              </p>
              <p className={`text-xs font-semibold mt-0.5 ${r.status === "Exempt" ? "text-green-600" : "text-red-500"}`}>
                {r.status}
              </p>
              <p className="text-xs text-gray-500 mt-1">{r.note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Track carefully — exceeding 6 days triggers the tax obligation retroactively for all days.
        </p>
      </div>

      {/* Missouri statutes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Missouri Statutes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { law: "RSMo § 143.431", covers: "Missouri income tax exemption for nonprofits" },
            { law: "RSMo § 144.030(2)(19)", covers: "Sales tax exemption for 501(c)(3) purchases" },
            { law: "RSMo § 137.100", covers: "Property tax exemption — charitable/religious/educational" },
            { law: "RSMo §§ 407.450–407.475", covers: "Charitable Organizations registration and reporting" },
            { law: "RSMo § 355", covers: "Missouri Nonprofit Corporation Law" },
            { law: "Mo. Const. Art. X, §6", covers: "Constitutional basis for property tax exemption" },
          ].map((s) => (
            <div key={s.law} className="bg-[#F4F7FE] rounded-lg p-3">
              <p className="font-bold text-[#00AEEF]">{s.law}</p>
              <p className="text-gray-500 mt-0.5">{s.covers}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
