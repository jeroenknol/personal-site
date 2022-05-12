import { createMachine } from 'xstate';

interface cmdKMachineContext {}

type cmdKMachineEvents =
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
    context: {},
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
        },
      },
    },
  });
