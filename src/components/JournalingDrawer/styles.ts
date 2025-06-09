import { styled } from "@/styles/stithces.config"
import { motion } from "framer-motion";

export const MotionBackdrop = motion(styled('div', {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 40,
}));

export const MotionDrawerPanel = motion(styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100%',
  width: '100%',
  maxWidth: '540px',
  backgroundColor: '$surface',
  color: '$text',
  padding: '$4',
  zIndex: 50,
  boxShadow: '-2px 0 12px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  borderTopLeftRadius: '$md',
  borderBottomLeftRadius: '$md',
}));

export const CloseButton = styled('button', {
  alignSelf: 'flex-end',
  background: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  color: '$mutedText',
  cursor: 'pointer',
  marginBottom: '$2',
});

export const Heading = styled('h2', {
  fontSize: '$lg',
  fontWeight: 600,
  marginBottom: '$2',
});

export const DateLabel = styled('p', {
  color: '$mutedText',
  fontSize: '$sm',
  marginBottom: '$2',
});

export const TextArea = styled('textarea', {
  width: '100%',
  minHeight: '200px',
  border: '1px solid $border',
  borderRadius: '$sm',
  padding: '$2',
  fontSize: '$base',
  backgroundColor: '#fdfaf5',
  backgroundImage: 'url("src/textures/beige-paper.png")',
  color: '$text',
  resize: 'vertical',
  outline: 'none',
  '&:focus': {
    borderColor: '$primary',
    boxShadow: '0 0 0 2px $colors$primary',
  },
});

export const SaveButton = styled('button', {
  marginTop: '$4',
  alignSelf: 'flex-end',
  padding: '0.5rem 1.25rem',
  fontSize: '$base',
  backgroundColor: '$primary',
  color: 'white',
  border: 'none',
  borderRadius: '$sm',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  '&:hover': {
    backgroundColor: '$primaryHover',
  },
});