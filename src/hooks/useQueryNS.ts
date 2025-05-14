import { QueryResult, useBaseQuery } from "./useBaseQuery";

export interface ProfileOptions {
  /** API Key for authentication */
  apiKey?: string;
  /** Whether the query should execute */
  enabled?: boolean;
}

/**
 * Hook to query Web3.bio NS by identity
 * @param {string|string[]} identity - Identity or identities to query (id format: platform,identity)
 * @param {ProfileOptions} options - Query options
 * @returns {ProfileResult} Query result and control methods
 */
export const useQueryNS = (
  identity: string | string[] | null | undefined,
  options: ProfileOptions,
): QueryResult => {
  return useBaseQuery(identity, "ns", options);
};
