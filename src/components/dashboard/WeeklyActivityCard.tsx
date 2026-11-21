"use client";

import React from "react";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import { WEEKLY_ACTIVITY_DEMO } from "@/lib/state/learnerStore";

export function WeeklyActivityCard() {
  const maxMinutes = 100;
  const totalWeeklyMinutes = WEEKLY_ACTIVITY_DEMO.reduce((acc, curr) => acc + curr.minutes, 0);

  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Weekly Study Activity</h3>
              <span className="text-[10px] text-slate-400">Monday - Sunday Log</span>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {Math.round(totalWeeklyMinutes / 60)}h {totalWeeklyMinutes % 60}m Total
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="grid grid-cols-7 gap-2 h-32 items-end pt-4 pb-2">
          {WEEKLY_ACTIVITY_DEMO.map((day) => {
            const heightPercent = Math.min(100, Math.round((day.minutes / maxMinutes) * 100));
            return (
              <div key={day.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.minutes}m
                </span>
                <div className="w-full bg-slate-800/80 rounded-lg overflow-hidden h-24 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-lg group-hover:brightness-110 transition-all"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-white">
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Velocity: On track to meet 6h weekly goal</span>
        </span>
      </div>
    </div>
  );
}
