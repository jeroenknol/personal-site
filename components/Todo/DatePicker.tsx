import { forwardRef, useState } from 'react';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { format, isToday, isTomorrow, isPast, addDays } from 'date-fns';
import { CalendarIcon } from '@heroicons/react/outline';
import { Modal } from '../Modal';

const getLabel = (value: string): string => {
  const date = new Date(value);
  let label = format(date, 'd MMM');
  if (isToday(date)) {
    label = 'Today';
  } else if (isTomorrow(date)) {
    label = 'Tomorrow';
  }
  return label;
};

interface DatePickerProps {
  date: Date | null;
  handleSetDate: (date: Date | null) => void;
  handleClearDate: () => void;
}

export const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(
  ({ handleSetDate, handleClearDate, date }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <DatePickerInput value={date} onClick={() => setIsOpen(true)} />

        <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <ReactDatePicker
            ref={ref}
            selected={date}
            onChange={handleSetDate}
            showTimeInput
            customTimeInput={<DatepickerFooter handleClick={handleClearDate} />}
            renderCustomHeader={DatepickerHeader}
            inline
          />
        </Modal>
      </>
    );
  }
);

DatePicker.displayName = 'DatePicker';

const DatePickerInput = forwardRef<HTMLButtonElement, any>(
  ({ value, onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className={`block ${value ? '' : 'mt-0.5'}`}
    >
      {value ? (
        <p
          className={`
          text-xs px-2 py-1 rounded-full text-stone-800 dark:text-white
          ${
            isPast(addDays(new Date(value), 1))
              ? 'bg-red-300 dark:bg-red-500'
              : 'bg-stone-300 dark:bg-slate-600'
          }
        `}
        >
          {getLabel(value)}
        </p>
      ) : (
        <CalendarIcon className='dark:text-slate-500 w-5 h-5 text-blue-800' />
      )}
    </button>
  )
);

DatePickerInput.displayName = 'DatePickerInput';

const DatepickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div className='flex items-center justify-between px-2 py-2'>
    <button
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      type='button'
      className={`
                    ${
                      prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex p-1 text-sm font-medium bg-stone-300 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-full hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                `}
    >
      <ChevronLeftIcon className='dark:text-gray-300 w-5 h-5 text-gray-600' />
    </button>

    <span className='dark:text-gray-300 font-semibold text-gray-700'>
      {format(new Date(date), 'MMMM yyyy')}
    </span>

    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      type='button'
      className={`
                    ${
                      nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex p-1 text-sm font-medium bg-stone-300 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-full hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                `}
    >
      <ChevronRightIcon className='dark:text-gray-300 w-5 h-5 text-gray-600' />
    </button>
  </div>
);

interface DatePickerFooterProps {
  handleClick: () => void;
}

const DatepickerFooter = ({ handleClick }: DatePickerFooterProps) => {
  return (
    <button
      onClick={handleClick}
      className='w-full py-1 mt-2 text-sm font-medium text-white bg-red-400 rounded-md'
    >
      Clear
    </button>
  );
};
