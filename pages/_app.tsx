import { ThemeProvider } from '../providers/Theme.provider';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
// import { inspect } from '@xstate/inspect';

// if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
//   inspect({ iframe: false });
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
