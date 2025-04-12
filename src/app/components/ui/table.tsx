import * as React from "react";

export const Table = ({ children, className }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>
);

export const TableHeader = ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gray-50">{children}</thead>
);

export const TableBody = ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);

export const TableRow = ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr>{children}</tr>
);

export const TableHead = ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
);

export const TableCell = ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>
);