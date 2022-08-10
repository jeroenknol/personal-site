import React, { useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Header } from '../components/Header';
import { MODAL_ID } from '../constants';
import { CmdK } from '../components/CmdK';
import { ColorSwatchIcon, ClockIcon } from '@heroicons/react/solid';
import { toggleTheme } from '../helpers/toggleTheme';
import { WatchImage } from '../components/WatchImage';

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

  const toggleWatch = useCallback(() => {
    if (document) {
      const htmlElement = document.querySelector('html');
      if (htmlElement?.classList.contains('watch')) {
        htmlElement?.classList.remove('watch');
      } else {
        htmlElement?.classList.add('watch');
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
          <ColorSwatchIcon className='text-stone-600 dark:text-slate-500 w-6 h-6' />
          <p className='ml-4 font-medium'>Switch theme</p>
        </CmdK.Button>
        <CmdK.Button onClick={toggleWatch}>
          <ClockIcon className='text-stone-600 dark:text-slate-500 w-6 h-6' />
          <p className='ml-4 font-medium'>Switch to watch mode</p>
        </CmdK.Button>
      </CmdK>

      <Watch>
        <Todos />
      </Watch>

      <div id={MODAL_ID} />
    </div>
  );
};

export default Home;

const Watch: React.FC = ({ children }) => (
  <div
    className={`watch:absolute watch:inset-0 watch:h-0 watch:w-0 watch:m-auto`}
  >
    <WatchImage className='watch:block top-1/2 left-1/2 ml-[3px] text-stone-300 dark:text-slate-700 absolute hidden -translate-x-1/2 -translate-y-1/2' />
    <div className='watch:h-[224px] watch:w-[184px] watch:absolute watch:inset-0 watch:overflow-y-auto watch:-translate-x-1/2 watch:-translate-y-1/2 watch:rounded-[24px] scrollbar-hidden'>
      {children}
    </div>
  </div>
);
