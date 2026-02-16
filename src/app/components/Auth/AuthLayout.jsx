import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div 
        className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-10"
        style={{
          background: '#373EE7',
          background: 'linear-gradient(198deg, rgba(55, 62, 231, 1) 0%, rgba(58, 96, 234, 1) 24%, rgba(59, 106, 235, 1) 31%, rgba(61, 132, 237, 1) 50%, rgba(61, 132, 237, 1) 58%, rgba(61, 132, 237, 1) 72%)'
        }}
      >
        <h1 className="text-4xl font-bold mb-4">INVISIO™</h1>
        <p className="text-lg text-center max-w-sm">
          Transforming healthcare insights with precision and analytics.
        </p>
        
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-10 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">INVISIO™</h1>
            <p className="text-gray-500">Healthcare Analytics Platform</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;