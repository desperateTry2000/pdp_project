// import CalendarDay from './CalendarDay';
// import { getDaysInMonthGrid } from './utils';

// export default function CalendarGrid({ currentDate, onDateClick }) {
//   const days = getDaysInMonthGrid(currentDate); // includes prev/next month padding

//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
//       {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
//         <div key={d} style={{ fontWeight: 'bold' }}>{d}</div>
//       ))}
//       {days.map((day) => (
//         <CalendarDay
//           key={day.format('YYYY-MM-DD')}
//           date={day}
//           isCurrentMonth={day.month() === currentDate.month()}
//           onClick={() => onDateClick(day.format('YYYY-MM-DD'))}
//         />
//       ))}
//     </div>
//   );
// }
