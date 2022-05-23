import React, { useCallback, useEffect } from 'react';
import { useActor, useMachine } from '@xstate/react';
import {
  cmdKMachine,
  cmdKMachineContext,
  cmdKMachineEvents,
} from '../machines/cmdKMachine';
import { Interpreter } from 'xstate';
import { ColorSwatchIcon } from '@heroicons/react/solid';
import { Modal } from './Modal';

type CmdKComponent = React.FC & { Button: typeof MenuButton };

export const CmdK: CmdKComponent = ({ children }) => {
  const [state, send, service] = useMachine(cmdKMachine, { devTools: true });

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        // handle opening ⌘k menu
        send('OPEN');
      }

      if (e.key === 'Escape') {
        send('CLOSE');
      }
    },
    [send]
  );

  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handler]);

  return (
    <Modal isOpen={state.value === 'open'}>
      <Menu service={service}>{children}</Menu>
    </Modal>
  );
};

interface MenuProps {
  children: React.ReactNode;
  service: Interpreter<
    cmdKMachineContext,
    any,
    cmdKMachineEvents,
    { value: any; context: cmdKMachineContext }
  >;
}

const Menu = ({ children, service }: MenuProps) => {
  const [state, send] = useActor(service);
  const maxIndex =
    React.Children.toArray(children).filter(
      (child) => (child as JSX.Element).type['data-role']
    ).length - 1;

  const onMouseMove = useCallback(
    (index: number) => {
      if (state.context.activeButtonIndex !== index) {
        send({ type: 'SET_ACTIVE_BUTTON_INDEX', index });
      }
    },
    [state, send]
  );

  const onArrowUp = useCallback(() => {
    send({ type: 'DECREASE_ACTIVE_BUTTON_INDEX' });
  }, [send]);

  const onArrowDown = useCallback(() => {
    send({
      type: 'INCREASE_ACTIVE_BUTTON_INDEX',
      maxIndex,
    });
  }, [send, maxIndex]);

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        onArrowUp();
      }

      if (e.key === 'ArrowDown') {
        onArrowDown();
      }
    },
    [onArrowUp, onArrowDown]
  );

  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handler]);

  const childrenWithProps = React.Children.map(children, (child, i) => {
    if ((child as JSX.Element).type['data-role'] !== 'menu-button') {
      return child;
    }

    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        handleClose: () => {
          send({ type: 'CLOSE' });
        },
        onMouseMove: () => {
          onMouseMove(i);
        },
        isActive: state.context.activeButtonIndex === i,
      });
    }
  });

  return (
    <div className='w-[640px] h-[400px] p-2 bg-stone-300 dark:bg-slate-800 rounded-lg'>
      <h3 className='text-stone-600 dark:text-slate-500 px-4 pt-2 pb-4 font-medium'>
        ⌘K Menu
      </h3>
      {childrenWithProps}
    </div>
  );
};

interface MenuButtonProps {
  onMouseMove?: () => void;
  isActive?: boolean;
  onClick?: () => void;
  handleClose?: () => void;
}

type MenuButtonComponent = React.FC<MenuButtonProps> & { 'data-role': string };

const MenuButton: MenuButtonComponent = ({
  children,
  onMouseMove,
  isActive,
  onClick,
  handleClose,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (handleClose) {
      handleClose();
    }
  }, [onClick, handleClose]);

  return (
    <button
      onClick={handleClick}
      id='button'
      onMouseMove={onMouseMove}
      className={`w-full flex px-4 py-2 rounded-md text-stone-800 dark:text-white focus:outline-none ${
        isActive ? 'bg-stone-350 dark:bg-slate-700' : ''
      }`}
    >
      {children}
    </button>
  );
};

MenuButton['data-role'] = 'menu-button';

CmdK.Button = MenuButton;
