import CalendarDay from './CalendarDay';
import { getDaysInMonthGrid } from './utils';
import { CalendarGridProps } from './CalendarTypes'

export default function CalendarGrid({ currentDate, onDateClick }: CalendarGridProps) {
  const days = getDaysInMonthGrid(currentDate);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div key={d} style={{ fontWeight: 'bold' }}>{d}</div>
      ))}
      {days.map((day) => (
        <CalendarDay
          key={day.format('YYYY-MM-DD')}
          date={day}
          isCurrentMonth={day.month() === currentDate.month()}
          onClick={() => onDateClick(day.format('YYYY-MM-DD'))}
        />
      ))}
    </div>
  );
}
