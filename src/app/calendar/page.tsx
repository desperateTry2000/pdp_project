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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-dark-800 dark:via-dark-700 dark:to-dark-600 p-4 transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-100 mb-8 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
          Calendar
        </h1>
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
