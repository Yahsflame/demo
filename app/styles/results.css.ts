import { style } from '@vanilla-extract/css';

export const resultCard = style({
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'boxShadow 0.2s',
  ':hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
});

export const resultTitle = style({
  margin: '0 0 16px 0',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
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