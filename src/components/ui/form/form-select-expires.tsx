'use client';

import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { cn } from '@/utils/cn';

import 'react-datepicker/dist/react-datepicker.css';

type FormDatePickerProps = {
  value?: Date;
  onChange?: (date: Date | null) => void;
  id: string;
  label: string;
  name: string;
  layout: 'vertical' | 'horizontal';
  placeholder: string;
  className: string;
};

export function FormDatePicker({
  value,
  onChange,
  id,
  label,
  name,
  layout = 'horizontal',
  placeholder,
  className,
}: FormDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
  };

  return (
    <div
      className={cn(
        'grid w-full items-center gap-1 relative',
        layout === 'horizontal'
          ? 'md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3'
          : 'grid-cols-1',
        className,
      )}
    >
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <ReactDatePicker
          id={id}
          name={name}
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="yyyy/MM/dd"
          minDate={new Date()}
          placeholderText={placeholder}
          className="min-h-12 w-full rounded-md border border-muted bg-white px-4"
          wrapperClassName="w-full"
        />
        <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted" />
      </div>
    </div>
  );
}
