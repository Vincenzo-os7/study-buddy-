import test from "node:test";
import assert from "node:assert/strict";

import {
  validateSkillGraph,
  topologicalSort,
  getPrerequisiteAncestors,
  computePersonalizedRoadmap
} from "../src/lib/engine/graph.ts";

const sampleSkills = [
  {
    id: "py",
    domainId: "machine-learning",
    name: "Python Foundations",
    slug: "py",
    description: "Python basics",
    level: "beginner",
    estimatedMinutes: 120,
    stage: 1,
    learningObjectives: [],
    resources: [],
    explanation: { standard: "", simplified: "", analogy: "", workedExample: { title: "", steps: [], takeaway: "" }, keyTerms: [], misconceptions: [] }
  },
  {
    id: "math",
    domainId: "machine-learning",
    name: "Linear Algebra",
    slug: "math",
    description: "Vectors & Matrices",
    level: "beginner",
    estimatedMinutes: 180,
    stage: 1,
    learningObjectives: [],
    resources: [],
    explanation: { standard: "", simplified: "", analogy: "", workedExample: { title: "", steps: [], takeaway: "" }, keyTerms: [], misconceptions: [] }
  },
  {
    id: "data",
    domainId: "machine-learning",
    name: "Data Analysis",
    slug: "data",
    description: "Data wrangling",
    level: "intermediate",
    estimatedMinutes: 200,
    stage: 2,
    learningObjectives: [],
    resources: [],
    explanation: { standard: "", simplified: "", analogy: "", workedExample: { title: "", steps: [], takeaway: "" }, keyTerms: [], misconceptions: [] }
  },
  {
    id: "ml",
    domainId: "machine-learning",
    name: "Machine Learning",
    slug: "ml",
    description: "Supervised models",
    level: "intermediate",
    estimatedMinutes: 300,
    stage: 2,
    learningObjectives: [],
    resources: [],
    explanation: { standard: "", simplified: "", analogy: "", workedExample: { title: "", steps: [], takeaway: "" }, keyTerms: [], misconceptions: [] }
  }
];

const sampleDeps = [
  { id: "d1", prerequisiteSkillId: "py", dependentSkillId: "data", isRequired: true, reason: "Py needed for data" },
  { id: "d2", prerequisiteSkillId: "math", dependentSkillId: "data", isRequired: true, reason: "Math needed for data" },
  { id: "d3", prerequisiteSkillId: "data", dependentSkillId: "ml", isRequired: true, reason: "Data needed for ML" }
];

test("graphEngine: validates healthy graph without errors", () => {
  const result = validateSkillGraph(sampleSkills, sampleDeps);
  assert.equal(result.isValid, true);
  assert.equal(result.errors.length, 0);
  assert.equal(result.cycles.length, 0);
});

test("graphEngine: detects cycles correctly", () => {
  const cyclicDeps = [
    ...sampleDeps,
    { id: "d-cycle", prerequisiteSkillId: "ml", dependentSkillId: "py", isRequired: true, reason: "Cycle trigger" }
  ];

  const result = validateSkillGraph(sampleSkills, cyclicDeps);
  assert.equal(result.isValid, false);
  assert.ok(result.cycles.length > 0);
  assert.ok(result.errors.some(e => e.includes("Cycle detected")));
});

test("graphEngine: detects self-loop", () => {
  const selfLoopDeps = [
    { id: "d-self", prerequisiteSkillId: "py", dependentSkillId: "py", isRequired: true, reason: "Self loop" }
  ];

  const result = validateSkillGraph(sampleSkills, selfLoopDeps);
  assert.equal(result.isValid, false);
  assert.equal(result.selfLoops.length, 1);
  assert.equal(result.selfLoops[0], "py");
});

test("graphEngine: topological sort strictly orders prerequisites before dependents", () => {
  const sorted = topologicalSort(sampleSkills, sampleDeps);

  const idxPy = sorted.indexOf("py");
  const idxMath = sorted.indexOf("math");
  const idxData = sorted.indexOf("data");
  const idxML = sorted.indexOf("ml");

  // Prerequisites must appear before dependents
  assert.ok(idxPy < idxData, "py must precede data");
  assert.ok(idxMath < idxData, "math must precede data");
  assert.ok(idxData < idxML, "data must precede ml");
});

test("graphEngine: getPrerequisiteAncestors resolves transitive closure", () => {
  const ancestorsOfML = getPrerequisiteAncestors("ml", sampleDeps);

  assert.equal(ancestorsOfML.has("data"), true);
  assert.equal(ancestorsOfML.has("py"), true);
  assert.equal(ancestorsOfML.has("math"), true);
  assert.equal(ancestorsOfML.has("ml"), false);
});

test("graphEngine: computePersonalizedRoadmap locks skills when prerequisites incomplete", () => {
  // Learner has only completed Python, but not Math
  const learnerSkills = {
    py: { skillId: "py", status: "mastered", masteryScore: 90 }
  };

  const roadmap = computePersonalizedRoadmap(sampleSkills, sampleDeps, learnerSkills);

  const pyNode = roadmap.nodes.find(n => n.id === "py");
  const mathNode = roadmap.nodes.find(n => n.id === "math");
  const dataNode = roadmap.nodes.find(n => n.id === "data");
  const mlNode = roadmap.nodes.find(n => n.id === "ml");

  assert.equal(pyNode.status, "mastered");
  assert.equal(mathNode.status, "available"); // foundational, ready to take
  assert.equal(dataNode.status, "locked"); // missing math
  assert.equal(mlNode.status, "locked"); // missing data

  // Next recommended skill must be math!
  assert.equal(roadmap.nextRecommendedSkillId, "math");
});

test("graphEngine: dynamically unlocks dependent skill when all prerequisites are mastered", () => {
  // Learner completed both Python and Math
  const learnerSkills = {
    py: { skillId: "py", status: "mastered", masteryScore: 85 },
    math: { skillId: "math", status: "mastered", masteryScore: 92 }
  };

  const roadmap = computePersonalizedRoadmap(sampleSkills, sampleDeps, learnerSkills);

  const dataNode = roadmap.nodes.find(n => n.id === "data");
  const mlNode = roadmap.nodes.find(n => n.id === "ml");

  assert.equal(dataNode.status, "available"); // unlocked!
  assert.ok(dataNode.unlockReason.includes("Completed prerequisites"));
  assert.equal(mlNode.status, "locked"); // still locked until data is mastered

  // Next recommended skill is now data analysis!
  assert.equal(roadmap.nextRecommendedSkillId, "data");
});
