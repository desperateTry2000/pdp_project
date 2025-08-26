'use client';

import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useJournal } from '@/contexts/JournalContext';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

export default function Calendar({
  onDateClick,
}: {
  onDateClick: (dateStr: string) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const { refreshMonth, entries } = useJournal();

  useEffect(() => {
    const month = currentDate.format('YYYY-MM');
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
