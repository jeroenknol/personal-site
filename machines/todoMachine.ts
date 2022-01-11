import { createMachine, sendParent, assign } from 'xstate';

export interface TodoMachineContext {
  id: string;
  title: string;
  prevTitle?: string;
  completed: boolean;
}

export type TodoMachineEvents =
  | {
      type: 'DELETE';
      id: string;
    }
  | {
      type: 'TOGGLE_COMPLETE';
    }
  | {
      type: 'EDIT';
    }
  | {
      type: 'CANCEL';
    }
  | {
      type: 'BLUE';
    }
  | {
      type: 'CHANGE';
      value: string;
    }
  | {
      type: 'COMMIT';
    };

export const createTodoMachine = ({
  id,
  title,
  completed,
}: TodoMachineContext) =>
  createMachine<TodoMachineContext, TodoMachineEvents>(
    {
      id: 'todo',
      initial: 'reading',
      context: {
        id,
        title,
        prevTitle: '',
        completed,
      },
      on: {
        DELETE: {
          actions: 'delete',
        },
      },
      states: {
        reading: {
          on: {
            TOGGLE_COMPLETE: {
              actions: [
                assign<TodoMachineContext, any>({
                  completed: (context) => !context.completed,
                }),
                'commit',
              ],
            },
            EDIT: {
              target: 'editing',
              actions: 'focusInput',
            },
          },
        },
        editing: {
          entry: assign<TodoMachineContext, any>({
            prevTitle: (context) => context.title,
          }),
          on: {
            CANCEL: {
              target: 'reading',
              actions: assign<TodoMachineContext, any>({
                title: (context) => context.prevTitle || '',
              }),
            },
            CHANGE: {
              actions: assign<TodoMachineContext, any>({
                title: (_, event) => event.value,
              }),
            },
            COMMIT: [
              {
                target: 'reading',
                actions: 'commit',
                cond: (context) => context.title.trim().length > 0,
              },
              {
                actions: 'delete',
              },
            ],
          },
        },
      },
    },
    {
      actions: {
        commit: sendParent((context) => ({
          type: 'TODO.COMMIT',
          todo: {
            id: context.id,
            title: context.title,
            completed: context.completed,
          },
        })),
        delete: sendParent((context) => ({
          type: 'TODO.DELETE',
          id: context.id,
        })),
        focusInput: () => {},
      },
    }
  );
