import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import BotCard from "./components/BotCard.jsx";
import BotBuilder from "./components/BotBuilder.jsx";
import TaskPanel from "./components/TaskPanel.jsx";

const API = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [user, setUser] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [bots, setBots] = useState([]);
  const [task, setTask] = useState(null);

  useEffect(() => {
    // bootstrap: create or fetch demo user
    async function bootstrap() {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@shopbots.ai", name: "Demo User" }),
      });
      const u = await res.json();
      setUser(u);

      const r = await fetch(`${API}/api/retailers`);
      const rj = await r.json();
      setRetailers(rj.supported || []);

      const bl = await fetch(`${API}/api/bots?user_id=${u.id}`);
      const bj = await bl.json();
      setBots(bj);
    }
    bootstrap();
  }, []);

  const handleCreateBot = () => {
    // scroll to builder
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" });
  };

  const onBotSaved = async (bot) => {
    const bl = await fetch(`${API}/api/bots?user_id=${user.id}`);
    const bj = await bl.json();
    setBots(bj);
  };

  const runBot = async (bot) => {
    const res = await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, bot_id: bot.id, prompt: bot.goals || "find best deals" }),
    });
    const data = await res.json();
    setTask(data);
  };

  const approve = async (index) => {
    const res = await fetch(`${API}/api/tasks/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id: task.id, index }),
    });
    const data = await res.json();
    setTask(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar onCreateBot={handleCreateBot} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Shopping Bots</h1>
            <p className="text-white/60">Configure bots that shop for you using AI actions</p>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bots.map((b) => (
            <BotCard key={b.id} bot={b} onRun={runBot} onEdit={() => {}} />
          ))}
          {bots.length === 0 && (
            <div className="col-span-full text-white/60">No bots yet — create your first one below.</div>
          )}
        </section>

        <section id="builder" className="space-y-4">
          <h2 className="text-xl font-semibold">Create a new bot</h2>
          {user && <BotBuilder user={user} retailers={retailers} onSaved={onBotSaved} />}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Latest task</h2>
          {!task && <div className="text-white/60">Run a bot to see candidate products here.</div>}
          {task && <TaskPanel task={task} onApprove={approve} />}
        </section>
      </main>

      <footer className="py-8 text-center text-white/50 text-sm">Made with ❤️ — ACP integration ready</footer>
    </div>
  );
}
