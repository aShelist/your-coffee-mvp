import { beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useCartStore } from '../../stores/cartStore';

describe('BottomNav', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    localStorage.clear();
  });

  it('renders four tabs', () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Меню')).toBeInTheDocument();
    expect(screen.getByText('Корзина')).toBeInTheDocument();
    expect(screen.getByText('Профиль')).toBeInTheDocument();
  });

  it('marks the tab matching current route as active', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <BottomNav />
      </MemoryRouter>
    );
    const menuLink = screen.getByText('Меню').closest('a');
    expect(menuLink?.className).toMatch(/active/);
  });

  it('does not mark a non-current tab as active', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <BottomNav />
      </MemoryRouter>
    );
    const homeLink = screen.getByText('Главная').closest('a');
    expect(homeLink?.className).not.toMatch(/active/);
  });

  it('does not show cart badge when cart is empty', () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );
    expect(screen.queryByLabelText(/в корзине/)).not.toBeInTheDocument();
  });

  it('shows cart badge with count when cart has items', () => {
    useCartStore.setState({
      items: [
        { menuItemId: 'latte', quantity: 2 },
        { menuItemId: 'cappuccino', quantity: 1 },
      ],
    });
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );
    const badge = screen.getByLabelText(/в корзине 3/);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('3');
  });
});
