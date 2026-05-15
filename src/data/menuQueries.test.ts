import { describe, expect, it } from 'vitest';
import { getByCategory } from './menuQueries';

describe('getByCategory', () => {
  it('returns coffee items for category=coffee', () => {
    const items = getByCategory('coffee');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.category === 'coffee')).toBe(true);
    expect(items.find((i) => i.id === 'raf-lavender')).toBeDefined();
  });

  it('returns dessert items for category=dessert', () => {
    const items = getByCategory('dessert');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.category === 'dessert')).toBe(true);
  });

  it('returns non-coffee items for category=not-coffee', () => {
    const items = getByCategory('not-coffee');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.category === 'not-coffee')).toBe(true);
  });
});
