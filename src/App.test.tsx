import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

describe('App routing', () => {
  it('renders HomePage at / with greeting', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading')).toHaveTextContent(/Главная.*Алексей/);
  });

  it('renders MenuPage at /menu', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Меню' })).toBeInTheDocument();
  });

  it('renders ProductPage with id at /menu/:id', () => {
    render(
      <MemoryRouter initialEntries={['/menu/latte-1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Товар latte-1' })).toBeInTheDocument();
  });
});
