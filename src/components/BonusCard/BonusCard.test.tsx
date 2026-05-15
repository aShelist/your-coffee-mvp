import { render, screen } from '@testing-library/react';
import { BonusCard } from './BonusCard';

describe('BonusCard', () => {
  it('shows current balance in Б', () => {
    render(<BonusCard bonusBalance={120} totalSpent={300} />);
    expect(screen.getByText('120 Б')).toBeInTheDocument();
  });

  it('shows current level and progress to next', () => {
    render(<BonusCard bonusBalance={0} totalSpent={250} />);
    expect(screen.getByText(/Новичок/)).toBeInTheDocument();
    expect(screen.getByText(/до Любитель: 250 ₽/)).toBeInTheDocument();
  });

  it('shows max-level state when totalSpent is high', () => {
    render(<BonusCard bonusBalance={500} totalSpent={3000} />);
    expect(screen.getByText(/Кофеман/)).toBeInTheDocument();
    expect(screen.getByText('Максимальный уровень достигнут')).toBeInTheDocument();
  });

  it('progress bar reflects progress value', () => {
    render(<BonusCard bonusBalance={0} totalSpent={250} />);
    const pb = screen.getByRole('progressbar');
    expect(pb).toHaveAttribute('aria-valuenow', '50');
  });
});
