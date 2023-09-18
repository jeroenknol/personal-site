import Image from 'next/image';

export const Bio = () => {
  return (
    <div className='dark:text-slate-200 text-slate-800 flex h-full'>
      <div className='flex-shrink-0 p-4'>
        <Image
          src='/me_cropy.jpg'
          alt='me'
          width='140'
          height='140'
          className='rounded-full'
        />
        <p className=' mt-4 text-xs'>Name</p>
        <p className='text-sm font-bold'>Jeroen Knol</p>
        <p className='mt-2 text-xs'>Age</p>
        <p className='text-sm font-bold'>31</p>
        {/* <p className='mt-2 text-xs'>Dev experience</p>
        <p className='text-sm font-bold'>7 years</p> */}
        <p className='mt-2 text-xs'>Nationality</p>
        <p className='text-sm font-bold'>Dutch</p>
        <p className='mt-2 text-xs'>Residence</p>
        <p className='text-sm font-bold'>Arnhem</p>
      </div>
      <div className='dark:bg-slate-800 flex justify-center w-full h-full bg-white rounded-lg shadow-inner'>
        <div className='no-scrollbar max-w-lg gap-6 p-6 overflow-y-auto'>
          <h3 className='mb-1 -mt-2 text-lg font-bold'>About me</h3>
          <p className='text-sm'>
            From a young age, I was eager to learn how things work. Opening up
            the toaster instead of making toast, much to mom&apos;s annoyance.
            Fast forwarding 2 decades, after having studied graphic design,
            things fell into place when I started programming. When brining the
            first designs to life, and to see them working as they were intended
            was when I knew I found my calling.
          </p>

          <p className='mt-4 text-sm'>
            Now, 7 years later, I&apos;ve had the privilege of working for a
            range of companies, experiencing how they solved their problems and
            learning from it.
          </p>

          <p className='mt-4 text-sm'>
            When it comes to hobbies, I count programming as one of them, even
            though my wife argues it looks an awful lot like work from where
            she&apos;s standing. Fortunately, I also have hobbies that look less
            like work, like football, both playing and watching it. And most of
            my endeavours are fuelled by some good coffee, preferably freshly
            ground and prepared using my Aeropress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
