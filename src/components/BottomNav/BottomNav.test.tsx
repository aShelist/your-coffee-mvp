import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BottomNav } from './BottomNav';

describe('BottomNav', () => {
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
});
