"use client";
import { useState, useEffect } from "react";

const CACHE_KEY = "embedUrlCache";

const useFetchEmbedUrl = (dashboardId: string) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isExpired = (expiry: number) => Date.now() > expiry;

  const fetchEmbedUrl = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://wgoqjjg27edgqqhqg7dl4n3jey0axbyt.lambda-url.eu-central-1.on.aws/?dashboardId=${dashboardId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const url = data.embedUrl;

      // Cache embed URL with expiration (e.g. 9 hours = 540 minutes)
      const expirationTime = Date.now() + 540 * 60 * 1000;
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ url, expiresAt: expirationTime, dashboardId })
      );

      setEmbedUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { url, expiresAt, dashboardId: cachedId } = JSON.parse(cached);
      if (!isExpired(expiresAt) && cachedId === dashboardId) {
        setEmbedUrl(url);
        setLoading(false);
        return;
      }
    }

    fetchEmbedUrl();
  }, [dashboardId]);

  return { embedUrl, loading, error };
};

export default useFetchEmbedUrl;
