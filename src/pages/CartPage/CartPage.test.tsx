import { beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartPage } from './CartPage';
import { useCartStore } from '../../stores/cartStore';
import { useUserStore } from '../../stores/userStore';

describe('CartPage', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    useUserStore.setState({ bonusBalance: 0, totalSpent: 0, orderHistory: [] });
    localStorage.clear();
  });

  it('shows empty state when cart is empty', () => {
    render(<MemoryRouter><CartPage /></MemoryRouter>);
    expect(screen.getByText(/Ваша корзина пуста/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Перейти в меню/ })).toHaveAttribute('href', '/menu');
  });

  it('renders items and total when cart has items', () => {
    useCartStore.getState().add('latte');
    useCartStore.getState().add('cappuccino');
    useCartStore.getState().add('latte');
    render(<MemoryRouter><CartPage /></MemoryRouter>);
    expect(screen.getByText('Латте')).toBeInTheDocument();
    expect(screen.getByText('Капучино')).toBeInTheDocument();
    expect(screen.getByText('810 ₽')).toBeInTheDocument();
  });

  it('removes item when delete clicked', async () => {
    const user = userEvent.setup();
    useCartStore.getState().add('latte');
    useCartStore.getState().add('cappuccino');
    render(<MemoryRouter><CartPage /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: /Удалить Латте/ }));
    expect(screen.queryByText('Латте')).not.toBeInTheDocument();
    expect(screen.getByText('Капучино')).toBeInTheDocument();
  });

  it('submits the order: clears cart, adds to userStore, shows success', async () => {
    const user = userEvent.setup();
    useCartStore.getState().add('latte');
    useCartStore.getState().add('latte');

    render(<MemoryRouter><CartPage /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Отправить бариста' }));

    expect(screen.getByText('Заказ отправлен')).toBeInTheDocument();
    expect(useCartStore.getState().items).toEqual([]);

    const u = useUserStore.getState();
    expect(u.totalSpent).toBe(560);
    expect(u.bonusBalance).toBe(56);
    expect(u.orderHistory).toHaveLength(1);
    expect(u.orderHistory[0].items).toEqual([
      { menuItemId: 'latte', name: 'Латте', quantity: 2, priceAtPurchase: 280 },
    ]);
  });
});
