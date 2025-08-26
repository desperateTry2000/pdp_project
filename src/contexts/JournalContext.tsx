'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface JournalEntry {
  date: string;
  content: string;
  isAlarming: boolean;
}

interface JournalContextType {
  entries: Record<string, JournalEntry>;
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (date: string, entry: Partial<JournalEntry>) => void;
  removeEntry: (date: string) => void;
  clearEntry: (date: string) => void;
  getEntry: (date: string) => JournalEntry | undefined;
  isAlarming: (date: string) => boolean;
  refreshMonth: (month: string) => Promise<void>;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Record<string, JournalEntry>>({});

  const addEntry = useCallback((entry: JournalEntry) => {
    setEntries(prev => ({
      ...prev,
      [entry.date]: entry
    }));
  }, []);

  const updateEntry = useCallback((date: string, updates: Partial<JournalEntry>) => {
    setEntries(prev => ({
      ...prev,
      [date]: { ...prev[date], ...updates }
    }));
  }, []);

  const removeEntry = useCallback((date: string) => {
    setEntries(prev => {
      const newEntries = { ...prev };
      delete newEntries[date];
      return newEntries;
    });
  }, []);

  const clearEntry = useCallback((date: string) => {
    setEntries(prev => ({
      ...prev,
      [date]: { ...prev[date], content: '', isAlarming: false }
    }));
  }, []);

  const getEntry = useCallback((date: string) => {
    return entries[date];
  }, [entries]);

  const isAlarming = useCallback((date: string) => {
    return entries[date]?.isAlarming ?? false;
  }, [entries]);

  const refreshMonth = useCallback(async (month: string) => {
    try {
      const response = await fetch(`/api/journal?month=${month}`);
      if (response.ok) {
        const monthEntries = await response.json();
        const newEntries: Record<string, JournalEntry> = {};
        
        monthEntries.forEach((entry: { date: string; isAlarming: boolean; content: string }) => {
          newEntries[entry.date] = {
            date: entry.date,
            content: entry.content,
            isAlarming: entry.isAlarming
          };
        });

        setEntries(prev => ({
          ...prev,
          ...newEntries
        }));
      }
    } catch {
      // Silently fail - entries will be refreshed on next mount
    }
  }, []);

  const value: JournalContextType = {
    entries,
    addEntry,
    updateEntry,
    removeEntry,
    clearEntry,
    getEntry,
    isAlarming,
    refreshMonth
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
