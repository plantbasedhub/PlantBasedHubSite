import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/globals.css";
import LoadingScreen from '../components/LoadingScreen';
import { useTheme } from '../hooks/useTheme';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }: AppProps) {
  useTheme(); // Inicializa o tema

  return (
    <>
    
    <SpeedInsights />
      <LoadingScreen />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Component {...pageProps} />
    </>
  );
}

