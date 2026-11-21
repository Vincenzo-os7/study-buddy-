import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 bg-slate-900/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-violet-300 mb-4">
            <span>A Better Learning Paradigm</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Why students abandon traditional courses.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Compare fragmented learning methods with the BuddyStudy prerequisite-aware ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way */}
          <div className="p-8 rounded-3xl bg-slate-950/80 border border-rose-950/40 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">The Traditional Way</h3>
            </div>
            <p className="text-sm text-slate-400">
              Disconnected tutorials, linear syllabi, and constant cognitive overload.
            </p>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span><strong>Tutorial Hell:</strong> Passively watching 40-hour video playlists without verified retention.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span><strong>Skipped Prerequisites:</strong> Hitting advanced topics before understanding foundational math, resulting in imposter syndrome.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span><strong>One-Size-Fits-All:</strong> Complex concepts explained only in dry academic jargon.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span><strong>Vanity Progress:</strong> Fake checkboxes that make you feel productive while real understanding stays at zero.</span>
              </li>
            </ul>
          </div>

          {/* The BuddyStudy Way */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950/30 border border-indigo-500/40 shadow-glow space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded-bl-xl tracking-wider">
              BuddyStudy
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">The BuddyStudy Way</h3>
            </div>
            <p className="text-sm text-slate-300">
              Prerequisite-aware, multi-perspective AI explanations, and evidence-based mastery.
            </p>

            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Topological Ordering:</strong> Clear dependency graph ensures you never hit a wall due to missing foundation.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Adaptive Socratic Explanations:</strong> Understand any topic via ELI5, real-world analogies, or worked examples.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Verified Mastery:</strong> Skills unlock strictly when quizzes confirm comprehension.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Transparent Motivation:</strong> Forgiving streaks, XP for real problem solving, and crystal clear next steps.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
