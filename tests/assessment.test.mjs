import test from "node:test";
import assert from "node:assert/strict";

// We import the compiled or source logic
// In node, we can test the pure logic functions directly
import { evaluateAssessment, validateSubmission } from "../src/lib/engine/assessment.ts";

const sampleAssessment = {
  id: "test-assessment-1",
  domainId: "machine-learning",
  title: "Unit Test Assessment",
  description: "Testing assessment scoring and gap analysis",
  passingThreshold: 70,
  questions: [
    {
      id: "q1",
      question: "Question 1",
      options: ["Option A", "Option B", "Option C"],
      correctIndex: 1,
      conceptTag: "py-fundamentals",
      explanation: "Option B is correct because..."
    },
    {
      id: "q2",
      question: "Question 2",
      options: ["True", "False"],
      correctIndex: 0,
      conceptTag: "linear-algebra",
      explanation: "True is correct."
    },
    {
      id: "q3",
      question: "Question 3",
      options: ["Choice 0", "Choice 1", "Choice 2", "Choice 3"],
      correctIndex: 3,
      conceptTag: "statistics",
      explanation: "Choice 3 is correct."
    }
  ]
};

test("evaluateAssessment: perfect score awards 100% and marks all mastered", () => {
  const submissions = [
    { questionId: "q1", selectedIndex: 1 },
    { questionId: "q2", selectedIndex: 0 },
    { questionId: "q3", selectedIndex: 3 }
  ];

  const result = evaluateAssessment(sampleAssessment, submissions);

  assert.equal(result.correctCount, 3);
  assert.equal(result.scorePercentage, 100);
  assert.equal(result.passed, true);
  assert.equal(result.evaluations.length, 3);
  assert.equal(result.evaluations.every(e => e.isCorrect), true);

  // Check mastery status
  assert.equal(result.updatedMasteryMap["py-fundamentals"].status, "mastered");
  assert.equal(result.updatedMasteryMap["linear-algebra"].status, "mastered");
  assert.equal(result.updatedMasteryMap["statistics"].status, "mastered");
});

test("evaluateAssessment: detects knowledge gap and identifies need for review", () => {
  const submissions = [
    { questionId: "q1", selectedIndex: 1 }, // correct (py-fundamentals)
    { questionId: "q2", selectedIndex: 1 }, // incorrect (linear-algebra, correct is 0)
    { questionId: "q3", selectedIndex: 0 }  // incorrect (statistics, correct is 3)
  ];

  const result = evaluateAssessment(sampleAssessment, submissions);

  assert.equal(result.correctCount, 1);
  assert.equal(result.scorePercentage, 33);
  assert.equal(result.passed, false);

  // Py-fundamentals mastered
  assert.equal(result.updatedMasteryMap["py-fundamentals"].status, "mastered");
  assert.equal(result.updatedMasteryMap["py-fundamentals"].masteryScore, 100);

  // Gaps detected
  const linalgGap = result.skillGaps.find(g => g.conceptTag === "linear-algebra");
  assert.ok(linalgGap);
  assert.equal(linalgGap.masteryPercentage, 0);
  assert.equal(linalgGap.status, "available"); // 0% means foundation required
});

test("validateSubmission: rejects out-of-bounds selectedIndex", () => {
  const submissions = [
    { questionId: "q1", selectedIndex: 99 } // q1 only has 3 options
  ];

  const validation = validateSubmission(sampleAssessment, submissions);
  assert.equal(validation.isValid, false);
  assert.ok(validation.errors[0].includes("Invalid selectedIndex"));
});

test("validateSubmission: rejects non-existent questionId", () => {
  const submissions = [
    { questionId: "ghost-question-xyz", selectedIndex: 0 }
  ];

  const validation = validateSubmission(sampleAssessment, submissions);
  assert.equal(validation.isValid, false);
  assert.ok(validation.errors[0].includes("does not exist"));
});

test("evaluateAssessment: handles empty submission gracefully", () => {
  const submissions = [];
  const result = evaluateAssessment(sampleAssessment, submissions);

  assert.equal(result.correctCount, 0);
  assert.equal(result.scorePercentage, 0);
  assert.equal(result.passed, false);
  assert.equal(result.evaluations.every(e => !e.isCorrect), true);
});
