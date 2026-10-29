import { NextRequest } from 'next/server'
import { createUpload, updateUploadStatus, saveTransactions, saveAnalysis, saveOpportunities } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    grossRevenue = 0,
    transactions = [],
    categories = [],
    filename = 'upload',
    opportunities: rawOpps = [],
  } = body

  // Save upload record
  const upload = await createUpload(filename, 'CSV', 0)

  // Save transactions
  if (transactions.length > 0 && upload) {
    await saveTransactions(upload.id, transactions)
    await updateUploadStatus(upload.id, 'PARSED')
  }

  // Compute tax numbers from categories
  const totalDeductions = categories.reduce(
    (sum: number, c: any) => sum + parseFloat(c.total_deductible || 0),
    0
  )
  const netProfit = grossRevenue - totalDeductions
  const seTaxBase = netProfit * 0.9235
  const seTax = seTaxBase * 0.153
  const deductibleSe = seTax * 0.5
  const agi = netProfit - deductibleSe
  const qbiDeduction = Math.min(netProfit * 0.20, agi * 0.20)
  const fedTaxableIncome = Math.max(0, agi - 15000 - qbiDeduction)
  const fedIncomeTax = computeFederalTax(fedTaxableIncome)
  const moSBD = Math.min(netProfit * 0.5, 20000)
  const moTaxable = Math.max(0, agi - 15000 - 2100 - moSBD)
  const moTax = computeMOTax(moTaxable)
  const totalTax = fedIncomeTax + seTax + moTax

  // Save analysis
  const analysis = await saveAnalysis({
    gross_revenue: grossRevenue,
    total_expenses: grossRevenue - netProfit,
    net_profit: netProfit,
    total_deductions: totalDeductions,
    federal_income_tax: fedIncomeTax,
    se_tax: seTax,
    mo_state_tax: moTax,
    qbi_deduction: qbiDeduction,
    total_tax: totalTax,
    effective_rate: grossRevenue > 0 ? totalTax / grossRevenue : 0,
  })

  // Save opportunities
  const opps = rawOpps.length > 0 ? rawOpps : getDefaultOpportunities(netProfit)
  if (analysis) {
    await saveOpportunities(analysis.id, opps)
  }

  return Response.json({
    success: true,
    analysis: {
      grossRevenue,
      netProfit,
      totalDeductions,
      fedIncomeTax,
      seTax,
      moTax,
      totalTax,
      qbiDeduction,
    },
    opportunities: opps,
  })
}

function computeFederalTax(taxableIncome: number): number {
  const brackets = [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ]
  let tax = 0
  for (const b of brackets) {
    if (taxableIncome > b.min)
      tax += Math.min(taxableIncome - b.min, b.max - b.min) * b.rate
  }
  return tax
}

function computeMOTax(taxableIncome: number): number {
  const brackets = [
    { min: 0, max: 1121, rate: 0.015 },
    { min: 1121, max: 2242, rate: 0.02 },
    { min: 2242, max: 3363, rate: 0.025 },
    { min: 3363, max: 4484, rate: 0.03 },
    { min: 4484, max: 5605, rate: 0.035 },
    { min: 5605, max: 6726, rate: 0.04 },
    { min: 6726, max: 7847, rate: 0.045 },
    { min: 7847, max: Infinity, rate: 0.047 },
  ]
  let tax = 0
  for (const b of brackets) {
    if (taxableIncome > b.min)
      tax += Math.min(taxableIncome - b.min, b.max - b.min) * b.rate
  }
  return tax
}

function getDefaultOpportunities(netProfit: number) {
  return [
    {
      priority: 'HIGH',
      title: 'S-Corp Election',
      estimated_savings: `$${Math.round(netProfit * 0.9235 * 0.153 * 0.6 - 2500).toLocaleString()}/year`,
      why: 'SE tax on distributions eliminated',
      action: 'File Form 2553 by March 15',
    },
    {
      priority: 'HIGH',
      title: 'SEP-IRA Contribution',
      estimated_savings: `$${Math.round(Math.min(netProfit * 0.25 * 0.24, 16800)).toLocaleString()}/year`,
      why: 'Contributions reduce taxable income dollar-for-dollar',
      action: 'Open SEP-IRA at Fidelity',
    },
    {
      priority: 'MEDIUM',
      title: 'Home Office Deduction',
      estimated_savings: '$1,500–$3,000',
      why: 'Dedicated workspace qualifies for deduction',
      action: 'Measure office square footage',
    },
    {
      priority: 'MEDIUM',
      title: 'QBI Deduction (199A)',
      estimated_savings: `$${Math.round(netProfit * 0.20 * 0.22).toLocaleString()}`,
      why: '20% of qualified business income deductible',
      action: 'Confirm on Form 8995',
    },
    {
      priority: 'MEDIUM',
      title: 'Missouri Small Business Deduction',
      estimated_savings: `$${Math.round(Math.min(netProfit * 0.5, 20000) * 0.047).toLocaleString()}`,
      why: 'Deduct 50% of net profit from MO taxable income (MO-SBD)',
      action: 'File Form MO-SBD',
    },
  ]
}
