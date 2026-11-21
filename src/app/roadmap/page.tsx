"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { 
  Network, 
  ListTree, 
  RotateCcw, 
  Sparkles, 
  Compass, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Award,
  Layers,
  ArrowRight
} from "lucide-react";
import { ML_SKILLS, ML_DEPENDENCIES } from "@/lib/data/curriculum";
import { computePersonalizedRoadmap } from "@/lib/engine/graph";
import { getStoredLearner, resetToDemoLearner } from "@/lib/state/learnerStore";
import { RoadmapCanvas } from "@/components/roadmap/RoadmapCanvas";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { SkillDetailDrawer } from "@/components/roadmap/SkillDetailDrawer";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RoadmapNode } from "@/lib/types";

export default function RoadmapPage() {
  const [learner, setLearner] = useState(getStoredLearner());
  const [viewMode, setViewMode] = useState<"graph" | "list">("graph");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  // Sync learner state from storage
  const syncLearner = useCallback(() => {
    setLearner(getStoredLearner());
  }, []);

  useEffect(() => {
    syncLearner();
    window.addEventListener("buddystudy:learner_updated", syncLearner);
    return () => window.removeEventListener("buddystudy:learner_updated", syncLearner);
  }, [syncLearner]);

  // Compute dynamic personalized roadmap
  const roadmapData = useMemo(() => {
    return computePersonalizedRoadmap(ML_SKILLS, ML_DEPENDENCIES, learner.skills);
  }, [learner.skills]);

  // Selected skill object
  const selectedSkill = useMemo(() => {
    if (!selectedSkillId) return null;
    return roadmapData.nodes.find((n) => n.id === selectedSkillId) || null;
  }, [selectedSkillId, roadmapData.nodes]);

  const handleResetDemo = () => {
    resetToDemoLearner();
    syncLearner();
    setSelectedSkillId(null);
  };

  const progressPercentage = Math.round(
    (roadmapData.masteredCount / roadmapData.nodes.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-glow">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Skill Dependency Graph</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Machine Learning Track
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Mastery</span>
            </button>
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Rationale & Next Step Banner */}
        {roadmapData.nextRecommendedSkillId && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/40 shadow-glow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Next Recommended Step
                  </span>
                  <span className="text-[11px] text-slate-500">• Topologically Computed</span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {roadmapData.nextRecommendedReason}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSkillId(roadmapData.nextRecommendedSkillId!)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all active:scale-[0.98] flex-shrink-0"
            >
              <span>Inspect Next Skill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Roadmap Metrics Strip & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Roadmap Progress
              </span>
              <span className="text-base font-bold text-white">
                {roadmapData.masteredCount} / {roadmapData.nodes.length} Skills
              </span>
            </div>

            <div className="w-32 hidden sm:block">
              <ProgressBar value={progressPercentage} showPercentage={true} color="emerald" />
            </div>

            <div className="h-8 w-px bg-slate-800 hidden sm:block" />

            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Estimated Study Effort
              </span>
              <span className="text-base font-bold text-slate-200">
                {Math.round(roadmapData.completedMinutes / 60)}h / {Math.round(roadmapData.totalMinutes / 60)}h
              </span>
            </div>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("graph")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                viewMode === "graph"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Interactive Graph</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Accessible List View</span>
            </button>
          </div>
        </div>

        {/* View Content: Graph Canvas OR Accessible Structured Outline */}
        {viewMode === "graph" ? (
          <RoadmapCanvas
            nodes={roadmapData.nodes}
            edges={ML_DEPENDENCIES}
            onSelectSkill={(id) => setSelectedSkillId(id)}
            selectedSkillId={selectedSkillId || undefined}
          />
        ) : (
          <RoadmapList
            nodes={roadmapData.nodes}
            onSelectSkill={(id) => setSelectedSkillId(id)}
            selectedSkillId={selectedSkillId || undefined}
          />
        )}
      </main>

      {/* Slide-out Skill Detail Drawer */}
      <SkillDetailDrawer
        skill={selectedSkill}
        onClose={() => setSelectedSkillId(null)}
        onMasteryUpdated={syncLearner}
      />
    </div>
  );
}
