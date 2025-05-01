import { style } from '@vanilla-extract/css';

export const searchInput = style({
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  ':focus': {
    outline: 'none',
    borderColor: '#0070f3',
    boxShadow: '0 0 0 2px rgba(0, 112, 243, 0.1)',
  },
});

export const searchButton = style({
  width: '100%',
  padding: '12px',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#0060df',
  },
  ':disabled': {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
});

export const checkboxContainer = style({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#333',
});

export const checkbox = style({
  width: '16px',
  height: '16px',
  cursor: 'pointer',
});

export const searchPanel = style({
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}); 