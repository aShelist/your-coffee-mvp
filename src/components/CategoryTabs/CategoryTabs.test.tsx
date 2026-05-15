import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryTabs } from './CategoryTabs';

describe('CategoryTabs', () => {
  it('renders three tabs', () => {
    render(<CategoryTabs value="coffee" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /Кофе/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Десерты/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Не кофе/ })).toBeInTheDocument();
  });

  it('marks the active tab as selected', () => {
    render(<CategoryTabs value="dessert" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /Десерты/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /Кофе/ })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange when a tab is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CategoryTabs value="coffee" onChange={onChange} />);
    await user.click(screen.getByRole('tab', { name: /Десерты/ }));
    expect(onChange).toHaveBeenCalledWith('dessert');
  });
});
