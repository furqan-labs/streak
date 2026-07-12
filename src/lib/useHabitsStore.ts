import { useEffect, useState } from 'react';
import type { Habit, HabitColor } from './types';
import { todayKey } from './date';

const STORAGE_KEY = 'streak-habits-v1';
const COLORS: HabitColor[] = ['flame', 'sky', 'grape', 'mint', 'sun'];

function makeId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function useHabitsStore() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch {
      // localStorage unavailable (private browsing, quota exceeded) — app still
      // works for the session, it just won't persist across reloads.
    }
  }, [habits]);

  function addHabit(name: string, emoji: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const color = COLORS[habits.length % COLORS.length];
    const newHabit: Habit = {
      id: makeId(),
      name: trimmed,
      emoji,
      color,
      createdAt: todayKey(),
      checkIns: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  }

  function toggleToday(habitId: string) {
    const today = todayKey();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const isChecked = h.checkIns.includes(today);
        return {
          ...h,
          checkIns: isChecked ? h.checkIns.filter((d) => d !== today) : [...h.checkIns, today],
        };
      })
    );
  }

  function deleteHabit(habitId: string) {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  }

  return { habits, addHabit, toggleToday, deleteHabit };
}
