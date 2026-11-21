"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RoadmapNode } from "@/lib/types";
import { StatusBadge } from "@/components/ui/Badge";
import { 
  X, 
  ArrowRight, 
  Check, 
  Lock, 
  Sparkles, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  FileQuestion,
  HelpCircle
} from "lucide-react";
import { updateSkillInStore } from "@/lib/state/learnerStore";

interface SkillDetailDrawerProps {
  skill: RoadmapNode | null;
  onClose: () => void;
  onMasteryUpdated?: () => void;
}

export function SkillDetailDrawer({
  skill,
  onClose,
  onMasteryUpdated,
}: SkillDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<"standard" | "simple" | "analogy">("standard");
  const [markingMastered, setMarkingMastered] = useState(false);

  // Keyboard Escape listener (WCAG 2.1.2)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!skill) return null;

  const handleSimulateMastery = () => {
    setMarkingMastered(true);
    updateSkillInStore(skill.id, 92, "mastered");
    setTimeout(() => {
      setMarkingMastered(false);
      if (onMasteryUpdated) onMasteryUpdated();
    }, 400);
  };

  return (
    <>
      {/* Accessible Backdrop Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-drawer-title"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-slate-950 border-l border-slate-800 shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-200"
      >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            Stage {skill.stage} • {skill.level.toUpperCase()}
          </span>
          <StatusBadge status={skill.status} />
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
          aria-label="Close detail drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Title & Description */}
      <h2 id="skill-drawer-title" className="text-2xl font-bold text-white mb-2">
        {skill.name}
      </h2>
      <p className="text-sm text-slate-300 leading-relaxed mb-6">
        {skill.description}
      </p>

      {/* Rationale Banner */}
      {skill.unlockReason && (
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Why is this skill recommended?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {skill.unlockReason}
          </p>
        </div>
      )}

      {/* Prerequisites Verification */}
      <div className="mb-6 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Prerequisite Dependencies
        </h4>
        {skill.prerequisites.length === 0 ? (
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-400 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Foundational Node: No prior prerequisites required.</span>
          </div>
        ) : (
          <div className="space-y-2">
            {skill.prerequisites.map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white block">{p.skillName}</span>
                  <span className="text-[11px] text-slate-400">{p.reason}</span>
                </div>
                {p.isSatisfied ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                    <Check className="w-3.5 h-3.5" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
                    <Lock className="w-3.5 h-3.5" />
                    Required
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Learning Objectives */}
      <div className="mb-6 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Key Learning Objectives
        </h4>
        <ul className="space-y-2 text-xs text-slate-300">
          {skill.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Adaptive AI Explanation Tabs */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Conceptual Explanation
          </h4>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab("standard")}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                activeTab === "standard" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setActiveTab("simple")}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                activeTab === "simple" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              ELI5
            </button>
            <button
              onClick={() => setActiveTab("analogy")}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                activeTab === "analogy" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Analogy
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {activeTab === "standard" && <p>{skill.explanation.standard}</p>}
          {activeTab === "simple" && <p>{skill.explanation.simplified}</p>}
          {activeTab === "analogy" && <p>“{skill.explanation.analogy}”</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <Link
          href={`/learn/${skill.id}`}
          className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Full Skill Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {skill.status !== "mastered" && (
          <button
            onClick={handleSimulateMastery}
            disabled={markingMastered}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{markingMastered ? "Updating Graph..." : "Simulate Quiz Mastery (Pass with 92%)"}</span>
          </button>
        )}
      </div>
    </div>
    </>
  );
}
