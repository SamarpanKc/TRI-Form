import * as React from "react";

type TableProps = React.HTMLAttributes<HTMLTableElement>;
type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>; // Use TdHTMLAttributes instead
type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>; // Use ThHTMLAttributes instead

export const Table = ({ children, className, ...props }: TableProps) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className || ""}`} {...props}>
    {children}
  </table>
);

export const TableHeader = ({ children, ...props }: TableSectionProps) => (
  <thead className="bg-gray-50" {...props}>
    {children}
  </thead>
);

export const TableBody = ({ children, ...props }: TableSectionProps) => (
  <tbody className="bg-white divide-y divide-gray-200" {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ children, ...props }: TableRowProps) => (
  <tr {...props}>{children}</tr>
);

export const TableHead = ({ children, className, ...props }: TableHeadProps) => (
  <th 
    className={`px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider ${className || ""}`}
    {...props}
  >
    {children}
  </th>
);

export const TableCell = ({ children, className, ...props }: TableCellProps) => (
  <td 
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 ${className || ""}`}
    {...props}
  >
    {children}
  </td>
);