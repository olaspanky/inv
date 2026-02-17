import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface DashboardReloadButtonProps {
  onReload: () => void;
  isLoading?: boolean;
}

export const DashboardReloadButton: React.FC<DashboardReloadButtonProps> = ({
  onReload,
  isLoading = false
}) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onReload();
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      title="Reload dashboard"
    >
      <RefreshCw 
        size={20} 
        className={`text-gray-600 ${isRotating ? 'animate-spin' : ''}`} 
      />
    </button>
  );
};