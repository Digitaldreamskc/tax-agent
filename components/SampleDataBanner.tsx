export default function SampleDataBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3 mb-6">
      <span className="text-amber-500 text-lg">⚠️</span>
      <div>
        <p className="text-sm font-semibold text-amber-800">Showing sample data</p>
        <p className="text-xs text-amber-700">Upload your financial documents to see real numbers.</p>
      </div>
      <a href="/upload" className="ml-auto text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-amber-600">
        Upload Now →
      </a>
    </div>
  )
}
