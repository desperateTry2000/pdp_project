import { Dayjs } from 'dayjs';

interface CalendarDayProps {
  date: Dayjs;
  isCurrentMonth: boolean;
  onClick: () => void;
}

export default function CalendarDay({ date, isCurrentMonth, onClick }: CalendarDayProps) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '1rem',
        background: isCurrentMonth ? 'white' : '#f3f4f6',
        cursor: 'pointer',
        border: '1px solid #e5e7eb',
      }}
    >
      {date.date()}
    </div>
  );
}
