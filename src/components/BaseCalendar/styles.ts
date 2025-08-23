import { styled } from '@/styles/stitches.config';

export const StyledCalendarGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '$2',
});

export const DayHeader = styled('div', {
  textAlign: 'center',
  fontWeight: '600',
  padding: '$2 0',
  color: '$gray600',
});

export const CalendarDay = styled('div', {
  position: 'relative',
  minHeight: '9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',  
  borderRadius: '$md',
  textAlign: 'center',
  margin: '2px',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s, border 0.2s',

  '&:hover': {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '$2',
    right: '$2',
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  variants: {
    isCurrentMonth: {
      true: {
        backgroundColor: '$primary',
        color: '$white',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '$md',
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent 0, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)',
        },
      },
      false: {
        backgroundColor: '$background',
        color: '$mutedText',
      },
    },
    isSelected: {
      true: {
        backgroundColor: '#43A047',
        color: '$white',
        boxShadow: '0 0 0 3px rgba(67,160,71,0.5)',
      },
    },
    isAlarming: {
      true: {
        backgroundColor: '#FFC0CB',  
        color: '#B71C1C',                
        border: '2px dashed #B71C1C',    
        boxShadow: '0 0 0 4px rgba(183,28,28,0.4)',
        '&::before': {
          backgroundColor: 'rgba(183,28,28,0.6)',
        },
        '&::after': {
          content: '"⚠️"',           
          position: 'absolute',
          top: '$2',
          left: '$2',
          fontSize: '1.25rem',
        },
      },
    },
  },

  defaultVariants: {
    isCurrentMonth: true,
    isSelected: false,
    isAlarming: false,
  },
});

export const HeaderContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$2 $4',
  backgroundColor: '$surface',
  borderRadius: '$md',
  marginBottom: '$2',
});

export const NavButton = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '$md',
  backgroundColor: '$primary',
  color: '$white',
  fontSize: '$base',
  cursor: 'pointer',
  transition: 'background-color 0.2s, transform 0.1s',
  '&:hover': {
    backgroundColor: '$primaryHover',
    transform: 'translateY(-2px)',
  },
});

export const Title = styled('h2', {
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '$text',
});
