'use client';

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
        'grid w-full items-center gap-1',
        layout === 'horizontal'
          ? 'md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3'
          : 'grid-cols-1',
        className,
      )}
    >
      <label htmlFor={id}>{label}</label>
      <ReactDatePicker
        id={id}
        name={name}
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        placeholderText={placeholder}
      />
    </div>
  );
}
