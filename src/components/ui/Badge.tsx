import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, PlayCircle, Unlock, Lock, AlertCircle } from "lucide-react";
import { SkillStatus } from "@/lib/types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "neutral" | "brand";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "default", size = "sm", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    brand: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    info: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    neutral: "bg-slate-800/80 text-slate-400 border-slate-700/60",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs font-medium rounded-full border",
    md: "px-3 py-1 text-xs font-semibold rounded-full border",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5", variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}

export function StatusBadge({ status, className }: { status: SkillStatus; className?: string }) {
  switch (status) {
    case "mastered":
      return (
        <Badge variant="success" className={className}>
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Mastered</span>
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="brand" className={className}>
          <PlayCircle className="w-3 h-3 text-indigo-400" />
          <span>In Progress</span>
        </Badge>
      );
    case "available":
      return (
        <Badge variant="info" className={className}>
          <Unlock className="w-3 h-3 text-cyan-400" />
          <span>Available Now</span>
        </Badge>
      );
    case "locked":
      return (
        <Badge variant="neutral" className={className}>
          <Lock className="w-3 h-3 text-slate-400" />
          <span>Prerequisites Locked</span>
        </Badge>
      );
    case "needs_review":
      return (
        <Badge variant="warning" className={className}>
          <AlertCircle className="w-3 h-3 text-amber-400" />
          <span>Needs Review</span>
        </Badge>
      );
    default:
      return null;
  }
}
