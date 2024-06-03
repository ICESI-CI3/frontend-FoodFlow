"use client";

import { Input } from "@headlessui/react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = ({ ...props }: CheckboxProps) => {
  return (
    <Input
      type="checkbox"
      {...props}
      className="form-checkbox h-5 w-5 text-blue-600"
    />
  );
};
