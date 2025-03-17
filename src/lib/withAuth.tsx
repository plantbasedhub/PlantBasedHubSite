import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkSession } from './auth';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const hasSession = await checkSession();
        if (!hasSession) {
          router.push('/auth');
        }
      };
      checkAuth();
    }, [router]);

    return <Component {...props} />;
  };
} 