export async function POST(req: Request) {
  const body = await req.json();

  // Demo mode: return mock scan results
  // In production, this would call Anthropic's API with the uploaded documents
  const opportunities = [
    {
      priority: "HIGH",
      title: "S-Corp Election",
      estimated_savings: "$6,396/year",
      description:
        "Electing S-Corp status could significantly reduce self-employment taxes on your net profit by splitting income between salary and distributions.",
    },
    {
      priority: "HIGH",
      title: "Home Office Deduction",
      estimated_savings: "$2,400/year",
      description:
        "Your home workspace qualifies for the home office deduction. Deduct a proportional share of rent, utilities, and internet.",
    },
    {
      priority: "HIGH",
      title: "Section 179 Equipment",
      estimated_savings: "$1,800/year",
      description:
        "Qualifying equipment purchases can be fully expensed this year under Section 179 rather than depreciated over multiple years.",
    },
    {
      priority: "MEDIUM",
      title: "SEP-IRA Contribution",
      estimated_savings: "$1,540/year",
      description:
        "Contributing to a SEP-IRA reduces your taxable income dollar-for-dollar. At your bracket, every $1,000 contributed saves ~$220 in federal tax.",
    },
    {
      priority: "MEDIUM",
      title: "Vehicle Mileage",
      estimated_savings: "$1,260/year",
      description:
        "Business miles at $0.67/mile are fully deductible. Based on your uploaded records, mileage tracking could yield significant deductions.",
    },
    {
      priority: "MEDIUM",
      title: "QBI Deduction (199A)",
      estimated_savings: "$784/year",
      description:
        "As a pass-through business owner under the income threshold, you qualify for the 20% Qualified Business Income deduction.",
    },
    {
      priority: "LOW",
      title: "Health Insurance Premium",
      estimated_savings: "$420/year",
      description:
        "Self-employed health insurance premiums are 100% deductible from gross income, reducing both income and SE tax.",
    },
    {
      priority: "LOW",
      title: "Business Meals (50%)",
      estimated_savings: "$220/year",
      description:
        "Documented business meals with clients are 50% deductible. Ensure you keep receipts noting the business purpose.",
    },
  ];

  return Response.json({
    success: true,
    scanned_at: new Date().toISOString(),
    total_estimated_savings: "$14,820/year",
    opportunities,
    metadata: {
      type: body.type,
      files_analyzed: body.data?.files?.length ?? 0,
    },
  });
}
