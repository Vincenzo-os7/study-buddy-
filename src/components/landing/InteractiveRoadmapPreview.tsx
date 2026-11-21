"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Lock, 
  Unlock, 
  PlayCircle, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Compass, 
  Brain,
  Clock,
  Layers,
  Check
} from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { SkillStatus } from "@/lib/types";

interface PreviewNode {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  stage: number;
  stageName: string;
  status: SkillStatus;
  estimatedMinutes: number;
  description: string;
  prerequisites: string[];
  whyThisNext: string;
  explanationSnippet: {
    simple: string;
    analogy: string;
  };
}

const SAMPLE_DOMAINS = [
  { id: "machine-learning", name: "Machine Learning", tag: "AI & Data Science" },
  { id: "web-development", name: "Full-Stack Web", tag: "Modern Engineering" },
  { id: "data-analytics", name: "Data Analytics", tag: "SQL & Business Intelligence" },
];

const ML_PREVIEW_NODES: PreviewNode[] = [
  {
    id: "py-foundations",
    name: "Python Foundations",
    level: "beginner",
    stage: 1,
    stageName: "Foundations",
    status: "mastered",
    estimatedMinutes: 240,
    description: "Core syntax, data structures (lists, dicts), functions, and vectorized operations.",
    prerequisites: [],
    whyThisNext: "Foundational mastery completed. Verified via diagnostic quiz.",
    explanationSnippet: {
      simple: "Python is the high-level language used to write ML instructions without getting bogged down by memory pointers.",
      analogy: "Like English in international aviation, Python is the lingua franca of machine learning algorithms."
    }
  },
  {
    id: "linear-algebra",
    name: "Linear Algebra & Vectors",
    level: "beginner",
    stage: 1,
    stageName: "Foundations",
    status: "mastered",
    estimatedMinutes: 180,
    description: "Vector spaces, dot products, matrix multiplication, and geometric transformations.",
    prerequisites: [],
    whyThisNext: "Mastered foundation. Essential for understanding multidimensional data representations.",
    explanationSnippet: {
      simple: "Linear algebra gives us mathematical tools to manipulate grids of numbers simultaneously.",
      analogy: "A vector is like an arrow pointing in space; a matrix is a recipe for twisting and stretching those arrows."
    }
  },
  {
    id: "data-preprocessing",
    name: "Data Preprocessing & NumPy",
    level: "intermediate",
    stage: 2,
    stageName: "Core Techniques",
    status: "in_progress",
    estimatedMinutes: 210,
    description: "Cleaning missing values, feature scaling (StandardScaler), one-hot encoding, and train-test splitting.",
    prerequisites: ["Python Foundations", "Linear Algebra & Vectors"],
    whyThisNext: "Currently in progress. Required before feeding numbers into machine learning models.",
    explanationSnippet: {
      simple: "Raw data is messy. Preprocessing cleans and scales numbers so models don't get tricked by outliers.",
      analogy: "Like washing, chopping, and measuring ingredients before turning on the stove to cook."
    }
  },
  {
    id: "supervised-learning",
    name: "Supervised Learning",
    level: "intermediate",
    stage: 2,
    stageName: "Core Techniques",
    status: "available",
    estimatedMinutes: 300,
    description: "Linear regression, logistic classification, decision boundaries, and loss minimization.",
    prerequisites: ["Data Preprocessing & NumPy"],
    whyThisNext: "Unlocked! Your prerequisites are complete. Ready to begin training your first predictor.",
    explanationSnippet: {
      simple: "Teaching a computer by showing it thousands of examples with correct answer keys.",
      analogy: "Like a teacher grading flashcards: every mistake adjusts the model until it predicts the right answers."
    }
  },
  {
    id: "model-evaluation",
    name: "Model Evaluation & Validation",
    level: "intermediate",
    stage: 3,
    stageName: "Evaluation",
    status: "locked",
    estimatedMinutes: 180,
    description: "Precision, recall, F1 score, ROC-AUC curves, cross-validation, and detecting overfitting.",
    prerequisites: ["Supervised Learning"],
    whyThisNext: "Locked by prerequisite: Must complete Supervised Learning before evaluating predictive efficacy.",
    explanationSnippet: {
      simple: "Testing your trained model on unseen test sets to ensure it actually generalized rather than memorized.",
      analogy: "Testing a pilot in a realistic simulator with unfamiliar weather conditions."
    }
  },
  {
    id: "deep-learning",
    name: "Neural Networks & Deep Learning",
    level: "advanced",
    stage: 4,
    stageName: "Advanced Specialization",
    status: "locked",
    estimatedMinutes: 420,
    description: "Multilayer perceptrons, backpropagation, gradient descent, PyTorch basics, and activation functions.",
    prerequisites: ["Supervised Learning", "Model Evaluation & Validation"],
    whyThisNext: "Locked by prerequisites: Requires Supervised Learning & Evaluation foundations.",
    explanationSnippet: {
      simple: "Layers of interconnected artificial neurons that automatically extract hierarchical features from raw data.",
      analogy: "Like a factory assembly line where each station detects progressively more complex patterns."
    }
  }
];

