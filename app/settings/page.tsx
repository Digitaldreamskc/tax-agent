import MCPConnections from "@/components/MCPConnections";
import { Settings, User, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A]">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account, preferences, and connected services</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <User size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Profile</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Jessica Powell" },
            { label: "Business Name", value: "Back2KC" },
            { label: "Email", value: "jessica@back2kc.com" },
            { label: "State", value: "Missouri (MO)" },
            { label: "Business Type", value: "Sole Proprietor" },
            { label: "Tax Year", value: "2025" },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-xs text-gray-400 mb-1">{f.label}</p>
              <input
                defaultValue={f.value}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F7FE] text-sm text-[#0D1B2A] border border-transparent focus:border-[#00AEEF] focus:outline-none transition-all"
              />
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-[#00AEEF] hover:bg-[#0096CC] text-white text-sm font-semibold rounded-xl transition-colors">
          Save Changes
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} className="text-[#00AEEF]" />
          <h3 className="text-sm font-bold text-[#0D1B2A]">Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Tax deadline reminders", sub: "30, 14, and 7 days before due date", on: true },
            { label: "New opportunity alerts", sub: "When new savings opportunities are found", on: true },
            { label: "Document processing", sub: "When uploads finish processing", on: true },
            { label: "Monthly summary", sub: "Monthly P&L summary email", on: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold text-[#0D1B2A]">{item.label}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
              <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${item.on ? "bg-[#00AEEF]" : "bg-gray-200"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.on ? "translate-x-6" : "translate-x-1"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Connections — client component */}
      <MCPConnections />
    </div>
  );
}
