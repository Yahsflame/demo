import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import * as styles from '../styles/results.css';

interface ResultPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ResultPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ResultPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination} role="navigation" aria-label="Pagination">
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
} 