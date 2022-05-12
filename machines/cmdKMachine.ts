import { assign, createMachine } from 'xstate';

interface cmdKMachineContext {
  activeButton: string;
}

type cmdKMachineEvents =
  | {
      type: 'SET_ACTIVE_BUTTON';
      id: string;
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
      activeButton: '',
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
        on: {
          CLOSE: {
            target: 'closed',
          },
          SET_ACTIVE_BUTTON: {
            actions: assign({ activeButton: (context, event) => event.id }),
          },
        },
      },
    },
  });
