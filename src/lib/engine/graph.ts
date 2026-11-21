/**
 * BuddyStudy Graph Engine
 * Pure mathematical algorithms for directed acyclic skill graphs:
 * - Cycle detection
 * - Kahn's Algorithm topological sort
 * - Prerequisite ancestry resolution
 * - Dynamic status unlock calculation
 * - "Why this next?" recommendation rationale
 */

import type { Skill, SkillDependency, SkillStatus, RoadmapNode, LearnerSkillMastery } from "../types/index.ts";

export interface GraphValidationResult {
  isValid: boolean;
  errors: string[];
  cycles: string[][];
  missingNodeIds: string[];
  duplicateEdges: string[];
  selfLoops: string[];
}

export interface RoadmapGenerationOptions {
  masteryThreshold?: number; // default 70%
  targetSkillId?: string;
}

/**
 * Validates graph integrity: detects missing references, duplicate edges, self-loops, and cycles.
 */
export function validateSkillGraph(
  skills: Skill[],
  dependencies: SkillDependency[]
): GraphValidationResult {
  const nodeMap = new Map<string, Skill>(skills.map((s) => [s.id, s]));
  const errors: string[] = [];
  const missingNodeIds: string[] = [];
  const duplicateEdges: string[] = [];
  const selfLoops: string[] = [];
  const seenEdges = new Set<string>();

  // Check edge validity
  for (const dep of dependencies) {
    if (!nodeMap.has(dep.prerequisiteSkillId)) {
      errors.push(`Prerequisite node "${dep.prerequisiteSkillId}" does not exist in skills.`);
      missingNodeIds.push(dep.prerequisiteSkillId);
    }
    if (!nodeMap.has(dep.dependentSkillId)) {
      errors.push(`Dependent node "${dep.dependentSkillId}" does not exist in skills.`);
      missingNodeIds.push(dep.dependentSkillId);
    }
    if (dep.prerequisiteSkillId === dep.dependentSkillId) {
      errors.push(`Self-loop detected on skill "${dep.prerequisiteSkillId}".`);
      selfLoops.push(dep.prerequisiteSkillId);
    }
    const edgeKey = `${dep.prerequisiteSkillId}->${dep.dependentSkillId}`;
    if (seenEdges.has(edgeKey)) {
      errors.push(`Duplicate dependency edge: ${edgeKey}`);
      duplicateEdges.push(edgeKey);
    }
    seenEdges.add(edgeKey);
  }

  // Detect cycles using DFS with 3-color marking (0 = unvisited, 1 = visiting, 2 = visited)
  const adjList = new Map<string, string[]>();
  for (const s of skills) {
    adjList.set(s.id, []);
  }
  for (const dep of dependencies) {
    if (adjList.has(dep.prerequisiteSkillId)) {
      adjList.get(dep.prerequisiteSkillId)!.push(dep.dependentSkillId);
    }
  }

  const visited = new Map<string, number>();
  const cycles: string[][] = [];
  const path: string[] = [];

  function dfs(nodeId: string) {
    visited.set(nodeId, 1); // visiting (currently in recursion stack)
    path.push(nodeId);

    const neighbors = adjList.get(nodeId) || [];
    for (const next of neighbors) {
      const state = visited.get(next) || 0;
      if (state === 1) {
        // Cycle detected: slice the cycle from path
        const cycleStartIndex = path.indexOf(next);
        const cycle = [...path.slice(cycleStartIndex), next];
        cycles.push(cycle);
        errors.push(`Cycle detected in skill graph: ${cycle.join(" -> ")}`);
      } else if (state === 0) {
        dfs(next);
      }
    }

    path.pop();
    visited.set(nodeId, 2); // finished
  }

  for (const s of skills) {
    if ((visited.get(s.id) || 0) === 0) {
      dfs(s.id);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    cycles,
    missingNodeIds,
    duplicateEdges,
    selfLoops,
  };
}

/**
 * Executes Kahn's Algorithm to produce a deterministic topological sort.
 * Returns sorted skill IDs, or throws an error if cycles are present.
 */
export function topologicalSort(
  skills: Skill[],
  dependencies: SkillDependency[]
): string[] {
  const validation = validateSkillGraph(skills, dependencies);
  if (!validation.isValid) {
    throw new Error(`Cannot perform topological sort on invalid graph: ${validation.errors.join("; ")}`);
  }

  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  for (const skill of skills) {
    inDegree.set(skill.id, 0);
    adj.set(skill.id, []);
  }

  for (const dep of dependencies) {
    inDegree.set(dep.dependentSkillId, (inDegree.get(dep.dependentSkillId) || 0) + 1);
    adj.get(dep.prerequisiteSkillId)!.push(dep.dependentSkillId);
  }

  // Queue of nodes with 0 incoming dependencies
  // We sort initially by stage and level to ensure a deterministic, pedagogical order
  const nodeMap = new Map(skills.map(s => [s.id, s]));
  const queue: string[] = [];

  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) {
      queue.push(id);
    }
  }

  // Sort queue by pedagogical stage
  queue.sort((a, b) => {
    const sA = nodeMap.get(a)!;
    const sB = nodeMap.get(b)!;
    return sA.stage - sB.stage || sA.name.localeCompare(sB.name);
  });

  const sortedOrder: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    sortedOrder.push(current);

    const neighbors = adj.get(current) || [];
    for (const next of neighbors) {
      const newDeg = (inDegree.get(next) || 0) - 1;
      inDegree.set(next, newDeg);
      if (newDeg === 0) {
        queue.push(next);
      }
    }

    queue.sort((a, b) => {
      const sA = nodeMap.get(a)!;
      const sB = nodeMap.get(b)!;
      return sA.stage - sB.stage || sA.name.localeCompare(sB.name);
    });
  }

  if (sortedOrder.length !== skills.length) {
    throw new Error("Topological sort could not resolve all skills; graph contains unreachable or cyclic nodes.");
  }

  return sortedOrder;
}

