import { useState } from 'react';
import { Hema } from './Projects/Hema';
import { Colormate } from './Projects/Colormate';
import { Hely } from './Projects/Hely';
import { Propel } from './Projects/Propel';
import { Geldvinder } from './Projects/Geldvinder';
import { Zwitserleven } from './Projects/Zwitserleven';

enum Projects {
  GELDVINDER = 'Geldvinder',
  PROPEL = 'Propel',
  COLORMATE = 'Colormate',
  HELY = 'Hely',
  HEMA = 'Hema',
  ZWITSERLEVEN = 'Zwitserleven',
}

export const Resume = () => {
  const [visible, setVisible] = useState<Projects>(Projects.GELDVINDER);

  return (
    <div className=' flex h-full'>
      <div className='w-[160px] flex-shrink-0 flex flex-col pt-4 pr-2'>
        <h3 className='mb-4 ml-4 text-2xl font-bold'>Projects</h3>
        {Object.values(Projects).map((project) => (
          <button
            key={project}
            className={`focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justify-start px-4 py-1 mb-1 text-sm font-medium transition-colors rounded-md ${
              visible === project ? 'bg-blue-500/40' : 'hover:bg-blue-500/10'
            }`}
            onClick={() => setVisible(project)}
          >
            {project}
          </button>
        ))}
      </div>

      <div className='relative flex justify-center w-full h-full bg-white rounded-lg shadow-inner'>
        <div className='no-scrollbar max-w-xl p-8 overflow-y-auto'>
          {visible === Projects.GELDVINDER && <Geldvinder />}
          {visible === Projects.PROPEL && <Propel />}
          {visible === Projects.COLORMATE && <Colormate />}
          {visible === Projects.HELY && <Hely />}
          {visible === Projects.HEMA && <Hema />}
          {visible === Projects.ZWITSERLEVEN && <Zwitserleven />}
        </div>
      </div>
    </div>
  );
};

export default Resume;
