import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white w-full max-w-lg rounded-lg shadow-lg p-6'>
        {/* Modal Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <Button variant='normal-text' onClick={onClose}>
            X
          </Button>
        </div>

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
