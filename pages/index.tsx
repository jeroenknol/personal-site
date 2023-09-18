import React, { useEffect } from 'react';
import { Leva } from 'leva';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import dynamic from 'next/dynamic';
import { Header } from '../components/Header';
import { MODAL_ID } from '../constants';
// import { CmdK } from '../components/CmdK';
// import { SwatchIcon } from '@heroicons/react/24/solid';
// import { toggleTheme } from '../helpers/toggleTheme';
// import { AppWindow } from '../components/WindowManagement/AppWindow';
import { CanvasElement } from '../components/Canvas';
import { WindowManagement } from '../components/WindowManagement';

const Home: NextPage = () => {
  const router = useRouter();
  const debug = router.query.hasOwnProperty('debug');

  return (
    <div
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
      className='min-h-full py-6'
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
      {/* <CmdK>
        <CmdK.Button onClick={toggleTheme}>
          <SwatchIcon className='text-stone-600 dark:text-slate-500 w-6 h-6' />
          <p className='ml-4 font-medium'>Switch theme</p>
        </CmdK.Button>
      </CmdK> */}

      <WindowManagement />

      <Leva hidden={!debug} />

      <div id={MODAL_ID} />

      <div className='-z-10 fixed inset-0'>
        <CanvasElement />
      </div>
    </div>
  );
};

export default Home;
