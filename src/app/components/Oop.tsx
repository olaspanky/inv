// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import DashboardSkeletonLoader from "./DashboardLoader";
// import useFetchEmbedUrl from "./useFetchEmbedUrl"; // Adjust the path as needed

// const Hospital = ({ dashboardId = "afcd898a-e7e4-4481-9eaf-250f6883788e" }) => {
//     const iframeRef = useRef<HTMLIFrameElement>(null);
//     const { embedUrl, loading, error } = useFetchEmbedUrl(dashboardId);
  
   

//   return (
//     <div className="w-full p-6  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6        ">
//   <section className="flex flex-col gap-12 ">
//       <div>
//           <h1 className="text-3xl font-bold text-black">Disease Burden</h1>
//           </div>
//           <div className=" p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px] bg-contain bg-no-repeat bg-right"  style={{
//                 backgroundImage: `url('/assets/top.png')`,
//             }}>         
//           <p className="text-sm text-[#3D84ED] text-[18px]">
// The Disease Burden Analytics shows how key conditions are distributed and how they change over time, with the Total Burden by Disease (ICD-10) chart identifying the main drivers of diagnoses, the Disease Burden by Diagnosis (Quarterly View) highlighting trends and shifts across quarters, and the Disease Diagnosis by Gender chart revealing male–female distribution patterns, together supporting focused clinical prioritization and targeted engagement.           </p>
//             </div>  
//         </section> 


//         <div className="w-full bg-white shadow-md rounded-lg overflow-hidden relative">
//         {loading && <DashboardSkeletonLoader />}
//         {error ? (
//           <div className="p-4 text-red-500">Error: {error}</div>
//         ) : (
//           <iframe
//             ref={iframeRef}
//             src={embedUrl} // Dynamically set src from hook
//             className="w-full h-[1500px] border-none"
//             onLoad={() => console.log("Iframe loaded")} // Optional: for debugging
//           ></iframe>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hospital;



"use client";

import React from 'react';
import DashboardWrapper from './DashboardWrapper';
const HospitalDashboard = () => {
  return (
    <DashboardWrapper
      dashboardId="afcd898a-e7e4-4481-9eaf-250f6883788e"
      title="Disease Burden"
      description="The Disease Burden Analytics shows how key conditions are distributed and how they change over time, with the Total Burden by Disease (ICD-10) chart identifying the main drivers of diagnoses, the Disease Burden by Diagnosis (Quarterly View) highlighting trends and shifts across quarters, and the Disease Diagnosis by Gender chart revealing male–female distribution patterns, together supporting focused clinical prioritization and targeted engagement."
      height="1500px"
     
    />
  );
};

export default HospitalDashboard;