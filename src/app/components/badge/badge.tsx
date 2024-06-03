import React, { FC, ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant: 'success' | 'warning' | 'danger';
}

const variantClasses = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
};

export const Badge: FC<BadgeProps> = ({ children, variant }) => {
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};
