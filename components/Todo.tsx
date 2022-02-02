import { useActor } from '@xstate/react';
import { useEffect, useRef } from 'react';

interface TodoProps {
  todoRef: any;
}

export const Todo: React.FC<TodoProps> = ({ todoRef }) => {
  const [state, send]: any = useActor(todoRef);
  const inputRef = useRef<HTMLInputElement>(null);

  const { id, completed, title } = state.context;

  useEffect(() => {
    if (state.actions.find((action: any) => action.type === 'focusInput')) {
      inputRef.current && inputRef.current.focus();
    }
  }, [state.actions, inputRef]);

  return (
    <div
      key={id}
      className='-mx-2 px-2 py-1 flex items-center rounded-md hover:cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-800'
    >
      <input
        type='checkbox'
        value={completed}
        checked={completed}
        onChange={() => send({ type: 'TOGGLE_COMPLETE' })}
        className='cursor-pointer rounded-md border-2 border-slate-300 bg-slate-300 dark:border-slate-700 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900'
      />
      <div className='cursor-pointer ml-2 flex-1 dark:text-white'>
        {state.matches('reading') ? (
          <label onDoubleClick={() => send('EDIT')}>{title}</label>
        ) : (
          <input
            value={title}
            type='text'
            ref={inputRef}
            onChange={(e) => send({ type: 'CHANGE', value: e.target.value })}
            onBlur={(_) => {
              send('COMMIT');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                send('COMMIT');
              } else if (e.key === 'Escape') {
                send('CANCEL');
              }
            }}
          />
        )}
      </div>
      <button
        onClick={() => send('DELETE')}
        className='cursor-pointer dark:text-white'
      >
        x
      </button>
    </div>
  );
};
