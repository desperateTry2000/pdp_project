import { Dayjs } from 'dayjs';

export function getDaysInMonthGrid(currentDate: Dayjs) {
  const startOfMonth = currentDate.startOf('month');

  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const days = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push(startOfMonth.subtract(i + 1, 'day'));
  }

  for (let i = 0; i < daysInMonth; i++) {
    days.push(startOfMonth.add(i, 'day'));
  }

  while (days.length < 42) {
    days.push(days[days.length - 1].add(1, 'day'));
  }

  return days;
}
