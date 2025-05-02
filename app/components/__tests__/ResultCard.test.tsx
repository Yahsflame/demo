import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultCard from '../ResultCard';

const mockResults = [
  { title: 'Test Wikipedia Article', url: 'https://wikipedia.org/test' }
];

describe('ResultCard', () => {
  it('renders successfully with Wikipedia results', () => {
    render(
      <ResultCard
        title="Wikipedia"
        results={mockResults}
        status="idle"
        currentPage={1}
        totalResults={10}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole('region', { name: 'Wikipedia results' })).toBeInTheDocument();
    expect(screen.getByText('Test Wikipedia Article')).toBeInTheDocument();
  });

  it('handles loading state correctly', () => {
    render(
      <ResultCard
        title="Wikipedia"
        results={[]}
        status="loading"
        currentPage={1}
        totalResults={10}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole('status', { name: 'Loading results' })).toBeInTheDocument();
  });

  it('handles error state correctly', () => {
    render(
      <ResultCard
        title="Wikipedia"
        results={mockResults}
        status="error"
        currentPage={1}
        totalResults={10}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole('alert', { name: 'Error loading results' })).toBeInTheDocument();
    expect(screen.getByText('Sorry, we encountered an error')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    const handlePageChange = jest.fn();
    
    render(
      <ResultCard
        title="Wikipedia"
        results={mockResults}
        status="idle"
        currentPage={1}
        totalResults={20}
        onPageChange={handlePageChange}
      />
    );

    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(handlePageChange).toHaveBeenCalledWith(2);
    });
  });
}); 