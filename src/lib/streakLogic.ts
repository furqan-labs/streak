import { addDays, daysBetween, todayKey } from './date';
import type { HabitStats } from './types';

/**
 * Current streak counts consecutive checked-in days ending at today.
 * If today isn't checked in yet, the streak is still considered "alive"
 * as long as yesterday was checked in (the user still has today to act).
 */
export function calculateCurrentStreak(checkIns: string[], today: string = todayKey()): number {
  if (checkIns.length === 0) return 0;
  const checkedSet = new Set(checkIns);

  let cursor = checkedSet.has(today) ? today : addDays(today, -1);
  if (!checkedSet.has(cursor)) return 0;

  let streak = 0;
  while (checkedSet.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Longest streak ever achieved, regardless of whether it's still active. */
export function calculateLongestStreak(checkIns: string[]): number {
  if (checkIns.length === 0) return 0;
  const sorted = [...checkIns].sort();

  let longest = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (daysBetween(sorted[i - 1], sorted[i]) === 1) {
      current++;
    } else if (daysBetween(sorted[i - 1], sorted[i]) === 0) {
      // duplicate date, ignore
      continue;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
  }
  return longest;
}

/** Percentage of days since the habit was created that have a check-in. */
export function calculateCompletionRate(
  checkIns: string[],
  createdAt: string,
  today: string = todayKey()
): number {
  const totalDays = Math.max(1, daysBetween(createdAt, today) + 1);
  const rate = (checkIns.length / totalDays) * 100;
  return Math.min(100, Math.round(rate));
}

export function calculateHabitStats(
  checkIns: string[],
  createdAt: string,
  today: string = todayKey()
): HabitStats {
  return {
    currentStreak: calculateCurrentStreak(checkIns, today),
    longestStreak: calculateLongestStreak(checkIns),
    completionRate: calculateCompletionRate(checkIns, createdAt, today),
    totalCheckIns: checkIns.length,
  };
}

export interface HeatmapDay {
  date: string;
  checked: boolean;
  isFuture: boolean;
  isToday: boolean;
}

/**
 * Builds a GitHub-style contribution grid: an array of weeks (columns),
 * each containing 7 days (Sun-Sat), covering the last `weeksCount` weeks
 * up to and including today.
 */
export function getHeatmapWeeks(
  checkIns: string[],
  weeksCount = 12,
  today: string = todayKey()
): HeatmapDay[][] {
  const checkedSet = new Set(checkIns);
  const [ty, tm, td] = today.split('-').map(Number);
  const todayDate = new Date(ty, tm - 1, td);
  const dayOfWeek = todayDate.getDay(); // 0 = Sunday

  const weekEnd = addDays(today, 6 - dayOfWeek); // Saturday of the current week
  const totalDays = weeksCount * 7;
  const start = addDays(weekEnd, -(totalDays - 1)); // aligned Sunday

  const days: HeatmapDay[] = [];
  let cursor = start;
  for (let i = 0; i < totalDays; i++) {
    days.push({
      date: cursor,
      checked: checkedSet.has(cursor),
      isFuture: cursor > today,
      isToday: cursor === today,
    });
    cursor = addDays(cursor, 1);
  }

  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}
