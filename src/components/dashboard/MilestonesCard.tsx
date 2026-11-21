"use client";

import React from "react";
import { Flag, CheckCircle2, CircleDashed, Clock } from "lucide-react";
import { RoadmapNode } from "@/lib/types";

interface MilestonesCardProps {
  nodes: RoadmapNode[];
}

export function MilestonesCard({ nodes }: MilestonesCardProps) {
  const milestones = [
    {
      id: "m1",
      stage: 1,
      title: "Foundations Mastery",
      description: "Python, Linear Algebra, Probability, Statistics",
      skills: nodes.filter((n) => n.stage === 1),
    },
    {
      id: "m2",
      stage: 2,
      title: "Core Modeling",
      description: "Data Preprocessing & Supervised Learning",
      skills: nodes.filter((n) => n.stage === 2),
    },
    {
      id: "m3",
      stage: 3,
      title: "Evaluation & Deep Architectures",
      description: "Model Validation & Neural Networks",
      skills: nodes.filter((n) => n.stage === 3),
    },
    {
      id: "m4",
      stage: 4,
      title: "Capstone Engineering",
      description: "Production End-to-End ML Pipeline",
      skills: nodes.filter((n) => n.stage === 4),
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Flag className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Upcoming Milestones</h3>
        </div>
        <span className="text-xs text-indigo-400 font-semibold">Track Roadmap</span>
      </div>

      <div className="space-y-4">
        {milestones.map((m) => {
          const masteredCount = m.skills.filter((s) => s.status === "mastered").length;
          const totalCount = m.skills.length;
          const isComplete = totalCount > 0 && masteredCount === totalCount;
          const inProgress = masteredCount > 0 && !isComplete;

          return (
            <div
              key={m.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                isComplete
                  ? "bg-slate-950 border-emerald-500/30"
                  : inProgress
                  ? "bg-indigo-950/20 border-indigo-500/40"
                  : "bg-slate-950/60 border-slate-800/80 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  {isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : inProgress ? (
                    <CircleDashed className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-600 inline-block" />
                  )}
                  <span>{m.title}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {masteredCount} / {totalCount}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pl-5.5">{m.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
