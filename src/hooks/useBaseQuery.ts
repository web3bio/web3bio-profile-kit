import { useState, useEffect } from "react";
import { API_ENDPOINT, ErrorMessages, QueryEndpoint } from "../utils/constants";
import { getApiKey, resolveIdentity } from "../utils/helpers";
import { IdentityString, QueryOptions, QueryResult } from "../utils/types";

/**
 * Constructs the API URL based on query parameters
 */
const buildApiUrl = (
  identity: IdentityString | IdentityString[],
  endpoint: QueryEndpoint,
  universal: boolean,
): string | null => {
  // Handle batch queries (array of identities)
  if (Array.isArray(identity)) {
    return `${API_ENDPOINT}/${endpoint}/batch/${JSON.stringify(identity)}`;
  }

  // Handle single identity query
  if (universal) {
    return `${API_ENDPOINT}/${endpoint}/${identity}`;
  } else {
    const resolvedId = resolveIdentity(identity);
    if (!resolvedId) return null;
    if (endpoint === QueryEndpoint.DOMAIN)
      return `${API_ENDPOINT}/${endpoint}/${resolvedId}`;

    const [platform, handle] = resolvedId.split(",");
    return `${API_ENDPOINT}/${endpoint}/${platform}/${handle}`;
  }
};

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

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Don't run the query if disabled or no identity
    if (!enabled || !identity) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const url = buildApiUrl(identity, endpoint, universal);

        if (!url) {
          throw new Error(ErrorMessages.INVALID_IDENTITY);
        }

        const headers: HeadersInit = apiKey ? { "x-api-key": apiKey } : {};

        const response = await fetch(url, {
          method: "GET",
          headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData?.error) {
          throw new Error(responseData.error);
        }

        setData(responseData as T);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [identity, apiKey, enabled, endpoint, universal]);

  return { data, isLoading, error };
}
