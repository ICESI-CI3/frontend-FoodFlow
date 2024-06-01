import { FC } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: FC<SelectProps> = ({ label, children, ...props }) => (
  <div className="flex flex-col">
    {label && <label className="text-black text-lg">{label}</label>}
    <select className="bg-white border border-gray-300 rounded-lg p-2 mt-1" {...props}>
      {children}
    </select>
  </div>
);
