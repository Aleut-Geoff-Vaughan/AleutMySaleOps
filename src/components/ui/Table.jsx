import React from 'react';
import { cn } from '../../utils/cn';

export const Table = React.memo(({ children, className = '', ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table className={cn('table', className)} {...props}>
        {children}
      </table>
    </div>
  );
});

Table.displayName = 'Table';

export const TableHeader = React.memo(({ children, className = '', ...props }) => {
  return (
    <thead className={cn('table-header', className)} {...props}>
      {children}
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

export const TableBody = React.memo(({ children, className = '', ...props }) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
});

TableBody.displayName = 'TableBody';

export const TableRow = React.memo(({ children, className = '', ...props }) => {
  return (
    <tr className={cn('table-row', className)} {...props}>
      {children}
    </tr>
  );
});

TableRow.displayName = 'TableRow';

export const TableCell = React.memo(({ children, className = '', header = false, ...props }) => {
  const Component = header ? 'th' : 'td';
  return (
    <Component className={cn('table-cell', header && 'font-semibold', className)} {...props}>
      {children}
    </Component>
  );
});

TableCell.displayName = 'TableCell';
