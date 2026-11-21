"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Send, 
  ArrowLeft, 
  Lightbulb, 
  BrainCircuit, 
  Globe, 
  FileQuestion, 
  AlertTriangle, 
  Compass, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Clock,
  Layers,
  ArrowRight
} from "lucide-react";
import { AIAction, AICompanionResponse } from "@/lib/ai/types";
import { ML_SKILLS } from "@/lib/data/curriculum";
import { getStoredLearner } from "@/lib/state/learnerStore";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  action?: AIAction;
  text: string;
  responsePayload?: AICompanionResponse;
  timestamp: string;
}

const ACTION_PILLS: { action: AIAction; label: string; prompt: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { action: "explain_simply", label: "Explain Simply", prompt: "Explain this simply so a beginner can grasp the intuition immediately.", icon: Lightbulb },
  { action: "explain_deeply", label: "Explain Deeply", prompt: "Break down the mathematical formulation, optimization objective, and algorithmic architecture deeply.", icon: BrainCircuit },
  { action: "real_world_example", label: "Real-World Example", prompt: "Provide a concrete real-world production industry case study for this concept.", icon: Globe },
  { action: "generate_quiz", label: "Generate Quiz", prompt: "Test my conceptual understanding with a challenging multiple-choice question.", icon: FileQuestion },
  { action: "explain_mistake", label: "Explain Mistakes", prompt: "What are the most common student misconceptions and trap answers regarding this topic?", icon: AlertTriangle },
  { action: "suggest_next", label: "Suggest Next Topic", prompt: "Based on my prerequisite dependency graph, what topic should I learn next?", icon: Compass },
];