/**
 * Computes all ancestor prerequisite IDs for a given skill (transitive closure).
 */
export function getPrerequisiteAncestors(
  targetSkillId: string,
  dependencies: SkillDependency[]
): Set<string> {
  const prereqMap = new Map<string, string[]>();
  for (const dep of dependencies) {
    if (!prereqMap.has(dep.dependentSkillId)) {
      prereqMap.set(dep.dependentSkillId, []);
    }
    prereqMap.get(dep.dependentSkillId)!.push(dep.prerequisiteSkillId);
  }

  const ancestors = new Set<string>();
  const queue = [targetSkillId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const directPrereqs = prereqMap.get(current) || [];
    for (const p of directPrereqs) {
      if (!ancestors.has(p)) {
        ancestors.add(p);
        queue.push(p);
      }
    }
  }

  return ancestors;
}

/**
 * Personalizes a learning roadmap:
 * - Evaluates learner mastery against prerequisite dependencies.
 * - Computes dynamic unlock states (mastered, in_progress, available, locked, needs_review).
 * - Identifies the single "Next Best Action" skill with clear pedagogical justification.
 */
export function computePersonalizedRoadmap(
  skills: Skill[],
  dependencies: SkillDependency[],
  learnerSkills: Record<string, LearnerSkillMastery> = {},
  options: RoadmapGenerationOptions = {}
): {
  nodes: RoadmapNode[];
  nextRecommendedSkillId?: string;
  nextRecommendedReason?: string;
  totalMinutes: number;
  completedMinutes: number;
  masteredCount: number;
} {
  const threshold = options.masteryThreshold ?? 70;
  const nodeMap = new Map(skills.map(s => [s.id, s]));

  // Topological order ensures we evaluate dependencies before dependents
  const sortedIds = topologicalSort(skills, dependencies);

  // Build incoming dependencies map
  const incoming = new Map<string, SkillDependency[]>();
  for (const s of skills) {
    incoming.set(s.id, []);
  }
  for (const dep of dependencies) {
    if (incoming.has(dep.dependentSkillId)) {
      incoming.get(dep.dependentSkillId)!.push(dep);
    }
  }

  const nodes: RoadmapNode[] = [];
  let nextRecommendedSkillId: string | undefined = undefined;
  let nextRecommendedReason: string | undefined = undefined;
  let totalMinutes = 0;
  let completedMinutes = 0;
  let masteredCount = 0;

  for (const skillId of sortedIds) {
    const skill = nodeMap.get(skillId)!;
    totalMinutes += skill.estimatedMinutes;

    const mastery = learnerSkills[skillId];
    const userScore = mastery?.masteryScore ?? 0;
    const isExplicitlyMastered = mastery?.status === "mastered" || userScore >= threshold;

    const directDeps = incoming.get(skillId) || [];
    const prereqStatusList = directDeps.map((dep) => {
      const prereqSkill = nodeMap.get(dep.prerequisiteSkillId);
      const prereqMastery = learnerSkills[dep.prerequisiteSkillId];
      const satisfied = (prereqMastery?.status === "mastered" || (prereqMastery?.masteryScore ?? 0) >= threshold);
      return {
        skillId: dep.prerequisiteSkillId,
        skillName: prereqSkill ? prereqSkill.name : dep.prerequisiteSkillId,
        isSatisfied: satisfied,
        reason: dep.reason,
      };
    });

    const allRequiredSatisfied = prereqStatusList.every((p) => p.isSatisfied);

    let status: SkillStatus = "locked";
    let unlockReason: string | undefined = undefined;

    if (isExplicitlyMastered) {
      status = "mastered";
      completedMinutes += skill.estimatedMinutes;
      masteredCount++;
      unlockReason = `Mastered with score ${userScore}%`;
    } else if (mastery?.status === "needs_review") {
      status = "needs_review";
      unlockReason = "Flagged for review after recent diagnostic assessment";
    } else if (mastery?.status === "in_progress") {
      status = "in_progress";
      unlockReason = "Currently in progress";
    } else if (allRequiredSatisfied) {
      status = "available";
      if (prereqStatusList.length === 0) {
        unlockReason = "Foundational skill — no prerequisites required";
      } else {
        const prereqNames = prereqStatusList.map(p => p.skillName).join(", ");
        unlockReason = `Unlocked: Completed prerequisites (${prereqNames})`;
      }
    } else {
      status = "locked";
      const missing = prereqStatusList.filter(p => !p.isSatisfied).map(p => p.skillName);
      unlockReason = `Locked: Requires ${missing.join(", ")}`;
    }

    // Determine the next recommended skill (first in-progress or first available in topological order)
    if (!nextRecommendedSkillId) {
      if (status === "in_progress") {
        nextRecommendedSkillId = skill.id;
        nextRecommendedReason = `Continue where you left off on ${skill.name}.`;
      } else if (status === "available") {
        nextRecommendedSkillId = skill.id;
        nextRecommendedReason = `Recommended next: ${skill.name}. ${unlockReason}`;
      } else if (status === "needs_review") {
        nextRecommendedSkillId = skill.id;
        nextRecommendedReason = `Review recommended: Strengthen your foundation in ${skill.name}.`;
      }
    }

    nodes.push({
      ...skill,
      status,
      masteryScore: userScore,
      prerequisites: prereqStatusList,
      unlockReason,
    });
  }

  return {
    nodes,
    nextRecommendedSkillId,
    nextRecommendedReason,
    totalMinutes,
    completedMinutes,
    masteredCount,
  };
}
