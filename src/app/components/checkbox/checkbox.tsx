"use client";

import { Input } from "@headlessui/react";
import { FC } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string
}

export const Checkbox: FC<CheckboxProps> = ({ className, ...props }) => {
  return (
    <Input
      type="checkbox"
      {...props}
      className={`form-checkbox h-5 w-5 text-blue-600 ${className}`}
    />
  );
};
