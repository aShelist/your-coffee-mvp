export type OrderItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  priceAtPurchase: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  bonusEarned: number;
};
