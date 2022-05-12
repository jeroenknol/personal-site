import { useCallback, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { cmdKMachine } from '../machines/cmdkMachine';

export const CmdK = () => {
  const [state, send] = useMachine(cmdKMachine);

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        // handle opening ⌘k menu
        send('OPEN');
      }

      if (e.key === 'Escape') {
        send('CLOSE');
      }
    },
    [send]
  );

  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handler]);

  console.log(state.value);

  return (
    <>
      {state.value === 'open' && (
        <>
          {/* Overlay */}
          <div className='bg-slate-900 opacity-70 fixed inset-0' />

          {/* Menu */}
          <div className='fixed w-[640px] h-[400px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800'>
            <p>menu header</p>
          </div>
        </>
      )}
    </>
  );
};
