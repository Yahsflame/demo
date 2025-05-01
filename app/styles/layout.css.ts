import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
});

export const title = style({
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: '20px',
});

export const mainGrid = style({
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: '20px',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const searchPanel = style({
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
});

export const resultsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
});

export const resultCard = style({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

export const loadingSpinner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  animation: 'spin 1s linear infinite',
});

export const errorMessage = style({
  color: 'red',
  textAlign: 'center',
  padding: '20px',
});

export const noResults = style({
  textAlign: 'center',
  padding: '20px',
  color: '#666',
}); 