
import React from 'react';

const Button = ({ children, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`px-6 py-3 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${className}`}
      style={{
        background: 'linear-gradient(198deg, rgba(55, 62, 231, 1) 0%, rgba(58, 96, 234, 1) 24%, rgba(59, 106, 235, 1) 31%, rgba(61, 132, 237, 1) 50%)'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; // Make sure to use default export