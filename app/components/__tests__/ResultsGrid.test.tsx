import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsGrid from '../ResultsGrid';
import { ApiSelection, ApiResults, ApiStatus } from '../../utils/api/types';

describe('ResultsGrid', () => {
  const mockSelectedApis: ApiSelection = {
    wikipedia: true,
    news: true,
    giphy: false,
    youtube: false,
  };

  const mockResults: ApiResults = {
    wikipedia: [
      { title: 'Wiki Result', url: 'https://wiki.com' }
    ],
    news: [
      { title: 'News Result', url: 'https://news.com' }
    ],
    giphy: [],
    youtube: [],
  };

  const mockStatus: ApiStatus = {
    wikipedia: 'success',
    news: 'success',
    giphy: 'idle',
    youtube: 'idle',
  };

  const mockCurrentPage = {
    wikipedia: 1,
    news: 1,
    giphy: 1,
    youtube: 1,
  };

  const mockTotalResults = {
    wikipedia: 10,
    news: 5,
    giphy: 0,
    youtube: 0,
  };

  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders ResultCard components for selected APIs', () => {
    render(
      <ResultsGrid
        selectedApis={mockSelectedApis}
        results={mockResults}
        status={mockStatus}
        currentPage={mockCurrentPage}
        totalResults={mockTotalResults}
        onPageChange={mockOnPageChange}
      />
    );

    // Check that ResultCard components are rendered for selected APIs
    expect(screen.getByText('Wikipedia')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.queryByText('Giphy')).not.toBeInTheDocument();
    expect(screen.queryByText('YouTube')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <ResultsGrid
        selectedApis={mockSelectedApis}
        results={mockResults}
        status={mockStatus}
        currentPage={mockCurrentPage}
        totalResults={mockTotalResults}
        onPageChange={mockOnPageChange}
      />
    );

    const grid = screen.getByRole('region', { name: 'Search results' });
    expect(grid).toBeInTheDocument();

    const wikiCard = screen.getByRole('region', { name: 'Wikipedia results' });
    expect(wikiCard).toBeInTheDocument();

    const newsCard = screen.getByRole('region', { name: 'News results' });
    expect(newsCard).toBeInTheDocument();
  });

  it('handles empty results correctly', () => {
    const emptyResults: ApiResults = {
      wikipedia: [],
      news: [],
      giphy: [],
      youtube: [],
    };

    render(
      <ResultsGrid
        selectedApis={mockSelectedApis}
        results={emptyResults}
        status={mockStatus}
        currentPage={mockCurrentPage}
        totalResults={mockTotalResults}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Wikipedia')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
  });
}); 