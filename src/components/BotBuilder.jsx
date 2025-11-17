import { useEffect, useState } from "react";
import { Save, Store, ShieldCheck } from "lucide-react";

export default function BotBuilder({ user, retailers, onSaved }) {
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [selectedRetailers, setSelectedRetailers] = useState(["amazon"]);
  const [approvalMode, setApprovalMode] = useState("manual");

  const toggleRetailer = (r) => {
    setSelectedRetailers((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const save = async () => {
    const payload = {
      user_id: user.id,
      name,
      goals,
      retailers: selectedRetailers,
      constraints: { approval_mode: approvalMode },
    };
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    onSaved?.(data);
    setName("");
    setGoals("");
    setSelectedRetailers(["amazon"]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
      <div className="flex items-center gap-2 text-white/80 mb-3">
        <Store className="w-4 h-4" />
        <span className="text-sm">Create a bot</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/60 mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Deal Hunter"
            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Goals</label>
          <input value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="e.g. Find the best 4K TV under $800"
            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-white/60 mb-1">Retailers</label>
          <div className="flex flex-wrap gap-2">
            {retailers?.map((r) => (
              <button key={r} onClick={() => toggleRetailer(r)} className={`px-3 py-1.5 rounded-md border text-sm transition ${selectedRetailers.includes(r) ? "bg-blue-600 text-white border-blue-500" : "border-white/10 text-white/70 hover:bg-white/5"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-white/60 mb-1">Approval</label>
          <div className="flex gap-3 text-sm text-white/80">
            <label className="inline-flex items-center gap-2">
              <input type="radio" className="accent-blue-500" checked={approvalMode === "manual"} onChange={() => setApprovalMode("manual")} />
              Manual approval
            </label>
            <label className="inline-flex items-center gap-2 opacity-60">
              <input type="radio" className="accent-blue-500" disabled />
              Auto-purchase (soon)
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-500 transition">
          <Save className="w-4 h-4" />
          Save Bot
        </button>
      </div>
    </div>
  );
}
