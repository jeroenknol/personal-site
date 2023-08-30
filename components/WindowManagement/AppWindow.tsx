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
}

export const AppWindow = ({
  children,
  visible,
  onClose,
  onMouseDown,
  zIndex,
}: Props) => {
  const debug = false;
  const controls = useDragControls();

  const prevX = useMotionValue<number>(Math.floor(Math.random() * 500));
  const prevY = useMotionValue<number>(Math.floor(Math.random() * 500));
  const offsetX = useMotionValue<number>(0);
  const offsetY = useMotionValue<number>(0);

  const x = useTransform(
    [prevX, offsetX],
    ([total, offset]: any) => total + offset
  );
  const y = useTransform(
    [prevY, offsetY],
    ([total, offset]: any) => total + offset
  );

  //------ WIDTH -----

  const prevWidth = useMotionValue<number>(500);
  const prevHeight = useMotionValue<number>(400);
  const offsetWidth = useMotionValue<number>(0);
  const offsetHeight = useMotionValue<number>(0);

  const width = useTransform(
    [prevWidth, offsetWidth],
    ([prev, offset]: any) => prev + offset
  );
  const height = useTransform(
    [prevHeight, offsetHeight],
    ([prev, offset]: any) => prev + offset
  );

  //------------------

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className='rounded-xl bg-white/30 backdrop-blur-sm shadow-window absolute p-2 pt-6'
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
          {/* bottom right handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x, y } }) => {
              offsetWidth.set(x);
              offsetHeight.set(y);
            }}
            onPanEnd={(_, { offset: { x, y } }) => {
              prevWidth.set(prevWidth.get() + x);
              prevHeight.set(prevHeight.get() + y);
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
              offsetWidth.set(-x);
              offsetHeight.set(y);
              offsetX.set(x);
            }}
            onPanEnd={(_, { offset: { x, y } }) => {
              prevWidth.set(prevWidth.get() - x);
              prevHeight.set(prevHeight.get() + y);
              prevX.set(prevX.get() + x);
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
              offsetWidth.set(-x);
              offsetHeight.set(-y);
              offsetX.set(x);
              offsetY.set(y);
            }}
            onPanEnd={(_, { offset: { x, y } }) => {
              prevWidth.set(prevWidth.get() - x);
              prevHeight.set(prevHeight.get() - y);
              prevX.set(prevX.get() + x);
              prevY.set(prevY.get() + y);
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
              offsetWidth.set(x);
              offsetHeight.set(-y);
              offsetY.set(y);
            }}
            onPanEnd={(_, { offset: { x, y } }) => {
              prevWidth.set(prevWidth.get() + x);
              prevHeight.set(prevHeight.get() - y);
              prevY.set(prevY.get() + y);
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
              offsetHeight.set(-y);
              offsetY.set(y);
            }}
            onPanEnd={(_, { offset: { y } }) => {
              prevHeight.set(prevHeight.get() - y);
              prevY.set(prevY.get() + y);
              offsetHeight.set(0);
              offsetY.set(0);
            }}
            className={` left-5 right-5 absolute top-0 h-1.5 ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* bottom bar handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { y } }) => {
              offsetHeight.set(y);
            }}
            onPanEnd={(_, { offset: { y } }) => {
              prevHeight.set(prevHeight.get() + y);
              offsetHeight.set(0);
            }}
            className={` left-5 right-5 absolute bottom-0 h-2 ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* left bar handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x } }) => {
              offsetWidth.set(-x);
              offsetX.set(x);
            }}
            onPanEnd={(_, { offset: { x } }) => {
              prevWidth.set(prevWidth.get() - x);
              prevX.set(prevX.get() + x);
              offsetWidth.set(0);
              offsetX.set(0);
            }}
            className={` top-5 bottom-5 absolute left-0 w-2 ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* right bar handle */}
          <motion.div
            dragControls={controls}
            onPan={(_, { offset: { x } }) => {
              offsetWidth.set(x);
            }}
            onPanEnd={(_, { offset: { x } }) => {
              prevWidth.set(prevWidth.get() + x);
              offsetWidth.set(0);
            }}
            className={` top-5 bottom-5 absolute right-0 w-2 ${
              debug && 'bg-orange-500'
            } `}
          />

          {/* Content */}
          <motion.div className='relative h-full bg-gray-200 rounded-lg'>
            {children}
          </motion.div>

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
            onPanEnd={(_, { offset: { x, y } }) => {
              prevX.set(prevX.get() + x);
              prevY.set(prevY.get() + y);
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
                animate(prevHeight, window.innerHeight - 86.5, {
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
