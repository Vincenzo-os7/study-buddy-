import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Globe, Database, Shield, Clock, BookOpen } from "lucide-react";

const DOMAINS = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    icon: Cpu,
    tagline: "From Vector Math to Supervised & Deep Learning",
    estimatedHours: 48,
    skillsCount: 8,
    topics: ["Python Foundations", "Linear Algebra", "Data Preprocessing", "Supervised Learning", "Neural Networks"],
    accent: "from-indigo-600 to-cyan-500",
  },
  {
    id: "web-development",
    name: "Full-Stack Web Development",
    icon: Globe,
    tagline: "Modern TypeScript, React 19, Node.js & APIs",
    estimatedHours: 60,
    skillsCount: 10,
    topics: ["Semantic HTML & CSS", "JavaScript Async", "TypeScript", "React Architecture", "Full-Stack APIs"],
    accent: "from-cyan-600 to-emerald-500",
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    icon: Database,
    tagline: "Spreadsheets, SQL Mastery, Tableau & Python",
    estimatedHours: 36,
    skillsCount: 7,
    topics: ["Spreadsheet Modeling", "SQL Queries & Joins", "Data Cleaning", "Visualization & BI", "Exploratory Python"],
    accent: "from-amber-600 to-rose-500",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Fundamentals",
    icon: Shield,
    tagline: "Networking, Linux Architecture & Defensive Ops",
    estimatedHours: 42,
    skillsCount: 6,
    topics: ["Networking Protocols", "Linux & Shell Scripting", "Security Principles", "Web App Vulnerabilities", "Defensive Lab"],
    accent: "from-violet-600 to-indigo-500",
  },
];

export function DomainGrid() {
  return (
    <section id="curriculum" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Academic Tracks</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Curated Skill Graphs
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Explore 4 production-grade dependency graphs crafted with rigorous prerequisite relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${domain.accent} flex items-center justify-center text-white shadow-glow`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        ~{domain.estimatedHours} Hours
                      </span>
                      <span>•</span>
                      <span>{domain.skillsCount} Skills</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    {domain.tagline}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Core Topological Sequence:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/onboarding"
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Start This Track</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
