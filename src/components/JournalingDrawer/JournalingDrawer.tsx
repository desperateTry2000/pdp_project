'use client';

import { styled, keyframes } from '@stitches/react';
import { useEffect, useState } from 'react';

interface CustomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string | null;
}

const slideIn = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const Backdrop = styled('div', {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 40,
  animation: `${fadeIn} 0.3s ease`,
});

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

const CloseButton = styled('button', {
  alignSelf: 'flex-end',
  background: 'transparent',
  border: 'none',
  fontSize: '1.25rem',
  color: '#4b5563',
  cursor: 'pointer',
});

const TextArea = styled('textarea', {
  width: '100%',
  minHeight: '200px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '0.75rem',
  fontSize: '1rem',
  marginTop: '1rem',
});

const SaveButton = styled('button', {
  marginTop: '1rem',
  padding: '0.75rem 1rem',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export default function CustomDrawer({ open, onOpenChange, selectedDate }: CustomDrawerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleSave = async () => {
    if (!selectedDate || content.trim() === '') return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, content }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Unknown error');
      } else {
        onOpenChange(false);
        setContent('');
      }
    } catch (e) {
      console.error(e)
      setError('Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={() => onOpenChange(false)} />
      <DrawerPanel>
        <CloseButton onClick={() => onOpenChange(false)}>✕</CloseButton>
        <h2>Journal Entry</h2>
        <p>Write down your thoughts for {selectedDate ?? 'the selected day'}.</p>
        <TextArea
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        <SaveButton onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Entry'}
        </SaveButton>
      </DrawerPanel>
    </>
  );
}
