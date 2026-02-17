"use client";

import React, { useRef, useState } from "react";
import DashboardSkeletonLoader from "./DashboardLoader";
import useFetchEmbedUrl from "./useFetchEmbedUrl";

interface DashboardWrapper {
  dashboardId: string;
  title: string;
  description: string;
  height?: string;
}

const DashboardWrapper: React.FC<DashboardWrapper> = ({
  dashboardId,
  title,
  description,
  height = "1500px",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { embedUrl, loading, error } = useFetchEmbedUrl(dashboardId);
  const [iframeError, setIframeError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    setIframeError(false);
    setRetryKey(prev => prev + 1);
  };

  return (
    <div className="w-full 2xl:p-6 p-3 bg-gray-100 min-h-screen flex flex-col 2xl:gap-12">
      <section className="flex flex-col gap-12">
        <div>
          <h1 className="text-3xl font-bold text-black">{title}</h1>
        </div>
        <div
          className="p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px] bg-contain bg-no-repeat bg-right"
          style={{ backgroundImage: "url('/assets/top.png')" }}
        >
          <p className="text-sm text-[#3D84ED] text-[18px]">{description}</p>
        </div>
      </section>

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden relative">
        {/* Reload button - small and unobtrusive */}
        {!loading && !error && !iframeError && (
          <button
            onClick={handleRetry}
            className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
            title="Reload dashboard"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </button>
        )}

        {loading && <DashboardSkeletonLoader />}
        
        {(error || iframeError) ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-500 mb-4 text-center">
              {error || "Unable to load dashboard. Please check your connection."}
            </p>
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          embedUrl && (
            <iframe
              key={retryKey}
              ref={iframeRef}
              src={embedUrl}
              className="w-full border-none"
              style={{ height }}
              onLoad={() => {
                console.log(`${title} iframe loaded`);
                setIframeError(false);
              }}
              onError={() => setIframeError(true)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DashboardWrapper;