export function InteractiveRoadmapPreview() {
  const [selectedDomain, setSelectedDomain] = useState("machine-learning");
  const [selectedNodeId, setSelectedNodeId] = useState("supervised-learning");
  const [activeTab, setActiveTab] = useState<"simple" | "analogy">("simple");

  const selectedNode = ML_PREVIEW_NODES.find(n => n.id === selectedNodeId) || ML_PREVIEW_NODES[3];

  return (
    <section id="roadmap-preview" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Signature Feature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Prerequisite-Aware Skill Graph
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Unlike static course lists, BuddyStudy models your learning as a directed acyclic graph. Nodes unlock strictly when your mastery is verified. Click any skill below to inspect its dependency rules.
          </p>
        </div>

        {/* Domain Selector Pills */}
        <div
          role="tablist"
          aria-label="Select Learning Track"
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {SAMPLE_DOMAINS.map((domain) => (
            <button
              key={domain.id}
              role="tab"
              id={`domain-tab-${domain.id}`}
              aria-selected={selectedDomain === domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedDomain === domain.id
                  ? "bg-indigo-600 text-white shadow-glow border border-indigo-500"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <span>{domain.name}</span>
              <span className="hidden sm:inline-block ml-2 text-[11px] opacity-70">({domain.tag})</span>
            </button>
          ))}
        </div>

        {/* Graph & Detail Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Node Map (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-card backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  DAG Topological Sequence (Kahn's Sort)
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Click a skill node to inspect
              </span>
            </div>

            {/* Stages Grid */}
            <div className="space-y-6">
              {[1, 2, 3, 4].map((stageNum) => {
                const stageNodes = ML_PREVIEW_NODES.filter((n) => n.stage === stageNum);
                const stageName = stageNodes[0]?.stageName || `Stage ${stageNum}`;

                return (
                  <div key={stageNum} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                        Stage {stageNum}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{stageName}</span>
                      <div className="flex-1 h-px bg-slate-800/70" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stageNodes.map((node) => {
                        const isSelected = node.id === selectedNodeId;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            aria-pressed={isSelected}
                            aria-label={`${node.name}, ${node.status}, Stage ${node.stage}`}
                            className={`w-full text-left p-4 rounded-xl border transition-all relative ${
                              isSelected
                                ? "bg-slate-850 border-indigo-500 shadow-glow ring-1 ring-indigo-500/50"
                                : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="text-sm font-semibold text-white leading-snug">
                                {node.name}
                              </h4>
                              <StatusBadge status={node.status} />
                            </div>

                            <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                              {node.description}
                            </p>

                            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/50">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {Math.round(node.estimatedMinutes / 60)}h effort
                              </span>
                              <span className="capitalize text-slate-400">
                                {node.level}
                              </span>
                            </div>

                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-400 rounded-full" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Prerequisite Flow Footer */}
            <div className="mt-6 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Deterministic topological sequence. Zero guesswork.</span>
              </span>
              <Link
                href="/roadmap"
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                Open Full Graph View →
              </Link>
            </div>
          </div>

          {/* Right: Selected Node Inspection Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-card sticky top-24">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {selectedNode.stageName} • Stage {selectedNode.stage}
              </span>
              <StatusBadge status={selectedNode.status} />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {selectedNode.name}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            {/* Why This Next Rationale */}
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Why is this skill recommended?</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.whyThisNext}
              </p>
            </div>

            {/* Prerequisites Checklist */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Prerequisite Verification
              </span>
              {selectedNode.prerequisites.length === 0 ? (
                <div className="text-xs text-emerald-400 flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <Check className="w-3.5 h-3.5" />
                  <span>Foundational node: Open to all learners immediately</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {selectedNode.prerequisites.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800"
                    >
                      <span className="text-slate-300 font-medium">{p}</span>
                      <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Explanation Preview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Adaptive AI Companion
                </span>
                <div role="tablist" aria-label="Explanation Perspective" className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                  <button
                    role="tab"
                    id="preview-tab-simple"
                    aria-selected={activeTab === "simple"}
                    aria-controls="preview-panel-explanation"
                    onClick={() => setActiveTab("simple")}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      activeTab === "simple"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Simple (ELI5)
                  </button>
                  <button
                    role="tab"
                    id="preview-tab-analogy"
                    aria-selected={activeTab === "analogy"}
                    aria-controls="preview-panel-explanation"
                    onClick={() => setActiveTab("analogy")}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      activeTab === "analogy"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Analogy
                  </button>
                </div>
              </div>

              <div
                role="tabpanel"
                id="preview-panel-explanation"
                aria-labelledby={`preview-tab-${activeTab}`}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed"
              >
                {activeTab === "simple" ? (
                  <p>“{selectedNode.explanationSnippet.simple}”</p>
                ) : (
                  <p>“{selectedNode.explanationSnippet.analogy}”</p>
                )}
              </div>
            </div>

            {/* Primary Action Button */}
            <Link
              href={`/learn/${selectedNode.id}`}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <span>Open Skill Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
