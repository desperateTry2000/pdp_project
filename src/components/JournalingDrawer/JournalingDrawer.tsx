'use client';

import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react';
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
            <TextArea placeholder="How are you feeling today?" />
            <SaveButton onClick={() => onOpenChange(false)}>Save</SaveButton>
          </MotionDrawerPanel>
        </>
      )}
    </AnimatePresence>
  );
}
