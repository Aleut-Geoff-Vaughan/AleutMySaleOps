import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
  gray: 'badge-gray'
};

export const Badge = React.memo(({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <span
      className={cn('badge', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
