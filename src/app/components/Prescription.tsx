"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardSkeletonLoader from "./DashboardLoader";
import useFetchEmbedUrl from "./useFetchEmbedUrl"; // Adjust the path as needed

const Hospital = ({ dashboardId = "93fdb602-d160-4876-832b-fae0561a7f52" }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { embedUrl, loading, error } = useFetchEmbedUrl(dashboardId);

  <iframe
        width="960"
        height="720"
        src="https://eu-central-1.quicksight.aws.amazon.com/sn/embed/share/accounts/618503970544/dashboards/93fdb602-d160-4876-832b-fae0561a7f52?directory_alias=pbraws">
</iframe>

  return (
    <div className="w-full p-6  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6        ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Prescription Analytics</h1>
          </div>
          <div className=" p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px] bg-contain bg-no-repeat bg-right"  style={{
                backgroundImage: `url('/assets/top.png')`,
            }}>         
          <p className="text-sm text-[#3D84ED] text-[18px]">
The Prescription Analytics Dashboard provides a clear view of prescribing patterns across diseases, therapy areas, states, and product levels. Diagnosis by Quarter shows overall volume trends, while Top Prescribed Drugs and SKU Share of Prescriptions highlight the key molecules and strengths driving usage. The State Analytics of Branded and Generic Drugs reveals regional prescribing dynamics, and ATC 1-5 Share of Prescriptions shows which major therapy areas dominate. Together, these insights help understand doctor behavior, brand versus generic balance, and opportunities for improved positioning and performance.          </p>            </div>  
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
