'use client';
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { Container, Card, Title, ErrorMessage, OAuthButton, DividerWrapper, DividerLine, DividerText, Form, InputGroup, Label, Input, SubmitButton, SignupText, SignupLink } from './styles';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      router.replace(callbackUrl);
    }
  }, [session, callbackUrl, router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.replace(callbackUrl);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Sign in to your account</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <OAuthButton onClick={handleGoogleSignIn}>
          <FcGoogle style={{ marginRight: '8px' }} size={20} />
          Sign in with Google
        </OAuthButton>
        <DividerWrapper>
          <DividerLine />
          <DividerText>or</DividerText>
        </DividerWrapper>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <SubmitButton type="submit">Sign in</SubmitButton>
        </Form>
        <SignupText>
          Don&apos;t have an account?{' '}
          <SignupLink href="/auth/signup">Sign up</SignupLink>
        </SignupText>
      </Card>
    </Container>
  );
}
