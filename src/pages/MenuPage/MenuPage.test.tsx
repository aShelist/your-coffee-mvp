import { beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { MenuPage } from './MenuPage';
import { useCartStore } from '../../stores/cartStore';

describe('MenuPage', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    localStorage.clear();
  });

  it('renders title "Меню"', () => {
    render(<MemoryRouter><MenuPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Меню' })).toBeInTheDocument();
  });

  it('renders coffee items by default', () => {
    render(<MemoryRouter><MenuPage /></MemoryRouter>);
    expect(screen.getByText('Раф с лавандой')).toBeInTheDocument();
    expect(screen.getByText('Капучино')).toBeInTheDocument();
  });

  it('switches to desserts when tab clicked', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><MenuPage /></MemoryRouter>);
    await user.click(screen.getByRole('tab', { name: /Десерты/ }));
    expect(screen.getByText('Брауни')).toBeInTheDocument();
    expect(screen.queryByText('Раф с лавандой')).not.toBeInTheDocument();
  });

  it('adds item to cart when "+" is clicked', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><MenuPage /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: /Добавить Капучино/ }));
    expect(useCartStore.getState().totalCount()).toBe(1);
    expect(useCartStore.getState().items[0].menuItemId).toBe('cappuccino');
  });
});
