import React from 'react';

interface InputGroup {
  label: string;
  hideLabel?: boolean;
  inputType: string;
  identifier: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputGroup = ({
  label,
  hideLabel,
  inputType,
  identifier,
  placeholder,
  value,
  onChange,
}: InputGroup) => {
  return (
    <div>
      <label
        htmlFor={identifier}
        className={`text-sm font-medium leading-6 text-gray-900 ${hideLabel ? 'hidden' : 'block'}`}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={inputType}
          name={identifier}
          id={identifier}
          className="w-full rounded-md border px-3 py-2"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputGroup;
