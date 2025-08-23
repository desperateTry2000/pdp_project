import { StyledCalendarGrid, DayHeader, CalendarDay } from './styles';
import { getDaysInMonthGrid } from './utils';
import { CalendarGridProps } from './CalendarTypes';

export default function CalendarGrid({
  currentDate,
  onDateClick,
  selectedDate,
  entriesMap
}: CalendarGridProps & { selectedDate?: string }) {
  const days = getDaysInMonthGrid(currentDate);
  const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <StyledCalendarGrid>
      {headers.map(h => <DayHeader key={h}>{h}</DayHeader>)}

      {days.map(day => {
        const dateStr = day.format('YYYY-MM-DD');
        const isAlarming = entriesMap[dateStr] ?? false;

        return (
          <CalendarDay
            key={dateStr}
            isCurrentMonth={day.month() === currentDate.month()}
            isSelected={dateStr === selectedDate}
            isAlarming={isAlarming}
            onClick={() => onDateClick(dateStr)}
          >
            {day.date()}
          </CalendarDay>
        );
      })}
    </StyledCalendarGrid>
  );
}
