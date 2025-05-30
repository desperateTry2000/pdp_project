import { Dayjs } from 'dayjs';

export interface CalendarHeaderProps {
  currentDate: Dayjs;
  onChange: (date: Dayjs) => void;
}
export interface CalendarGridProps {
  currentDate: Dayjs;
  onDateClick: (dateStr: string) => void;
}
