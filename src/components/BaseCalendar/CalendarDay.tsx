import { CalendarDay as StyledDay } from './styles';
import { Dayjs } from 'dayjs';
import { motion } from 'framer-motion'
interface CalendarDayProps {
  date: Dayjs;
  isCurrentMonth: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

export default function CalendarDay({
  date,
  isCurrentMonth,
  isSelected = false,
  onClick,
}: CalendarDayProps) {
  return (
    <StyledDay
      isCurrentMonth={isCurrentMonth}
      isSelected={isSelected}
      onClick={onClick}
    >
      {date.date()}
    </StyledDay>
  );
}

export const MotionCalendarDay = motion(CalendarDay);
