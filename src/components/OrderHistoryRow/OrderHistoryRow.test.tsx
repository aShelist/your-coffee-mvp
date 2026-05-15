import { render, screen } from '@testing-library/react';
import { OrderHistoryRow } from './OrderHistoryRow';
import type { Order } from '../../data/orderTypes';

const order: Order = {
  id: 'o-1',
  createdAt: '2026-05-15T12:30:00Z',
  items: [
    { menuItemId: 'latte', name: 'Латте', quantity: 2, priceAtPurchase: 280 },
    { menuItemId: 'cappuccino', name: 'Капучино', quantity: 1, priceAtPurchase: 250 },
  ],
  total: 810,
  bonusEarned: 81,
};

describe('OrderHistoryRow', () => {
  it('renders total, item list and bonus earned', () => {
    render(<OrderHistoryRow order={order} />);
    expect(screen.getByText('810 ₽')).toBeInTheDocument();
    expect(screen.getByText('Латте × 2, Капучино × 1')).toBeInTheDocument();
    expect(screen.getByText('+81 бонусов')).toBeInTheDocument();
  });
});
