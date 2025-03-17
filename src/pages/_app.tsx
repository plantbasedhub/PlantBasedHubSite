import type { AppProps } from "next/app";
import "../../styles/globals.css";
import LoadingScreen from '../components/LoadingScreen';
import Toast from '../components/Toast';
import { useTheme } from '../hooks/useTheme';

export default function App({ Component, pageProps }: AppProps) {
  useTheme(); // Inicializa o tema

  return (
    <>
      <div id="loading-screen" className="hidden">
        <LoadingScreen />
      </div>
      <Component {...pageProps} />
      <Toast />
    </>
  );
}

