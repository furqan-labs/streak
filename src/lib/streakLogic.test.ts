import { describe, it, expect } from 'vitest';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateCompletionRate,
  getHeatmapWeeks,
} from './streakLogic';

const TODAY = '2026-07-12'; // a Sunday

describe('calculateCurrentStreak', () => {
  it('returns 0 for no check-ins', () => {
    expect(calculateCurrentStreak([], TODAY)).toBe(0);
  });

  it('counts a streak that includes today', () => {
    const checkIns = ['2026-07-10', '2026-07-11', '2026-07-12'];
    expect(calculateCurrentStreak(checkIns, TODAY)).toBe(3);
  });

  it('stays alive if yesterday was checked in but today was not yet', () => {
    const checkIns = ['2026-07-10', '2026-07-11'];
    expect(calculateCurrentStreak(checkIns, TODAY)).toBe(2);
  });

  it('resets to 0 if there is a gap before today and yesterday', () => {
    const checkIns = ['2026-07-05', '2026-07-06'];
    expect(calculateCurrentStreak(checkIns, TODAY)).toBe(0);
  });

  it('does not let a future date extend the streak', () => {
    const checkIns = ['2026-07-12', '2026-07-13'];
    expect(calculateCurrentStreak(checkIns, TODAY)).toBe(1);
  });

  it('ignores unrelated older check-ins when counting the current streak', () => {
    const checkIns = ['2026-06-01', '2026-06-02', '2026-07-12'];
    expect(calculateCurrentStreak(checkIns, TODAY)).toBe(1);
  });
});

describe('calculateLongestStreak', () => {
  it('returns 0 for no check-ins', () => {
    expect(calculateLongestStreak([])).toBe(0);
  });

  it('returns 1 for a single check-in', () => {
    expect(calculateLongestStreak(['2026-07-12'])).toBe(1);
  });

  it('finds the longest run among several separate streaks', () => {
    const checkIns = [
      '2026-07-01',
      '2026-07-02',
      // gap
      '2026-07-05',
      '2026-07-06',
      '2026-07-07',
      '2026-07-08',
      // gap
      '2026-07-11',
    ];
    expect(calculateLongestStreak(checkIns)).toBe(4);
  });

  it('is unaffected by out-of-order input', () => {
    const checkIns = ['2026-07-03', '2026-07-01', '2026-07-02'];
    expect(calculateLongestStreak(checkIns)).toBe(3);
  });

  it('ignores duplicate dates', () => {
    const checkIns = ['2026-07-01', '2026-07-01', '2026-07-02'];
    expect(calculateLongestStreak(checkIns)).toBe(2);
  });
});

describe('calculateCompletionRate', () => {
  it('is 100% when every day since creation has a check-in', () => {
    const checkIns = ['2026-07-10', '2026-07-11', '2026-07-12'];
    expect(calculateCompletionRate(checkIns, '2026-07-10', TODAY)).toBe(100);
  });

  it('is 50% when half the days are checked in', () => {
    const checkIns = ['2026-07-09', '2026-07-11'];
    expect(calculateCompletionRate(checkIns, '2026-07-09', TODAY)).toBe(50);
  });

  it('is 0% with no check-ins', () => {
    expect(calculateCompletionRate([], '2026-07-09', TODAY)).toBe(0);
  });

  it('treats a habit created today as a single-day window', () => {
    expect(calculateCompletionRate(['2026-07-12'], TODAY, TODAY)).toBe(100);
  });
});

describe('getHeatmapWeeks', () => {
  it('returns the requested number of weeks, each with 7 days', () => {
    const weeks = getHeatmapWeeks([], 12, TODAY);
    expect(weeks).toHaveLength(12);
    weeks.forEach((week) => expect(week).toHaveLength(7));
  });

  it('marks today correctly', () => {
    const weeks = getHeatmapWeeks([], 4, TODAY);
    const allDays = weeks.flat();
    const todayEntries = allDays.filter((d) => d.isToday);
    expect(todayEntries).toHaveLength(1);
    expect(todayEntries[0].date).toBe(TODAY);
  });

  it('marks days after today as future', () => {
    const weeks = getHeatmapWeeks([], 4, TODAY);
    const allDays = weeks.flat();
    const futureDays = allDays.filter((d) => d.isFuture);
    // Today is a Sunday (start of its week), so the remaining 6 days
    // of the final week should all be in the future.
    expect(futureDays.length).toBe(6);
  });

  it('marks checked-in dates correctly', () => {
    const weeks = getHeatmapWeeks([TODAY], 4, TODAY);
    const allDays = weeks.flat();
    const checkedDays = allDays.filter((d) => d.checked);
    expect(checkedDays).toHaveLength(1);
    expect(checkedDays[0].date).toBe(TODAY);
  });
});
