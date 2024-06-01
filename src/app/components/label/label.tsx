import { FC, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label: FC<LabelProps> = ({ children, htmlFor, className, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`text-lg text-black ${className}`} {...props}>
      {children}
    </label>
  );
};
