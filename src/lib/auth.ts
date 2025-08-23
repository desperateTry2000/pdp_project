import { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@/generated/prisma';
import { compare } from 'bcryptjs';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
       async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          
          if (!email || !password) {
            console.log('Missing credentials');
            return null;
          }

          console.log('Attempting to find user with email:', email);
          
          const user = await prisma.user.findUnique({ where: { email } });
          
          if (!user) {
            console.log('User not found');
            return null;
          }
          
          // Check if this is an OAuth-only user (no password)
          if (!user.passwordHash) {
            console.log('User found but no password hash - OAuth user trying to use credentials');
            return null;
          }

          console.log('Comparing passwords...');
          const isValid = await compare(password, user.passwordHash);
          
          if (!isValid) {
            console.log('Password invalid');
            return null;
          }

          console.log('Authentication successful for user:', user.id);
          return user;
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw error; // This will cause the 500 error, but we'll see the actual error in logs
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      if (account && user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

