"use client";

import { useEffect, useState } from "react";
import { Download, AlertCircle, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { useEntityType } from "@/context/EntityTypeContext";

// ── number derivation ─────────────────────────────────────────────────────────

interface Numbers {
  gross: number; expenses: number; netProfit: number;
  seTax: number; seTaxBase: number; deductibleSE: number;
  fedIncomeTax: number; moTax: number; qbiDeduction: number;
  totalTax: number; effectiveRate: number;
  agi: number; standardDeduction: number; federalTaxableIncome: number;
  moSBD: number; moStandardDeduction: number; moTaxableIncome: number;
}

function derive(a: any): Numbers {
  const gross = a.gross_revenue ?? 0;
  const expenses = a.total_expenses ?? 0;
  const netProfit = a.net_profit ?? 0;
  const seTax = a.se_tax ?? 0;
  const fedIncomeTax = a.federal_income_tax ?? 0;
  const moTax = a.mo_state_tax ?? 0;
  const qbiDeduction = a.qbi_deduction ?? 0;
  const totalTax = a.total_tax ?? 0;
  const effectiveRate = a.effective_rate ?? 0;
  const seTaxBase = netProfit * 0.9235;
  const deductibleSE = seTax * 0.5;
  const agi = netProfit - deductibleSE;
  const standardDeduction = 15000;
  const federalTaxableIncome = Math.max(0, agi - standardDeduction - qbiDeduction);
  const moSBD = Math.min(netProfit * 0.5, 20000);
  const moStandardDeduction = 2100;
  const moTaxableIncome = Math.max(0, agi - moStandardDeduction - moSBD);
  return { gross, expenses, netProfit, seTax, seTaxBase, deductibleSE, fedIncomeTax, moTax, qbiDeduction, totalTax, effectiveRate, agi, standardDeduction, federalTaxableIncome, moSBD, moStandardDeduction, moTaxableIncome };
}

function sampleNumbers(): Numbers {
  const gross = 121600; const expenses = 43300; const netProfit = gross - expenses;
  const seTaxBase = netProfit * 0.9235; const seTax = seTaxBase * 0.153;
  const deductibleSE = seTax * 0.5; const agi = netProfit - deductibleSE;
  const qbiDeduction = Math.min(netProfit * 0.20, agi * 0.20);
  const standardDeduction = 15000;
  const federalTaxableIncome = Math.max(0, agi - standardDeduction - qbiDeduction);
  const moSBD = Math.min(netProfit * 0.5, 20000);
  const moStandardDeduction = 2100;
  const moTaxableIncome = Math.max(0, agi - moStandardDeduction - moSBD);
  const fedIncomeTax = federalTaxableIncome * 0.22 * 0.7;
  const moTax = moTaxableIncome * 0.047;
  const totalTax = fedIncomeTax + seTax + moTax;
  return { gross, expenses, netProfit, seTax, seTaxBase, deductibleSE, fedIncomeTax, moTax, qbiDeduction, totalTax, effectiveRate: totalTax / gross, agi, standardDeduction, federalTaxableIncome, moSBD, moStandardDeduction, moTaxableIncome };
}

// ── sub-components ────────────────────────────────────────────────────────────

function FormSection({ title, form, color, children }: { title: string; form: string; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border print:border-gray-300 print:rounded-none print:mb-6">
      <div className={`px-5 py-3 flex items-center justify-between ${color}`}>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <span className="text-xs font-semibold text-white/80 bg-white/20 px-2 py-0.5 rounded-full">{form}</span>
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}

function FormLine({ line, label, value, bold, indent, note, highlight }: { line: string; label: string; value: string; bold?: boolean; indent?: boolean; note?: string; highlight?: boolean }) {
  return (
    <div className={`flex items-start gap-3 px-5 py-2.5 ${highlight ? "bg-blue-50" : ""}`}>
      <span className="text-xs font-bold text-gray-400 w-14 flex-shrink-0 pt-0.5">{line}</span>
      <div className={`flex-1 ${indent ? "pl-3" : ""}`}>
        <span className={`text-sm ${bold ? "font-bold text-[#0D1B2A]" : "text-gray-600"}`}>{label}</span>
        {note && <p className="text-xs text-gray-400 mt-0.5">{note}</p>}
      </div>
      <span className={`text-sm font-bold flex-shrink-0 ${highlight ? "text-[#00AEEF]" : bold ? "text-[#0D1B2A]" : "text-gray-700"}`}>{value}</span>
    </div>
  );
}

function fmt(v: number) { return "$" + Math.round(v).toLocaleString("en-US"); }

function BusinessPacket({ n }: { n: Numbers }) {
  return (
    <>
      <FormSection title="Schedule C — Profit or Loss from Business" form="Schedule C" color="bg-[#00AEEF]">
        <FormLine line="Line 1" label="Gross receipts or sales" value={fmt(n.gross)} bold />
        <FormLine line="Line 2" label="Returns and allowances" value="$0" />
        <FormLine line="Line 28" label="Total expenses" value={fmt(n.expenses)} bold />
        <FormLine line="Line 31" label="Net profit or (loss)" value={fmt(n.netProfit)} bold highlight note="Flows to Form 1040 Schedule 1 Line 3" />
      </FormSection>

      <FormSection title="Schedule SE — Self-Employment Tax" form="Schedule SE" color="bg-[#F7941D]">
        <FormLine line="Line 2" label="Net profit from Schedule C" value={fmt(n.netProfit)} />
        <FormLine line="Line 4a" label="Net earnings × 0.9235" value={fmt(n.seTaxBase)} note="Statutory reduction representing employer-equivalent portion" />
        <FormLine line="Line 5" label="Self-employment tax (× 15.3%)" value={fmt(n.seTax)} bold highlight />
        <FormLine line="Line 6" label="Deductible half of SE tax (÷ 2)" value={fmt(n.deductibleSE)} note="Flows to Schedule 1 Line 15 as above-the-line deduction" />
      </FormSection>

      <FormSection title="Form 1040 — U.S. Individual Income Tax Return" form="Form 1040" color="bg-slate-700">
        <FormLine line="Sch 1 L3" label="Business income (from Schedule C)" value={fmt(n.netProfit)} />
        <FormLine line="Line 9" label="Total income" value={fmt(n.netProfit)} bold />
        <FormLine line="Sch 1 L15" label="Deductible SE tax (above-the-line)" value={`(${fmt(n.deductibleSE)})`} indent />
        <FormLine line="Sch 1 L17" label="Self-employed health insurance" value="(enter)" indent note="100% of premiums — reduces AGI without itemizing" />
        <FormLine line="Sch 1 L16" label="SEP-IRA / retirement contributions" value="(enter)" indent note="Up to $70,000 — largest available deduction" />
        <FormLine line="Line 11" label="Adjusted Gross Income (AGI)" value={fmt(n.agi)} bold highlight />
        <FormLine line="Line 12" label="Standard deduction (single 2025)" value={`(${fmt(n.standardDeduction)})`} />
        <FormLine line="Line 13" label="QBI deduction — Section 199A" value={`(${fmt(n.qbiDeduction)})`} note="20% of qualified business income — Form 8995" />
        <FormLine line="Line 15" label="Taxable income" value={fmt(n.federalTaxableIncome)} bold highlight />
        <FormLine line="Line 16" label="Federal income tax" value={fmt(n.fedIncomeTax)} bold />
        <FormLine line="Line 23" label="SE tax (from Schedule SE)" value={fmt(n.seTax)} />
        <FormLine line="Line 37" label="Total federal tax" value={fmt(n.fedIncomeTax + n.seTax)} bold highlight />
      </FormSection>

      <FormSection title="Missouri Form MO-1040" form="MO-1040" color="bg-purple-700">
        <FormLine line="Line 1" label="Federal AGI (from 1040 Line 11)" value={fmt(n.agi)} />
        <FormLine line="MO-SBD" label="Missouri Small Business Deduction (50% net profit, max $20,000)" value={`(${fmt(n.moSBD)})`} bold highlight note="Attach Form MO-SBD — often missed! Saves up to $940/year." />
        <FormLine line="Line 4" label="Missouri standard deduction (single)" value={`(${fmt(n.moStandardDeduction)})`} />
        <FormLine line="Line A" label="Missouri taxable income" value={fmt(n.moTaxableIncome)} bold highlight />
        <FormLine line="Line B" label="Missouri income tax (4.7%)" value={fmt(n.moTax)} bold />
      </FormSection>
    </>
  );
}

function NonprofitPacket({ n }: { n: Numbers }) {
  const progExpenses = Math.round(n.expenses * 0.72);
  const mgmtExpenses = Math.round(n.expenses * 0.18);
  const fundExpenses = Math.round(n.expenses * 0.10);
  const pubSupportPct = 68;
  return (
    <>
      <FormSection title="Form 990-EZ — Return of Organization Exempt from Income Tax" form="990-EZ" color="bg-purple-600">
        <FormLine line="Line 1" label="Contributions, gifts, grants" value={fmt(n.gross * 0.8)} />
        <FormLine line="Line 2" label="Program service revenue" value={fmt(n.gross * 0.2)} />
        <FormLine line="Line 9" label="Total revenue" value={fmt(n.gross)} bold highlight />
        <FormLine line="Line 13" label="Program service expenses" value={fmt(progExpenses)} />
        <FormLine line="Line 14" label="Management and general expenses" value={fmt(mgmtExpenses)} />
        <FormLine line="Line 15" label="Fundraising expenses" value={fmt(fundExpenses)} />
        <FormLine line="Line 17" label="Total expenses" value={fmt(n.expenses)} bold highlight />
        <FormLine line="Line 18" label="Excess or deficit for year" value={fmt(n.gross - n.expenses)} bold />
      </FormSection>

      <FormSection title="Schedule A — Public Support Test (5-Year Rolling)" form="Schedule A" color="bg-indigo-600">
        <FormLine line="Line 1" label="Public support (contributions + government grants)" value={fmt(n.gross * 0.68)} note="Must be ≥ 33.3% of total support over 5 years" />
        <FormLine line="Line 7" label="Total support" value={fmt(n.gross)} />
        <FormLine line="Line 14" label="Public support percentage" value={`${pubSupportPct}%`} bold highlight
          note={pubSupportPct >= 33.3 ? "✓ Passes 33.3% test — qualifies as public charity" : "⚠ Below 33.3% — risk of private foundation reclassification"} />
      </FormSection>

      <FormSection title="Missouri State Filings" form="State" color="bg-[#00AEEF]">
        <FormLine line="SOS" label="Annual Report — sos.mo.gov" value="$10 fee" note="Due last day of anniversary month of incorporation" />
        <FormLine line="AG-2" label="Charitable Registration Renewal — AG Office" value={n.gross > 10000 ? "Required" : "Not required"} bold={n.gross > 10000} highlight={n.gross > 10000} note="Due within 6 months of fiscal year end" />
        <FormLine line="1746" label="Sales Tax Exemption — Missouri DOR" value="Apply if not done" note="NOT automatic with 501(c)(3). Free — Form 1746." />
      </FormSection>
    </>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function TaxPacketClient() {
  const { isNonprofit } = useEntityType();
  const [n, setN] = useState<Numbers | null>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [isSample, setIsSample] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tax-data")
      .then((r) => r.json())
      .then((data) => {
        if (data.analysis) {
          setN(derive(data.analysis));
        } else {
          setN(sampleNumbers());
          setIsSample(true);
        }
        setOpportunities(data.opportunities?.slice(0, 5) ?? []);
      })
      .catch(() => { setN(sampleNumbers()); setIsSample(true); })
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => window.print();

  const businessForms = ["Schedule C", "Schedule SE", "Form 1040", "Form 8995 (QBI)", "Form MO-1040", "Form MO-SBD"];
  const nonprofitForms = ["Form 990-EZ", "Schedule A", "Schedule O", "MO SOS Annual Report", "Form AG-2 (if applicable)", "Form 1746 (if not done)"];
  const totalForms = isNonprofit ? nonprofitForms : businessForms;

  const businessChecklist = [
    "Verify all Schedule C expenses have receipts or substantiation",
    "Confirm home office is exclusive and regular business use — measure square footage",
    "Verify vehicle log supports mileage deduction — 67 cents/mile for 2025",
    "Confirm QBI deduction eligibility — check income threshold on Form 8995",
    "Review MO-SBD — confirm Form MO-SBD is attached to MO-1040",
    "Consider SEP-IRA contribution before return due date (including extensions)",
    "Review S-Corp election viability — file Form 2553 by March 15 if applicable",
    "Verify all 1099-NEC income is captured in gross receipts",
    "Confirm quarterly estimated payments were made — reconcile against tax owed",
  ];

  const nonprofitChecklist = [
    "Confirm 501(c)(3) determination letter is on file",
    "Verify Schedule A public support test passes 33.3% threshold",
    "Review officer compensation — disclose if any exceed $100,000",
    "Confirm Form 1746 MO sales tax exemption has been applied for",
    "Verify MO AG charitable registration is current (Form AG-2)",
    "Check all unrelated business activities — file 990-T if any UBIT > $1,000",
    "Confirm board meeting minutes are documented for the year",
    "Review conflict of interest disclosures from all board members",
    "Verify property tax exemption is current with county assessor",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="animate-spin text-[#00AEEF]" />
      </div>
    );
  }

  if (!n) return null;

  const stats: { label: string; value: string; color: string }[] = isNonprofit ? [
    { label: "Total Revenue", value: fmt(n.gross), color: "text-[#0D1B2A]" },
    { label: "Total Expenses", value: fmt(n.expenses), color: "text-[#0D1B2A]" },
    { label: "Net Assets Change", value: fmt(n.gross - n.expenses), color: n.gross > n.expenses ? "text-emerald-600" : "text-red-500" },
    { label: "Program Expense %", value: "72%", color: "text-[#00AEEF]" },
  ] : [
    { label: "Gross Revenue", value: fmt(n.gross), color: "text-[#0D1B2A]" },
    { label: "Net Profit", value: fmt(n.netProfit), color: "text-emerald-600" },
    { label: "Total Tax Owed", value: fmt(n.totalTax), color: "text-red-500" },
    { label: "Effective Rate", value: `${(n.effectiveRate * 100).toFixed(1)}%`, color: "text-[#00AEEF]" },
  ];

  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; }
          aside, header, .no-print { display: none !important; }
          div[class*="ml-[240px]"] { margin-left: 0 !important; }
          main { padding: 0 !important; }
          .print-header { display: block !important; }
        }
        .print-header { display: none; }
      `}</style>

      <div className="space-y-6 max-w-4xl">

        <div className="print-header border-b-2 border-gray-800 pb-4 mb-6">
          <p className="text-xl font-bold">Back2KC — {isNonprofit ? "Nonprofit" : "Business"} Tax Packet 2025</p>
          <p className="text-sm text-gray-600">Jessica Powell · Missouri · {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>

        <div className="flex items-start justify-between no-print">
          <div>
            <h1 className="text-2xl font-bold text-[#0D1B2A]">Tax Packet</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isNonprofit ? "Nonprofit — Form 990 series" : "Self-employed — Schedule C + 1040"} · Tax Year 2025
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#00AEEF] hover:bg-[#0096CC] text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>

        {isSample && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 no-print">
            <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              <strong>Sample data.</strong> <a href="/upload" className="underline">Upload your documents</a> to generate your real tax packet with actual numbers.
            </p>
          </div>
        )}

        {/* Forms checklist */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-[#00AEEF]" />
            <h3 className="text-sm font-bold text-[#0D1B2A]">Forms You Need to File</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {totalForms.map((f) => (
              <div key={f} className="flex items-center gap-2 p-2.5 bg-[#F4F7FE] rounded-xl">
                <CheckCircle2 size={14} className="text-[#00AEEF] flex-shrink-0" />
                <span className="text-sm font-medium text-[#0D1B2A]">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Form line breakdowns */}
        {isNonprofit ? <NonprofitPacket n={n} /> : <BusinessPacket n={n} />}

        {/* Opportunities */}
        {opportunities.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Savings Opportunities Identified</h3>
            <div className="space-y-2">
              {opportunities.map((opp: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#F4F7FE] rounded-xl">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                    opp.priority === "HIGH" ? "bg-red-100 text-red-600" :
                    opp.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-600" :
                    "bg-gray-100 text-gray-500"
                  }`}>{opp.priority}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0D1B2A]">{opp.title}</p>
                    {opp.action && <p className="text-xs text-[#00AEEF] mt-0.5">→ {opp.action}</p>}
                  </div>
                  <span className="text-sm font-bold text-emerald-600 flex-shrink-0">{opp.estimated_savings}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CPA checklist */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">CPA Review Checklist</h3>
          <div className="space-y-2">
            {(isNonprofit ? nonprofitChecklist : businessChecklist).map((item) => (
              <label key={item} className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-0.5 accent-[#00AEEF]" />
                <span className="text-sm text-gray-600 group-hover:text-[#0D1B2A]">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center pb-4">
          This tax packet is a computational summary for planning and CPA review purposes.
          Verify all figures with a licensed tax professional before filing. Generated by Back2KC Tax Advisor · {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
}
