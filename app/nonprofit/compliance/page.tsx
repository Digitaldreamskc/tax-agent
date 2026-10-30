import { Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const calendar = [
  {
    month: "January",
    tasks: [
      { task: "Issue W-2s to employees", where: "Employees", required: true, deadline: "Jan 31" },
      { task: "Issue 1099-NECs to contractors paid $600+", where: "Contractors", required: true, deadline: "Jan 31" },
    ],
  },
  {
    month: "March",
    tasks: [
      { task: "Property tax exemption renewal", where: "County Assessor", required: false, deadline: "Mar 1" },
      { task: "Secretary of State Annual Report (if March anniversary)", where: "sos.mo.gov", required: true, deadline: "Mar 31", fee: "$10" },
    ],
  },
  {
    month: "May",
    tasks: [
      { task: "Form 990/990-EZ/990-N due (calendar year orgs)", where: "IRS.gov", required: true, deadline: "May 15" },
      { task: "Form 990-T due (if unrelated business income)", where: "IRS", required: false, deadline: "May 15" },
    ],
  },
  {
    month: "Within 6 months of FYE",
    tasks: [
      { task: "AG Annual Renewal (Form AG-2)", where: "Missouri AG Office", required: true, deadline: "6 months after FYE" },
    ],
  },
  {
    month: "Quarterly",
    tasks: [
      { task: "Missouri employer quarterly wage reports (if employees)", where: "Missouri DES", required: false, deadline: "Month after quarter end" },
    ],
  },
  {
    month: "Ongoing",
    tasks: [
      { task: "Track fundraising sales days (6-day rule)", where: "Internal records", required: true, deadline: "Year-round" },
      { task: "Issue written acknowledgments for donations ≥ $250", where: "Donors", required: true, deadline: "Before donor files taxes" },
      { task: "Quid pro quo disclosures for payments > $75", where: "Donors", required: true, deadline: "At time of transaction" },
      { task: "Board meeting minutes", where: "Internal", required: true, deadline: "Per bylaws" },
    ],
  },
];

const criticalItems = [
  {
    title: "Form 990 (3-Year Rule)",
    description: "Missing 3 consecutive years triggers AUTOMATIC REVOCATION of exempt status. No notice. No grace period.",
    severity: "critical",
  },
  {
    title: "Missouri AG Registration",
    description: "Must register BEFORE soliciting donations if MO revenue > $10,000. Soliciting without registration violates RSMo §§ 407.450–407.475.",
    severity: "high",
  },
  {
    title: "Sales Tax (Form 1746)",
    description: "Must apply separately — federal 501(c)(3) does NOT auto-exempt you from MO sales tax. Most orgs miss this.",
    severity: "high",
  },
];

export default function CompliancePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Compliance Calendar</h1>
        <p className="text-sm text-gray-500 mt-0.5">All annual filing obligations — federal, Missouri state, and ongoing</p>
      </div>

      {/* Critical warnings */}
      <div className="space-y-3">
        {criticalItems.map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl border p-4 flex items-start gap-3 ${
              item.severity === "critical"
                ? "bg-red-50 border-red-200"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <AlertCircle
              size={18}
              className={`flex-shrink-0 mt-0.5 ${item.severity === "critical" ? "text-red-500" : "text-amber-500"}`}
            />
            <div>
              <p className={`text-sm font-bold ${item.severity === "critical" ? "text-red-800" : "text-amber-800"}`}>
                {item.title}
              </p>
              <p className={`text-xs mt-0.5 ${item.severity === "critical" ? "text-red-700" : "text-amber-700"}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Annual Filing Calendar</h3>
        </div>
        <div className="space-y-5">
          {calendar.map((group) => (
            <div key={group.month}>
              <p className="text-xs font-bold text-[#00AEEF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock size={12} />
                {group.month}
              </p>
              <div className="space-y-2 ml-4">
                {group.tasks.map((t) => (
                  <div
                    key={t.task}
                    className="flex items-start gap-3 p-3 bg-[#F4F7FE] rounded-xl"
                  >
                    <CheckCircle2 size={15} className={t.required ? "text-[#00AEEF] flex-shrink-0 mt-0.5" : "text-gray-300 flex-shrink-0 mt-0.5"} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className="text-sm font-medium text-[#0D1B2A]">{t.task}</p>
                        <div className="flex items-center gap-2">
                          {"fee" in t && t.fee && (
                            <span className="text-[10px] font-bold text-[#F7941D] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                              {t.fee}
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                            {t.deadline}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{t.where}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record retention */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-3">Record Retention</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { record: "IRS Determination Letter", keep: "Permanently" },
            { record: "Form 990 returns", keep: "7 years (publicly available 3 years)" },
            { record: "Board meeting minutes", keep: "Permanently" },
            { record: "Financial statements", keep: "7 years" },
            { record: "Grant records", keep: "7 years after grant closes" },
            { record: "Employment tax records", keep: "4 years" },
          ].map((r) => (
            <div key={r.record} className="flex justify-between items-center p-3 bg-[#F4F7FE] rounded-xl">
              <span className="text-[#0D1B2A] font-medium text-xs">{r.record}</span>
              <span className="text-xs text-[#00AEEF] font-bold">{r.keep}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
