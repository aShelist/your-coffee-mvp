import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItemCard } from './MenuItemCard';
import type { MenuItem } from '../../data/menuTypes';

const item: MenuItem = {
  id: 'raf-lavender',
  category: 'coffee',
  name: 'Раф с лавандой',
  description: 'Авторский сладкий кофе с нежной пенкой и лавандой',
  price: 350,
  bonusPrice: 300,
  image: 'https://example.com/img.png',
};

describe('MenuItemCard', () => {
  it('renders name, description, price and bonus price', () => {
    render(<MenuItemCard item={item} onAdd={() => {}} />);
    expect(screen.getByText('Раф с лавандой')).toBeInTheDocument();
    expect(screen.getByText(/Авторский сладкий/)).toBeInTheDocument();
    expect(screen.getByText('350 ₽')).toBeInTheDocument();
    expect(screen.getByText('или 300 Б')).toBeInTheDocument();
  });

  it('renders product image with alt = item name', () => {
    render(<MenuItemCard item={item} onAdd={() => {}} />);
    const img = screen.getByAltText('Раф с лавандой') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('example.com/img.png');
  });

  it('calls onAdd with item id when "+" button is clicked', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<MenuItemCard item={item} onAdd={onAdd} />);
    await user.click(screen.getByRole('button', { name: /Добавить/ }));
    expect(onAdd).toHaveBeenCalledWith('raf-lavender');
  });

  it('shows quantity inside the button when item is in cart', () => {
    render(<MenuItemCard item={item} inCartQuantity={3} onAdd={() => {}} />);
    const btn = screen.getByRole('button', { name: /в корзине 3/i });
    expect(btn).toHaveTextContent('3');
  });

  it('still adds when in-cart button is clicked', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<MenuItemCard item={item} inCartQuantity={1} onAdd={onAdd} />);
    await user.click(screen.getByRole('button', { name: /в корзине 1/i }));
    expect(onAdd).toHaveBeenCalledWith('raf-lavender');
  });
});
