import { FC, ReactNode } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea: FC<TextareaProps>  = ({className, ...props}) => {
  return (
    <textarea
      {...props}
      className={`border border-gray-300 p-2 rounded w-full ${className}`}
    />
  );
};