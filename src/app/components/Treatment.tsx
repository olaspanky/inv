// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import DashboardSkeletonLoader from "./DashboardLoader";

// const Hospital = ({ dashboardId = "default-dashboard-id" }) => {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [loading, setLoading] = useState(true);
//   const [embedUrl, setEmbedUrl] = useState(""); // State for the embed URL
//   const [error, setError] = useState<string | null>(null);     // Error state
//   dashboardId = "3049d86e-7230-40bd-aad4-0a93e757c371"; // Default dashboard ID

//   // Function to fetch the embed URL
//   const fetchEmbedUrl = async () => {
//     try {
//       const response = await fetch(
//         `https://j65byqdrge7rxllgvy6rvnive40lifmx.lambda-url.eu-central-1.on.aws/?dashboardId=29b55067-cb28-494b-bbcf-d4f3a69b0f0c`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setEmbedUrl(data.embedUrl);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An unknown error occurred");
//       console.error("Error fetching embed URL:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch the embed URL when the component mounts or dashboardId changes
//   useEffect(() => {
//     fetchEmbedUrl();
//   }, [dashboardId]);

//   return (
//     <div className="w-full p-6 bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6">
//       <section className="flex flex-col gap-12">
//         <div>
//           <h1 className="text-3xl font-bold text-black">Treatment Mapping</h1>
//         </div>
//         <div className=" p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px] bg-contain bg-no-repeat bg-right"  style={{
//                 backgroundImage: `url('/assets/top.png')`,
//             }}>           <p className="text-sm text-[#3D84ED] text-[18px]">
// The Treatment Mapping Dashboard provides a clear and structured view of how patients are being treated across therapy areas and individual medicines. The Top 10 Molecule Distribution highlights the most prescribed molecules by patient count, showing which drugs are most commonly used in practice.<br/>
// Using the WHO Anatomical Therapeutic Chemical (ATC) classification system, the ATC 2 to ATC 5 Share of Total Patients charts progressively break prescriptions down from broad therapeutic classes to specific pharmacological groups and finally to individual drug molecules. This layered approach allows a better understanding of treatment preferences, therapy concentration, and prescribing patterns.<br/>
// Overall, the dashboard helps identify dominant therapy areas, uncover potential gaps or opportunities, and support data-driven planning, performance assessment, and strategic decision-making.          </p>
//         </div>
//       </section>

//       <div className="w-full bg-white shadow-md rounded-lg overflow-hidden relative">
//         {loading && <DashboardSkeletonLoader />}
//         {error ? (
//           <div className="p-4 text-red-500">Error: {error}</div>
//         ) : (
//           <iframe
//             ref={iframeRef}
//             src={embedUrl} // Dynamically set src from state
//             className="w-full h-[1500px] border-none"
//             onLoad={() => setLoading(false)} // Update loading state when iframe loads
//           ></iframe>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hospital;

// app/dashboards/hospital/page.tsx


"use client";

import React from 'react';
import DashboardWrapper from './DashboardWrapper';

const HospitalDashboard = () => {
  return (
    <DashboardWrapper
      dashboardId="3049d86e-7230-40bd-aad4-0a93e757c371"
      title="Treatment Mapping"
      description="The Treatment Mapping Dashboard provides a clear and structured view of how patients are being treated across therapy areas and individual medicines. The Top 10 Molecule Distribution highlights the most prescribed molecules by patient count, showing which drugs are most commonly used in practice.<br/>
Using the WHO Anatomical Therapeutic Chemical (ATC) classification system, the ATC 2 to ATC 5 Share of Total Patients charts progressively break prescriptions down from broad therapeutic classes to specific pharmacological groups and finally to individual drug molecules. This layered approach allows a better understanding of treatment preferences, therapy concentration, and prescribing patterns.<br/>
Overall, the dashboard helps identify dominant therapy areas, uncover potential gaps or opportunities, and support data-driven planning, performance assessment, and strategic decision-making."
      height="1500px"
    />
  );
};

export default HospitalDashboard;