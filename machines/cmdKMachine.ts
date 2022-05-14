import { assign, createMachine } from 'xstate';

export interface cmdKMachineContext {
  activeButtonIndex: number;
}

export type cmdKMachineEvents =
  | {
      type: 'SET_ACTIVE_BUTTON_INDEX';
      index: number;
    }
  | {
      type: 'DECREASE_ACTIVE_BUTTON_INDEX';
    }
  | {
      type: 'INCREASE_ACTIVE_BUTTON_INDEX';
      maxIndex: number;
    }
  | {
      type: 'OPEN';
    }
  | {
      type: 'CLOSE';
    };

export const cmdKMachine = () =>
  createMachine<cmdKMachineContext, cmdKMachineEvents>({
    id: 'cmdK',
    initial: 'closed',
    context: {
      activeButtonIndex: 0,
    },
    states: {
      closed: {
        on: {
          OPEN: {
            target: 'open',
          },
        },
      },
      open: {
        entry: assign<cmdKMachineContext, any>({ activeButtonIndex: 0 }),
        on: {
          CLOSE: {
            target: 'closed',
          },
          SET_ACTIVE_BUTTON_INDEX: {
            actions: assign({ activeButtonIndex: (_, event) => event.index }),
          },
          DECREASE_ACTIVE_BUTTON_INDEX: {
            actions: assign({
              activeButtonIndex: (context) =>
                Math.max(context.activeButtonIndex - 1, 0),
            }),
          },
          INCREASE_ACTIVE_BUTTON_INDEX: {
            actions: assign({
              activeButtonIndex: (context, event) =>
                Math.min(context.activeButtonIndex + 1, event.maxIndex),
            }),
          },
        },
      },
    },
  });
