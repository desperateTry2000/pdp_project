'use client';

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react';
import {
  DateLabel,
  SaveButton,
  TextArea,
  Heading,
  CloseButton,
  MotionDrawerPanel,
  MotionBackdrop
} from './styles';

interface CustomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string | null;
}

export default function CustomDrawer({
  open,
  onOpenChange,
  selectedDate,
}: CustomDrawerProps) {
  // 1) missing state hooks
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlarming, setIsAlarming] = useState(false)

   useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!content.trim()) return setIsAlarming(false)
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ content }),
        })
        const { isAlarming } = await res.json()
        setIsAlarming(isAlarming)
      } catch {
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [content])

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
        body: JSON.stringify({ date: selectedDate, content, isAlarming }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Unknown error');
      } else {
        onOpenChange(false);
        setContent('');
      }
    } catch (e) {
      console.error(e);
      setError('Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <MotionBackdrop
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <MotionDrawerPanel
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <CloseButton onClick={() => onOpenChange(false)}>✕</CloseButton>
            <Heading>Journal Entry</Heading>
            <DateLabel>
              {selectedDate ? `For ${selectedDate}` : 'No date selected'}
            </DateLabel>

            <TextArea
              placeholder="How are you feeling today?"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            {isAlarming && (
              <p style={{ color: '#c62828', marginTop:'0.5rem' }}>
                It seems like you might be in distress. If you need help, please reach out to a trusted friend or professional.
              </p>
            )}
            {error && (
              <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <SaveButton
                onClick={handleSave}
                disabled={loading || content.trim() === ''}
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </SaveButton>
              <SaveButton
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </SaveButton>
            </div>
          </MotionDrawerPanel>
        </>
      )}
    </AnimatePresence>
  );
}
