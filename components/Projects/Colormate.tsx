import Image from 'next/image';
import { Pillbox } from '../Pillbox';

export const Colormate = () => {
  return (
    <div>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src='/colormate.png'
          alt='Colormate logo'
          width='60'
          height='60'
          className='rounded-md'
        />
        <h2 className='text-2xl font-bold'>Colormate</h2>
      </div>
      <Pillbox list={['React', 'Styled components']} />
      <h3 className='text-md mt-6 font-semibold'>About the project</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        Colormate was a Sketch plugin used to filter out all colors in a Sketch
        document. Initially developed as an internal tool, it has since been
        sadly discontinued, but the project had us traversing the entire Sketch
        document and list out all the colors used in the document. The goal was
        to find all colors that fell outside of your design system, or the
        single use variants of colors, and to convert them all to the same
        colors, improving the consistency of the designs and the implementation.
      </p>
      <h3 className='text-md mt-6 font-semibold'>My role</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        For Colormate I got to build the main functionality of the application,
        traversing the data tree of the document, and then listing out all the
        colors it found in all the different layers, besides the rest that made
        the application so useful.
      </p>
      <a
        href='https://github.com/themainingredient/colormate/'
        className='dark:text-blue-400 inline-block mt-6 text-sm text-blue-700'
        target='_blank'
      >
        Colormate on Github
      </a>
    </div>
  );
};
