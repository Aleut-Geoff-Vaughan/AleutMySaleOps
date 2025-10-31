import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  ...props
}) => {
  console.log('🔴 Modal render - isOpen:', isOpen);

  useEffect(() => {
    if (isOpen) {
      console.log('🟡 Modal opened - setting body overflow');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    console.log('🔴 Modal returning null - not rendering');
    return null;
  }

  console.log('🟢 Modal rendering content');

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={cn('modal-content', sizes[size])}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <div className="modal-header">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

export const ModalFooter = React.memo(({ children, className = '' }) => {
  return (
    <div className={cn('modal-footer', className)}>
      {children}
    </div>
  );
});

ModalFooter.displayName = 'ModalFooter';
