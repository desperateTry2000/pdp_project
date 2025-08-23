// src/app/calendar/page.tsx
'use client';

import { useState } from 'react';
import BaseCalendar from '@/components/BaseCalendar/Calendar';
import JournalingDrawer from '@/components/JournalingDrawer/JournalingDrawer';

export default function CalendarPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Calendar</h1>
        <BaseCalendar onDateClick={handleDateSelect} />
        <JournalingDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          selectedDate={selectedDate} 
        />
      </div>
    </div>
  );
}
