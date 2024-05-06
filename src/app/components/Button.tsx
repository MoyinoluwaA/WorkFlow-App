import React, { ReactNode } from 'react';

interface Button {
  children: ReactNode;
  disableDefaultStyle?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  onClick,
  className,
  disabled,
  disableDefaultStyle,
}: Button) => {
  return (
    <button
      className={`${className} ${disableDefaultStyle ? '' : 'rounded-md border border-[#e3c45c] px-4 py-2'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
