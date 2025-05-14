import { useBaseQuery } from "./useBaseQuery";

export interface ProfileOptions {
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
}

export interface ProfileResult<T = any> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to query Web3.bio NS by identity
 * @param {string|string[]} identity - Identity or identities to query (id format: platform,identity)
 * @param {ProfileOptions} options - Query options
 * @returns {ProfileResult} Query result and control methods
 */
export const useQueryNS = <T = any>(
  identity: string | string[] | null | undefined,
  options: ProfileOptions,
): ProfileResult<T> => {
  return useBaseQuery<T>(identity, "ns", options);
};
