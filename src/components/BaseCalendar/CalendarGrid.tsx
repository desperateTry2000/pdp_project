import { getDaysInMonthGrid } from './utils';
import { CalendarGridProps } from './CalendarTypes';
import { JournalEntry } from '@/contexts/JournalContext';
import EntryPreview from './EntryPreview';

export default function CalendarGrid({
  currentDate,
  onDateClick,
  selectedDate,
  entriesMap
}: CalendarGridProps & { 
  selectedDate?: string;
  entriesMap: Record<string, JournalEntry>;
}) {
  const days = getDaysInMonthGrid(currentDate);
  const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-2">
      {headers.map(h => (
        <div key={h} className="text-center font-semibold py-2 text-gray-600 dark:text-dark-300">
          {h}
        </div>
      ))}

      {days.map(day => {
        const dateStr = day.format('YYYY-MM-DD');
        const entry = entriesMap[dateStr];
        const isAlarming = entry?.isAlarming ?? false;
        const isCurrentMonth = day.month() === currentDate.month();
        const isSelected = dateStr === selectedDate;
        const hasEntry = !!entry;

        const baseClasses = "relative min-h-[9rem] flex items-center justify-center rounded-lg text-center m-0.5 cursor-pointer transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg";
        
        let bgClasses = "";
        let textClasses = "";
        let borderClasses = "";
        let ringClasses = "";

        if (isAlarming) {
          bgClasses = "bg-red-500 dark:bg-red-600";
          textClasses = "text-white font-bold";
          borderClasses = "border-2 border-dashed border-red-700 dark:border-red-400";
          ringClasses = "ring-4 ring-red-300 dark:ring-red-200";
        } else if (isSelected) {
          bgClasses = "bg-green-600 dark:bg-green-500";
          textClasses = "text-white font-bold";
          ringClasses = "ring-4 ring-green-300 dark:ring-green-200";
        } else if (isCurrentMonth) {
          bgClasses = "bg-primary-600 dark:bg-primary-500";
          textClasses = "text-white";
          ringClasses = "ring-2 ring-primary-300 dark:ring-primary-200";
        } else {
          bgClasses = "bg-gray-100 dark:bg-dark-600";
          textClasses = "text-gray-500 dark:text-dark-400";
        }

        return (
          <div
            key={dateStr}
            className={`${baseClasses} ${bgClasses} ${textClasses} ${borderClasses} ${ringClasses}`}
            onClick={() => onDateClick(dateStr)}
          >
            {hasEntry ? (
              <EntryPreview entry={entry} isAlarming={isAlarming} />
            ) : (
              <>
                <span className="text-lg font-semibold">{day.date()}</span>
                
                {isCurrentMonth && !isAlarming && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
