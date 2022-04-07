import { createMachine, assign, spawn, send } from 'xstate';
import { v4 as uuid } from 'uuid';
import { createTodoMachine } from './todoMachine';

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  date: string | null;
  ref?: any;
};

interface TodosMachineContext {
  todos: TodoType[];
  selected: string[];
}

type TodosMachineEvents =
  | {
      type: 'NEWTODO';
    }
  | {
      type: 'TODO.COMMIT';
      todo: Omit<TodoType, 'ref'>;
    }
  | {
      type: 'TODO.DELETE';
      id: string;
    }
  | {
      type: 'REMOVE_COMPLETED';
    }
  | {
      type: 'SELECT';
      id: string;
    }
  | {
      type: 'DESELECT';
      id: string;
    };

const createTodo = (): TodoType => ({
  id: uuid(),
  title: '',
  date: null,
  completed: false,
});

export const todosMachine = createMachine<
  TodosMachineContext,
  TodosMachineEvents
>({
  id: 'todosMachine',
  initial: 'loading',
  context: {
    todos: [],
    selected: [],
  },
  states: {
    loading: {
      entry: assign({
        todos: (context) =>
          context.todos.map((todo) => ({
            ...todo,
            ref: spawn(createTodoMachine(todo)),
          })),
      }),
      always: {
        target: 'ready',
      },
    },
    ready: {
      on: {
        NEWTODO: {
          actions: [
            assign<TodosMachineContext, any>({
              todos: (context) => {
                const newTodo = createTodo();
                return context.todos.concat({
                  ...newTodo,
                  // Not sure this should work with this shared comment
                  ref: spawn(createTodoMachine(newTodo), 'newTodo'),
                });
              },
            }),
            send({ type: 'EDIT' }, { to: 'newTodo' }),
            'persist',
          ],
        },
        'TODO.DELETE': {
          actions: [
            assign({
              todos: (context, event) =>
                context.todos.filter((todo) => todo.id !== event.id),
            }),
            'persist',
          ],
        },
        'TODO.COMMIT': {
          actions: [
            assign({
              todos: (context, event) =>
                context.todos.map((todo) => {
                  return todo.id === event.todo.id
                    ? { ...todo, ...event.todo, ref: todo.ref }
                    : todo;
                }),
            }),
            'persist',
          ],
        },
        REMOVE_COMPLETED: {
          actions: [
            assign({
              todos: (context) =>
                context.todos.filter((todo) => !todo.completed),
            }),
            'persist',
          ],
        },
        SELECT: {
          actions: assign({
            selected: (context, event) => [...context.selected, event.id],
          }),
          cond: (context, event) => !context.selected.includes(event.id),
        },
        DESELECT: {
          actions: assign({
            selected: (context, event) =>
              context.selected.filter((id) => id !== event.id),
          }),
          cond: (context, event) => context.selected.includes(event.id),
        },
      },
    },
  },
});

// https://xstate.js.org/docs/guides/models.html#typescript
