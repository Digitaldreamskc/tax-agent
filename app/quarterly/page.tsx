export const instant = false;

import { Calendar, CheckCircle2, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { getQuarterlyPayments, markQuarterlyPaid } from "@/lib/db";
import { quarterlyTaxes, formatCurrency } from "@/lib/data";
import SampleDataBanner from "@/components/SampleDataBanner";

const statusConfig = {
  PAID: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50", label: "Paid", border: "border-emerald-200" },
  DUE: { icon: AlertCircle, color: "text-[#F7941D]", bg: "bg-orange-50", label: "Due Soon", border: "border-orange-200" },
  UPCOMING: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", label: "Upcoming", border: "border-blue-200" },
};

async function markPaidAction(id: string) {
  "use server";
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  await markQuarterlyPaid(id, today);
}

export default async function QuarterlyPage() {
  const dbPayments = await getQuarterlyPayments();
  const isRealData = dbPayments.length > 0;

  // Normalize shape: db rows use state_tax and due_date; mock uses state and dueDate
  const quarters = isRealData
    ? dbPayments.map((q: any) => ({
        id: q.id,
        quarter: q.quarter,
        period: q.period,
        dueDate: q.due_date,
        federal: q.federal ?? 0,
        state: q.state_tax ?? 0,
        status: q.status ?? 'DUE',
        paidDate: q.paid_date ?? null,
      }))
    : quarterlyTaxes.map((q) => ({ ...q, id: undefined }));

  const totalFederal = quarters.reduce((s: number, q: any) => s + q.federal, 0);
  const totalState = quarters.reduce((s: number, q: any) => s + q.state, 0);
  const paidQuarters = quarters.filter((q: any) => q.status === "PAID");
  const paidFederal = paidQuarters.reduce((s: number, q: any) => s + q.federal, 0);
  const paidState = paidQuarters.reduce((s: number, q: any) => s + q.state, 0);
  const paidPercent = Math.round((paidQuarters.length / quarters.length) * 100) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Quarterly Taxes</h1>
        <p className="text-sm text-gray-500 mt-0.5">2025 estimated tax payment schedule</p>
      </div>

      {!isRealData && <SampleDataBanner />}

      {/* Progress overview */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 col-span-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Annual Payment Progress</p>
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-2xl font-bold text-[#0D1B2A]">{formatCurrency(paidFederal + paidState)} paid</span>
            <span className="text-sm text-gray-400">of {formatCurrency(totalFederal + totalState)} total</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00AEEF] to-[#00D4FF] transition-all"
              style={{ width: `${paidPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{paidQuarters.length} of {quarters.length} quarters paid</span>
            <span className="font-semibold text-[#00AEEF]">{paidPercent}%</span>
          </div>
        </div>

        <div className="bg-[#0D1B2A] rounded-2xl p-5 text-white">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Safe Harbor</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Pay 100% of prior year tax or 90% of current year to avoid underpayment penalties.
          </p>
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-gray-400">Recommended per quarter</p>
            <p className="text-xl font-bold text-[#00AEEF] mt-0.5">{formatCurrency(Math.ceil((totalFederal + totalState) / 4))}</p>
          </div>
        </div>
      </div>

      {/* Quarter cards */}
      <div className="grid grid-cols-2 gap-5">
        {quarters.map((q: any, i: number) => {
          const config = statusConfig[q.status as keyof typeof statusConfig] ?? statusConfig.UPCOMING;
          const StatusIcon = config.icon;
          const isNext = q.status === "DUE";

          return (
            <div
              key={q.id ?? i}
              className={`bg-white rounded-2xl shadow-sm border-2 p-5 ${
                isNext ? "border-[#F7941D]" : "border-gray-100"
              }`}
            >
              {isNext && (
                <div className="mb-3 -mt-1">
                  <span className="text-xs font-bold bg-[#F7941D] text-white px-2.5 py-1 rounded-full">
                    ACTION NEEDED
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0D1B2A]">{q.quarter}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{q.period}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                  <StatusIcon size={12} />
                  {config.label}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={14} className="text-[#00AEEF]" />
                <span>Due: <strong className="text-[#0D1B2A]">{q.dueDate}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#F4F7FE] rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Federal</p>
                  <p className="text-lg font-bold text-[#0D1B2A]">{formatCurrency(q.federal)}</p>
                  <p className="text-xs text-gray-400">Form 1040-ES</p>
                </div>
                <div className="bg-[#F4F7FE] rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Missouri</p>
                  <p className="text-lg font-bold text-[#0D1B2A]">{formatCurrency(q.state)}</p>
                  <p className="text-xs text-gray-400">Form MO-1040ES</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">Total due</p>
                  <p className="text-base font-bold text-[#0D1B2A]">{formatCurrency(q.federal + q.state)}</p>
                </div>
                {q.status === "PAID" ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                    <CheckCircle2 size={14} />
                    Paid {q.paidDate}
                  </div>
                ) : isRealData && q.id ? (
                  <form action={markPaidAction.bind(null, q.id)}>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      <CheckCircle2 size={12} />
                      Mark as Paid
                    </button>
                  </form>
                ) : (
                  <a
                    href="https://www.irs.gov/payments/direct-pay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#00AEEF] hover:bg-[#0096CC] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Pay Now
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* IRS links */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Quick Payment Links</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "IRS Direct Pay", href: "https://www.irs.gov/payments/direct-pay" },
            { label: "IRS EFTPS", href: "https://www.eftps.gov" },
            { label: "Missouri DOR", href: "https://dor.mo.gov/taxation/" },
            { label: "IRS 1040-ES Instructions", href: "https://www.irs.gov/forms-pubs/about-form-1040-es" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F4F7FE] hover:bg-blue-50 text-xs font-semibold text-[#00AEEF] border border-blue-100 transition-colors"
            >
              {link.label}
              <ExternalLink size={11} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
