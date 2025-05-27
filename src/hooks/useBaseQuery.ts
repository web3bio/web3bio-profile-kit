import type { IdentityString, QueryOptions, QueryResult } from "../utils/types";
import { useState, useEffect, useRef } from "react";
import { API_ENDPOINT, ErrorMessages, QueryEndpoint } from "../utils/constants";
import { getApiKey, resolveIdentity } from "../utils/helpers";

/**
 * Constructs the API URL based on query parameters
 */
const buildApiUrl = (
  identity: IdentityString | IdentityString[],
  endpoint: QueryEndpoint,
  universal: boolean,
): string | null => {
  // Handle batch requests
  if (Array.isArray(identity)) {
    return `${API_ENDPOINT}/${endpoint}/batch/${encodeURIComponent(JSON.stringify(identity))}`;
  }

  // Handle universal queries
  if (universal) {
    return `${API_ENDPOINT}/${endpoint}/${identity}`;
  }

  // Handle platform-specific queries
  const resolvedId = resolveIdentity(identity);
  if (!resolvedId) return null;

  // Domain endpoint uses resolved ID directly
  if (endpoint === QueryEndpoint.DOMAIN) {
    return `${API_ENDPOINT}/${endpoint}/${resolvedId}`;
  }

  // Other endpoints need platform/handle split
  const [platform, handle] = resolvedId.split(",");
  return `${API_ENDPOINT}/${endpoint}/${platform}/${handle}`;
};

// Generate a stable cache key for this request
const getCacheKey = (
  identity: IdentityString | IdentityString[],
  endpoint: QueryEndpoint,
  universal: boolean,
): string => {
  return JSON.stringify({
    identity,
    endpoint,
    universal,
  });
};

// Create a cache to store results across component instances and re-renders
const globalRequestCache = new Map<string, any>();

/**
 * Core hook for querying Web3.bio Profile API
 */
export function useBaseQuery<T>(
  identity: IdentityString | IdentityString[],
  endpoint: QueryEndpoint,
  universal: boolean = false,
  options: QueryOptions = {},
): QueryResult<T> {
  const { apiKey: userApiKey, enabled = true } = options;
  const apiKey = getApiKey(userApiKey);

  const [data, setData] = useState<T | null>(() => {
    // Initialize state from cache if available
    const cacheKey = getCacheKey(identity, endpoint, universal);
    return (globalRequestCache.get(cacheKey) as T) || null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Use ref to track in-flight requests and prevent race conditions
  const requestIdRef = useRef<number>(0);
  const prevParamsRef = useRef<string>("");

  // Current request parameters as a string for comparison
  const currentParams = JSON.stringify({
    identity,
    endpoint,
    universal,
  });

  useEffect(() => {
    // Don't run the query if disabled or no identity
    if (!enabled || !identity) return;

    // Skip if parameters haven't changed
    if (currentParams === prevParamsRef.current && data !== null) {
      return;
    }

    // Update previous parameters
    prevParamsRef.current = currentParams;

    // Generate cache key
    const cacheKey = getCacheKey(identity, endpoint, universal);

    // Check if we already have cached data
    const cachedData = globalRequestCache.get(cacheKey) as T | undefined;
    if (cachedData) {
      setData(cachedData);
      return;
    }

    // Increment request ID to track the latest request
    const requestId = ++requestIdRef.current;

    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const url = buildApiUrl(identity, endpoint, universal);

        if (!url) {
          throw new Error(ErrorMessages.INVALID_IDENTITY);
        }

        const headers: HeadersInit = apiKey ? { "x-api-key": apiKey } : {};

        const fetchOptions: RequestInit = {
          method: "GET",
          headers,
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData?.error) {
          throw new Error(responseData.error);
        }

        if (requestId === requestIdRef.current) {
          globalRequestCache.set(cacheKey, responseData);
          setData(responseData as T);
          setIsLoading(false);
        }
      } catch (err) {
        if (requestId === requestIdRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [currentParams, enabled]);

  return { data, isLoading, error };
}
