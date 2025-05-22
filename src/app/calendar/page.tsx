// // src/app/calendar/page.tsx
// 'use client';

// import Calendar from '@/components/BaseCalendar/Calendar';
// import JournalingDrawer from '@/components/JournalingDrawer/JournalingDrawer';
// import { useState } from 'react';
// import { styled } from '@stitches/react';

// const PageContainer = styled('div', {
//   display: 'flex',
//   height: '100vh',
// });

// const CalendarPane = styled('div', {
//   transition: 'width 0.3s ease-in-out',
//   width: '100%',
//   variants: {
//     open: {
//       true: { width: '58.333333%' },
//       false: { width: '100%' },
//     },
//   },
// });

// export default function CalendarPage() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <PageContainer>
//       <CalendarPane open={isOpen}>
//         <Calendar
//           onDateClick={(dateStr) => {
//             // whenever you click a date, open the drawer
//             setIsOpen(true);
//             // if you want, you can also store `dateStr` in state
//             // to pass down into JournalingDrawer as the selected date
//           }}
//         />
//       </CalendarPane>

//       <JournalingDrawer
//         open={isOpen}
//         // Sheet will call this with the new boolean
//         onOpenChange={(open) => setIsOpen(open)}
//       />
//     </PageContainer>
//   );
// }
