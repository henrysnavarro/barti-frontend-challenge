'use client';

import * as React from 'react';

/**
 * BasicSelect is a customizable dropdown select component.
 *
 * It renders a select input with an optional label and prompt.
 * The component supports optional props for id, label, prompt, width,
 * and a list of options to display. The component also allows for
 * handling change events through an onChange callback.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.id] - The optional id for the select element.
 * @param {string} [props.label='Label'] - The optional label for the select input.
 * @param {boolean} [props.required=false] - Indicates if the field is required.
 * @param {string} [props.prompt='Prompt ...'] - The placeholder text for the select input.
 * @param {string} [props.width='full'] - The width of the select component.
 * @param {Function} [props.onChange] - Callback function to handle changes to the select input.
 * @param {Array} [props.options=[]] - An array of option objects with label and value properties.
 * @param {string} [props.value] - The selected value for the select input.
 */
export default function BasicSelect(props: {
  id?: string;
  label?: string;
  required?: boolean;
  prompt?: string;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { label: string; value: string }[] | [];
  value?: string;
}) {
  const {
    id,
    label = 'Label',
    required = false,
    prompt = 'Prompt ...',
    width = 'full',
    onChange,
    options,
    value,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(event);
  };

  return (
    <div id={id} className={`w-${width} flex flex-col gap-2`}>
      <p className="font-semibold text-gray-600 -mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </p>
      <select
        id={id}
        value={value}
        className={`${width} p-2 border border-gray-300 rounded-md focus:outline-none hover:border-purple-500 focus:border-purple-500`}
        onChange={handleChange}
      >
        <option value="" className="text-gray-300">
          {prompt}
        </option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}
