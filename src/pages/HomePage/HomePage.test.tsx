import { beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { useUserStore } from '../../stores/userStore';

describe('HomePage', () => {
  beforeEach(() => {
    useUserStore.setState({ bonusBalance: 0, totalSpent: 0, orderHistory: [] });
    localStorage.clear();
  });

  it('renders greeting with mock user name', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText(/Привет, Алексей/)).toBeInTheDocument();
  });

  it('renders AI recommendation block', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText(/Раф с лавандой/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Заказать/ })).toBeInTheDocument();
  });

  it('renders promo tiles', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText('Бонус-рулетка')).toBeInTheDocument();
    expect(screen.getByText('Вызов дня')).toBeInTheDocument();
  });

  it('renders bonus summary with current balance and level', () => {
    useUserStore.setState({ bonusBalance: 78, totalSpent: 780, orderHistory: [] });
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByText('78 Б')).toBeInTheDocument();
    expect(screen.getByText('Любитель')).toBeInTheDocument();
  });
});
