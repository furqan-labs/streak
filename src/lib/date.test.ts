import { describe, it, expect } from 'vitest';
import { toDateKey, addDays, daysBetween } from './date';

describe('date helpers', () => {
  it('formats a date as YYYY-MM-DD', () => {
    expect(toDateKey(new Date(2026, 6, 12))).toBe('2026-07-12'); // month is 0-indexed
  });

  it('pads single-digit months and days', () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('adds positive days correctly', () => {
    expect(addDays('2026-07-12', 3)).toBe('2026-07-15');
  });

  it('adds negative days correctly', () => {
    expect(addDays('2026-07-12', -3)).toBe('2026-07-09');
  });

  it('rolls over month boundaries', () => {
    expect(addDays('2026-07-30', 3)).toBe('2026-08-02');
  });

  it('rolls over year boundaries', () => {
    expect(addDays('2026-12-30', 3)).toBe('2027-01-02');
  });

  it('calculates days between two dates', () => {
    expect(daysBetween('2026-07-01', '2026-07-10')).toBe(9);
  });

  it('returns 0 for the same date', () => {
    expect(daysBetween('2026-07-01', '2026-07-01')).toBe(0);
  });

  it('returns a negative number when "to" is before "from"', () => {
    expect(daysBetween('2026-07-10', '2026-07-01')).toBe(-9);
  });
});
