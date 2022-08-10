import React, { useCallback, useEffect, useRef } from 'react';
import { Modal } from './Modal';
import { useCmdKMachine } from '../providers/CmdK.provider';

type CmdKComponent = React.FC & { Button: typeof MenuButton };

export const CmdK: CmdKComponent = ({ children }) => {
  const [state, send] = useCmdKMachine();

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
    <Modal
      isOpen={state.value === 'open'}
      handleClose={() => {
        send('CLOSE');
      }}
    >
      <Menu>{children}</Menu>
    </Modal>
  );
};

interface MenuProps {
  children: React.ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  const [state, send] = useCmdKMachine();
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (handleClose) {
      handleClose();
    }
  }, [onClick, handleClose]);

  useEffect(() => {
    if (isActive) {
      buttonRef.current && buttonRef.current.focus();
    }
  }, [isActive]);

  return (
    <button
      ref={buttonRef}
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
