// src/hooks/useBaseQuery.ts
import { useState, useEffect } from "react";
import { PROFILE_API_ENDPOINT, resolveIdentity } from "../utils/base";
import { QueryOptions, QueryResult } from "../utils/types";

const getURL = (
  identity: string | string[],
  endpoint: string,
  universal: boolean,
) => {
  if (Array.isArray(identity))
    return `${PROFILE_API_ENDPOINT}/${endpoint}/batch/${JSON.stringify(identity)}`;
  const id = resolveIdentity(
    Array.isArray(identity) ? JSON.stringify(identity) : identity,
  );
  const platform = id?.split(",")[0];
  const handle = id?.split(",")[1];
  if (universal) {
    return `${PROFILE_API_ENDPOINT}/${endpoint}/${id}`;
  } else {
    return `${PROFILE_API_ENDPOINT}/${endpoint}/${platform}/${handle}`;
  }
};

/**
 * Base hook for querying Web3.bio API
 * @param {string|string[]} identity - Identity to query
 * @param {string} endpoint - API endpoint path (ns or profile)
 * @param {QueryOptions} options - Query options
 */
export const useBaseQuery = (
  identity: string | string[] | null | undefined,
  universal: boolean,
  endpoint: string,
  options: QueryOptions,
): QueryResult => {
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
        const url = getURL(identity, endpoint, universal);
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
  }, [identity, apiKey, enabled, endpoint, universal]);

  return { data, isLoading, error };
};
