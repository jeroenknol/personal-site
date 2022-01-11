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

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    devTools: true,
    context: { todos: initialTodos },
  });

  const { todo, todos } = state.context;

  const numActiveTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <Head>
        <title>Todo next xstate app</title>
      </Head>

      <div>
        <label>
          <input
            autoFocus
            value={todo}
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

      <div>
        {todos.map((todo: TodoType) => (
          <Todo key={todo.id} todoRef={todo.ref} />
        ))}
      </div>

      <p>
        {numActiveTodos} item{numActiveTodos === 1 ? '' : 's'} left
      </p>

      {todos.length > numActiveTodos ? (
        <button onClick={() => send({ type: 'REMOVE_COMPLETED' })}>
          clear completed todos
        </button>
      ) : null}
    </div>
  );
};

export default Home;
