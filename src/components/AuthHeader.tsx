import Link from 'next/link';

interface AuthHeaderProps {
  currentPage: 'signin' | 'signup';
}

export default function AuthHeader({ currentPage }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {currentPage === 'signin' ? 'Welcome Back' : 'Join Us'}
      </h1>
      <p className="text-gray-600">
        {currentPage === 'signin' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in here
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
