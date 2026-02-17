// components/DashboardError.tsx
import React from 'react';
import { WifiOff, RefreshCw, AlertCircle, CloudOff } from 'lucide-react';

interface DashboardErrorProps {
  error: string;
  isOffline: boolean;
  onRetry: () => void;
  className?: string;
}

export const DashboardError: React.FC<DashboardErrorProps> = ({
  error,
  isOffline,
  onRetry,
  className = ''
}) => (
  <div className={`w-full bg-white shadow-md rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px] ${className}`}>
    {isOffline ? (
      <CloudOff size={64} className="text-gray-400 mb-4" />
    ) : (
      <AlertCircle size={64} className="text-red-400 mb-4" />
    )}
    
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      {isOffline ? "You're offline" : "Unable to load dashboard"}
    </h3>
    
    <p className="text-gray-600 text-center mb-6 max-w-md">
      {isOffline 
        ? "Please check your internet connection and try again."
        : error || "There was a problem loading the dashboard."}
    </p>
    
    <button
      onClick={onRetry}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <RefreshCw size={20} />
      Try again
    </button>
  </div>
);
