import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logout } from '../lib/auth';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        router.push('/');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        router.push('/');
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1>Saindo...</h1>
        <p>Você será redirecionado em breve.</p>
      </div>
    </div>
  );
} 