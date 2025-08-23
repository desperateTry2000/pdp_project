import { getDaysInMonthGrid } from './utils';
import { CalendarGridProps } from './CalendarTypes';

export default function CalendarGrid({
  currentDate,
  onDateClick,
  selectedDate,
  entriesMap
}: CalendarGridProps & { selectedDate?: string }) {
  const days = getDaysInMonthGrid(currentDate);
  const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-2">
      {headers.map(h => (
        <div key={h} className="text-center font-semibold py-2 text-gray-600">
          {h}
        </div>
      ))}

      {days.map(day => {
        const dateStr = day.format('YYYY-MM-DD');
        const isAlarming = entriesMap[dateStr] ?? false;

        return (
          <div
            key={dateStr}
            className={`
              relative min-h-[9rem] flex items-center justify-center rounded-lg text-center m-0.5 cursor-pointer
              transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg
              ${day.month() === currentDate.month() 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-500'
              }
              ${dateStr === selectedDate ? 'bg-green-600 text-white shadow-lg ring-4 ring-green-300' : ''}
              ${isAlarming ? 'bg-pink-200 text-red-800 border-2 border-dashed border-red-800 shadow-lg ring-4 ring-red-300' : ''}
            `}
            onClick={() => onDateClick(dateStr)}
          >
            {day.date()}
            {isAlarming && (
              <div className="absolute top-2 left-2 text-xl">⚠️</div>
            )}
            {day.month() === currentDate.month() && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
