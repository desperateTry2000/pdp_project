'use client';

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react';
import { DateLabel, SaveButton, TextArea, Heading, CloseButton, MotionDrawerPanel, MotionBackdrop} from './styles';

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
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        <SaveButton onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Entry'}
        </SaveButton>
            <SaveButton onClick={() => onOpenChange(false)}>Save</SaveButton>
          </MotionDrawerPanel>
        </>
      )}
    </AnimatePresence>
  );
}
