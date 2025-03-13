import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticação apenas no lado do cliente
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        router.replace('/Auth');
      }
    }
  }, [router]);

  return <>{children}</>;
} 