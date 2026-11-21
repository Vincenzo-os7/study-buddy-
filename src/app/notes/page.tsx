"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookMarked, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  RotateCcw,
  BookOpen
} from "lucide-react";
import { UserNote } from "@/lib/types";
import { getStoredLearner } from "@/lib/state/learnerStore";
import { ML_SKILLS } from "@/lib/data/curriculum";

const INITIAL_NOTES: UserNote[] = [
  {
    id: "note-1",
    skillId: "py-fundamentals",
    skillName: "Python Fundamentals",
    domainId: "machine-learning",
    title: "Vectorization vs Loops in NumPy",
    content: "Vectorized operations run in compiled C underneath the Python interpreter. Avoid explicit for-loops for element-wise array operations whenever array size > 1,000.",
    createdAt: "2026-11-18T14:00:00Z",
    updatedAt: "2026-11-18T14:00:00Z",
  },
  {
    id: "note-2",
    skillId: "linear-algebra",
    skillName: "Linear Algebra",
    domainId: "machine-learning",
    title: "Dot Product Geometric Intuition",
    content: "Dot product A · B = ||A|| * ||B|| * cos(theta). When two vectors are perpendicular (90 degrees), cos(theta) = 0 so dot product is zero. Used as the foundation of cosine similarity in recommendation engines.",
    createdAt: "2026-11-19T16:30:00Z",
    updatedAt: "2026-11-19T16:30:00Z",
  },
  {
    id: "note-3",
    skillId: "supervised-ml",
    skillName: "Supervised Machine Learning",
    domainId: "machine-learning",
    title: "Overfitting vs High Variance",
    content: "When training accuracy is 99% but validation accuracy is 65%, the model memorized noise. Solutions: L2 weight regularization, simpler architecture, dropout, or collecting more training samples.",
    createdAt: "2026-11-20T11:15:00Z",
    updatedAt: "2026-11-20T11:15:00Z",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<UserNote[]>(INITIAL_NOTES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newSkillId, setNewSkillId] = useState("supervised-ml");
  const [viewMode, setViewMode] = useState<"notes" | "flashcards">("notes");
  const [flashcardFlipped, setFlashcardFlipped] = useState<Record<string, boolean>>({});

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.skillName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkillFilter === "all" || n.skillId === selectedSkillFilter;
    return matchesSearch && matchesSkill;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const skill = ML_SKILLS.find((s) => s.id === newSkillId) || ML_SKILLS[0];
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      skillId: skill.id,
      skillName: skill.name,
      domainId: "machine-learning",
      title: newTitle.trim(),
      content: newContent.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setNewTitle("");
    setNewContent("");
    setIsCreating(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((n) => n.id !== noteId));
  };

  const toggleFlashcard = (id: string) => {
    setFlashcardFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">
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
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-glow">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Personal Study Notes</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Active Recall
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode("notes")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === "notes" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Notes View
              </button>
              <button
                onClick={() => setViewMode("flashcards")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === "flashcards" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Flashcards Mode
              </button>
            </div>

            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Note</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by concept, topic, or keyword..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Filter Topic:</span>
            <select
              value={selectedSkillFilter}
              onChange={(e) => setSelectedSkillFilter(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              <option value="all">All Topics ({notes.length})</option>
              {ML_SKILLS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Create Note Modal / Drawer */}
        {isCreating && (
          <form
            onSubmit={handleCreateNote}
            className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/50 shadow-glow space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                <span>Add New Conceptual Note</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Topic / Skill</label>
                <select
                  value={newSkillId}
                  onChange={(e) => setNewSkillId(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800"
                >
                  {ML_SKILLS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Overfitting vs High Variance"
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Key Explanation / Summary</label>
              <textarea
                required
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write your personal synthesis or key takeaway in your own words..."
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow"
              >
                Save Note
              </button>
            </div>
          </form>
        )}

        {/* Content Views: Standard Notes List OR Active Recall Flashcards */}
        {viewMode === "notes" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col justify-between group transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold text-indigo-400 uppercase tracking-wider bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                      {note.skillName}
                    </span>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <Link
                    href={`/learn/${note.skillId}`}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Lesson</span>
                  </Link>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                    aria-label={`Delete note ${note.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flashcards Mode for Spaced Revision */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotes.map((note) => {
              const isFlipped = flashcardFlipped[note.id] || false;
              return (
                <div
                  key={note.id}
                  onClick={() => toggleFlashcard(note.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Flashcard: ${note.title}. Press Enter to flip.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleFlashcard(note.id);
                    }
                  }}
                  className={`p-8 rounded-3xl border text-center cursor-pointer transition-all min-h-[220px] flex flex-col justify-between ${
                    isFlipped
                      ? "bg-indigo-950/40 border-indigo-500 shadow-glow"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold uppercase tracking-wider text-cyan-400">
                      {note.skillName}
                    </span>
                    <span className="text-slate-500">
                      {isFlipped ? "Answer / Explanation" : "Click to Reveal"}
                    </span>
                  </div>

                  <div className="py-6">
                    {isFlipped ? (
                      <p className="text-sm text-slate-200 leading-relaxed font-normal animate-in fade-in">
                        {note.content}
                      </p>
                    ) : (
                      <h4 className="text-xl font-bold text-white tracking-tight">
                        {note.title}
                      </h4>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                    <RotateCcw className="w-3 h-3" />
                    <span>{isFlipped ? "Click to flip back" : "Test active recall"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
