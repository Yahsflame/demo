import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultStatus from '../ResultStatus';

describe('ResultStatus', () => {
  it('renders loading spinner when status is loading and no results', () => {
    render(<ResultStatus status="loading" resultsLength={0} />);
    
    const spinner = screen.getByRole('status', { name: 'Loading results' });
    expect(spinner).toBeInTheDocument();
  });

  it('renders error message when status is error', () => {
    render(<ResultStatus status="error" resultsLength={0} />);
    
    const errorMessage = screen.getByRole('alert', { name: 'Error loading results' });
    expect(errorMessage).toBeInTheDocument();
    expect(screen.getByText('Sorry, we encountered an error')).toBeInTheDocument();
  });

  it('renders no results message when status is success and no results', () => {
    render(<ResultStatus status="success" resultsLength={0} />);
    
    const noResults = screen.getByRole('status', { name: 'No results found' });
    expect(noResults).toBeInTheDocument();
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('returns null when status is idle', () => {
    const { container } = render(<ResultStatus status="idle" resultsLength={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when status is loading and there are results', () => {
    const { container } = render(<ResultStatus status="loading" resultsLength={5} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when status is success and there are results', () => {
    const { container } = render(<ResultStatus status="success" resultsLength={5} />);
    expect(container.firstChild).toBeNull();
  });

  it('has proper accessibility attributes', () => {
    render(<ResultStatus status="loading" resultsLength={0} />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading results');
  });
}); 