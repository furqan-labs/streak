export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: HabitColor;
  createdAt: string; // YYYY-MM-DD
  checkIns: string[]; // sorted array of YYYY-MM-DD dates
}

export type HabitColor = 'flame' | 'sky' | 'grape' | 'mint' | 'sun';

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  completionRate: number; // 0-100
  totalCheckIns: number;
}
