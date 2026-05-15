import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from './userStore';
import type { Order } from '../data/orderTypes';

const sampleOrder: Order = {
  id: 'o-1',
  createdAt: '2026-05-15T12:00:00Z',
  items: [{ menuItemId: 'latte', name: 'Латте', quantity: 2, priceAtPurchase: 280 }],
  total: 560,
  bonusEarned: 56,
};

describe('userStore', () => {
  beforeEach(() => {
    useUserStore.setState({ bonusBalance: 0, totalSpent: 0, orderHistory: [] });
    localStorage.clear();
  });

  it('starts at zero', () => {
    const s = useUserStore.getState();
    expect(s.bonusBalance).toBe(0);
    expect(s.totalSpent).toBe(0);
    expect(s.orderHistory).toEqual([]);
    expect(s.level()).toBe('Новичок');
  });

  it('addOrder updates balance, totalSpent and pushes to history', () => {
    useUserStore.getState().addOrder(sampleOrder);
    const s = useUserStore.getState();
    expect(s.bonusBalance).toBe(56);
    expect(s.totalSpent).toBe(560);
    expect(s.orderHistory).toEqual([sampleOrder]);
  });

  it('level moves to Любитель after crossing 500', () => {
    useUserStore.getState().addOrder({ ...sampleOrder, id: 'o-1', total: 600, bonusEarned: 60 });
    expect(useUserStore.getState().level()).toBe('Любитель');
  });

  it('keeps multiple orders in history (newest last)', () => {
    useUserStore.getState().addOrder({ ...sampleOrder, id: 'o-1' });
    useUserStore.getState().addOrder({ ...sampleOrder, id: 'o-2' });
    expect(useUserStore.getState().orderHistory.map(o => o.id)).toEqual(['o-1', 'o-2']);
  });
});
