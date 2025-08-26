import React from 'react';
import { JournalEntry } from '@/contexts/JournalContext';

interface EntryPreviewProps {
  entry: JournalEntry;
  isAlarming: boolean;
}

export default function EntryPreview({ entry, isAlarming }: EntryPreviewProps) {
  return (
    <div className="absolute inset-0 p-1 flex flex-col items-center justify-center">
      {/* Date number */}
      <div className="text-lg font-bold mb-2">
        {new Date(entry.date).getDate()}
      </div>
      
      <div className={`
        w-3 h-3 rounded-full
        ${isAlarming 
          ? 'bg-red-500 dark:bg-red-400 animate-pulse' 
          : 'bg-white dark:bg-dark-300'
        }
        shadow-sm
      `}></div>
      
      {isAlarming && (
        <div className="absolute top-1 right-1 text-lg animate-pulse">
          ⚠️
        </div>
      )}
    </div>
  );
}
