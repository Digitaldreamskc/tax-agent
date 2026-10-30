"use client";

import { useState, useEffect } from "react";
import { Send, Copy, CheckCircle2, Mail, Link2, X } from "lucide-react";

interface Props {
  numbers: {
    gross: number; netProfit: number; totalTax: number;
    fedIncomeTax: number; seTax: number; moTax: number;
    qbiDeduction: number; moSBD: number; effectiveRate: number;
  };
  isNonprofit: boolean;
  fmt: (v: number) => string;
}

export default function ShareWithCPA({ numbers: n, isNonprofit, fmt }: Props) {
  const [cpaEmail, setCpaEmail] = useState("");
  const [cpaName, setCpaName] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCpaEmail(localStorage.getItem("cpaEmail") ?? "");
    setCpaName(localStorage.getItem("cpaName") ?? "");
  }, []);

  const saveAndSend = () => {
    localStorage.setItem("cpaEmail", cpaEmail);
    localStorage.setItem("cpaName", cpaName);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const emailBody = isNonprofit
    ? `Hi ${cpaName || ""},

Please find Back2KC's 2025 nonprofit tax packet linked below for your review.

SUMMARY
──────────────────────────────
Total Revenue:     ${fmt(n.gross)}
Total Expenses:    ${fmt(n.gross - n.netProfit)}
Net Assets Change: ${fmt(n.netProfit)}

Missouri Filings Due:
• Form 990-EZ (May 15, 2026)
• MO AG Annual Renewal / Form AG-2
• SOS Annual Report ($10 fee)

View full tax packet: ${shareUrl}

${note ? `Additional notes:\n${note}\n` : ""}Please let me know if you need any additional documentation.

Thank you,
Jessica Powell
Back2KC`
    : `Hi ${cpaName || ""},

Please find Back2KC's 2025 self-employed tax packet linked below for your review.

SUMMARY
──────────────────────────────
Gross Revenue:       ${fmt(n.gross)}
Net Profit:          ${fmt(n.netProfit)}
Federal Income Tax:  ${fmt(n.fedIncomeTax)}
Self-Employment Tax: ${fmt(n.seTax)}
Missouri State Tax:  ${fmt(n.moTax)}
Total Tax Owed:      ${fmt(n.totalTax)}
Effective Rate:      ${(n.effectiveRate * 100).toFixed(1)}%

Key Deductions Applied:
• QBI Deduction (§199A):            ${fmt(n.qbiDeduction)}
• Missouri Small Business Deduction: ${fmt(n.moSBD)}

Forms needed: Schedule C, Schedule SE, Form 1040, Form 8995, MO-1040, MO-SBD

View full tax packet: ${shareUrl}

${note ? `Additional notes:\n${note}\n` : ""}Please let me know if you need any additional documentation.

Thank you,
Jessica Powell
Back2KC`;

  const subject = `Back2KC 2025 ${isNonprofit ? "Nonprofit" : "Tax"} Return — CPA Review`;
  const mailtoLink = `mailto:${cpaEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#F7941D] hover:bg-orange-500 text-white text-sm font-bold rounded-xl transition-colors"
      >
        <Send size={16} />
        Send to CPA
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[#00AEEF]" />
                <h2 className="text-base font-bold text-[#0D1B2A]">Send Tax Packet to CPA</h2>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* CPA info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">CPA Name</label>
                  <input
                    value={cpaName}
                    onChange={(e) => setCpaName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">CPA Email</label>
                  <input
                    type="email"
                    value={cpaEmail}
                    onChange={(e) => setCpaEmail(e.target.value)}
                    placeholder="cpa@example.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Add a note (optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any questions or context for your CPA..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00AEEF] resize-none"
                />
              </div>

              {/* Email preview */}
              <div className="bg-[#F4F7FE] rounded-xl p-3 max-h-36 overflow-y-auto">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email preview</p>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
                  {emailBody.slice(0, 400)}…
                </pre>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <a
                  href={mailtoLink}
                  onClick={saveAndSend}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#00AEEF] hover:bg-[#0096CC] text-white text-sm font-bold rounded-xl transition-colors"
                >
                  <Mail size={15} />
                  Open in Email Client
                </a>
                <button
                  onClick={copyLink}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 hover:border-[#00AEEF] text-gray-600 hover:text-[#00AEEF] text-sm font-semibold rounded-xl transition-colors"
                >
                  {copied ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Link2 size={15} />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                Opens your default email client (Outlook, Gmail, Apple Mail) pre-filled with the summary and packet link.
                Connect Gmail MCP in Settings for direct sending.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
