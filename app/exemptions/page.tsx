import { ShieldCheck, CheckCircle2, AlertCircle, Zap } from "lucide-react";

const autoExemptions = [
  {
    title: "SE Tax Deduction (50%)",
    savings: "~$847/yr",
    howItWorks: "Self-employed individuals deduct 50% of self-employment tax from gross income — automatic on Schedule SE. No election needed.",
    form: "Schedule SE → Schedule 1 Line 15",
    status: "automatic",
    category: "Federal",
  },
  {
    title: "QBI Deduction — Section 199A",
    savings: "~$3,726/yr",
    howItWorks: "Deduct up to 20% of qualified business income from taxable income. Most sole proprietors under the income threshold ($197,300 single, $394,600 MFJ) qualify automatically.",
    form: "Form 8995",
    status: "automatic",
    category: "Federal",
  },
  {
    title: "Missouri Small Business Deduction (MO-SBD)",
    savings: "~$940/yr",
    howItWorks: "Deduct 50% of net profit from Missouri taxable income, up to $20,000/year. Missouri-only benefit — reduces state tax at 4.7%.",
    form: "Form MO-SBD (attached to MO-1040)",
    status: "automatic",
    category: "Missouri",
    highlight: true,
  },
  {
    title: "Self-Employed Health Insurance",
    savings: "~$864/yr",
    howItWorks: "Deduct 100% of health, dental, and long-term care premiums for yourself and family. Taken above the line — reduces AGI even without itemizing.",
    form: "Schedule 1 Line 17",
    status: "automatic",
    category: "Federal",
  },
];

const advancedExemptions = [
  {
    title: "Augusta Rule — §280A(g)",
    savingsLabel: "Up to $6,000+ tax-free",
    howItWorks: "Rent your home to your business for up to 14 days/year. Rental income is 100% excluded from your personal income. Business deducts the payment. Zero tax on either end.",
    requirements: ["Must own a home", "Business must be S-Corp or LLC (not sole prop reimbursing self)", "Rental rate must match local market rate", "Hold a legitimate business meeting"],
    form: "No form — business deducts as meeting expense, no personal income reported",
    difficulty: "Medium",
    estimatedSavings: "$1,500–$6,000/year",
  },
  {
    title: "Hire Your Children (Under 18)",
    savingsLabel: "$3,000–$14,000 tax-free",
    howItWorks: "Pay your children under 18 for legitimate work. Wages are exempt from FICA (Social Security + Medicare) if you're a sole proprietor or spousal partnership. Child pays little/no income tax due to their standard deduction ($14,600).",
    requirements: ["Sole proprietor or husband-wife partnership only (not S-Corp)", "Work must be real and age-appropriate", "Pay must be reasonable for the work", "Keep time records"],
    form: "W-2 for child; Form 1040 deducts as business expense",
    difficulty: "Low",
    estimatedSavings: "$3,000–$14,000/year (FICA savings alone: $600–$2,000)",
  },
  {
    title: "HSA — Triple Tax Shelter",
    savingsLabel: "$4,300–$8,550 deductible",
    howItWorks: "If you have a High Deductible Health Plan (HDHP): contributions are tax-deductible, growth is tax-free, withdrawals for medical are tax-free. In retirement (65+), withdraw for any purpose at ordinary income rates — functions like a second IRA.",
    requirements: ["Must be enrolled in an HDHP", "2025 limits: $4,300 (individual), $8,550 (family)", "Cannot be enrolled in Medicare"],
    form: "Form 8889",
    difficulty: "Low",
    estimatedSavings: "$946–$1,881/year in direct tax savings (at 22%)",
  },
  {
    title: "SEP-IRA Contribution",
    savingsLabel: "Up to $70,000 deductible",
    howItWorks: "Contribute up to 25% of net self-employment income (max $70,000 in 2025). Reduces federal taxable income dollar-for-dollar. Funds grow tax-deferred.",
    requirements: ["Self-employed or small business owner", "Deadline: tax return due date including extensions", "Easy to open — no annual filing"],
    form: "Schedule 1 Line 16",
    difficulty: "Low",
    estimatedSavings: "At 22% bracket: $15,400/year savings on max contribution",
  },
  {
    title: "Accountable Plan (S-Corp)",
    savingsLabel: "Varies — tax-free reimbursements",
    howItWorks: "If you elect S-Corp, reimburse yourself for business expenses (home office, vehicle, phone) through the corporation. Reimbursements are tax-free to you and deductible by the S-Corp. No W-2 income, no SE tax on reimbursed amounts.",
    requirements: ["Must be an S-Corp (not applicable to sole proprietors)", "Expenses must be substantiated with receipts", "Reimbursements made under a written plan"],
    form: "Written accountable plan document; no IRS form required",
    difficulty: "Medium",
    estimatedSavings: "Depends on reimburse-able expenses — typically $2,000–$10,000/year",
  },
];

