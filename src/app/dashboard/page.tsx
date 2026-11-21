"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { WeeklyActivityCard } from "@/components/dashboard/WeeklyActivityCard";
import { SkillMasteryCard } from "@/components/dashboard/SkillMasteryCard";
import { MilestonesCard } from "@/components/dashboard/MilestonesCard";
import { ML_SKILLS, ML_DEPENDENCIES } from "@/lib/data/curriculum";
import { computePersonalizedRoadmap } from "@/lib/engine/graph";
import { getStoredLearner } from "@/lib/state/learnerStore";
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  FileCheck2, 
  GraduationCap, 
  Flame, 
  Clock 
} from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function DashboardPage() {
  const [learner, setLearner] = useState(getStoredLearner());

  const syncLearner = useCallback(() => {
    setLearner(getStoredLearner());
  }, []);

  useEffect(() => {
    syncLearner();
    window.addEventListener("buddystudy:learner_updated", syncLearner);
    return () => window.removeEventListener("buddystudy:learner_updated", syncLearner);
  }, [syncLearner]);

  // Compute live personalized roadmap for the learner
  const roadmapData = useMemo(() => {
    return computePersonalizedRoadmap(ML_SKILLS, ML_DEPENDENCIES, learner.skills);
  }, [learner.skills]);

  // Determine active skill to continue: first in-progress, or first available
  const activeSkill = useMemo(() => {
    return (
      roadmapData.nodes.find((n) => n.status === "in_progress") ||
      roadmapData.nodes.find((n) => n.status === "available") ||
      roadmapData.nodes[0]
    );
  }, [roadmapData.nodes]);

  const progressPercentage = Math.round(
    (roadmapData.masteredCount / roadmapData.nodes.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader learner={learner} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl">
          {/* Top Overview Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Profile Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                    Learner Profile
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Demo Mode Active
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{learner.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{learner.targetSpecialization}</p>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Level:</span>
                    <span className="font-semibold capitalize text-white">{learner.currentLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Weekly Target:</span>
                    <span className="font-semibold text-white">6 Hours / Week</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <Link
                  href="/onboarding"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Retake Diagnostic Assessment →</span>
                </Link>
              </div>
            </div>

            {/* Overall Learning Progress */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    Overall Mastery
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {progressPercentage}% Completed
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-1">
                  {roadmapData.masteredCount}{" "}
                  <span className="text-sm font-medium text-slate-400">
                    of {roadmapData.nodes.length} skills mastered
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  {Math.round(roadmapData.completedMinutes / 60)} hours invested •{" "}
                  {Math.round((roadmapData.totalMinutes - roadmapData.completedMinutes) / 60)} hours remaining
                </p>
                <ProgressBar value={progressPercentage} showPercentage={false} color="emerald" />
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Prerequisite Engine:</span>
                <span className="text-emerald-400 font-semibold">100% Validated</span>
              </div>
            </div>

            {/* Recommended Next Action */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    Recommended Next Action
                  </span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  {roadmapData.nextRecommendedReason || "Continue your roadmap journey."}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Topological sorting guarantees that all required foundational math and programming prerequisites are satisfied.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <Link
                  href="/roadmap"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Inspect Skill on Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Continue Learning & Weekly Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <ContinueLearningCard activeSkill={activeSkill} />
            </div>
            <div className="lg:col-span-5">
              <WeeklyActivityCard />
            </div>
          </div>

          {/* Skill Mastery Breakdown & Milestones Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <SkillMasteryCard nodes={roadmapData.nodes} />
            </div>
            <div className="lg:col-span-6">
              <MilestonesCard nodes={roadmapData.nodes} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
