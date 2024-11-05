'use client';

import * as React from 'react';
import { Input } from '@mui/base/Input';
import { on } from 'events';

/**
 * BasicInput is a wrapper around the Material UI Input component
 * that provides a controlled input text entry field
 *
 * @param {Object} props - The component props
 * @param {string} [props.id] - The id of the component
 * @param {string} [props.label] - The label of the component
 * @param {boolean} [props.required] - Whether the component is required
 * @param {string} [props.prompt] - The prompt of the component
 * @param {string} [props.width] - The width of the component
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - The change event handler
 * @param {string} [props.value] - The value of the component
 */
export default function BasicInput(props: {
  id?: string;
  label?: string;
  required?: boolean;
  prompt?: string;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) {
  const {
    id,
    label = 'Label',
    required = false,
    prompt = 'Prompt ...',
    width = 'full',
    value,
    onChange,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
  };

  return (
    <div id={id} className={`${width} flex flex-col gap-2`}>
      <p className="font-semibold text-gray-600 -mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </p>
      <Input
        className="pt-0"
        slotProps={{
          input: {
            id,
            className: `w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 bg-white focus-visible:outline-0`,
          },
        }}
        aria-label="Demo input"
        placeholder={prompt}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
