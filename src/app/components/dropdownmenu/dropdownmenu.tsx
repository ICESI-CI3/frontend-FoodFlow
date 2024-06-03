import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import React, { FC, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

interface DropDownMenuProps {
  children: ReactNode;
}

export const DropdownMenu: FC<DropDownMenuProps> = ({ children }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {children}
    </Menu>
  );
};

interface DropdownMenuTriggerProps extends DropDownMenuProps {
  asChild?: boolean;
}

export const DropdownMenuTrigger: FC<DropdownMenuTriggerProps> = ({ asChild, children }) => {
  return (
    <Menu.Button as={asChild ? Fragment : 'button'}>
      {children}
    </Menu.Button>
  );
};

interface DropdownMenuContentProps extends DropDownMenuProps {
  className?: string;
  align?: string;
}

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({ children, className = '', ...props }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`} {...props}>
        {children}
      </Menu.Items>
    </Transition>
  );
};

export const DropdownMenuLabel: FC<DropDownMenuProps> = ({ children }) => {
  return (
    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </div>
  );
};

export const DropdownMenuSeparator: FC = () => {
  return (
    <div className="border-t border-gray-100 dark:border-gray-700" />
  );
};

interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({ children, className = '', ...props }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${className} ${active ? 'bg-gray-100 dark:bg-gray-700' : ''} group flex rounded-md items-center w-full px-4 py-2 text-sm`}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

interface DropdownMenuRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export const DropdownMenuRadioGroup: FC<DropdownMenuRadioGroupProps> = ({ value, onValueChange, children }) => {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          checked: (child as React.ReactElement).props.value === value,
          onChange: () => onValueChange((child as React.ReactElement).props.value),
        })
      )}
    </div>
  );
};

interface DropdownMenuRadioItemProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

export const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({ children, checked, onChange, ...props }) => {
  return (
    <label className="flex items-center px-4 py-2 text-sm cursor-pointer">
      <input type="radio" checked={checked} onChange={onChange} className="mr-2" {...props} />
      {children}
    </label>
  );
};
