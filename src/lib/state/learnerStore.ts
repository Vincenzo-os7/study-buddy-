/**
 * BuddyStudy Learner State Store
 * Manages reactive learner profile, persistent localStorage synchronization,
 * demo data isolation, and state updates for roadmaps, assessments, and progress.
 */

import { LearnerProfile, LearnerSkillMastery, DomainId } from "../types";

const STORAGE_KEY = "buddystudy_learner_state_v1";

export const INITIAL_DEMO_LEARNER: LearnerProfile = {
  id: "demo-learner-001",
  name: "Alex Chen",
  email: "alex.chen.demo@buddystudy.ai",
  isDemoUser: true,
  targetDomain: "machine-learning",
  targetSpecialization: "Machine Learning Engineer",
  currentLevel: "beginner",
  weeklyStudyMinutes: 360, // 6 hours/week
  completedOnboarding: true,
  streakDays: 7,
  streakFrozen: false,
  xp: 1450,
  skills: {
    "py-fundamentals": {
      skillId: "py-fundamentals",
      status: "mastered",
      masteryScore: 95,
      lastAssessedAt: "2026-11-18T10:00:00Z",
      completedAt: "2026-11-18T10:00:00Z"
    },
    "linear-algebra": {
      skillId: "linear-algebra",
      status: "mastered",
      masteryScore: 88,
      lastAssessedAt: "2026-11-19T14:30:00Z",
      completedAt: "2026-11-19T14:30:00Z"
    },
    "probability": {
      skillId: "probability",
      status: "mastered",
      masteryScore: 82,
      lastAssessedAt: "2026-11-20T11:00:00Z",
      completedAt: "2026-11-20T11:00:00Z"
    },
    "statistics": {
      skillId: "statistics",
      status: "in_progress",
      masteryScore: 65,
      lastAssessedAt: "2026-11-21T09:00:00Z"
    }
  },
  createdAt: "2026-11-14T08:00:00Z",
  updatedAt: "2026-11-21T09:00:00Z"
};

export const WEEKLY_ACTIVITY_DEMO = [
  { day: "Mon", minutes: 65, completedTasks: 2 },
  { day: "Tue", minutes: 45, completedTasks: 1 },
  { day: "Wed", minutes: 80, completedTasks: 3 },
  { day: "Thu", minutes: 50, completedTasks: 1 },
  { day: "Fri", minutes: 60, completedTasks: 2 },
  { day: "Sat", minutes: 90, completedTasks: 3 },
  { day: "Sun", minutes: 30, completedTasks: 1 }
];

export function getStoredLearner(): LearnerProfile {
  if (typeof window === "undefined") {
    return INITIAL_DEMO_LEARNER;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEARNER));
      return INITIAL_DEMO_LEARNER;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_LEARNER;
  }
}

export function saveStoredLearner(learner: LearnerProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(learner));
    // Dispatch custom event so reactive components update immediately
    window.dispatchEvent(new Event("buddystudy:learner_updated"));
  } catch (err) {
    console.error("Failed to persist learner state:", err);
  }
}

export function resetToDemoLearner(): LearnerProfile {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEARNER));
    window.dispatchEvent(new Event("buddystudy:learner_updated"));
  }
  return INITIAL_DEMO_LEARNER;
}

export function updateSkillInStore(
  skillId: string,
  score: number,
  status?: "mastered" | "in_progress" | "available" | "needs_review"
): LearnerProfile {
  const current = getStoredLearner();
  const threshold = 70;
  const determinedStatus = status || (score >= threshold ? "mastered" : "needs_review");
  const now = new Date().toISOString();

  const updatedSkills: Record<string, LearnerSkillMastery> = {
    ...current.skills,
    [skillId]: {
      skillId,
      masteryScore: score,
      status: determinedStatus,
      lastAssessedAt: now,
      completedAt: determinedStatus === "mastered" ? now : current.skills[skillId]?.completedAt
    }
  };

  const xpDelta = determinedStatus === "mastered" ? 100 : 25;

  const updatedLearner: LearnerProfile = {
    ...current,
    xp: current.xp + xpDelta,
    skills: updatedSkills,
    updatedAt: now
  };

  saveStoredLearner(updatedLearner);
  return updatedLearner;
}

export function switchLearnerDomain(domainId: DomainId): LearnerProfile {
  const current = getStoredLearner();
  const updated: LearnerProfile = {
    ...current,
    targetDomain: domainId,
    updatedAt: new Date().toISOString()
  };
  saveStoredLearner(updated);
  return updated;
}
