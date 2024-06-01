import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<InputProps> = ({ id, placeholder, type, className, ...props }) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      className={`bg-white border border-gray-300 rounded-lg p-2 w-full text-black ${className}`}
      {...props}
    />
  );
};
