// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import DashboardSkeletonLoader from "./DashboardLoader";
// import useFetchEmbedUrl from "./useFetchEmbedUrl"; // Adjust the path as needed

// const Hospital = ({ dashboardId = "3049d86e-7230-40bd-aad4-0a93e757c371" }) => {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//     const { embedUrl, loading, error } = useFetchEmbedUrl(dashboardId);

   

//   return (
//     <div className="w-full p-6  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6       ">
//   <section className="flex flex-col gap-12 ">
//       <div>
//           <h1 className="text-3xl font-bold text-black">Cost of Care analytics</h1>
//           </div>
//           <div className=" p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px] bg-contain bg-no-repeat bg-right"  style={{
//                 backgroundImage: `url('/assets/top.png')`,
//             }}>         
//           <p className="text-sm text-[#3D84ED] text-[18px]">
// The Cost of Care Analytics Dashboard provides a detailed view of healthcare expenditure across diagnoses and intervention types. The Intervention Share of Spending by Diagnosis shows how total cost is distributed between drugs, investigations, and other services for each condition, highlighting the main cost drivers within the care pathway.The Share of Total Reimbursement by Diagnosis identifies which diseases contribute most to overall spending, while the Average Spending by Disease per Patient quantifies cost intensity at the patient level. Together, these insights support evaluation of resource utilization, identification of high-cost conditions, and more informed financial planning and care optimization strategies.             </p>
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
import  DashboardWrapper  from './DashboardWrapper';
const HospitalDashboard = () => {
  return (
    <DashboardWrapper
      dashboardId="3049d86e-7230-40bd-aad4-0a93e757c371"
      title="Cost of Care Analytics"
      description="The Cost of Care Analytics Dashboard provides a detailed view of healthcare expenditure across diagnoses and intervention types. The Intervention Share of Spending by Diagnosis shows how total cost is distributed between drugs, investigations, and other services for each condition, highlighting the main cost drivers within the care pathway.The Share of Total Reimbursement by Diagnosis identifies which diseases contribute most to overall spending, while the Average Spending by Disease per Patient quantifies cost intensity at the patient level. Together, these insights support evaluation of resource utilization, identification of high-cost conditions, and more informed financial planning and care optimization strategies."
      height="1500px"
     
    />
  );
};

export default HospitalDashboard;