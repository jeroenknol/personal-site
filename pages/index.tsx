import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Header } from '../components/Header';

const Todos = dynamic(() => import('../components/Todos'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
      className='bg-stone-100 dark:bg-slate-900 min-h-full py-6'
    >
      <Head>
        <title>Todo next xstate app</title>
        <link rel='manifest' href='/site.webmanifest' />
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
      </Head>

      <Header />
      <Todos />
    </div>
  );
};

export default Home;
