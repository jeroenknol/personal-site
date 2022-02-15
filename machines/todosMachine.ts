import { createMachine, assign, spawn } from 'xstate';
import { v4 as uuid } from 'uuid';
import { createTodoMachine } from './todoMachine';

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  date: Date | null;
  ref?: any;
};

interface TodosMachineContext {
  todo: string;
  todos: TodoType[];
}

type TodosMachineEvents =
  | {
      type: 'NEWTODO.CHANGE';
      todo: string;
    }
  | {
      type: 'NEWTODO.COMMIT';
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
    };

const createTodo = (title: string): TodoType => ({
  id: uuid(),
  title,
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
    todo: '',
    todos: [],
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
        'NEWTODO.CHANGE': {
          actions: assign<TodosMachineContext, any>({
            todo: (_, event) => event.todo,
          }),
        },
        'NEWTODO.COMMIT': {
          actions: [
            assign<TodosMachineContext, any>({
              todo: '',
              todos: (context) => {
                const newTodo = createTodo(context.todo.trim());
                return context.todos.concat({
                  ...newTodo,
                  ref: spawn(createTodoMachine(newTodo)),
                });
              },
            }),
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
      },
    },
  },
});

// https://xstate.js.org/docs/guides/models.html#typescript
