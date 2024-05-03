'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactElement;
};

export const ProtectedLayout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const authorized = sessionStatus === 'authenticated';
  const unAuthorized = sessionStatus === 'unauthenticated';
  const loading = sessionStatus === 'loading';

  useEffect(() => {
    if (loading) return;

    if (unAuthorized) {
      router.push('/api/auth/signin');
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading app...
      </div>
    );
  }
  return authorized ? children : <></>;
};
