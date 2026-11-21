"use client";

import React from "react";
import Link from "next/link";
import { RoadmapNode } from "@/lib/types";
import { PlayCircle, ArrowRight, Clock, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";

interface ContinueLearningCardProps {
  activeSkill?: RoadmapNode;
}

export function ContinueLearningCard({ activeSkill }: ContinueLearningCardProps) {
  if (!activeSkill) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-2">You are all caught up!</h3>
        <p className="text-xs text-slate-400">All available roadmap skills are completed.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 shadow-glow relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Continue Learning
            </span>
          </div>
          <StatusBadge status={activeSkill.status} />
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-snug">
          {activeSkill.name}
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {activeSkill.description}
        </p>

        {activeSkill.unlockReason && (
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-indigo-300 mb-6 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <span>{activeSkill.unlockReason}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
        <span className="text-xs text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          Estimated effort: {Math.round(activeSkill.estimatedMinutes / 60)} hours
        </span>

        <Link
          href={`/learn/${activeSkill.id}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all active:scale-[0.98]"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Resume Skill Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
