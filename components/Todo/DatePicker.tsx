import { forwardRef } from 'react';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';

interface DatePickerProps {
  date: Date | null;
  handleSetDate: (date: Date | null) => void;
  handleClearDate: () => void;
}

export const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(
  ({ handleSetDate, handleClearDate, date }, ref) => (
    <ReactDatePicker
      ref={ref}
      selected={date}
      onChange={handleSetDate}
      customInput={<DatePickerInput />}
      isClearable
      showTimeInput
      customTimeInput={<DatepickerFooter handleClick={handleClearDate} />}
      renderCustomHeader={DatepickerHeader}
    />
  )
);

DatePicker.displayName = 'DatePicker';

const DatePickerInput = forwardRef<HTMLButtonElement, any>(
  ({ value, onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className={`dark:text-white text-xs dark:bg-slate-600 px-2 py-1 rounded-full ${
        !value && 'group-hover:visible invisible'
      }`}
    >
      {value || 'Add date'}
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
                    inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                `}
    >
      <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
    </button>

    <span className='font-semibold text-gray-700'>
      {format(date, 'MMMM yyyy')}
    </span>

    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      type='button'
      className={`
                    ${
                      nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                `}
    >
      <ChevronRightIcon className='w-5 h-5 text-gray-600' />
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
      className='w-full bg-red-400 text-white font-medium text-sm py-1 mt-2  rounded-md'
    >
      Clear
    </button>
  );
};
