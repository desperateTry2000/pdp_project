// Calendar.tsx
'use client';

import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

type JournalEntryPayload = {
  date: string;
  isAlarming: boolean;
};

export default function Calendar({
  onDateClick,
}: {
  onDateClick: (dateStr: string) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [entriesMap, setEntriesMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const month = currentDate.format('YYYY-MM');
    fetch(`/api/journal?month=${month}`)
      .then((res) => res.json())
      .then((data: JournalEntryPayload[]) => {
        const map: Record<string, boolean> = {};
        data.forEach((entry) => {
          map[entry.date] = entry.isAlarming;
        });
        setEntriesMap(map);
      })
      .catch((err) => {
        console.error('Failed to load journal entries:', err);
        setEntriesMap({});
      });
  }, [currentDate]);

  return (
    <div>
      <CalendarHeader
        currentDate={currentDate}
        onChange={(d) => setCurrentDate(d)}
      />
      <CalendarGrid
        currentDate={currentDate}
        onDateClick={onDateClick}
        entriesMap={entriesMap}       
      />
    </div>
  );
}
