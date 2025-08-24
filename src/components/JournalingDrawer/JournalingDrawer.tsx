'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

interface JournalingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
}

export default function JournalingDrawer({
  isOpen,
  onClose,
  selectedDate,
}: JournalingDrawerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlarming, setIsAlarming] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!content.trim()) return setIsAlarming(false);
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
        const { isAlarming } = await res.json();
        setIsAlarming(isAlarming);
      } catch {
        // Handle error silently
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [content]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
        onClose();
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
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 h-full w-full max-w-[540px] bg-white text-gray-900 p-4 z-50 shadow-[-2px_0_12px_rgba(0,0,0,0.1)] flex flex-col rounded-tl-lg rounded-bl-lg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="self-end bg-transparent border-none text-2xl text-gray-500 cursor-pointer mb-2 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-lg font-semibold mb-2">Journal Entry</h2>
            <p className="text-gray-500 text-sm mb-2">
              For {selectedDate}
            </p>

            <textarea
              placeholder="How are you feeling today?"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full min-h-[200px] border border-gray-300 rounded-md p-2 text-base bg-[#fdfaf5] resize-vertical outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
            
            {isAlarming && (
              <p className="text-red-800 mt-2 text-sm">
                ⚠️ It seems like you might be in distress. If you need help, please reach out to a trusted friend or professional.
              </p>
            )}
            
            {error && (
              <p className="text-red-600 mt-2 text-sm">{error}</p>
            )}

            <div className="flex gap-4 mt-4">
              <Button
                onClick={handleSave}
                disabled={loading || content.trim() === ''}
                className="self-end"
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={loading}
                className="self-end"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
