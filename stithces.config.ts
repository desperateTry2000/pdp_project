// stitches.config.ts
import { createStitches } from '@stitches/react';

export const { styled, css, theme } = createStitches({
  theme: {
    colors: {
      blue600: '#2563eb',
      blue700: '#1d4ed8',
      gray400: '#9ca3af',
      gray600: '#4b5563',
      white: '#ffffff',
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
      3: '0.75rem',
    },
  },
});
