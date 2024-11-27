import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
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
