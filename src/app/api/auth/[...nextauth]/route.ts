import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // adjust this path to where you export authOptions

// In App Router, API routes must export individual HTTP methods
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };