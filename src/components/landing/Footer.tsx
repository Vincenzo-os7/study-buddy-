import React from "react";
import Link from "next/link";
import { Network, Heart, Shield, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-glow">
                <Network className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">BuddyStudy</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered student learning ecosystem. Personal roadmaps built on rigorous prerequisite graph validation and adaptive explanations.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>WCAG 2.2 AA Accessible Design</span>
            </div>
          </div>

          {/* Core Domains */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Curated Domains
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/onboarding" className="hover:text-white transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-white transition-colors">
                  Full-Stack Web Development
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-white transition-colors">
                  Data Analytics & SQL
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-white transition-colors">
                  Cybersecurity Fundamentals
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Features */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#roadmap-preview" className="hover:text-white transition-colors">
                  Skill Dependency Graph
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Demo Dashboard
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Diagnostic Quiz
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Adaptive AI Companion
                </a>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-white transition-colors">
                  Interactive Graph
                </Link>
              </li>
            </ul>
          </div>

          {/* Pedagogy & Principles */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Learning Principles
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Prerequisite Correctness</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Evidence-Based Mastery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>No Shame or Vanity Streaks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Honest, Transparent AI</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 BuddyStudy. Built for student conceptual mastery.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Privacy & Security</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Open Curricula</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
