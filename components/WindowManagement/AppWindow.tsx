import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from 'framer-motion';

interface Props {
  children: React.ReactElement;
  visible: boolean;
  onClose: () => void;
  onMouseDown: () => void;
  zIndex: number;
  minWidth?: number;
  minHeight?: number;
  initialSize?: { width: number; height: number };
  title?: string;
}

export const AppWindow = ({
  children,
  visible,
  onClose,
  onMouseDown,
  zIndex,
  minWidth = 0,
  minHeight = 0,
  initialSize = {
    width: 500,
    height: 400,
  },
  title,
}: Props) => {
  const debug = false;
  const controls = useDragControls();

  const prevX = useMotionValue<number>(30 + Math.floor(Math.random() * 200));
  const prevY = useMotionValue<number>(30 + Math.floor(Math.random() * 200));
  const offsetX = useMotionValue<number>(0);
  const offsetY = useMotionValue<number>(0);

  const x = useTransform([prevX, offsetX], ([total, offset]: any) =>
    Math.floor(total + offset)
  );

  const y = useTransform([prevY, offsetY], ([total, offset]: any) =>
    Math.floor(total + offset)
  );

  //------ WIDTH -----

  const prevWidth = useMotionValue<number>(initialSize.width);
  const prevHeight = useMotionValue<number>(initialSize.height);
  const offsetWidth = useMotionValue<number>(0);
  const offsetHeight = useMotionValue<number>(0);

  const width = useTransform([prevWidth, offsetWidth], ([prev, offset]: any) =>
    Math.floor(Math.max(prev + offset, minWidth))
  );

  const height = useTransform(
    [prevHeight, offsetHeight],
    ([prev, offset]: any) => Math.floor(Math.max(prev + offset, minHeight))
  );

  //------------------

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className='rounded-xl bg-slate-100/60 backdrop-blur-sm shadow-window dark:bg-slate-700/70 absolute p-2 pt-6'
          style={{ x, y, width, height, zIndex }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              scale: { duration: 0.2, ease: 'easeOut' },
              opacity: { duration: 0.2, ease: 'easeOut' },
            },
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
            transition: {
              scale: { duration: 0.2, ease: 'easeOut' },
              opacity: { duration: 0.2, ease: 'easeOut' },
            },
          }}
          onMouseDown={onMouseDown}
        >
          {/* TITLE */}
          {title && (
            <h3 className='left-1/2 top-1 text-black/60 dark:text-slate-400 absolute text-xs font-bold transform -translate-x-1/2'>
              {title}
            </h3>
          )}

          {/* bottom right handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x, y } }) => {
              if (prevWidth.get() + x > minWidth) {
                offsetWidth.set(x);
              }
              if (prevHeight.get() + y > minHeight) {
                offsetHeight.set(y);
              }
            }}
            onPanEnd={() => {
              prevWidth.set(prevWidth.get() + offsetWidth.get());
              prevHeight.set(prevHeight.get() + offsetHeight.get());
              offsetWidth.set(0);
              offsetHeight.set(0);
            }}
            className={`rounded-br-xl absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize ${
              debug && 'bg-green-500'
            }`}
          />

          {/* bottom left handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x, y } }) => {
              if (prevWidth.get() - x > minWidth) {
                offsetWidth.set(-x);
                offsetX.set(x);
              }
              if (prevHeight.get() + y > minHeight) {
                offsetHeight.set(y);
              }
            }}
            onPanEnd={() => {
              prevWidth.set(prevWidth.get() + offsetWidth.get());
              prevHeight.set(prevHeight.get() + offsetHeight.get());
              prevX.set(prevX.get() + offsetX.get());
              offsetWidth.set(0);
              offsetHeight.set(0);
              offsetX.set(0);
            }}
            className={` rounded-bl-xl absolute bottom-0 left-0 w-5 h-5 cursor-nesw-resize ${
              debug && 'bg-green-500'
            } `}
          />

          {/* top left handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x, y } }) => {
              if (prevWidth.get() - x > minWidth) {
                offsetWidth.set(-x);
                offsetX.set(x);
              }
              if (prevHeight.get() - y > minHeight) {
                offsetHeight.set(-y);
                offsetY.set(y);
              }
            }}
            onPanEnd={() => {
              prevWidth.set(prevWidth.get() + offsetWidth.get());
              prevHeight.set(prevHeight.get() + offsetHeight.get());
              prevX.set(prevX.get() + offsetX.get());
              prevY.set(prevY.get() + offsetY.get());
              offsetWidth.set(0);
              offsetHeight.set(0);
              offsetX.set(0);
              offsetY.set(0);
            }}
            className={` rounded-tl-xl absolute top-0 left-0 w-5 h-5 cursor-nwse-resize ${
              debug && 'bg-green-500'
            } `}
          />

          {/* top right handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x, y } }) => {
              if (prevWidth.get() + x > minWidth) {
                offsetWidth.set(x);
              }
              if (prevHeight.get() - y > minHeight) {
                offsetHeight.set(-y);
                offsetY.set(y);
              }
            }}
            onPanEnd={() => {
              prevWidth.set(prevWidth.get() + offsetWidth.get());
              prevHeight.set(prevHeight.get() + offsetHeight.get());
              prevY.set(prevY.get() + offsetY.get());
              offsetWidth.set(0);
              offsetHeight.set(0);
              offsetY.set(0);
            }}
            className={` rounded-tr-xl absolute top-0 right-0 w-5 h-5 cursor-nesw-resize ${
              debug && 'bg-green-500'
            } `}
          />

          {/* top bar handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { y } }) => {
              if (prevHeight.get() - y > minHeight) {
                offsetHeight.set(-y);
                offsetY.set(y);
              }
            }}
            onPanEnd={() => {
              prevHeight.set(prevHeight.get() + offsetHeight.get());
              prevY.set(prevY.get() + offsetY.get());
              offsetHeight.set(0);
              offsetY.set(0);
            }}
            className={` left-5 right-5 absolute top-0 h-1.5 cursor-ns-resize ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* bottom bar handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { y } }) => {
              if (prevHeight.get() + y > minHeight) {
                offsetHeight.set(y);
              }
            }}
            onPanEnd={() => {
              prevHeight.set(prevHeight.get() + offsetHeight.get());
              offsetHeight.set(0);
            }}
            className={` left-5 right-5 absolute bottom-0 h-2 cursor-ns-resize ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* left bar handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x } }) => {
              if (prevWidth.get() - x > minWidth) {
                offsetWidth.set(-x);
                offsetX.set(x);
              }
            }}
            onPanEnd={() => {
              prevWidth.set(prevWidth.get() + offsetWidth.get());
              prevX.set(prevX.get() + offsetX.get());
              offsetWidth.set(0);
              offsetX.set(0);
            }}
            className={` top-5 bottom-5 absolute left-0 w-2 cursor-ew-resize ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* right bar handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x } }) => {
              if (prevWidth.get() + x > minWidth) {
                offsetWidth.set(x);
              }
            }}
            onPanEnd={() => {
              prevWidth.set(prevWidth.get() + offsetWidth.get());
              offsetWidth.set(0);
            }}
            className={` top-5 bottom-5 absolute right-0 w-2 cursor-ew-resize ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* Content */}
          {children}

          {/* Top position drag controls */}
          <motion.div
            dragControls={controls}
            className={` top-1.5 left-2 right-2 absolute h-5 ${
              debug && 'bg-blue-500'
            } rounded-t-lg `}
            onPan={(_, { offset: { x, y } }) => {
              offsetX.set(x);
              offsetY.set(y);
            }}
            onPanEnd={() => {
              prevX.set(prevX.get() + offsetX.get());
              prevY.set(prevY.get() + offsetY.get());
              offsetX.set(0);
              offsetY.set(0);
            }}
          />

          {/* Buttons */}
          <div className='left-3 top-1.5 absolute flex gap-1.5'>
            <button
              className='block w-3 h-3 bg-red-500 rounded-full'
              // onClick={() => animate(prevWidth, 800, { duration: 0.5 })}
              onClick={onClose}
            />
            <button
              className='block w-3 h-3 bg-orange-500 rounded-full'
              onClick={() => animate(prevWidth, 800, { duration: 0.5 })}
            />
            <button
              className='block w-3 h-3 bg-green-500 rounded-full'
              onClick={() => {
                animate(prevX, 0, { duration: 0.5 });
                animate(prevY, 0, { duration: 0.5 });
                animate(prevWidth, window.innerWidth, { duration: 0.5 });
                animate(prevHeight, window.innerHeight - 86.5 - 72, {
                  duration: 0.5,
                });
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
