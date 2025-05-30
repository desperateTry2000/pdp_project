import { CalendarHeaderProps } from "./CalendarTypes";

export default function CalendarHeader({ currentDate, onChange }: CalendarHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button onClick={() => onChange(currentDate.subtract(1, 'month'))}>←</button>
      <h2>{currentDate.format('MMMM YYYY')}</h2>
      <button onClick={() => onChange(currentDate.add(1, 'month'))}>→</button>
    </div>
  );
}
