import Image from 'next/image';
import { Pillbox } from '../Pillbox';

export const Propel = () => {
  return (
    <div>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src='/propel.svg'
          alt='Propel logo'
          width='60'
          height='60'
          className='rounded-md'
        />
        <h2 className='text-2xl font-bold'>Propel</h2>
      </div>
      <Pillbox
        list={[
          'React',
          'Typescript',
          'Framer Motion',
          'Mantine',
          'React Flow',
          'Trpc',
          'Zod',
        ]}
      />
      <h3 className='text-md mt-6 font-semibold'>About the project</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        Propel is an application where organisations can store and share their
        learnings and knowledge, and is mainly focused on NGO’s. Normally
        different parts and different projects within an organisation can
        independently of each other come to the same conclusions, learn similar
        outcomes, or a project might run into complications, that were already
        solved in a different place in the organisation. Propel aims to make it
        easy to capture knowledge, and the access knowledge on all different
        topics within the organisations
      </p>
      <h3 className='text-md mt-6 font-semibold'>My role</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        At Propel I got to help out on the project as a fullstack developer,
        working on both the front- and backend. Besides the ‘normal’ app stuff
        that was build, a cool challenge in this project was the main canvas,
        similar to a Miro canvas, that we used to lay out all the learnings
        added by the users.
      </p>
      <a
        href='https://www.propelapp.org/'
        className='inline-block mt-6 text-sm text-blue-700'
        target='_blank'
      >
        Visit withpropel.app
      </a>
    </div>
  );
};
