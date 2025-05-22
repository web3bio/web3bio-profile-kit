import { useState, useEffect } from "react";
import { PROFILE_API_ENDPOINT, resolveIdentity } from "../utils/base";
import {
  DomainResponse,
  ErrorMessages,
  Identity,
  ProfileNSResponse,
  ProfileResponse,
  QueryEndpoint,
  QueryOptions,
  QueryResult,
} from "../utils/types";

/**
 * Constructs the appropriate URL for the Web3.bio API request
 *
 * @param {string | string[]} identity - Single identity string or array of identities
 * @param {QueryEndpoint} endpoint - API endpoint (e.g. 'ns', 'profile', 'domain')
 * @param {boolean} universal - Whether to use universal lookup format or platform-specific
 * @returns {string} Formatted API URL
 */
const getURL = (
  identity: Identity,
  endpoint: QueryEndpoint,
  universal: boolean,
): string | null => {
  if (Array.isArray(identity)) {
    return `${PROFILE_API_ENDPOINT}/${endpoint}/batch/${JSON.stringify(identity)}`;
  }

  if (universal) {
    return `${PROFILE_API_ENDPOINT}/${endpoint}/${identity}`;
  } else {
    const id = resolveIdentity(identity);
    if (!id) return null;
    const [platform, handle] = id.split(",");
    return `${PROFILE_API_ENDPOINT}/${endpoint}/${platform}/${handle}`;
  }
};

/**
 * Base hook for querying Web3.bio API endpoints
 *
 * @param {Identity} identity - Identity or array of identities to query
 * @param {boolean} universal - Whether to use universal identity lookup
 * @param {string} endpoint - API endpoint path (e.g. 'ns', 'profile', 'domain')
 * @param {QueryOptions} options - Configuration options including API key and enabled state
 * @returns {QueryResult} Object containing data, loading state, and any errors
 */
export const useBaseQuery = (
  identity: Identity,
  universal: boolean,
  endpoint: QueryEndpoint,
  options: QueryOptions,
): QueryResult => {
  const { apiKey, enabled = true } = options;
  const [data, setData] = useState<
    ProfileResponse | ProfileNSResponse | DomainResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !identity) return;

    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const url = getURL(identity, endpoint, universal);
        if (!url) {
          setError(new Error(ErrorMessages.invalidIdentity));
          setData(null);
          return;
        }
        const requestHeaders: HeadersInit = apiKey
          ? { "x-api-key": apiKey }
          : {};

        const response = await fetch(url, {
          method: "GET",
          headers: requestHeaders,
          signal: abortController.signal,
        });

        const responseData = await response.json();

        if (responseData?.error) {
          setError(responseData.error);
          setData(null);
          return;
        }

        setData(responseData);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
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
