"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Compass, 
  Sparkles, 
  FileCheck2, 
  BookMarked, 
  Settings, 
  Network,
  RotateCcw,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { resetToDemoLearner } from "@/lib/state/learnerStore";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Skill Roadmap", href: "/roadmap", icon: Compass },
  { name: "AI Companion", href: "/assistant", icon: Sparkles },
  { name: "Diagnostic Quiz", href: "/onboarding", icon: FileCheck2 },
  { name: "Personal Notes", href: "/notes", icon: BookMarked },
  { name: "Settings & Goals", href: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const handleReset = () => {
    resetToDemoLearner();
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col justify-between p-4 hidden md:flex">
      <div className="space-y-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-glow">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              BuddyStudy
            </span>
            <span className="block text-[10px] -mt-1 font-semibold uppercase tracking-wider text-indigo-400">
              Student Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1.5" aria-label="Dashboard Sidebar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-glow"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Demo Box */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
              AC
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">Alex Chen</span>
              <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                <span>Demo Account</span>
              </span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-1.5 text-[11px] font-medium text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo State</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
          <span>AI Engine: Socratic v2</span>
          <span>DAG Kahn Sort</span>
        </div>
      </div>
    </aside>
  );
}
