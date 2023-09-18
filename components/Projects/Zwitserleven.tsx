import Image from 'next/image';
import { Pillbox } from '../Pillbox';

export const Zwitserleven = () => {
  return (
    <div>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src='/zwitserleven.svg'
          alt='zwitserleven logo'
          width='120'
          height='60'
          className='rounded-md'
        />
      </div>
      <Pillbox list={['Angular', 'Typescript', 'RxJS', 'Storybook']} />
      <h3 className='text-md mt-6 font-semibold'>About the project</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        For Zwitserleven we the new My environment for the Zwitserleven
        customers, specifically the pension funnel. In the environment, you can
        see the prognosis for your retirement, change investment strategies, and
        run scenario’s for life changes would impact your pension.
      </p>
      <h3 className='text-md mt-6 font-semibold'>My role</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        For the Zwitserleven My environment, my involvement was two-fold, over 2
        separate periods. In the initial project, I helped shaping the product
        from a design side, helping figuring out what the product should be, and
        what it should bring for the users. This also involved building out some
        small prototypes that could be used for user testing. In the second
        phase of the project, we got the build the environment, where I was
        involved as a frontend developer on the project.
      </p>
      <a
        href='https://www.zwitserleven.nl/'
        className='dark:text-blue-400 inline-block mt-6 text-sm text-blue-700'
        target='_blank'
      >
        Visit zwitserleven.nl
      </a>
    </div>
  );
};
