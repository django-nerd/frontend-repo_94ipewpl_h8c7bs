import { Settings, Play, Store } from "lucide-react";

export default function BotCard({ bot, onRun, onEdit }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4 hover:border-blue-500/30 transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold">{bot.name}</h3>
          <p className="text-xs text-white/60 mt-1">{bot.goals || "Shopping assistant"}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
            <Store className="w-3.5 h-3.5" />
            <span>{(bot.retailers || []).join(", ") || "amazon"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onRun(bot)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-500 transition">
            <Play className="w-4 h-4" />
            Run
          </button>
          <button onClick={() => onEdit(bot)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-white/80 hover:bg-white/5 transition">
            <Settings className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
