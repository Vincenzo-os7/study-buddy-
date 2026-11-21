"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { CheckCircle2, PlayCircle, Unlock, Lock, AlertCircle, Clock } from "lucide-react";
import { SkillStatus } from "@/lib/types";

export interface SkillNodeData {
  id: string;
  name: string;
  level: string;
  stage: number;
  stageName: string;
  status: SkillStatus;
  estimatedMinutes: number;
  masteryScore: number;
  isSelected?: boolean;
}

export const CustomSkillNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as SkillNodeData;
  const status = nodeData.status;

  const statusConfig = {
    mastered: {
      border: "border-emerald-500/70",
      bg: "bg-slate-900/95",
      badgeBg: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
      icon: CheckCircle2,
      label: "Mastered",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    },
    in_progress: {
      border: "border-indigo-500",
      bg: "bg-slate-900/95",
      badgeBg: "bg-indigo-950/60 text-indigo-400 border-indigo-500/30",
      icon: PlayCircle,
      label: "In Progress",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.35)] ring-1 ring-indigo-400",
    },
    available: {
      border: "border-cyan-500/80",
      bg: "bg-slate-900/95",
      badgeBg: "bg-cyan-950/60 text-cyan-400 border-cyan-500/30",
      icon: Unlock,
      label: "Available",
      glow: "shadow-[0_0_18px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50",
    },
    locked: {
      border: "border-slate-800",
      bg: "bg-slate-950/80 opacity-60",
      badgeBg: "bg-slate-900 text-slate-500 border-slate-800",
      icon: Lock,
      label: "Locked",
      glow: "",
    },
    needs_review: {
      border: "border-amber-500/70",
      bg: "bg-slate-900/95",
      badgeBg: "bg-amber-950/60 text-amber-400 border-amber-500/30",
      icon: AlertCircle,
      label: "Needs Review",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]",
    },
  }[status];

  const Icon = statusConfig.icon;

  return (
    <div
      className={`relative w-64 rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer ${statusConfig.border} ${statusConfig.bg} ${statusConfig.glow} hover:scale-[1.02]`}
    >
      {/* Target input handle (left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-indigo-500 border-2 border-slate-950 -ml-1.5"
      />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Stage {nodeData.stage}
        </span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusConfig.badgeBg}`}
        >
          <Icon className="w-3 h-3" />
          <span>{statusConfig.label}</span>
        </span>
      </div>

      <h4 className="text-sm font-bold text-white mb-2 leading-tight">
        {nodeData.name}
      </h4>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-500" />
          {Math.round(nodeData.estimatedMinutes / 60)}h effort
        </span>
        {status === "mastered" ? (
          <span className="text-emerald-400 font-semibold">{nodeData.masteryScore}%</span>
        ) : (
          <span className="capitalize text-slate-500">{nodeData.level}</span>
        )}
      </div>

      {/* Source output handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-cyan-400 border-2 border-slate-950 -mr-1.5"
      />
    </div>
  );
});

CustomSkillNode.displayName = "CustomSkillNode";
