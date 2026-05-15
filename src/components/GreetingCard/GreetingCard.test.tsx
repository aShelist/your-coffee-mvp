import { fireEvent, render, screen } from '@testing-library/react';
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

  it('renders first letter initial when no photoUrl', () => {
    render(<GreetingCard name="павел" />);
    expect(screen.getByText('П')).toBeInTheDocument();
  });

  it('falls back to initial when image fails to load', () => {
    render(<GreetingCard name="Павел" photoUrl="https://broken.example.com/x.jpg" />);
    const img = screen.getByAltText('Павел');
    fireEvent.error(img);
    expect(screen.queryByAltText('Павел')).not.toBeInTheDocument();
    expect(screen.getByText('П')).toBeInTheDocument();
  });

  it('falls back to "Гость" when name is empty', () => {
    render(<GreetingCard name="" />);
    expect(screen.getByText('Привет, Гость!')).toBeInTheDocument();
    expect(screen.getByText('Г')).toBeInTheDocument();
  });
});
