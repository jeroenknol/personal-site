import type { NextPage } from 'next';
import Head from 'next/head';
import { v4 as uuid } from 'uuid';
import { useMachine } from '@xstate/react';
import { todosMachine } from '../machines/todosMachine';
import type { TodoType } from '../machines/todosMachine';
import { Todo } from '../components/Todo';

const initialTodos: TodoType[] = [
  {
    id: uuid(),
    title: 'Do the dishes',
    completed: false,
  },
  {
    id: uuid(),
    title: 'Water the plants',
    completed: false,
  },
  {
    id: uuid(),
    title: 'Learn xState',
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
    todo: '',
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
  }
);

const Home: NextPage = () => {
  const [state, send] = useMachine(persistedTodosMachine, { devTools: true });

  const { todo, todos } = state.context;

  const numActiveTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className='bg-slate-100 dark:bg-slate-900 min-h-full p-4 font-sans'>
      <Head>
        <title>Todo next xstate app</title>
      </Head>

      <div>
        <label>
          <input
            autoFocus
            value={todo}
            className='w-full rounded-md'
            onChange={(e) =>
              send({ type: 'NEWTODO.CHANGE', todo: e.target.value })
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                send({ type: 'NEWTODO.COMMIT' });
              }
            }}
          />
        </label>
      </div>

      <p className='mt-6 dark:text-slate-500 text-sm'>
        {numActiveTodos} item{numActiveTodos === 1 ? '' : 's'} left
      </p>

      <div className='mt-1'>
        {todos.map((todo: TodoType) => (
          <Todo key={todo.id} todoRef={todo.ref} />
        ))}
      </div>

      {todos.length > numActiveTodos ? (
        <button onClick={() => send({ type: 'REMOVE_COMPLETED' })}>
          clear completed todos
        </button>
      ) : null}
    </div>
  );
};

export default Home;
