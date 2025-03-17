import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { account } from './appwrite';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Verifica se existe uma sessão ativa
          const session = await account.getSession('current');
          if (!session) {
            router.push('/auth');
            return;
          }
        } catch (error) {
          router.push('/auth');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
} 