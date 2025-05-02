import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultTitle from '../ResultTitle';

describe('ResultTitle', () => {
  it('renders title only when status is not success', () => {
    render(
      <ResultTitle
        title="Test Results"
        status="loading"
        startIndex={0}
        endIndex={0}
        totalResults={0}
        resultsLength={0}
      />
    );

    const title = screen.getByText('Test Results');
    expect(title).toBeInTheDocument();
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  it('renders title and count when status is success and there are results', () => {
    render(
      <ResultTitle
        title="Test Results"
        status="success"
        startIndex={1}
        endIndex={10}
        totalResults={100}
        resultsLength={10}
      />
    );

    const title = screen.getByText('Test Results');
    expect(title).toBeInTheDocument();

    const count = screen.getByText('Showing 2-10 of 100 results');
    expect(count).toBeInTheDocument();
  });

  it('renders "No results" when status is success and there are no results', () => {
    render(
      <ResultTitle
        title="Test Results"
        status="success"
        startIndex={0}
        endIndex={0}
        totalResults={0}
        resultsLength={0}
      />
    );

    const title = screen.getByText('Test Results');
    expect(title).toBeInTheDocument();

    const count = screen.getByText('No results');
    expect(count).toBeInTheDocument();
  });

  it('has proper heading level', () => {
    render(
      <ResultTitle
        title="Test Results"
        status="success"
        startIndex={1}
        endIndex={10}
        totalResults={100}
        resultsLength={10}
      />
    );

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Results');
  });
}); 