import { beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProfilePage } from './ProfilePage';
import { useUserStore } from '../../stores/userStore';
import type { Order } from '../../data/orderTypes';

const order1: Order = {
  id: 'o-1',
  createdAt: '2026-05-14T10:00:00Z',
  items: [{ menuItemId: 'latte', name: 'Латте', quantity: 1, priceAtPurchase: 280 }],
  total: 280,
  bonusEarned: 28,
};
const order2: Order = {
  id: 'o-2',
  createdAt: '2026-05-15T12:00:00Z',
  items: [{ menuItemId: 'cappuccino', name: 'Капучино', quantity: 2, priceAtPurchase: 250 }],
  total: 500,
  bonusEarned: 50,
};

describe('ProfilePage', () => {
  beforeEach(() => {
    useUserStore.setState({ bonusBalance: 0, totalSpent: 0, orderHistory: [] });
    localStorage.clear();
  });

  it('shows empty history message when no orders', () => {
    render(<MemoryRouter><ProfilePage /></MemoryRouter>);
    expect(screen.getByText('У вас пока нет заказов')).toBeInTheDocument();
  });

  it('shows balance and history when orders exist', () => {
    useUserStore.setState({
      bonusBalance: 78,
      totalSpent: 780,
      orderHistory: [order1, order2],
    });
    render(<MemoryRouter><ProfilePage /></MemoryRouter>);
    expect(screen.getByText('78 Б')).toBeInTheDocument();
    expect(screen.getByText(/Уровень:/)).toBeInTheDocument();
    expect(screen.getByText(/Любитель/)).toBeInTheDocument();
    expect(screen.getByText(/Латте × 1/)).toBeInTheDocument();
    expect(screen.getByText(/Капучино × 2/)).toBeInTheDocument();
  });
});
