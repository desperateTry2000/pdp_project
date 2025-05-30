import dayjs, { Dayjs } from 'dayjs';

export function getDaysInMonthGrid(currentDate: Dayjs) {
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');

  const startDay = startOfMonth.day(); // 0-6 (Sun-Sat)
  const daysInMonth = currentDate.daysInMonth();

  const days = [];

  // Fill in previous month's days
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(startOfMonth.subtract(i + 1, 'day'));
  }

  // Fill current month
  for (let i = 0; i < daysInMonth; i++) {
    days.push(startOfMonth.add(i, 'day'));
  }

  // Fill next month's days to complete grid (42 cells = 6 weeks)
  while (days.length < 42) {
    days.push(days[days.length - 1].add(1, 'day'));
  }

  return days;
}
