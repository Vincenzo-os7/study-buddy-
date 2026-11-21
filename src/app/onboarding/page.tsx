"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FileCheck2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Compass, 
  BrainCircuit, 
  RotateCcw,
  AlertCircle
} from "lucide-react";
import { ML_DIAGNOSTIC_ASSESSMENT } from "@/lib/data/curriculum";
import { evaluateAssessment, AnswerSubmission, AssessmentResult } from "@/lib/engine/assessment";
import { getStoredLearner, saveStoredLearner } from "@/lib/state/learnerStore";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function OnboardingAssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "results">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submissions, setSubmissions] = useState<Record<string, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const questions = ML_DIAGNOSTIC_ASSESSMENT.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSubmissions((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    const formattedSubmissions: AnswerSubmission[] = Object.entries(submissions).map(
      ([questionId, selectedIndex]) => ({
        questionId,
        selectedIndex,
      })
    );

    const result = evaluateAssessment(ML_DIAGNOSTIC_ASSESSMENT, formattedSubmissions);
    setAssessmentResult(result);

    // Save evaluated mastery map into learner state
    const currentLearner = getStoredLearner();
    const updatedLearner = {
      ...currentLearner,
      skills: {
        ...currentLearner.skills,
        ...result.updatedMasteryMap,
      },
      updatedAt: new Date().toISOString(),
    };
    saveStoredLearner(updatedLearner);

    setCurrentStep("results");
  };

  const handleApplyAndOpenRoadmap = () => {
    router.push("/roadmap");
  };

  const handleRetake = () => {
    setSubmissions({});
    setCurrentQuestionIndex(0);
    setAssessmentResult(null);
    setCurrentStep("quiz");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">
              Machine Learning Diagnostic Assessment
            </span>
          </div>
        </div>
      </header>

      {/* Main Flow Content */}
      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col justify-center">
        {/* Step 1: Intro */}
        {currentStep === "intro" && (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-glow">
              <BrainCircuit className="w-8 h-8" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Diagnose Your Machine Learning Foundation
            </h1>

            <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              This short, 6-question assessment tests your prerequisite knowledge in Python, Linear Algebra, Probability, Statistics, and Preprocessing. Your answers will immediately tailor your personalized learning roadmap.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  Duration
                </span>
                <span className="text-sm font-semibold text-white">~5 Minutes</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Format
                </span>
                <span className="text-sm font-semibold text-white">6 Multiple Choice</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Outcome
                </span>
                <span className="text-sm font-semibold text-white">Dynamic DAG Unlocks</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentStep("quiz")}
                className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-glow inline-flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Begin Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Quiz In Progress */}
        {currentStep === "quiz" && (
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-card space-y-6">
            {/* Progress counter with ARIA live announcement */}
            <div
              className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="font-semibold text-indigo-300">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="font-mono text-slate-500">
                Concept: {currentQuestion.conceptTag}
              </span>
            </div>

            <ProgressBar
              value={Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}
              showPercentage={false}
              color="brand"
              label={`Progress: question ${currentQuestionIndex + 1} of ${totalQuestions}`}
            />

            {/* Question Text */}
            <h2 id="diagnostic-question-title" className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Options Grouped Semantically */}
            <div
              role="radiogroup"
              aria-labelledby="diagnostic-question-title"
              className="space-y-3 pt-2"
            >
              {currentQuestion.options.map((option, idx) => {
                const isSelected = submissions[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    data-testid={`option-${idx}`}
                    onClick={() => handleSelectOption(currentQuestion.id, idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-indigo-950/40 border-indigo-500 text-white shadow-glow ring-1 ring-indigo-500/50"
                        : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-medium">{option}</span>
                    </div>

                    {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← Previous
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={submissions[currentQuestion.id] === undefined}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5"
              >
                <span>
                  {currentQuestionIndex === totalQuestions - 1 ? "Submit Assessment" : "Next Question"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Diagnostic Results */}
        {currentStep === "results" && assessmentResult && (
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-card space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 block">
                  Assessment Complete
                </span>
                <h2 className="text-2xl font-bold text-white">Your Diagnostic Report</h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Overall Score</span>
                  <span
                    className={`text-2xl font-black font-mono ${
                      assessmentResult.passed ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {assessmentResult.scorePercentage}%
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    assessmentResult.passed
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {assessmentResult.correctCount}/{assessmentResult.totalQuestions}
                </div>
              </div>
            </div>

            {/* Gap Analysis Summary */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Skill Gap & Prerequisite Analysis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assessmentResult.skillGaps.map((gap) => (
                  <div
                    key={gap.skillId}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white capitalize">
                        {gap.skillId.replace("-", " ")}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          gap.masteryPercentage >= 70
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-950/60 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {gap.masteryPercentage}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{gap.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions Review with Explanations */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Detailed Answer Explanations
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {assessmentResult.evaluations.map((evalItem, index) => (
                  <div
                    key={evalItem.questionId}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-white">
                        {index + 1}. {evalItem.question}
                      </span>
                      {evalItem.isCorrect ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct
                        </span>
                      ) : (
                        <span className="text-rose-400 font-semibold flex items-center gap-1 flex-shrink-0">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      {evalItem.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>

              <button
                onClick={handleApplyAndOpenRoadmap}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Compass className="w-4 h-4" />
                <span>Apply to My Roadmap & View Graph</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        BuddyStudy Diagnostic Engine • Pure Deterministic Scoring • WCAG 2.2 Accessible
      </footer>
    </div>
  );
}
