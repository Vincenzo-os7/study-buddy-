"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  MarkerType,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomSkillNode, SkillNodeData } from "./CustomSkillNode";
import { RoadmapNode, SkillDependency } from "@/lib/types";

const nodeTypes: NodeTypes = {
  skillNode: CustomSkillNode as unknown as NodeTypes["skillNode"],
};

interface RoadmapCanvasProps {
  nodes: RoadmapNode[];
  edges: SkillDependency[];
  onSelectSkill: (skillId: string) => void;
  selectedSkillId?: string;
}

export function RoadmapCanvas({
  nodes,
  edges,
  onSelectSkill,
  selectedSkillId,
}: RoadmapCanvasProps) {
  // Convert domain nodes to React Flow layout coordinates
  // We place nodes into horizontal columns based on their stage (1, 2, 3, 4)
  const flowNodes: Node[] = useMemo(() => {
    // Group by stage
    const stageGroups: Record<number, RoadmapNode[]> = { 1: [], 2: [], 3: [], 4: [] };
    nodes.forEach((n) => {
      const s = n.stage || 1;
      if (!stageGroups[s]) stageGroups[s] = [];
      stageGroups[s].push(n);
    });

    const flowList: Node[] = [];
    const stageColumnWidth = 340;
    const nodeHeight = 140;

    Object.entries(stageGroups).forEach(([stageStr, stageNodes]) => {
      const stage = Number(stageStr);
      const x = (stage - 1) * stageColumnWidth + 40;

      stageNodes.forEach((skill, index) => {
        // Vertical spacing centered around stage midpoint
        const y = index * nodeHeight + 40;

        flowList.push({
          id: skill.id,
          type: "skillNode",
          position: { x, y },
          data: {
            id: skill.id,
            name: skill.name,
            level: skill.level,
            stage: skill.stage,
            stageName: `Stage ${skill.stage}`,
            status: skill.status,
            estimatedMinutes: skill.estimatedMinutes,
            masteryScore: skill.masteryScore,
            isSelected: skill.id === selectedSkillId,
          } as unknown as Record<string, unknown>,
        });
      });
    });

    return flowList;
  }, [nodes, selectedSkillId]);

  // Convert dependencies to styled React Flow edges
  const flowEdges: Edge[] = useMemo(() => {
    const nodeStatusMap = new Map(nodes.map((n) => [n.id, n.status]));

    return edges.map((dep) => {
      const prereqStatus = nodeStatusMap.get(dep.prerequisiteSkillId);
      const dependentStatus = nodeStatusMap.get(dep.dependentSkillId);
      const isSatisfied = prereqStatus === "mastered";

      let strokeColor = "#334155"; // locked/muted
      let isAnimated = false;

      if (isSatisfied && (dependentStatus === "available" || dependentStatus === "in_progress")) {
        strokeColor = "#06b6d4"; // cyan active flow
        isAnimated = true;
      } else if (isSatisfied && dependentStatus === "mastered") {
        strokeColor = "#10b981"; // emerald completed flow
      }

      return {
        id: `e-${dep.prerequisiteSkillId}-${dep.dependentSkillId}`,
        source: dep.prerequisiteSkillId,
        target: dep.dependentSkillId,
        animated: isAnimated,
        style: {
          stroke: strokeColor,
          strokeWidth: isAnimated ? 2.5 : 1.75,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
          width: 14,
          height: 14,
        },
      };
    });
  }, [edges, nodes]);

  return (
    <div className="w-full h-[620px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative shadow-inner">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onSelectSkill(node.id)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1.2} color="#1e293b" />
        <Controls
          className="bg-slate-900 border border-slate-800 fill-slate-300 rounded-xl overflow-hidden shadow-card"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Graph Legend Overlay */}
      <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 flex flex-wrap items-center gap-4 backdrop-blur-md shadow-card pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Mastered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>Available Now</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <span>Prerequisites Locked</span>
        </div>
      </div>
    </div>
  );
}
