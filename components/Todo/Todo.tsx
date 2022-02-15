import { useEffect, useRef } from 'react';
import { useActor } from '@xstate/react';
import { DatePicker } from './DatePicker';
import { useLongPress } from 'react-use';
import type ReactDatePicker from 'react-datepicker';

interface TodoProps {
  todoRef: any;
}

export const Todo: React.FC<TodoProps> = ({ todoRef }) => {
  const [state, send]: any = useActor(todoRef);
  const inputRef = useRef<HTMLInputElement>(null);
  const datepickerRef = useRef<ReactDatePicker>(null);
  const longPressEvent = useLongPress(() => {}, {
    isPreventDefault: true,
    delay: 350,
  });

  const { id, completed, title, date } = state.context;

  const closeDatepicker = () => {
    if (datepickerRef && datepickerRef.current) {
      datepickerRef.current.setOpen(false);
    }
  };

  useEffect(() => {
    if (state.actions.find((action: any) => action.type === 'focusInput')) {
      inputRef.current && inputRef.current.focus();
    }
  }, [state.actions, inputRef]);

  return (
    <div
      key={id}
      className='-mx-2 px-2 py-1 flex items-center rounded-md hover:cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-800 group'
      {...longPressEvent}
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
          <p onDoubleClick={() => send('EDIT')}>{title}</p>
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

      <DatePicker
        date={date}
        handleSetDate={(date) => {
          send({ type: 'CHANGE_DATE', date });
        }}
        handleClearDate={() => {
          send('CLEAR_DATE');
          closeDatepicker();
        }}
      />

      {/* <button
        onClick={() => send('DELETE')}
        className='cursor-pointer dark:text-white'
      >
        x
      </button> */}
    </div>
  );
};
