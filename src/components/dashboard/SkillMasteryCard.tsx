"use client";

import React from "react";
import { CheckCircle2, PlayCircle, Unlock, Lock, AlertCircle, PieChart } from "lucide-react";
import { RoadmapNode } from "@/lib/types";

interface SkillMasteryCardProps {
  nodes: RoadmapNode[];
}

export function SkillMasteryCard({ nodes }: SkillMasteryCardProps) {
  const counts = {
    mastered: nodes.filter((n) => n.status === "mastered").length,
    in_progress: nodes.filter((n) => n.status === "in_progress").length,
    available: nodes.filter((n) => n.status === "available").length,
    locked: nodes.filter((n) => n.status === "locked").length,
    needs_review: nodes.filter((n) => n.status === "needs_review").length,
  };

  const total = nodes.length;

  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Skill Mastery Breakdown</h3>
        </div>
        <span className="text-xs text-slate-400">{total} Tracked Skills</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
          <span className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mastered (70%+ Score)</span>
          </span>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            {counts.mastered} / {total}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
          <span className="flex items-center gap-2 text-xs text-slate-300">
            <PlayCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>In Progress</span>
          </span>
          <span className="text-xs font-bold text-indigo-400 font-mono">
            {counts.in_progress} / {total}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
          <span className="flex items-center gap-2 text-xs text-slate-300">
            <Unlock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Available to Start</span>
          </span>
          <span className="text-xs font-bold text-cyan-400 font-mono">
            {counts.available} / {total}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 opacity-70">
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Prerequisites Locked</span>
          </span>
          <span className="text-xs font-bold text-slate-400 font-mono">
            {counts.locked} / {total}
          </span>
        </div>

        {counts.needs_review > 0 && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
            <span className="flex items-center gap-2 text-xs text-amber-300">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Needs Review</span>
            </span>
            <span className="text-xs font-bold text-amber-400 font-mono">
              {counts.needs_review}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
