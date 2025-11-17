import { ShoppingCart, Bot, Search, Plus } from "lucide-react";

export default function Navbar({ onCreateBot }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold">ShopBots</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onCreateBot} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-500 transition">
            <Plus className="w-4 h-4" />
            New Bot
          </button>
          <button className="ml-2 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-white/80 hover:bg-white/5 transition">
            <ShoppingCart className="w-4 h-4" />
            Cart
          </button>
        </div>
      </div>
    </header>
  );
}
