import { v4 as uuid } from 'uuid';
import { useMachine } from '@xstate/react';
import { todosMachine } from '../machines/todosMachine';
import type { TodoType } from '../machines/todosMachine';
import { Todo } from '../components/Todo/Todo';
import { PlusIcon } from '@heroicons/react/24/solid';
import { isToday } from 'date-fns';

const initialTodos: TodoType[] = [
  {
    id: uuid(),
    title: 'Do the dishes',
    date: new Date().toISOString(),
    completed: false,
  },
  {
    id: uuid(),
    title: 'Water the plants',
    date: null,
    completed: false,
  },
  {
    id: uuid(),
    title: 'Learn xState',
    date: null,
    completed: false,
  },
];

const persistedTodosMachine = todosMachine.withConfig(
  {
    actions: {
      persist: (context) => {
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem(
              'todos-next-xstate',
              JSON.stringify(context.todos)
            );
          }
        } catch (e) {
          console.error(e);
        }
      },
    },
  },
  {
    todos: (() => {
      try {
        if (typeof window !== 'undefined') {
          return (
            JSON.parse(localStorage.getItem('todos-next-xstate') || 'null') ||
            initialTodos
          );
        } else {
          return initialTodos;
        }
      } catch (e) {
        console.error(e);
        return [];
      }
    })(),
    selected: [],
  }
);

const Todos = () => {
  const [state, send] = useMachine(persistedTodosMachine, { devTools: true });

  const { todos } = state.context;

  const numActiveTodos = todos.filter((todo) => !todo.completed).length;
  const todayTodos = todos.filter((todo) => todo.completed);
  const notTodayTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className='dark:bg-slate-800 relative flex h-full bg-white rounded-lg shadow-inner'>
      <div className='no-scrollbar flex-shrink-0 w-full max-w-3xl p-6 mx-auto overflow-y-auto'>
        <button
          onClick={() => send({ type: 'NEWTODO' })}
          className='bottom-4 right-4 dark:bg-blue-500 absolute p-4 bg-blue-500 rounded-full'
        >
          <PlusIcon className='w-6 h-6 text-white' />
        </button>

        <h1
          className={`
          mt-4 text-3xl text-stone-800 dark:text-white font-bold 
          ${todayTodos.length === 0 ? 'opacity-20' : ''}
        `}
        >
          Done
        </h1>

        <div className='mt-4'>
          {todayTodos.map((todo: TodoType) => (
            <Todo key={todo.id} todoRef={todo.ref} />
          ))}
        </div>

        {todos.length > numActiveTodos ? (
          <button
            className='text-stone-500 dark:text-slate-500 mt-1'
            onClick={() => send({ type: 'REMOVE_COMPLETED' })}
          >
            Clear completed todos
          </button>
        ) : null}

        <h2
          className={`
          text-3xl text-stone-800 dark:text-white font-bold mt-10
          ${notTodayTodos.length === 0 ? 'opacity-20' : ''}
        `}
        >
          Not done
        </h2>

        <div className='mt-4'>
          {notTodayTodos.map((todo: TodoType) => (
            <Todo key={todo.id} todoRef={todo.ref} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
