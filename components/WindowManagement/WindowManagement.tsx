import dynamic from 'next/dynamic';
import { AppWindow } from './AppWindow';
import { useEffect, useState } from 'react';

import {
  HiOutlineClipboardCheck,
  HiOutlineDocumentText,
  HiOutlineIdentification,
  HiOutlineSun,
  HiOutlineMoon,
} from 'react-icons/hi';
import { useTheme, useThemeAPI } from '../../providers/Theme.provider';

const Bio = dynamic(() => import('../Bio'), { ssr: false });
const Resume = dynamic(() => import('../Resume'), { ssr: false });
const Todos = dynamic(() => import('../Todos'), {
  ssr: false,
});

enum Apps {
  BIO = 'Bio',
  RESUME = 'Resume',
  TODOS = 'Todos',
}

export const WindowManagement = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeAPI();

  const [activeWindows, setActiveWindows] = useState<Apps[]>([
    Apps.RESUME,
    Apps.BIO,
  ]);

  return (
    <>
      <AppWindow
        visible={activeWindows.includes(Apps.BIO)}
        onClose={() =>
          setActiveWindows((windows) =>
            windows.filter((window) => window !== Apps.BIO)
          )
        }
        onMouseDown={() => {
          setActiveWindows((windows) => [
            ...windows.filter((window) => window !== Apps.BIO),
            Apps.BIO,
          ]);
        }}
        minWidth={520}
        minHeight={400}
        zIndex={activeWindows.indexOf(Apps.BIO)}
        title='BIO'
      >
        <Bio />
      </AppWindow>

      <AppWindow
        visible={activeWindows.includes(Apps.TODOS)}
        onClose={() =>
          setActiveWindows((windows) =>
            windows.filter((window) => window !== Apps.TODOS)
          )
        }
        onMouseDown={() => {
          setActiveWindows((windows) => [
            ...windows.filter((window) => window !== Apps.TODOS),
            Apps.TODOS,
          ]);
        }}
        zIndex={activeWindows.indexOf(Apps.TODOS)}
        minWidth={480}
        minHeight={380}
        title='TODOS'
      >
        <Todos />
      </AppWindow>

      <AppWindow
        visible={activeWindows.includes(Apps.RESUME)}
        onClose={() =>
          setActiveWindows((windows) =>
            windows.filter((window) => window !== Apps.RESUME)
          )
        }
        onMouseDown={() => {
          setActiveWindows((windows) => [
            ...windows.filter((window) => window !== Apps.RESUME),
            Apps.RESUME,
          ]);
        }}
        zIndex={activeWindows.indexOf(Apps.RESUME)}
        minWidth={520}
        minHeight={400}
        initialSize={{ width: 800, height: 600 }}
        title='RESUME'
      >
        <Resume />
      </AppWindow>

      <div className='bottom-2 shadow-taskbar dark:shadow-taskbarDark bg-white/30 dark:bg-slate-700/50 rounded-xl left-1/2 absolute z-50 flex gap-2 p-2 transform -translate-x-1/2'>
        <button
          onClick={() =>
            setActiveWindows((windows) => [
              ...windows.filter((window) => window !== Apps.BIO),
              Apps.BIO,
            ])
          }
        >
          <div
            className={`relative flex transition-all items-center justify-center w-12 h-12 text-2xl rounded-lg  ${
              activeWindows.includes(Apps.BIO)
                ? 'bg-white/90 dark:bg-slate-600/80 text-orange-500 shadow-appIcon dark:shadow-appIconDark'
                : 'bg-white/0 text-gray-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-600/50'
            } ${
              activeWindows.at(1) === Apps.BIO
                ? 'before:content-[""] before:absolute before:w-1.5 before:h-1.5 before:bg-current before:rounded-full before:top-1 before:left-1'
                : ''
            }
            `}
          >
            <HiOutlineIdentification />
          </div>
        </button>

        <button
          onClick={() =>
            setActiveWindows((windows) => [
              ...windows.filter((window) => window !== Apps.RESUME),
              Apps.RESUME,
            ])
          }
        >
          <div
            className={`relative flex transition-all items-center justify-center w-12 h-12 text-2xl rounded-lg  ${
              activeWindows.includes(Apps.RESUME)
                ? 'bg-white/90 dark:bg-slate-600/80 text-blue-500 shadow-appIcon dark:shadow-appIconDark'
                : 'bg-white/0 text-gray-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-600/50'
            } ${
              activeWindows.at(1) === Apps.RESUME
                ? 'before:content-[""] before:absolute before:w-1.5 before:h-1.5 before:bg-current before:rounded-full before:top-1 before:left-1'
                : ''
            }
            `}
          >
            <HiOutlineDocumentText />
          </div>
        </button>

        <button
          onClick={() =>
            setActiveWindows((windows) => [
              ...windows.filter((window) => window !== Apps.TODOS),
              Apps.TODOS,
            ])
          }
        >
          <div
            className={`relative flex transition-all items-center justify-center w-12 h-12 text-2xl rounded-lg ${
              activeWindows.includes(Apps.TODOS)
                ? 'bg-white/90 dark:bg-slate-600/80 text-green-500 shadow-appIcon dark:shadow-appIconDark'
                : 'bg-white/0 text-gray-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-600/50'
            } ${
              activeWindows.at(1) === Apps.TODOS
                ? 'before:content-[""] before:absolute before:w-1.5 before:h-1.5 before:bg-current before:rounded-full before:top-1 before:left-1'
                : ''
            }
            `}
          >
            <HiOutlineClipboardCheck />
          </div>
        </button>

        <div className='w-[1px] my-1 bg-gray-300 dark:bg-slate-600 rounded-full' />

        <button
          onClick={() => {
            toggleTheme();
          }}
        >
          <div className='bg-white/0 hover:bg-white/40 hover:text-yellow-500 dark:text-slate-400 dark:hover:bg-slate-600/50 relative flex items-center justify-center w-12 h-12 text-2xl text-gray-600 transition-colors rounded-lg'>
            {theme === 'dark' ? <HiOutlineMoon /> : <HiOutlineSun />}
          </div>
        </button>
      </div>
    </>
  );
};
