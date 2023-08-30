// import Todos from '../Todos';
import dynamic from 'next/dynamic';
import { AppWindow } from './AppWindow';
import { useState } from 'react';

const Todos = dynamic(() => import('../Todos'), {
  ssr: false,
});

export const WindowManagement = () => {
  const [activeWindows, setActiveWindows] = useState<string[]>(['a', 'b']);

  return (
    <>
      <AppWindow
        visible={activeWindows.includes('a')}
        onClose={() =>
          setActiveWindows((windows) =>
            windows.filter((window) => window !== 'a')
          )
        }
        onMouseDown={() => {
          setActiveWindows((windows) => [
            ...windows.filter((window) => window !== 'a'),
            'a',
          ]);
        }}
        zIndex={activeWindows.indexOf('a')}
      >
        <Todos />
      </AppWindow>

      <AppWindow
        visible={activeWindows.includes('b')}
        onClose={() =>
          setActiveWindows((windows) =>
            windows.filter((window) => window !== 'b')
          )
        }
        onMouseDown={() => {
          setActiveWindows((windows) => [
            ...windows.filter((window) => window !== 'b'),
            'b',
          ]);
        }}
        zIndex={activeWindows.indexOf('b')}
      >
        <Todos />
      </AppWindow>

      <div className='bottom-2 shadow-taskbar bg-white/30 rounded-xl left-1/2 absolute flex gap-2 p-2 transform -translate-x-1/2'>
        <button
          onClick={() => setActiveWindows((windows) => [...windows, 'a'])}
        >
          <div
            className={`flex items-center justify-center w-12 h-12 text-3xl font-bold bg-white rounded-lg ${
              activeWindows.includes('a') ? 'bg-green-400' : 'bg-white'
            }`}
          >
            A
          </div>
        </button>
        <button
          onClick={() => setActiveWindows((windows) => [...windows, 'b'])}
        >
          <div
            className={`flex items-center justify-center w-12 h-12 text-3xl font-bold bg-white rounded-lg ${
              activeWindows.includes('b') ? 'bg-green-400' : 'bg-white'
            }`}
          >
            B
          </div>
        </button>
      </div>
    </>
  );
};
