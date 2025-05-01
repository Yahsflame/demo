import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0',
});

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: 0,
  color: 'var(--text-color)',
});

export const themeToggle = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-color)',
  transition: 'transform 0.2s ease',
  ':hover': {
    transform: 'scale(1.1)',
  },
});

export const mainGrid = style({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: '1rem',
  '@media': {
    '(max-width: 992px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const resultsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
});

export const errorContainer = style({
  padding: '2rem',
  margin: '1rem',
  backgroundColor: '#fee2e2',
  border: '1px solid #ef4444',
  borderRadius: '0.5rem',
  color: '#991b1b',
  textAlign: 'center',
}); 