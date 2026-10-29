export const instant = false;

import OpportunitiesClient from "./OpportunitiesClient";
import SampleDataBanner from "@/components/SampleDataBanner";
import { getOpportunities } from "@/lib/db";
import { opportunities as mockOpportunities, formatCurrency } from "@/lib/data";

export default async function OpportunitiesPage() {
  const dbOpps = await getOpportunities();
  const isRealData = dbOpps.length > 0;

  // Normalize db rows to the shape OpportunitiesClient expects
  const opps = isRealData
    ? dbOpps.map((o: any, i: number) => ({
        id: i + 1,
        priority: o.priority ?? 'MEDIUM',
        title: o.title ?? '',
        estimatedSavings: parseEstimatedSavings(o.estimated_savings),
        description: o.why ?? '',
        whyItMatters: o.why ?? '',
        action: o.action ?? '',
        category: 'Tax Strategy',
      }))
    : mockOpportunities;

  const totalSavings = opps.reduce((s: number, o: any) => s + (o.estimatedSavings ?? 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Tax Opportunities</h1>
        <p className="text-sm text-gray-500 mt-0.5">Ways to reduce your 2025 tax liability</p>
      </div>

      {!isRealData && <SampleDataBanner />}

      <OpportunitiesClient opportunities={opps} totalSavings={totalSavings} />
    </div>
  );
}

function parseEstimatedSavings(raw: string | null | undefined): number {
  if (!raw) return 0;
  const match = raw.replace(/,/g, '').match(/\$?([\d.]+)/);
  return match ? Math.round(parseFloat(match[1])) : 0;
}
