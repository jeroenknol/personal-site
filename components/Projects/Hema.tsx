import Image from 'next/image';
import { Pillbox } from '../Pillbox';

export const Hema = () => {
  return (
    <div>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src='/hema.svg'
          alt='hema logo'
          width='60'
          height='60'
          className='rounded-md'
        />
        <h2 className='text-2xl font-bold'>Hema Babybox</h2>
      </div>
      <Pillbox list={['Angular', 'Typescript', 'RxJS', 'Firebase']} />
      <h3 className='text-md mt-6 font-semibold'>About the project</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        For Hema we got to build an experiment where you could get a
        subscription on products, as an extension to their big webshop. The
        product that was chosen where diapers, a product that would run out in
        pretty regular intervals, making it convenient to have delivered to your
        door every couple weeks.
      </p>
      <h3 className='text-md mt-6 font-semibold'>My role</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        At the Babybox project I was one of the two developers who build the
        project. I focussed mainly on the frontend, with my collegue focusing
        mainly on the backend implementation.
      </p>
      <a
        href='https://babystraatje.nl/baby/baby-verzorging/nieuwe-hema-babybox/'
        className='dark:text-blue-400 inline-block mt-6 text-sm text-blue-700'
        target='_blank'
      >
        Article about the Hema Babybox
      </a>
    </div>
  );
};
