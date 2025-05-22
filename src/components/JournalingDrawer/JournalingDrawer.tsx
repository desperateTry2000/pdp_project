'use client';

import { styled, keyframes } from '@stitches/react';
import { useEffect } from 'react';

interface CustomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Slide animation
const slideIn = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

// Backdrop
const Backdrop = styled('div', {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 40,
  animation: `${fadeIn} 0.3s ease`,
});

// Drawer panel
const DrawerPanel = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100%',
  width: '100%',
  maxWidth: '540px',
  backgroundColor: 'white',
  padding: '1.5rem',
  zIndex: 50,
  boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
  animation: `${slideIn} 0.3s ease`,
  display: 'flex',
  flexDirection: 'column',
});

// Close button
const CloseButton = styled('button', {
  alignSelf: 'flex-end',
  background: 'transparent',
  border: 'none',
  fontSize: '1.25rem',
  color: '#4b5563',
  cursor: 'pointer',
});

// Textarea
const TextArea = styled('textarea', {
  width: '100%',
  minHeight: '200px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '0.75rem',
  fontSize: '1rem',
  marginTop: '1rem',
});

export default function CustomDrawer({ open, onOpenChange }: CustomDrawerProps) {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={() => onOpenChange(false)} />
      <DrawerPanel>
        <CloseButton onClick={() => onOpenChange(false)}>✕</CloseButton>
        <h2>Journal Entry</h2>
        <p>Write down your thoughts for {new Date().toLocaleDateString()}.</p>
        <TextArea placeholder="Start writing..." />
      </DrawerPanel>
    </>
  );
}
