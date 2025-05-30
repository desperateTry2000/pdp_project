import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useState } from 'react';
import dayjs from 'dayjs';


export default function Calendar({ onDateClick }: { onDateClick: (dateStr: string) => void }) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  return (
    <div>
      <CalendarHeader currentDate={currentDate} onChange={setCurrentDate} />
      <CalendarGrid currentDate={currentDate} onDateClick={onDateClick} />
    </div>
  );
}
