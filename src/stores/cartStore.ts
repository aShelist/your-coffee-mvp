import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  menuItemId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (menuItemId: string) => void;
  remove: (menuItemId: string) => void;
  clear: () => void;
  totalCount: () => number;
  quantityOf: (menuItemId: string) => number;
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
      remove: (menuItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.menuItemId !== menuItemId),
        })),
      clear: () => set({ items: [] }),
      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      quantityOf: (menuItemId) =>
        get().items.find((i) => i.menuItemId === menuItemId)?.quantity ?? 0,
    }),
    { name: 'yc-cart' }
  )
);
