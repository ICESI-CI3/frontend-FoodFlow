import React, { FC, ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export const Table: FC<TableProps> = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </table>
  );
};

export const TableHeader: FC<TableProps> = ({ children }) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-700">
      {children}
    </thead>
  );
};

export const TableRow: FC<TableProps> = ({ children }) => {
  return (
    <tr>
      {children}
    </tr>
  );
};

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  className?: string;
}

export const TableHead: FC<TableHeadProps> = ({ children, className = '', ...props }) => {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

export const TableBody: FC<TableProps> = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      {children}
    </tbody>
  );
};

export const TableCell: FC<TableProps> = ({ children }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
      {children}
    </td>
  );
};
