import { useCallback, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { cmdKMachine } from '../machines/cmdKMachine';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { slugify } from '../helpers/slugify';

const overlayVariants: Variants = {
  open: {
    opacity: 0.7,
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
  const [state, send] = useMachine(cmdKMachine, { devTools: true });

  const onMouseEnter = useCallback(
    (id: string) => {
      send({ type: 'SET_ACTIVE_BUTTON', id });
    },
    [send]
  );

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        // handle opening ⌘k menu
        send('OPEN');
      }

      if (e.key === 'Escape') {
        send('CLOSE');
      }
      console.log(e);
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
          <Menu>
            <MenuButton
              onArrowUp={() => {}}
              onArrowDown={() => onMouseEnter(slugify('Bar'))}
              onMouseEnter={() => onMouseEnter(slugify('Foo'))}
              isActive={state.context.activeButton === slugify('Foo')}
            >
              Foo
            </MenuButton>
            <MenuButton
              onArrowUp={() => onMouseEnter(slugify('Foo'))}
              onArrowDown={() => onMouseEnter(slugify('Baz'))}
              onMouseEnter={() => onMouseEnter(slugify('Bar'))}
              isActive={state.context.activeButton === slugify('Bar')}
            >
              Bar
            </MenuButton>
            <MenuButton
              onArrowUp={() => onMouseEnter(slugify('Bar'))}
              onArrowDown={() => {}}
              onMouseEnter={() => onMouseEnter(slugify('Baz'))}
              isActive={state.context.activeButton === slugify('Baz')}
            >
              Baz
            </MenuButton>
          </Menu>
        </>
      )}
    </AnimatePresence>
  );
};

interface MenuProps {
  children: React.ReactNode;
}

const Menu = ({ children }: MenuProps) => {
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
      {children}
    </motion.div>
  );
};

interface MenuButtonProps {
  children: React.ReactNode;
  onMouseEnter: () => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
  isActive: boolean;
}

const MenuButton = ({
  children,
  onMouseEnter,
  onArrowUp,
  onArrowDown,
  isActive,
}: MenuButtonProps) => {
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
    if (isActive) {
      document.addEventListener('keydown', handler);
    } else {
      document.removeEventListener('keydown', handler);
    }

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handler, isActive]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`px-4 py-2 rounded-md text-white ${
        isActive ? 'bg-slate-700' : ''
      }`}
    >
      {children}
    </div>
  );
};
