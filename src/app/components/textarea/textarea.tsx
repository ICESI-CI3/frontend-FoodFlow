"use client";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ ...props }: TextareaProps) => {
  return (
    <textarea
      {...props}
      className="border border-gray-300 p-2 rounded"
    />
  );
};
