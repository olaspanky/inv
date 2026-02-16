import React from "react";

const DashboardSkeletonLoader = () => {
  return (
    <div className="2xl:p-6 p-3 rounded-lg shadow-md bg-gray-100 animate-pulse">
      <div className='flex flex-col h-screen w-full justify-center items-center gap-5'>
             <div><h1 className='text-2xl font-extrabold animate-pulse text-primary font-custom'>Loading your Invisio&#8482; Dashboard</h1></div>

    </div>
    </div>
  );
};

export default DashboardSkeletonLoader;
