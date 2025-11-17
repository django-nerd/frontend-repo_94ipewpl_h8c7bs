import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";

export default function TaskPanel({ task, onApprove }) {
  if (!task) return null;
  const statusMap = {
    queued: { icon: Loader2, color: "text-white/80", label: "Queued" },
    running: { icon: Loader2, color: "text-blue-400 animate-spin", label: "Running" },
    succeeded: { icon: CheckCircle2, color: "text-emerald-400", label: "Ready" },
    failed: { icon: AlertTriangle, color: "text-rose-400", label: "Failed" },
    awaiting_approval: { icon: CheckCircle2, color: "text-amber-400", label: "Awaiting approval" },
  };
  const meta = statusMap[task.status] || statusMap["queued"];
  const Icon = meta.icon;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
      <div className="flex items-center gap-2 text-white/80">
        <Icon className={`w-4 h-4 ${meta.color}`} />
        <span className="text-sm">{meta.label}</span>
        <span className="ml-auto text-xs text-white/50">{new Date(task.created_at || Date.now()).toLocaleString()}</span>
      </div>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {task.candidates?.map((c, i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-white/10">
            <img src={c.image} alt={c.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <div className="text-white font-medium line-clamp-2">{c.title}</div>
              <div className="text-white/80 mt-1">${""}{c.price?.toFixed?.(2) ?? c.price}</div>
              <button onClick={() => onApprove(i)} className="mt-3 w-full rounded-md bg-blue-600 text-white py-1.5 hover:bg-blue-500 transition">
                Approve this
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
