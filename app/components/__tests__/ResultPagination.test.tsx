import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultPagination from '../ResultPagination';

describe('ResultPagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('returns null when totalPages is 1', () => {
    const { container } = render(
      <ResultPagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination controls correctly', () => {
    render(
      <ResultPagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const pagination = screen.getByRole('navigation', { name: 'Pagination' });
    expect(pagination).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: 'Previous page' });
    const nextButton = screen.getByRole('button', { name: 'Next page' });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    const pageInfo = screen.getByText('Page 2 of 5');
    expect(pageInfo).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <ResultPagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Previous page' });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <ResultPagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: 'Next page' });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with correct page number', () => {
    render(
      <ResultPagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Previous page' });
    const nextButton = screen.getByRole('button', { name: 'Next page' });

    prevButton.click();
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    nextButton.click();
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('has proper accessibility attributes', () => {
    render(
      <ResultPagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Previous page' });
    const nextButton = screen.getByRole('button', { name: 'Next page' });

    expect(prevButton).toHaveAttribute('aria-label', 'Previous page');
    expect(nextButton).toHaveAttribute('aria-label', 'Next page');
  });
}); 