const moExemptions = [
  {
    name: "Missouri Income Tax",
    status: "Taxable — no exemption for self-employed",
    note: "Self-employed pay MO income tax. Use MO-SBD to reduce taxable income.",
  },
  {
    name: "Missouri Small Business Deduction",
    status: "50% net profit, up to $20,000",
    note: "Automatic — attach Form MO-SBD to your MO-1040.",
    highlight: true,
  },
  {
    name: "Kansas City Earnings Tax",
    status: "1% on net earnings — no exemption for SE",
    note: "KC residents and those working in KC owe 1% earnings tax. Self-employed file Form RD-109.",
  },
  {
    name: "St. Louis Earnings Tax",
    status: "1% on net earnings — no exemption for SE",
    note: "St. Louis city residents file Form E-1.",
  },
  {
    name: "Missouri Sales Tax",
    status: "N/A for services",
    note: "Missouri generally does not tax services. If you sell physical goods, you need a sales tax permit.",
  },
];

export default function ExemptionsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Tax Exemptions & Exclusions</h1>
        <p className="text-sm text-gray-500 mt-0.5">Special provisions that reduce or eliminate your tax — beyond regular deductions</p>
      </div>

      {/* Automatic exemptions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 size={16} className="text-green-500" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Automatic — You Qualify Now</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">These apply to your return without any special elections or actions.</p>
        <div className="space-y-3">
          {autoExemptions.map((e) => (
            <div
              key={e.title}
              className={`rounded-xl border p-4 ${
                e.highlight
                  ? "border-[#00AEEF] bg-blue-50"
                  : "border-gray-100 bg-[#F4F7FE]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#0D1B2A]">{e.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      e.category === "Missouri"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {e.category}
                    </span>
                    {e.highlight && (
                      <span className="text-[10px] font-bold bg-[#00AEEF] text-white px-2 py-0.5 rounded-full">
                        OFTEN MISSED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{e.howItWorks}</p>
                  <p className="text-xs text-gray-400 mt-1.5">Form: <span className="font-medium text-[#0D1B2A]">{e.form}</span></p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-emerald-600">{e.savings}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">est. savings</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced / action-required */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-[#F7941D]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Advanced — Require Action to Claim</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">These are legal tax exclusions most self-employed people never use. Each requires setup but can save thousands.</p>
        <div className="space-y-4">
          {advancedExemptions.map((e) => (
            <div key={e.title} className="rounded-xl border border-gray-100 bg-[#F4F7FE] p-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className="text-sm font-bold text-[#0D1B2A]">{e.title}</span>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-[#F7941D]">{e.estimatedSavings}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                    e.difficulty === "Low"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {e.difficulty} setup
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">{e.howItWorks}</p>
              <div className="mt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Requirements</p>
                <ul className="space-y-0.5">
                  {e.requirements.map((r) => (
                    <li key={r} className="text-xs text-gray-500 flex items-start gap-1.5">
                      <span className="text-[#00AEEF] flex-shrink-0 mt-0.5">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                <span className="font-medium text-[#0D1B2A]">Filing: </span>{e.form}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Missouri-specific */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Missouri-Specific Rules</h3>
        </div>
        <div className="space-y-2">
          {moExemptions.map((e) => (
            <div
              key={e.name}
              className={`rounded-xl p-3 border ${
                e.highlight ? "border-[#00AEEF] bg-blue-50" : "border-gray-100 bg-[#F4F7FE]"
              }`}
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <span className="text-sm font-semibold text-[#0D1B2A]">{e.name}</span>
                <span className={`text-xs font-semibold ${e.highlight ? "text-[#00AEEF]" : "text-gray-500"}`}>
                  {e.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{e.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800">The MO-SBD is Missouri's Most Missed Deduction</p>
          <p className="text-sm text-amber-700">
            The Missouri Small Business Deduction lets you exclude 50% of your net profit (up to $20,000) from Missouri taxable income. At 4.7%, that's up to $940/year. It requires attaching Form MO-SBD to your state return — many tax preparers skip it.
          </p>
        </div>
      </div>
    </div>
  );
}
