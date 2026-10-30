import { HeartHandshake, CheckCircle2, AlertCircle } from "lucide-react";

const deductionLimits = [
  { type: "Cash to public charity", limit: "60% of AGI", carryforward: "5 years", notes: "Most common donation type" },
  { type: "Cash to private foundation", limit: "30% of AGI", carryforward: "5 years", notes: "Lower limit for foundations" },
  { type: "Appreciated stock/real estate to public charity", limit: "30% of AGI at FMV", carryforward: "5 years", notes: "No capital gains — donate stock directly" },
  { type: "Appreciated assets to private foundation", limit: "20% of AGI at FMV", carryforward: "5 years", notes: "Or 30% at cost basis" },
];

const acknowledgmentRules = [
  { threshold: "Any cash donation", requirement: "Bank record or written receipt from org" },
  { threshold: "$250 or more", requirement: "Written acknowledgment REQUIRED — must have before donor files return" },
  { threshold: "> $75 with goods/services", requirement: "Quid pro quo disclosure — list FMV of benefits provided" },
  { threshold: "Non-cash > $500", requirement: "Form 8283 (donor files); org describes item, does NOT value it" },
  { threshold: "Non-cash > $5,000", requirement: "Qualified appraisal required; org signs Form 8283 Section B" },
  { threshold: "Vehicle donation", requirement: "Form 1098-C — issue within 30 days; deduction = actual proceeds" },
];

export default function DonorRulesPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Donor Rules</h1>
        <p className="text-sm text-gray-500 mt-0.5">Deductibility limits, acknowledgment requirements, and donor strategies</p>
      </div>

      {/* Deduction limits */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <HeartHandshake size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Deduction Limits (% of Donor's AGI)</h3>
        </div>
        <div className="space-y-2">
          {deductionLimits.map((d) => (
            <div key={d.type} className="p-3 bg-[#F4F7FE] rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-medium text-[#0D1B2A]">{d.type}</span>
                <span className="text-sm font-bold text-[#00AEEF]">{d.limit}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-400">{d.notes}</p>
                <p className="text-xs text-gray-400">Carryforward: {d.carryforward}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acknowledgment requirements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-1">What Your Org Must Provide</h3>
        <p className="text-xs text-gray-500 mb-4">Acknowledgment requirements vary by donation size. Failing to provide proper documentation means the donor cannot deduct their gift.</p>
        <div className="space-y-2">
          {acknowledgmentRules.map((r) => (
            <div key={r.threshold} className="flex items-start gap-3 p-3 border-b border-gray-50 last:border-0">
              <CheckCircle2 size={15} className="text-[#00AEEF] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#0D1B2A]">{r.threshold}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.requirement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acknowledgment must include */}
      <div className="bg-[#00AEEF]/5 border border-[#00AEEF]/20 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Written Acknowledgment Must Include</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "Organization name and address",
            "Date of contribution",
            "Amount of cash donated (or description of non-cash items — NOT the value)",
            'Statement: "No goods or services were provided in exchange" OR description and FMV of any benefits received',
            "EIN (recommended)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#00AEEF] flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Special strategies */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-4">Strategies to Share with Donors</h3>
        <div className="space-y-3">
          {[
            {
              title: "Donate Appreciated Stock Instead of Cash",
              detail: "Donor avoids capital gains tax AND gets full fair market value deduction. Win-win — costs donor less, same benefit to you.",
              badge: "HIGH IMPACT",
            },
            {
              title: "IRA Qualified Charitable Distribution (QCD)",
              detail: "Donors age 70½+ can transfer up to $105,000/year directly from IRA to your org — tax-free. Counts toward Required Minimum Distribution. Better than a deduction for non-itemizers.",
              badge: "AGE 70½+",
            },
            {
              title: "Donor-Advised Fund (DAF) Grants",
              detail: "Donor contributes to a DAF (Fidelity Charitable, etc.) and recommends grants to your org. Note: no goods/services can be exchanged for DAF grants.",
              badge: "CASH ONLY",
            },
            {
              title: "Donation Bunching",
              detail: "Donors below the standard deduction threshold ($15,000 single / $30,000 married) can bundle 2–3 years into one year to exceed it, using a DAF to spread grants over time.",
              badge: "NON-ITEMIZERS",
            },
          ].map((s) => (
            <div key={s.title} className="p-4 bg-[#F4F7FE] rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#0D1B2A]">{s.title}</span>
                <span className="text-[10px] font-bold bg-[#F7941D] text-white px-2 py-0.5 rounded-full">{s.badge}</span>
              </div>
              <p className="text-xs text-gray-500">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What NOT to do */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={16} className="text-amber-500" />
          <h3 className="text-sm font-bold text-amber-800">What Your Org Should Never Do</h3>
        </div>
        <ul className="space-y-1.5 text-sm text-amber-700">
          <li>• Never tell a donor how much they can deduct — you don't know their tax situation</li>
          <li>• Never value donated property on the acknowledgment — describe it; donor determines value</li>
          <li>• Never accept DAF grants with any goods/services in exchange — violates DAF rules</li>
          <li>• Never omit the goods/services statement — even "no goods or services provided" must be stated</li>
          <li>• Never accept restricted gifts you can't use as specified — a donor restriction is legally binding</li>
        </ul>
      </div>
    </div>
  );
}
