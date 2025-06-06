import { createStitches } from '@stitches/react';

export const { styled, css, theme } = createStitches({
  theme: {
    colors: {
      background: '#f9f9fb',
      surface: '#94b4e4',
      white: '#ffffff',
      primary: '#9b8ef7',    
      primaryHover: '#5b53e6',
      text: '#2e2e3a',
      mutedText: '#6c6c80',
      border: '#e4e4ef',
      blue600: '#2563eb',
      blue700: '#1d4ed8',
      gray400: '#9ca3af',
      gray600: '#4b5563',
    },
    fontSizes: {
      base: '1rem',
    },
    radii: {
      sm: '4px',
      md: '6px',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      4: '1rem',
    },
  },
});
