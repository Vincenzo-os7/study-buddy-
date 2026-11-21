"use client";

import React from "react";
import { RoadmapNode } from "@/lib/types";
import { StatusBadge } from "@/components/ui/Badge";
import { Clock, Check, Lock, ChevronRight, Layers } from "lucide-react";

interface RoadmapListProps {
  nodes: RoadmapNode[];
  onSelectSkill: (skillId: string) => void;
  selectedSkillId?: string;
}

export function RoadmapList({
  nodes,
  onSelectSkill,
  selectedSkillId,
}: RoadmapListProps) {
  // Group nodes by stage
  const stages: { stage: number; title: string; nodes: RoadmapNode[] }[] = [
    {
      stage: 1,
      title: "Stage 1: Mathematical & Programming Foundations",
      nodes: nodes.filter((n) => n.stage === 1),
    },
    {
      stage: 2,
      title: "Stage 2: Core Data Preprocessing & Modeling",
      nodes: nodes.filter((n) => n.stage === 2),
    },
    {
      stage: 3,
      title: "Stage 3: Advanced Architectures & Model Evaluation",
      nodes: nodes.filter((n) => n.stage === 3),
    },
    {
      stage: 4,
      title: "Stage 4: Real-World Production Projects",
      nodes: nodes.filter((n) => n.stage === 4),
    },
  ];

  return (
    <div
      role="region"
      aria-label="Accessible Skill Roadmap Outline"
      className="space-y-6"
    >
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Screen-reader accessible structured outline view. Ordered by topological prerequisite sequence.</span>
        </span>
        <span>{nodes.length} Total Skills</span>
      </div>

      {stages.map((stg) => (
        <section
          key={stg.stage}
          aria-labelledby={`stage-heading-${stg.stage}`}
          className="space-y-3"
        >
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-500/20">
              Stage {stg.stage}
            </span>
            <h3
              id={`stage-heading-${stg.stage}`}
              className="text-sm font-semibold text-white"
            >
              {stg.title}
            </h3>
          </div>

          <div className="space-y-2">
            {stg.nodes.map((skill) => {
              const isSelected = skill.id === selectedSkillId;
              return (
                <div
                  key={skill.id}
                  onClick={() => onSelectSkill(skill.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectSkill(skill.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${skill.name}. Status: ${skill.status}. Effort: ${Math.round(
                    skill.estimatedMinutes / 60
                  )} hours.`}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-slate-850 border-indigo-500 shadow-glow"
                      : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold text-white">{skill.name}</h4>
                      <StatusBadge status={skill.status} />
                    </div>
                    <p className="text-xs text-slate-400 max-w-2xl">{skill.description}</p>
                    {skill.unlockReason && (
                      <p className="text-[11px] text-indigo-300 pt-1">
                        Rationale: {skill.unlockReason}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {Math.round(skill.estimatedMinutes / 60)}h
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {skill.level}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
