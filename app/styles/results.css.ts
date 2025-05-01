import { style } from '@vanilla-extract/css';

export const resultCard = style({
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '1rem',
  height: '300px'
});

export const resultTitleContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
});

export const resultTitle = style({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#333333',
  margin: 0,
});

export const resultCount = style({
  fontSize: '0.875rem',
  color: '#666666',
});

export const resultList = style({
  height: "170px",
  listStyle: 'none',
  overflow: "auto",
  padding: 0,
  margin: 0,
  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
});

export const resultItem = style({
  marginBottom: '12px',
  padding: '8px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#f5f5f5',
  },
});

export const resultLink = style({
  color: '#0070f3',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const Giphy = style({
    display: 'grid',
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)"
});

export const loadingSpinner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: '#0070f3',
  fontSize: '40px',
  animation: 'spin 1s linear infinite',
});

export const errorMessage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  color: '#dc3545',
  textAlign: 'center',
});

export const noResults = style({
  textAlign: 'center',
  padding: '2rem',
  color: '#666666',
});

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '1rem',
  padding: '0.5rem',
});

export const paginationButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  borderRadius: '4px',
  border: '1px solid #cccccc',
  backgroundColor: '#ffffff',
  color: '#333333',
  cursor: 'pointer',
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: '#f5f5f5',
    },
  },
});

export const pageInfo = style({
  fontSize: '0.875rem',
  color: '#666666',
});

export const giphyContainer = style({
  height: '170px',
  overflow: 'auto',
  padding: '0.5rem',
  boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)',
});

export const giphyGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: '0.5rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const giphyItem = style({
  aspectRatio: '1',
  overflow: 'hidden',
  borderRadius: '4px',
  transition: 'transform 0.2s',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const giphyLink = style({
  display: 'block',
  width: '100%',
  height: '100%',
});

export const thumbnail = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '4px',
});

export const loadingPlaceholder = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: 'pulse 1.5s ease-in-out infinite',
    },
  },
}); 