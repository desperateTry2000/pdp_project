// src/app/calendar/page.tsx
'use client';

import Calendar from '@/components/BaseCalendar/Calendar';
import JournalingDrawer from '@/components/JournalingDrawer/JournalingDrawer';
import { useState } from 'react';
import { styled } from '@stitches/react';

const PageContainer = styled('div', {
  display: 'flex',
  height: '100vh',
});

const CalendarPane = styled('div', {
  transition: 'width 0.3s ease-in-out',
  width: '100%',
  variants: {
    open: {
      true: { width: '58.333333%' },
      false: { width: '100%' },
    },
  },
});

export default function CalendarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);


  return (
    <PageContainer>
      <CalendarPane open={isOpen}>
        <Calendar
          onDateClick={(dateStr) => {
            setSelectedDate(dateStr);
            setIsOpen(true);
          }}
        />
      </CalendarPane>

      <JournalingDrawer
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        selectedDate={selectedDate}
      />
    </PageContainer>
  );
}
