import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative w-32 h-32 mb-8">
        <Image
          src="/images/logo.svg"
          alt="PlantBased Hub Logo"
          fill
          className="object-contain animate-pulse"
          priority
        />
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
        Carregando...
      </p>
    </div>
  );
} 