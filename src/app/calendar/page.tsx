// src/app/calendar/page.tsx
'use client';

import Calendar from '@/components/BaseCalendar/Calendar';
import JournalingDrawer from '@/components/JournalingDrawer/JournalingDrawer';
import { useState } from 'react';

export default function CalendarPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Calendar pane: shrinks when drawer opens */}
      <div
        className={`transition-all duration-300 ease-in-out
          ${isOpen ? 'w-7/12' : 'w-full'}`}
      >
        <Calendar />
      </div>

      {/* Drawer pane */}
      <JournalingDrawer
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      />
    </div>
  );
}
