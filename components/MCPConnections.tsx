"use client";

import { useState, useEffect } from "react";
import {
  Plug, CheckCircle2, Plus, Trash2, ExternalLink,
  Mail, HardDrive, BarChart3, MessageSquare, Database, Zap
} from "lucide-react";

interface MCPEntry {
  id: string;
  name: string;
  url: string;
  status: "connected" | "error" | "pending";
  addedAt: string;
}

interface BuiltInMCP {
  id: string;
  name: string;
  description: string;
  what_it_unlocks: string;
  icon: React.ElementType;
  color: string;
  setup_url: string;
  env_var?: string;
}

const BUILT_IN_MCPS: BuiltInMCP[] = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Send the tax packet directly from the dashboard without opening your email client.",
    what_it_unlocks: "Direct email to CPA with PDF attachment",
    icon: Mail,
    color: "text-red-500",
    setup_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/gmail",
    env_var: "GMAIL_MCP_URL",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Save tax packets, reports, and documents directly to a shared Drive folder.",
    what_it_unlocks: "Save & share tax docs to Drive",
    icon: HardDrive,
    color: "text-blue-500",
    setup_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive",
    env_var: "GDRIVE_MCP_URL",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Import income and expense data directly from QuickBooks instead of uploading a CSV.",
    what_it_unlocks: "Auto-import financials — no CSV needed",
    icon: BarChart3,
    color: "text-green-600",
    setup_url: "https://github.com/modelcontextprotocol/servers",
    env_var: "QUICKBOOKS_MCP_URL",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get tax deadline alerts and opportunity notifications sent to a Slack channel.",
    what_it_unlocks: "Deadline alerts + opportunity pings to Slack",
    icon: MessageSquare,
    color: "text-purple-500",
    setup_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
    env_var: "SLACK_MCP_URL",
  },
  {
    id: "supabase",
    name: "Supabase (already connected)",
    description: "Your database is already connected. All analysis data, uploads, and opportunities are stored here.",
    what_it_unlocks: "Storage, history, real-time data",
    icon: Database,
    color: "text-emerald-500",
    setup_url: "",
    env_var: "SUPABASE_URL",
  },
];

