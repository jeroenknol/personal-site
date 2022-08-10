import { useCmdKMachine } from '../providers/CmdK.provider';

export const Header = () => {
  const [_, send] = useCmdKMachine();

  return (
    <div className='border-slate-600 flex flex-row justify-between pb-4 mx-6 border-b'>
      <div>
        <h1 className='text-stone-800 dark:text-white font-bold'>
          Jeroen Knol
        </h1>
        <p className='text-stone-800 dark:text-slate-500 mt-1 text-sm leading-tight'>
          experimental digital playground
        </p>
      </div>
      <button
        className='border-slate-600 focus:bg-slate-600 hover:bg-slate-600 w-12 h-12 text-xl font-bold text-white border rounded-lg outline-none'
        onClick={() => send('OPEN')}
      >
        ⌘K
      </button>
    </div>
  );
};
