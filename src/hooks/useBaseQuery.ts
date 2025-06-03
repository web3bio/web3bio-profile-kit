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
  if (Array.isArray(identity)) {
    return `${PROD_API_ENDPOINT}/${endpoint}/batch/${encodeURIComponent(JSON.stringify(identity))}`;
  }

  if (universal) {
    return `${PROD_API_ENDPOINT}/${endpoint}/${identity}`;
  }

  const resolvedId = resolveIdentity(identity);
  if (!resolvedId) return null;

  if (endpoint === QueryEndpoint.DOMAIN) {
    return `${PROD_API_ENDPOINT}/${endpoint}/${resolvedId}`;
  }

  const [platform, handle] = resolvedId.split(",");
  return `${PROD_API_ENDPOINT}/${endpoint}/${platform}/${handle}`;
};

/**
 * Core hook for querying Web3.bio Profile API with React Query
 * This hook is meant to be used only in client components
 */
export function useBaseQuery<T>(
  identity: IdentityString | IdentityString[],
  endpoint: QueryEndpoint,
  universal: boolean = false,
  options: QueryOptions = {},
): QueryResult<T> {
  const { apiKey: userApiKey, enabled = true, retry } = options;
  const apiKey = getApiKey(userApiKey);

  const queryKey = ["baseQuery", endpoint, universal, identity, options];

  const queryFn = async (): Promise<T> => {
    const url = buildApiUrl(identity, endpoint, universal);

    if (!url) {
      return Promise.reject(new Error(ErrorMessages.INVALID_IDENTITY));
    }

    const headers: HeadersInit = apiKey ? { "x-api-key": apiKey } : {};

    const fetchOptions: RequestInit = {
      method: "GET",
      headers,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      return Promise.reject(new Error(`API error: ${response.status}`));
    }

    const responseData = await response.json();

    if (responseData?.error) {
      return Promise.reject(new Error(responseData.error));
    }

    return responseData as T;
  };

  const queryOptions: UseQueryOptions<T, Error> = {
    queryKey,
    queryFn,
    enabled: Boolean(enabled && identity),
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
    retry: retry || 2,
    ...options,
  };

  const { data, isLoading, error, ...restQueryInfo } = useQuery<T, Error>({
    ...queryOptions,
  });

  return {
    data: data || null,
    isLoading,
    error,
    ...restQueryInfo,
  };
}
