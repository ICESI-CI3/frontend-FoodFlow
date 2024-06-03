import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: string;
  size?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`rounded-lg font-bold w-full bg-[#F7511E] text-white hover:bg-[#d94518] focus:ring-[#F7511E] p-2 ${className}`} {...props}>
      {children}
    </button>
  );
};
