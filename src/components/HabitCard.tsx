import { useState } from 'react';
import type { Habit } from '../lib/types';
import { calculateHabitStats } from '../lib/streakLogic';
import { todayKey } from '../lib/date';
import { COLOR_CLASSES } from '../lib/colors';
import { FlameIndicator } from './FlameIndicator';
import { HeatmapGrid } from './HeatmapGrid';
import { ConfettiBurst } from './ConfettiBurst';

interface HabitCardProps {
  habit: Habit;
  onToggleToday: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ habit, onToggleToday, onDelete }: HabitCardProps) {
  const [confettiKey, setConfettiKey] = useState(0);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const stats = calculateHabitStats(habit.checkIns, habit.createdAt);
  const checkedToday = habit.checkIns.includes(todayKey());
  const colors = COLOR_CLASSES[habit.color];

  function handleToggle() {
    if (!checkedToday) setConfettiKey((k) => k + 1);
    onToggleToday(habit.id);
  }

  return (
    <div className={`relative overflow-visible rounded-3xl border-2 border-ink/5 ${colors.tint} p-5 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            <span className="mr-1.5">{habit.emoji}</span>
            {habit.name}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">
            Longest {stats.longestStreak}d &middot; {stats.completionRate}% completion
          </p>
        </div>

        {confirmingDelete ? (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onDelete(habit.id)}
              className="rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-cream"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="rounded-full border border-ink/20 px-2.5 py-1 text-xs font-medium text-ink-muted"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            aria-label={`Delete ${habit.name}`}
            className="rounded-full p-1.5 text-ink-muted opacity-60 transition-opacity hover:opacity-100"
          >
            ✕
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="relative">
          <ConfettiBurst triggerKey={confettiKey} />
          <FlameIndicator streak={stats.currentStreak} />
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold transition-all
            ${
              checkedToday
                ? `${colors.bold} text-cream shadow-lg scale-100`
                : 'border-2 border-dashed border-ink/25 text-ink/30 hover:border-ink/50 hover:text-ink/60'
            }`}
          aria-pressed={checkedToday}
          aria-label={checkedToday ? `Undo check-in for ${habit.name}` : `Check in for ${habit.name}`}
        >
          {checkedToday ? '✓' : ''}
        </button>
      </div>

      <div className="mt-4">
        <HeatmapGrid checkIns={habit.checkIns} color={habit.color} weeksCount={14} />
      </div>
    </div>
  );
}
