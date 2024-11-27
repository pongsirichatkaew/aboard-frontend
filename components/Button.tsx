import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'normal-text' | 'border-green' | 'border-grey';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', className = '', onClick, children, variant = 'primary' }) => {
  const baseStyles = `px-4 py-2 rounded-lg transition`;
  const variantStyles = {
    primary: 'bg-green-600 hover:bg-green-400 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-400 text-white',
    danger: 'bg-red-600 hover:bg-red-400 text-white',
    'normal-text': 'text-gray-500 hover:text-gray-700',
    'border-green': 'border border-green-600 text-green-600 hover:bg-green-400',
    'border-grey': 'border border-gray-600 text-gray-600 hover:border-gray-400'
  };

  return (
    <button
      type={type}
      className={`
      ${baseStyles} 
      ${variantStyles[variant]} 
      ${className}
    `}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
