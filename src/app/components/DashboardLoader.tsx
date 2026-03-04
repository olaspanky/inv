import React from 'react';

const DashboardSkeletonLoader = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        <div className="h-8 bg-gray-300 rounded w-1/4"></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((card) => (
          <div key={card} className="bg-gray-200 rounded-lg p-4">
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 rounded-lg p-4 h-48">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4 h-48">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 rounded-lg p-4 h-48">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4 h-48">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 rounded-lg p-4 h-48">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4 h-48">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeletonLoader;