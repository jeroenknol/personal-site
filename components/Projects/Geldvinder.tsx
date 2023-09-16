import Image from 'next/image';
import { Pillbox } from '../Pillbox';

export const Geldvinder = () => {
  return (
    <div>
      <div className='flex items-center gap-4 mb-6'>
        <Image
          src='/geldvinder.svg'
          alt='Geldvinder logo'
          width='120'
          height='60'
        />
      </div>
      <Pillbox list={['Angular', 'Typescript', 'RxJS', 'Firebase']} />
      <h3 className='text-md mt-6 font-semibold'>About the project</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        Geldvinder is an app that helps people get on top of their financial
        situation. After finishing a fittest that assesses your current
        financial position and situation, you will be provided with routes and
        actions that match your interests, or that will bring you the most gain
        based on your situation. After completing certain routes, and taking
        real life action to improve your financial situation, you get to do a
        partial fittest tailored to the changes you just made, so you can see
        how much you financial fitness improved.
      </p>
      <h3 className='text-md mt-6 font-semibold'>My role</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        We build Geldvinder from the ground up, building it from the very
        beginning. In this entire process I have been involved as a frontend
        developer, working together with our backend team to quickly build out
        an MVP, after which we build the full product. I also set up all the
        reusable components in a Storybook environment, to also have them
        available for everybody in the team to inspect what components were
        there, and how they worked.
      </p>
      <a
        href='https://www.geldvinder.nl/medewerkers/'
        className='inline-block mt-6 text-sm text-blue-700'
        target='_blank'
      >
        Visit geldvinder.nl
      </a>
    </div>
  );
};
