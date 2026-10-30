import { NextResponse } from 'next/server'
import { getLatestAnalysis, getOpportunities, hasRealData } from '@/lib/db'

export async function GET() {
  const realData = await hasRealData()
  const analysis = realData ? await getLatestAnalysis() : null
  const opportunities = realData ? await getOpportunities() : []

  return NextResponse.json({ analysis, opportunities, isSample: !realData })
}
