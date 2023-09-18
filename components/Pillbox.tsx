interface PillProps {
  children: React.ReactNode;
}

const Pill = ({ children }: PillProps) => {
  return (
    <div className='dark:bg-blue-900/70 flex-shrink-0 px-2 py-1 bg-blue-200 rounded-full'>
      <p className='dark:text-blue-300 text-xs font-bold text-blue-800'>
        {children}
      </p>
    </div>
  );
};

interface PillboxProps {
  list: string[];
}

export const Pillbox = ({ list }: PillboxProps) => {
  return (
    <div className=' flex flex-wrap gap-2'>
      {list.map((item) => (
        <Pill key={item}>{item}</Pill>
      ))}
    </div>
  );
};
