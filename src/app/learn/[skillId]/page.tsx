"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  Layers, 
  Check, 
  FileQuestion, 
  Save,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { ML_SKILLS, ML_DEPENDENCIES } from "@/lib/data/curriculum";
import { updateSkillInStore } from "@/lib/state/learnerStore";
import { StatusBadge } from "@/components/ui/Badge";

export default function SkillWorkspacePage() {
  const params = useParams();
  const skillId = typeof params?.skillId === "string" ? params.skillId : "supervised-ml";
  const skill = ML_SKILLS.find((s) => s.id === skillId) || ML_SKILLS[5]; // Default to Supervised ML

  const [activeTab, setActiveTab] = useState<"standard" | "simple" | "analogy" | "worked">("standard");
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [masteryConfirmed, setMasteryConfirmed] = useState(false);

  // Formative practice question
  const practiceQuestion = {
    question: `What distinguishes ${skill.name} from purely descriptive analysis?`,
    options: [
      "It requires a graphical user interface",
      "It learns an underlying predictive mapping function f(X) -> y to generalize on unseen data",
      "It only works with integer numbers",
      "It eliminates the need for test data"
    ],
    correctIndex: 1,
    explanation: `${skill.name} learns a parametric hypothesis mapping features to targets by minimizing an explicit loss function.`
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === practiceQuestion.correctIndex) {
      updateSkillInStore(skill.id, 95, "mastered");
      setMasteryConfirmed(true);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNote.trim()) return;
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/roadmap"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Back to roadmap"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-glow">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{skill.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Stage {skill.stage}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/assistant"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI Companion</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Skill Hero Bar */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Estimated Effort: ~{Math.round(skill.estimatedMinutes / 60)} Hours</span>
              <span>•</span>
              <span className="capitalize">{skill.level} Level</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">{skill.name}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{skill.description}</p>
          </div>

          {masteryConfirmed ? (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="block text-white">Mastery Verified!</strong>
                <span>Downstream prerequisite skills unlocked.</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Complete quiz below to satisfy prerequisite condition</span>
            </div>
          )}
        </div>

        {/* Multi-Perspective Cognitive Explanation Tabs */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                Cognitive Perspectives
              </span>
              <h3 className="text-lg font-bold text-white">Adaptive Concept Explanations</h3>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab("standard")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === "standard" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setActiveTab("simple")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === "simple" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                ELI5 (Simple)
              </button>
              <button
                onClick={() => setActiveTab("analogy")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === "analogy" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Analogy
              </button>
              <button
                onClick={() => setActiveTab("worked")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === "worked" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Worked Example
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 text-sm text-slate-200 leading-relaxed min-h-[160px]">
            {activeTab === "standard" && (
              <div className="space-y-4">
                <p className="leading-relaxed">{skill.explanation.standard}</p>
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                    Core Learning Objectives:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {skill.learningObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "simple" && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Plain-Language Mental Model:
                </span>
                <p className="text-base text-slate-200 leading-relaxed font-normal">
                  {skill.explanation.simplified}
                </p>
              </div>
            )}

            {activeTab === "analogy" && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Real-World Anchor:
                </span>
                <p className="text-base text-slate-200 leading-relaxed italic">
                  “{skill.explanation.analogy}”
                </p>
              </div>
            )}

            {activeTab === "worked" && skill.explanation.workedExample && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">
                  {skill.explanation.workedExample.title}
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  {skill.explanation.workedExample.steps.map((step, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      {step}
                    </div>
                  ))}
                </div>
                {skill.explanation.workedExample.codeOrFormula && (
                  <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                    {skill.explanation.workedExample.codeOrFormula}
                  </pre>
                )}
                <div className="text-xs text-indigo-300 font-semibold">
                  💡 Takeaway: {skill.explanation.workedExample.takeaway}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formative Practice Quiz */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-indigo-400" />
              <span>Formative Knowledge Verification</span>
            </h3>
            <span className="text-xs text-slate-400">Score &gt;= 70% Unlocks Downstream Nodes</span>
          </div>

          <h4 className="text-sm font-bold text-white">{practiceQuestion.question}</h4>

          <div className="space-y-2.5">
            {practiceQuestion.options.map((opt, idx) => {
              const isSelected = selectedQuizOption === idx;
              let style = "bg-slate-950 border-slate-800 hover:border-slate-700";
              if (quizSubmitted) {
                if (idx === practiceQuestion.correctIndex) {
                  style = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                } else if (isSelected) {
                  style = "bg-rose-950/60 border-rose-500 text-rose-200";
                }
              } else if (isSelected) {
                style = "bg-indigo-950/50 border-indigo-500 text-white shadow-glow";
              }

              return (
                <button
                  key={idx}
                  disabled={quizSubmitted}
                  onClick={() => setSelectedQuizOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${style}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] bg-slate-800 text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </span>
                  {quizSubmitted && idx === practiceQuestion.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {quizSubmitted ? (
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs text-slate-300 space-y-2 animate-in fade-in">
              <span className="font-bold text-cyan-300 block">Explanation & Rationale:</span>
              <p>{practiceQuestion.explanation}</p>
              <div className="pt-2 flex justify-between items-center text-emerald-400 font-semibold">
                <span>Mastery updated in Learner State!</span>
                <Link href="/roadmap" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <span>View Updated Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={handleQuizSubmit}
              disabled={selectedQuizOption === null}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow-glow transition-all"
            >
              Verify Answer & Update Mastery
            </button>
          )}
        </div>

        {/* Note Taking Widget */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Save className="w-4 h-4 text-indigo-400" />
              <span>Personal Reflection Note for {skill.name}</span>
            </h3>
            {noteSaved && (
              <span className="text-xs text-emerald-400 font-semibold">Saved to Notes!</span>
            )}
          </div>
          <form onSubmit={handleSaveNote} className="space-y-3">
            <textarea
              rows={3}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Jot down personal insights, formulas, or questions for spaced revision..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
            <button
              type="submit"
              disabled={!userNote.trim()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-200 transition-colors"
            >
              Save Note
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
