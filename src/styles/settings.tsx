import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkSession } from '../lib/auth';
import styles from './Settings.module.css';

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const hasSession = await checkSession();
      if (!hasSession) {
        router.push('/auth');
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Configurações</h1>
      {/* Adicione o conteúdo das configurações aqui */}
    </div>
  );
} 