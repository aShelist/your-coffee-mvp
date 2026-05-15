import { render, screen } from '@testing-library/react';
import { BonusSummaryCard } from './BonusSummaryCard';

describe('BonusSummaryCard', () => {
  it('shows bonus balance and level', () => {
    render(<BonusSummaryCard bonusBalance={120} totalSpent={780} />);
    expect(screen.getByText('120 Б')).toBeInTheDocument();
    expect(screen.getByText('Любитель')).toBeInTheDocument();
  });
});
