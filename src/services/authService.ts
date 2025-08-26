import { SignUpForm, SignInForm, User, ApiResponse } from '@/types';

export class AuthService {
  static async signUp(formData: SignUpForm): Promise<ApiResponse<User>> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.error || 'Signup failed' };
      }

      return { data: data.user, message: 'User created successfully' };
    } catch {
      return { error: 'Internal server error' };
    }
  }

  static async signIn(formData: SignInForm): Promise<ApiResponse> {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        return { error: 'Invalid credentials' };
      }

      return { message: 'Sign in successful' };
    } catch {
      return { error: 'An error occurred during signin' };
    }
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch('/api/health');
      return response.ok;
    } catch {
      return false;
    }
  }
}
