'use client';

import { useState } from 'react';
import BaseCalendar from '@/components/BaseCalendar/Calendar';
import JournalingDrawer from '@/components/JournalingDrawer/JournalingDrawer';
import AIChatbot from '@/components/AIChatbot/AIChatbot';
import MessageIcon from '@/components/icons/MessageIcon';
import CalendarIcon from '@/components/icons/CalendarIcon';

export default function CalendarPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
  };

  const handleStartChat = () => {
    setIsChatbotOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-dark-800 dark:via-dark-700 dark:to-dark-600 p-4 transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4 shadow-lg">
            <CalendarIcon className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-100 mb-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Welcome to Your Wellness Journey
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-dark-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            How do you feel today? Take a moment to reflect on your thoughts and emotions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartChat}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <MessageIcon className="w-5 h-5" />
              <span>Start Chatting</span>
            </button>
            
            <div className="text-sm text-gray-600 dark:text-dark-400 bg-white/50 dark:bg-dark-700/50 px-4 py-2 rounded-lg backdrop-blur-sm">
              💡 Tip: Click on any calendar day to journal your thoughts
            </div>
          </div>
        </div>

        <BaseCalendar onDateClick={handleDateSelect} />
        
        <JournalingDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          selectedDate={selectedDate} 
        />
        
        <AIChatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      </div>
    </div>
  );
}
