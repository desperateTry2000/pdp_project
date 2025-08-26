import { Dayjs } from 'dayjs';
import { JournalEntry } from '@/contexts/JournalContext';

export interface CalendarHeaderProps {
  currentDate: Dayjs;
  onChange: (date: Dayjs) => void;
}

export interface CalendarGridProps {
  currentDate: Dayjs;
  onDateClick: (dateStr: string) => void;
  entriesMap: Record<string, JournalEntry>;
}
