import dynamic from 'next/dynamic';
import dayGridPlugin from '@fullcalendar/daygrid';

const BaseCalendar = dynamic(
  () => import('@fullcalendar/react'), 
  { ssr: false }
);

export default function Calendar() {
  return (
    <BaseCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      // you can lock it to the current week:
      // visibleRange={({ start }) => {
      //   const day = start.getDay();
      //   const weekStart = new Date(start);
      //   weekStart.setDate(start.getDate() - day + 1); // Monday
      //   const weekEnd = new Date(weekStart);
      //   weekEnd.setDate(weekStart.getDate() + 6);
      //   return { start: weekStart, end: weekEnd };
      // }}
    />
  );
}
