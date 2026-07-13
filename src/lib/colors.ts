import type { HabitColor } from './types';

interface ColorClasses {
  tint: string;
  bold: string;
  boldText: string;
  ring: string;
}

export const COLOR_CLASSES: Record<HabitColor, ColorClasses> = {
  flame: { tint: 'bg-flame-tint', bold: 'bg-flame', boldText: 'text-flame', ring: 'ring-flame' },
  sky: { tint: 'bg-sky-tint', bold: 'bg-sky', boldText: 'text-sky', ring: 'ring-sky' },
  grape: { tint: 'bg-grape-tint', bold: 'bg-grape', boldText: 'text-grape', ring: 'ring-grape' },
  mint: { tint: 'bg-mint-tint', bold: 'bg-mint', boldText: 'text-mint', ring: 'ring-mint' },
  sun: { tint: 'bg-sun-tint', bold: 'bg-sun', boldText: 'text-sun', ring: 'ring-sun' },
};

export const EMOJI_OPTIONS = ['🔥', '🙏', '🏃', '📚', '🧘', '🎨', '🥗', '💤', '✍️', '🎸', '🧹', '☀️'];
