import { render, screen } from '@testing-library/react';
import { GreetingCard } from './GreetingCard';

describe('GreetingCard', () => {
  it('shows greeting with name', () => {
    render(<GreetingCard name="Павел" />);
    expect(screen.getByText('Привет, Павел!')).toBeInTheDocument();
  });

  it('renders avatar image when photoUrl is provided', () => {
    render(<GreetingCard name="Павел" photoUrl="https://example.com/p.jpg" />);
    expect(screen.getByAltText('Павел')).toHaveAttribute('src', 'https://example.com/p.jpg');
  });
});