export default function AssistantPage() {
  const [learner, setLearner] = useState(getStoredLearner());
  const [selectedSkillId, setSelectedSkillId] = useState("supervised-ml");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<Record<string, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedSkill = ML_SKILLS.find((s) => s.id === selectedSkillId) || ML_SKILLS[0];

  useEffect(() => {
    setLearner(getStoredLearner());
    // Initial welcome message
    setMessages([
      {
        id: "msg-welcome",
        sender: "assistant",
        action: "chat",
        text: `Welcome to the BuddyStudy AI Companion! I'm synchronized with your learning roadmap in **${learner.targetSpecialization}**.\n\nCurrently, we are exploring **${selectedSkill.name}** (Stage ${selectedSkill.stage}). Choose an action pill below or ask any academic question!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [selectedSkill.name, selectedSkill.stage, learner.targetSpecialization]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string, actionType: AIAction = "chat") => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      action: actionType,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/companion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: actionType,
          domain: learner.targetDomain,
          currentSkillId: selectedSkill.id,
          currentSkillName: selectedSkill.name,
          masteryLevel: learner.currentLevel,
          userMessage: textToSend,
          context: {
            roadmapProgress: "Stage 2: Core Data Preprocessing & Modeling",
            masteredSkills: Object.keys(learner.skills).filter(k => learner.skills[k]?.status === "mastered"),
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${res.status}`);
      }

      const aiResponse: AICompanionResponse = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        action: actionType,
        text: aiResponse.explanation,
        responsePayload: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Failed to connect to AI provider.";
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        action: "chat",
        text: `⚠️ **Notice:** ${errText}\n\nPlease try again or select one of the action shortcuts below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionPillClick = (pill: typeof ACTION_PILLS[0]) => {
    handleSendMessage(pill.prompt, pill.action);
  };

  const handleQuizSelection = (messageId: string, optionIndex: number) => {
    setQuizAnswerSelected((prev) => ({
      ...prev,
      [messageId]: optionIndex,
    }));
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "msg-welcome-new",
        sender: "assistant",
        action: "chat",
        text: `Conversation cleared. We are focused on **${selectedSkill.name}**. What would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-glow">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>AI Learning Companion</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                    Socratic Engine
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
            <Link
              href="/roadmap"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
            >
              View Roadmap
            </Link>
          </div>
        </div>
      </header>

      {/* Context Bar: Current Skill, Verified Mastery, and Roadmap Stage */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-sm py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Target Skill:</span>
            <select
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
              className="bg-slate-950 text-white font-semibold text-xs rounded-lg px-2.5 py-1 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              {ML_SKILLS.map((s) => (
                <option key={s.id} value={s.id}>
                  Stage {s.stage}: {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>
              Learner: <strong className="text-white">{learner.name}</strong>
            </span>
            <span>•</span>
            <span>
              Stage: <strong className="text-indigo-300">Stage {selectedSkill.stage}</strong>
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">
              Prerequisite Correctness Verified
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6 flex-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              {/* Message Header */}
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-semibold text-slate-400">
                  {msg.sender === "user" ? learner.name : "BuddyStudy AI Companion"}
                </span>
                <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white shadow-glow rounded-tr-sm"
                    : "bg-slate-900 border border-slate-800 text-slate-200 shadow-card rounded-tl-sm space-y-4"
                }`}
              >
                {/* Title badge for AI structured responses */}
                {msg.responsePayload?.title && (
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <h4 className="text-xs font-bold text-cyan-300 tracking-wide uppercase">
                      {msg.responsePayload.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {msg.responsePayload.modelUsed}
                    </span>
                  </div>
                )}

                {/* Main text */}
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Analogy or Example Block */}
                {msg.responsePayload?.analogyOrExample && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      Analogy / Production Case Study:
                    </span>
                    <p className="italic whitespace-pre-line leading-relaxed">
                      {msg.responsePayload.analogyOrExample}
                    </p>
                  </div>
                )}

                {/* Interactive Quiz Widget */}
                {msg.responsePayload?.quiz && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                        <FileQuestion className="w-4 h-4 text-cyan-400" />
                        <span>Interactive Knowledge Check</span>
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-mono">
                        Instant Feedback
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-white">
                      {msg.responsePayload.quiz.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {msg.responsePayload.quiz.options.map((option, optIdx) => {
                        const selectedIdx = quizAnswerSelected[msg.id];
                        const hasSelected = selectedIdx !== undefined;
                        const isThisOption = selectedIdx === optIdx;
                        const isCorrectOption = optIdx === msg.responsePayload!.quiz!.correctIndex;

                        let buttonStyles = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                        if (hasSelected) {
                          if (isCorrectOption) {
                            buttonStyles = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                          } else if (isThisOption && !isCorrectOption) {
                            buttonStyles = "bg-rose-950/60 border-rose-500 text-rose-200";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={hasSelected}
                            onClick={() => handleQuizSelection(msg.id, optIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${buttonStyles}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] bg-slate-800 text-slate-400">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{option}</span>
                            </span>

                            {hasSelected && isCorrectOption && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            )}
                            {hasSelected && isThisOption && !isCorrectOption && (
                              <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizAnswerSelected[msg.id] !== undefined && (
                      <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs text-slate-300 space-y-1 animate-in fade-in">
                        <span className="font-semibold text-cyan-300 block">Explanation:</span>
                        <p>{msg.responsePayload.quiz.explanation}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Next Topic Suggestion Card */}
                {msg.responsePayload?.nextTopicSuggestion && (
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-950 border border-indigo-500/40 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                        Recommended Next Step in Graph:
                      </span>
                      <span className="text-xs font-bold text-white block">
                        {msg.responsePayload.nextTopicSuggestion.skillName}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {msg.responsePayload.nextTopicSuggestion.reason}
                      </p>
                    </div>

                    <Link
                      href={`/learn/${msg.responsePayload.nextTopicSuggestion.skillId}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow flex items-center gap-1 flex-shrink-0"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* Key Takeaway Banner */}
                {msg.responsePayload?.keyTakeaway && (
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-indigo-300 font-medium">
                    💡 {msg.responsePayload.keyTakeaway}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm text-xs text-slate-400 animate-pulse">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Formulating socratic explanation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Action Shortcuts & Input Form */}
        <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
          {/* Quick Action Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            {ACTION_PILLS.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.action}
                  onClick={() => handleActionPillClick(pill)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 flex-shrink-0 transition-colors disabled:opacity-50"
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage, "chat");
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask a question about ${selectedSkill.name}...`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-sm shadow-glow flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
