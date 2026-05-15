import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AIRecommendationCard } from './AIRecommendationCard';

describe('AIRecommendationCard', () => {
  it('shows weather, recommendation and order button', () => {
    render(
      <MemoryRouter>
        <AIRecommendationCard weather="+22°C, Солнечно" recommendation="Раф с лавандой сегодня хорош" />
      </MemoryRouter>
    );
    expect(screen.getByText('+22°C, Солнечно')).toBeInTheDocument();
    expect(screen.getByText('Раф с лавандой сегодня хорош')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Заказать/ })).toBeInTheDocument();
  });

  it('navigates to /menu when order button clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={
            <AIRecommendationCard weather="+22°C" recommendation="test" />
          } />
          <Route path="/menu" element={<div>MENU PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );
    await user.click(screen.getByRole('button', { name: /Заказать/ }));
    expect(screen.getByText('MENU PAGE')).toBeInTheDocument();
  });
});
