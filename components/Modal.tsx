import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { createPortal } from 'react-dom';
import { addElementToDom } from '../helpers/addElementToDom';
import { MODAL_ID } from '../constants';
import FocusTrap from 'focus-trap-react';

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

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  const domNode = useRef<HTMLElement>();

  useEffect(() => {
    domNode.current =
      document.getElementById(MODAL_ID) ?? addElementToDom(MODAL_ID);
  }, []);

  if (!domNode.current) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          <div>
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
              className='bg-stone-200/80 dark:bg-slate-900/70 fixed inset-0'
            />

            {/* Modal */}
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
              className='top-1/3 left-1/2 fixed -translate-x-1/2 -translate-y-1/2'
            >
              {children}
            </motion.div>
          </div>
        </FocusTrap>
      )}
    </AnimatePresence>,
    domNode.current
  );
};
