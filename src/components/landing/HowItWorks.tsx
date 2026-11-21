import React from "react";
import { ClipboardCheck, Network, BrainCircuit, Unlock, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Select Goal & Take Diagnostic",
    description: "Choose your target domain. Take a fast 5-minute diagnostic quiz to identify what you already know and where your prerequisite gaps lie.",
    icon: ClipboardCheck,
    tag: "Gap Discovery",
  },
  {
    step: "02",
    title: "Generate Prerequisite Graph",
    description: "Our deterministic graph engine resolves dependencies using Kahn's topological sort. No gaps, no guesswork, and zero unearned jumps.",
    icon: Network,
    tag: "Topological Sort",
  },
  {
    step: "03",
    title: "Learn with Adaptive AI",
    description: "Open the skill workspace. Switch between Simple ELI5 explanations, real-world analogies, step-by-step worked solutions, and key terms.",
    icon: BrainCircuit,
    tag: "Socratic Companion",
  },
  {
    step: "04",
    title: "Demonstrate Mastery & Unlock",
    description: "Complete formative practice quizzes. Scoring 70%+ satisfies the prerequisite condition and automatically unlocks the next nodes in your graph.",
    icon: Unlock,
    tag: "Evidence-Based Unlock",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <span>The BuddyStudy Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            From initial gap discovery to verified domain mastery in 4 pedagogical steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between group hover:border-indigo-500/50 hover:bg-slate-900 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-700 group-hover:text-indigo-400/80 transition-colors font-mono">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                      {item.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-16 text-center">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow transition-all"
          >
            <span>Start Step 1: Diagnose Your Level</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
