import React, { useCallback, useEffect } from 'react';
import { useActor, useMachine } from '@xstate/react';
import {
  cmdKMachine,
  cmdKMachineContext,
  cmdKMachineEvents,
} from '../machines/cmdKMachine';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Interpreter } from 'xstate';
import { ColorSwatchIcon } from '@heroicons/react/solid';

const toggleTheme = () => {
  if (document) {
    const previousPreferedDark = localStorage.getItem('theme') === 'dark';
    if (previousPreferedDark) {
      localStorage.setItem('theme', 'light');
      document.querySelector('html')?.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      document.querySelector('html')?.classList.add('dark');
    }
  }
};

const overlayVariants: Variants = {
  open: {
    opacity: 0.8,
  },
  closed: {
    opacity: 0,
  },
};

const menuVariants: Variants = {
  open: {
    scale: 1,
    opacity: 1,
    translateX: '-50%',
    translateY: '-50%',
  },
  closed: {
    scale: 0.97,
    opacity: 0,
    translateX: '-50%',
    translateY: '-50%',
  },
};

export const CmdK = () => {
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
    <AnimatePresence>
      {state.value === 'open' && (
        <>
          {/* Overlay */}
          <motion.div
            key='foobar'
            variants={overlayVariants}
            initial='closed'
            animate='open'
            exit='closed'
            transition={{
              duration: 0.2,
            }}
            className='bg-slate-900 opacity-70 fixed inset-0'
          />

          {/* Menu */}
          <Menu service={service}>
            <MenuButton onClick={toggleTheme}>
              <ColorSwatchIcon className='text-slate-500 w-6 h-6' />
              <p className='ml-4 font-medium'>Switch theme</p>
            </MenuButton>
            {/* <MenuButton>Bar</MenuButton> */}
            {/* <MenuButton>Baz</MenuButton> */}
          </Menu>
        </>
      )}
    </AnimatePresence>
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
    <motion.div
      variants={menuVariants}
      initial='closed'
      animate='open'
      exit='closed'
      transition={{
        duration: 0.2,
        scale: {
          duration: 0.18,
        },
      }}
      className='fixed w-[640px] h-[400px] p-2 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-lg'
    >
      <h3 className='text-slate-500 px-4 pt-2 pb-4 font-medium'>⌘K Menu</h3>
      {childrenWithProps}
    </motion.div>
  );
};

interface MenuButtonProps {
  children: React.ReactNode;
  onMouseMove?: () => void;
  isActive?: boolean;
  onClick?: () => void;
  handleClose?: () => void;
}

const MenuButton = ({
  children,
  onMouseMove,
  isActive,
  onClick,
  handleClose,
}: MenuButtonProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (handleClose) {
      handleClose();
    }
  }, [onClick, handleClose]);

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleClick();
      }
    },
    [handleClick]
  );

  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handler]);

  return (
    <div
      onClick={handleClick}
      id='button'
      onMouseMove={onMouseMove}
      className={`flex px-4 py-2 rounded-md text-white ${
        isActive ? 'bg-slate-700' : ''
      }`}
    >
      {children}
    </div>
  );
};

MenuButton['data-role'] = 'menu-button';
