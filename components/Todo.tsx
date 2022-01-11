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
    <div key={id}>
      <input
        type='checkbox'
        value={completed}
        checked={completed}
        onChange={() => send({ type: 'TOGGLE_COMPLETE' })}
      />
      {state.matches('reading') ? (
        <label onDoubleClick={() => send('EDIT')}>{title}</label>
      ) : (
        <input
          value={title}
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
      <button onClick={() => send('DELETE')}>x</button>
    </div>
  );
};
