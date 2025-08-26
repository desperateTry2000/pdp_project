// Calendar.tsx
'use client';

import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useJournal } from '@/contexts/JournalContext';

export default function Calendar({
  onDateClick,
}: {
  onDateClick: (dateStr: string) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const { refreshMonth, entries } = useJournal();

  useEffect(() => {
    const month = currentDate.format('YYYY-MM');
    console.log('Refreshing entries for month:', month);
    refreshMonth(month);
  }, [currentDate, refreshMonth]);

  return (
    <div>
      <CalendarHeader
        currentDate={currentDate}
        onChange={(d) => setCurrentDate(d)}
      />
      <CalendarGrid
        currentDate={currentDate}
        onDateClick={onDateClick}
        entriesMap={entries}       
      />
    </div>
  );
}
