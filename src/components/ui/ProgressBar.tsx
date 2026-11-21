import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  color?: "brand" | "emerald" | "cyan" | "amber";
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  color = "brand",
  className,
  ...props
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const colors = {
    brand: "bg-indigo-600",
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    amber: "bg-amber-500",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="text-slate-400 font-medium">{label}</span>}
          {showPercentage && <span className="text-slate-300 font-semibold">{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label || "Progress bar"}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50"
      >
        <div
          className={cn("h-full transition-all duration-500 rounded-full", colors[color])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
