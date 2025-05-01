import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
});

export const title = style({
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: '20px',
  textAlign: "center"
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