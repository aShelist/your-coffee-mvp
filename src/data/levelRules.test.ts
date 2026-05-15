import { describe, expect, it } from 'vitest';
import { getLevel } from './levelRules';

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
