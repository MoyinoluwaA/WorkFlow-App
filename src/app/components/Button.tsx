import React, { ReactNode } from 'react';

interface Button {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick, className, disabled }: Button) => {
  return (
    <button
      className={`rounded-md border border-[#e3c45c] px-4 py-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
