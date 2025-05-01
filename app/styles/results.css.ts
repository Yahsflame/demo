import { style } from '@vanilla-extract/css';

export const resultCard = style({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '1rem',
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
  fontStyle: 'italic',
});

export const resultList = style({
  height: "200px",
  listStyle: 'none',
  overflow: "auto",
  padding: 0,
  margin: 0,
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
});

export const noResults = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  color: '#666',
});

export const imageGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: '10px',
  padding: '10px',
  height: '200px',
  overflow: 'auto',
});

export const imageItem = style({
  width: '100px',
  height: '100px',
  overflow: 'hidden',
  borderRadius: '4px',
  transition: 'transform 0.2s',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const imageLink = style({
  display: 'block',
  width: '100%',
  height: '100%',
});

export const thumbnail = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
}); 