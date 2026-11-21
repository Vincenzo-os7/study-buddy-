/**
 * BuddyStudy Core Type Definitions
 * Based on BuddyStudy Master Specification Sections 4 & 6.
 */

export type DomainId = "machine-learning" | "web-development" | "data-analytics" | "cybersecurity";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type SkillStatus = "mastered" | "in_progress" | "available" | "locked" | "needs_review";

export interface ResourceLink {
  title: string;
  url: string;
  type: "article" | "documentation" | "video" | "interactive";
  sourceName: string;
}

export interface Skill {
  id: string;
  domainId: DomainId;
  name: string;
  slug: string;
  description: string;
  level: SkillLevel;
  estimatedMinutes: number;
  stage: number; // visual topological layer (e.g., 1 = Foundations, 2 = Core, 3 = Advanced, 4 = Capstone)
  learningObjectives: string[];
  resources: ResourceLink[];
  assessmentId?: string;
  projectId?: string;
  explanation: {
    standard: string;
    simplified: string; // "Explain this simply"
    analogy: string; // "Give me a real-world analogy"
    workedExample: {
      title: string;
      steps: string[];
      codeOrFormula?: string;
      takeaway: string;
    };
    keyTerms: { term: string; definition: string }[];
    misconceptions: string[];
  };
}

export interface SkillDependency {
  id: string;
  prerequisiteSkillId: string; // from A
  dependentSkillId: string;    // to B (A must be mastered before B)
  isRequired: boolean;
  reason: string;
}

export interface DomainMetadata {
  id: DomainId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  targetSpecializations: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  conceptTag: string;
}

export interface DiagnosticAssessment {
  id: string;
  domainId: DomainId;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingThreshold: number; // percentage (e.g. 70)
}

export interface LearnerSkillMastery {
  skillId: string;
  status: SkillStatus;
  masteryScore: number; // 0 - 100
  lastAssessedAt?: string;
  completedAt?: string;
  notes?: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  isDemoUser: boolean;
  targetDomain: DomainId;
  targetSpecialization: string;
  currentLevel: SkillLevel | "unsure";
  weeklyStudyMinutes: number;
  completedOnboarding: boolean;
  streakDays: number;
  streakFrozen: boolean;
  xp: number;
  skills: Record<string, LearnerSkillMastery>;
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapNode extends Skill {
  status: SkillStatus;
  masteryScore: number;
  prerequisites: {
    skillId: string;
    skillName: string;
    isSatisfied: boolean;
    reason: string;
  }[];
  unlockReason?: string;
}

export interface RoadmapGraph {
  domainId: DomainId;
  nodes: RoadmapNode[];
  edges: SkillDependency[];
  totalEstimatedMinutes: number;
  completedMinutes: number;
  masteredCount: number;
  totalSkills: number;
  nextRecommendedSkillId?: string;
  stages: {
    stage: number;
    title: string;
    description: string;
    skillIds: string[];
  }[];
}

export interface UserNote {
  id: string;
  skillId: string;
  skillName: string;
  domainId: DomainId;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningActivityRecord {
  id: string;
  skillId: string;
  skillName: string;
  activityType: "lesson_read" | "analogy_viewed" | "quiz_attempt" | "note_created";
  durationMinutes: number;
  xpEarned: number;
  timestamp: string;
}
