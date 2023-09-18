import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useActor } from '@xstate/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { DatePicker } from './DatePicker';
import type ReactDatePicker from 'react-datepicker';
import { useOutsideClickRef } from 'rooks';

interface TodoProps {
  todoRef: any;
  isSelected?: boolean;
}

export const Todo: React.FC<TodoProps> = ({ todoRef, isSelected = false }) => {
  const [state, send]: any = useActor(todoRef);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const datepickerRef = useRef<ReactDatePicker>(null);
  const [ref] = useOutsideClickRef(
    () => send({ type: 'COMMIT' }),
    state.matches('editing')
  );

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
      ref={ref}
      key={id}
      className={`-mx-2 px-2 py-1 flex items-start rounded-md hover:cursor-pointer hover:bg-stone-100 hover:dark:bg-slate-700 ${
        state.matches('editing') && 'bg-stone-300 dark:bg-slate-700'
      }`}
      onClick={() => send({ type: 'EDIT' })}
    >
      <input
        type='checkbox'
        value={completed}
        checked={completed}
        onClick={(e) => e.stopPropagation()}
        onChange={() => send({ type: 'TOGGLE_COMPLETE' })}
        className='border-stone-350 bg-stone-350 dark:border-slate-600 dark:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 mt-1 border-2 rounded-md cursor-pointer'
      />

      <div className='text-stone-800 dark:text-white flex-1 min-w-0 ml-2 cursor-pointer'>
        {state.matches('reading') ? (
          <p className='min-w-0 truncate'>{title}</p>
        ) : (
          <ResizableTextarea
            value={title}
            ref={inputRef}
            onChange={(e) => {
              send({ type: 'CHANGE', value: e.target.value });
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

      {(state.matches('editing') || date) && (
        <DatePicker
          date={date ? new Date(date) : date}
          handleSetDate={(date) => {
            send({ type: 'CHANGE_DATE', date });
          }}
          handleClearDate={() => {
            send('CLEAR_DATE');
            closeDatepicker();
          }}
        />
      )}

      {state.matches('editing') && (
        <button
          onClick={() => send('DELETE')}
          className='cursor-pointer text-red-700 dark:text-slate-500 mt-0.5 ml-2'
        >
          <TrashIcon className='w-5 h-5' />
        </button>
      )}
    </div>
  );
};

interface ResizableTextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const ResizableTextarea = forwardRef<
  HTMLTextAreaElement,
  ResizableTextareaProps
>(({ value, ...props }, ref) => {
  return (
    <div className='grid'>
      <textarea
        {...props}
        value={value}
        ref={ref}
        onFocus={(e) => {
          var val = e.target.value;
          e.target.value = '';
          e.target.value = val;
        }}
        rows={1}
        className='focus:ring-0 col-span-1 col-start-1 row-span-1 row-start-1 p-0 bg-transparent border-none resize-none'
      />
      <p className='invisible col-span-1 col-start-1 row-span-1 row-start-1'>
        {value}
      </p>
    </div>
  );
});

ResizableTextarea.displayName = 'ResizableTextarea';
