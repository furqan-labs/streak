import { getHeatmapWeeks } from '../lib/streakLogic';
import type { HabitColor } from '../lib/types';

interface HeatmapGridProps {
  checkIns: string[];
  color: HabitColor;
  weeksCount?: number;
}

const DOT_COLOR: Record<HabitColor, string> = {
  flame: 'bg-flame',
  sky: 'bg-sky',
  grape: 'bg-grape',
  mint: 'bg-mint',
  sun: 'bg-sun',
};

export function HeatmapGrid({ checkIns, color, weeksCount = 12 }: HeatmapGridProps) {
  const weeks = getHeatmapWeeks(checkIns, weeksCount);

  return (
    <div className="flex gap-[3px]" role="img" aria-label={`${checkIns.length} check-ins over the last ${weeksCount} weeks`}>
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day) => (
            <div
              key={day.date}
              title={day.date}
              className={`h-2.5 w-2.5 rounded-[2px] ${
                day.isFuture
                  ? 'bg-transparent'
                  : day.checked
                    ? DOT_COLOR[color]
                    : 'bg-ink/10'
              } ${day.isToday ? 'ring-1 ring-ink/40' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
