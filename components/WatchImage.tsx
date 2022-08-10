interface WatchImageProps {
  className: string;
}

export const WatchImage = ({ className }: WatchImageProps) => (
  <svg
    width='222'
    height='424'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <rect
      x='8'
      y='92'
      width='200'
      height='240'
      rx='24'
      className='stroke-current'
      strokeWidth='16'
    />
    <path
      d='M216 144h2a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4h-2v-40ZM53 24.5C53 12 69 0 108 0s55 12 55 24.5v68H53v-68ZM187 84h-24V60c0 14.043 12.387 24 24 24ZM29 84h24V60c0 14.043-12.387 24-24 24ZM53 400c0 12.5 16 24.5 55 24.5s55-12 55-24.5v-68H53v68ZM187 340h-24v24c0-14.043 12.387-24 24-24ZM29 340h24v24c0-14.043-12.387-24-24-24Z'
      className='fill-current'
    />
  </svg>
);
