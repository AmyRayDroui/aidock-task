import React, { forwardRef, ReactElement } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
  disableStyles?: boolean;
  isLoading?: boolean;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const AppButton = forwardRef<any, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    onClick,
    disabled,
    ariaLabel,
    type = "button",
    disableStyles,
    isLoading,
    onMouseLeave,
  } = props;
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      onClick={onClick}
      ref={ref}
      onMouseLeave={onMouseLeave}
      className={
        disableStyles
          ? `${className}`
          : `min-h-[50px] min-w-fit h-fit font-mono text-xl text-center items-center py-3 px-3 text-mainFontColor text-light bg-primary whitespace-nowrap font-light tracking-tight hover:bg-opacity-70 hover:bg-primary rounded-md ${className}`
      }
      type={type}
    >
      {children}
    </button>
  );
});

export default AppButton;
