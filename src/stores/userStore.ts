import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order } from '../data/orderTypes';
import { getLevel, type Level } from '../data/levelRules';

type UserState = {
  bonusBalance: number;
  totalSpent: number;
  orderHistory: Order[];
  level: () => Level;
  addOrder: (order: Order) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      bonusBalance: 0,
      totalSpent: 0,
      orderHistory: [],
      level: () => getLevel(get().totalSpent),
      addOrder: (order) =>
        set((state) => ({
          bonusBalance: state.bonusBalance + order.bonusEarned,
          totalSpent: state.totalSpent + order.total,
          orderHistory: [...state.orderHistory, order],
        })),
    }),
    { name: 'yc-user' }
  )
);
