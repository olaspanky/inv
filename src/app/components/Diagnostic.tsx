"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardSkeletonLoader from "./DashboardLoader";
import useFetchEmbedUrl from "./useFetchEmbedUrl"; // Adjust the path as needed

const Hospital = ({ dashboardId = "f505a1a0-0f93-490f-a66f-e9a9435d9a4b" }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { embedUrl, loading, error } = useFetchEmbedUrl(dashboardId);
  
   

  return (
    <div className="w-full 2xl:p-6 p-3  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 ga2xl:p-6 p-3        ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Diagnostics</h1>
          </div>
          <div className=" p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px] bg-contain bg-no-repeat bg-right"  style={{
                backgroundImage: `url('/assets/top.png')`,
            }}>         
          <p className="text-sm text-[#3D84ED] text-[18px]">
          This dashboard presents analytics of clinical diagnostic test requests from anonymized real world data, providing a wide, unprecedented view of diagnostic test requests across Nigeria, Africa’s most populous country. Individual data is processed only for purpose of analysis while maintaining form as gathered in real practice.              </p>
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
