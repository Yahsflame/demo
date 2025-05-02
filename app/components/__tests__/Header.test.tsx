import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header', () => {
  beforeEach(() => {
    // Reset document styles before each test
    document.documentElement.style.setProperty('--background-color', '');
    document.documentElement.style.setProperty('--text-color', '');
  });

  it('renders successfully with initial dark mode', () => {
    render(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText("Ben's Multi-Search Extravaganza")).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    render(<Header />);
    
    const themeButton = screen.getByRole('button');
    
    // Initial state (dark mode)
    expect(document.documentElement.style.getPropertyValue('--background-color')).toBe('#472C4C');
    expect(document.documentElement.style.getPropertyValue('--text-color')).toBe('#ffffff');
    
    // Click to switch to light mode
    fireEvent.click(themeButton);
    expect(document.documentElement.style.getPropertyValue('--background-color')).toBe('#FFD254');
    expect(document.documentElement.style.getPropertyValue('--text-color')).toBe('#1a1a1a');
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
    
    // Click to switch back to dark mode
    fireEvent.click(themeButton);
    expect(document.documentElement.style.getPropertyValue('--background-color')).toBe('#472C4C');
    expect(document.documentElement.style.getPropertyValue('--text-color')).toBe('#ffffff');
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);
    
    expect(screen.getByRole('banner')).toHaveAttribute('aria-label', 'Application header');
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('aria-label', "Ben's Multi-Search Extravaganza");
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });
}); 