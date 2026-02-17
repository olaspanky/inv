// app/dashboards/hospital/page.tsx
"use client";

import React from 'react';
import  DashboardWrapper  from './DashboardWrapper';


const HospitalDashboard = () => {
  return (
    <DashboardWrapper
      dashboardId="f505a1a0-0f93-490f-a66f-e9a9435d9a4b"
      title="Diagnostics"
      description="The Diagnostics Dashboard presents a structured analysis of clinical diagnostic test utilization based on anonymized real-world data across Nigeria. The Diagnostic Test Category Analysis quantifies the distribution of requests across major laboratory and imaging categories, identifying areas of highest diagnostic demand."
      height="1500px"
    
    />
  );
};

export default HospitalDashboard;