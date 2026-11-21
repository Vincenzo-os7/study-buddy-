"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Settings, 
  ArrowLeft, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Database,
  Layers
} from "lucide-react";
import { DomainId } from "@/lib/types";
import { getStoredLearner, saveStoredLearner, resetToDemoLearner } from "@/lib/state/learnerStore";

const DOMAINS: { id: DomainId; name: string; desc: string }[] = [
  { id: "machine-learning", name: "Machine Learning", desc: "Topological math, preprocessing, supervised learning, and neural networks." },
  { id: "web-development", name: "Full-Stack Web Development", desc: "TypeScript, React 19 architecture, REST/GraphQL APIs, and server actions." },
  { id: "data-analytics", name: "Data Analytics", desc: "Spreadsheet modeling, SQL queries & joins, data cleaning, and BI reporting." },
  { id: "cybersecurity", name: "Cybersecurity Fundamentals", desc: "Networking protocols, Linux architecture, defensive operations, and app security." },
];

export default function SettingsPage() {
  const [learner, setLearner] = useState(getStoredLearner());
  const [targetDomain, setTargetDomain] = useState<DomainId>(learner.targetDomain);
  const [weeklyHours, setWeeklyHours] = useState(Math.round(learner.weeklyStudyMinutes / 60));
  const [currentLevel, setCurrentLevel] = useState(learner.currentLevel);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setLearner(getStoredLearner());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...learner,
      targetDomain,
      currentLevel,
      weeklyStudyMinutes: weeklyHours * 60,
      updatedAt: new Date().toISOString(),
    };
    saveStoredLearner(updated);
    setLearner(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    const fresh = resetToDemoLearner();
    setLearner(fresh);
    setTargetDomain(fresh.targetDomain);
    setWeeklyHours(Math.round(fresh.weeklyStudyMinutes / 60));
    setCurrentLevel(fresh.currentLevel);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">
                  Settings & Preferences
                </h1>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Settings Form */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Target Track & Domain Selection */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              Active Learning Domain
            </h3>
            <p className="text-xs text-slate-400">
              Switching domains reconfigures your active prerequisite skill dependency graph.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DOMAINS.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setTargetDomain(d.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    targetDomain === d.id
                      ? "bg-indigo-950/40 border-indigo-500 text-white shadow-glow"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{d.name}</span>
                    {targetDomain === d.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Study Availability & Level */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              Study Pace & Experience Level
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                  Weekly Study Target (Hours)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="flex-1 accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-sm font-mono font-bold text-white w-14 text-right">
                    {weeklyHours}h/wk
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                  Self-Reported Experience
                </label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value as "beginner" | "intermediate" | "advanced")}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800"
                >
                  <option value="beginner">Beginner (Starting with Foundations)</option>
                  <option value="intermediate">Intermediate (Familiar with Core Math & Syntax)</option>
                  <option value="advanced">Advanced (Focused on Production Deployments)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button & Feedback */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {savedSuccess && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Preferences updated successfully!
                </span>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

        {/* Danger Zone / Reset State */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-rose-950/40 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-rose-400">Reset Demo Learning Data</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Resets all local mastery scores, diagnostic quiz results, and streak data back to clean factory state.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-950/40 text-rose-400 border border-rose-900/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
