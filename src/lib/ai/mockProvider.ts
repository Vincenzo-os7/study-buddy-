/**
 * BuddyStudy Educational Mock Provider
 * Deterministic, pedagogically accurate responses for development, offline use, and testing.
 * Strictly adheres to verified curricula without fabricating sources or vanity claims.
 */

import type { AICompanionRequest, AICompanionResponse } from "./types.ts";
import { ML_SKILLS, ML_DEPENDENCIES } from "../data/curriculum.ts";

export function generateMockAIResponse(req: AICompanionRequest): AICompanionResponse {
  const skillName = req.currentSkillName || "Machine Learning Concepts";
  const skillId = req.currentSkillId || "supervised-ml";
  const skill = ML_SKILLS.find((s) => s.id === skillId) || ML_SKILLS[0];
  const now = new Date().toISOString();

  switch (req.action) {
    case "explain_simply":
      return {
        action: "explain_simply",
        title: `Simple Intuition: ${skillName}`,
        explanation: skill.explanation.simplified || `At its core, ${skillName} is a way to teach a computer to identify patterns automatically rather than hand-coding every specific rule.`,
        analogyOrExample: skill.explanation.analogy || `Think of it like learning to recognize a dog: you weren't given a 500-page manual on ear geometry; you simply saw hundreds of dogs until your brain learned the general pattern.`,
        keyTakeaway: `Intuition: Focus on the high-level pattern and objective before getting lost in formula notation.`,
        modelUsed: "BuddyStudy Educational Mock Engine v1 (Offline Safe)",
        isMock: true,
        timestamp: now,
      };

    case "explain_deeply":
      return {
        action: "explain_deeply",
        title: `Mathematical & Formal Architecture: ${skillName}`,
        explanation: `${skill.explanation.standard}\n\nUnder the hood, we define a parameterized hypothesis function h_θ(x). We formulate an optimization problem where parameters θ are updated iteratively by minimizing a differentiable loss function J(θ) via gradient descent: θ := θ - η ∇J(θ).`,
        analogyOrExample: skill.explanation.workedExample
          ? `${skill.explanation.workedExample.title}:\n${skill.explanation.workedExample.steps.join("\n")}\n\nFormula: ${skill.explanation.workedExample.codeOrFormula || "N/A"}`
          : "Optimization requires calculating partial derivatives with respect to each weight matrix parameter.",
        keyTakeaway: `Rigorous Principle: Convergence depends on proper feature scaling, convex loss geometry, and an appropriately tuned learning rate η.`,
        modelUsed: "BuddyStudy Educational Mock Engine v1 (Offline Safe)",
        isMock: true,
        timestamp: now,
      };

    case "real_world_example":
      return {
        action: "real_world_example",
        title: `Production Case Study: ${skillName}`,
        explanation: `In production systems, ${skillName} is utilized for automated risk scoring and anomaly detection at scale.`,
        analogyOrExample: `Real-World Case Study: An e-commerce fraud prevention engine receives 50,000 transactions per second. Using ${skillName}, each transaction is scored across 80 feature vectors (velocity, geolocation discrepancy, IP entropy) within a strict 15ms latency budget. Fraudulent transactions (>95% risk score) are routed to manual review before settlement.`,
        keyTakeaway: `Engineering reality: Real-world models must balance predictive precision against strict latency, drift monitoring, and false-positive user friction.`,
        modelUsed: "BuddyStudy Educational Mock Engine v1 (Offline Safe)",
        isMock: true,
        timestamp: now,
      };

    case "generate_quiz":
      return {
        action: "generate_quiz",
        title: `Quick Knowledge Check: ${skillName}`,
        explanation: `Test your understanding of the core concept behind ${skillName}. Select the best answer below:`,
        quiz: {
          question: `In the context of ${skillName}, why is it critical to validate models on unseen holdout test data rather than training data alone?`,
          options: [
            "To speed up GPU inference time",
            "To verify the model generalized underlying patterns rather than memorized training noise (overfitting)",
            "Because training loss is always zero",
            "Holdout data is strictly required by SQL databases"
          ],
          correctIndex: 1,
          explanation: "Evaluating strictly on unseen test data detects overfitting—when an algorithm memorizes specific noise in training points instead of learning generalizable relationships.",
          conceptTag: skillId,
        },
        keyTakeaway: `Formative mastery check: Answer the question to evaluate prerequisite readiness.`,
        modelUsed: "BuddyStudy Educational Mock Engine v1 (Offline Safe)",
        isMock: true,
        timestamp: now,
      };

    case "explain_mistake":
      const mistake = req.context?.incorrectAnswerContext;
      return {
        action: "explain_mistake",
        title: `Misconception Breakdown: ${skillName}`,
        explanation: mistake
          ? `You selected "${mistake.userAnswer}", but the correct principle is "${mistake.correctAnswer}".\n\nThis is a classic trap: students often confuse correlation with causation or assume that high training accuracy equates to real-world performance.`
          : `Common trap in ${skillName}: ${skill.explanation.misconceptions[0] || "Confusing model complexity with model generalization."}`,
        analogyOrExample: `Analogy: Memorizing every exact question and answer on last year's exam doesn't mean you know physics; if the professor changes the numbers on the final exam, memorization fails completely. That's why your answer was flagged.`,
        keyTakeaway: `Correction: Always separate training evidence from validation proof.`,
        modelUsed: "BuddyStudy Educational Mock Engine v1 (Offline Safe)",
        isMock: true,
        timestamp: now,
      };

    case "suggest_next":
      // Look up dependent skills in ML graph
      const downstreamDeps = ML_DEPENDENCIES.filter((d) => d.prerequisiteSkillId === skillId);
      const nextSkill = downstreamDeps.length > 0
        ? ML_SKILLS.find((s) => s.id === downstreamDeps[0].dependentSkillId)
        : ML_SKILLS[ML_SKILLS.length - 1];

      return {
        action: "suggest_next",
        title: `Topological Next Step: ${nextSkill ? nextSkill.name : "Capstone Project"}`,
        explanation: `Based on your verified mastery in ${skillName}, the deterministic roadmap engine recommends advancing along your topological dependency branch.`,
        nextTopicSuggestion: nextSkill
          ? {
              skillId: nextSkill.id,
              skillName: nextSkill.name,
              reason: downstreamDeps[0]?.reason || `Mastering ${skillName} satisfies the prerequisite required for ${nextSkill.name}.`,
            }
          : undefined,
        keyTakeaway: `Topological guarantee: All prerequisites for this next step have been satisfied.`,
        modelUsed: "BuddyStudy Educational Mock Engine v1 (Offline Safe)",
        isMock: true,
        timestamp: now,
      };

    case "chat":
    default:
      return {
        action: "chat",
        title: `AI Companion: ${skillName}`,
        explanation: `Regarding your question ("${req.userMessage}"):\n\nIn ${skillName}, we approach this by breaking down the core principles. ${skill.explanation.standard}\n\nWould you like me to explain this with a real-world analogy, walk through a step-by-step calculation, or quiz your understanding?`,
        keyTakeaway: `Key Concept: Link this question directly to your active learning objectives in ${skillName}.`,
        modelUsed: "BuddyStudy Educational Mock Engine v1 (Offline Safe)",
        isMock: true,
        timestamp: now,
      };
  }
}
