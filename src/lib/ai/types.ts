/**
 * BuddyStudy AI Learning Companion Types & Schemas
 */

export type AIAction =
  | "explain_simply"
  | "explain_deeply"
  | "real_world_example"
  | "generate_quiz"
  | "explain_mistake"
  | "suggest_next"
  | "chat";

export interface AICompanionRequest {
  action: AIAction;
  domain: string;
  currentSkillId?: string;
  currentSkillName?: string;
  masteryLevel?: string;
  userMessage: string;
  context?: {
    roadmapProgress?: string;
    masteredSkills?: string[];
    unlockedSkills?: string[];
    incorrectAnswerContext?: {
      question: string;
      userAnswer: string;
      correctAnswer: string;
    };
  };
}

export interface AIQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  conceptTag: string;
}

export interface AINextTopicSuggestion {
  skillId: string;
  skillName: string;
  reason: string;
}

export interface AICompanionResponse {
  action: AIAction;
  title: string;
  explanation: string;
  keyTakeaway?: string;
  analogyOrExample?: string;
  quiz?: AIQuizQuestion;
  nextTopicSuggestion?: AINextTopicSuggestion;
  modelUsed: string;
  isMock: boolean;
  timestamp: string;
}
