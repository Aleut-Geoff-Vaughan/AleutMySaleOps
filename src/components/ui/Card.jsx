import React from 'react';
import { cn } from '../../utils/cn';

export const Card = React.memo(({ children, className = '', ...props }) => {
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = React.memo(({ children, className = '', ...props }) => {
  return (
    <div className={cn('card-header', className)} {...props}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export const CardBody = React.memo(({ children, className = '', ...props }) => {
  return (
    <div className={cn('card-body', className)} {...props}>
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';
