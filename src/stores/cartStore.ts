import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  menuItemId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (menuItemId: string) => void;
  totalCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (menuItemId) =>
        set((state) => {
          const existing = state.items.find((i) => i.menuItemId === menuItemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === menuItemId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { menuItemId, quantity: 1 }] };
        }),
      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'yc-cart' }
  )
);
