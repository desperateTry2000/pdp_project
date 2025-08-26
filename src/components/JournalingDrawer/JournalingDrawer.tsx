'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useJournal } from '@/contexts/JournalContext';
import AIChatbot from '@/components/AIChatbot/AIChatbot';

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
  const [showChatbot, setShowChatbot] = useState(false);
  const { addEntry, updateEntry, getEntry, clearEntry, entries } = useJournal();

  // Get previous entries for context (last 5 entries excluding current date)
  const getPreviousEntries = () => {
    const allEntries = Object.values(entries);
    return allEntries
      .filter(entry => entry.date !== selectedDate && entry.content.trim() !== '')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  // Load existing entry when drawer opens
  useEffect(() => {
    if (isOpen && selectedDate) {
      const existingEntry = getEntry(selectedDate);
      if (existingEntry) {
        setContent(existingEntry.content);
        setIsAlarming(existingEntry.isAlarming);
      } else {
        setContent('');
        setIsAlarming(false);
      }
    }
  }, [isOpen, selectedDate, getEntry]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!content.trim()) return setIsAlarming(false);
      try {
        console.log('Analyzing content:', content.substring(0, 50) + '...');
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
        const data = await res.json();
        console.log('Analysis response:', data);
        setIsAlarming(data.isAlarming);
      } catch (error) {
        console.error('Analysis error:', error);
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
    
    console.log('Saving entry:', { date: selectedDate, content: content.substring(0, 50) + '...', isAlarming });
    
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, content, isAlarming }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Save error:', err);
        setError(err.error || 'Unknown error');
      } else {
        const savedEntry = await res.json();
        console.log('Entry saved successfully:', savedEntry);
        
        // Update the context immediately for real-time calendar updates
        if (savedEntry.isAlarming) {
          addEntry({
            date: selectedDate,
            content: savedEntry.content,
            isAlarming: true
          });
        } else {
          updateEntry(selectedDate, { isAlarming: false });
        }
        
        onClose();
        setContent('');
      }
    } catch (e) {
      console.error('Save error:', e);
      setError('Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/journal?date=${selectedDate}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        // Remove from context
        clearEntry(selectedDate);
        onClose();
        setContent('');
      }
    } catch (e) {
      console.error('Delete error:', e);
      setError('Failed to delete entry');
    } finally {
      setLoading(false);
    }
  };

  const existingEntry = getEntry(selectedDate);
  const hasExistingEntry = !!existingEntry?.content;

  return (
    <>
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

              {hasExistingEntry && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-600 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-dark-300 mb-2">
                    📝 Existing entry from this date:
                  </p>
                  <p className="text-sm text-gray-800 dark:text-dark-200 italic">
                    &ldquo;{existingEntry.content}&rdquo;
                  </p>
                </div>
              )}

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
                  {loading ? 'Saving...' : hasExistingEntry ? 'Update Entry' : 'Save Entry'}
                </Button>
                
                {content.trim() && (
                  <Button
                    onClick={() => setShowChatbot(true)}
                    className="self-end bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={loading}
                  >
                    🤖 Analyze with AI
                  </Button>
                )}
                
                {hasExistingEntry && (
                  <Button
                    onClick={handleDelete}
                    disabled={loading}
                    className="self-end bg-red-500 hover:bg-red-600"
                  >
                    Delete Entry
                  </Button>
                )}
                
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

      {/* AI Chatbot */}
      {showChatbot && (
        <AIChatbot
          isOpen={showChatbot}
          onClose={() => setShowChatbot(false)}
          journalEntry={{
            content,
            analysis: { isAlarming },
            date: selectedDate
          }}
          previousEntries={getPreviousEntries()}
        />
      )}
    </>
  );
}
