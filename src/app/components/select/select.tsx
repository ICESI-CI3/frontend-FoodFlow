import { FC, ReactNode, useState } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: ReactNode;
  onChange?: any;
}

export const Select: FC<SelectProps> = ({ className, children, onChange, ...props }) => (
  <select className={`bg-white border border-gray-300 rounded-lg p-2 mt-1 w-full ${className}`} {...props} onChange={onChange}>
    {children}
  </select>
);

interface SelectTriggerProps {
  className?: string;
  children: ReactNode;
}

export const SelectTrigger: FC<SelectTriggerProps> = ({ className, children }) => (
  <SelectTrigger className={`flex items-center bg-white border border-gray-300  rounded-lg p-2 mt-1 cursor-pointer ${className}`}>
    {children}
  </SelectTrigger>
);

interface SelectValueProps {
  className?: string;
  placeholder?: string;
  value: string;
}

export const SelectValue: FC<SelectValueProps> = ({ className, placeholder, value }) => (
  <div className={`text-gray-700 ${className}`}>
    {value || placeholder}
  </div>
);


interface SelectContentProps {
  className?: string;
  children: ReactNode;
}

export const SelectContent: FC<SelectContentProps> = ({ className, children }) => (
  <SelectContent className={`absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${className}`}>{children}</SelectContent>
);

interface SelectItemProps {
  className?: string;
  value: string;
  children: ReactNode;
}

export const SelectItem: FC<SelectItemProps> = ({ className, value, children }) => (
  <SelectItem value={value} className={`p-2 cursor-pointer ${className}`}>
    {children}
  </SelectItem>
);
