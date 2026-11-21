import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Network, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-violet-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Product Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-medium text-indigo-300 mb-8 shadow-inner animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Deterministic Skill Dependency Graph & Adaptive AI Companion</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] sm:leading-[1.1]">
          Stop guessing what to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-violet-400">
            learn next.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Your personal AI learning companion. Understand difficult concepts, discover your skill gaps, and follow a roadmap built around your goals.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="px-7 py-4 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow flex items-center gap-2.5 transition-all transform active:scale-[0.98] group"
          >
            <span>Build My Learning Path</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#roadmap-preview"
            className="px-7 py-4 text-base font-semibold rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all shadow-sm"
          >
            Explore Interactive Graph
          </a>
          <Link
            href="/dashboard"
            className="px-5 py-4 text-base font-medium rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 transition-colors"
          >
            View Demo Dashboard →
          </Link>
        </div>

        {/* Social Proof & Trust Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/60 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Topological Kahn's Algorithm</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Prerequisite Gap Diagnostics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Structured Socratic AI Explanations</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>No Fake Checkboxes or Vanity Fluff</span>
          </div>
        </div>
      </div>
    </section>
  );
}
