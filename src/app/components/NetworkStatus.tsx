import React from 'react';
import { WifiOff, Signal, RefreshCw } from 'lucide-react';

interface NetworkStatusProps {
  isOnline: boolean;
  onReload?: () => void;
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ isOnline, onReload }) => (
  <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 z-50 ${
    isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }`}>
    {isOnline ? (
      <>
        <Signal size={20} />
        <span className="text-sm font-medium">Online</span>
        {onReload && (
          <button
            onClick={onReload}
            className="ml-2 p-1 hover:bg-green-200 rounded-full transition-colors"
            title="Reload dashboard"
          >
            <RefreshCw size={16} />
          </button>
        )}
      </>
    ) : (
      <>
        <WifiOff size={20} />
        <span className="text-sm font-medium">Offline</span>
      </>
    )}
  </div>
);
