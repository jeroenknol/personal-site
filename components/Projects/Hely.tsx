import Image from 'next/image';
import { Pillbox } from '../Pillbox';

export const Hely = () => {
  return (
    <div>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src='/hely.svg'
          alt='Hely logo'
          width='60'
          height='60'
          className='rounded-md'
        />
        <h2 className='text-2xl font-bold'>Hely</h2>
      </div>
      <Pillbox list={['React Native', 'Bootstrap', 'Lottie']} />
      <h3 className='text-md mt-6 font-semibold'>About the project</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        Hely is a ride share service that was founded by the NS, and is
        currently available in 9 cities in the the Netherlands. Hely will
        upgrade neighbourhoods with mobility hubs with different means of
        transportation available to the people living near it. This will range
        from bikes and cargo bikes, to small cars.
      </p>
      <h3 className='text-md mt-6 font-semibold'>My role</h3>
      <p className='mt-1 text-sm leading-relaxed'>
        For Hely I’ve helped out as a frontend developer in the very beginning
        stages of the company. I helped out setting up the early prototypes and
        the foundation for the initial version of the app where you could check
        availability, book a bike or a car, see previous bookings, and even
        unlock the bikes with bluetooth locks, right from the app.
      </p>
      <a
        href='https://hely.com/'
        className='inline-block mt-6 text-sm text-blue-700'
        target='_blank'
      >
        Visit hely.com
      </a>
    </div>
  );
};
