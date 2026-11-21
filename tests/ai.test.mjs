import test from "node:test";
import assert from "node:assert/strict";

import { generateMockAIResponse } from "../src/lib/ai/mockProvider.ts";
import { checkRateLimit, getAICompanionResponse } from "../src/lib/ai/provider.ts";

test("aiMockProvider: generates simple ELI5 explanation with analogy", () => {
  const req = {
    action: "explain_simply",
    domain: "machine-learning",
    currentSkillId: "supervised-ml",
    currentSkillName: "Supervised Learning",
    userMessage: "Explain supervised learning",
  };

  const res = generateMockAIResponse(req);

  assert.equal(res.action, "explain_simply");
  assert.ok(res.title.includes("Supervised Learning"));
  assert.ok(res.explanation.length > 20);
  assert.ok(res.analogyOrExample.length > 20);
  assert.ok(res.keyTakeaway.length > 10);
  assert.equal(res.isMock, true);
});

test("aiMockProvider: generates deep mathematical explanation with optimization formula", () => {
  const req = {
    action: "explain_deeply",
    domain: "machine-learning",
    currentSkillId: "supervised-ml",
    currentSkillName: "Supervised Learning",
    userMessage: "Give me the deep math",
  };

  const res = generateMockAIResponse(req);

  assert.equal(res.action, "explain_deeply");
  assert.ok(res.explanation.includes("gradient descent") || res.explanation.includes("loss function"));
  assert.ok(res.keyTakeaway.includes("Rigorous Principle"));
});

test("aiMockProvider: generates concrete real-world case study with production constraints", () => {
  const req = {
    action: "real_world_example",
    domain: "machine-learning",
    currentSkillId: "supervised-ml",
    currentSkillName: "Supervised Learning",
    userMessage: "Show real world use",
  };

  const res = generateMockAIResponse(req);

  assert.equal(res.action, "real_world_example");
  assert.ok(res.analogyOrExample.includes("Real-World Case Study"));
  assert.ok(res.analogyOrExample.includes("latency"));
});

test("aiMockProvider: generates a structured quiz with 4 options and correct explanation", () => {
  const req = {
    action: "generate_quiz",
    domain: "machine-learning",
    currentSkillId: "supervised-ml",
    currentSkillName: "Supervised Learning",
    userMessage: "Quiz me",
  };

  const res = generateMockAIResponse(req);

  assert.equal(res.action, "generate_quiz");
  assert.ok(res.quiz);
  assert.equal(res.quiz.options.length, 4);
  assert.ok(res.quiz.correctIndex >= 0 && res.quiz.correctIndex < 4);
  assert.ok(res.quiz.explanation.length > 15);
});

test("aiMockProvider: explains mistakes and misconceptions Socratic-style", () => {
  const req = {
    action: "explain_mistake",
    domain: "machine-learning",
    currentSkillId: "supervised-ml",
    currentSkillName: "Supervised Learning",
    userMessage: "I chose high accuracy over recall",
    context: {
      incorrectAnswerContext: {
        question: "Why holdout test data?",
        userAnswer: "To speed up inference",
        correctAnswer: "To prevent overfitting",
      },
    },
  };

  const res = generateMockAIResponse(req);

  assert.equal(res.action, "explain_mistake");
  assert.ok(res.explanation.includes("To speed up inference"));
  assert.ok(res.explanation.includes("To prevent overfitting"));
});

test("aiMockProvider: suggests next topic along topological graph branch", () => {
  const req = {
    action: "suggest_next",
    domain: "machine-learning",
    currentSkillId: "supervised-ml",
    currentSkillName: "Supervised Learning",
    userMessage: "What to learn next?",
  };

  const res = generateMockAIResponse(req);

  assert.equal(res.action, "suggest_next");
  assert.ok(res.nextTopicSuggestion);
  assert.ok(res.nextTopicSuggestion.skillId.length > 0);
  assert.ok(res.nextTopicSuggestion.reason.length > 10);
});

test("rateLimiter: enforces max requests per minute window", () => {
  const clientId = `test-ip-${Date.now()}`;

  // Fire 25 requests -> all allowed
  for (let i = 0; i < 25; i++) {
    const check = checkRateLimit(clientId);
    assert.equal(check.allowed, true);
  }

  // 26th request -> rejected
  const blockedCheck = checkRateLimit(clientId);
  assert.equal(blockedCheck.allowed, false);
  assert.equal(blockedCheck.remaining, 0);
});

test("aiDispatcher: returns educational response safely via getAICompanionResponse", async () => {
  const req = {
    action: "explain_simply",
    domain: "machine-learning",
    currentSkillId: "linear-algebra",
    currentSkillName: "Linear Algebra",
    userMessage: "Vectors please",
  };

  const res = await getAICompanionResponse(req, `safe-client-${Date.now()}`);
  assert.equal(res.action, "explain_simply");
  assert.ok(res.title.includes("Linear Algebra"));
  assert.ok(res.isMock === true || res.isMock === false);
});
