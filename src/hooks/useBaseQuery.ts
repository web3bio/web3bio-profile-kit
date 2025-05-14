// src/hooks/useBaseQuery.ts
import { useState, useEffect } from "react";
import { PROFILE_API_ENDPOINT } from "../utils/base";

export interface QueryOptions {
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
}

export interface QueryResult<T = any> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Base hook for querying Web3.bio API
 * @param {string|string[]} identity - Identity to query
 * @param {string} endpoint - API endpoint path (ns or profile)
 * @param {QueryOptions} options - Query options
 */
export const useBaseQuery = <T = any>(
  identity: string | string[] | null | undefined,
  endpoint: string,
  options: QueryOptions,
): QueryResult<T> => {
  const { apiKey, enabled = true } = options;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!enabled || !identity) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        let url = "";
        if (Array.isArray(identity)) {
          url = `${PROFILE_API_ENDPOINT}/${endpoint}/batch/${JSON.stringify(identity)}`;
        } else if (identity.includes(",")) {
          const platform = identity.split(",")[0].toLowerCase();
          const domain = identity.split(",")[1];
          url = `${PROFILE_API_ENDPOINT}/${endpoint}/${platform}/${domain}`;
        } else {
          url = `${PROFILE_API_ENDPOINT}/${endpoint}/${identity}`;
        }

        const requestHeaders: HeadersInit = {
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        };

        const response = await fetch(url, {
          method: "GET",
          headers: requestHeaders,
          signal: abortController.signal,
        });

        const responseData = await response.json();
        if (responseData?.error) {
          setError(responseData.error);
          return;
        }
        setData(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [identity, apiKey, enabled, endpoint]);

  return { data, isLoading, error };
};
