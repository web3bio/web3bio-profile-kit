import {
  type IdentityString,
  type QueryOptions,
  type QueryResult,
  ErrorMessages,
  QueryEndpoint,
} from "../types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PROD_API_ENDPOINT } from "../utils/helpers";
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
    return `${PROD_API_ENDPOINT}/${endpoint}/batch/${encodeURIComponent(JSON.stringify(identity))}`;
  }

  // Handle universal queries
  if (universal) {
    return `${PROD_API_ENDPOINT}/${endpoint}/${identity}`;
  }

  // Handle platform-specific queries
  const resolvedId = resolveIdentity(identity);
  if (!resolvedId) return null;

  // Domain endpoint uses resolved ID directly
  if (endpoint === QueryEndpoint.DOMAIN) {
    return `${PROD_API_ENDPOINT}/${endpoint}/${resolvedId}`;
  }

  // Other endpoints need platform/handle split
  const [platform, handle] = resolvedId.split(",");
  return `${PROD_API_ENDPOINT}/${endpoint}/${platform}/${handle}`;
};

/**
 * Core hook for querying Web3.bio Profile API with React Query
 */
export function useBaseQuery<T>(
  identity: IdentityString | IdentityString[],
  endpoint: QueryEndpoint,
  universal: boolean = false,
  options: QueryOptions = {},
): QueryResult<T> {
  const { apiKey: userApiKey, enabled = true } = options;
  const apiKey = getApiKey(userApiKey);

  // Generate query key based on the parameters
  const queryKey = ["baseQuery", endpoint, universal, identity];

  const queryFn = async (): Promise<T> => {
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

    return responseData as T;
  };

  // Configure React Query options
  const queryOptions: UseQueryOptions<T, Error> = {
    queryKey,
    queryFn,
    enabled: Boolean(enabled && identity),
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000, // 5 minutes stale time
    retry: 2,
    ...options, // Allow users to override query options
  };

  // Execute the query using React Query
  const { data, isLoading, error, ...restQueryInfo } = useQuery<T, Error>({
    ...queryOptions,
  });

  // Return result in the same format as before
  return {
    data: data || null,
    isLoading,
    error,
    ...restQueryInfo,
  };
}
