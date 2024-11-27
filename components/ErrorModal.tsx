import React from 'react';
import Button from './Button';

interface ErrorModalProps {
  error: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm text-left'>
        <h2 className='text-lg font-semibold mb-4 text-red-500'>Error</h2>
        <p className='text-gray-700 mb-4'>{error}</p>
        <Button onClick={onClose} variant='danger'>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ErrorModal;
