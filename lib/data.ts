export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const monthlyRevenue = [8200, 9100, 7800, 10200, 11000, 9500, 12000, 10800, 11500, 9200, 10500, 11800];
export const monthlyExpenses = [3200, 3800, 2900, 4100, 4200, 3600, 4800, 4100, 4400, 3500, 4000, 4500];

export const monthlyChartData = MONTHS.map((month, i) => ({
  month,
  revenue: monthlyRevenue[i],
  expenses: monthlyExpenses[i],
  profit: monthlyRevenue[i] - monthlyExpenses[i],
}));

export const revenueLineData = MONTHS.map((month, i) => ({
  month,
  value: monthlyRevenue[i],
}));

export const kpiData = {
  netProfitYTD: 78300,
  netProfitChange: 12.4,
  totalDeductions: 22847,
  deductionsChange: 8.2,
  federalTax: 19971,
  stateTax: 1435,
  totalTax: 21406,
  opportunitiesFound: 8,
  estimatedSavings: 14820,
};

export const taxBreakdown = [
  { name: "Federal Income Tax", value: 19971, color: "#00AEEF" },
  { name: "Self-Employment Tax", value: 11050, color: "#F7941D" },
  { name: "Missouri State Tax", value: 1435, color: "#7C3AED" },
];

export const opportunities = [
  {
    id: 1,
    priority: "HIGH",
    title: "S-Corp Election",
    estimatedSavings: 6396,
    description: "Electing S-Corp status could save you significant self-employment taxes on your net profit.",
    whyItMatters:
      "At your income level, paying yourself a reasonable salary and taking distributions can reduce SE tax by ~15.3% on the distribution portion.",
    action: "Schedule S-Corp consultation",
    category: "Business Structure",
  },
  {
    id: 2,
    priority: "HIGH",
    title: "Home Office Deduction",
    estimatedSavings: 2400,
    description: "Deduct the business portion of your home expenses including utilities, internet, and rent.",
    whyItMatters:
      "If you use a dedicated space exclusively for business, you can deduct a proportional share of home costs.",
    action: "Calculate home office %",
    category: "Deductions",
  },
  {
    id: 3,
    priority: "HIGH",
    title: "Section 179 Equipment",
    estimatedSavings: 1800,
    description: "Immediately deduct the full cost of qualifying business equipment instead of depreciating.",
    whyItMatters: "Purchasing equipment before Dec 31 allows full deduction this tax year.",
    action: "Review equipment purchases",
    category: "Deductions",
  },
  {
    id: 4,
    priority: "MEDIUM",
    title: "SEP-IRA Contribution",
    estimatedSavings: 1540,
    description: "Contribute up to 25% of net self-employment income to a SEP-IRA, reducing taxable income.",
    whyItMatters:
      "Maximum contribution is $66,000 for 2025. Every dollar contributed reduces federal tax by ~22 cents.",
    action: "Open SEP-IRA account",
    category: "Retirement",
  },
  {
    id: 5,
    priority: "MEDIUM",
    title: "Vehicle Mileage Deduction",
    estimatedSavings: 1260,
    description: "Track and deduct business miles at the IRS standard rate of $0.67/mile.",
    whyItMatters: "Many business owners underreport mileage. A mileage tracking app can capture every trip.",
    action: "Start tracking mileage",
    category: "Deductions",
  },
  {
    id: 6,
    priority: "MEDIUM",
    title: "QBI Deduction (Section 199A)",
    estimatedSavings: 784,
    description: "As a pass-through business, you may deduct up to 20% of qualified business income.",
    whyItMatters: "This deduction is automatic for many sole proprietors under the income threshold.",
    action: "Verify QBI eligibility",
    category: "Federal Tax",
  },
  {
    id: 7,
    priority: "LOW",
    title: "Health Insurance Deduction",
    estimatedSavings: 420,
    description: "Self-employed individuals can deduct 100% of health insurance premiums for themselves and family.",
    whyItMatters: "Premiums paid for medical, dental, and long-term care insurance are fully deductible.",
    action: "Gather insurance documents",
    category: "Deductions",
  },
  {
    id: 8,
    priority: "LOW",
    title: "Business Meals (50%)",
    estimatedSavings: 220,
    description: "Deduct 50% of documented business meals with clients, prospects, or partners.",
    whyItMatters: "Keep receipts and note the business purpose to substantiate these deductions.",
    action: "Review meal receipts",
    category: "Deductions",
  },
];

export const quarterlyTaxes = [
  {
    quarter: "Q1 2025",
    period: "Jan 1 – Mar 31",
    dueDate: "Apr 15, 2025",
    federal: 4500,
    state: 350,
    status: "PAID",
    paidDate: "Apr 10, 2025",
  },
  {
    quarter: "Q2 2025",
    period: "Apr 1 – May 31",
    dueDate: "Jun 15, 2025",
    federal: 4500,
    state: 360,
    status: "PAID",
    paidDate: "Jun 12, 2025",
  },
  {
    quarter: "Q3 2025",
    period: "Jun 1 – Aug 31",
    dueDate: "Sep 15, 2025",
    federal: 4500,
    state: 355,
    status: "PAID",
    paidDate: "Sep 9, 2025",
  },
  {
    quarter: "Q4 2025",
    period: "Sep 1 – Dec 31",
    dueDate: "Jan 15, 2026",
    federal: 4500,
    state: 370,
    status: "DUE",
    paidDate: null,
  },
];

export const recentUploads = [
  {
    id: 1,
    filename: "1099-NEC_2025_ClientA.pdf",
    type: "PDF",
    uploadedAt: "Oct 28, 2025",
    status: "PARSED",
    size: "142 KB",
  },
  {
    id: 2,
    filename: "business_expenses_Q3.xlsx",
    type: "EXCEL",
    uploadedAt: "Oct 27, 2025",
    status: "PARSED",
    size: "89 KB",
  },
  {
    id: 3,
    filename: "bank_statement_oct_2025.csv",
    type: "CSV",
    uploadedAt: "Oct 25, 2025",
    status: "PROCESSING",
    size: "34 KB",
  },
  {
    id: 4,
    filename: "invoice_batch_q3.csv",
    type: "CSV",
    uploadedAt: "Oct 20, 2025",
    status: "PARSED",
    size: "22 KB",
  },
  {
    id: 5,
    filename: "vehicle_mileage_log.xlsx",
    type: "EXCEL",
    uploadedAt: "Oct 15, 2025",
    status: "ERROR",
    size: "56 KB",
  },
];

export const reports = [
  {
    id: 1,
    filename: "Back2KC_TaxSummary_2025_Q3.pdf",
    type: "Tax Summary",
    generatedAt: "Oct 15, 2025",
    status: "FINAL",
    pages: 12,
  },
  {
    id: 2,
    filename: "Back2KC_Opportunities_Oct2025.pdf",
    type: "Opportunities Report",
    generatedAt: "Oct 28, 2025",
    status: "FINAL",
    pages: 8,
  },
  {
    id: 3,
    filename: "Back2KC_DeductionsList_2025.pdf",
    type: "Deductions List",
    generatedAt: "Oct 1, 2025",
    status: "DRAFT",
    pages: 5,
  },
  {
    id: 4,
    filename: "Back2KC_QuarterlyEstimates_2025.pdf",
    type: "Quarterly Estimates",
    generatedAt: "Sep 20, 2025",
    status: "FINAL",
    pages: 4,
  },
];

export function formatCurrency(amount: number): string {
  return "$" + amount.toLocaleString("en-US");
}
