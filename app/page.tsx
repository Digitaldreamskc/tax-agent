import KPICards from "@/components/KPICards";
import TaxSummaryChart from "@/components/TaxSummaryChart";
import RevenueLineChart from "@/components/RevenueLineChart";
import TaxDonutChart from "@/components/TaxDonutChart";
import WelcomePanel from "@/components/WelcomePanel";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tax Year 2025 — Updated Oct 29, 2025</p>
      </div>

      {/* KPI Cards Row */}
      <KPICards />

      {/* Main content grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left panel — Welcome + Business Card + Deadlines */}
        <div className="col-span-3">
          <WelcomePanel />
        </div>

        {/* Center — Tax Summary Chart (dark card) */}
        <div className="col-span-9">
          <TaxSummaryChart />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Revenue YTD Line Chart */}
        <div className="col-span-8">
          <RevenueLineChart />
        </div>

        {/* Tax Breakdown Donut */}
        <div className="col-span-4">
          <TaxDonutChart />
        </div>
      </div>
    </div>
  );
}
