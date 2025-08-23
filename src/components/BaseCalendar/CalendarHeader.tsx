import { CalendarHeaderProps } from "./CalendarTypes";

export default function CalendarHeader({ currentDate, onChange }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center p-2 px-4 bg-white rounded-lg mb-2 shadow-sm">
      <button
        onClick={() => onChange(currentDate.subtract(1, 'month'))}
        className="w-10 h-10 rounded-lg bg-primary-600 text-white text-base cursor-pointer transition-all duration-200 hover:bg-primary-700 hover:transform hover:-translate-y-0.5 flex items-center justify-center"
      >
        ←
      </button>
      <h2 className="m-0 text-xl font-semibold text-gray-900">
        {currentDate.format('MMMM YYYY')}
      </h2>
      <button
        onClick={() => onChange(currentDate.add(1, 'month'))}
        className="w-10 h-10 rounded-lg bg-primary-600 text-white text-base cursor-pointer transition-all duration-200 hover:bg-primary-700 hover:transform hover:-translate-y-0.5 flex items-center justify-center"
      >
        →
      </button>
    </div>
  );
}
