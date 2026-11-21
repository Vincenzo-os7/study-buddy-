/**
 * BuddyStudy Adaptive Diagnostic Assessment Engine
 * Pure logic for evaluating answers, calculating skill mastery,
 * detecting prerequisite gaps, and updating learner state.
 */

import type { DiagnosticAssessment, QuizQuestion, SkillStatus, LearnerSkillMastery } from "../types/index.ts";

export interface AnswerSubmission {
  questionId: string;
  selectedIndex: number;
}

export interface QuestionEvaluation {
  questionId: string;
  question: string;
  conceptTag: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
}

export interface SkillGapAnalysis {
  skillId: string;
  conceptTag: string;
  questionsTotal: number;
  questionsCorrect: number;
  masteryPercentage: number;
  status: SkillStatus;
  recommendation: string;
}

export interface AssessmentResult {
  assessmentId: string;
  domainId: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  passed: boolean;
  passingThreshold: number;
  evaluations: QuestionEvaluation[];
  skillGaps: SkillGapAnalysis[];
  updatedMasteryMap: Record<string, LearnerSkillMastery>;
  completedAt: string;
}

/**
 * Validates submissions against an assessment definition.
 */
export function validateSubmission(
  assessment: DiagnosticAssessment,
  submissions: AnswerSubmission[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!assessment || !Array.isArray(assessment.questions) || assessment.questions.length === 0) {
    errors.push("Assessment contains no questions.");
    return { isValid: false, errors };
  }

  const questionMap = new Map(assessment.questions.map((q) => [q.id, q]));

  for (const sub of submissions) {
    const q = questionMap.get(sub.questionId);
    if (!q) {
      errors.push(`Submitted questionId "${sub.questionId}" does not exist in assessment.`);
    } else if (sub.selectedIndex < 0 || sub.selectedIndex >= q.options.length) {
      errors.push(
        `Invalid selectedIndex "${sub.selectedIndex}" for question "${q.id}". Must be between 0 and ${
          q.options.length - 1
        }.`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Evaluates an assessment attempt:
 * - Checks each answer.
 * - Computes total score & threshold status.
 * - Calculates granular per-concept / per-skill mastery percentages.
 * - Identifies prerequisite gaps.
 * - Maps results into LearnerSkillMastery updates for the graph engine.
 */
export function evaluateAssessment(
  assessment: DiagnosticAssessment,
  submissions: AnswerSubmission[],
  options: {
    passingThreshold?: number; // defaults to assessment.passingThreshold or 70
    conceptToSkillMap?: Record<string, string>; // maps conceptTag to skillId
  } = {}
): AssessmentResult {
  const threshold = options.passingThreshold ?? assessment.passingThreshold ?? 70;
  const validation = validateSubmission(assessment, submissions);
  if (!validation.isValid) {
    throw new Error(`Invalid assessment submission: ${validation.errors.join("; ")}`);
  }

  const submissionMap = new Map(submissions.map((s) => [s.questionId, s.selectedIndex]));
  const evaluations: QuestionEvaluation[] = [];

  // Group stats by concept / skill
  const conceptStats = new Map<
    string,
    { total: number; correct: number }
  >();

  let correctCount = 0;

  for (const q of assessment.questions) {
    const userChoice = submissionMap.has(q.id) ? submissionMap.get(q.id)! : -1;
    const isCorrect = userChoice === q.correctIndex;

    if (isCorrect) {
      correctCount++;
    }

    evaluations.push({
      questionId: q.id,
      question: q.question,
      conceptTag: q.conceptTag,
      selectedIndex: userChoice,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation,
    });

    // Update concept aggregations
    const currentStat = conceptStats.get(q.conceptTag) || { total: 0, correct: 0 };
    currentStat.total += 1;
    if (isCorrect) currentStat.correct += 1;
    conceptStats.set(q.conceptTag, currentStat);
  }

  const totalQuestions = assessment.questions.length;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = scorePercentage >= threshold;

  // Build skill gap analysis and updated learner mastery map
  const skillGaps: SkillGapAnalysis[] = [];
  const updatedMasteryMap: Record<string, LearnerSkillMastery> = {};
  const completedAt = new Date().toISOString();

  for (const [conceptTag, stats] of conceptStats.entries()) {
    const masteryPct = Math.round((stats.correct / stats.total) * 100);
    const skillId = options.conceptToSkillMap?.[conceptTag] || conceptTag;

    let status: SkillStatus = "locked";
    let recommendation = "";

    if (masteryPct >= threshold) {
      status = "mastered";
      recommendation = `Demonstrated solid mastery (${masteryPct}%). Unlocks downstream dependent skills.`;
    } else if (masteryPct > 0) {
      status = "needs_review";
      recommendation = `Partial understanding (${masteryPct}%). Review recommended before tackling advanced topics.`;
    } else {
      status = "available";
      recommendation = `Prerequisite gap detected (0%). Foundation lessons required.`;
    }

    skillGaps.push({
      skillId,
      conceptTag,
      questionsTotal: stats.total,
      questionsCorrect: stats.correct,
      masteryPercentage: masteryPct,
      status,
      recommendation,
    });

    updatedMasteryMap[skillId] = {
      skillId,
      status,
      masteryScore: masteryPct,
      lastAssessedAt: completedAt,
      completedAt: status === "mastered" ? completedAt : undefined,
    };
  }

  return {
    assessmentId: assessment.id,
    domainId: assessment.domainId,
    totalQuestions,
    correctCount,
    scorePercentage,
    passed,
    passingThreshold: threshold,
    evaluations,
    skillGaps,
    updatedMasteryMap,
    completedAt,
  };
}
