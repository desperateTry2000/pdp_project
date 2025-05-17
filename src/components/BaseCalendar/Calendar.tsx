'use client'
import dynamic from 'next/dynamic';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
// import { useRouter } from 'next/navigation'


const BaseCalendar = dynamic(
  () => import('@fullcalendar/react'), 
  { ssr: false }
);

export default function Calendar() {
    // const router = useRouter()

  return (
    <BaseCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={() => {
        alert('date clicked')
        // router.push(`/calendar/${info.dateStr}`)
      }}      // you can lock it to the current week:
      visibleRange={(currentDate: Date) => {
        const day = currentDate.getDay();
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - day + 1); // Monday
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return { currentDate: weekStart, end: weekEnd };
      }}
    />
  );
}
