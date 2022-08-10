import { assign, createMachine, Interpreter } from 'xstate';

export interface cmdKMachineContext {
  activeButtonIndex: number;
}

export type CmdKStates = 'open' | 'closed';

export type CmdKService = Interpreter<
  cmdKMachineContext,
  any,
  cmdKMachineEvents,
  { value: CmdKStates; context: cmdKMachineContext }
>;

type SetActiveButtonIndex = {
  type: 'SET_ACTIVE_BUTTON_INDEX';
  index: number;
};

type IncreaseActiveButtonIndex = {
  type: 'INCREASE_ACTIVE_BUTTON_INDEX';
  maxIndex: number;
};

type DecreaseActiveButtonIndex = {
  type: 'DECREASE_ACTIVE_BUTTON_INDEX';
};

export type cmdKMachineEvents =
  | SetActiveButtonIndex
  | DecreaseActiveButtonIndex
  | IncreaseActiveButtonIndex
  | {
      type: 'OPEN';
    }
  | {
      type: 'CLOSE';
    };

export const cmdKMachine = () =>
  createMachine({
    schema: {
      context: {} as cmdKMachineContext,
      events: {} as cmdKMachineEvents,
    },
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
            actions: assign<cmdKMachineContext, SetActiveButtonIndex>({
              activeButtonIndex: (_, event) => event.index,
            }),
          },
          DECREASE_ACTIVE_BUTTON_INDEX: {
            actions: assign<cmdKMachineContext, DecreaseActiveButtonIndex>({
              activeButtonIndex: (context) =>
                Math.max(context.activeButtonIndex - 1, 0),
            }),
          },
          INCREASE_ACTIVE_BUTTON_INDEX: {
            actions: assign<cmdKMachineContext, IncreaseActiveButtonIndex>({
              activeButtonIndex: (context, event) =>
                Math.min(context.activeButtonIndex + 1, event.maxIndex),
            }),
          },
        },
      },
    },
  });
