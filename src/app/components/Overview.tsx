"use client";

import React, { useEffect, useRef, useState } from "react";
import useFetchEmbedUrl from "./useFetchEmbedUrl"; // Adjust the path as needed
import DashboardSkeletonLoader from "./DashboardLoader";
const Hospital = ({ dashboardId = "728c909f-7dd3-4444-b1f4-d62238c656de" }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { embedUrl, loading, error } = useFetchEmbedUrl(dashboardId);
  


  return (
    <div className=" w-full p-6  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6        ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Overview</h1>
          </div>
         
        </section> 


        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden relative">
        {loading && <DashboardSkeletonLoader />}
        {error ? (
          <div className="p-4 text-red-500">Error: {error}</div>
        ) : (
          <iframe
            ref={iframeRef}
            src={embedUrl} // Dynamically set src from hook
            className="w-full h-[1500px] border-none"
            onLoad={() => console.log("Iframe loaded")} // Optional: for debugging
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Hospital;
