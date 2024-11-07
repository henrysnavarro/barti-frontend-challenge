'use client';

import * as React from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

/**
 * BasicDateField is a wrapper around the Material UI DateField component
 * that provides a controlled input date entry field
 */
export default function BasicDateField(props: {
  id?: string;
  label?: string;
  required?: boolean;
  prompt?: string;
  width?: string;
  onChange?: (event: { target: { id: string; value: string } }) => void;
  value?: string;
}) {
  const {
    id,
    label = 'Label',
    required = false,
    width = 'full',
    onChange,
    value,
  } = props;
  const [controlledValue, setControlledValue] = useState<dayjs.Dayjs | null>(
    dayjs(value)
  );

  const handleChange = ({ id, value }: { id: string; value: string }) => {
    const event: React.ChangeEvent<HTMLInputElement> | { target: any } = {
      target: { id, value: dayjs(value).format('MM/DD/YYYY') },
    };
    onChange && onChange(event);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`w-${width} flex flex-col gap-2`}>
        <p className="font-semibold text-gray-600 -mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </p>
        <DateField
          id={id}
          label=""
          onChange={(newValue) => {
            setControlledValue(newValue);
            handleChange({
              id,
              value: dayjs(newValue).format('MM/DD/YYYY'),
            } as any);
          }}
          defaultValue={controlledValue}
          value={controlledValue}
          className="w-[150px] bg-white"
        />
      </div>
    </LocalizationProvider>
  );
}
