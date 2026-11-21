"use client";

import React, { useState } from "react";
import { 
  Network, 
  BrainCircuit, 
  CheckCircle2, 
  Flame, 
  BookMarked, 
  ShieldCheck, 
  Lightbulb, 
  Code2, 
  FileQuestion,
  HelpCircle
} from "lucide-react";

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<"dag" | "ai" | "diagnostic" | "motivation">("dag");

  return (
    <section id="features" className="py-24 bg-slate-900/50 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-4">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            <span>Built For Deep Academic Understanding</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Designed for how humans actually learn.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Education fails when students skip prerequisites or get trapped in passive video loops. BuddyStudy combines graph theory with socratic AI tutoring.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Core Educational Features"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          <button
            role="tab"
            id="feature-tab-dag"
            aria-selected={activeTab === "dag"}
            aria-controls="feature-panel-dag"
            onClick={() => setActiveTab("dag")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "dag"
                ? "bg-indigo-600 text-white shadow-glow border border-indigo-500"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Topological Skill Graph</span>
          </button>

          <button
            role="tab"
            id="feature-tab-ai"
            aria-selected={activeTab === "ai"}
            aria-controls="feature-panel-ai"
            onClick={() => setActiveTab("ai")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "ai"
                ? "bg-indigo-600 text-white shadow-glow border border-indigo-500"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Adaptive AI Explanations</span>
          </button>

          <button
            role="tab"
            id="feature-tab-diagnostic"
            aria-selected={activeTab === "diagnostic"}
            aria-controls="feature-panel-diagnostic"
            onClick={() => setActiveTab("diagnostic")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "diagnostic"
                ? "bg-indigo-600 text-white shadow-glow border border-indigo-500"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <FileQuestion className="w-4 h-4" />
            <span>Diagnostic Gap Analysis</span>
          </button>

          <button
            role="tab"
            id="feature-tab-motivation"
            aria-selected={activeTab === "motivation"}
            aria-controls="feature-panel-motivation"
            onClick={() => setActiveTab("motivation")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "motivation"
                ? "bg-indigo-600 text-white shadow-glow border border-indigo-500"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Honest Motivation & Momentum</span>
          </button>
        </div>

        {/* Active Tab Card Content */}
        <div
          role="tabpanel"
          id={`feature-panel-${activeTab}`}
          aria-labelledby={`feature-tab-${activeTab}`}
          className="rounded-3xl bg-slate-950 border border-slate-800 p-8 sm:p-12 shadow-card"
        >
          {activeTab === "dag" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                  Graph Theory In Action
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Never attempt advanced topics before your foundations are solid.
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Traditional curricula assume every student starts from scratch or finishes in lockstep. BuddyStudy calculates strict prerequisite dependencies using Kahn&apos;s topological sort algorithm, ensuring zero cyclic deadlocks and 100% prerequisite validity.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">Strict Prerequisite Integrity:</strong> Advanced concepts remain locked until prerequisite scores cross the 70% mastery threshold.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">&ldquo;Why This Next?&rdquo; Rationale:</strong> Every suggested lesson provides transparent reasoning on why it matters and what it unlocks.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">Accessible Dual Representation:</strong> Switch seamlessly between an interactive visual graph and a clean, screen-reader friendly structured outline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Graphic Representation */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span>Prerequisite Dependency Resolution</span>
                  <span className="text-emerald-400 font-mono">Status: Topologically Sorted</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-indigo-300">1. Python Foundations</span>
                    <span className="text-emerald-400 font-semibold">Mastered (92%)</span>
                  </div>
                  <div className="flex justify-center text-slate-600">↓</div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-indigo-300">2. Linear Algebra</span>
                    <span className="text-emerald-400 font-semibold">Mastered (85%)</span>
                  </div>
                  <div className="flex justify-center text-slate-600">↓</div>
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/40 flex items-center justify-between">
                    <span className="text-cyan-300">3. Supervised Learning</span>
                    <span className="text-cyan-400 font-semibold">Ready to Learn (Unlocked)</span>
                  </div>
                  <div className="flex justify-center text-slate-600">↓</div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 flex items-center justify-between opacity-50">
                    <span className="text-slate-400">4. Neural Networks</span>
                    <span className="text-slate-500 font-semibold">Locked by #3</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                  Adaptive AI Companion
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Break through complex mental blocks with multi-mode explanations.
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Stuck on a tricky concept like eigenvectors or backpropagation? One static textbook explanation isn&apos;t enough. BuddyStudy adapts the explanation mode to your preferred cognitive model.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="text-xs font-bold text-indigo-300 mb-1">Explain Simply (ELI5)</h5>
                    <p className="text-xs text-slate-400">Jargon-free intuition without academic fog.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="text-xs font-bold text-cyan-300 mb-1">Real-World Analogy</h5>
                    <p className="text-xs text-slate-400">Anchor abstract math to everyday physics or daily life.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="text-xs font-bold text-emerald-300 mb-1">Step-by-Step Worked Example</h5>
                    <p className="text-xs text-slate-400">Concrete calculation walked through line-by-line.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="text-xs font-bold text-amber-300 mb-1">Common Misconceptions</h5>
                    <p className="text-xs text-slate-400">Debunk the trap answers where 90% of students stumble.</p>
                  </div>
                </div>
              </div>

              {/* Chat Simulation */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">
                    BS
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">BuddyStudy AI Companion</h5>
                    <span className="text-[10px] text-emerald-400">Active • Context-Aware</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 max-w-[85%] text-slate-300">
                    <strong className="text-white block mb-1">Student:</strong>
                    I still don&apos;t get what Gradient Descent is actually doing. Can you give me an analogy?
                  </div>
                  <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 max-w-[90%] ml-auto text-slate-200 space-y-2">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                      Analogy Explanation:
                    </span>
                    <p>
                      Imagine you are blindfolded on a foggy mountain and want to reach the lowest valley. You cannot see the map, but you can feel the slope under your feet with each step.
                    </p>
                    <p className="text-slate-400">
                      You take a small step in whatever direction slopes downwards the steepest. That step size is the <strong>learning rate</strong>, and the downward slope is the <strong>negative gradient</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "diagnostic" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  Diagnostic Gap Analysis
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Diagnose what you already know in 5 minutes.
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Don&apos;t waste weeks re-learning what you already know. Our diagnostic assessments evaluate conceptual and prerequisite understanding to position you at the exact optimal starting node in the graph.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">Conceptual Testing:</strong> Evaluates mental models, not just memorized syntax.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">Flagged for Review:</strong> Uncertain answers are marked as &ldquo;needs review&rdquo; rather than penalizing learner confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span>Diagnostic Results Preview</span>
                  <span className="text-indigo-400 font-semibold">Web Development Track</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span>HTML5 & CSS Semantics</span>
                    <span className="text-emerald-400 font-semibold">100% (Fast-Tracked)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span>JavaScript Async / Promises</span>
                    <span className="text-amber-400 font-semibold">50% (Needs Review)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span>React State & Effects</span>
                    <span className="text-slate-400 font-semibold">Locked by JS Async</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "motivation" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                  Motivation Without Shame
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Achievable milestones, forgiving streaks, and real progress.
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Life happens. Traditional apps punish missed days by resetting streaks to zero, destroying learner momentum. BuddyStudy provides forgiving streak recovery and rewards genuine mastery, not addictive click loops.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">Forgiving Streak Freeze:</strong> One missed session doesn&apos;t erase months of dedication.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <strong className="text-white">XP Tied to Real Mastery:</strong> Earn points only by demonstrating comprehension through practice and quizzes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span>Student Progress Snapshot</span>
                  <span className="text-amber-400 font-semibold">🔥 7-Day Streak Active</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-bold text-white">1,450</div>
                    <div className="text-xs text-slate-400 mt-1">Total XP Earned</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-bold text-emerald-400">8 / 12</div>
                    <div className="text-xs text-slate-400 mt-1">Skills Mastered</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
