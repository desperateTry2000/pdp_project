import { styled } from '@/styles/stitches.config'

export const Container = styled('div', {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$Background',
  padding: '$4',
});

export const Title = styled('h1', {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '$text',
  marginBottom: '$4',
});

export const Card = styled('div', {
  width: '100%',
  maxWidth: '400px',
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  padding: '20px',
});


export const ErrorMessage = styled('p', {
  color: '#E53E3E',
  textAlign: 'center',
  marginBottom: '$4',
});

export const OAuthButton = styled('button', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid $border',
  borderRadius: '$sm',
  padding: '10px',
  marginBottom: '$3',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$gray400',
  },
});

export const DividerWrapper = styled('div', {
  position: 'relative',
  textAlign: 'center',
  margin: '$3 0',
  fontSize: '0.875rem',
  color: '$mutedText',
});

export const DividerLine = styled('span', {
  position: 'absolute',
  top: '50%',
  left: '0',
  width: '100%',
  borderTop: '1px solid $border',
  transform: 'translateY(-50%)',
  zIndex: 1,
});

export const DividerText = styled('span', {
  position: 'relative',
  padding: '0 $2',
  backgroundColor: '$white',
  zIndex: 2,
});

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

export const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const Label = styled('label', {
  color: '$text',
  marginBottom: '$1',
  fontSize: '$base',
});

export const Input = styled('input', {
  width: '100%',
  padding: '$2',
  border: '1px solid $border',
  borderRadius: '$sm',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #007F66',
  },
});

export const SubmitButton = styled('button', {
  width: '100%',
  padding: '5px',
  borderRadius: '$sm',
  backgroundColor: '#007F66',
  color: '$white',
  fontWeight: 'bold',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#006e5c',
  },
});

export const SignupText = styled('p', {
  textAlign: 'center',
  color: '$mutedText',
  marginTop: '$4',
});

export const SignupLink = styled('a', {
  color: '#007F66',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});