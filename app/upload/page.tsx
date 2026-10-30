"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, Clock, AlertCircle, Loader2, Zap, X } from "lucide-react";

const fileTypeConfig = {
  CSV: { bg: "bg-green-100", text: "text-green-700" },
  PDF: { bg: "bg-red-100", text: "text-red-700" },
  EXCEL: { bg: "bg-blue-100", text: "text-blue-700" },
  JSON: { bg: "bg-yellow-100", text: "text-yellow-700" },
};

const statusConfig = {
  PARSED: { icon: CheckCircle2, color: "text-emerald-500", label: "Parsed" },
  PROCESSING: { icon: Clock, color: "text-[#00AEEF]", label: "Processing" },
  ERROR: { icon: AlertCircle, color: "text-red-500", label: "Error" },
};

interface OpportunityResult {
  priority: string;
  title: string;
  estimated_savings: string;
  why?: string;
  action?: string;
  description?: string;
}

interface UploadRecord {
  id: string;
  filename: string;
  file_type: string;
  size_kb: number;
  status: string;
  created_at: string;
}

function parseCSV(content: string): { transactions: any[]; categories: any[] } {
  const lines = content.trim().split('\n');
  if (lines.length < 2) return { transactions: [], categories: [] };

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, '').toLowerCase());
  const transactions = lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = vals[i] ?? ''; });
    return {
      date: row['date'] ?? '',
      description: row['description'] ?? row['memo'] ?? '',
      amount: parseFloat(row['amount'] ?? row['debit'] ?? '0') || 0,
      category: row['category'] ?? '',
    };
  }).filter(t => t.amount !== 0);

  // Group by category
  const catMap: Record<string, number> = {};
  for (const t of transactions) {
    const cat = t.category || 'Uncategorized';
    catMap[cat] = (catMap[cat] ?? 0) + Math.abs(t.amount);
  }
  const categories = Object.entries(catMap).map(([name, total]) => ({
    category: name,
    total_deductible: total,
  }));

  return { transactions, categories };
}

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSuccess, setAnalysisSuccess] = useState(false);
  const [results, setResults] = useState<OpportunityResult[] | null>(null);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [grossRevenue, setGrossRevenue] = useState<string>('');
  const [recentUploads, setRecentUploads] = useState<UploadRecord[]>([]);
  const [uploadsLoaded, setUploadsLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadRecentUploads = async () => {
    if (uploadsLoaded) return;
    try {
      const res = await fetch('/api/uploads');
      if (res.ok) {
        const data = await res.json();
        setRecentUploads(data);
      }
    } catch {
      // silent — will fall back to nothing
    }
    setUploadsLoaded(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles((prev) => [...prev, ...files]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDroppedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (idx: number) => {
    setDroppedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setResults(null);
    setAnalysisSuccess(false);

    try {
      let transactions: any[] = [];
      let categories: any[] = [];

      // Parse CSV files
      for (const file of droppedFiles) {
        if (file.name.toLowerCase().endsWith('.csv')) {
          const content = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string ?? '');
            reader.readAsText(file);
          });
          const parsed = parseCSV(content);
          transactions = [...transactions, ...parsed.transactions];
          categories = [...categories, ...parsed.categories];
        }
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: droppedFiles[0]?.name ?? 'upload',
          grossRevenue: parseFloat(grossRevenue) || 0,
          transactions,
          categories,
        }),
      });
      const json = await res.json();
      setResults(json.opportunities);
      setAnalysisSuccess(true);
      // Refresh uploads list
      setUploadsLoaded(false);
      await loadRecentUploads();
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Load uploads on first render
  if (!uploadsLoaded) {
    loadRecentUploads();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Upload Documents</h1>
        <p className="text-sm text-gray-500 mt-0.5">Upload your financial documents to auto-scan for tax opportunities</p>
      </div>

      {/* Gross Revenue input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <label className="block text-sm font-bold text-[#0D1B2A] mb-2">
          Gross Revenue (required)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
          <input
            type="number"
            min="0"
            step="100"
            placeholder="e.g. 95000"
            value={grossRevenue}
            onChange={(e) => setGrossRevenue(e.target.value)}
            className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-[#0D1B2A] focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Your total gross revenue for the tax year. Files may only have expenses, so enter this manually.</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[#00AEEF] bg-blue-50"
            : "border-gray-200 hover:border-[#00AEEF] hover:bg-[#F4F7FE] bg-white"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".csv,.pdf,.json"
          className="hidden"
          onChange={handleFileInput}
        />
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
          isDragging ? "bg-[#00AEEF]" : "bg-[#F4F7FE]"
        }`}>
          <Upload size={28} className={isDragging ? "text-white" : "text-[#00AEEF]"} />
        </div>
        <p className="text-base font-bold text-[#0D1B2A] mb-1">
          {isDragging ? "Drop your files here" : "Drop your files here, or click to browse"}
        </p>
        <p className="text-sm text-gray-400">Supports CSV, PDF, and JSON files</p>

        {/* File type badges */}
        <div className="flex justify-center gap-2 mt-4">
          {["CSV", "PDF", "JSON"].map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Dropped files list */}
      {droppedFiles.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-bold text-[#0D1B2A] mb-3">Files ready to analyze ({droppedFiles.length})</p>
          <div className="space-y-2">
            {droppedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-[#F4F7FE] rounded-xl">
                <FileText size={16} className="text-[#00AEEF]" />
                <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
                <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                <button onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !grossRevenue}
        className="w-full flex items-center justify-center gap-2 py-4 bg-[#00AEEF] hover:bg-[#0096CC] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-colors text-base"
      >
        {isAnalyzing ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Analyzing documents...
          </>
        ) : (
          <>
            <Zap size={20} />
            Run Tax Analysis
          </>
        )}
      </button>

      {/* Success banner */}
      {analysisSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-800">Analysis complete</p>
              <p className="text-xs text-emerald-700 mt-0.5">All numbers computed and saved. View your results below.</p>
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <a
              href="/tax-packet"
              className="flex-1 text-center text-sm font-bold bg-[#00AEEF] hover:bg-[#0096CC] text-white px-4 py-2.5 rounded-xl transition-colors"
            >
              View Tax Packet →
            </a>
            <a
              href="/"
              className="flex-1 text-center text-sm font-semibold bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition-colors"
            >
              View Dashboard
            </a>
          </div>
        </div>
      )}

      {/* Analysis results */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" />
            <h3 className="text-base font-bold text-[#0D1B2A]">Analysis Complete — {results.length} opportunities found</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {results.map((opp, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    opp.priority === "HIGH" ? "bg-red-100 text-red-600" :
                    opp.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-600" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {opp.priority}
                  </span>
                  <span className="text-lg font-bold text-[#00AEEF]">{opp.estimated_savings}</span>
                </div>
                <h4 className="text-sm font-bold text-[#0D1B2A]">{opp.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{opp.why ?? opp.description}</p>
                {opp.action && (
                  <p className="text-xs text-[#00AEEF] font-semibold mt-2">→ {opp.action}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent uploads */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-[#0D1B2A] mb-4">Recent Uploads</h3>
        {recentUploads.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No uploads yet. Run your first analysis above.</p>
        ) : (
          <div className="space-y-3">
            {recentUploads.map((upload) => {
              const fileType = upload.file_type as keyof typeof fileTypeConfig;
              const status = upload.status as keyof typeof statusConfig;
              const statusCfg = statusConfig[status] ?? statusConfig.PROCESSING;
              const fileTypeCfg = fileTypeConfig[fileType] ?? fileTypeConfig.CSV;
              const StatusIcon = statusCfg.icon;
              const uploadedAt = new Date(upload.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

              return (
                <div key={upload.id} className="flex items-center gap-4 p-3 hover:bg-[#F4F7FE] rounded-xl transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-[#00AEEF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0D1B2A] truncate">{upload.filename}</p>
                    <p className="text-xs text-gray-400">{uploadedAt} · {upload.size_kb ? `${upload.size_kb} KB` : '—'}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${fileTypeCfg.bg} ${fileTypeCfg.text}`}>
                    {upload.file_type}
                  </span>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${statusCfg.color}`}>
                    <StatusIcon size={13} />
                    {statusCfg.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
