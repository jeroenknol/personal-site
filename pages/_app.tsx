import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { inspect } from '@xstate/inspect';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  inspect({ iframe: false });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