export default function MCPConnections() {
  const [customMCPs, setCustomMCPs] = useState<MCPEntry[]>([]);
  const [connectedBuiltIn, setConnectedBuiltIn] = useState<Set<string>>(new Set());
  const [addingCustom, setAddingCustom] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("custom_mcps");
      if (stored) setCustomMCPs(JSON.parse(stored));
      const connected = localStorage.getItem("connected_mcps");
      if (connected) setConnectedBuiltIn(new Set(JSON.parse(connected)));
      // Supabase is always connected
      setConnectedBuiltIn((prev) => new Set([...prev, "supabase"]));
    } catch {}
  }, []);

  const save = (mcps: MCPEntry[], connected: Set<string>) => {
    localStorage.setItem("custom_mcps", JSON.stringify(mcps));
    localStorage.setItem("connected_mcps", JSON.stringify([...connected]));
  };

  const toggleBuiltIn = (id: string) => {
    if (id === "supabase") return; // always on
    setConnectedBuiltIn((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      save(customMCPs, next);
      return next;
    });
  };

  const addCustom = () => {
    if (!newName.trim() || !newUrl.trim()) return;
    const entry: MCPEntry = {
      id: Date.now().toString(),
      name: newName.trim(),
      url: newUrl.trim(),
      status: "pending",
      addedAt: new Date().toLocaleDateString(),
    };
    const updated = [...customMCPs, entry];
    setCustomMCPs(updated);
    save(updated, connectedBuiltIn);
    setNewName(""); setNewUrl(""); setAddingCustom(false);
  };

  const removeCustom = (id: string) => {
    const updated = customMCPs.filter((m) => m.id !== id);
    setCustomMCPs(updated);
    save(updated, connectedBuiltIn);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5">
      <div className="flex items-center gap-2">
        <Plug size={16} className="text-[#00AEEF]" />
        <h3 className="text-sm font-bold text-[#0D1B2A]">MCP Connections</h3>
        <span className="ml-auto text-xs text-gray-400">
          {connectedBuiltIn.size} connected
        </span>
      </div>

      <p className="text-xs text-gray-500">
        Connect MCP (Model Context Protocol) servers to extend what your tax advisor can do — send emails, import data, save files, and more.
      </p>

      {/* Built-in integrations */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Integrations</p>
        {BUILT_IN_MCPS.map((mcp) => {
          const Icon = mcp.icon;
          const isConnected = connectedBuiltIn.has(mcp.id);
          const isAlwaysOn = mcp.id === "supabase";
          return (
            <div
              key={mcp.id}
              className={`rounded-xl border p-4 transition-all ${
                isConnected ? "border-[#00AEEF] bg-blue-50" : "border-gray-100 bg-[#F4F7FE]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Icon size={18} className={mcp.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#0D1B2A]">{mcp.name}</span>
                    {isConnected && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={9} /> Connected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{mcp.description}</p>
                  <p className="text-xs text-[#00AEEF] font-medium mt-1">
                    <Zap size={10} className="inline mr-1" />
                    {mcp.what_it_unlocks}
                  </p>
                  {mcp.env_var && !isAlwaysOn && (
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">
                      env: {mcp.env_var}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!isAlwaysOn && mcp.setup_url && (
                    <a
                      href={mcp.setup_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00AEEF] transition-colors"
                      title="Setup docs"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {!isAlwaysOn && (
                    <button
                      onClick={() => toggleBuiltIn(mcp.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        isConnected
                          ? "bg-white border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500"
                          : "bg-[#00AEEF] text-white hover:bg-[#0096CC]"
                      }`}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom MCP servers */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Custom MCP Servers</p>
          <button
            onClick={() => setAddingCustom(true)}
            className="flex items-center gap-1 text-xs font-semibold text-[#00AEEF] hover:underline"
          >
            <Plus size={13} /> Add server
          </button>
        </div>

        {customMCPs.length === 0 && !addingCustom && (
          <p className="text-xs text-gray-400 py-2 text-center">
            No custom servers connected. Add any MCP-compatible endpoint.
          </p>
        )}

        {customMCPs.map((mcp) => (
          <div key={mcp.id} className="flex items-center gap-3 p-3 bg-[#F4F7FE] rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Plug size={15} className="text-[#00AEEF]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0D1B2A] truncate">{mcp.name}</p>
              <p className="text-xs text-gray-400 font-mono truncate">{mcp.url}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              mcp.status === "connected" ? "bg-emerald-100 text-emerald-700"
              : mcp.status === "error" ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
            }`}>
              {mcp.status}
            </span>
            <button
              onClick={() => removeCustom(mcp.id)}
              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {addingCustom && (
          <div className="border border-[#00AEEF] bg-blue-50 rounded-xl p-4 space-y-3">
            <p className="text-xs font-bold text-[#0D1B2A]">Add Custom MCP Server</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Name</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. My Accounting Tool"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00AEEF] bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Endpoint URL</label>
                <input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://mcp.example.com/sse"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00AEEF] bg-white font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addCustom}
                disabled={!newName.trim() || !newUrl.trim()}
                className="px-4 py-2 bg-[#00AEEF] disabled:bg-gray-200 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Add Server
              </button>
              <button
                onClick={() => { setAddingCustom(false); setNewName(""); setNewUrl(""); }}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-500 text-xs font-semibold rounded-lg hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* How it connects to the agent */}
      <div className="bg-[#F4F7FE] rounded-xl p-4 text-xs text-gray-500 space-y-1.5">
        <p className="font-semibold text-[#0D1B2A]">How MCPs connect to your tax agent</p>
        <p>Connected MCPs appear as tools in the Back2KC tax advisor CLI. To activate them in the agent, add the connection URL to your <span className="font-mono bg-white px-1 py-0.5 rounded text-[#00AEEF]">.env</span> file and restart the agent.</p>
        <p>Example: <span className="font-mono bg-white px-1 py-0.5 rounded text-[#0D1B2A]">GMAIL_MCP_URL=https://...</span></p>
      </div>
    </div>
  );
}
