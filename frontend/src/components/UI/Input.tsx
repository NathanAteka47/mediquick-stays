import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <label className="flex flex-col gap-0.5">
      {label && <span className="text-xs font-medium text-gray-700">{label}</span>}
      <input
        className={`border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm ${className}`}
        {...props}
      />
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </label>
  );
};

export default Input;