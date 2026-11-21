"use client";

import React from "react";
import Link from "next/link";
import { Flame, Zap, Shield, Sparkles } from "lucide-react";
import { LearnerProfile } from "@/lib/types";

interface DashboardHeaderProps {
  learner: LearnerProfile;
}

export function DashboardHeader({ learner }: DashboardHeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Welcome back, {learner.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
              Demo Mode
            </span>
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            Target Track: {learner.targetSpecialization}
          </p>
        </div>

        {/* Stats Pill Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-bold text-white">{learner.streakDays}</span>
            <span className="text-slate-400 hidden sm:inline">Days Streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-white">{learner.xp.toLocaleString()}</span>
            <span className="text-slate-400 hidden sm:inline">XP</span>
          </div>

          <Link
            href="/roadmap"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Roadmap</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
