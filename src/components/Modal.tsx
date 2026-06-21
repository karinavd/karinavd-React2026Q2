import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from '../types/ModalProps';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      data-testid="modal-overlay"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white p-5 rounded-lg w-[90%] max-w-125 max-h-[90vh] overflow-y-auto shadow-xl"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            className="text-gray-400 hover:text-gray-700 transition-colors text-xl font-bold leading-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
