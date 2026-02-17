// hooks/useDashboardEmbed.ts
import { useState, useEffect, useCallback } from 'react';

interface DashboardEmbedConfig {
  dashboardId: string;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

interface DashboardEmbedState {
  embedUrl: string | null;
  loading: boolean;
  error: string | null;
  retryCount: number;
  isRetrying: boolean;
  hasMoreRetries: boolean;
  isOnline: boolean;
  retry: () => void;
  reset: () => void;
}

export const useDashboardEmbed = ({
  dashboardId,
  maxRetries = 3,
  retryDelay = 1000,
  timeout = 30000
}: DashboardEmbedConfig): DashboardEmbedState => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchEmbedUrl = useCallback(async () => {
    if (!isOnline) {
      setError('No internet connection');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Replace with your actual API endpoint
      const response = await fetch(`/api/dashboard-embed/${dashboardId}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to load dashboard: ${response.statusText}`);
      }

      const data = await response.json();
      setEmbedUrl(data.embedUrl);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Request timeout - please try again');
      } else {
        setError(err.message || 'Failed to load dashboard');
      }
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  }, [dashboardId, isOnline, timeout]);

  // Initial fetch and retry on network recovery
  useEffect(() => {
    fetchEmbedUrl();
  }, [fetchEmbedUrl, retryCount]);

  // Auto-retry when connection is restored
  useEffect(() => {
    if (isOnline && error && retryCount < maxRetries) {
      const timeoutId = setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, retryDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [isOnline, error, retryCount, maxRetries, retryDelay]);

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setIsRetrying(true);
      setRetryCount(prev => prev + 1);
    } else {
      // Reset retry count if max reached (manual override)
      setRetryCount(0);
    }
  }, [retryCount, maxRetries]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setError(null);
    setEmbedUrl(null);
  }, []);

  return {
    embedUrl,
    loading,
    error,
    retryCount,
    isRetrying,
    hasMoreRetries: retryCount < maxRetries,
    isOnline,
    retry,
    reset
  };
};