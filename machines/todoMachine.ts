import { createMachine, sendParent, assign } from 'xstate';

export interface TodoMachineContext {
  id: string;
  title: string;
  prevTitle?: string;
  date: Date | null;
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
      type: 'CHANGE_DATE';
      date: Date;
    }
  | {
      type: 'CLEAR_DATE';
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
        date: null,
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
            CHANGE_DATE: {
              actions: [
                assign<TodoMachineContext, any>({
                  date: (_, event) => event.date,
                }),
              ],
            },
            CLEAR_DATE: {
              actions: [
                assign<TodoMachineContext, any>({
                  date: null,
                }),
              ],
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
        select: sendParent((context) => ({
          type: 'SELECT',
          id: context.id,
        })),
        deselect: sendParent((context) => ({
          type: 'DESELECT',
          id: context.id,
        })),
      },
    }
  );
