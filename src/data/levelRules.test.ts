import { describe, expect, it } from 'vitest';
import { getLevel, levelProgress } from './levelRules';

describe('getLevel', () => {
  it('returns Новичок below 500', () => {
    expect(getLevel(0)).toBe('Новичок');
    expect(getLevel(499)).toBe('Новичок');
  });

  it('returns Любитель between 500 and 2000', () => {
    expect(getLevel(500)).toBe('Любитель');
    expect(getLevel(1999)).toBe('Любитель');
  });

  it('returns Кофеман at 2000 and above', () => {
    expect(getLevel(2000)).toBe('Кофеман');
    expect(getLevel(99999)).toBe('Кофеман');
  });
});

describe('levelProgress', () => {
  it('returns Новичок with progress to Любитель at 0', () => {
    const p = levelProgress(0);
    expect(p.current).toBe('Новичок');
    expect(p.next).toBe('Любитель');
    expect(p.toNext).toBe(500);
    expect(p.progress).toBe(0);
  });

  it('returns half progress at 250', () => {
    const p = levelProgress(250);
    expect(p.progress).toBe(0.5);
  });

  it('returns Любитель starting at 500', () => {
    const p = levelProgress(500);
    expect(p.current).toBe('Любитель');
    expect(p.next).toBe('Кофеман');
    expect(p.toNext).toBe(1500);
    expect(p.progress).toBe(0);
  });

  it('returns Кофеман with null next at 2000+', () => {
    const p = levelProgress(2000);
    expect(p.current).toBe('Кофеман');
    expect(p.next).toBeNull();
    expect(p.toNext).toBe(0);
    expect(p.progress).toBe(1);
  });
});
