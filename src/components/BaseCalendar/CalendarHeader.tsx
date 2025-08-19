import { CalendarHeaderProps } from "./CalendarTypes";
import { Title, HeaderContainer, NavButton } from './styles'

export default function CalendarHeader({ currentDate, onChange }: CalendarHeaderProps) {
  return (
    <HeaderContainer style={{ display: 'flex', justifyContent: 'space-between' }}>
      <NavButton onClick={() => onChange(currentDate.subtract(1, 'month'))}>←</NavButton>
      <Title>{currentDate.format('MMMM YYYY')}</Title>
      <NavButton onClick={() => onChange(currentDate.add(1, 'month'))}>→</NavButton>
    </HeaderContainer>
  );
}
