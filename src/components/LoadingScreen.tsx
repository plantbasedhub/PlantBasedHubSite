import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Pré-carrega a imagem
    const preloadImage = new Promise((resolve) => {
      const img = document.createElement('img');
      img.src = '/images/logo.png';
      img.onload = resolve;
    });

    const handleStart = async () => {
      setIsLoading(true);
      await preloadImage;
    };
    const handleComplete = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src="/images/logo.png"
          alt="PlantBased Hub Logo"
          fill
          className="object-contain animate-pulse"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex items-center space-x-1.5">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
} 