import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItemRow } from './CartItemRow';
import type { MenuItem } from '../../data/menuTypes';

const item: MenuItem = {
  id: 'latte',
  category: 'coffee',
  name: 'Латте',
  description: 'whatever',
  price: 280,
  bonusPrice: 230,
  image: 'https://example.com/x.png',
};

describe('CartItemRow', () => {
  it('shows item name, quantity and price', () => {
    render(<CartItemRow item={item} quantity={2} onRemove={() => {}} />);
    expect(screen.getByText('Латте')).toBeInTheDocument();
    expect(screen.getByText('2 шт')).toBeInTheDocument();
    expect(screen.getByText('560 ₽')).toBeInTheDocument();
  });

  it('calls onRemove with item id when delete clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<CartItemRow item={item} quantity={1} onRemove={onRemove} />);
    await user.click(screen.getByRole('button', { name: /Удалить/ }));
    expect(onRemove).toHaveBeenCalledWith('latte');
  });
});
