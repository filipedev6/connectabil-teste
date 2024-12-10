'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseFetchDataOptions {
  enabled?: boolean;
}

export function useFetchData<T>(
  fetchFn: () => Promise<{ data: T; error?: string }>,
  dependencies: any[] = [],
  options: UseFetchDataOptions = { enabled: true }
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(options.enabled);

  const fetchData = useCallback(async () => {
    if (!options.enabled) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetchFn();
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, options.enabled]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  return { 
    data, 
    error, 
    loading, 
    refetch: fetchData 
  };
}