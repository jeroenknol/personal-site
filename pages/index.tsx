import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Header } from '../components/Header';
import { MODAL_ID } from '../constants';
import { CmdK } from '../components/CmdK';
import { toggleTheme } from '../helpers/toggleTheme';

const Todos = dynamic(() => import('../components/Todos'), {
  ssr: false,
});

const Home: NextPage = () => {
  useEffect(() => {
    if (document) {
      const prefersDarkMode = localStorage.getItem('theme') === 'dark';
      if (prefersDarkMode) {
        document.querySelector('html')?.classList.add('dark');
      } else {
        document.querySelector('html')?.classList.remove('dark');
      }
    }
  }, []);

  return (
    <div
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
      className='bg-stone-200 dark:bg-slate-900 min-h-full py-6'
    >
      <Head>
        <title>Jeroen Knol dot com</title>
        <link rel='manifest' href='/site.webmanifest' />
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
      </Head>

      <Header />
      <CmdK>
        <CmdK.Button onClick={toggleTheme}>
          {/* <ColorSwatchIcon className="text-stone-600 dark:text-slate-500 w-6 h-6" /> */}
          <p className='ml-4 font-medium'>Switch theme</p>
        </CmdK.Button>
      </CmdK>
      <Todos />

      <div id={MODAL_ID} />
    </div>
  );
};

export default Home;
