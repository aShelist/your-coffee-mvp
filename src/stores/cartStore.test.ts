import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './cartStore';

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    localStorage.clear();
  });

  it('starts empty', () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().totalCount()).toBe(0);
  });

  it('adds a new item with quantity 1', () => {
    useCartStore.getState().add('latte-1');
    const { items, totalCount } = useCartStore.getState();
    expect(items).toEqual([{ menuItemId: 'latte-1', quantity: 1 }]);
    expect(totalCount()).toBe(1);
  });

  it('increments quantity when adding the same item again', () => {
    useCartStore.getState().add('latte-1');
    useCartStore.getState().add('latte-1');
    const { items, totalCount } = useCartStore.getState();
    expect(items).toEqual([{ menuItemId: 'latte-1', quantity: 2 }]);
    expect(totalCount()).toBe(2);
  });

  it('keeps two different items separately', () => {
    useCartStore.getState().add('latte-1');
    useCartStore.getState().add('cappuccino-1');
    useCartStore.getState().add('latte-1');
    const { items, totalCount } = useCartStore.getState();
    expect(items).toHaveLength(2);
    expect(items.find(i => i.menuItemId === 'latte-1')?.quantity).toBe(2);
    expect(items.find(i => i.menuItemId === 'cappuccino-1')?.quantity).toBe(1);
    expect(totalCount()).toBe(3);
  });

  it('removes an item entirely', () => {
    useCartStore.getState().add('latte');
    useCartStore.getState().add('latte');
    useCartStore.getState().add('cappuccino');
    useCartStore.getState().remove('latte');
    const { items, totalCount } = useCartStore.getState();
    expect(items).toEqual([{ menuItemId: 'cappuccino', quantity: 1 }]);
    expect(totalCount()).toBe(1);
  });

  it('clears all items', () => {
    useCartStore.getState().add('latte');
    useCartStore.getState().add('cappuccino');
    useCartStore.getState().clear();
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().totalCount()).toBe(0);
  });

  it('quantityOf returns 0 for items not in cart', () => {
    expect(useCartStore.getState().quantityOf('latte')).toBe(0);
  });

  it('quantityOf returns the count for items in cart', () => {
    useCartStore.getState().add('latte');
    useCartStore.getState().add('latte');
    useCartStore.getState().add('cappuccino');
    expect(useCartStore.getState().quantityOf('latte')).toBe(2);
    expect(useCartStore.getState().quantityOf('cappuccino')).toBe(1);
  });
});
